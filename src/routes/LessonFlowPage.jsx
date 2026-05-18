import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { customNode } from "../model/nodeModel";
import { PhaseEdge } from "../model/edgeModel";
import "../App.css";

import { LessonPanel } from "../components/lessonPanel";
import { fetchTtsBlobWithRetry } from "../helpers/fetchTtsBlobWithRetry";
import { FlowCanvas } from "../components/flowCanvas";

import { useTtsPrefetch } from "../hooks/useTtsPrefetch";
import { useTtsPlayer } from "../hooks/useTtsPlayer";

import { useQuiz } from "../hooks/useQuiz";
import { QuizPanel } from "../components/quizPanelBig";

import { useParams, Navigate, useNavigate } from "react-router-dom";
import { LESSONS as STORIES } from "../lessons/index";

import { findPhraseTokenRange } from "../tts/timing";

// you can later move these constants elsewhere if you want
const nodeTypes = { customNode };
const edgeTypes = { PhaseEdge };

export default function LessonFlowPage() {
  const DEV_DISABLE_TTS = import.meta.env.VITE_DISABLE_TTS === "true";
  const BEAT_DELAY_MS = import.meta.env.VITE_BEAT_DELAY_MS ? parseInt(import.meta.env.VITE_BEAT_DELAY_MS) : 2500;
  const navigate = useNavigate();

  // Story Selection
  const { storyId } = useParams();
  const story = STORIES[storyId];

  // if invalid storyId, redirect to home
  if (!story) return <Navigate to="/" replace />;

  const storySteps = story.storySteps;
  const quiz = useQuiz(story.quiz);

  // Full graph
  const [allNodes, setAllNodes] = useState(() => story.initialNodes);
  const [allEdges, setAllEdges] = useState(() => story.initialEdges);

  // Lesson state
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [beatIndex, setBeatIndex] = useState(0);

  const activeBeatRef = useRef({
    stepIndex: 0,
    beatIndex: 0,
    narration: story.storySteps?.[0]?.beats?.[0]?.narration ?? "",
  });

  // remember correct answers per beat so user can't skip later
  const [answeredCorrectByBeat, setAnsweredCorrectByBeat] = useState({});
  // key format: `${stepIndex}:${beatIndex}` -> true

  // Visible graph state
  const [visibleNodeIds, setVisibleNodeIds] = useState([]);
  const [visibleEdgeIds, setVisibleEdgeIds] = useState([]);
  const [newNodeIds, setNewNodeIds] = useState([]);
  const [ghostNodeIds, setGhostNodeIds] = useState([]);
  const [activeFocusIds, setActiveFocusIds] = useState(null);

  const triggeredRevealKeysRef = useRef(new Set());

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
  const [waitingForAnswer, setWaitingForAnswer] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState(null);

  const clearQuestionGate = useCallback(() => {
    setActiveQuestion(null);
    setWaitingForAnswer(false);
  }, []);

  const step = storySteps[stepIndex];
  const currentBeat = step?.beats?.[beatIndex];

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
    [prefetchUpcomingBeats, DEV_DISABLE_TTS],
  );

  // Base reveal (on beat start)
  const applyBaseBeatReveal = useCallback((beat) => {
    const nextVisible = beat.reveal?.nodes ?? [];
    const nextGhost = beat.reveal?.ghostNodes ?? [];

    setGhostNodeIds(nextGhost);
    setVisibleEdgeIds(beat.reveal?.edges ?? []);
    setVisibleNodeIds(nextVisible);
    setNewNodeIds([]);

    const baseFocus = beat.focus ? (Array.isArray(beat.focus) ? beat.focus : [beat.focus]) : null;

    setActiveFocusIds(baseFocus);
  }, []);

  // Incremental reveal (on word trigger)
  const applyIncrementalReveal = useCallback((reveal, triggerFocus = null) => {
    const addNodes = Array.isArray(reveal?.nodes) ? reveal.nodes : [];
    const addEdges = Array.isArray(reveal?.edges) ? reveal.edges : [];
    const addGhostNodes = Array.isArray(reveal?.ghostNodes) ? reveal.ghostNodes : [];

    setGhostNodeIds((prev) => Array.from(new Set([...prev, ...addGhostNodes])));
    setVisibleEdgeIds((prev) => Array.from(new Set([...prev, ...addEdges])));

    // compute focus ids (either provided via triggerFocus or declared on the reveal)
    const focusIds = triggerFocus
      ? Array.isArray(triggerFocus)
        ? triggerFocus
        : [triggerFocus]
      : reveal?.focus
        ? Array.isArray(reveal.focus)
          ? reveal.focus
          : [reveal.focus]
        : [];

    setVisibleNodeIds((prev) => {
      const prevSet = new Set(prev);
      const added = addNodes.filter((id) => !prevSet.has(id));

      // highlight both newly added nodes and nodes that are being focused
      const highlightIds = Array.from(new Set([...(added || []), ...(focusIds || [])]));

      setNewNodeIds(highlightIds);

      if (highlightIds.length > 0) {
        window.setTimeout(() => setNewNodeIds([]), 750);
      } else {
        setNewNodeIds([]);
      }

      return Array.from(new Set([...prev, ...addNodes]));
    });

    const nextFocus = triggerFocus
      ? Array.isArray(triggerFocus)
        ? triggerFocus
        : [triggerFocus]
      : reveal?.focus
        ? Array.isArray(reveal.focus)
          ? reveal.focus
          : [reveal.focus]
        : null;

    if (nextFocus) {
      setActiveFocusIds(nextFocus);
    }
  }, []);

  const handleTokenChange = useCallback(
    ({ tokenIndex }) => {
      if (typeof tokenIndex !== "number") return;

      const active = activeBeatRef.current;
      const beat = storySteps[active.stepIndex]?.beats?.[active.beatIndex];
      if (!beat?.revealTriggers?.length) return;

      beat.revealTriggers.forEach((trigger, triggerIdx) => {
        const key = `${active.stepIndex}:${active.beatIndex}:${triggerIdx}`;

        if (triggeredRevealKeysRef.current.has(key)) return;

        const phraseRange = findPhraseTokenRange(active.narration || beat.narration, trigger.phrase);

        if (!phraseRange) return;

        // Trigger when the last token of the phrase has been spoken
        if (tokenIndex >= phraseRange.end) {
          triggeredRevealKeysRef.current.add(key);
          applyIncrementalReveal(trigger.reveal, trigger.focus);
        }
      });
    },
    [storySteps, applyIncrementalReveal],
  );

  // TTS player hook
  const { speak, stopVoice, pauseVoice, resumeVoice, speakingState, ttsRange, canResume, setCanResume } = useTtsPlayer({
    teachingToneOn,
    fetchTtsBlobWithRetry,
    prefetchUpcomingBeats: (sIdx, bIdx) => safePrefetch(sIdx, bIdx, PREFETCH_AHEAD),
    highlightConfig: { highlightWords: 6, lookaheadWords: 1 },
    onTokenChange: handleTokenChange,
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

  const goToBeat = useCallback(
    (sIdx, bIdx) => {
      triggeredRevealKeysRef.current = new Set();
      clearQuestionGate();
      setQuestionFeedback(null);

      const stepCount = storySteps.length;
      const safeStep = Math.max(0, Math.min(sIdx, stepCount - 1));

      const beats = storySteps[safeStep].beats ?? [];
      const safeBeat = Math.max(0, Math.min(bIdx, beats.length - 1));

      setStepIndex(safeStep);
      setBeatIndex(safeBeat);

      const beat = beats[safeBeat];

      activeBeatRef.current = {
        stepIndex: safeStep,
        beatIndex: safeBeat,
        narration: beat?.narration ?? "",
      };

      if (beat) applyBaseBeatReveal(beat);

      return { stepIndex: safeStep, beatIndex: safeBeat };
    },
    [applyBaseBeatReveal, clearQuestionGate, storySteps],
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
    [setCanResume, storySteps],
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

      activeBeatRef.current = {
        stepIndex: sIdx,
        beatIndex: bIdx,
        narration: beat.narration ?? "",
      };

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
            const nextStepIndex = sIdx;
            const nextBeatIndex = bIdx + 1;

            safePrefetch(nextStepIndex, nextBeatIndex, PREFETCH_AHEAD);

            window.setTimeout(() => {
              if (!autoplayRef.current) return;

              const next = goToBeat(nextStepIndex, nextBeatIndex);
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, BEAT_DELAY_MS);

            return;
          }

          if (!isLastStep) {
            const nextStepIndex = sIdx + 1;
            const nextBeatIndex = 0;

            safePrefetch(nextStepIndex, nextBeatIndex, PREFETCH_AHEAD);

            window.setTimeout(() => {
              if (!autoplayRef.current) return;

              const next = goToBeat(nextStepIndex, nextBeatIndex);
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, BEAT_DELAY_MS);

            return;
          }

          setAutoplayOn(false);
          autoplayRef.current = false;
          setCanResume(false);
        },
      });
    },
    [DEV_DISABLE_TTS, storySteps, speak, goToBeat, safePrefetch, PREFETCH_AHEAD, setCanResume, answeredCorrectByBeat, showQuestionForBeat],
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
    if (DEV_DISABLE_TTS) return;
    setAutoplayOn(false);
    autoplayRef.current = false;

    setCanResume(true);
    pauseVoice();
  }, [DEV_DISABLE_TTS, pauseVoice, setCanResume]);

  const handleStartOver = useCallback(() => {
    // Reset all state to beginning
    setStarted(false);
    setStepIndex(0);
    setBeatIndex(0);

    activeBeatRef.current = {
      stepIndex: 0,
      beatIndex: 0,
      narration: story.storySteps?.[0]?.beats?.[0]?.narration ?? "",
    };

    setAnsweredCorrectByBeat({});
    setVisibleNodeIds([]);
    setVisibleEdgeIds([]);
    setNewNodeIds([]);
    setGhostNodeIds([]);
    setActiveFocusIds(null);

    setActiveQuestion(null);
    setWaitingForAnswer(false);
    setQuestionFeedback(null);

    setCanResume(false);
    stopVoice?.();

    // Then start the lesson from the beginning
    // Use a timeout to ensure state is updated before starting
    window.setTimeout(() => {
      setStarted(true);

      const sIdx = 0;
      const bIdx = 0;

      goToBeat(sIdx, bIdx);

      if (DEV_DISABLE_TTS) {
        setAutoplayOn(false);
        autoplayRef.current = false;
        setCanResume(false);
        return;
      }

      setAutoplayOn(true);
      autoplayRef.current = true;

      setCanResume(false);
      stopVoice?.();

      safePrefetch(sIdx, bIdx, PREFETCH_AHEAD);

      window.setTimeout(() => {
        if (!autoplayRef.current) return;
        speakBeatAndAutoadvance(sIdx, bIdx);
      }, 200);
    }, 0);
  }, [story, DEV_DISABLE_TTS, stopVoice, goToBeat, safePrefetch, PREFETCH_AHEAD, speakBeatAndAutoadvance]);

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
  }, [DEV_DISABLE_TTS, beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance, safePrefetch, PREFETCH_AHEAD, setCanResume, storySteps]);

  const handleNext = useCallback(() => {
    if (!DEV_DISABLE_TTS) stopVoice();
    setCanResume(false);

    const current = storySteps[stepIndex]?.beats?.[beatIndex];
    const key = `${stepIndex}:${beatIndex}`;

    if (current?.question && !answeredCorrectByBeat[key]) {
      if (!questionFeedback) {
        showQuestionForBeat(stepIndex, beatIndex);
        return;
      }
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
    DEV_DISABLE_TTS,
    beatIndex,
    stepIndex,
    goToBeat,
    stopVoice,
    speakBeatAndAutoadvance,
    safePrefetch,
    PREFETCH_AHEAD,
    setCanResume,
    storySteps,
    answeredCorrectByBeat,
    showQuestionForBeat,
    questionFeedback,
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
    if (!activeFocusIds) return null;

    const arr = Array.isArray(activeFocusIds) ? activeFocusIds : [activeFocusIds];
    const filtered = arr.filter((id) => visibleNodeIds.includes(id));

    return filtered.length > 0 ? filtered : null;
  }, [activeFocusIds, visibleNodeIds]);

  const totalBeats = useMemo(() => storySteps.reduce((sum, s) => sum + (s.beats?.length ?? 0), 0), [storySteps]);

  const currentBeatNumber = useMemo(() => {
    let n = 0;
    for (let i = 0; i < storySteps.length; i++) {
      const len = storySteps[i].beats?.length ?? 0;
      if (i < stepIndex) n += len;
      if (i === stepIndex) n += beatIndex + 1;
    }
    return n;
  }, [stepIndex, beatIndex, storySteps]);

  const canGoBack = started && (stepIndex > 0 || beatIndex > 0);
  const beatsInThisStep = storySteps[stepIndex]?.beats ?? [];
  const isLastBeatInStep = beatIndex >= Math.max(0, beatsInThisStep.length - 1);
  const isLastStep = stepIndex >= storySteps.length - 1;

  const isQuestionMode = waitingForAnswer && activeQuestion;
  const allowForward = !isQuestionMode || !!questionFeedback;

  const canGoNext = started && !(isLastStep && isLastBeatInStep) && allowForward;
  const isLessonComplete = started && isLastStep && isLastBeatInStep;

  const inQuiz = quiz.mode === "inProgress";

  const handleTakeQuizNow = useCallback(() => {
    setAutoplayOn(false);
    autoplayRef.current = false;
    setCanResume(false);
    stopVoice();

    quiz.startQuiz();
  }, [quiz, stopVoice, setCanResume]);

  // Answer: set feedback ONLY (no navigation)
  const handleAnswer = useCallback(
    (selectedIndex) => {
      if (!activeQuestion) return;

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

  const canGoBackLocked = inQuiz ? false : canGoBack;
  const canGoNextLocked = inQuiz ? false : canGoNext;

  useEffect(() => {
    // reset the whole lesson when story changes
    setAllNodes(story.initialNodes);
    setAllEdges(story.initialEdges);

    setStarted(false);
    setStepIndex(0);
    setBeatIndex(0);

    activeBeatRef.current = {
      stepIndex: 0,
      beatIndex: 0,
      narration: story.storySteps?.[0]?.beats?.[0]?.narration ?? "",
    };

    setAnsweredCorrectByBeat({});
    setVisibleNodeIds([]);
    setVisibleEdgeIds([]);
    setNewNodeIds([]);
    setGhostNodeIds([]);
    setActiveFocusIds(null);

    setActiveQuestion(null);
    setWaitingForAnswer(false);
    setQuestionFeedback(null);

    setAutoplayOn(false);
    autoplayRef.current = false;

    stopVoice?.();
    setCanResume(false);
  }, [storyId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ReactFlowProvider>
      <button onClick={() => navigate("/")} className="backButton">
        ← Back
      </button>
      <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
        <div style={{ height: "100vh" }}>
          <FlowCanvas
            nodes={nodesToRender}
            edges={edgesToRender}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            // onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            focusTarget={focusTarget}
            overlayRect={panelRect}
          />
        </div>

        {inQuiz ? (
          <QuizPanel
            panelRef={panelRef}
            title={story.quiz?.title ?? "QUIZ"}
            progressText={quiz.progressText}
            question={quiz.currentQuestion}
            feedback={quiz.currentFeedback}
            onAnswer={quiz.answer}
            onNext={quiz.next}
          />
        ) : (
          <LessonPanel
            panelRef={panelRef}
            started={started}
            title={step?.title}
            progressText={`${currentBeatNumber}/${totalBeats}`}
            beatText={currentBeat?.narration}
            beatImages={currentBeat?.images ?? []}
            isRunning={autoplayOn}
            canGoBack={canGoBackLocked}
            canGoNext={canGoNextLocked}
            onStart={startFromHere}
            onResume={handleResume}
            onStop={handleStopLesson}
            onBack={handleBack}
            onNext={handleNext}
            canResume={canResume}
            highlightRange={ttsRange}
            speakingState={speakingState}
            question={activeQuestion}
            waitingForAnswer={waitingForAnswer}
            onAnswer={handleAnswer}
            onRetryQuestion={handleRetryQuestion}
            questionFeedback={questionFeedback}
            showTakeQuizNow={isLessonComplete && story.quiz}
            onTakeQuizNow={handleTakeQuizNow}
            description={story.description}
            isLessonComplete={isLessonComplete}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </ReactFlowProvider>
  );
}
