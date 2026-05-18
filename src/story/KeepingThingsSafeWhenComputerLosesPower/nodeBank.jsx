import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 110 },
    data: {
      label: "Computing Devices",
      className: "nodeContent--main",
      style: { minWidth: 190 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 360, y: 110 },
    data: {
      label: "Permanent Storage",
      className: "nodeContent--main",
      handles: [
        { id: "h1", type: "source", position: Position.Bottom },
        { id: "h2", type: "source", position: Position.Right },
        { id: "h3", type: "target", position: Position.Left },
      ],
    },
    type: "customNode",
  },

  {
    id: "j1",
    position: { x: 486.5, y: 220 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "outLeft", type: "source", position: Position.Left },
        { id: "outRight", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    draggable: false,
  },

  {
    id: "n3",
    position: { x: 180, y: 330 },
    data: {
      label: "Apps and OS",
      className: "nodeContent--branch",
      style: { minWidth: 180 },
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 470, y: 330 },
    data: {
      label: "User Files",
      variant: "groupedDevices",
      items: [
        { id: "n5", label: "Documents" },
        { id: "n6", label: "Music" },
        { id: "n7", label: "Photos & Videos" },
      ],
      handles: [{ id: "h1", type: "target", position: Position.Top }],
    },
    style: { width: 600, height: 100 },
    type: "customNode",
  },
  {
    id: "j2",
    position: { x: 700, y: 135 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outTop", type: "source", position: Position.Top },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
    draggable: false,
  },
  {
    id: "n8",
    position: { x: 760, y: 80 },
    data: {
      label: "Hard Drives",
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    style: { width: 120 },
    type: "customNode",
  },
  {
    id: "n9",
    position: { x: 760, y: 160 },
    data: {
      label: "SSDs",
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    style: { width: 120 },
    type: "customNode",
  },
  {
    id: "bl-1",
    position: { x: 1100, y: 525 },

    data: {
      className: "border-less",
      label: "",
      handles: [],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "have",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-j1",
    source: "n2",
    sourceHandle: "h1",
    target: "j1",
    targetHandle: "in",
    type: "step",
    label: "to permanently store",
  },
  {
    id: "j1-n3",
    source: "j1",
    sourceHandle: "outLeft",
    target: "n3",
    targetHandle: "in",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n4",
    source: "j1",
    sourceHandle: "outRight",
    target: "n4",
    targetHandle: "h1",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-j2",
    source: "n2",
    sourceHandle: "h2",
    target: "j2",
    targetHandle: "in",
    label: "such as",
  },
  {
    id: "j2-n8",
    source: "j2",
    sourceHandle: "outTop",
    target: "n8",
    targetHandle: "in",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j2-n9",
    source: "j2",
    sourceHandle: "outBottom",
    target: "n9",
    targetHandle: "in",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
];
