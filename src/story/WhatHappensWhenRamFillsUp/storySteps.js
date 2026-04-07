export const storySteps = [
  {
    id: "step-0",
    title: "What Happens When RAM Fills Up?",
    beats: [
      {
        narration:
          "We already know that apps, photos, and documents are stored in permanent storage.\n\nWhen you open them, they are copied into RAM so the CPU can access them faster.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Limited RAM",
    beats: [
      {
        narration: "But RAM is limited, so if you open lots of apps or work with large files, it can start to fill up.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
      {
        narration:
          "If RAM becomes full, the computer has nowhere to store new instructions and data.\n\nThis can cause issues like apps not opening or the computer freezing.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Virtual Memory",
    beats: [
      {
        narration:
          "To deal with this, computers use a mechanism called virtual memory, which uses part of permanent storage as extra temporary space.",
        reveal: { nodes: ["n1", "n2", "n4"], edges: ["n1-n2", "n2-n4"] },
        focus: "n4",
        images: [],
      },
      {
        narration:
          "When RAM starts getting full, inactive apps and files are moved out of RAM and into this space on permanent storage.\n\nThis frees up space in RAM for the instructions and data needed right away.",
        reveal: { nodes: ["n1", "n2", "n4"], edges: ["n1-n2", "n2-n4"] },
        focus: ["n2", "n4"],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "The Downside",
    beats: [
      {
        narration:
          "When those apps or files are needed again, they are transferred back into RAM so they can be used quickly.\n\nBut permanent storage is much slower than RAM, so moving data back and forth takes time.",
        reveal: { nodes: ["n1", "n2", "n4", "n5"], edges: ["n1-n2", "n2-n4", "n4-n5"] },
        focus: ["n4", "n5"],
        images: [],
      },
      {
        narration:
          "That is why, when RAM fills up, you might notice apps becoming slow, switching between tasks taking longer, and the whole computer feeling less responsive.",
        reveal: { nodes: ["n1", "n2", "n4", "n5"], edges: ["n1-n2", "n2-n4", "n4-n5"] },
        focus: "n5",
        images: [],
      },
    ],
  },
];
