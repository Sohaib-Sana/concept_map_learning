export const storySteps = [
  {
    id: "step-0",
    title: "What is Computational Thinking?",
    beats: [
      {
        narration:
          "So, when we use abstraction to focus on what matters, decomposition to break the problem into smaller parts, and algorithmic thinking to work out the exact steps, we are using something called computational thinking.\n\nComputational thinking is the steps involved in turning an idea, such as enabling a smartphone user to virtually try on different hats, into clear steps a computing device can follow to make this happen.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "AI - When Writing All the Rules Becomes Difficult",
    beats: [
      {
        narration:
          "We learnt that an algorithm is a precise sequence of steps designed to complete a task or solve a problem.\n\nBefore a computer can perform a task, the steps must be worked out clearly and in the correct order.\n\nOnce these steps are planned, a programmer uses a programming language to turn them into instructions that the computer can understand and follow.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [
          {
            phrase: "an algorithm",
            reveal: {
              nodes: ["n1", "j1", "n2", "n3"],
              edges: ["n1-j1", "j1-n2", "n2-n3"],
            },
            focus: ["n1", "j1", "n2", "n3"],
          },
        ],
        focus: "",
        images: [],
      },
      {
        narration:
          "Most software in use, like apps and operating systems, are made up of these detailed step-by-step instructions.\n\nLet’s call this type of software “traditional software”. This isn’t a technical term, just a simple way to help us understand it.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [
          {
            phrase: "understand it",
            reveal: { nodes: ["n1", "j1", "n2", "n3"], edges: ["n1-j1", "j1-n2", "n2-n3"] },
            focus: ["n1", "j1", "n2", "n3"],
          },
        ],
        focus: ["n1", "j1", "n2", "n3"],
        images: [],
      },
      {
        narration:
          "The thing is that traditional software works well when the steps are clear and can be written out exactly.\n\nHowever, some real-world problems are far more complex and unpredictable.\n\nIn these situations, it is not always possible to write precise, step-by-step instructions for every possible scenario.",
        reveal: { nodes: ["n1", "j1", "n2", "n3"], edges: ["n1-j1", "j1-n2", "n2-n3"] },
        focus: ["n1", "j1", "n2", "n3"],
        images: [],
      },

      {
        narration:
          "For example, recognising a face, understanding speech, or predicting what someone might do next involves too many variations and possibilities.\n\nBecause of this, traditional software struggles to handle these kinds of tasks effectively.",
        reveal: { nodes: ["n1", "j1", "n2", "n3"], edges: ["n1-j1", "j1-n2", "n2-n3"] },
        revealTriggers: [{ phrase: "tasks effectively", reveal: { nodes: ["n4"], edges: ["n3-n4"] }, focus: ["n4"] }],
        focus: [],
        images: [],
      },

      {
        narration:
          "Take the hat app.\n\nIt is one thing to say place the hat on the person's head — but writing a perfect set of rules for every possible situation is far more difficult.\n\nWhat if the head is turned?\n\nThe photo is taken from an unusual angle?\n\nThe lighting is poor\n\nA human copes with this kind of variation easily. A computer, following exact rules, struggles.",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4"], edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4"] },
        focus: ["n4"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "AI - When Writing All the Rules Becomes Difficult",
    beats: [
      {
        narration:
          "This is where Artificial Intelligence (AI) can help.\n\nIn very simple terms, AI is software that can carry out tasks that humans often do easily, but that are too difficult to solve using a simple list of exact rules.",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4"], edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4"] },
        revealTriggers: [{ phrase: "rules", reveal: { nodes: ["n5"], edges: ["j1-n5"] }, focus: ["n5"] }],
        focus: [""],
        images: [],
      },
      {
        narration:
          "Over the years, there have been different approaches to creating software that can do tasks that humans can do.\n\nLet’s look at them ..",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4", "n5"], edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4", "j1-n5"] },
        focus: ["n5"],
        images: [],
      },
      {
        narration: "First up: Rule-based AI\n\nEarly AI systems followed rules written by humans (e.g. if this shape appears, it’s a head).",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4", "n5"], edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4", "j1-n5"] },
        revealTriggers: [{ phrase: "a head", reveal: { nodes: ["j2", "n6"], edges: ["n5-j2", "j2-n6"] }, focus: ["n6"] }],
        focus: [""],
        images: [],
      },
      {
        narration:
          "Rule-based AI works for simple tasks, but as problems become more complex, the number of rules grows too large to manage, making it unable to handle the variety and unpredictability of complex real-world problems.",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6"], edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4", "j1-n5", "n5-j2", "j2-n6"] },
        revealTriggers: [{ phrase: "real-world problems", reveal: { nodes: [], edges: ["n6-n4"] }, focus: [] }],
        focus: ["n6"],
        images: [],
      },
      {
        narration:
          "A newer approach to enabling computers to do tasks humans can is called machine learning.\n\nInstead of writing every rule by hand, the programmer gives the software many examples and lets it learn from that.\n\nWhat do we mean by that?",
        reveal: {
          nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6"],
          edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4", "j1-n5", "n5-j2", "j2-n6", "n6-n4"],
        },
        revealTriggers: [{ phrase: "learn from that", reveal: { nodes: ["n7"], edges: ["j2-n7"] }, focus: ["n7"] }],
        focus: [""],
        images: [],
      },
      {
        narration:
          "Basically, this is similar to how a child learns to recognise a cat.\n\nWe do not usually teach a child what a cat is by giving a long written description, such as saying it has four legs, fur and whiskers. \n\nInstead, we show them examples, ask them to guess, and correct them when needed. Over time, they get better at recognising a cat. \n\nMachine Learning AI software can be taught in a similar way.",
        reveal: {
          nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6", "n7"],
          edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4", "j1-n5", "n5-j2", "j2-n6", "n6-n4", "j2-n7"],
        },
        revealTriggers: [{ phrase: "similar way", reveal: { nodes: ["n8"], edges: ["n7-n8"] }, focus: ["n8"] }],
        focus: ["n7"],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Conclusion",
    beats: [
      {
        narration:
          "Sometimes we want computers to handle messy real-world tasks (like chatting with us), but there are too many possible situations to write exact instructions for them all. In these cases, AI can help.\n\nAI is software that can learn from lots of examples and improve by receiving feedback.",
        reveal: {
          nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6", "n7", "n8"],
          edges: ["n1-j1", "j1-n2", "n2-n3", "n3-n4", "j1-n5", "n5-j2", "j2-n6", "n6-n4", "j2-n7", "n7-n8"],
        },
        focus: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6", "n7", "n8"],
        images: [],
      },
    ],
  },
];
