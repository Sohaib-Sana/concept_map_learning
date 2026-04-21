import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 100 },
    data: {
      label: "Algorithmic\nThinking",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },

  {
    id: "n2",
    position: { x: 500, y: 115 },
    data: {
      label: "Task",
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
    position: { x: 1000, y: 88 },
    data: {
      label: "Precise / Exact\nSteps\n(an Algorithm)",
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
    position: { x: 1500, y: 115 },
    data: {
      label: "Computer CPU",
      className: "nodeContent--main",
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
    type: "step",
    label: "expressing a",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    type: "step",
    label: "as",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    target: "n4",
    type: "step",
    label: "to be carried out by",
    markerEnd: { type: "arrowclosed" },
  },
];
