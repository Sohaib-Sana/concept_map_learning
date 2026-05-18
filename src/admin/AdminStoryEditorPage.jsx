// src/admin/AdminStoryEditorPage.jsx
import { useCallback, useMemo, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MarkerType, ReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Link, Navigate, useParams } from "react-router-dom";
import { PhaseEdge } from "../model/edgeModel";
import AdminEditableNode from "./AdminEditableNode";
import { generateNodeBankCode } from "./exportNodeBank";
import { getStoryById, saveAdminStory } from "./adminStoryStorage";
import "./admin.css";
import "../App.css";

const nodeTypes = {
  customNode: AdminEditableNode,
};

const edgeTypes = {
  PhaseEdge,
};

const HANDLE_POSITIONS = ["top", "right", "bottom", "left"];
const HANDLE_TYPES = ["source", "target"];

const REACT_FLOW_EDGE_TYPES = [
  { label: "Default", value: "default" },
  { label: "Straight", value: "straight" },
  { label: "Step", value: "step" },
  { label: "Smooth Step", value: "smoothstep" },
  { label: "Simple Bezier", value: "simplebezier" },
  // { label: "PhaseEdge - Custom", value: "PhaseEdge" },
];

function createNodeId(nodes) {
  let index = nodes.length + 1;
  let id = `n${index}`;

  while (nodes.some((node) => node.id === id)) {
    index += 1;
    id = `n${index}`;
  }

  return id;
}

function createEdgeId(source, target, edges) {
  let base = `${source}-${target}`;
  let id = base;
  let count = 2;

  while (edges.some((edge) => edge.id === id)) {
    id = `${base}-${count}`;
    count += 1;
  }

  return id;
}

function getNodeKind(node) {
  return node?.data?.isJunction ? "junction" : "customNode";
}

function makeDefaultNode(nodes) {
  const id = createNodeId(nodes);

  return {
    id,
    type: "customNode",
    position: { x: 120, y: 120 },
    data: {
      label: "New Node",
      handles: [
        { id: "source-right", type: "source", position: "right", offset: 0 },
        { id: "target-left", type: "target", position: "left", offset: 0 },
      ],
    },
  };
}

function makeJunctionNode(nodes) {
  const id = createNodeId(nodes);

  return {
    id,
    type: "customNode",
    position: { x: 220, y: 220 },
    style: { width: 16, height: 16 },
    data: {
      label: "",
      isJunction: true,
      handles: [
        { id: "top", type: "target", position: "top", offset: 0 },
        { id: "right", type: "source", position: "right", offset: 0 },
        { id: "bottom", type: "source", position: "bottom", offset: 0 },
        { id: "left", type: "target", position: "left", offset: 0 },
      ],
    },
  };
}

function updateStoryStepsRevealAll(storySteps, nodes, edges) {
  const currentSteps = Array.isArray(storySteps) && storySteps.length > 0 ? structuredClone(storySteps) : [];

  if (currentSteps.length === 0) {
    return [
      {
        id: "step-0",
        title: "Start",
        beats: [
          {
            narration: "This is the beginning of the story.",
            reveal: {
              nodes: nodes.map((node) => node.id),
              edges: edges.map((edge) => edge.id),
            },
          },
        ],
      },
    ];
  }

  const firstStep = currentSteps[0];

  firstStep.beats = Array.isArray(firstStep.beats) && firstStep.beats.length > 0 ? firstStep.beats : [{}];

  firstStep.beats[0] = {
    narration: firstStep.beats[0].narration ?? "This is the beginning of the story.",
    ...firstStep.beats[0],
    reveal: {
      nodes: nodes.map((node) => node.id),
      edges: edges.map((edge) => edge.id),
    },
  };

  return currentSteps;
}

