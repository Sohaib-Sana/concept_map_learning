import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 450, y: 350 },
    data: {
      label: "Data",
      variant: "groupedDevices",
      items: [
        { id: "n2", label: "OS" },
        { id: "n3", label: "Apps" },
        { id: "n4", label: "Files" },
      ],
      handles: [
        { id: "outTop", type: "source", position: Position.Top },
        { id: "outLeft", type: "source", position: Position.Left },
      ],
    },
    style: { width: 560, height: 270 },
    type: "customNode",
  },

  // {
  //   id: "n5",
  //   position: { x: 450, y: 40 },
  //   data: {
  //     label: "Virtual Memory",
  //     variant: "groupedDevices",
  //     items: [{ id: "n6", label: "Permanent Storage" }],
  //     handles: [
  //       { id: "inTop", type: "target", position: Position.Top, offset: -20 },
  //       { id: "out", type: "source", position: Position.Top, offset: -50 },
  //       { id: "inBottom", type: "target", position: Position.Bottom },
  //     ],
  //   },
  //   style: { width: 560, height: 270 },
  //   type: "customNode",
  // },

  {
    id: "n5",
    position: { x: 600, y: 200 },
    data: {
      label: "Permanent Storage",
      className: "nodeContent--main",
      handles: [
        { id: "inTop", type: "target", position: Position.Top },
        { id: "inBottom", type: "target", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 660, y: 100 },
    data: {
      label: "Virtual Memory",
      handles: [
        { id: "outTop", type: "source", position: Position.Left },
        { id: "outBottom", type: "source", position: Position.Bottom },
        { id: "inTop", type: "target", position: Position.Top },
      ],
    },
    type: "customNode",
  },
  {
    id: "n7",
    position: { x: 0, y: 200 },
    data: {
      label: "RAM",
      className: "nodeContent--main",
      handles: [
        { id: "outTop", type: "source", position: Position.Top },
        { id: "inTop", type: "target", position: Position.Top, offset: 20 },
        { id: "inRight", type: "target", position: Position.Right },
      ],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n5",
    source: "n1",
    sourceHandle: "outTop",
    target: "n5",
    targetHandle: "inBottom",
    label: "stored in",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },
  {
    id: "n1-n7",
    source: "n1",
    sourceHandle: "outLeft",
    target: "n7",
    targetHandle: "inRight",
    label: "1. copied to when in use",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },
  {
    id: "n6-n5",
    source: "n6",
    sourceHandle: "outBottom",
    target: "n5",
    targetHandle: "inTop",
    label: "is part of",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },
  {
    id: "n7-n6",
    source: "n7",
    sourceHandle: "outTop",
    target: "n6",
    targetHandle: "inTop",
    label: "2. when full inactive apps and files moved to",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },

  {
    id: "n6-n7",
    source: "n6",
    sourceHandle: "outTop",
    target: "n7",
    targetHandle: "inTop",
    label: "3. moved back when needed",
    markerEnd: { type: "arrowclosed" },
    type: "step",
  },
];
