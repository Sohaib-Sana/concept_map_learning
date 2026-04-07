export const storySteps = [
  {
    id: "step-0",
    title: "The Other Side of Connectivity",
    beats: [
      {
        narration:
          "We have seen that computing devices become far more useful when they can communicate with each other.\n\nHowever, this increased usefulness comes with some downsides.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Uninvited Visitors",
    beats: [
      {
        narration:
          "Before networks, stealing information from a device usually meant physically getting hold of it.\n\nNow, someone could potentially reach your device without ever leaving their chair.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Information on the Move",
    beats: [
      {
        narration:
          "Every time you use an app or visit a website, information about you travels across the network.\n\nIt is worth asking where it goes, and who can see it.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n1-n3"] },
        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Trust and Sharing",
    beats: [
      {
        narration:
          "Networks make it easy for anyone to share anything with millions of people instantly.\n\nBut not everything shared is true, legal, or safe.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n1-n3", "n1-n4"] },
        focus: "n4",
        images: [],
      },
      {
        narration: "Spreading false information or copying someone else's work used to be slow and difficult — now it takes seconds.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n1-n3", "n1-n4"] },
        focus: "n4",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "When Networks Fail",
    beats: [
      {
        narration:
          "We now depend on connectivity for lessons, work, banking, and communication.\n\nWhen a network fails, the disruption can be surprisingly serious.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n1-n3", "n1-n4", "n1-n5"] },
        focus: "n5",
        images: [],
      },
      {
        narration:
          "None of this makes networks a bad thing — they are enormously useful.\n\nBut connecting devices together brings responsibilities and risks that did not exist before.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n5"], edges: ["n1-n2", "n1-n3", "n1-n4", "n1-n5"] },
        focus: ["n1", "n2", "n3", "n4", "n5"],
        images: [],
      },
    ],
  },
];
