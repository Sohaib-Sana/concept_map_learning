// App.jsx
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Background, Controls, ReactFlow, ReactFlowProvider, useReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initialNodes, initialEdges } from "./components/nodeBank";
import { customNode } from "./model/nodeModel";

import "./App.css";

import { storySteps } from "./story/storySteps";
import { LessonPanel } from "./components/lessonPanel";

const nodeTypes = {
  customNode: customNode,
};

function FlowCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, focusTarget, overlayRect }) {
  const rf = useReactFlow();

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
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
        zoom = clamp(z, 0.2, 1.4);
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

  // ---------- Voice (TTS) ----------
  const voiceSupported = typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";

  const [speakingState, setSpeakingState] = useState("idle"); // "idle" | "speaking" | "paused"

  // ✅ highlight range for the currently spoken word
  const [ttsRange, setTtsRange] = useState(null); // { start, end } | null
  const HIGHLIGHT_WORDS = 6;
  const LOOKAHEAD_WORDS = 1;

  // ✅ NEW: whether "Resume" is truly possible (paused utterance exists)
  const [canResume, setCanResume] = useState(false);

  // Clear highlight whenever the visible narration changes
  useEffect(() => {
    setTtsRange(null);
  }, [currentBeat?.narration]);

  // Autoplay flag
  const [autoplayOn, setAutoplayOn] = useState(false);

  // This ref prevents "stale closure" issues during chained autoplay
  const autoplayRef = useRef(false);
  useEffect(() => {
    autoplayRef.current = autoplayOn;
  }, [autoplayOn]);

  const stopVoice = useCallback(() => {
    if (!voiceSupported) return;

    const synth = window.speechSynthesis;

    // Force resume before cancel to avoid "stuck paused" in some browsers
    try {
      synth.resume();
    } catch {}

    synth.cancel();

    setSpeakingState("idle");
    setTtsRange(null);
    setCanResume(false);
  }, [voiceSupported]);

  const speak = useCallback(
    (text, { onEnd } = {}) => {
      if (!voiceSupported) return;

      const raw = text ?? "";
      if (!raw.trim()) return;

      // Stop current speech before starting new
      window.speechSynthesis.cancel();
      setCanResume(false);
      setTtsRange(null);

      // Build token spans once for this utterance (non-whitespace chunks)
      const spans = [];
      const re = /\S+/g;
      let m;
      while ((m = re.exec(raw))) {
        spans.push({ start: m.index, end: m.index + m[0].length });
      }

      const findSpanIndex = (charIndex) => {
        let lo = 0;
        let hi = spans.length - 1;

        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          const s = spans[mid];
          if (charIndex < s.start) hi = mid - 1;
          else if (charIndex >= s.end) lo = mid + 1;
          else return mid;
        }

        return Math.max(0, Math.min(lo, spans.length - 1));
      };

      const u = new window.SpeechSynthesisUtterance(raw);
      u.rate = 1;
      u.pitch = 1;
      u.volume = 1;

      u.onstart = () => {
        setSpeakingState("speaking");
        setTtsRange({ start: 0, end: 0 });
      };

      u.onboundary = (e) => {
        if (typeof e.charIndex !== "number") return;
        if (e.name && e.name !== "word") return;
        if (spans.length === 0) return;

        const i = findSpanIndex(e.charIndex);

        const startToken = Math.max(0, i - (HIGHLIGHT_WORDS - 1));
        const endToken = Math.min(spans.length - 1, i + LOOKAHEAD_WORDS);

        const start = spans[startToken].start;
        const end = endToken + 1 < spans.length ? spans[endToken + 1].start : raw.length;

        setTtsRange({ start, end });
      };

      u.onend = () => {
        setSpeakingState("idle");
        setTtsRange(null);
        setCanResume(false); // ended => can't resume
        if (onEnd) onEnd();
      };

      u.onerror = () => {
        setSpeakingState("idle");
        setTtsRange(null);
        setCanResume(false);
      };

      window.speechSynthesis.speak(u);
    },
    [voiceSupported],
  );

  const pauseVoice = useCallback(() => {
    if (!voiceSupported) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setSpeakingState("paused");
    }
  }, [voiceSupported]);

  const resumeVoice = useCallback(() => {
    if (!voiceSupported) return;
    window.speechSynthesis.resume();
    setSpeakingState("speaking");
  }, [voiceSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (voiceSupported) window.speechSynthesis.cancel();
    };
  }, [voiceSupported]);

  // ---------- Panel Location  ----------//
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
        onEnd: () => {
          if (!autoplayRef.current) return;

          const isLastBeatInStep = bIdx >= beats.length - 1;
          const isLastStep = sIdx >= storySteps.length - 1;

          if (!isLastBeatInStep) {
            const next = goToBeat(sIdx, bIdx + 1);
            window.setTimeout(() => {
              if (!autoplayRef.current) return;
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, 250);
            return;
          }

          if (!isLastStep) {
            const next = goToBeat(sIdx + 1, 0);
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
    [goToBeat, speak],
  );

  // ✅ Start fresh from the current beat/page
  const startFromHere = useCallback(() => {
    setStarted(true);
    setAutoplayOn(true);
    autoplayRef.current = true;

    setCanResume(false);

    // ensure engine is not stuck
    stopVoice();

    const sIdx = started ? stepIndex : 0;
    const bIdx = started ? beatIndex : 0;

    goToBeat(sIdx, bIdx);

    window.setTimeout(() => {
      if (!autoplayRef.current) return;
      speakBeatAndAutoadvance(sIdx, bIdx);
    }, 200);
  }, [started, stepIndex, beatIndex, goToBeat, speakBeatAndAutoadvance, stopVoice]);

  // ✅ Resume if possible, else start from current page
  const handleResume = useCallback(() => {
    setAutoplayOn(true);
    autoplayRef.current = true;

    const synth = voiceSupported ? window.speechSynthesis : null;
    if (synth && synth.paused && canResume) {
      resumeVoice();
      return;
    }

    startFromHere();
  }, [voiceSupported, canResume, resumeVoice, startFromHere]);

  // ✅ Pause lesson (do NOT cancel), mark resumability
  const handleStopLesson = useCallback(() => {
    setAutoplayOn(false);
    autoplayRef.current = false;

    const synth = voiceSupported ? window.speechSynthesis : null;
    const resumable = !!(synth && synth.speaking); // must be speaking to pause & resume
    setCanResume(resumable);

    pauseVoice();
  }, [pauseVoice, voiceSupported]);

  const handleBack = useCallback(() => {
    stopVoice();
    setCanResume(false);

    if (beatIndex > 0) {
      const prev = goToBeat(stepIndex, beatIndex - 1);

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

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(prev.stepIndex, prev.beatIndex);
        }, 200);
      }
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance]);

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

    const isLastBeatInStep = beatIndex >= lastBeatIdx;
    const isLastStep = stepIndex >= storySteps.length - 1;

    if (!isLastBeatInStep) {
      const next = goToBeat(stepIndex, beatIndex + 1);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
        }, 200);
      }
      return;
    }

    if (!isLastStep) {
      const next = goToBeat(stepIndex + 1, 0);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
        }, 200);
      }
      return;
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance]);

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
        />
      </div>
    </ReactFlowProvider>
  );
}
