export const storySteps = [
  {
    id: "step-0",
    title: "Keeping Things Safe When your Computer Loses Power",
    beats: [
      {
        narration: "So far, we have seen that a computer needs software to tell it what to do.\n\nThis includes the operating system and apps.",
        reveal: { nodes: [], edges: [] },
        focus: "",
        images: [],
      },
    ],
  },
  {
    id: "step-1",
    title: "Permanent Storage",
    beats: [
      {
        narration:
          "But this creates an important question:\n\nWhere are all of these instructions kept when the computer is switched off?\n\nThey need to be stored in permanent storage.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
      {
        narration:
          "When you turn your laptop or phone back on, the operating system still needs to be there so the device can start up properly.\n\nYour apps also need to still be there, ready to open and use.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        focus: "n3",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "User Files",
    beats: [
      {
        narration: "Of course it is not just software that needs to be stored.\n\nWe also want the computer to keep our own data safe for later use.",
        reveal: { nodes: ["n1", "n2", "n3", "n4"], edges: ["n1-n2", "n2-n3", "n2-n4"] },
        focus: "n4",
        images: [],
      },
      {
        narration:
          "This includes things like documents, music, photos, and videos.\n\nWithout permanent storage, everything would disappear every time the device was turned off.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n4-n5", "n4-n6", "n4-n7"],
        },
        focus: ["n4", "n5", "n6", "n7"],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Hard Drive or SSD",
    beats: [
      {
        narration:
          "Permanent storage is needed in computing devices to keep the operating system, the apps, and the user’s files and data safe for later use.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n4-n5", "n4-n6", "n4-n7"],
        },
        focus: "n2",
        images: [],
      },
      {
        narration: "That is why computing devices have storage such as a hard drive or SSD.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n4-n5", "n4-n6", "n4-n7", "n2-n8", "n2-n9"],
        },
        focus: ["n8", "n9"],
        images: [],
      },
    ],
  },
];
