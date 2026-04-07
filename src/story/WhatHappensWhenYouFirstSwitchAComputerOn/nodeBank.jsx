import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 170 },
    data: {
      label: "ROM",
      className: "nodeContent--main",
      style: { minWidth: 140 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 320, y: 170 },
    data: {
      label: "BIOS",
      className: "nodeContent--main",
      style: { minWidth: 150, border: "2px solid #e0a100" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out1", type: "source", position: Position.Right, offset: -50 },
        { id: "out2", type: "source", position: Position.Right, offset: 50 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 620, y: 90 },
    data: {
      label: "Checks hardware",
      className: "nodeContent--branch",
      style: { minWidth: 180 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 620, y: 260 },
    data: {
      label: "Loads the\nOperating System",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 200 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "stores",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    sourceHandle: "out1",
    target: "n3",
    targetHandle: "in",
    label: "first",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "out2",
    target: "n4",
    targetHandle: "in",
    label: "then helps",
    markerEnd: { type: "arrowclosed" },
  },
];
