export const storySteps = [
  {
    id: "step-0",
    title: "The Other Side of Connectivity",
    beats: [
      {
        narration:
          "We’ve learned that software is the set of instructions that tells a computer what to do.\n\nWithout it, a computer is just hardware that cannot do anything useful.\n\nBut this leads to an important question:\nWhere does software come from?",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
      {
        narration:
          "Software does not appear on its own — it has to be created.\n\nA person called a programmer writes instructions for the computer to follow.",
        reveal: { nodes: [], ghostNodes: ["n2"], edges: [] },
        revealTriggers: [
          {
            phrase: "programmer",
            reveal: {
              nodes: ["n1"],
              edges: [],
            },
            focus: "n1",
          },
          {
            phrase: "writes instructions",
            reveal: {
              nodes: [],
              edges: ["n1-n2"],
            },
            focus: "",
          },
          {
            phrase: "follow",
            reveal: {
              nodes: ["n2"],
              edges: [],
            },
            focus: "n2",
          },
        ],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Example - Instructions",
    beats: [
      {
        narration:
          "You can think of this a bit like giving instructions to a person.\n\nFor example, if you were explaining how to make a cup of tea, you would describe each step clearly in a language they understand.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
      {
        narration: "But computers do not understand English or any human language.\n\nRemember, they only understand binary — patterns of 0s and 1s.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Programming Lanugage",
    beats: [
      {
        narration: "So programmers use something in between called programming languages.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        revealTriggers: [{ phrase: "programming languages", reveal: { nodes: ["n3"], edges: ["n2-n3"] }, focus: "n3" }],
        focus: "",
        images: [],
      },
      {
        narration: "A programming language is designed to be readable by humans, but can also be converted into binary.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        revealTriggers: [{ phrase: "binary", reveal: { nodes: ["n4"], edges: ["n3-n4"] }, focus: "n4" }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Programming Lanugage - CPU Instructions",
    beats: [
      {
        narration: "So, the instructions written using a programming language and converted into binary are fetched and executed by the CPU.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n3-n4"] },
        revealTriggers: [{ phrase: "CPU", reveal: { nodes: ["n5"], edges: ["n4-n5"] }, focus: "n5" }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Summary",
    beats: [
      {
        narration:
          "This means that every app, game, and operating system you use started as instructions written by a person using a programming language.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5"] },
        focus: ["n1", "n2", "n3", "n4", "n5"],
        images: [],
      },
    ],
  },
];
