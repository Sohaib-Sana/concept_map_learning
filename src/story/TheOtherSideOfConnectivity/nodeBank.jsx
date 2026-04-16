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
        { id: "outRight", type: "source", position: Position.Right },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 880, y: 342 },
    data: {
      label: "Send/Receive Data\n\t(information)",
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
      label: "Share resources e.g.\n\tprinters, internet connection",
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
  //  ------------------------ new node for drawbacks/downsides ------------------
  {
    id: "n8",
    position: { x: 512, y: 450 },
    data: {
      label: "Drawbacks",
      className: "nodeContent--branch",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n9",
    position: { x: 512, y: 500 },
    data: {
      label: "• theft, damage or misuse of\ninformation",
      className: "nodeContent--examples",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n10",
    position: { x: 512, y: 540 },
    data: {
      label: "• spread of harmful software",
      className: "nodeContent--examples",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n11",
    position: { x: 512, y: 570 },
    data: {
      label: "• misuse or damage to devices",
      className: "nodeContent--examples",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n12",
    position: { x: 512, y: 600 },
    data: {
      label: "• loss of privacy",
      className: "nodeContent--examples",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n13",
    position: { x: 512, y: 630 },
    data: {
      label: "• exposure to false or harmful content",
      className: "nodeContent--examples",
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n14",
    position: { x: 512, y: 660 },
    data: {
      label: "• dependence on the network for work,\nlearning, communication, and \neveryday tasks",
      className: "nodeContent--examples",
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
    label: "connected to form",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    sourceHandle: "outRight",
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
  { id: "n2-n8", source: "n2", sourceHandle: "outBottom", target: "n8", type: "step", markerEnd: { type: "arrowclosed" } },
];
