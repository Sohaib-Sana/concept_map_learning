// App.jsx
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Background, Controls, ReactFlow, ReactFlowProvider, useReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initialNodes, initialEdges } from "./components/nodeBank";
import { customNode } from "./model/nodeModel";

import "./App.css";

import { storySteps } from "./story/storySteps";
import { LessonPanel } from "./components/lessonPanel";
import { fetchTtsBlobWithRetry } from "./helpers/fetchTtsBlobWithRetry";

const nodeTypes = {
  customNode: customNode,
};

// -------------------- Helpers: hashing + caching --------------------
const TTS_CACHE_NAME = "gemini-tts-v1";

// Create a stable cache key URL (must be a valid URL for CacheStorage)
function makeCacheRequest(hash) {
  return new Request(`https://tts-cache.local/${hash}.wav`, { method: "GET" });
}

async function sha256Base64Url(input) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  return b64;
}

async function getCachedAudioBlob(hash) {
  try {
    if (!("caches" in window)) return null;
    const cache = await caches.open(TTS_CACHE_NAME);
    const req = makeCacheRequest(hash);
    const match = await cache.match(req);
    if (!match) return null;
    return await match.blob();
  } catch {
    return null;
  }
}

async function putCachedAudioBlob(hash, blob) {
  try {
    if (!("caches" in window)) return;
    const cache = await caches.open(TTS_CACHE_NAME);
    const req = makeCacheRequest(hash);
    const res = new Response(blob, {
      headers: {
        "Content-Type": blob.type || "audio/wav",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
    await cache.put(req, res);
  } catch {
    // ignore cache errors
  }
}

// -------------------- Helpers: token spans + approximate timing --------------------
function buildSpans(raw) {
  const spans = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(raw))) spans.push({ start: m.index, end: m.index + m[0].length });
  return spans;
}

function tokenWeight(token) {
  // Heuristic: longer words take longer; punctuation adds “pause weight”
  const punct = /[.?!,:;)]$/.test(token) ? 6 : 0;
  const dash = /—|–/.test(token) ? 4 : 0;
  return token.length + punct + dash;
}

function buildCumulativeTimes(raw, spans, durationSec) {
  if (!durationSec || !isFinite(durationSec) || durationSec <= 0 || spans.length === 0) return [];

  const tokens = spans.map((s) => raw.slice(s.start, s.end));
  const weights = tokens.map(tokenWeight);
  const total = weights.reduce((a, b) => a + b, 0) || 1;

  let acc = 0;
  const cum = weights.map((w) => {
    acc += (w / total) * durationSec;
    return acc;
  });

  cum[cum.length - 1] = durationSec;
  return cum;
}

function findTokenIndexAtTime(cumTimes, t) {
  let lo = 0;
  let hi = cumTimes.length - 1;
  let ans = hi;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (t <= cumTimes[mid]) {
      ans = mid;
      hi = mid - 1;
    } else lo = mid + 1;
  }
  return ans;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function highlightRangeFromToken(raw, spans, tokenIndex, HIGHLIGHT_WORDS, LOOKAHEAD_WORDS) {
  if (!spans.length) return null;
  const i = clamp(tokenIndex, 0, spans.length - 1);

  const startToken = Math.max(0, i - (HIGHLIGHT_WORDS - 1));
  const endToken = Math.min(spans.length - 1, i + LOOKAHEAD_WORDS);

  const start = spans[startToken].start;
  const end = endToken + 1 < spans.length ? spans[endToken + 1].start : raw.length;

  return { start, end };
}

// -------------------- Teaching tone prompt wrapper --------------------
function buildTeachingPrompt(text) {
  return [
    "Speak the following text exactly as written.",
    "Use a friendly, patient teaching tone: clear articulation, warm pace, and brief pauses after sentences.",
    "Do not add or remove any words.",
    "",
    text,
  ].join("\n");
}

