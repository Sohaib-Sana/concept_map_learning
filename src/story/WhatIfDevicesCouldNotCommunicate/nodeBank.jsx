import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 60, y: 160 },
    data: {
      label: "Computing Devices",
      className: "nodeContent--main",
      style: { minWidth: 200 },
      handles: [{ id: "out", type: "source", position: Position.Right }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 360, y: 160 },
    data: {
      label: "Computer Network",
      className: "nodeContent--main",
      style: { minWidth: 210, border: "2px solid #e0a100" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out1", type: "source", position: Position.Right, offset: -60 },
        { id: "out2", type: "source", position: Position.Right },
        { id: "out3", type: "source", position: Position.Right, offset: 60 },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 720, y: 70 },
    data: {
      label: "Send and receive data",
      className: "nodeContent--branch",
      style: { minWidth: 210 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 720, y: 180 },
    data: {
      label: "Share files\nand hardware",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 200 },
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 720, y: 310 },
    data: {
      label: "Access the internet\nand communicate",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line", minWidth: 220 },
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
    label: "connected together in a",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    sourceHandle: "out1",
    target: "n3",
    targetHandle: "in",
    label: "allows devices to",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n4",
    source: "n2",
    sourceHandle: "out2",
    target: "n4",
    targetHandle: "in",
    label: "",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n5",
    source: "n2",
    sourceHandle: "out3",
    target: "n5",
    targetHandle: "in",
    label: "",
    markerEnd: { type: "arrowclosed" },
  },
];
