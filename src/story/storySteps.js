// src/story/storySteps.js

export const storySteps = [
  {
    id: "step-0",
    title: "Things",
    beats: [
      {
        narration: "Let’s start with things. \nJust look around you for a moment.\nA chair. A table. Your phone. Your bag.",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
      },
    ],
  },

  {
    id: "step-1",
    title: "Substances / Materials",
    beats: [
      {
        narration:
          "“They’re made of different substances or materials. \nFor example, a chair might be made of wood or metal. \n Clothes are made of fabric. \n Paper is made from wood. \n And air — even though it’s invisible — is still a material.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
      },
      // {
      //   narration: "For example: metal, plastic, wood, glass, paper, and cloth.",
      //   reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
      //   focus: "n2",
      // },
    ],
  },

  {
    id: "step-2",
    title: "Matter",
    beats: [
      {
        narration: "That word is matter. Matter is the term that covers all substances and materials.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        focus: "n3",
      },
    ],
  },

  {
    id: "step-3",
    title: "Particles",
    beats: [
      {
        narration: "All matter is made of tiny particles. Much too small to see, even with a microscope.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n3-n4"],
        },
        focus: "n4",
      },

      // ---- EITHER: Atoms / Molecules (uses junction j2) ----
      {
        narration: "Those particles can be atoms… or they can be molecules.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2"],
        },
        focus: "n4",
      },
      {
        narration: "Here are atoms and molecules — two ways we describe what particles are.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8"],
        },
        focus: ["n7", "n8"],
      },

      // ---- HAVE BOTH: Attraction / Movement (uses junction j1) ----
      {
        narration: "And all particles have two things going on at the same time.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1"],
        },
        focus: "n4",
      },
      {
        narration: "They attract each other… and they also move.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6"],
        },
        focus: ["n5", "n6"],
      },

      // ---- Balance -> State of Matter (uses junction j3) ----
      {
        narration: "The balance between attraction and movement decides the state of matter.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9"],
          edges: [
            "n1-n2",
            "n2-n3",
            "n3-n4",
            "n4-j2",
            "j2-n7",
            "j2-n8",
            "n4-j1",
            "j1-n5",
            "j1-n6",
            "n5-j3",
            "n6-j3",
            "j3-n9", // NOTE: your edge id is "j3-n7" but target is n9 in nodeBank; keep the same id!
          ],
        },
        focus: "n9",
      },

      // ---- Solid / Liquid / Gas ----
      {
        narration: "If attraction is stronger than movement, you get a solid.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6", "n5-j3", "n6-j3", "j3-n9", "n9-n10"],
        },
        focus: "n10",
      },
      {
        narration: "If attraction and movement are balanced, you get a liquid.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11"],
          edges: [
            "n1-n2",
            "n2-n3",
            "n3-n4",
            "n4-j2",
            "j2-n7",
            "j2-n8",
            "n4-j1",
            "j1-n5",
            "j1-n6",
            "n5-j3",
            "n6-j3",
            "j3-n9",
            "n9-n10",
            "n9-n11",
            "n10-n11",
            "n11-n10",
          ],
        },
        focus: "n11",
      },
      {
        narration: "If movement is stronger than attraction, you get a gas.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12"],
          edges: [
            "n1-n2",
            "n2-n3",
            "n3-n4",
            "n4-j2",
            "j2-n7",
            "j2-n8",
            "n4-j1",
            "j1-n5",
            "j1-n6",
            "n5-j3",
            "n6-j3",
            "j3-n9",
            "n9-n10",
            "n9-n11",
            "n9-n12",
            "n10-n11",
            "n11-n12",
            "n11-n10",
            "n12-n11",
          ],
        },
        focus: "n12",
      },
    ],
  },
];
