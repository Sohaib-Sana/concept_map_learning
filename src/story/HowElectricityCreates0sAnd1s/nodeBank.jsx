import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 140 },
    data: {
      label: "Computer",
      className: "nodeContent--main",
      style: { minWidth: 160 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 400, y: 140 },
    data: {
      label: "Electric Circuits",
      className: "nodeContent--main",
      style: { minWidth: 200 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 740, y: 140 },
    data: {
      label: "Switch",
      className: "nodeContent--main",
      style: { minWidth: 160 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outTop", type: "source", position: Position.Right, offset: -10 },
        { id: "outBottom", type: "source", position: Position.Right, offset: 10 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 1080, y: 60 },
    data: {
      label: "PATH BROKEN",
      className: "nodeContent--branch",
      style: { minWidth: 180 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 1080, y: 230 },
    data: {
      label: "PATH COMPLETE",
      className: "nodeContent--branch",
      style: { minWidth: 180 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 1480, y: 60 },
    data: {
      label: "0",
      className: "nodeContent--main",
      style: { minWidth: 120, border: "2px solid #e0a100" },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n7",
    position: { x: 1480, y: 230 },
    data: {
      label: "1",
      className: "nodeContent--main",
      style: { minWidth: 120, border: "2px solid #e0a100" },
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
    label: "consists of many",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    sourceHandle: "out",
    target: "n3",
    targetHandle: "in",
    label: "can be",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    sourceHandle: "outTop",
    target: "n4",
    targetHandle: "in",
    label: "OPEN",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n5",
    source: "n3",
    sourceHandle: "outBottom",
    target: "n5",
    targetHandle: "in",
    label: "CLOSED",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n6",
    source: "n4",
    sourceHandle: "out",
    target: "n6",
    targetHandle: "in",
    label: "electric doesn't flow",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n5-n7",
    source: "n5",
    sourceHandle: "out",
    target: "n7",
    targetHandle: "in",
    label: "electric flows",
    markerEnd: { type: "arrowclosed" },
  },
];
