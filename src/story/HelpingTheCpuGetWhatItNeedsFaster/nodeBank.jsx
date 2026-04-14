import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 170 },
    data: {
      label: "CPU",
      className: "nodeContent--main",
      style: { minWidth: 220 },
      handles: [
        { id: "out", type: "source", position: Position.Right },
        { id: "in", type: "target", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 440, y: 170 },
    data: {
      label: "RAM",
      className: "nodeContent--main",
      style: { minWidth: 140 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "inRight", type: "target", position: Position.Right },
        { id: "out", type: "source", position: Position.Left },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 780, y: 170 },
    data: {
      label: "Storage (stores OS, Apps and User Files",
      className: "nodeContent--main",
      style: { minWidth: 140 },
      handles: [{ id: "in", type: "source", position: Position.Left }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "fetches from",

    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n1",
    source: "n2",
    target: "n1",
    label: "fetches from",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n2",
    source: "n3",
    target: "n2",
    targetHandle: "inRight",
    label: "copied to (when in use)",
    markerEnd: { type: "arrowclosed" },
  },
];
