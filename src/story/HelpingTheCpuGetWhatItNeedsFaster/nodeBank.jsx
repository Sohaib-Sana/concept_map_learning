import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 170 },
    data: {
      label: "Permanent Storage",
      className: "nodeContent--main",
      style: { minWidth: 220 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 380, y: 170 },
    data: {
      label: "RAM",
      className: "nodeContent--main",
      style: { minWidth: 140, border: "2px solid #e0a100" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 700, y: 170 },
    data: {
      label: "CPU",
      className: "nodeContent--main",
      style: { minWidth: 140, background: "#f7d7db" },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 380, y: 380 },
    data: {
      label: "Instructions and Data\nbeing used right now",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 240 },
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "copies into",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "faster for",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "outBottom",
    target: "n4",
    targetHandle: "in",
    label: "stores",
    markerEnd: { type: "arrowclosed" },
  },
];
