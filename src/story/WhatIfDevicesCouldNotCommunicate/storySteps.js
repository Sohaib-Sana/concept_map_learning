export const storySteps = [
  {
    id: "step-0",
    title: "What if Devices Could Not Communicate?",
    beats: [
      {
        narration:
          "Imagine you still had your smartphone, laptop, tablet, games console, and smartwatch — but none of them could communicate with any other device.",
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
          "That would mean no messaging friends or social media, no online gaming, no video calls, no streaming, no wireless printing, no email, and no online lessons.",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
        images: [],
      },
      {
        narration:
          "Even simple things we take for granted would stop working properly.\n\nYou might still take a photo, but you could not send it to anyone.\n\nYou might still write homework on a laptop, but you could not upload it, email it, or collaborate online.",
        reveal: { nodes: ["n1"], edges: [] },
        focus: "n1",
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
          "This shows us something very important: computing devices are useful on their own, but they become far more useful when they can communicate with each other.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: ["n1", "n2"],
        images: [],
      },
      {
        narration: "A computer network is a group of computing devices connected together so that they can communicate and share resources.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: "n2",
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "What Networks Allow",
    beats: [
      {
        narration:
          "A network allows devices to send and receive data, share files, access the internet, use shared hardware such as printers, and communicate with people in different places.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n2-n5"],
        },
        focus: ["n3", "n4", "n5"],
        images: [],
      },
      {
        narration:
          "So, networks are what make modern computing truly connected.\n\nWithout them, devices would still work, but they would feel isolated and far less useful.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5"],
          edges: ["n1-n2", "n2-n3", "n2-n4", "n2-n5"],
        },
        focus: "n2",
        images: [],
      },
    ],
  },
];
