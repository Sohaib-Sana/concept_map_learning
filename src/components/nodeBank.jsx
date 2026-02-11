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
    position: { x: 250, y: 150 },
    data: {
      label: "Substances / Materials",
      handles: [
        { id: "h1", type: "target", position: Position.Left },
        { id: "h2", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n3",
    position: { x: 302, y: 250 },
    data: {
      label: "Matter",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
  },
  {
    id: "n4",
    position: { x: 520, y: 250 },
    data: {
      label: "Particles",
      handles: [
        { id: "h1", type: "target", position: Position.Left },
        { id: "h2", type: "source", position: Position.Top },
        { id: "h3", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n5",
    position: { x: 400, y: 380 },
    data: {
      label: "Attraction",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n6",
    position: { x: 650, y: 380 },
    data: {
      label: "Movement",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "target", position: Position.Right },
        { id: "h3", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },
  {
    id: "n7",
    position: { x: 450, y: 120 },
    data: { label: "Atoms", handles: [{ id: "h1", type: "target", position: Position.Bottom }] },
    type: "customNode",
  },
  {
    id: "n8",
    position: { x: 600, y: 120 },
    data: { label: "Molecules", handles: [{ id: "h1", type: "target", position: Position.Bottom }] },
    type: "customNode",
  },
  {
    id: "n9",
    data: {
      label: "State of Matter",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "source", position: Position.Bottom },
      ],
    },
    position: { x: 515, y: 520 },
    type: "customNode",
  },
  {
    id: "n10",
    data: {
      label: "Solid",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "source", position: Position.Right, offset: -10 },
        { id: "h3", type: "target", position: Position.Right, offset: 10 },
      ],
    },
    position: { x: 300, y: 650 },
    type: "customNode",
  },
  {
    id: "n11",
    data: {
      label: "Liquid",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "target", position: Position.Left, offset: -10 },
        { id: "h3", type: "source", position: Position.Right, offset: -10 },
        { id: "h4", type: "source", position: Position.Left, offset: 10 },
        { id: "h5", type: "target", position: Position.Right, offset: 10 },
      ],
    },
    position: { x: 540, y: 650 },
    type: "customNode",
  },
  {
    id: "n12",
    data: {
      label: "Gas",
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "target", position: Position.Left, offset: -10 },
        { id: "h3", type: "source", position: Position.Left, offset: 10 },
      ],
    },
    position: { x: 850, y: 650 },
    type: "customNode",
  },

  {
    id: "j1",
    position: { x: 565, y: 330 }, // between n4 and n5/n6
    data: {
      isJunction: true,
      label: "",
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out1", type: "source", position: Position.Left },
        { id: "out2", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    draggable: false,
    selectable: false,
  },
  {
    id: "j2",
    position: { x: 565, y: 190 }, // between n4 and n7/n8
    data: {
      label: "",
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Bottom },
        { id: "out1", type: "source", position: Position.Left },
        { id: "out2", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    draggable: false,
    selectable: false,
  },
  {
    id: "j3",
    position: { x: 580, y: 460 }, // between n5 and n6
    data: {
      label: "",
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
    draggable: false,
    selectable: false,
  },
];

export const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2", label: "made of various" },
  { id: "n2-n3", source: "n2", target: "n3", label: "that scientist call" },
  { id: "n3-n4", source: "n3", target: "n4", label: "made of tiny" },

  // HAVE BOTH group
  { id: "n4-j1", source: "n4", target: "j1", sourceHandle: "h3", label: "have both" },
  { id: "j1-n5", source: "j1", target: "n5", sourceHandle: "out1", type: "step" },
  { id: "j1-n6", source: "j1", target: "n6", sourceHandle: "out2", type: "step" },

  // EITHER group
  { id: "n4-j2", source: "n4", target: "j2", sourceHandle: "h2", label: "either" },
  { id: "j2-n7", source: "j2", target: "n7", sourceHandle: "out1", type: "step" },
  { id: "j2-n8", source: "j2", target: "n8", sourceHandle: "out2", type: "step" },

  // Balance group
  { id: "n5-j3", source: "n5", target: "j3", sourceHandle: "h2", type: "step" },
  { id: "n6-j3", source: "n6", target: "j3", sourceHandle: "h3", type: "step" },
  { id: "j3-n7", source: "j3", target: "n9", label: "balance between them determines" },

  { id: "n9-n10", source: "n9", target: "n10", label: "attraction > movement" },
  { id: "n9-n11", source: "n9", target: "n11", label: "attraction = movement" },
  { id: "n9-n12", source: "n9", target: "n12", label: "attraction < movement" },
  { id: "n10-n11", source: "n10", target: "n11", targetHandle: "h2" },
  { id: "n11-n12", source: "n11", target: "n12", targetHandle: "h2" },

  { id: "n11-n10", source: "n11", target: "n10", sourceHandle: "h4", targetHandle: "h3" },
  { id: "n12-n11", source: "n12", target: "n11", targetHandle: "h5" },
];
