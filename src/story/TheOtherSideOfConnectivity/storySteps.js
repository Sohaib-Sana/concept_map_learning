export const storySteps = [
  {
    id: "step-0",
    title: "The Other Side of Connectivity",
    beats: [
      {
        narration:
          "We have seen that computing devices are useful on their own, but they become far more useful when they can communicate with each other.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [
          {
            phrase: "each other",
            reveal: {
              nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7"],
              edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7"],
            },
            focus: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7"],
          },
        ],
        focus: "",
        images: [],
      },
      {
        narration: "However, this increased usefulness also comes with some downsides. \n\nLet’s look at them one by one.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7"],
        },
        revealTriggers: [{ phrase: "downsides", reveal: { nodes: ["n8"], edges: ["n2-n8"] }, focus: "n8" }],
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
          "Before networks, stealing information from a device, misusing it or damaging it usually meant physically getting hold of it.\n\nNow, someone may be able to reach your device remotely.\n\nIf they gain access, they could:\n\n- Steal or delete important or private information.\n- Misuse your device, for example by using it to spread viruses or other malware.\n- Make your device unusable by damaging files or interfering with how it works.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7", "n8"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7", "n2-n8"],
        },
        revealTriggers: [
          { phrase: "private information", reveal: { nodes: ["n9"], edges: [] }, focus: "n9" },
          { phrase: "malware", reveal: { nodes: ["n10"], edges: [] }, focus: "n10" },
          { phrase: "works", reveal: { nodes: ["n11"], edges: [] }, focus: "n11" },
        ],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Your information on the move",
    beats: [
      {
        narration:
          "Every time you use an app or visit a website, information about you travels across the network.\n\nThis means someone could try to intercept it, and there are also questions about how websites keep and use your information.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7", "n2-n8"],
        },
        revealTriggers: [{ phrase: "your information", reveal: { nodes: ["n12"], edges: [] }, focus: "n12" }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Harmful software spreading",
    beats: [
      {
        narration:
          "When devices are connected in a network, harmful software such as viruses can spread from one device to another.\n\nThis means a problem on one device can quickly affect others.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7", "n2-n8"],
        },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Trust and what gets shared",
    beats: [
      {
        narration:
          "Networks make it easy for anyone to share anything with millions of people instantly. \n\nBut not everything shared is true, legal, or safe. Spreading false information or copying someone's work used to be slow and difficult — now it takes seconds.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7", "n2-n8"],
        },
        revealTriggers: [{ phrase: "now it takes seconds", reveal: { nodes: ["n13"], edges: [] }, focus: "n13" }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-5",
    title: "When the network goes down",
    beats: [
      {
        narration:
          "We now depend on connectivity for lessons, work, banking, and communication. When a network fails, the disruption can be surprisingly serious.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7", "n2-n8"],
        },
        revealTriggers: [{ phrase: "surprisingly serious", reveal: { nodes: ["n14"], edges: [] }, focus: "n14" }],
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-6",
    title: "Concolusion",
    beats: [
      {
        narration:
          "None of this makes networks a bad thing — they are enormously useful. But connecting devices together brings risks that did not exist before. ",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7", "n2-n8"],
        },
        focus: "",
        images: [],
      },
    ],
  },
];
