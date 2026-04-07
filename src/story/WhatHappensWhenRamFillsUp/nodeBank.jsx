import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 170 },
    data: {
      label: "Apps and Files",
      className: "nodeContent--main",
      style: { minWidth: 180 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 330, y: 170 },
    data: {
      label: "RAM",
      className: "nodeContent--main",
      style: { minWidth: 140 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out1", type: "source", position: Position.Right, offset: -50 },
        { id: "out2", type: "source", position: Position.Right, offset: 50 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 650, y: 90 },
    data: {
      label: "Computer works\nproperly",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 180 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 650, y: 260 },
    data: {
      label: "Virtual Memory",
      className: "nodeContent--main",
      style: { minWidth: 190, border: "2px solid #e0a100" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 600, y: 460 },
    data: {
      label: "Slower performance",
      className: "nodeContent--branch",
      style: { minWidth: 190 },
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
    label: "copied into",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    sourceHandle: "out1",
    target: "n3",
    targetHandle: "in",
    label: "if there is space",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "out2",
    target: "n4",
    targetHandle: "in",
    label: "if full, uses",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n5",
    source: "n4",
    sourceHandle: "out",
    target: "n5",
    targetHandle: "in",
    label: "but causes",
    markerEnd: { type: "arrowclosed" },
  },
];
