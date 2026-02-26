// src/App.jsx
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initialNodes, initialEdges } from "./components/nodeBank";
import { customNode } from "./model/nodeModel";
import { PhaseEdge } from "./model/edgeModel";
import "./App.css";

import { storySteps } from "./story/storySteps";
import { LessonPanel } from "./components/lessonPanel";
import { fetchTtsBlobWithRetry } from "./helpers/fetchTtsBlobWithRetry";
import { FlowCanvas } from "./components/FlowCanvas";

import { useTtsPrefetch } from "./hooks/useTtsPrefetch";
import { useTtsPlayer } from "./hooks/useTtsPlayer";

const nodeTypes = { customNode };
const edgeTypes = { PhaseEdge };

export default function App() {
  // Full graph
  const [allNodes, setAllNodes] = useState(initialNodes);
  const [allEdges, setAllEdges] = useState(initialEdges);

  // Lesson state
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  // NEW: remember correct answers per beat so user can't skip later
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

  // NEW: teaching tone toggle
  const [teachingToneOn, setTeachingToneOn] = useState(true);

  // Autoplay flag
  const [autoplayOn, setAutoplayOn] = useState(false);
  const autoplayRef = useRef(false);
  useEffect(() => {
    autoplayRef.current = autoplayOn;
  }, [autoplayOn]);

  // Lesson question gate
  const [activeQuestion, setActiveQuestion] = useState(null);
  // shape: { stepIndex, beatIndex, prompt, options, correctIndex?, selectedIndex? }
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

  // TTS player hook
  const { speak, stopVoice, pauseVoice, resumeVoice, speakingState, ttsRange, canResume, setCanResume } = useTtsPlayer({
    teachingToneOn,
    fetchTtsBlobWithRetry,
    prefetchUpcomingBeats: (sIdx, bIdx) => prefetchUpcomingBeats(sIdx, bIdx, PREFETCH_AHEAD),
    highlightConfig: { highlightWords: 6, lookaheadWords: 1 },
  });

  // Clear highlight whenever the visible narration changes
  useEffect(() => {
    // handled by player end/stop, but keep parity with original
    // (LessonPanel gets null highlight until speak starts)
  }, [currentBeat?.narration]);

  const showQuestionForBeat = useCallback((sIdx, bIdx) => {
    const beat = storySteps[sIdx]?.beats?.[bIdx];
    if (!beat?.question?.prompt || !Array.isArray(beat.question.options)) return false;

    setActiveQuestion({ stepIndex: sIdx, beatIndex: bIdx, ...beat.question });
    setQuestionFeedback(null);
    setWaitingForAnswer(true);
    return true;
  }, []);

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
      clearQuestionGate(); // 👈 NEW (prevents stale question when navigating)
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
          const key = `${sIdx}:${bIdx}`;

          // 👇 show question only if not already answered correctly
          if (!answeredCorrectByBeat[key] && beat.question?.prompt && Array.isArray(beat.question?.options)) {
            setActiveQuestion({ stepIndex: sIdx, beatIndex: bIdx, ...beat.question });
            setQuestionFeedback(null);
            setWaitingForAnswer(true);
            return;
          }
          if (!autoplayRef.current) return;
          if (beat.question?.prompt && Array.isArray(beat.question?.options)) {
            setActiveQuestion({
              stepIndex: sIdx,
              beatIndex: bIdx,
              ...beat.question,
            });
            setQuestionFeedback(null);
            setWaitingForAnswer(true);
            return; // IMPORTANT: do not advance until answered
          }

          const isLastBeatInStep = bIdx >= beats.length - 1;
          const isLastStep = sIdx >= storySteps.length - 1;

          if (!isLastBeatInStep) {
            const next = goToBeat(sIdx, bIdx + 1);
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
    [goToBeat, speak, prefetchUpcomingBeats, PREFETCH_AHEAD, setCanResume, answeredCorrectByBeat],
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
    prefetchUpcomingBeats(sIdx, bIdx, PREFETCH_AHEAD);

    window.setTimeout(() => {
      if (!autoplayRef.current) return;
      speakBeatAndAutoadvance(sIdx, bIdx);
    }, 200);
  }, [started, stepIndex, beatIndex, goToBeat, speakBeatAndAutoadvance, stopVoice, prefetchUpcomingBeats, PREFETCH_AHEAD, setCanResume]);

  // Resume if possible, else start from current page
  const handleResume = useCallback(() => {
    setAutoplayOn(true);
    autoplayRef.current = true;

    // player owns the Audio element; canResume means it’s really resumable
    if (canResume) {
      resumeVoice();
      return;
    }

    startFromHere();
  }, [canResume, resumeVoice, startFromHere]);

  // Pause lesson (do NOT cancel), mark resumability
  const handleStopLesson = useCallback(() => {
    setAutoplayOn(false);
    autoplayRef.current = false;

    // we mirror your original logic: pausing while playing implies resumable
    setCanResume(true);
    pauseVoice();
  }, [pauseVoice, setCanResume]);

  const handleBack = useCallback(() => {
    stopVoice();
    setCanResume(false);

    if (beatIndex > 0) {
      const prev = goToBeat(stepIndex, beatIndex - 1);
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
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, prefetchUpcomingBeats, PREFETCH_AHEAD, setCanResume]);

  const handleNext = useCallback(() => {
    stopVoice();
    setCanResume(false);

    const current = storySteps[stepIndex]?.beats?.[beatIndex];
    const key = `${stepIndex}:${beatIndex}`;

    if (current?.question && !answeredCorrectByBeat[key]) {
      // show the question instead of moving forward
      showQuestionForBeat(stepIndex, beatIndex);
      return;
    }

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
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, prefetchUpcomingBeats, PREFETCH_AHEAD, setCanResume]);

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
  // allow next only if not in question mode OR user has answered correctly
  const allowForward = !isQuestionMode || questionFeedback?.isCorrect === true;
  const canGoNext = started && !(isLastStep && isLastBeatInStep) && allowForward;

  const handleAnswer = useCallback(
    (selectedIndex) => {
      if (!activeQuestion) return;

      const correctIndex = activeQuestion.correctIndex;
      const isCorrect = selectedIndex === correctIndex;

      setQuestionFeedback({ selectedIndex, isCorrect });

      // ❌ Wrong: stay here (do not continue)
      if (!isCorrect) return;
      if (isCorrect) {
        const key = `${activeQuestion.stepIndex}:${activeQuestion.beatIndex}`;
        setAnsweredCorrectByBeat((prev) => ({ ...prev, [key]: true }));
      }

      // ✅ Correct: close question and continue
      setWaitingForAnswer(false);

      // continue autoplay if it was on
      if (!autoplayRef.current) return;

      const sIdx = activeQuestion.stepIndex;
      const bIdx = activeQuestion.beatIndex;

      const stepObj = storySteps[sIdx];
      const beats = stepObj?.beats ?? [];

      const isLastBeatInStep = bIdx >= beats.length - 1;
      const isLastStep = sIdx >= storySteps.length - 1;

      // small delay so user sees green feedback
      window.setTimeout(() => {
        if (!isLastBeatInStep) {
          const next = goToBeat(sIdx, bIdx + 1);
          prefetchUpcomingBeats(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

          window.setTimeout(() => {
            if (!autoplayRef.current) return;
            speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
          }, 200);
          return;
        }

        if (!isLastStep) {
          const next = goToBeat(sIdx + 1, 0);
          prefetchUpcomingBeats(next.stepIndex, next.beatIndex, PREFETCH_AHEAD);

          window.setTimeout(() => {
            if (!autoplayRef.current) return;
            speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
          }, 200);
          return;
        }

        setAutoplayOn(false);
        autoplayRef.current = false;
        setCanResume(false);
      }, 450);
    },
    [activeQuestion, goToBeat, prefetchUpcomingBeats, PREFETCH_AHEAD, speakBeatAndAutoadvance, setCanResume],
  );

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
          questionFeedback={questionFeedback}
        />
      </div>
    </ReactFlowProvider>
  );
}
