export const storySteps = [
  {
    id: "step-0",
    title: "Speeding Up the Computer Further",
    beats: [
      {
        narration:
          "Hi! In the last lesson, we saw how RAM helps the CPU get instructions and data more quickly.\n\nBut even with RAM, the CPU can still end up waiting.\n\nSo how can we make the computer even faster?",
        reveal: {},
        revealTriggers: [{ phrase: "quickly", reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n1", "n3-n2"] }, focus: ["n1", "n2", "n3"] }],
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
        narration: "This is done using a very small, very fast type of storage called cache.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n1", "n3-n2"] },
        revealTriggers: [
          {
            phrase: "fast type of storage called cache.",
            reveal: { nodes: ["n4"], edges: [] },
            focus: [],
          },
        ],
        focus: "n2",
        images: [],
      },
      {
        narration:
          "Cache is a very small amount of very fast storage located very close to the CPU. \n\nIt stores instructions and data that the CPU is likely to need again very soon. \n\nThis means the CPU can get some of its most needed information even faster than from RAM.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n1", "n3-n2"] },
        revealTriggers: [
          {
            phrase: "RAM",
            reveal: { nodes: ["n4"], edges: ["n1-n4"] },
            focus: ["n1", "n4"],
          },
        ],
        focus: ["n1", "n2", "n3"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Summary",
    beats: [
      {
        narration:
          "So, the closer the data is to the CPU, the faster the CPU can use it.\n\nCache helps by keeping useful instructions and data extremely close by, ready for quick access.\n\nThis means the CPU spends even less time waiting and the computer can run even faster.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n1", "n3-n2", "n1-n4"] },
        focus: ["n1", "n2", "n3", "n4"],
        images: [],
      },
    ],
  },
];
