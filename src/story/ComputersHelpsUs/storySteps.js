export const storySteps = [
  {
    id: "step-0",
    title: "Everyday Devices",
    beats: [
      {
        narration: "Hello!\n\nYou probably use one or more of these every single day.",
        reveal: {
          nodes: [],
          edges: [],
        },
        focus: "",
        images: ["/images/computersHelpUs/computing-devices.png"],
      },
    ],
  },

  {
    id: "step-1",
    title: "Computing Devices",
    beats: [
      {
        narration: "Even though these might look different, we group all of them under one term — computing devices.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: [],
      },
      {
        narration:
          "Now imagine for a moment… life without any of these.\n\nNo smartphone. No laptop.\n\nThat would mean…\nno texting your friends,\nno social media…\nno watching videos, no games…\nand no instant access to information.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: [],
      },
      {
        narration:
          "Even schoolwork would become much harder.\n\nYou wouldn’t be able to easily:\nresearch topics,\ntype up homework,\njoin online lessons…\nor revise using apps and websites.\n\nThese devices have become such a normal part of life that it’s easy to forget just how much they help us.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: [],
      },
    ],
  },

  {
    id: "step-2",
    title: "Apps",
    beats: [
      {
        narration:
          "But here’s something really important.\n\nOn their own, these devices aren’t actually that useful.\n\nWhat makes them useful and fun are the application programs, or apps, that run on them.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: ["n1"],
        images: [],
      },
      {
        narration:
          "Apps allow us to do specific tasks.\n\nFor example:\na messaging app lets you send messages,\na browser lets you visit websites,\na game app lets you play games,\nand a word processor lets you create documents.",
        reveal: {
          nodes: ["n1", "n7"],
          edges: ["n1-n7"],
        },
        focus: "n7",
        images: [],
      },
    ],
  },

  {
    id: "step-3",
    title: "What Apps Let Us Do",
    beats: [
      {
        narration: "Apps help us in different ways.\n\nThey can help us have fun, connect with others, and do useful work.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        focus: ["n8", "n9", "n10"],
        images: [],
      },
      {
        narration: "For fun, apps let us stream videos and listen to music.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        focus: ["n8", "n11"],
        images: [],
      },
      {
        narration: "To connect, apps let us chat, text, and post on social media.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        focus: ["n9", "n12"],
        images: [],
      },
      {
        narration: "And for work, apps let us join online classes and research information for homework.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        focus: ["n10", "n13"],
        images: [],
      },
    ],
  },

  {
    id: "step-4",
    title: "Operating Systems",
    beats: [
      {
        narration:
          "But there’s something else working behind the scenes.\n\nEvery computing device also has an operating system, or OS.\n\nYou might have heard of some of these — like Windows, MacOS, iOS, or Android.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        focus: ["n14", "n15"],
        images: [],
      },
      {
        narration: "The operating system is what makes the device easy to use.\n\nIt helps you manage everything on it.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10", "n14-n1"],
        },
        focus: ["n14", "n1"],
        images: [],
      },
      {
        narration:
          "It allows you to do things like:\nunlock your device using your face or fingerprint,\nsee notifications,\nconnect to Wi-Fi or Bluetooth,\nand control brightness and volume.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10", "n14-n1"],
        },
        focus: ["n14", "n1"],
        images: [],
      },
      {
        narration: "It also lets you open and close apps, switch between them, and save files.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10", "n14-n1"],
        },
        focus: ["n14", "n1"],
        images: [],
      },
    ],
  },

  {
    id: "step-5",
    title: "Concept Recap",
    beats: [
      {
        narration:
          "So while the physical computing devices are the tools we use every day,\nit’s the apps that let us do specific tasks,\nand the operating system helps us use and manage those devices easily.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10", "n14-n1"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
        images: [],
      },
    ],
  },
];
