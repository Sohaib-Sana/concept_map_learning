import { Position } from "@xyflow/react";
import { data } from "react-router-dom";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 350, y: 100 },
    data: {
      label: "Software",
      className: "nodeContent--main",
      handles: [{ id: "out", type: "source", position: Position.Bottom }],
    },
    type: "customNode",
  },
  {
    id: "j1",
    position: { x: 475, y: 250 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "outLeft", type: "source", position: Position.Left },
        { id: "outRight", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    isDraggable: false,
  },
  {
    id: "n2",
    position: { x: 0, y: 300 },
    data: {
      label: "Traditional",
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
    position: { x: 0, y: 500 },
    data: {
      label: "Instructions",
      className: "nodeContent--main",

      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 350, y: 900 },
    data: {
      label: "Complex Real World\nProblems\n/Scenarios",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [{ id: "in", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 800, y: 300 },
    data: {
      label: "AI",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "j2",
    position: { x: 925, y: 420 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "outLeft", type: "source", position: Position.Left },
        { id: "outRight", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    isDraggable: false,
  },
  {
    id: "n6",
    position: { x: 500, y: 500 },
    data: {
      label: "Rule Based",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n7",
    position: { x: 1100, y: 500 },
    data: {
      label: "Machine Learning",
      className: "nodeContent--main",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n8",
    position: { x: 1700, y: 500 },
    data: {
      label: "Examples",
      className: "nodeContent--main",
      handles: [{ id: "in", type: "target", position: Position.Left }],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-j1",
    source: "n1",
    target: "j1",
    type: "step",
    label: "types include",
  },
  {
    id: "j1-n2",
    source: "j1",
    target: "n2",
    type: "step",
    sourceHandle: "outLeft",
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
    label: "contains fixed Human written",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n5",
    source: "j1",
    sourceHandle: "outRight",
    target: "n5",
    type: "step",
    label: "to be carried out by",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n5-j2",
    source: "n5",
    target: "j2",
    type: "step",
    label: "types include",
  },
  {
    id: "j2-n6",
    source: "j2",
    target: "n6",
    type: "step",
    sourceHandle: "outLeft",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j2-n7",
    source: "j2",
    target: "n7",
    type: "step",
    sourceHandle: "outRight",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n6-n4",
    source: "n6",
    target: "n4",
    type: "step",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n7-n8",
    source: "n7",
    target: "n8",
    type: "step",
    label: "learns from",
    markerEnd: { type: "arrowclosed" },
  },
];
