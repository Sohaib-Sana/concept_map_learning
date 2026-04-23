export const storySteps = [
  {
    id: "step-0",
    title: "From Numbers to Words, Pictrues and Sound",
    beats: [
      {
        narration:
          "At first, computers were mainly used for working with numbers. That made sense, because they were originally built to do calculations.\n\nBut then people realised something exciting: numbers could be used to represent much more than just amounts.\n\nThat meant computers could go beyond maths and start working with words, pictures and sound too.\n\nI’ll explain …",
        reveal: { nodes: [], edges: [] },

        focus: "",
        images: [],
      },
      {
        narration:
          "Anything we can read or write, see, or hear can be turned into numbers.\n\nText can be turned into numbers by giving each letter, number, or symbol its own code.\n\nFor example, the letter A can be represented by the number 65.",
        reveal: { nodes: [], edges: [] },
        revealTriggers: [{ phrase: "own code", reveal: { nodes: ["n1", "j1", "n5"], edges: ["n1-j1", "j1-n5"] }, focus: ["n1", "n5"] }],
        focus: "",
        images: [],
      },
      {
        narration: "Images can be turned into numbers by breaking them up into tiny parts and storing the colour of each part as numbers.",
        reveal: { nodes: ["n1", "j1", "n5"], edges: ["n1-j1", "j1-n5"] },
        revealTriggers: [{ phrase: "as numbers", reveal: { nodes: ["n2"], edges: ["n2-j1"] }, focus: ["n2", "n5"] }],
        focus: ["n1", "j1", "n5"],
        images: ["/images/Computer/sounds-numbers.png"],
      },
      {
        narration: "Sound can be turned into numbers by measuring the sound wave and storing those measurements.",
        reveal: { nodes: ["n1", "n2", "j1", "n5"], edges: ["n1-j1", "j1-n5", "n2-j1"] },
        revealTriggers: [{ phrase: "measurements", reveal: { nodes: ["n3"], edges: ["n3-j1"] }, focus: ["n3", "n5"] }],
        focus: ["n2", "j1", "n5"],
        images: ["/images/Computer/sound-measurement.png"],
      },
      {
        narration:
          "Video can be turned into numbers too, because a video is really a series of images shown one after another, often with sound as well.",
        reveal: { nodes: ["n1", "n2", "n3", "j1", "n5"], edges: ["n1-j1", "j1-n5", "n2-j1", "n3-j1"] },
        revealTriggers: [{ phrase: "as well", reveal: { nodes: ["n4"], edges: ["n4-j1"] }, focus: ["n4", "n5"] }],
        focus: ["n3", "j1", "n5"],
        images: [],
      },
      {
        narration: "Because computers use binary, all of these numbers can then be represented using 0s and 1s.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "j1", "n5"], edges: ["n1-j1", "j1-n5", "n2-j1", "n3-j1", "n4-j1"] },
        revealTriggers: [{ phrase: "1s", reveal: { nodes: ["n6"], edges: ["n5-n6"] }, focus: ["n5", "n6"] }],
        focus: ["n4", "j1", "n5"],
        images: [],
      },
      {
        narration: "Numbers, text, images, audio, and video are all forms of data (information), and computers store that data as binary.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "j1", "n5", "n6"], edges: ["n1-j1", "j1-n5", "n2-j1", "n3-j1", "n4-j1", "n5-n6"] },
        focus: ["n6"],
        images: [],
      },
    ],
  },
];
