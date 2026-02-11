import { useState, useCallback } from "react";
import { Background, Controls, ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, initialEdges } from "./components/nodeBank";
import { customNode } from "./model/nodeModel";
import "./app.css";
import { JunctionNode } from "./model/junctionNodeModel";

const nodeTypes = {
  customNode: customNode,
  junctionNode: JunctionNode,
};

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []);
  const onEdgesChange = useCallback((changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []);
  const onConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

  return (
    <div style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}>
      <div style={{ height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls style={{ color: "black" }} />
        </ReactFlow>
      </div>
    </div>
  );
}
