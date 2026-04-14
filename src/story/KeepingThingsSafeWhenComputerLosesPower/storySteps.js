export const storySteps = [
  {
    id: "step-0",
    title: "Keeping Things Safe When your Computer Loses Power",
    beats: [
      {
        narration:
          "So far, we have seen that a computer needs software to tell it what to do. \n\nThis includes the operating system and apps. \n\nBut this creates an important question:\n\nWhere are the operating system and apps kept when the computer is switched off?",
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
        narration: "Well, they need to be stored in permanent storage.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [{ phrase: "permanent storage", reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] } }],
        focus: "",
        images: [],
      },
      {
        narration:
          "When you turn your laptop or phone back on, the operating system still needs to be there so the device can start up properly. \n\nYour apps also need to still be there, ready to open and use.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        revealTriggers: [{ phrase: "open and use", reveal: { nodes: ["n3"], edges: ["n2-n3"] }, focus: "n3" }],
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "User Files",
    beats: [
      {
        narration:
          "Of course it is not just software that needs to be stored. \n\nWe also want the computer to keep our own data, such as:\n\n* documents & photos\n* videos & music\n* messages\n* saved game data\n\n\n\nWithout permanent storage, everything would disappear every time the device was turned off.",
        revealTriggers: [
          {
            phrase: "saved game data",
            reveal: { nodes: ["n4"], edges: ["n2-n4"] },
            focus: "n4",
          },
        ],
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        focus: "n3",
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
          "Permanent storage is needed in computing devices to keep the operating system, the apps, and the user’s files and data safe for later use.\n\nThat is why computing devices have storage such as a hard drive or SSD.",
        revealTriggers: [
          {
            phrase: "hard drive or SSD",
            reveal: { nodes: ["j1", "n5", "n6"], edges: ["n2-j1", "j1-n5", "j1-n6"] },
            focus: ["n5", "n6"],
          },
        ],
        reveal: {
          nodes: ["n1", "n2", "n3", "n4"],
          edges: ["n1-n2", "n2-n3", "n2-n4"],
        },
        focus: "n2",
        images: [],
      },
    ],
  },
];
