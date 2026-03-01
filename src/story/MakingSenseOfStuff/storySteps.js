export const storySteps = [
  {
    id: "step-0",
    title: "Things",
    beats: [
      {
        narration:
          "Look around you. There are things everywhere.\n\nYour phone.\nYour desk.\nYour clothes.\nThe air around you.\n\nOur world is full of different things — big things, small things, and even things we cannot see.",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
        images: ["/images/things-everyday-objects.png"],
      },
    ],
  },

  {
    id: "step-1",
    title: "Substances / Materials",
    beats: [
      {
        narration:
          "But here’s something interesting.\nAll of these different things are made from something.\n\nDifferent things are made from different materials or substances.\n\nFor example:\n A water bottle is made of plastic.\n A window is made of glass.\n A metal spoon is made of steel.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: ["/images/materials-question-mark.png"],
      },
    ],
  },

  {
    id: "step-2",
    title: "Matter",
    beats: [
      {
        narration:
          "Scientists use one word for all these different materials and substances.\n\nThey call them matter.\n\nSo, all the different materials or substances\nthat things are made from\nare called matter.",
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
    title: "Atom",
    beats: [
      {
        narration:
          "Now let’s zoom in.\n\nIf we keep breaking matter into smaller and smaller pieces,\n we eventually reach tiny building blocks.\n\nThese tiny building blocks are called atoms.\n\nAtoms are the basic building blocks\n that all matter is made from.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n3-n4"],
        },
        focus: "n4",
        images: ["/images/zoom-in-magnify.png"],
      },
    ],
  },
  {
    id: "step-4",
    title: "Elements",
    beats: [
      {
        narration:
          "But not all atoms are the same.\n There are different types of atoms.\n\nEach different type of atom is called an element.\n\nFor example:\n Gold is an element.\n Oxygen is an element.\n Carbon is an element.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5"],
        },
        focus: "n5",
      },
    ],
  },
  {
    id: "step-5",
    title: "Compounds",
    beats: [
      {
        narration:
          "When different elements join together,\nthey form something new.\n\nThese are called compounds.\n\nFor example:\n Water forms when hydrogen and oxygen join together.\n Carbon dioxide forms from carbon and oxygen.\n\nBut here’s the key idea…\n\nA compound can behave very differently\nfrom the elements that made it.\n\nHydrogen can burn.\n Oxygen helps things burn.\n But when they join together, they form water —\n which puts fires out.\n\nSo when elements join together,\n they create something completely new\n with different properties.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5", "n5-n6"],
        },
        focus: "n6",
      },
    ],
  },
  {
    id: "step-6",
    title: "Concept Recap",
    beats: [
      {
        narration:
          "So remember:\n\nDifferent things are made from different materials or substances.\n Scientists call all of these matter.\n Matter is made of atoms.\n Each type of atom is an element.\n And elements can join together to form compounds —\n which often behave very differently from the elements that made them.\n\nThat’s how the world around us is built.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n5", "n5-n6"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5", "n6"],
      },
    ],
  },
];
