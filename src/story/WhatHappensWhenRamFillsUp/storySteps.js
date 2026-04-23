export const storySteps = [
  {
    id: "step-0",
    title: "Speeding Up the Computer Further",
    beats: [
      {
        narration: "We already know that apps, photos, and documents are stored in permanent storage, such as a hard drive or SSD.",
        reveal: {},
        revealTriggers: [
          {
            phrase: "apps, photos, and documents are stored in permanent storage",
            reveal: { nodes: ["n1", "n5"], edges: ["n1-n5"] },
            focus: ["n1", "n5"],
          },
        ],
        focus: "",
        images: [],
      },
      {
        narration: "When you open an app, a document or a photo, they are copied into RAM so the CPU can access them faster.",
        reveal: { nodes: ["n1", "n5"], edges: ["n1-n5"] },
        revealTriggers: [{ phrase: "them faster", reveal: { nodes: ["n7"], edges: ["n1-n7"] }, focus: ["n1", "n7"] }],
        focus: ["n1", "n5"],
        images: [],
      },
      {
        narration:
          "But RAM is limited, so if you open lots of apps or work with large files, it can start to fill up.\n\nWhat happens when RAM is full?",
        reveal: { nodes: ["n1", "n5", "n7"], edges: ["n1-n5", "n1-n7"] },
        focus: ["n7"],
        images: [],
      },
      {
        narration:
          "If RAM becomes full, the computer has nowhere to store new instructions and data.\n\nThis can cause issues like apps not opening or the computer freezing.\n\nBasically, the computer would stop functioning properly.",
        reveal: { nodes: ["n1", "n5", "n7"], edges: ["n1-n5", "n1-n7"] },
        focus: "",
        images: [],
      },
      {
        narration:
          "To deal with this, computers use a mechanism called virtual memory, which uses part of permanent storage as extra temporary space.",
        reveal: { nodes: ["n1", "n5", "n7"], edges: ["n1-n5", "n1-n7"] },
        revealTriggers: [{ phrase: "temporary space", reveal: { nodes: ["n6"], edges: ["n6-n5"] }, focus: ["n5", "n6"] }],
        focus: "",
        images: [],
      },
      {
        narration:
          "In simple terms, when RAM starts getting full, inactive apps and files are moved out of RAM and into this space on permanent storage.\n\nThis frees up space in RAM for the instructions and data needed right away.",
        reveal: { nodes: ["n1", "n5", "n6", "n7"], edges: ["n1-n5", "n1-n7", "n6-n5"] },
        revealTriggers: [{ phrase: "right away", reveal: { nodes: [], edges: ["n7-n6"] }, focus: [] }],
        focus: ["n6"],
        images: [],
      },
      {
        narration: "When those apps or files are needed again, they are transferred back into RAM so they can be used quickly.",
        reveal: { nodes: ["n1", "n5", "n6", "n7"], edges: ["n1-n5", "n1-n7", "n7-n6", "n6-n5"] },
        revealTriggers: [{ phrase: "used quickly", reveal: { nodes: [], edges: ["n6-n7"] }, focus: [] }],
        focus: ["n1", "n5", "n6", "n7"],
        images: [],
      },

      {
        narration:
          "Virtual Memory is a clever solution because it lets the user keep opening apps and files, but it has a downside.\n\nPermanent storage is much slower than RAM, so moving data back and forth takes time and can slow the computer down.\n\nThat is why, when RAM fills up, you might notice:* apps becoming slow* switching between tasks taking longer* the whole computer feeling less responsive",
        reveal: { nodes: ["n1", "n5", "n6", "n7"], edges: ["n1-n5", "n1-n7", "n7-n6", "n6-n7", "n6-n5"] },
        focus: "",
        images: [],
      },
    ],
  },
];
