import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 120, y: 180 },
    data: {
      label: "RAM",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 420, y: 180 },
    data: {
      label: "Cache",
      className: "nodeContent--main",
      style: { minWidth: 160, border: "2px solid #e0a100" },
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
    position: { x: 720, y: 180 },
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
    position: { x: 360, y: 390 },
    data: {
      label: "Very small",
      className: "nodeContent--branch",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 540, y: 390 },
    data: {
      label: "Very fast",
      className: "nodeContent--branch",
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
    label: "still slower than",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "very close to",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "outBottom",
    target: "n4",
    targetHandle: "in",
    label: "is",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n5",
    source: "n2",
    sourceHandle: "outBottom",
    target: "n5",
    targetHandle: "in",
    label: "and",
    markerEnd: { type: "arrowclosed" },
  },
];
