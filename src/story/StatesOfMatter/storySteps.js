// src/story/storySteps.js

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
      // {
      //   narration: "What about air?\nYou can’t see it… but you can feel it when the wind blows, or when you breathe.\nAll of these count as things.",
      //   reveal: { nodes: ["n1"], edges: [] },
      //   focus: "n1",
      //   images: ["/images/things-air-wind.png"],
      // },
    ],
  },

  {
    id: "step-1",
    title: "Substances / Materials",
    beats: [
      {
        narration:
          "But here’s something interesting…\n All of these different things are made from something.\n\nDifferent things are made from different materials or substances.\n\nFor example:\nA water bottle is made of plastic.\nA window is made of glass.\nA metal spoon is made of steel.",
        reveal: { nodes: ["n1"], ghostNodes: ["n2"], edges: [] },
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
          nodes: ["n1", "n2"],
          ghostNodes: ["n3"],
          edges: ["n1-n2"],
        },
        focus: "n2",
        images: [],
      },
    ],
  },

  {
    id: "step-3",
    title: "Particles",
    beats: [
      {
        narration: "Now let’s zoom in — way in.",
        reveal: {
          nodes: ["n1", "n2", "n3"],
          edges: ["n1-n2", "n2-n3"],
        },
        focus: "n4",
        images: ["/images/zoom-in-magnify.png"],
      },
      {
        narration:
          "All matter is made of tiny particles.\nThese particles are incredibly small — much too small to see, even with powerful microscopes.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n3-n4"],
        },
        focus: "n4",
        images: ["/images/particles-tiny-dots.png"],
      },

      // Atoms/Molecules branch (junction j2)
      {
        narration:
          "These particles can be atoms or molecules.\nYou don’t need to know the difference just yet.\nFor now, it’s enough to know that matter is made of particles.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8"],
        },
        focus: ["n7", "n8"],
        images: ["/images/atoms-vs-molecules-simple.png"],
      },

      // Attraction/Movement branch (junction j1)
      {
        narration: "There are two really important things about these particles.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1"],
        },
        focus: "n4",
        images: ["/images/particles-two-rules.png"],
      },
      {
        narration: "First — particles are attracted to each other.\nThat means they pull towards one another.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5"],
        },
        focus: "n5",
        images: ["/images/particle-attraction-arrows.png"],
      },
      {
        narration: "Second — particles are always moving.\nEven in a solid, where things look completely still,\nthe particles are still moving.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6"],
        },
        focus: "n6",
        images: ["/images/particle-motion-wiggle.png"],
      },

      // Balance -> State of Matter (junction j3 + state)
      {
        narration: "So particles are always being pulled together…\nand always trying to move.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6"],
        },
        focus: ["n5", "n6"],
        images: ["/images/attraction-vs-motion-tug-of-war.png"],
      },
      {
        narration:
          "What really matters is the balance between these two.\nIs attraction stronger?\nIs movement stronger?\nOr are they about the same?",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "j3-n9"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6", "n5-j3", "n6-j3"],
        },
        focus: "j3",
        images: ["/images/balance-scale-attraction-motion.png"],
      },
      {
        narration: "This balance is what determines the state of matter.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6", "n5-j3", "n6-j3", "j3-n9"],
        },
        focus: "n9",
        images: ["/images/state-of-matter-bridge.png"],
      },

      // Solid / Liquid / Gas reveals one-by-one
      {
        narration: "That’s why matter can exist as a solid, a liquid, or a gas.\nLet’s connect each one to that balance.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6", "n5-j3", "n6-j3", "j3-n9"],
        },
        focus: "n9",
        images: ["/images/three-states-overview.png"],
      },
      {
        narration:
          "In a solid, attraction is much stronger than movement.\nParticles are packed closely together.\nThey vibrate — but they don’t move from place to place.\nThat’s why solids have a fixed shape and don’t flow.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6", "n5-j3", "n6-j3", "j3-n9", "n9-n10"],
        },
        focus: "n10",
        images: ["/images/solid-particles-packed.png"],
      },
      {
        narration:
          "In a liquid, attraction and movement are about equal.\nParticles are still close together, but arranged irregularly.\nThey can slide past each other.\nThat’s why liquids don’t have a fixed shape — but they can flow.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n4-j2", "j2-n7", "j2-n8", "n4-j1", "j1-n5", "j1-n6", "n5-j3", "n6-j3", "j3-n9", "n9-n10", "n9-n11"],
        },
        focus: "n11",
        images: ["/images/liquid-particles-slide.png"],
      },
      {
        narration:
          "In a gas, movement is much greater than attraction.\nParticles are far apart and move freely in all directions.\nThat’s why gases spread out and fill the space they’re in.",
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
          ],
        },
        focus: "n12",
        images: ["/images/gas-particles-spread.png"],
      },
      {
        narration: "So what controls how much particles move?",
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
          ],
          focus: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
        },
      },
    ],
  },

  {
    id: "step-4",
    title: "Temperature's impact",
    beats: [
      {
        narration: "One key factor is temperature.\nTemperature is really a measure of how much energy particles have.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
          ],
        },
        focus: "n13",
      },
      {
        narration:
          "When temperature increases, particles gain energy and move faster. \n When temperature decreases,particles lose energy and move more slowly. \n Small temperature changes don’t change the state - they just change how much particles move. \nThis causes expansion when something is heated and contraction when it’s cooled — in solids, liquids, and gases.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
          ],
        },
        focus: ["n6", "n13"],
      },
      {
        narration: "But larger temperature changes can change the balance.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
          ],
        },
        focus: ["n9", "n13"],
      },
      {
        narration:
          "As temperature increases, movement increases.\nEventually, movement becomes strong enough to overcome attraction.\nWhen that happens, a solid melts into a liquid.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
            "n10-n11",
          ],
        },
        focus: ["n9", "n10", "n11"],
      },
      {
        narration: "The temperature where this happens is called the melting point.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
            "n10-n11-custom",
          ],
        },
        focus: ["n9", "n10", "n11"],
      },
      {
        narration: "If temperature keeps increasing, movement becomes much greater than attraction.\n The substance becomes a gas.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
            "n10-n11-custom",
            "n11-n12",
          ],
        },
        focus: ["n9", "n11", "n12"],
      },
      {
        narration: "If temperature decreases, movement reduces and attraction becomes stronger again.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
            "n10-n11-custom",
            "n11-n12",
            "n12-n11",
          ],
        },
        focus: ["n9", "n11", "n12"],
      },
      {
        narration: "And the changes of state can happen in reverse.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
            "n10-n11-custom",
            "n11-n12",
            "n12-n11",
            "n11-n10",
          ],
        },
        focus: ["n9", "n10", "n11", "n12"],
      },
    ],
  },
  {
    id: "step-4",
    title: "Concept Recap",
    beats: [
      {
        narration:
          "So instead of memorising facts about solids, liquids, and gases… …you can always come back to the same core idea. \n Particles. \n Attraction. \n Movement. \n And temperature.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
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
            "n13-n6",
            "n13-n9",
            "n10-n11-custom",
            "n11-n12",
            "n12-n11",
            "n11-n10",
          ],
        },
        focus: ["n1", "n2", "n3", "n4", "j2", "n7", "n8", "j1", "n5", "n6", "j3", "n9", "n10", "n11", "n12", "n13"],
      },
    ],
  },
];
