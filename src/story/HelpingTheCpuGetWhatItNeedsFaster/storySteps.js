export const storySteps = [
  {
    id: "step-0",
    title: "Helping the CPU Get What It Needs Faster",
    beats: [
      {
        narration:
          "From the moment a computing device is switched on, the CPU fetches and executes instructions from the operating system (OS) and various apps.\n\nWe also learnt that these instructions are stored in permanent storage, such as hard drives or SSDs.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [
          {
            phrase: "CPU fetches",
            reveal: { nodes: ["n1"], edges: [] },
            focus: "n1",
          },
        ],
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
          "The problem is that permanent storage is much slower than the CPU.\n\nIf the CPU had to fetch every instruction or piece of data directly from permanent storage, it would spend a lot of time waiting, making the computer much slower.\n\nSo how do computers solve this problem and stop the CPU from having to wait?",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "RAM",
    beats: [
      {
        narration:
          "To solve this problem, computers use RAM.\n\nRAM (which stands for Random Access Memory) is temporary storage that stores the instructions and data the computer is using right now.\n\nLet’s see how it works and helps improve a computing device's performance.",
        reveal: { nodes: ["n1"], edges: [] },
        revealTriggers: [
          {
            phrase: "RAM",
            reveal: { nodes: ["n2"], edges: ["n1-n2", "n2-n1"] },
            focus: "n2",
          },
        ],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Why It Helps",
    beats: [
      {
        narration: "When you open an app, the instructions for that app are copied from permanent storage into RAM. ",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n1"] },
        revealTriggers: [
          {
            phrase: "copied from permanent storage into RAM",
            reveal: { nodes: [], edges: ["n2-n3", "n3-n2"] },
            focus: ["n2", "n3"],
          },
        ],
        focus: ["n2", "n3"],
        images: [],
      },
      {
        narration:
          "Because RAM is much faster to access than permanent storage, the CPU can get what it needs more quickly, so the computer runs more smoothly.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n1", "n3-n2"] },
        focus: ["n2", "n3"],
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Why It Helps",
    beats: [
      {
        narration:
          "Let’s say you are using a photo editing app to edit a photo — the data for that photo is also copied into RAM.\n\nThis means the computer can access the photo much more quickly while you are editing it, so changes can be made and shown faster.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n1", "n3-n2"] },
        focus: ["n1", "n2", "n3"],
        images: [],
      },
    ],
  },
];
