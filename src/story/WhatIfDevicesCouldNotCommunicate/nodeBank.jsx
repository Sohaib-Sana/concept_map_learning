import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 10, y: 350 },
    data: {
      label: "Computing Devices",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 460, y: 350 },
    data: {
      label: "Computer Network",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 880, y: 342 },
    data: {
      label: "Send/Receive Data\n(information)",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "j1",
    position: { x: 1260, y: 375 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outTop", type: "source", position: Position.Top },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 1320, y: 125 },
    data: {
      label: "Share resources e.g.\nprinters, internet connection",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line" },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 1320, y: 275 },
    data: {
      label: "Communicate",
      className: "nodeContent--branch",
      style: { minWidth: 220 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 1320, y: 425 },
    data: {
      label: "Share Files",
      className: "nodeContent--branch",
      style: { minWidth: 220 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n7",
    position: { x: 1320, y: 575 },
    data: {
      label: "Use Cloud Storage",
      className: "nodeContent--branch",
      style: { minWidth: 220 },
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
    label: "connected to form",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "allowing those devices to",
    markerEnd: { type: "arrowclosed" },
  },

  {
    id: "n3-j1",
    source: "n3",
    target: "j1",
    type: "step",
    label: "users of devices can",
  },
  {
    id: "j1-n4",
    source: "j1",
    sourceHandle: "outTop",
    target: "n4",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n5",
    source: "j1",
    sourceHandle: "outTop",
    target: "n5",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n6",
    source: "j1",
    sourceHandle: "outBottom",
    target: "n6",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n7",
    source: "j1",
    sourceHandle: "outBottom",
    target: "n7",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
];
