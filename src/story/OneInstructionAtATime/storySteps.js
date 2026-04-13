export const storySteps = [
  {
    id: "step-0",
    title: "Software and Instructions",
    beats: [
      {
        narration:
          "We have already seen that software is the set of instructions a computer follows. \n\nEvery app, game, and operating system is made up of lines of instructions telling the computer exactly what to do.\n\nThese instructions have to be very detailed. A computer does not guess, think for itself, or fill in missing steps. It only does exactly what it has been told to do.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [{ phrase: "software is the set of instructions", reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] }, focus: ["n1", "n2"] }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Central Processing Unit (CPU)",
    beats: [
      {
        narration:
          "But which part of the computer actually carries out these instructions?\n\nThis is the job of the Central Processing Unit, or CPU.\n\nThe CPU is the part of the computer that carries out the instructions in software.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        revealTriggers: [{ phrase: "Central Processing Unit", reveal: { nodes: ["n3"], edges: ["n3-n2"] }, focus: "n3" }],
        focus: ["n1", "n2"],
        images: [],
      },
      {
        narration:
          "The CPU does this by repeating a process called the fetch–decode–execute cycle, the first step of which is fetch. This is where the CPU fetches an instruction.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n3-n2"] },
        revealTriggers: [{ phrase: "the first step of which is fetch", reveal: { nodes: ["n4"], edges: ["n2-n4", "n4-n3"] }, focus: "n4" }],
        focus: "n2",
        images: [],
      },
      {
        narration: "Next, the CPU decodes the instruction. This means it works out what the instruction is telling it to do.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n3-n2", "n2-n4", "n4-n3"] },
        revealTriggers: [{ phrase: "CPU decodes", reveal: { nodes: ["n5"], edges: ["n4-n5", "n5-n3"] }, focus: "n5" }],
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "The CPU",
    beats: [
      {
        narration: "Finally, the CPU executes the instruction. This means it actually carries out the command.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n3-n2", "n2-n4", "n4-n3", "n4-n5", "n5-n3"] },
        revealTriggers: [{ phrase: "CPU executes", reveal: { nodes: ["n6"], edges: ["n5-n6", "n6-n3"] }, focus: "n6" }],
        focus: "",
        images: [],
      },
    ],
  },

  {
    id: "step-3",
    title: "Fetch",
    beats: [
      {
        narration:
          "After the CPU has executed an instruction, the cycle begins again: it fetches the next instruction, decodes it, and carries it out.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5", "n6"], edges: ["n1-n2", "n3-n2", "n2-n4", "n4-n3", "n4-n5", "n5-n3", "n5-n6", "n6-n3"] },
        revealTriggers: [{ phrase: "the cycle begins again", reveal: { nodes: [], edges: ["n6-n4"] }, focus: ["n4", "n6"] }],
        focus: ["n1", "n2", "n3", "n4", "n5", "n6"],
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Decode and Execute",
    beats: [
      {
        narration:
          "So, no matter what you are doing on a computer — opening an app, typing a message, or playing a game — the CPU is really just carrying out instructions one at a time using the fetch–decode–execute cycle.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n3-n2", "n2-n4", "n4-n3", "n4-n5", "n5-n3", "n5-n6", "n6-n3", "n6-n4"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5", "n6"],
        images: [],
      },
    ],
  },
];
