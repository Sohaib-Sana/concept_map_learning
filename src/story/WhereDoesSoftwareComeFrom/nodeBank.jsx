import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 10, y: 10 },
    data: {
      label: "Programmers",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Bottom }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 10, y: 160 },
    data: {
      label: "Detailed Instructions",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 10, y: 320 },
    data: {
      label: "Programming Language",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 420, y: 320 },
    data: {
      label: "Binary",
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
    position: { x: 840, y: 320 },
    data: {
      label: "CPU",
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
    label: "write",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "using",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    target: "n4",
    label: "is converted to",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n5",
    source: "n4",
    target: "n5",
    label: "fetched and executed by",
    markerEnd: { type: "arrowclosed" },
  },
];
