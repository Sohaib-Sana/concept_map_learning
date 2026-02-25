// src/hooks/useTtsPlayer.js
import { useCallback, useEffect, useRef, useState } from "react";
import { buildTtsRequest } from "../tts/request";
import { getCachedAudioBlob, hashForTtsRequest, putCachedAudioBlob } from "../tts/cache";
import { buildCumulativeTimes, buildSpans, findTokenIndexAtTime, highlightRangeFromToken } from "../tts/timing";

export function useTtsPlayer({ teachingToneOn, fetchTtsBlobWithRetry, prefetchUpcomingBeats, highlightConfig }) {
  const HIGHLIGHT_WORDS = highlightConfig?.highlightWords ?? 6;
  const LOOKAHEAD_WORDS = highlightConfig?.lookaheadWords ?? 1;

  const [speakingState, setSpeakingState] = useState("idle"); // "idle" | "loading" | "speaking" | "paused"
  const [ttsRange, setTtsRange] = useState(null);
  const [canResume, setCanResume] = useState(false);

  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const ttsAbortRef = useRef(null);

  const spansRef = useRef([]);
  const cumTimeRef = useRef([]);
  const rafRef = useRef(null);
  const lastRangeRef = useRef(null);

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
    try {
      ttsAbortRef.current?.abort?.();
    } catch {}
    ttsAbortRef.current = null;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    spansRef.current = [];
    cumTimeRef.current = [];
    lastRangeRef.current = null;

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

  const speak = useCallback(
    async (text, { onEnd, stepIdxForPrefetch, beatIdxForPrefetch } = {}) => {
      const raw = String(text ?? "");
      if (!raw.trim()) {
        setSpeakingState("idle");
        setCanResume(false);
        setTtsRange(null);
        return;
      }

      stopVoice();

      const spans = buildSpans(raw);
      spansRef.current = spans;
      cumTimeRef.current = [];
      lastRangeRef.current = null;

      setSpeakingState("loading");
      setCanResume(false);
      setTtsRange({ start: 0, end: 0 });

      const ttsReq = buildTtsRequest(raw, teachingToneOn);
      const hash = await hashForTtsRequest(ttsReq);

      let blob = await getCachedAudioBlob(hash);

      if (!blob) {
        const controller = new AbortController();
        ttsAbortRef.current = controller;

        try {
          // NOTE: fetchTtsBlobWithRetry doesn't accept AbortSignal currently.
          blob = await fetchTtsBlobWithRetry(ttsReq, { tries: 2, baseDelayMs: 300 });
          putCachedAudioBlob(hash, blob);
        } finally {
          ttsAbortRef.current = null;
        }
      }

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
        cumTimeRef.current = buildCumulativeTimes(raw, spansRef.current, a.duration || 0);
      };

      a.onplay = () => {
        setSpeakingState("speaking");
        setCanResume(true);

        if (Number.isFinite(stepIdxForPrefetch) && Number.isFinite(beatIdxForPrefetch)) {
          prefetchUpcomingBeats?.(stepIdxForPrefetch, beatIdxForPrefetch);
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
      };

      a.onpause = () => {
        if (!a.ended) setSpeakingState("paused");
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      };

      const cleanupAfterEndOrError = () => {
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

      a.onended = () => {
        cleanupAfterEndOrError();
        if (onEnd) onEnd();
      };

      a.onerror = () => {
        cleanupAfterEndOrError();
      };

      a.src = url;

      try {
        await a.play();
      } catch {
        cleanupAfterEndOrError();
      }
    },
    [stopVoice, teachingToneOn, fetchTtsBlobWithRetry, prefetchUpcomingBeats, cleanupAudioUrl, HIGHLIGHT_WORDS, LOOKAHEAD_WORDS],
  );

  useEffect(() => {
    return () => stopVoice();
  }, [stopVoice]);

  return {
    speak,
    stopVoice,
    pauseVoice,
    resumeVoice,
    speakingState,
    ttsRange,
    canResume,
    setCanResume,
  };
}
