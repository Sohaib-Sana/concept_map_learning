import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 180 },
    data: {
      label: "Connectivity",
      className: "nodeContent--main",
      style: { minWidth: 180, border: "2px solid #e0a100" },
      handles: [
        { id: "out1", type: "source", position: Position.Right, offset: -90 },
        { id: "out2", type: "source", position: Position.Right, offset: -30 },
        { id: "out3", type: "source", position: Position.Right, offset: 30 },
        { id: "out4", type: "source", position: Position.Right, offset: 90 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 390, y: 50 },
    data: {
      label: "Uninvited visitors",
      className: "nodeContent--branch",
      style: { minWidth: 210 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 390, y: 150 },
    data: {
      label: "Your information\non the move",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 210 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 390, y: 260 },
    data: {
      label: "Trust and what\ngets shared",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 210 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 390, y: 380 },
    data: {
      label: "When the network\ngoes down",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 210 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    sourceHandle: "out1",
    target: "n2",
    targetHandle: "in",
    label: "can bring",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n1-n3",
    source: "n1",
    sourceHandle: "out2",
    target: "n3",
    targetHandle: "in",
    label: "",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n1-n4",
    source: "n1",
    sourceHandle: "out3",
    target: "n4",
    targetHandle: "in",
    label: "",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n1-n5",
    source: "n1",
    sourceHandle: "out4",
    target: "n5",
    targetHandle: "in",
    label: "",
    markerEnd: { type: "arrowclosed" },
  },
];
