export const storySteps = [
  {
    id: "step-0",
    title: "Helping the CPU Get What It Needs Faster",
    beats: [
      {
        narration:
          "We have seen that the CPU keeps fetching and executing instructions, and that those instructions are stored in permanent storage such as hard drives or SSDs.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "The Problem",
    beats: [
      {
        narration:
          "The problem is that permanent storage is much slower than the CPU.\n\nIf the CPU had to keep going back to permanent storage every time it needed the next instruction or piece of data, it would spend a lot of time waiting.",
        reveal: { nodes: ["n1", "n3"], edges: [] },
        focus: ["n1", "n3"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "RAM",
    beats: [
      {
        narration: "To solve this problem, computers use RAM.\n\nRAM stands for Random Access Memory.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        focus: "n2",
        images: [],
      },
      {
        narration: "RAM is temporary storage that stores the instructions and data the computer is using right now.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n2-n4"] },
        focus: ["n2", "n4"],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Why It Helps",
    beats: [
      {
        narration:
          "When you open an app, the instructions for that app are copied from permanent storage into RAM.\n\nBecause RAM is much faster to access than permanent storage, the CPU can get what it needs more quickly, so the computer runs more smoothly.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n2-n4"] },
        focus: ["n1", "n2", "n3"],
        images: [],
      },
      {
        narration:
          "The same thing happens with data too.\n\nFor example, if you are editing a photo, the photo data is copied into RAM so the computer can access it much more quickly while you work.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n2-n4"] },
        focus: "n4",
        images: [],
      },
    ],
  },
];
