export const storySteps = [
  {
    id: "step-0",
    title: "What if Devices Could Not Communicate?",
    beats: [
      {
        narration:
          "In a previous lesson, we imagined life without computing devices at all. \n\nNow imagine something slightly different.\n\nImagine you still had your smartphone, laptop, tablet, games console, and smartwatch — but none of them could communicate with any other device.\n\nSo what would that actually mean for how you use them every day?",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "What Would Be Missing?",
    beats: [
      {
        narration:
          "Without networks, lots of everyday things would stop working.\n\nYou could not send messages.\n\nYou could not join video calls.\n\nAnd you could not upload or share things online.\n\nYou might still be able to take a photo or type some homework but you would not be able to send it anywhere.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Networks",
    beats: [
      {
        narration:
          "This shows us something very important: computing devices are useful on their own, but they become far more useful when they can communicate with each other.\n\nComputer networks make this communication possible.",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
        images: [],
      },
      {
        narration: "A computer network is a group of computing devices connected together.",
        reveal: { nodes: ["n1"], edges: [] },
        revealTriggers: [{ phrase: "group of computing devices", reveal: { nodes: ["n2"], edges: ["n1-n2"] } }],
        focus: ["n1"],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "What Networks Allow",
    beats: [
      {
        narration: "A network allows computing devices that are connected to communicate with each other.",
        reveal: {
          nodes: ["n1", "n2"],
          edges: ["n1-n2"],
        },
        revealTriggers: [{ phrase: "connected to communicate", reveal: { nodes: ["n3"], edges: ["n2-n3"] }, focus: "n3" }],
        focus: "n2",
        images: [],
      },
      {
        narration:
          "Because the devices can communicate, the users of those devices can:\n\n* share hardware (e.g. using the same printer)\n\n* access the internet through a shared connection (e.g. home or school Wi-Fi)\n\ncommunicate instantly (e.g. messaging, video calls)\n\nshare files (e.g. working on shared documents)\n\nuse cloud storage",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1"],
          edges: ["n1-n2", "n2-n3"],
        },
        revealTriggers: [
          { phrase: "school", reveal: { nodes: ["n4"], edges: ["n3-j1", "j1-n4"] }, focus: "n4" },
          { phrase: "video calls", reveal: { nodes: ["n5"], edges: ["j1-n5"] }, focus: "n5" },
          { phrase: "shared documents", reveal: { nodes: ["n6"], edges: ["j1-n6"] }, focus: "n6" },
          { phrase: "cloud storage", reveal: { nodes: ["n7"], edges: ["j1-n7"] }, focus: "n7" },
        ],

        focus: "n3",
        images: [],
      },
      {
        narration:
          "So, networks are what make modern computing truly connected. Without them, devices would still work, but they would feel isolated and far less useful.",
        reveal: {
          nodes: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7"],
          edges: ["n1-n2", "n2-n3", "n3-j1", "j1-n4", "j1-n5", "j1-n6", "j1-n7"],
        },
        focus: ["n1", "n2", "n3", "j1", "n4", "n5", "n6", "n7"],
        images: [],
      },
    ],
  },
];
