// src/App.jsx
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { LESSONS } from "./lessons";
import { customNode } from "./model/nodeModel";
import { PhaseEdge } from "./model/edgeModel";
import "./App.css";

import { LessonPanel } from "./components/lessonPanel";
import { fetchTtsBlobWithRetry } from "./helpers/fetchTtsBlobWithRetry";
import { FlowCanvas } from "./components/FlowCanvas";

import { useTtsPrefetch } from "./hooks/useTtsPrefetch";
import { useTtsPlayer } from "./hooks/useTtsPlayer";

const nodeTypes = { customNode };
const edgeTypes = { PhaseEdge };

const ACTIVE_LESSON_ID = "makingSenseOfStuff";
const lesson = LESSONS[ACTIVE_LESSON_ID];
const storySteps = lesson.storySteps;

export default function App() {
  const DEV_DISABLE_TTS = import.meta.env.VITE_DISABLE_TTS === "true";
  // Full graph
  const [allNodes, setAllNodes] = useState(() => lesson.initialNodes);
  const [allEdges, setAllEdges] = useState(() => lesson.initialEdges);

  // Lesson state
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);

  // remember correct answers per beat so user can't skip later
  const [answeredCorrectByBeat, setAnsweredCorrectByBeat] = useState({});
  // key format: `${stepIndex}:${beatIndex}` -> true

  // Visible graph state
  const [visibleNodeIds, setVisibleNodeIds] = useState([""]);
  const [visibleEdgeIds, setVisibleEdgeIds] = useState([]);
  const [newNodeIds, setNewNodeIds] = useState([]);

  const step = storySteps[stepIndex];
  const [beatIndex, setBeatIndex] = useState(0);
  const currentBeat = step?.beats?.[beatIndex];
  const [ghostNodeIds, setGhostNodeIds] = useState([]);

  // teaching tone toggle
  const [teachingToneOn, setTeachingToneOn] = useState(true);

  // Autoplay flag
  const [autoplayOn, setAutoplayOn] = useState(false);
  const autoplayRef = useRef(false);
  useEffect(() => {
    autoplayRef.current = autoplayOn;
  }, [autoplayOn]);

  // Lesson question gate
  const [activeQuestion, setActiveQuestion] = useState(null);
  // shape: { stepIndex, beatIndex, prompt, options, correctIndex }
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState(null);
  // shape: { selectedIndex, isCorrect }

  const clearQuestionGate = useCallback(() => {
    setActiveQuestion(null);
    setWaitingForAnswer(false);
  }, []);

  // Prefetch hook
  const { prefetchUpcomingBeats, PREFETCH_AHEAD } = useTtsPrefetch({
    storySteps,
    teachingToneOn,
    fetchTtsBlobWithRetry,
  });

  const safePrefetch = useCallback(
    (sIdx, bIdx, ahead) => {
      if (DEV_DISABLE_TTS) return;
      prefetchUpcomingBeats(sIdx, bIdx, ahead);
    },
    [prefetchUpcomingBeats],
  );

  // TTS player hook
  const { speak, stopVoice, pauseVoice, resumeVoice, speakingState, ttsRange, canResume, setCanResume } = useTtsPlayer({
    teachingToneOn,
    fetchTtsBlobWithRetry,
    prefetchUpcomingBeats: (sIdx, bIdx) => safePrefetch(sIdx, bIdx, PREFETCH_AHEAD),
    highlightConfig: { highlightWords: 6, lookaheadWords: 1 },
  });

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
      clearQuestionGate();
      setQuestionFeedback(null);

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
    [applyStepReveal, clearQuestionGate],
  );

  // Show question and pause autoplay
  const showQuestionForBeat = useCallback(
    (sIdx, bIdx) => {
      const beat = storySteps[sIdx]?.beats?.[bIdx];
      if (!beat?.question?.prompt || !Array.isArray(beat.question.options)) return false;

      setAutoplayOn(false);
      autoplayRef.current = false;
      setCanResume(false);

      setActiveQuestion({ stepIndex: sIdx, beatIndex: bIdx, ...beat.question });
      setQuestionFeedback(null);
      setWaitingForAnswer(true);
      return true;
    },
    [setCanResume],
  );

  // Autoplay engine: speak beat, then advance on end (ONLY if no question gate)
  const speakBeatAndAutoadvance = useCallback(
    (sIdx, bIdx) => {
      if (DEV_DISABLE_TTS) return;
      const stepObj = storySteps[sIdx];
      if (!stepObj) return;

      const beats = stepObj.beats ?? [];
      const beat = beats[bIdx];
      if (!beat) return;

      speak(beat.narration, {
        stepIdxForPrefetch: sIdx,
        beatIdxForPrefetch: bIdx,
        onEnd: () => {
          const key = `${sIdx}:${bIdx}`;

          // If beat has a question and not answered correctly yet: show question and STOP.
          if (!answeredCorrectByBeat[key] && beat.question?.prompt && Array.isArray(beat.question?.options)) {
            showQuestionForBeat(sIdx, bIdx);
            return;
          }

          if (!autoplayRef.current) return;

          const isLastBeatInStep = bIdx >= beats.length - 1;
          const isLastStep = sIdx >= storySteps.length - 1;

          if (!isLastBeatInStep) {
            const next = goToBeat(sIdx, bIdx + 1);
            safePrefetch(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

            window.setTimeout(() => {
              if (!autoplayRef.current) return;
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, 250);
            return;
          }

          if (!isLastStep) {
            const next = goToBeat(sIdx + 1, 0);
            safePrefetch(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

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
    [speak, goToBeat, safePrefetch, PREFETCH_AHEAD, setCanResume, answeredCorrectByBeat, showQuestionForBeat],
  );

  // Start fresh from the current beat/page
  const startFromHere = useCallback(() => {
    setStarted(true);

    const sIdx = started ? stepIndex : 0;
    const bIdx = started ? beatIndex : 0;

    goToBeat(sIdx, bIdx);

    if (DEV_DISABLE_TTS) {
      // No autoplay, no voice. User reads and clicks Next/Back.
      setAutoplayOn(false);
      autoplayRef.current = false;
      setCanResume(false);
      return;
    }

    setAutoplayOn(true);
    autoplayRef.current = true;

    setCanResume(false);
    stopVoice();

    safePrefetch(sIdx, bIdx, PREFETCH_AHEAD);

    window.setTimeout(() => {
      if (!autoplayRef.current) return;
      speakBeatAndAutoadvance(sIdx, bIdx);
    }, 200);
  }, [DEV_DISABLE_TTS, started, stepIndex, beatIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, safePrefetch, PREFETCH_AHEAD, setCanResume]);

  const handleResume = useCallback(() => {
    if (DEV_DISABLE_TTS) {
      // Resume just means "stay in manual mode"
      setAutoplayOn(false);
      autoplayRef.current = false;
      setCanResume(false);
      return;
    }

    setAutoplayOn(true);
    autoplayRef.current = true;

    if (canResume) {
      resumeVoice();
      return;
    }
    startFromHere();
  }, [DEV_DISABLE_TTS, canResume, resumeVoice, startFromHere, setCanResume]);

  const handleStopLesson = useCallback(() => {
    if (DEV_DISABLE_TTS) return; // nothing to pause
    setAutoplayOn(false);
    autoplayRef.current = false;

    setCanResume(true);
    pauseVoice();
  }, [DEV_DISABLE_TTS, pauseVoice, setCanResume]);

  const handleBack = useCallback(() => {
    if (!DEV_DISABLE_TTS) stopVoice();
    setCanResume(false);

    if (beatIndex > 0) {
      const prev = goToBeat(stepIndex, beatIndex - 1);
      safePrefetch(prev.stepIndex, prev.beatIndex, PREFETCH_AHEAD);

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
      safePrefetch(prev.stepIndex, prev.beatIndex, PREFETCH_AHEAD);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(prev.stepIndex, prev.beatIndex);
        }, 200);
      }
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, safePrefetch, PREFETCH_AHEAD, setCanResume]);

  const handleNext = useCallback(() => {
    if (!DEV_DISABLE_TTS) stopVoice();
    setCanResume(false);

    const current = storySteps[stepIndex]?.beats?.[beatIndex];
    const key = `${stepIndex}:${beatIndex}`;

    if (current?.question && !answeredCorrectByBeat[key]) {
      // if user hasn't selected anything yet, show question and stop
      if (!questionFeedback) {
        showQuestionForBeat(stepIndex, beatIndex);
        return;
      }
      // user selected something (even if wrong) → allow Next to proceed
    }

    const stepObj = storySteps[stepIndex];
    const beats = stepObj?.beats ?? [];
    const lastBeatIdx = Math.max(0, beats.length - 1);

    const isLastBeatInStepLocal = beatIndex >= lastBeatIdx;
    const isLastStepLocal = stepIndex >= storySteps.length - 1;

    if (!isLastBeatInStepLocal) {
      const next = goToBeat(stepIndex, beatIndex + 1);
      safePrefetch(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

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
      safePrefetch(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

      if (autoplayRef.current) {
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
        }, 200);
      }
    }
  }, [
    beatIndex,
    stepIndex,
    goToBeat,
    stopVoice,
    speakBeatAndAutoadvance,
    safePrefetch,
    PREFETCH_AHEAD,
    setCanResume,
    answeredCorrectByBeat,
    showQuestionForBeat,
  ]);

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

  const focusTarget = useMemo(() => {
    const f = currentBeat?.focus;
    if (!f) return null;
    const arr = Array.isArray(f) ? f : [f];
    const filtered = arr.filter((id) => visibleNodeIds.includes(id));
    return filtered.length > 0 ? filtered : null;
  }, [currentBeat, visibleNodeIds]);

  const totalBeats = useMemo(() => storySteps.reduce((sum, s) => sum + (s.beats?.length ?? 0), 0), []);

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

  const isQuestionMode = waitingForAnswer && activeQuestion;

  // enable Next if not in question mode OR user has selected an option
  const allowForward = !isQuestionMode || !!questionFeedback;

  const canGoNext = started && !(isLastStep && isLastBeatInStep) && allowForward;

  // Answer: set feedback ONLY (no navigation)
  const handleAnswer = useCallback(
    (selectedIndex) => {
      if (!activeQuestion) return;

      // prevent changing answer unless user hits "Try again"
      if (questionFeedback) return;

      const correctIndex = activeQuestion.correctIndex;
      const isCorrect = selectedIndex === correctIndex;

      setQuestionFeedback({ selectedIndex, isCorrect });

      if (isCorrect) {
        const key = `${activeQuestion.stepIndex}:${activeQuestion.beatIndex}`;
        setAnsweredCorrectByBeat((prev) => ({ ...prev, [key]: true }));
      }
    },
    [activeQuestion, questionFeedback],
  );

  // Unlock retry (only used when wrong)
  const handleRetryQuestion = useCallback(() => {
    setQuestionFeedback(null);
  }, []);

  return (
    <ReactFlowProvider>
      <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
        <div style={{ height: "100vh" }}>
          <FlowCanvas
            nodes={nodesToRender}
            edges={edgesToRender}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
          question={activeQuestion}
          waitingForAnswer={waitingForAnswer}
          onAnswer={handleAnswer}
          onRetryQuestion={handleRetryQuestion}
          questionFeedback={questionFeedback}
        />
      </div>
    </ReactFlowProvider>
  );
}
