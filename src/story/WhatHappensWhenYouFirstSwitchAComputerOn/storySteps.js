export const storySteps = [
  {
    id: "step-0",
    title: "What Happens When You First Switch a Computer On?",
    beats: [
      {
        narration:
          "The moment you switch on a computer, the CPU begins fetching, decoding, and executing instructions.\n\nAt this point the operating system and apps have not been loaded yet.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "The First Instructions",
    beats: [
      {
        narration: "So where do these first instructions come from?\n\nThese first instructions come from a tiny permanent storage area called ROM.",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
        images: [],
      },
      {
        narration: "The startup instructions stored in ROM are called the BIOS.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Checking the Hardware",
    beats: [
      {
        narration: "When the computer is powered on, the CPU fetches these BIOS instructions and begins carrying them out.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
      {
        narration:
          "The BIOS tells the CPU to send signals to different hardware components to check that they are working properly.\n\nFor example, it may check the memory, keyboard, and other important parts of the system.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Loading the Operating System",
    beats: [
      {
        narration:
          "Once these checks have been carried out, the BIOS helps the computer begin loading the operating system so that normal use can begin.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n2-n4"] },
        focus: "n4",
        images: [],
      },
    ],
  },
];
