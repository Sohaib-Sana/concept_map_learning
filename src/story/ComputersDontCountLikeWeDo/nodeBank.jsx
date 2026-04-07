import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 80, y: 120 },
    data: {
      label: "Humans use\nDecimal\n(0 to 9)",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line", minWidth: 220 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 420, y: 120 },
    data: {
      label: "Computers use\nBinary\n(0 and 1)",
      className: "nodeContent--main",
      style: {
        whiteSpace: "pre-line",
        minWidth: 220,
        border: "2px solid #e0a100",
      },
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
    position: { x: 780, y: 120 },
    data: {
      label: "Electricity has\n2 clear states",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line", minWidth: 220 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out1", type: "source", position: Position.Bottom, offset: -70 },
        { id: "out2", type: "source", position: Position.Bottom, offset: 70 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 660, y: 390 },
    data: {
      label: "0",
      className: "nodeContent--branch",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 900, y: 390 },
    data: {
      label: "1",
      className: "nodeContent--branch",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 260, y: 390 },
    data: {
      label: "Examples\n1 → 1\n2 → 10\n3 → 11\n4 → 100\n5 → 101",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 220 },
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
    label: "different from",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "works well because",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    sourceHandle: "out1",
    target: "n4",
    targetHandle: "in",
    label: "one state =",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n5",
    source: "n3",
    sourceHandle: "out2",
    target: "n5",
    targetHandle: "in",
    label: "other state =",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n6",
    source: "n2",
    sourceHandle: "outBottom",
    target: "n6",
    targetHandle: "in",
    label: "can represent numbers like",
    markerEnd: { type: "arrowclosed" },
  },
];
