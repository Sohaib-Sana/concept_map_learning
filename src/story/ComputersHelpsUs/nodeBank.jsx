import { Position } from "@xyflow/react";

export const initialNodes = [
  {
    id: "n1",
    position: { x: 250, y: 40 },
    data: {
      label: "Computing Devices",
      variant: "groupedDevices",
      items: [
        { id: "n2", label: "Laptops /\nDesktop PCs" },
        { id: "n3", label: "Smartphones" },
        { id: "n4", label: "Tablets" },
        { id: "sp1", label: "", className: "groupNode__item--spacer" },
        { id: "n5", label: "Smart Watches" },
        { id: "n6", label: "Games Consoles" },
      ],
      handles: [
        { id: "h1", type: "source", position: Position.Bottom },
        { id: "h2", type: "target", position: Position.Right },
      ],
    },
    style: { width: 560, height: 270 },
    type: "customNode",
  },

  {
    id: "n7",
    position: { x: 405, y: 380 },
    data: {
      label: "Application Programs\nor Apps",
      className: "nodeContent--main",
      style: { whiteSpace: "pre-line" },
      handles: [
        { id: "h1", type: "target", position: Position.Top },
        { id: "h2", type: "source", position: Position.Bottom },
      ],
    },
    type: "customNode",
  },

  {
    id: "j1",
    position: { x: 530, y: 540 },
    data: {
      isJunction: true,
      handles: [
        { id: "in", type: "target", position: Position.Top },
        { id: "out1", type: "source", position: Position.Left },
        { id: "out2", type: "source", position: Position.Bottom },
        { id: "out3", type: "source", position: Position.Right },
      ],
    },
    type: "customNode",
    draggable: false,
  },

  {
    id: "n8",
    position: { x: 200, y: 630 },
    data: {
      label: "Have Fun",
      className: "nodeContent--branch",
      handles: [{ id: "h1", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n9",
    position: { x: 455, y: 630 },
    data: {
      label: "Connect",
      className: "nodeContent--branch",
      handles: [{ id: "h1", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },
  {
    id: "n10",
    position: { x: 740, y: 630 },
    data: {
      label: "Work",
      className: "nodeContent--branch",
      handles: [{ id: "h1", type: "target", position: Position.Top }],
    },
    type: "customNode",
  },

  {
    id: "n11",
    position: { x: 200, y: 700 },
    data: {
      label: "• Stream videos\n• Listen to music",
      className: "nodeContent--examples",
    },
    type: "customNode",
  },
  {
    id: "n12",
    position: { x: 455, y: 700 },
    data: {
      label: "• Chatting / texting\n• Posting on social media\n  e.g. TikTok",
      className: "nodeContent--examples",
    },
    type: "customNode",
  },
  {
    id: "n13",
    position: { x: 740, y: 700 },
    data: {
      label: "• Join online classes\n• Online research for\n  homework",
      className: "nodeContent--examples",
    },
    type: "customNode",
  },

  {
    id: "n14",
    position: { x: 1020, y: 120 },
    data: {
      label: "Operating Systems",
      className: "nodeContent--os",
      handles: [{ id: "h1", type: "source", position: Position.Left }],
    },
    type: "customNode",
  },
  {
    id: "n15",
    position: { x: 1030, y: 210 },
    data: {
      label: "• Windows\n• MacOS\n• iOS\n• Android",
      className: "nodeContent--examples",
    },
    type: "customNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n7",
    source: "n1",
    target: "n7",
    label: "run",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n7-j1",
    source: "n7",
    target: "j1",
    label: "enable us to",
  },
  {
    id: "j1-n8",
    source: "j1",
    target: "n8",
    sourceHandle: "out1",
    targetHandle: "h1",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n9",
    source: "j1",
    target: "n9",
    sourceHandle: "out2",
    targetHandle: "h1",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "j1-n10",
    source: "j1",
    target: "n10",
    sourceHandle: "out3",
    targetHandle: "h1",
    markerEnd: { type: "arrowclosed" },
  },
  {
    id: "n14-n1",
    source: "n14",
    target: "n1",
    label: "help use and manage",
    markerEnd: { type: "arrowclosed" },
  },
];
