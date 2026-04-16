import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 100 },
    data: {
      label: "Tasks\n(to be done)",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "outRight", type: "source", position: Position.Right },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "j1",
    position: { x: 360, y: 140 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outTop", type: "source", position: Position.Top },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
    isDraggable: false,
  },

  {
    id: "n2",
    position: { x: 430, y: 0 },
    data: {
      label: "Identify and focus on \ndetails that matter",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 430, y: 200 },
    data: {
      label: "Break big task into\nsmaller tasks",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 820, y: 13 },
    data: {
      label: "Abstraction",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 820, y: 213 },
    data: {
      label: "Decomposition",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "j2",
    position: { x: 1130, y: 140 },
    data: {
      isJunction: true,
      handles: [
        { id: "inTop", type: "target", position: Position.Top },
        { id: "inBottom", type: "target", position: Position.Bottom },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    isDraggable: false,
  },
  {
    id: "n6",
    position: { x: 1280, y: 114 },
    data: {
      label: "Success",
      className: "nodeContent--main",
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n7",
    position: { x: 0, y: 280 },
    data: {
      label: "Developing\nSoftware",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-j1",
    source: "n1",
    sourceHandle: "outRight",
    target: "j1",
    label: "should",
  },
  {
    id: "j1-n2",
    source: "j1",
    sourceHandle: "outTop",
    target: "n2",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n3",
    source: "j1",
    sourceHandle: "outBottom",
    target: "n3",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    target: "n4",
    label: "called",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n5",
    source: "n3",
    target: "n5",
    label: "called",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-j2",
    source: "n4",
    target: "j2",
    targetHandle: "inTop",
    type: "step",
  },
  {
    id: "n5-j2",
    source: "n5",
    target: "j2",
    targetHandle: "inBottom",
    type: "step",
  },
  {
    id: "j2-n6",
    source: "j2",
    target: "n6",
    type: "step",
    label: "increase chances of",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n1-n7",
    source: "n1",
    sourceHandle: "outBottom",
    target: "n7",
    type: "step",
    label: "including",
    markerEnd: { type: "arrowclosed" },
  },
];
