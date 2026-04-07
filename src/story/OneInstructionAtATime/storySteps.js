export const storySteps = [
  {
    id: "step-0",
    title: "One Instruction at a Time",
    beats: [
      {
        narration: "We have already seen that software is the set of instructions a computer follows.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Software and Instructions",
    beats: [
      {
        narration: "Every app, game, and operating system is made up of lines of instructions telling the computer exactly what to do.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: ["n1", "n2"],
        images: [],
      },
      {
        narration:
          "These instructions have to be very detailed.\n\nA computer does not guess, think for itself, or fill in missing steps. It only does exactly what it has been told to do.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
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
        narration:
          "But which part of the computer actually carries out these instructions?\n\nThis is the job of the Central Processing Unit, or CPU.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n3-n2"] },
        focus: "n3",
        images: [],
      },
      {
        narration: "The CPU is the part of the computer that carries out the instructions in software.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n3-n2"] },
        focus: ["n2", "n3"],
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
          "It does this by repeating a process called the fetch–decode–execute cycle.\n\nThe first step is fetch. This is where the CPU fetches an instruction.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n3-n2", "n2-n4", "n3-n4"],
        },
        focus: "n4",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Decode and Execute",
    beats: [
      {
        narration: "Next, the CPU decodes the instruction. This means it works out what the instruction is telling it to do.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n3-n2", "n2-n4", "n3-n4", "n4-n5"],
        },
        focus: "n5",
        images: [],
      },
      {
        narration: "Finally, the CPU executes the instruction. This means it actually carries out the command.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n3-n2", "n2-n4", "n3-n4", "n4-n5", "n5-n6"],
        },
        focus: "n6",
        images: [],
      },
      {
        narration:
          "After the CPU has executed an instruction, the cycle begins again: it fetches the next instruction, decodes it, and carries it out.\n\nSo no matter what you are doing on a computer, the CPU is really just carrying out instructions one at a time using the fetch–decode–execute cycle.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n3-n2", "n2-n4", "n3-n4", "n4-n5", "n5-n6"],
        },
        focus: ["n3", "n4", "n5", "n6"],
        images: [],
      },
    ],
  },
];
