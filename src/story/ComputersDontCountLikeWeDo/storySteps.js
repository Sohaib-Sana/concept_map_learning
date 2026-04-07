export const storySteps = [
  {
    id: "step-0",
    title: "Computers",
    beats: [
      {
        narration:
          "Hi! Today we’re going to learn how computers work with numbers.\n\nComputers don’t use the digits 0 to 9 to represent numbers.\n\nInstead, they use only 0 and 1.",
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
    title: "Decimal",
    beats: [
      {
        narration: "Humans normally use the decimal number system, which uses ten digits:\n0, 1, 2, 3, 4, 5, 6, 7, 8, 9.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: [],
      },
      {
        narration: "Computers, however, use only two digits: 0 and 1.\n\nThis is called binary.",
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
    id: "step-2",
    title: "Why Only 0 and 1?",
    beats: [
      {
        narration: "Computers are electrical devices, so they use electricity to represent numbers.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        focus: ["n2", "n3"],
        images: [],
      },
      {
        narration:
          "If a computer tried to use the same ten digits that we use, it would need to tell the difference between ten different electrical levels.\n\nThat would be difficult to do reliably.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        focus: "n3",
        images: [],
      },
      {
        narration:
          "A small change in the electrical signal could make one level seem like another, and that could cause mistakes.\n\nSo computer designers chose to use just two clear electrical states instead.",
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
    id: "step-3",
    title: "Two Clear States",
    beats: [
      {
        narration: "A simple way to think about binary is that the computer only has to choose between two clear possibilities.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5"],
        },
        focus: ["n4", "n5"],
        images: [],
      },
      {
        narration:
          "One electrical state represents 0, and the other electrical state represents 1.\n\nUsing only two states makes computers much simpler and more reliable.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5"],
        },
        focus: ["n3", "n4", "n5"],
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Representing Numbers in Binary",
    beats: [
      {
        narration: "Even though binary uses only 0 and 1, it can still represent ordinary numbers.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5", "n2-n6"],
        },
        focus: "n6",
        images: [],
      },
      {
        narration: "For example:\nDecimal 1 = Binary 1\nDecimal 2 = Binary 10\nDecimal 3 = Binary 11\nDecimal 4 = Binary 100\nDecimal 5 = Binary 101",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5", "n2-n6"],
        },
        focus: "n6",
        images: [],
      },
      {
        narration:
          "So, computers do not count like humans.\n\nThey use binary, which only uses 0 and 1, because that works reliably with electricity.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5", "n2-n6"],
        },
        focus: ["n2", "n3", "n6"],
        images: [],
      },
    ],
  },
];
