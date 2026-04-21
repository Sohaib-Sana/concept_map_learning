export const storySteps = [
  {
    id: "step-0",
    title: "The Problem",
    beats: [
      {
        narration:
          "You now know what to focus on and how to break the problem down into smaller tasks.\n\nBut there is one more question: how do you actually tell the computer what to do?\n\nThis is where something called algorithmic thinking comes in. \n\nSounds complicated but trust me it isn’t!",
        reveal: { nodes: [], edges: [] },

        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Focus on What Matters and Break Down the Problem",
    beats: [
      {
        narration:
          "Algorithmic thinking simply means taking a task and turning it into precise, exact steps.\n\nIn other words it’s about creating an algorithm.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [
          {
            phrase: "an algorithm",
            reveal: {
              nodes: ["n1", "n2", "n3"],
              edges: ["n1-n2", "n2-n3"],
            },
            focus: ["n1", "n2", "n3"],
          },
        ],
        focus: "",
        images: [],
      },
      {
        narration:
          "The purpose of algorithmic thinking is to ensure a computer can understand exactly what to do and carry out the task without any confusion.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        revealTriggers: [
          {
            phrase: "confusion",
            reveal: {
              nodes: ["n4"],
              edges: ["n3-n4"],
            },
            focus: ["n4"],
          },
        ],

        focus: ["n1", "n2", "n3"],
        images: [],
      },
    ],
  },
];
