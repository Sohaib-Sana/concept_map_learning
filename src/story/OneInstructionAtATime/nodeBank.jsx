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
    position: { x: 320, y: 150 },
    data: {
      label: "Instructions",
      className: "nodeContent--main",
      style: { minWidth: 180 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outTop", type: "source", position: Position.Right, offset: -60 },
        { id: "outMid", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 320, y: 360 },
    data: {
      label: "CPU",
      className: "nodeContent--main",
      style: { minWidth: 150, background: "#f7d7db" },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 680, y: 70 },
    data: {
      label: "Fetched",
      className: "nodeContent--branch",
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 680, y: 220 },
    data: {
      label: "Decoded",
      className: "nodeContent--branch",
      handles: [
        { id: "inTop", type: "target", position: Position.Top },
        { id: "inLeft", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 680, y: 370 },
    data: {
      label: "Executed",
      className: "nodeContent--branch",
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
    label: "lines of",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "outTop",
    target: "n4",
    targetHandle: "in",
    label: "each line",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n2",
    source: "n3",
    target: "n2",
    label: "carries out",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    sourceHandle: "out",
    target: "n4",
    targetHandle: "in",
    label: "by",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n5",
    source: "n4",
    sourceHandle: "out",
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
];