function AdminStoryEditorInner() {
  const { storyId } = useParams();

  const originalStory = useMemo(() => getStoryById(storyId), [storyId]);

  const [storyMeta, setStoryMeta] = useState(() => ({
    id: originalStory?.id ?? "",
    title: originalStory?.title ?? "",
    description: originalStory?.description ?? "",
    coverImage: originalStory?.coverImage ?? "",
    storySteps: originalStory?.storySteps ?? [],
  }));

  const [nodes, setNodes] = useState(() => structuredClone(originalStory?.initialNodes ?? []));
  const [edges, setEdges] = useState(() => structuredClone(originalStory?.initialEdges ?? []));
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [exportCode, setExportCode] = useState("");

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;
  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId) ?? null;

  const patchNode = useCallback((nodeId, patcher) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id !== nodeId) return node;
        return patcher(node);
      }),
    );
  }, []);

  const patchEdge = useCallback((edgeId, patcher) => {
    setEdges((currentEdges) =>
      currentEdges.map((edge) => {
        if (edge.id !== edgeId) return edge;
        return patcher(edge);
      }),
    );
  }, []);

  const updateNodeLabel = useCallback(
    (nodeId, label) => {
      patchNode(nodeId, (node) => ({
        ...node,
        data: {
          ...(node.data ?? {}),
          label,
        },
      }));
    },
    [patchNode],
  );

  const nodesForFlow = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      type: "customNode",
      data: {
        ...(node.data ?? {}),
        onLabelChange: (label) => updateNodeLabel(node.id, label),
      },
    }));
  }, [nodes, updateNodeLabel]);

  const onNodesChange = useCallback((changes) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((currentEdges) => {
      const edge = {
        ...params,
        id: createEdgeId(params.source, params.target, currentEdges),
        label: "",
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
      };

      return addEdge(edge, currentEdges);
    });
  }, []);

  if (!originalStory) {
    return <Navigate to="/admin/stories" replace />;
  }

  function handleAddCustomNode() {
    const node = makeDefaultNode(nodes);

    setNodes((currentNodes) => [...currentNodes, node]);
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  }

  function handleAddJunctionNode() {
    const node = makeJunctionNode(nodes);

    setNodes((currentNodes) => [...currentNodes, node]);
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  }

  function handleDeleteNode() {
    if (!selectedNode) return;

    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== selectedNode.id));

    setEdges((currentEdges) => currentEdges.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));

    setSelectedNodeId(null);
  }

  function handleDeleteEdge() {
    if (!selectedEdge) return;

    setEdges((currentEdges) => currentEdges.filter((edge) => edge.id !== selectedEdge.id));
    setSelectedEdgeId(null);
  }

  function handleNodeKindChange(kind) {
    if (!selectedNode) return;

    patchNode(selectedNode.id, (node) => {
      if (kind === "junction") {
        return {
          ...node,
          type: "customNode",
          style: { ...(node.style ?? {}), width: 16, height: 16 },
          data: {
            ...(node.data ?? {}),
            label: "",
            isJunction: true,
          },
        };
      }

      const nextStyle = { ...(node.style ?? {}) };
      delete nextStyle.width;
      delete nextStyle.height;

      return {
        ...node,
        type: "customNode",
        style: nextStyle,
        data: {
          ...(node.data ?? {}),
          label: node.data?.label || "Node",
          isJunction: false,
        },
      };
    });
  }

  function handleAddHandle() {
    if (!selectedNode) return;

    patchNode(selectedNode.id, (node) => {
      const handles = node.data?.handles ?? [];

      return {
        ...node,
        data: {
          ...(node.data ?? {}),
          handles: [
            ...handles,
            {
              id: `h${handles.length + 1}`,
              type: "source",
              position: "right",
              offset: 0,
            },
          ],
        },
      };
    });
  }

  function handleUpdateHandle(index, key, value) {
    if (!selectedNode) return;

    patchNode(selectedNode.id, (node) => {
      const handles = [...(node.data?.handles ?? [])];

      handles[index] = {
        ...handles[index],
        [key]: key === "offset" ? Number(value) : value,
      };

      return {
        ...node,
        data: {
          ...(node.data ?? {}),
          handles,
        },
      };
    });
  }

  function handleRemoveHandle(index) {
    if (!selectedNode) return;

    patchNode(selectedNode.id, (node) => {
      const handles = [...(node.data?.handles ?? [])];
      handles.splice(index, 1);

      return {
        ...node,
        data: {
          ...(node.data ?? {}),
          handles,
        },
      };
    });
  }

  function handleEdgeTypeChange(edgeType) {
    if (!selectedEdge) return;

    patchEdge(selectedEdge.id, (edge) => {
      if (edgeType === "default") {
        const nextEdge = { ...edge };
        delete nextEdge.type;
        return nextEdge;
      }

      return {
        ...edge,
        type: edgeType,
      };
    });
  }

  function handleSave() {
    const storySteps = updateStoryStepsRevealAll(storyMeta.storySteps, nodes, edges);

    saveAdminStory({
      ...storyMeta,
      storySteps,
      initialNodes: nodes,
      initialEdges: edges,
    });

    setStoryMeta((current) => ({
      ...current,
      storySteps,
    }));

    alert("Story saved locally.");
  }

  function handleExport() {
    setExportCode(generateNodeBankCode(nodes, edges));
  }

  return (
    <main className="adminThreeColumnEditor">
      <aside className="adminStoryPanel">
        <div className="adminPanelHeader">
          <Link to="/admin/stories" className="adminBackLink">
            ← Stories
          </Link>

          <div>
            <p className="adminEyebrow">Story Panel</p>
            <h1>Edit Story</h1>
          </div>
        </div>

        <section className="adminPanelBlock">
          <h2>Story Details</h2>

          <label className="adminField">
            <span>Title</span>
            <input value={storyMeta.title} onChange={(event) => setStoryMeta((current) => ({ ...current, title: event.target.value }))} />
          </label>

          <label className="adminField">
            <span>Description</span>
            <textarea
              rows={4}
              value={storyMeta.description}
              onChange={(event) => setStoryMeta((current) => ({ ...current, description: event.target.value }))}
            />
          </label>

          <label className="adminField">
            <span>Cover image path</span>
            <input
              value={storyMeta.coverImage}
              placeholder="/images/Computer/example.png"
              onChange={(event) => setStoryMeta((current) => ({ ...current, coverImage: event.target.value }))}
            />
          </label>

          <div className="adminButtonColumn">
            <button className="adminButton" onClick={handleSave}>
              Save Story
            </button>

            <button className="adminButton adminButtonGhost" onClick={handleExport}>
              Export nodeBank.jsx
            </button>
          </div>
        </section>

        <section className="adminPanelBlock">
          <h2>Add to Canvas</h2>

          <div className="adminButtonColumn">
            <button className="adminButton" onClick={handleAddCustomNode}>
              + Add Custom Node
            </button>

            <button className="adminButton adminButtonGhost" onClick={handleAddJunctionNode}>
              + Add Junction
            </button>
          </div>
        </section>

        <section className="adminPanelBlock">
          <h2>Canvas Summary</h2>

          <div className="adminStatsGrid">
            <div>
              <strong>{nodes.length}</strong>
              <span>Nodes</span>
            </div>

            <div>
              <strong>{edges.length}</strong>
              <span>Edges</span>
            </div>
          </div>

          <p className="adminMuted">Click a node or edge to edit it on the right. Click empty canvas space to hide the editor.</p>
        </section>

        {exportCode && (
          <section className="adminPanelBlock">
            <h2>Generated nodeBank.jsx</h2>
            <textarea className="exportCodeBox" value={exportCode} readOnly rows={18} />
          </section>
        )}
      </aside>

      <section className="adminCanvasPanel">
        <div className="adminCanvasTopBar">
          <div>
            <strong>{storyMeta.title || "Untitled Story"}</strong>
            <span>{selectedNode ? `Editing node: ${selectedNode.id}` : selectedEdge ? `Editing edge: ${selectedEdge.id}` : "Canvas ready"}</span>
          </div>
        </div>

        <ReactFlow
          nodes={nodesForFlow}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => {
            setSelectedNodeId(node.id);
            setSelectedEdgeId(null);
          }}
          onEdgeClick={(_, edge) => {
            setSelectedEdgeId(edge.id);
            setSelectedNodeId(null);
          }}
          onPaneClick={() => {
            setSelectedNodeId(null);
            setSelectedEdgeId(null);
          }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </section>

      <aside className={["adminInspectorPanel", selectedNode || selectedEdge ? "adminInspectorPanelVisible" : ""].join(" ")}>
        {!selectedNode && !selectedEdge && (
          <div className="adminEmptyInspector">
            <p className="adminEyebrow">Inspector</p>
            <h2>No item selected</h2>
            <p>Select a node or edge from the canvas to edit its details here.</p>
          </div>
        )}

        {selectedNode && (
          <section className="adminInspectorContent">
            <div className="adminInspectorHeader">
              <div>
                <p className="adminEyebrow">Node Editor</p>
                <h2>{selectedNode.data?.label || selectedNode.id}</h2>
              </div>

              <button className="adminSmallButton danger" onClick={handleDeleteNode}>
                Delete
              </button>
            </div>

            <p className="adminMuted">Edit the label directly on the node. Use this panel for type, position, and handles.</p>

            <label className="adminField">
              <span>Node ID</span>
              <input value={selectedNode.id} disabled />
            </label>

            <label className="adminField">
              <span>Node Type</span>
              <select value={getNodeKind(selectedNode)} onChange={(event) => handleNodeKindChange(event.target.value)}>
                <option value="customNode">CustomNode</option>
                <option value="junction">Junction</option>
              </select>
            </label>

            {!selectedNode.data?.isJunction && (
              <label className="adminField">
                <span>Label backup editor</span>
                <textarea
                  rows={3}
                  value={selectedNode.data?.label ?? ""}
                  onChange={(event) => updateNodeLabel(selectedNode.id, event.target.value)}
                />
              </label>
            )}

            <div className="adminTwoColumns">
              <label className="adminField">
                <span>X Position</span>
                <input
                  type="number"
                  value={Math.round(selectedNode.position?.x ?? 0)}
                  onChange={(event) =>
                    patchNode(selectedNode.id, (node) => ({
                      ...node,
                      position: {
                        ...(node.position ?? {}),
                        x: Number(event.target.value),
                      },
                    }))
                  }
                />
              </label>

              <label className="adminField">
                <span>Y Position</span>
                <input
                  type="number"
                  value={Math.round(selectedNode.position?.y ?? 0)}
                  onChange={(event) =>
                    patchNode(selectedNode.id, (node) => ({
                      ...node,
                      position: {
                        ...(node.position ?? {}),
                        y: Number(event.target.value),
                      },
                    }))
                  }
                />
              </label>
            </div>

            <div className="adminSectionHeader">
              <h3>Handles</h3>
              <button className="adminSmallButton" onClick={handleAddHandle}>
                + Handle
              </button>
            </div>

            {(selectedNode.data?.handles ?? []).length === 0 && <p className="adminMuted">This node has no handles yet.</p>}

            {(selectedNode.data?.handles ?? []).map((handle, index) => (
              <div className="handleEditor" key={`handle-row-${index}`}>
                <label>
                  ID
                  <input value={handle.id} onChange={(event) => handleUpdateHandle(index, "id", event.target.value)} />
                </label>

                <label>
                  Type
                  <select value={handle.type} onChange={(event) => handleUpdateHandle(index, "type", event.target.value)}>
                    {HANDLE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Position
                  <select value={handle.position} onChange={(event) => handleUpdateHandle(index, "position", event.target.value)}>
                    {HANDLE_POSITIONS.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Offset
                  <input type="number" value={handle.offset ?? 0} onChange={(event) => handleUpdateHandle(index, "offset", event.target.value)} />
                </label>

                <button className="adminSmallButton danger" onClick={() => handleRemoveHandle(index)}>
                  Remove Handle
                </button>
              </div>
            ))}
          </section>
        )}

        {selectedEdge && (
          <section className="adminInspectorContent">
            <div className="adminInspectorHeader">
              <div>
                <p className="adminEyebrow">Edge Editor</p>
                <h2>{selectedEdge.label || selectedEdge.id}</h2>
              </div>

              <button className="adminSmallButton danger" onClick={handleDeleteEdge}>
                Delete
              </button>
            </div>

            <label className="adminField">
              <span>Edge ID</span>
              <input value={selectedEdge.id} disabled />
            </label>

            <label className="adminField">
              <span>Edge Type</span>
              <select value={selectedEdge.type ?? "default"} onChange={(event) => handleEdgeTypeChange(event.target.value)}>
                {REACT_FLOW_EDGE_TYPES.map((edgeType) => (
                  <option key={edgeType.value} value={edgeType.value}>
                    {edgeType.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="adminField">
              <span>Label</span>
              <input
                value={selectedEdge.label ?? ""}
                onChange={(event) =>
                  patchEdge(selectedEdge.id, (edge) => ({
                    ...edge,
                    label: event.target.value,
                  }))
                }
              />
            </label>

            <label className="adminField">
              <span>Source Node</span>
              <select
                value={selectedEdge.source}
                onChange={(event) =>
                  patchEdge(selectedEdge.id, (edge) => ({
                    ...edge,
                    source: event.target.value,
                  }))
                }
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.id} {node.data?.label ? `— ${node.data.label}` : ""}
                  </option>
                ))}
              </select>
            </label>

            <label className="adminField">
              <span>Target Node</span>
              <select
                value={selectedEdge.target}
                onChange={(event) =>
                  patchEdge(selectedEdge.id, (edge) => ({
                    ...edge,
                    target: event.target.value,
                  }))
                }
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.id} {node.data?.label ? `— ${node.data.label}` : ""}
                  </option>
                ))}
              </select>
            </label>

            <label className="adminCheckbox">
              <input
                type="checkbox"
                checked={!!selectedEdge.markerEnd}
                onChange={(event) =>
                  patchEdge(selectedEdge.id, (edge) => ({
                    ...edge,
                    markerEnd: event.target.checked ? { type: MarkerType.ArrowClosed } : undefined,
                  }))
                }
              />
              Show arrow
            </label>
          </section>
        )}
      </aside>
    </main>
  );
}

export default function AdminStoryEditorPage() {
  return (
    <ReactFlowProvider>
      <AdminStoryEditorInner />
    </ReactFlowProvider>
  );
}
