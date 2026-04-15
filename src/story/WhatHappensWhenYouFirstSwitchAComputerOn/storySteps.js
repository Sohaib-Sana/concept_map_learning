export const storySteps = [
  {
    id: "step-0",
    title: "What Happens When You First Switch a Computer On?",
    beats: [
      {
        narration:
          "The moment you switch on a computer, the CPU begins fetching, decoding, and executing instructions.\n\nAt this point the operating system and apps have not been loaded yet.\n\nSo where do these first instructions come from?",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "ROM",
    beats: [
      {
        narration: "These first instructions come from a tiny permanent storage area called ROM.",
        revealTriggers: [
          {
            phrase: "ROM",
            reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
            focus: ["n1", "n2"],
          },
        ],
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "The First Instructions",
    beats: [
      {
        narration:
          "The startup instructions stored in ROM are called the BIOS. \n\nWhen the computer is powered on, the CPU fetches these BIOS instructions and begins carrying them out. ",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        revealTriggers: [
          {
            phrase: "BIOS",
            reveal: { nodes: ["n3"], edges: [] },
            focus: ["n3"],
          },
          {
            phrase: "out",
            reveal: { nodes: ["n4"], edges: ["n3-n4"] },
            focus: ["n4"],
          },
        ],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Checking the Hardware",
    beats: [
      {
        narration:
          "BIOS tells the CPU to send signals to different hardware components to check that they are working properly.\n\nFor example, it may check the memory, keyboard, and other important parts of the system.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n3-n4"] },
        revealTriggers: [
          {
            phrase: "system",
            reveal: { nodes: ["n5"], edges: ["n4-n5"] },
            focus: ["n5"],
          },
        ],
        focus: "",
        images: [],
      },
      {
        narration:
          "Once these checks have been carried out, the BIOS tells the CPU to begin loading the operating system so that normal use can begin.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5"] },
        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Concolusion",
    beats: [
      {
        narration:
          "So, when you first switch a computer on, the CPU does not begin with the operating system.\n\nIt first follows the startup instructions stored in ROM, called the BIOS.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5"] },
        focus: ["n1", "n2", "n3", "n4", "n5"],
        images: [],
      },
    ],
  },
];
// Resending the build
