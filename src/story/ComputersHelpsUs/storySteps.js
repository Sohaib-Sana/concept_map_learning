export const storySteps = [
  {
    id: "step-0",
    title: "Computers Help Us Have Fun, Connect and Work",
    beats: [
      {
        narration:
          "Hello!\n\nYou probably use one or more of these every single day.\n\nEven though these might look different, we group all of them under one term — computing devices.",
        reveal: {
          nodes: [],
          edges: [],
        },
        revealTriggers: [
          {
            phrase: "computing devices",
            reveal: {
              nodes: ["n1"],
              edges: [],
            },
            focus: "n1",
          },
        ],
        focus: "",
        images: ["/images/Computer/computing-devices.png"],
      },
    ],
  },

  {
    id: "step-1",
    title: "Computing Devices",
    beats: [
      {
        narration:
          "Imagine life without these devices.\n\nNo smartphone. No laptop.\n\nThat means no texting, no social media, no videos, no games, and no instant access to information.\n\nSchoolwork would be harder too. Researching topics, typing homework, joining online lessons, and revising with apps or websites would not be possible.\n\nThese devices are such a normal part of life that we often forget how much they help us.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        focus: "n1",
        images: ["/images/Computer/computing-devices.png"],
      },
    ],
  },

  {
    id: "step-2",
    title: "Apps",
    beats: [
      {
        narration:
          "But here’s something really important.\n\nOn their own, computing devices aren’t actually that useful.\n\nWhat makes them useful and fun are the application programs, or apps, that run on them.",
        reveal: {
          nodes: ["n1"],
          edges: [],
        },
        revealTriggers: [
          {
            phrase: "application programs",
            reveal: {
              nodes: ["n7"],
              edges: ["n1-n7"],
            },
            focus: "n7",
          },
        ],
        focus: ["n1"],
        images: [],
      },
      {
        narration:
          "Apps allow us to do specific tasks.\n\nFor example:\n- a messaging app lets you send messages,\n- A browser lets you visit websites…\n- A game app lets you play games…\n- And a word processor lets you create documents \n\nTogether, apps enable us to use our computing devices to have fun, get work done, and stay connected with others.",
        reveal: {
          nodes: ["n1", "n7"],
          edges: ["n1-n7"],
        },
        revealTriggers: [
          {
            phrase: "have fun",
            reveal: {
              nodes: ["j1", "n8", "n11"],
              edges: ["n7-j1", "j1-n8"],
            },
            focus: ["n8", "n11"],
          },
          {
            phrase: "get work done",
            reveal: {
              nodes: ["n10", "n13"],
              edges: ["j1-n10"],
            },
            focus: ["n10", "n13"],
          },
          {
            phrase: "stay connected with others",
            reveal: {
              nodes: ["n9", "n12"],
              edges: ["j1-n9"],
            },
            focus: ["n9", "n12"],
          },
        ],
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
        narration:
          "But there’s something else working behind the scenes… \n\nEvery computing device also has an Operating System, or OS. \n\nYou might have heard of some of these — like Windows, macOS, iOS, or Android.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        revealTriggers: [
          {
            phrase: "Operating System",
            reveal: {
              nodes: ["n14", "n15"],
              edges: [],
            },
            focus: ["n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          },
        ],
        focus: ["n8", "n9", "n10"],
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
          "The OS makes the device easy to use and helps manage everything on it.\n\nIt lets you do things such as unlocking your device, seeing notifications, connecting to Wi-Fi or Bluetooth, controlling brightness and volume, and opening or closing apps.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10"],
        },
        revealTriggers: [
          {
            phrase: "easy to use",
            reveal: {
              nodes: [],
              edges: ["n14-n1"],
            },
            focus: ["n1", "n14"],
          },
        ],
        focus: ["n14", "n15"],
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
          "So while the physical computing devices are the tools we use every day,\n\nit’s the apps that let us do specific tasks,\n\nand the operating system helps us use and manage those devices easily.",
        reveal: {
          nodes: ["n1", "n7", "j1", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          edges: ["n1-n7", "n7-j1", "j1-n8", "j1-n9", "j1-n10", "n14-n1"],
        },
        revealTriggers: [
          {
            phrase: "computing devices",
            reveal: {
              nodes: [],
              edges: [],
            },
            focus: ["n1"],
          },

          {
            phrase: "apps",
            reveal: {
              nodes: [],
              edges: [],
            },
            focus: ["n7"],
          },
          {
            phrase: "operating system",
            reveal: {
              nodes: [],
              edges: [],
            },
            focus: ["n14"],
          },
          {
            phrase: "use and",
            reveal: {
              nodes: [],
              edges: [],
            },
            focus: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
          },
        ],
        focus: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15"],
        images: [],
      },
    ],
  },
];