// -------------------- TTS request building (IMPORTANT: must match cache key + fetch) --------------------
function buildTtsRequest(rawText, teachingToneOn) {
  const raw = String(rawText ?? "");

  const promptText = teachingToneOn ? buildTeachingPrompt(raw) : raw;

  // If you truly want the accent instruction to apply, it MUST be included in the text sent to Gemini.
  // If you do NOT want this, remove these lines and just use promptText.
  const finalText = [
    "Read the transcript in a British English accent (UK).",
    "Keep the transcript wording exactly the same (do not add or remove words).",
    "",
    promptText,
  ].join("\n");

  return {
    model: "gemini-2.5-flash-preview-tts",
    voiceName: "Kore",
    text: finalText,
  };
}

async function hashForTtsRequest(ttsReq) {
  // The hash MUST be derived from exactly what affects the output.
  const payload = JSON.stringify({ v: 1, ...ttsReq });
  try {
    return await sha256Base64Url(payload);
  } catch {
    return `${payload.length}-${String(ttsReq.text ?? "").length}`;
  }
}

// -------------------- Prefetch helpers --------------------
function FlowCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, focusTarget, overlayRect }) {
  const rf = useReactFlow();

  const clampLocal = (v, min, max) => Math.max(min, Math.min(max, v));
  const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  const focusAvoidingOverlay = useCallback(
    (ids) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const fallbackPanel = { left: 16, top: 16, width: 360, height: 260 };
      const p = overlayRect?.width ? overlayRect : fallbackPanel;

      const panelBox = {
        left: p.left,
        top: p.top,
        right: p.left + p.width,
        bottom: p.top + p.height,
      };

      const margin = 16;

      const focusNodes = ids
        .map((id) => rf.getNode(id))
        .filter(Boolean)
        .filter((n) => !n?.data?.isJunction);

      if (focusNodes.length === 0) return;

      const bounds = focusNodes.reduce(
        (acc, n) => {
          const x = n.positionAbsolute?.x ?? n.position.x ?? 0;
          const y = n.positionAbsolute?.y ?? n.position.y ?? 0;
          const w = n.measured?.width ?? 150;
          const h = n.measured?.height ?? 50;

          acc.minX = Math.min(acc.minX, x);
          acc.minY = Math.min(acc.minY, y);
          acc.maxX = Math.max(acc.maxX, x + w);
          acc.maxY = Math.max(acc.maxY, y + h);
          return acc;
        },
        { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
      );

      const boxW = Math.max(1, bounds.maxX - bounds.minX);
      const boxH = Math.max(1, bounds.maxY - bounds.minY);
      const centerX = bounds.minX + boxW / 2;
      const centerY = bounds.minY + boxH / 2;

      const paddingPx = 48;

      let zoom;
      if (focusNodes.length === 1) {
        zoom = 1.15;
      } else {
        const z = Math.min((vw - paddingPx * 2) / boxW, (vh - paddingPx * 2) / boxH);
        zoom = clampLocal(z, 0.2, 1.4);
      }

      let anchorX = vw / 2;
      let anchorY = vh / 2;

      const screenW = boxW * zoom;
      const screenH = boxH * zoom;

      const screenBox = {
        left: anchorX - screenW / 2,
        top: anchorY - screenH / 2,
        right: anchorX + screenW / 2,
        bottom: anchorY + screenH / 2,
      };

      if (intersects(screenBox, panelBox)) {
        const neededAnchorX = panelBox.right + margin + screenW / 2;
        const maxAnchorX = vw - margin - screenW / 2;

        if (neededAnchorX <= maxAnchorX) {
          anchorX = Math.max(anchorX, neededAnchorX);
        } else {
          const neededAnchorY = panelBox.bottom + margin + screenH / 2;
          const maxAnchorY = vh - margin - screenH / 2;
          anchorY = Math.max(anchorY, Math.min(neededAnchorY, maxAnchorY));
        }
      }

      const x = anchorX - centerX * zoom;
      const y = anchorY - centerY * zoom;

      rf.setViewport({ x, y, zoom }, { duration: focusNodes.length === 1 ? 650 : 700 });
    },
    [rf, overlayRect],
  );

  useEffect(() => {
    if (!focusTarget || focusTarget.length === 0) return;

    const t = window.setTimeout(() => {
      focusAvoidingOverlay(focusTarget);
    }, 60);

    return () => window.clearTimeout(t);
  }, [focusTarget, focusAvoidingOverlay]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{ padding: 0.25, duration: 450 }}
    >
      <Background />
      <Controls style={{ color: "black" }} />
    </ReactFlow>
  );
}

