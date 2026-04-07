export const storySteps = [
  {
    id: "step-0",
    title: "Computers Don't Count Like We Do!",
    beats: [
      {
        narration: "Hi! Today we’re going to learn why computers do not represent numbers in the same way humans do.",
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
    title: "Computers and Numbers",
    beats: [
      {
        narration: "Computers use electricity to represent numbers.",
        reveal: {
          nodes: ["n1", "n2"],
          edges: ["n1-n2"],
        },
        focus: ["n1", "n2"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Why Not Decimal?",
    beats: [
      {
        narration: "If computers used decimal, they would need 10 different electrical levels, one for each digit.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        focus: "n3",
        images: [],
      },
      {
        narration: "But fluctuations in electricity are common, and that could cause errors.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n3-n4"],
        },
        focus: "n4",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Using 0 and 1",
    beats: [
      {
        narration: "Those errors are avoided by using just 0 and 1, which means only 2 levels are needed.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5"],
        },
        focus: "n5",
        images: [],
      },
      {
        narration: "So numbers are represented as 0 and 1 inside a computer.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5", "n2-n5"],
        },
        focus: ["n2", "n5"],
        images: [],
      },
    ],
  },
];
