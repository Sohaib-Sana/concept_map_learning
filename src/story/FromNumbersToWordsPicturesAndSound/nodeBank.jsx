import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: {
      label: "Text",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 0, y: 180 },
    data: {
      label: "Images",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 0, y: 360 },
    data: {
      label: "Audio",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 0, y: 540 },
    data: {
      label: "Video",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "j1",
    position: { x: 500, y: 300 },
    data: {
      isJunction: true,
      handles: [
        { id: "out", type: "source", position: Position.Right },
        { id: "inTop", type: "target", position: Position.Top },
        { id: "inBottom", type: "target", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 700, y: 280 },
    data: {
      label: "Numbers",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 1200, y: 280 },
    data: {
      className: "nodeContent--main",
      label: "Binary",
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-j1",
    source: "n1",
    target: "j1",
    targetHandle: "inTop",
    type: "step",
  },
  {
    id: "n2-j1",
    source: "n2",
    target: "j1",
    targetHandle: "inTop",
    type: "step",
  },
  {
    id: "n3-j1",
    source: "n3",
    target: "j1",
    targetHandle: "inBottom",
    type: "step",
  },
  {
    id: "n4-j1",
    source: "n4",
    target: "j1",
    targetHandle: "inBottom",
    type: "step",
  },
  {
    id: "j1-n5",
    source: "j1",
    target: "n5",
    label: "represented by",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },
  {
    id: "n5-n6",
    source: "n5",
    target: "n6",
    label: "converted to",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },
];
