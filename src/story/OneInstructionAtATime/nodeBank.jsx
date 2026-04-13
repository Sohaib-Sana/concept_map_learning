import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 150 },
    data: {
      label: "Software",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 460, y: 150 },
    data: {
      label: "Instructions",
      className: "nodeContent--main",
      style: { minWidth: 180 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "inBottom", type: "target", position: Position.Bottom },
        { id: "outRight", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 475, y: 300 },
    data: {
      label: "CPU",
      className: "nodeContent--main",
      style: { minWidth: 150, background: "#f7d7db" },
      handles: [
        { id: "out", type: "source", position: Position.Top },
        { id: "in", type: "target", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 760, y: 150 },
    data: {
      label: "Fetched",
      className: "nodeContent--branch",
      handles: [
        { id: "inLeft", type: "target", position: Position.Left },
        { id: "inRight", type: "target", position: Position.Right },
        { id: "outLeft", type: "source", position: Position.Left },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 760, y: 310 },
    data: {
      label: "Decoded",
      className: "nodeContent--branch",
      handles: [
        { id: "inTop", type: "target", position: Position.Top },
        { id: "outLeft", type: "source", position: Position.Left },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 760, y: 500 },
    data: {
      label: "Executed",
      className: "nodeContent--branch",
      handles: [
        { id: "inTop", type: "target", position: Position.Top },
        { id: "outLeft", type: "source", position: Position.Left },
        { id: "outRight", type: "source", position: Position.Right },
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
    label: "lines of",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n2",
    source: "n3",
    target: "n2",
    targetHandle: "inBottom",
    label: "carries out",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "outRight",
    target: "n4",
    targetHandle: "inLeft",
    label: "each line",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n3",
    source: "n4",
    sourceHandle: "outLeft",
    target: "n3",
    targetHandle: "in",
    label: "by",
    // type: "smoothstep",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n5",
    source: "n4",
    sourceHandle: "outBottom",
    target: "n5",
    targetHandle: "inTop",
    label: "then",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n5-n6",
    source: "n5",
    sourceHandle: "out",
    target: "n6",
    targetHandle: "inTop",
    label: "then",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n5-n3",
    source: "n5",
    sourceHandle: "outLeft",
    target: "n3",
    targetHandle: "in",
    label: "by",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n6-n3",
    source: "n6",
    sourceHandle: "outLeft",
    target: "n3",
    targetHandle: "in",
    label: "by",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n6-n4",
    source: "n6",
    sourceHandle: "outRight",
    target: "n4",
    targetHandle: "inRight",
    label: "repeat",
    type: "smoothstep",
    style: {
      strokeDasharray: "5 5",
      strokeWidth: 2,
    },
    markerEnd: { type: "arrowclosed" },
  },
];
