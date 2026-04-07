export const storySteps = [
  {
    id: "step-0",
    title: "A (very) Short History of Computers",
    beats: [
      {
        narration: "Hi! Today we’re going to go back in time…\n\nto when the word computer meant something completely different.",
        reveal: {
          nodes: [],
          edges: [],
        },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Human Computers",
    beats: [
      {
        narration:
          "The word computer did not originally mean a machine at all.\n\nIt meant a person whose job was to carry out calculations.\n\nThese human computers were given a set of detailed instructions for a calculation and had to follow them carefully, step by step.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: [],
      },
      {
        narration:
          "However, this approach had some clear problems.\n\nIt could take a long time, people could make mistakes, and if lots of calculations were needed, many people might be required, making the process slow and difficult to manage.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Electrical Machines",
    beats: [
      {
        narration: "To solve these problems, people began building machines that ran on electricity to carry out calculations.",
        reveal: {
          nodes: ["n1", "n2"],
          edges: ["n1-n2"],
        },
        focus: ["n1", "n2"],
        images: [],
      },
      {
        narration:
          "These machines were faster and more reliable than humans, but they weren’t very flexible.\n\nMost were built for one specific task, so if a different calculation was needed, a different machine had to be built.",
        reveal: {
          nodes: ["n1", "n2"],
          edges: ["n1-n2"],
        },
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Modern Computers",
    beats: [
      {
        narration:
          "The real breakthrough came when computers were developed that could be told what calculation to do instead of being built to do just one.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        focus: "n3",
        images: [],
      },
      {
        narration:
          "This was a huge change because the same machine could now solve many different problems.\n\nThe newer computers still had physical parts, but instead of being built for one fixed job, they were built to take instructions and carry them out.\n\nBy changing the instructions, the same computer could be used for different calculations.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Hardware and Software",
    beats: [
      {
        narration: "This leads us to two very important ideas.\n\nThe physical parts of a computer are called hardware.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n3-n4"],
        },
        focus: "n4",
        images: [],
      },
      {
        narration: "The instructions that tell the hardware what to do are called software.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5", "n5-n4"],
        },
        focus: ["n5", "n4"],
        images: [],
      },
      {
        narration:
          "The computing devices you use are hardware, and the apps and operating system are software.\n\nSo, over time, computers changed from human calculators to machines that could be told what to do.\n\nThat is why modern computers are made of hardware that runs software.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5", "n5-n4"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5"],
        images: [],
      },
    ],
  },
];
