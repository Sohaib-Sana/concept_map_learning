import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 70, y: 50 },
    data: {
      label: "ROM",
      className: "nodeContent--branch",
      handles: [{ id: "out", type: "source", position: Position.Bottom }],
    },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 40, y: 220 },
    data: {
      label: "Storage Area\n(memory)",
      className: "nodeContent--branch",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 400, y: 50 },
    data: {
      label: "BIOS",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "in", type: "target", position: Position.Left },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 375, y: 220 },
    data: {
      label: "(start up) Instructions",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 640, y: 50 },
    data: {
      label: "CPU",
      className: "nodeContent--branch",
      style: { whiteSpace: "pre-line" },
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
    label: "small yet permanent",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
    label: "stores",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n3-n4",
    source: "n3",
    target: "n4",
    label: "are",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n4-n5",
    source: "n4",
    target: "n5",
    label: "fetched and executed by",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
];
