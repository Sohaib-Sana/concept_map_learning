import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 50, y: 150 },
    data: { label: "Things", handles: [{ id: "h1", type: "source", position: Position.Right }] },
    type: "customNode",
  },
  {
    id: "n2",
    position: { x: 300, y: 150 },
    data: {
      label: "Materials",
      handles: [
        { id: "h1", type: "source", position: Position.Right },
        { id: "h2", type: "target", position: Position.Left },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 550, y: 150 },
    data: {
      label: "Matter",
      handles: [
        { id: "h1", type: "source", position: Position.Bottom },
        { id: "h2", type: "target", position: Position.Left },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 550, y: 300 },
    data: {
      label: "Atoms",
      handles: [
        { id: "h1", type: "source", position: Position.Left },
        { id: "h2", type: "target", position: Position.Top },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 300, y: 300 },
    data: {
      label: "Elements",
      handles: [
        { id: "h1", type: "source", position: Position.Left },
        { id: "h2", type: "target", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 50, y: 300 },
    data: {
      label: "Compounds",
      handles: [
        { id: "h1", type: "target", position: Position.Right },
        { id: "h2", type: "target", position: Position.Left },
      ],
    },
    type: "customNode",
  },
];

export const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2", label: "Made of different", markerEnd: { type: "arrowclosed" } },
  { id: "n2-n3", source: "n2", target: "n3", label: "scientists call", markerEnd: { type: "arrowclosed" } },
  { id: "n3-n4", source: "n3", target: "n4", label: "made of tiny building blocks", markerEnd: { type: "arrowclosed" } },
  { id: "n4-n5", source: "n4", target: "n5", label: "each type called", markerEnd: { type: "arrowclosed" } },
  { id: "n5-n6", source: "n5", target: "n6", label: "combine to form", markerEnd: { type: "arrowclosed" } },
];
