import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 80, y: 120 },
    data: {
      label: "Human Computers\n(did calculations by following instructions)",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line", minWidth: 250 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 600, y: 120 },
    data: {
      label: "Electrical Machine\n(did one specific calculation)",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line", minWidth: 250 },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 1020, y: 120 },
    data: {
      label: "Modern Computer\n(executes any instructions)",
      className: "nodeContent--main",
      style: {
        whiteSpace: "pre-line",
        minWidth: 250,
        border: "2px solid #e0a100",
      },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out1", type: "source", position: Position.Bottom, offset: -110 },
        { id: "out2", type: "source", position: Position.Bottom, offset: 110 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 920, y: 320 },
    data: {
      label: "Hardware",
      className: "nodeContent--branch",
      handles: [
        { id: "in1", type: "target", position: Position.Top },
        { id: "in2", type: "target", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 1250, y: 320 },
    data: {
      label: "Software",
      className: "nodeContent--branch",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Left },
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
    label: "replaced by",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "evolved into",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    sourceHandle: "out1",
    target: "n4",
    targetHandle: "in1",
    label: "physical bits called",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n5",
    source: "n3",
    sourceHandle: "out2",
    target: "n5",
    targetHandle: "in",
    label: "instructions called",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n5-n4",
    source: "n5",
    sourceHandle: "out",
    target: "n4",
    targetHandle: "in2",
    label: "tells what to do",
    markerEnd: { type: "arrowclosed" },
  },
];
