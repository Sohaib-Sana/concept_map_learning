export const storySteps = [
  {
    id: "step-0",
    title: "Speeding Up the Computer Further",
    beats: [
      {
        narration:
          "In the last lesson, we saw how RAM helps the CPU get instructions and data more quickly.\n\nBut even with RAM, the CPU can still end up waiting.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Cache",
    beats: [
      {
        narration: "So how can we make the computer even faster?\n\nThis is done using a very small, very fast type of storage called cache.",
        reveal: { nodes: ["n2"], edges: [] },
        focus: "n2",
        images: [],
      },
      {
        narration: "Cache is a very small amount of very fast storage located very close to the CPU.",
        reveal: { nodes: ["n2", "n3", "n4", "n5"], edges: ["n2-n3", "n2-n4", "n2-n5"] },
        focus: ["n2", "n3"],
        images: [],
      },
      {
        narration:
          "It stores instructions and data that the CPU is likely to need again very soon.\n\nThis means the CPU can get some of its most needed information even faster than from RAM.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n2-n3", "n2-n4", "n2-n5"] },
        focus: ["n1", "n2", "n3"],
        images: [],
      },
    ],
  },
];
