// src/story/storySteps.js

export const storySteps = [
  {
    id: "step-0",
    title: "Things",
    narration: "We’ll start with a simple idea: everything around us is made of something.",
    reveal: {
      nodes: ["n1"],
      edges: [],
    },
    focus: "n1",
    images: [],
  },
  {
    id: "step-1",
    title: "Substances / Materials",
    narration: "Things are made of various substances or materials. For example: metal, plastic, wood, glass, paper, cloth.",
    reveal: {
      nodes: ["n1", "n2"],
      edges: ["n1-n2"],
    },
    focus: "n2",
    images: [],
  },
  {
    id: "step-2",
    title: "Matter",
    narration: "Scientists use one word for all substances and materials: matter.",
    reveal: {
      nodes: ["n1", "n2", "n3"],
      edges: ["n1-n2", "n2-n3"],
    },
    focus: "n3",
    images: [],
  },
  {
    id: "step-3",
    title: "Particles",
    narration: "Matter is made of tiny particles. These particles are too small to see, but they are always there.",
    reveal: {
      nodes: ["n1", "n2", "n3", "n4"],
      edges: ["n1-n2", "n2-n3", "n3-n4"],
    },
    focus: "n4",
    images: [],
  },
];
