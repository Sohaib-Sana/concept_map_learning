export const storySteps = [
  {
    id: "step-0",
    title: "Computers Don't Count Like We Do!",
    beats: [
      {
        narration:
          "Hi! Today we’re going to learn how computers work with numbers.\n\nComputers don’t use the digits 0 to 9 to represent numbers.\n\nInstead, they use only 0 and 1.\n\nWe’ll explore why they do this and how it links to the fact that computers work using electricity.",
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
        narration:
          "Computers were first made to do calculations, but they do not deal with numbers in the same way we do.\n\nHumans normally use the decimal number system, which uses ten digits: 0 to 9.\n\nComputers, however, use only two digits:\n\n0 and 1\n\nThis is called binary.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: ["n1"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Why Not Decimal?",
    beats: [
      {
        narration:
          "So why do computers use only 0 and 1 to represent a number, say 28?\n\nIt’s because computers use electricity to represent numbers.\n\nTo be more precise, computers represent numbers using different levels of electricity.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        revealTriggers: [
          {
            phrase: "using different levels",
            reveal: {
              nodes: ["n2"],
              edges: ["n1-n2"],
            },
            focus: ["n1"],
          },
        ],
        focus: "n1",
        images: [],
      },
      {
        narration:
          "If a computer tried to use the same ten digits that we use, it would need to tell the difference between ten different electrical levels.\n\nFor example, one level of electricity might need to represent 0, another level 1, another 2, and so on up to 9.",
        reveal: {
          nodes: ["n1", "n2"],
          edges: ["n1-n2"],
        },
        revealTriggers: [
          {
            phrase: "to 9",
            reveal: {
              nodes: ["n3"],
              edges: ["n2-n3"],
            },
            focus: "n3",
          },
        ],
        focus: "n2",
        images: [],
      },
      {
        narration:
          "But using 10 different levels of electricity would be difficult to do reliably.\n\nA small change in the electrical signal could make one level seem like another, and that could cause mistakes.\n\nFor example, a signal meant to represent 5 might change slightly and be mistaken for 6.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        revealTriggers: [
          {
            phrase: "for 6",
            reveal: {
              nodes: ["n4"],
              edges: ["n3-n4"],
            },
            focus: "n4",
          },
        ],
        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Using 0 and 1",
    beats: [
      {
        narration:
          "To avoid this problem, computer designers chose to use just two clear electrical states instead.\n\nOne state represents 0 and the other represents 1. Using only two states makes computers much simpler and more reliable.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n3-n4"],
        },
        revealTriggers: [
          {
            phrase: "Using only two states",
            reveal: {
              nodes: ["n5"],
              edges: ["n4-n5"],
            },
            focus: "n5",
          },
        ],
        focus: "n4",
        images: [],
      },
      {
        narration:
          "Even though binary uses only 0 and 1, it can still represent ordinary numbers.\n\nFor example:\n\nDecimal 1 is Binary 1\nDecimal 2 is Binary 10\nDecimal 3 is Binary 11\nDecimal 4 is Binary 100\nDecimal 5 is Binary 101",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5"],
        },
        revealTriggers: [
          {
            phrase: "Even though binary uses only 0 and 1,",
            reveal: {
              nodes: [],
              edges: ["n2-n5"],
            },
            focus: ["n2", "n5"],
          },
        ],
        focus: ["n5"],
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Summary",
    beats: [
      {
        narration: "So, computers use binary (0 and 1), not decimal (0 - 9), because this works reliably with electricity.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5", "n2-n5"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5"],
        images: [],
      },
    ],
  },
];
