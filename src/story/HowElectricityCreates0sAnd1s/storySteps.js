export const storySteps = [
  {
    id: "step-0",
    title: "How Electricity Creates 0s and 1s",
    beats: [
      {
        narration:
          "Hi! In the last lesson, we saw that computers use 0 and 1 because they work using electricity.\n\nIn this lesson, we’re going to take that idea further and see exactly how electricity creates those 0s and 1s.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Circuits",
    beats: [
      {
        narration:
          "Inside a computer, there are huge numbers of tiny electrical circuits.\n\nA circuit is simply a path that electricity can flow through.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: ["n1", "n2"],
        images: [],
      },
      {
        narration:
          "In a basic circuit, there are only two possibilities.\n\nEither the path is complete and electricity can flow, or the path is broken and electricity cannot flow.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n2-n4"] },
        focus: ["n3", "n4"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "0 and 1",
    beats: [
      {
        narration: "A computer uses these two states to represent 1 and 0.\n\nElectricity flowing represents 1.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n3-n5"],
        },
        focus: ["n3", "n5"],
        images: [],
      },
      {
        narration: "Electricity not flowing represents 0.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n3-n5", "n4-n6"],
        },
        focus: ["n4", "n6"],
        images: [],
      },
      {
        narration:
          "We can control whether electricity flows by using switches.\n\nThis is similar to how we use a switch at home to turn a light on or off.\n\nComputers use the same basic idea, but with tiny switches inside their circuits.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n3-n5", "n4-n6"],
        },
        focus: ["n2", "n3", "n4"],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "From Things to Numbers",
    beats: [
      {
        narration:
          "At first, computers were mainly used for working with numbers.\n\nBut over time, people realised something very important:\n\nA computer does not need to understand things in the same way humans do. It just needs a way to represent them using numbers.",
        reveal: { nodes: ["n7", "n12"], edges: [] },
        focus: ["n7", "n12"],
        images: [],
      },
      {
        narration: "Anything we can read or write, see, or hear can be turned into numbers.",
        reveal: {
          nodes: ["n7", "n8", "n9", "n10", "n11", "n12"],
          edges: ["n8-n12", "n9-n12", "n10-n12", "n11-n12"],
        },
        focus: ["n8", "n9", "n10", "n11", "n12"],
        images: [],
      },
      {
        narration:
          "Text can be turned into numbers by giving each letter, number, or symbol its own code.\n\nImages can be turned into numbers by breaking them into tiny parts and storing the colour of each part as numbers.\n\nSound can be turned into numbers by measuring the sound wave and storing those measurements.\n\nVideo can be turned into numbers too, because a video is really a series of images shown one after another, often with sound as well.",
        reveal: {
          nodes: ["n7", "n8", "n9", "n10", "n11", "n12"],
          edges: ["n8-n12", "n9-n12", "n10-n12", "n11-n12"],
        },
        focus: ["n12"],
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Binary Data",
    beats: [
      {
        narration: "Because computers use binary, all of these numbers can then be represented using 0s and 1s.",
        reveal: {
          nodes: ["n7", "n8", "n9", "n10", "n11", "n12", "n13"],
          edges: ["n8-n12", "n9-n12", "n10-n12", "n11-n12", "n12-n13", "n7-n13"],
        },
        focus: ["n12", "n13"],
        images: [],
      },
      {
        narration:
          "So here we meet an important new concept: data.\n\nNumbers, text, images, audio, and video are all forms of data, and computers store that data as binary.",
        reveal: {
          nodes: ["n7", "n8", "n9", "n10", "n11", "n12", "n13"],
          edges: ["n8-n12", "n9-n12", "n10-n12", "n11-n12", "n12-n13", "n7-n13"],
        },
        focus: ["n7", "n13"],
        images: [],
      },
    ],
  },
];