export default function App() {
  // Full graph
  const [allNodes, setAllNodes] = useState(initialNodes);
  const [allEdges, setAllEdges] = useState(initialEdges);

  // Lesson state
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);

  // Visible graph state
  const [visibleNodeIds, setVisibleNodeIds] = useState([""]);
  const [visibleEdgeIds, setVisibleEdgeIds] = useState([]);
  const [newNodeIds, setNewNodeIds] = useState([]);

  const step = storySteps[stepIndex];
  const [beatIndex, setBeatIndex] = useState(0);
  const currentBeat = step?.beats?.[beatIndex];
  const [ghostNodeIds, setGhostNodeIds] = useState([]);

  const [speakingState, setSpeakingState] = useState("idle"); // "idle" | "loading" | "speaking" | "paused"

  // highlight range for the currently spoken word window
  const [ttsRange, setTtsRange] = useState(null); // { start, end } | null
  const HIGHLIGHT_WORDS = 6;
  const LOOKAHEAD_WORDS = 1;

  // whether "Resume" is truly possible
  const [canResume, setCanResume] = useState(false);

  // NEW: teaching tone toggle
  const [teachingToneOn, setTeachingToneOn] = useState(true);

  // Clear highlight whenever the visible narration changes
  useEffect(() => {
    setTtsRange(null);
  }, [currentBeat?.narration]);

  // Autoplay flag
  const [autoplayOn, setAutoplayOn] = useState(false);

  // Prevent stale closure issues during chained autoplay
  const autoplayRef = useRef(false);
  useEffect(() => {
    autoplayRef.current = autoplayOn;
  }, [autoplayOn]);

  // ----- Audio element + TTS runtime refs -----
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const ttsAbortRef = useRef(null);

  const spansRef = useRef([]);
  const cumTimeRef = useRef([]);
  const rafRef = useRef(null);
  const lastRangeRef = useRef(null);

  // ----- Prefetch runtime refs -----
  const PREFETCH_AHEAD = 4; // number of upcoming beats to prefetch
  const PREFETCH_CONCURRENCY = 2;
  const prefetchInFlightRef = useRef(new Map()); // hash -> Promise
  const prefetchSessionRef = useRef(0); // increments on teachingTone change, etc.

  useEffect(() => {
    // When teaching tone changes, audio output changes => new hashes.
    // Bump prefetch session so old background work can safely no-op.
    prefetchSessionRef.current += 1;
  }, [teachingToneOn]);

  const cleanupAudioUrl = useCallback(() => {
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "auto";

    return () => {
      try {
        audioRef.current?.pause?.();
      } catch {}
      cleanupAudioUrl();
      audioRef.current = null;
    };
  }, [cleanupAudioUrl]);

  const stopVoice = useCallback(() => {
    // cancel pending fetch for *active speak()*
    try {
      ttsAbortRef.current?.abort?.();
    } catch {}
    ttsAbortRef.current = null;

    // stop RAF highlighter
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    spansRef.current = [];
    cumTimeRef.current = [];
    lastRangeRef.current = null;

    // stop audio
    const a = audioRef.current;
    if (a) {
      try {
        a.pause();
      } catch {}
      try {
        a.currentTime = 0;
      } catch {}
      a.src = "";
      a.onloadedmetadata = null;
      a.onplay = null;
      a.onpause = null;
      a.onended = null;
      a.onerror = null;
    }

    cleanupAudioUrl();

    setSpeakingState("idle");
    setTtsRange(null);
    setCanResume(false);
  }, [cleanupAudioUrl]);

  const pauseVoice = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;

    if (!a.paused) {
      a.pause();
      setSpeakingState("paused");
      setCanResume(true);
    }
  }, []);

  const resumeVoice = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused && !a.ended && a.currentTime > 0) {
      a.play();
      setSpeakingState("speaking");
    }
  }, []);

  // -------------------- Prefetch implementation --------------------
  const prefetchBeatAudio = useCallback(
    async (beatText, sessionId) => {
      const raw = String(beatText ?? "");
      if (!raw.trim()) return;

      // if session changed, bail (prevents wasted work after toggle)
      if (sessionId !== prefetchSessionRef.current) return;

      const ttsReq = buildTtsRequest(raw, teachingToneOn);
      const hash = await hashForTtsRequest(ttsReq);

      // already cached?
      const cached = await getCachedAudioBlob(hash);
      if (cached) return;

      // de-dupe in-flight per-hash
      const inflight = prefetchInFlightRef.current.get(hash);
      if (inflight) {
        await inflight.catch(() => {});
        return;
      }

      const p = (async () => {
        try {
          // if session changed mid-flight, we still allow caching (harmless),
          // but we can check early to avoid calling.
          if (sessionId !== prefetchSessionRef.current) return;

          const blob = await fetchTtsBlobWithRetry(ttsReq, { tries: 2, baseDelayMs: 300 });
          await putCachedAudioBlob(hash, blob);
        } catch {
          // ignore prefetch errors
        } finally {
          prefetchInFlightRef.current.delete(hash);
        }
      })();

      prefetchInFlightRef.current.set(hash, p);
      await p;
    },
    [teachingToneOn],
  );

  const collectUpcomingBeatNarrations = useCallback((fromStepIndex, fromBeatIndex, count) => {
    const jobs = [];
    let s = fromStepIndex;
    let b = fromBeatIndex + 1;

    while (jobs.length < count && s < storySteps.length) {
      const beats = storySteps[s]?.beats ?? [];
      while (jobs.length < count && b < beats.length) {
        const text = beats[b]?.narration;
        if (text) jobs.push(text);
        b++;
      }
      s++;
      b = 0;
    }

    return jobs;
  }, []);

  const prefetchUpcomingBeats = useCallback(
    async (fromStepIndex, fromBeatIndex, count = PREFETCH_AHEAD) => {
      const sessionId = prefetchSessionRef.current;
      const narrations = collectUpcomingBeatNarrations(fromStepIndex, fromBeatIndex, count);
      if (!narrations.length) return;

      let i = 0;
      const workers = Array.from({ length: PREFETCH_CONCURRENCY }, async () => {
        while (i < narrations.length) {
          const idx = i++;
          const text = narrations[idx];
          await prefetchBeatAudio(text, sessionId);
        }
      });

      await Promise.all(workers);
    },
    [collectUpcomingBeatNarrations, prefetchBeatAudio],
  );

  // -------------------- speak() (with caching + teaching tone + highlighter) --------------------
  const speak = useCallback(
    async (text, { onEnd, stepIdxForPrefetch, beatIdxForPrefetch } = {}) => {
      const raw = String(text ?? "");
      if (!raw.trim()) {
        setSpeakingState("idle");
        setCanResume(false);
        setTtsRange(null);
        return;
      }

      // Stop any current audio/fetch/highlighter
      stopVoice();

      // Build spans immediately (for highlighting)
      const spans = buildSpans(raw);
      spansRef.current = spans;
      cumTimeRef.current = [];
      lastRangeRef.current = null;

      setSpeakingState("loading");
      setCanResume(false);
      setTtsRange({ start: 0, end: 0 });

      // Build exact TTS request + hash (cache key MUST match request)
      const ttsReq = buildTtsRequest(raw, teachingToneOn);
      const hash = await hashForTtsRequest(ttsReq);

      // 1) Try client cache
      let blob = await getCachedAudioBlob(hash);

      // 2) If not cached, fetch from serverless (with retry)
      if (!blob) {
        const controller = new AbortController();
        ttsAbortRef.current = controller;

        try {
          // NOTE: fetchTtsBlobWithRetry doesn't accept AbortSignal currently.
          // If you want fully abortable retries, you can extend it.
          blob = await fetchTtsBlobWithRetry(ttsReq, { tries: 2, baseDelayMs: 300 });

          // Cache for next time
          putCachedAudioBlob(hash, blob);
        } finally {
          ttsAbortRef.current = null;
        }
      }

      // Play audio
      const a = audioRef.current;
      if (!a) return;

      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;

      const tick = () => {
        const a2 = audioRef.current;
        if (!a2 || a2.paused || a2.ended) return;

        const cum = cumTimeRef.current;
        const spans2 = spansRef.current;

        if (cum?.length && spans2?.length) {
          const idx = findTokenIndexAtTime(cum, a2.currentTime);
          const range = highlightRangeFromToken(raw, spans2, idx, HIGHLIGHT_WORDS, LOOKAHEAD_WORDS);

          const prev = lastRangeRef.current;
          if (!prev || prev.start !== range?.start || prev.end !== range?.end) {
            lastRangeRef.current = range;
            if (range) setTtsRange(range);
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      a.onloadedmetadata = () => {
        // Build approximate timing map once duration is known
        cumTimeRef.current = buildCumulativeTimes(raw, spansRef.current, a.duration || 0);
      };

      a.onplay = () => {
        setSpeakingState("speaking");
        setCanResume(true);

        // Prefetch next beats in background (doesn't block playback)
        if (Number.isFinite(stepIdxForPrefetch) && Number.isFinite(beatIdxForPrefetch)) {
          prefetchUpcomingBeats(stepIdxForPrefetch, beatIdxForPrefetch, PREFETCH_AHEAD);
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
      };

      a.onpause = () => {
        if (!a.ended) setSpeakingState("paused");
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      };

      a.onended = () => {
        setSpeakingState("idle");
        setCanResume(false);
        setTtsRange(null);

        cleanupAudioUrl();

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;

        spansRef.current = [];
        cumTimeRef.current = [];
        lastRangeRef.current = null;

        if (onEnd) onEnd();
      };

      a.onerror = () => {
        setSpeakingState("idle");
        setCanResume(false);
        setTtsRange(null);

        cleanupAudioUrl();

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;

        spansRef.current = [];
        cumTimeRef.current = [];
        lastRangeRef.current = null;
      };

      a.src = url;

      try {
        await a.play();
      } catch {
        // Autoplay restrictions etc.
        setSpeakingState("idle");
        setCanResume(false);
        setTtsRange(null);
        cleanupAudioUrl();
      }
    },
    [stopVoice, cleanupAudioUrl, teachingToneOn, prefetchUpcomingBeats],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, [stopVoice]);

  // ---------- Panel Location ----------
  const panelRef = useRef(null);
  const [panelRect, setPanelRect] = useState(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setPanelRect({ left: r.left, top: r.top, width: r.width, height: r.height });
    };

    update();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(el);
    }

    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // ---------- Render subsets + animation flags ----------
  const nodesToRender = useMemo(() => {
    const visible = new Set(visibleNodeIds);
    const ghost = new Set(ghostNodeIds);
    const newly = new Set(newNodeIds);

    const renderable = new Set([...visible, ...ghost]);

    return allNodes
      .filter((n) => renderable.has(n.id))
      .map((n) => ({
        ...n,
        data: {
          ...n.data,
          isNew: newly.has(n.id),
          isGhost: ghost.has(n.id) && !visible.has(n.id),
        },
      }));
  }, [allNodes, visibleNodeIds, ghostNodeIds, newNodeIds]);

  const edgesToRender = useMemo(() => {
    const visible = new Set(visibleEdgeIds);
    return allEdges.filter((e) => visible.has(e.id));
  }, [allEdges, visibleEdgeIds]);

  // Persist node/edge edits
  const onNodesChange = useCallback((changes) => {
    setAllNodes((prevAll) => applyNodeChanges(changes, prevAll));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setAllEdges((prevAll) => applyEdgeChanges(changes, prevAll));
  }, []);

  const onConnect = useCallback(
    (params) => {
      const sourceVisible = visibleNodeIds.includes(params.source);
      const targetVisible = visibleNodeIds.includes(params.target);
      if (!sourceVisible || !targetVisible) return;

      setAllEdges((eds) => addEdge(params, eds));
    },
    [visibleNodeIds],
  );

  // Helper: apply a step's reveal config + compute newly revealed nodes
  const applyStepReveal = useCallback((beat) => {
    const nextVisible = beat.reveal.nodes ?? [];
    const nextGhost = beat.reveal.ghostNodes ?? [];

    setGhostNodeIds(nextGhost);
    setVisibleEdgeIds(beat.reveal.edges ?? []);

    setVisibleNodeIds((prev) => {
      const prevSet = new Set(prev);
      const added = nextVisible.filter((id) => !prevSet.has(id));
      setNewNodeIds(added);

      if (added.length > 0) window.setTimeout(() => setNewNodeIds([]), 750);
      else setNewNodeIds([]);

      return nextVisible;
    });
  }, []);

  const goToBeat = useCallback(
    (sIdx, bIdx) => {
      const stepCount = storySteps.length;
      const safeStep = Math.max(0, Math.min(sIdx, stepCount - 1));

      const beats = storySteps[safeStep].beats ?? [];
      const safeBeat = Math.max(0, Math.min(bIdx, beats.length - 1));

      setStepIndex(safeStep);
      setBeatIndex(safeBeat);

      const beat = beats[safeBeat];
      if (beat) applyStepReveal(beat);

      return { stepIndex: safeStep, beatIndex: safeBeat };
    },
    [applyStepReveal],
  );

  // Autoplay engine: speak beat, then advance on end (if autoplay still on)
  const speakBeatAndAutoadvance = useCallback(
    (sIdx, bIdx) => {
      const stepObj = storySteps[sIdx];
      if (!stepObj) return;

      const beats = stepObj.beats ?? [];
      const beat = beats[bIdx];
      if (!beat) return;

      speak(beat.narration, {
        stepIdxForPrefetch: sIdx,
        beatIdxForPrefetch: bIdx,
        onEnd: () => {
          if (!autoplayRef.current) return;

          const isLastBeatInStep = bIdx >= beats.length - 1;
          const isLastStep = sIdx >= storySteps.length - 1;

          if (!isLastBeatInStep) {
            const next = goToBeat(sIdx, bIdx + 1);

            // prefetch from the new position immediately
            prefetchUpcomingBeats(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

            window.setTimeout(() => {
              if (!autoplayRef.current) return;
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, 250);
            return;
          }

          if (!isLastStep) {
            const next = goToBeat(sIdx + 1, 0);

            prefetchUpcomingBeats(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

            window.setTimeout(() => {
              if (!autoplayRef.current) return;
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, 250);
            return;
          }

          setAutoplayOn(false);
          autoplayRef.current = false;
          setCanResume(false);
        },
      });
    },
    [goToBeat, speak, prefetchUpcomingBeats],
  );

  // Start fresh from the current beat/page
  const startFromHere = useCallback(() => {
    setStarted(true);
    setAutoplayOn(true);
    autoplayRef.current = true;

    setCanResume(false);

    stopVoice();

    const sIdx = started ? stepIndex : 0;
    const bIdx = started ? beatIndex : 0;

    goToBeat(sIdx, bIdx);

    // prefetch right away (doesn't block)
    prefetchUpcomingBeats(sIdx, bIdx, PREFETCH_AHEAD);

    window.setTimeout(() => {
      if (!autoplayRef.current) return;
      speakBeatAndAutoadvance(sIdx, bIdx);
    }, 200);
  }, [started, stepIndex, beatIndex, goToBeat, speakBeatAndAutoadvance, stopVoice, prefetchUpcomingBeats]);

  // Resume if possible, else start from current page
  const handleResume = useCallback(() => {
    setAutoplayOn(true);
    autoplayRef.current = true;

    const a = audioRef.current;
    if (a && a.paused && canResume && a.currentTime > 0 && !a.ended) {
      resumeVoice();
      return;
    }

    startFromHere();
  }, [canResume, resumeVoice, startFromHere]);

  // Pause lesson (do NOT cancel), mark resumability
  const handleStopLesson = useCallback(() => {
    setAutoplayOn(false);
    autoplayRef.current = false;

    const a = audioRef.current;
    const resumable = !!(a && !a.paused && a.currentTime > 0 && !a.ended);
    setCanResume(resumable);

    pauseVoice();
  }, [pauseVoice]);

  const handleBack = useCallback(() => {
    stopVoice();
    setCanResume(false);

    if (beatIndex > 0) {
      const prev = goToBeat(stepIndex, beatIndex - 1);

      // prefetch from new position
      prefetchUpcomingBeats(prev.stepIndex, prev.beatIndex, PREFETCH_AHEAD);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(prev.stepIndex, prev.beatIndex);
        }, 200);
      }
      return;
    }

    if (stepIndex > 0) {
      const prevStepBeats = storySteps[stepIndex - 1].beats ?? [];
      const lastBeatIndex = Math.max(0, prevStepBeats.length - 1);

      const prev = goToBeat(stepIndex - 1, lastBeatIndex);

      prefetchUpcomingBeats(prev.stepIndex, prev.beatIndex, PREFETCH_AHEAD);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(prev.stepIndex, prev.beatIndex);
        }, 200);
      }
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, prefetchUpcomingBeats]);

  const focusTarget = useMemo(() => {
    const f = currentBeat?.focus;
    if (!f) return null;

    const arr = Array.isArray(f) ? f : [f];
    const filtered = arr.filter((id) => visibleNodeIds.includes(id));
    return filtered.length > 0 ? filtered : null;
  }, [currentBeat, visibleNodeIds]);

  const totalBeats = useMemo(() => {
    return storySteps.reduce((sum, s) => sum + (s.beats?.length ?? 0), 0);
  }, []);

  const currentBeatNumber = useMemo(() => {
    let n = 0;
    for (let i = 0; i < storySteps.length; i++) {
      const len = storySteps[i].beats?.length ?? 0;
      if (i < stepIndex) n += len;
      if (i === stepIndex) n += beatIndex + 1;
    }
    return n;
  }, [stepIndex, beatIndex]);

  const canGoBack = started && (stepIndex > 0 || beatIndex > 0);
  const beatsInThisStep = storySteps[stepIndex]?.beats ?? [];
  const isLastBeatInStep = beatIndex >= Math.max(0, beatsInThisStep.length - 1);
  const isLastStep = stepIndex >= storySteps.length - 1;

  const canGoNext = started && !(isLastStep && isLastBeatInStep);

  const handleNext = useCallback(() => {
    stopVoice();
    setCanResume(false);

    const stepObj = storySteps[stepIndex];
    const beats = stepObj?.beats ?? [];
    const lastBeatIdx = Math.max(0, beats.length - 1);

    const isLastBeatInStepLocal = beatIndex >= lastBeatIdx;
    const isLastStepLocal = stepIndex >= storySteps.length - 1;

    if (!isLastBeatInStepLocal) {
      const next = goToBeat(stepIndex, beatIndex + 1);

      prefetchUpcomingBeats(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
        }, 200);
      }
      return;
    }

    if (!isLastStepLocal) {
      const next = goToBeat(stepIndex + 1, 0);

      prefetchUpcomingBeats(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
        }, 200);
      }
      return;
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, prefetchUpcomingBeats]);

  return (
    <ReactFlowProvider>
      <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
        <div style={{ height: "100vh" }}>
          <FlowCanvas
            nodes={nodesToRender}
            edges={edgesToRender}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            focusTarget={focusTarget}
            overlayRect={panelRect}
          />
        </div>

        <LessonPanel
          panelRef={panelRef}
          started={started}
          title={step?.title}
          progressText={`${currentBeatNumber}/${totalBeats}`}
          beatText={currentBeat?.narration}
          beatImages={currentBeat?.images ?? []}
          isRunning={autoplayOn}
          canGoBack={canGoBack}
          canGoNext={canGoNext}
          onStart={startFromHere}
          onResume={handleResume}
          onStop={handleStopLesson}
          onBack={handleBack}
          onNext={handleNext}
          canResume={canResume}
          highlightRange={ttsRange}
          teachingToneOn={teachingToneOn}
          onToggleTeachingTone={() => setTeachingToneOn((v) => !v)}
          speakingState={speakingState}
        />
      </div>
    </ReactFlowProvider>
  );
}
