export const storySteps = [
  {
    id: "step-0",
    title: "How to Organize a Party and Write Software",
    beats: [
      {
        narration:
          "Imagine you ask someone inexperienced to organise a party.\n\nWhat advice would you give them that increases their chances of success?",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [
          {
            phrase: "party",
            reveal: {
              nodes: ["n1"],
              edges: [],
            },
            focus: "n1",
          },
        ],
        focus: "",
        images: [],
      },
      {
        narration:
          "I think two pieces of advice would make a big difference.\n\nFirst, focus on what really matters — the date, venue, guests, budget, food, and music — rather than wasting time on irrelevant details like:\n\nthe pattern on the napkins \n\nor the type of string used to tie the balloons ",
        reveal: { nodes: ["n1", "j1"], edges: [] },
        revealTriggers: [
          {
            phrase: "balloons",
            reveal: {
              nodes: ["n2"],
              edges: ["n1-j1", "j1-n2"],
            },
            focus: "n2",
          },
        ],
        focus: "n1",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Focus on What Matters and Break Down the Problem",
    beats: [
      {
        narration: "Second, break the job into smaller tasks, such as invitations, food, decorations, and music, to make it more manageable.",
        reveal: { nodes: ["n1", "j1", "n2"], edges: ["n1-j1", "j1-n2"] },
        revealTriggers: [
          {
            phrase: "manageable",
            reveal: {
              nodes: ["n3"],
              edges: ["j1-n3"],
            },
            focus: "n3",
          },
        ],
        focus: "n2",
        images: [],
      },
      {
        narration:
          "By focusing on the important parts and ignoring what does not matter, the task becomes simpler and easier to manage.\n\nThis helps because:\n\n• you pay attention to the things that really affect success\n• you do not waste time on unimportant details\n• the problem becomes easier to think about",
        reveal: { nodes: ["n1", "j1", "n2", "n3"], edges: ["n1-j1", "j1-n2", "j1-n3"] },

        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Breaking Down the Problem",
    beats: [
      {
        narration:
          "Why breaking it into smaller tasks helps?\n\nBecause a big task can feel difficult when you look at it all at once.\n\nBut if you break it into smaller tasks, it becomes easier to handle.",
        reveal: { nodes: ["n1", "j1", "n2", "n3"], edges: ["n1-j1", "j1-n2", "j1-n3"] },
        focus: "",
        images: [],
      },
      {
        narration: "Focusing on what matters and ignoring what doesn’t is called abstraction.",
        reveal: { nodes: ["n1", "j1", "n2", "n3"], edges: ["n1-j1", "j1-n2", "j1-n3"] },
        revealTriggers: [{ phrase: "abstraction", reveal: { nodes: ["n4"], edges: ["n2-n4"] }, focus: "n4" }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Decomposition",
    beats: [
      {
        narration: "Breaking a big task into smaller parts is called decomposition.",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4"], edges: ["n1-j1", "j1-n2", "j1-n3", "n2-n4"] },
        revealTriggers: [{ phrase: "decomposition", reveal: { nodes: ["n5"], edges: ["n3-n5"] }, focus: "n5" }],
        focus: "n4",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Abstraction and Decomposition",
    beats: [
      {
        narration: "Doing both abstraction and decomposition makes it more likely that the task will be successful.",
        reveal: { nodes: ["n1", "j1", "n2", "n3", "n4", "n5"], edges: ["n1-j1", "j1-n2", "j1-n3", "n2-n4", "n3-n5"] },
        revealTriggers: [{ phrase: "successful", reveal: { nodes: ["n6"], edges: ["n4-j2", "n5-j2", "j2-n6"] }, focus: "n6" }],
        focus: "n5",
        images: [],
      },
    ],
  },
  {
    id: "step-5",
    title: "",
    beats: [
      {
        narration:
          "The same advice applies to writing software.\n\nImagine an inexperienced software engineer is asked to build an app that lets a user try on different hats virtually.\n\nThey should use abstraction — ignoring things that do not affect the app’s purpose, such as:\n\n• what the user is wearing\n •what is in the background\n• their gender\n\nand focusing only on what matters, such as:\n\n• is there a person in the camera view\n• where is their head",
        reveal: {
          nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6"],
          edges: ["n1-j1", "j1-n2", "j1-n3", "n2-n4", "n3-n5", "n4-j2", "n5-j2", "j2-n6"],
        },
        revealTriggers: [{ phrase: "successful", reveal: { nodes: ["n7"], edges: ["n1-n7"] }, focus: "n7" }],
        focus: "n6",
        images: [],
      },
      {
        narration:
          "You would also advise them to apply decomposition — breaking the task into smaller parts, such as:\n\nGet the live camera feed\n• Detect the person's head\n• Place the hat accurately onto the head\n• Reposition the hat as the person moves\n• Save the image",
        reveal: {
          nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6", "n7"],
          edges: ["n1-j1", "j1-n2", "j1-n3", "n2-n4", "n3-n5", "n4-j2", "n5-j2", "j2-n6", "n1-n7"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
        images: [],
      },
      {
        narration:
          "When solving a problem or creating software, it helps to focus on the important details and break the task into smaller parts so the solution is easier to manage and more likely to succeed. ",
        reveal: {
          nodes: ["n1", "j1", "n2", "n3", "n4", "n5", "j2", "n6", "n7"],
          edges: ["n1-j1", "j1-n2", "j1-n3", "n2-n4", "n3-n5", "n4-j2", "n5-jver2", "j2-n6", "n1-n7"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
        // focus: "",
        images: [],
      },
    ],
  },
];
