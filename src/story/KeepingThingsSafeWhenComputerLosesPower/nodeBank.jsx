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
        { id: "h3", type: "target", position: Position.Left },
      ],
    },
    type: "customNode",
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
    id: "j1",
    position: { x: 620, y: 620 },
    data: {
      isJunction: true,
      label: "such as",
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "outTop", type: "source", position: Position.Top },
        { id: "outBottom", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
    draggable: false,
    selectable: false,
  },
  {
    id: "n5",
    position: { x: 760, y: 80 },
    data: {
      label: "Hard Drives",
    },
    style: { width: 120 },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 760, y: 160 },
    data: {
      label: "SSDs",
    },
    style: { width: 120 },
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
    id: "n2-n3",
    source: "n2",
    sourceHandle: "h1",
    target: "n3",
    targetHandle: "in",
    label: "to permanently store",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "h1",
    target: "n4",
    targetHandle: "h1",
    label: "and",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-j1",
    source: "n2",
    sourceHandle: "h3",
    target: "j1",
    targetHandle: "in",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n5",
    source: "j1",
    sourceHandle: "outTop",
    target: "n5",
    targetHandle: "in",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n6",
    source: "j1",
    sourceHandle: "outBottom",
    target: "n6",
    targetHandle: "in",
    markerEnd: { type: "arrowclosed" },
  },
];
