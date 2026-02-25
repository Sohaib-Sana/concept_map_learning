// src/hooks/useTtsPrefetch.js
import { useCallback, useEffect, useRef } from "react";
import { buildTtsRequest } from "../tts/request";
import { getCachedAudioBlob, hashForTtsRequest, putCachedAudioBlob } from "../tts/cache";

export function useTtsPrefetch({ storySteps, teachingToneOn, fetchTtsBlobWithRetry }) {
  const PREFETCH_AHEAD = 4;
  const PREFETCH_CONCURRENCY = 2;

  const prefetchInFlightRef = useRef(new Map()); // hash -> Promise
  const prefetchSessionRef = useRef(0);

  useEffect(() => {
    // When teaching tone changes, audio output changes => new hashes
    prefetchSessionRef.current += 1;
  }, [teachingToneOn]);

  const prefetchBeatAudio = useCallback(
    async (beatText, sessionId) => {
      const raw = String(beatText ?? "");
      if (!raw.trim()) return;

      if (sessionId !== prefetchSessionRef.current) return;

      const ttsReq = buildTtsRequest(raw, teachingToneOn);
      const hash = await hashForTtsRequest(ttsReq);

      const cached = await getCachedAudioBlob(hash);
      if (cached) return;

      const inflight = prefetchInFlightRef.current.get(hash);
      if (inflight) {
        await inflight.catch(() => {});
        return;
      }

      const p = (async () => {
        try {
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
    [teachingToneOn, fetchTtsBlobWithRetry],
  );

  const collectUpcomingBeatNarrations = useCallback(
    (fromStepIndex, fromBeatIndex, count) => {
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
    },
    [storySteps],
  );

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

  return {
    prefetchUpcomingBeats,
    PREFETCH_AHEAD,
  };
}
