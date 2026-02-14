// App.jsx
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Background, Controls, ReactFlow, ReactFlowProvider, useReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initialNodes, initialEdges } from "./components/nodeBank";
import { customNode } from "./model/nodeModel";

import "./app.css";

import { storySteps } from "./story/storySteps";
import { LessonPanel } from "./components/lessonPanel";

const nodeTypes = {
  customNode: customNode,
};

function FlowCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, focusTarget }) {
  const rf = useReactFlow();

  useEffect(() => {
    if (!focusTarget || focusTarget.length === 0) return;

    const t = window.setTimeout(() => {
      const ids = focusTarget;

      // If only one node: keep your existing setCenter behavior
      if (ids.length === 1) {
        const node = rf.getNode(ids[0]);
        if (!node || node?.data?.isJunction) return;

        const x = node.positionAbsolute?.x ?? node.position.x ?? 0;
        const y = node.positionAbsolute?.y ?? node.position.y ?? 0;

        const w = node.measured?.width ?? 150;
        const h = node.measured?.height ?? 50;

        rf.setCenter(x + w / 2, y + h / 2, { zoom: 1.15, duration: 650 });
        return;
      }

      // Multiple nodes: fitView to all of them
      rf.fitView({
        nodes: ids.map((id) => rf.getNode(id)).filter(Boolean),
        padding: 0.35,
        duration: 700,
      });
    }, 60);

    return () => window.clearTimeout(t);
  }, [focusTarget, rf]);

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
  const [stepIndex, setStepIndex] = useState(0);

  // Visible graph state
  const [visibleNodeIds, setVisibleNodeIds] = useState(["n1"]);
  const [visibleEdgeIds, setVisibleEdgeIds] = useState([]);
  const [newNodeIds, setNewNodeIds] = useState([]);

  const step = storySteps[stepIndex];
  const [beatIndex, setBeatIndex] = useState(0);
  const currentBeat = step?.beats?.[beatIndex];

  // ---------- Voice (TTS) ----------
  const voiceSupported = typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";

  const [speakingState, setSpeakingState] = useState("idle"); // "idle" | "speaking" | "paused"

  // Autoplay flag
  const [autoplayOn, setAutoplayOn] = useState(false);

  // This ref prevents "stale closure" issues during chained autoplay
  const autoplayRef = useRef(false);
  useEffect(() => {
    autoplayRef.current = autoplayOn;
  }, [autoplayOn]);

  const stopVoice = useCallback(() => {
    if (!voiceSupported) return;
    window.speechSynthesis.cancel();
    setSpeakingState("idle");
  }, [voiceSupported]);

  const speak = useCallback(
    (text, { onEnd } = {}) => {
      if (!voiceSupported) return;

      const t = (text ?? "").trim();
      if (!t) return;

      // Stop current speech before starting new
      window.speechSynthesis.cancel();

      const u = new window.SpeechSynthesisUtterance(t);
      u.rate = 1;
      u.pitch = 1;
      u.volume = 1;

      u.onstart = () => setSpeakingState("speaking");
      u.onend = () => {
        setSpeakingState("idle");
        if (onEnd) onEnd();
      };
      u.onerror = () => setSpeakingState("idle");

      window.speechSynthesis.speak(u);
    },
    [voiceSupported],
  );

  const playVoice = useCallback(() => {
    speak(step?.narration);
  }, [speak, step]);

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

  // ---------- Render subsets + animation flags ----------
  const nodesToRender = useMemo(() => {
    const visible = new Set(visibleNodeIds);
    const newly = new Set(newNodeIds);

    return allNodes
      .filter((n) => visible.has(n.id))
      .map((n) => ({
        ...n,
        data: {
          ...n.data,
          isNew: newly.has(n.id),
        },
      }));
  }, [allNodes, visibleNodeIds, newNodeIds]);

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

  // Helper: apply a step's reveal config + compute newly revealed nodes (FIXED)
  const applyStepReveal = useCallback((s) => {
    setVisibleNodeIds((prev) => {
      const prevSet = new Set(prev);
      const next = s.reveal.nodes;

      const added = next.filter((id) => !prevSet.has(id));
      setNewNodeIds(added);

      if (added.length > 0) {
        window.setTimeout(() => setNewNodeIds([]), 750);
      } else {
        setNewNodeIds([]);
      }

      return next;
    });

    setVisibleEdgeIds(s.reveal.edges);
  }, []);

  // Go to a step index reliably
  // const goToStep = useCallback(
  //   (idx) => {
  //     const clamped = Math.max(0, Math.min(idx, storySteps.length - 1));
  //     setStepIndex(clamped);
  //     applyStepReveal(storySteps[clamped]);
  //     return clamped;
  //   },
  //   [applyStepReveal],
  // );

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

  // Autoplay engine: speak current step, then advance on end (if autoplay still on)
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

          // Next beat in same step
          if (!isLastBeatInStep) {
            const next = goToBeat(sIdx, bIdx + 1);
            window.setTimeout(() => {
              if (!autoplayRef.current) return;
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, 250);
            return;
          }

          // Move to next step, first beat
          if (!isLastStep) {
            const next = goToBeat(sIdx + 1, 0);
            window.setTimeout(() => {
              if (!autoplayRef.current) return;
              speakBeatAndAutoadvance(next.stepIndex, next.beatIndex);
            }, 250);
            return;
          }

          // End of lesson
          setAutoplayOn(false);
          autoplayRef.current = false;
        },
      });
    },
    [goToBeat, speak],
  );

  // Start lesson:
  // - if first time: start at 0
  // - if stopped mid-way: resume from current stepIndex
  const handleStart = useCallback(() => {
    setStarted(true);
    setAutoplayOn(true);
    autoplayRef.current = true;

    stopVoice();

    // if first time, start at (0,0). If resuming, continue from current beat.
    const sIdx = started ? stepIndex : 0;
    const bIdx = started ? beatIndex : 0;

    goToBeat(sIdx, bIdx);

    window.setTimeout(() => {
      if (!autoplayRef.current) return;
      speakBeatAndAutoadvance(sIdx, bIdx);
    }, 200);
  }, [started, stepIndex, beatIndex, goToBeat, speakBeatAndAutoadvance, stopVoice]);

  const handleStopLesson = useCallback(() => {
    setAutoplayOn(false);
    autoplayRef.current = false;
    stopVoice();
  }, [stopVoice]);

  const handleBack = useCallback(() => {
    // If there is a previous beat in the same step
    if (beatIndex > 0) {
      const prev = goToBeat(stepIndex, beatIndex - 1);

      if (autoplayRef.current) {
        stopVoice();
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(prev.stepIndex, prev.beatIndex);
        }, 200);
      }
      return;
    }

    // Otherwise go to previous step's LAST beat
    if (stepIndex > 0) {
      const prevStepBeats = storySteps[stepIndex - 1].beats ?? [];
      const lastBeatIndex = Math.max(0, prevStepBeats.length - 1);

      const prev = goToBeat(stepIndex - 1, lastBeatIndex);

      if (autoplayRef.current) {
        stopVoice();
        window.setTimeout(() => {
          if (!autoplayRef.current) return;
          speakBeatAndAutoadvance(prev.stepIndex, prev.beatIndex);
        }, 200);
      }
    }
  }, [beatIndex, stepIndex, goToBeat, stopVoice, speakBeatAndAutoadvance]);

  // Only focus if the focus node is currently visible
  const focusTarget = useMemo(() => {
    const f = currentBeat?.focus; // (in beats) or step?.focus if you still use that somewhere
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
          />
        </div>

        <LessonPanel
          started={started}
          title={step?.title}
          progressText={`${currentBeatNumber}/${totalBeats}`}
          beatText={currentBeat?.narration}
          beatImages={currentBeat?.images ?? []}
          isRunning={autoplayOn}
          canGoBack={canGoBack}
          onStart={handleStart}
          onStop={handleStopLesson}
          onBack={handleBack}
        />
      </div>
    </ReactFlowProvider>
  );
}
