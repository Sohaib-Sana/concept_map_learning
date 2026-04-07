import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 80, y: 120 },
    data: {
      label: "Computers",
      className: "nodeContent--main",
      style: { minWidth: 160 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 520, y: 120 },
    data: {
      label: "Numbers",
      className: "nodeContent--main",
      style: { minWidth: 160 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outRight", type: "source", position: Position.Right },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 1020, y: 110 },
    data: {
      label: "10 Levels\n(one per digit)",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line", minWidth: 190 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 1035, y: 390 },
    data: {
      label: "Errors",
      className: "nodeContent--main",
      style: { minWidth: 160 },
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 1020, y: 610 },
    data: {
      label: "0 and 1\n(only 2 levels)",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line", minWidth: 190 },
      handles: [
        { id: "inTop", type: "target", position: Position.Top },
        { id: "inLeft", type: "target", position: Position.Left },
      ],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "use electricity to represent",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    sourceHandle: "outRight",
    target: "n3",
    targetHandle: "in",
    label: "decimal would need",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    sourceHandle: "outBottom",
    target: "n4",
    targetHandle: "in",
    label: "fluctuations in electricity are common\ncausing",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n5",
    source: "n4",
    sourceHandle: "outBottom",
    target: "n5",
    targetHandle: "inTop",
    label: "avoided by using",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n5",
    source: "n2",
    sourceHandle: "outBottom",
    target: "n5",
    targetHandle: "inLeft",
    label: "are represented as",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
];
