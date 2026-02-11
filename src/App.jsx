// App.jsx
import { useState, useCallback, useMemo, useEffect } from "react";
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

function FlowCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, focusId }) {
  const rf = useReactFlow();

  // Smooth camera focus when focusId changes
  useEffect(() => {
    if (!focusId) return;

    // wait a tick so ReactFlow has measured node dimensions
    const t = window.setTimeout(() => {
      const node = rf.getNode(focusId);
      if (!node) return;

      // Skip junction nodes if you ever set focus to them
      if (node?.data?.isJunction) return;

      const x = node.positionAbsolute?.x ?? node.position.x ?? 0;
      const y = node.positionAbsolute?.y ?? node.position.y ?? 0;

      const w = node.measured?.width ?? 150;
      const h = node.measured?.height ?? 50;

      const centerX = x + w / 2;
      const centerY = y + h / 2;

      rf.setCenter(centerX, centerY, {
        zoom: 1.15,
        duration: 650,
      });
    }, 60);

    return () => window.clearTimeout(t);
  }, [focusId, rf]);

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

  // Render subsets + inject isNew flag into node.data
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

  // Helper: apply a step's reveal config + compute newly revealed nodes
  const applyStepReveal = useCallback(
    (s) => {
      const prevVisible = new Set(visibleNodeIds);
      const nextVisible = new Set(s.reveal.nodes);

      const added = [];
      for (const id of nextVisible) {
        if (!prevVisible.has(id)) added.push(id);
      }

      setVisibleNodeIds(s.reveal.nodes);
      setVisibleEdgeIds(s.reveal.edges);

      setNewNodeIds(added);
      if (added.length > 0) {
        window.setTimeout(() => setNewNodeIds([]), 750);
      }
    },
    [visibleNodeIds],
  );

  const handleStart = useCallback(() => {
    setStarted(true);
    setStepIndex(0);
    applyStepReveal(storySteps[0]);
  }, [applyStepReveal]);

  const handleNext = useCallback(() => {
    setStepIndex((prev) => {
      const next = Math.min(prev + 1, storySteps.length - 1);
      applyStepReveal(storySteps[next]);
      return next;
    });
  }, [applyStepReveal]);

  const handleBack = useCallback(() => {
    setStepIndex((prev) => {
      const back = Math.max(prev - 1, 0);
      applyStepReveal(storySteps[back]);
      return back;
    });
  }, [applyStepReveal]);

  // Only focus if the focus node is currently visible
  const focusId = useMemo(() => {
    const id = step?.focus;
    if (!id) return null;
    return visibleNodeIds.includes(id) ? id : null;
  }, [step, visibleNodeIds]);

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
            focusId={focusId}
          />
        </div>

        <LessonPanel
          started={started}
          step={step}
          stepIndex={stepIndex}
          totalSteps={storySteps.length}
          onStart={handleStart}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </ReactFlowProvider>
  );
}
