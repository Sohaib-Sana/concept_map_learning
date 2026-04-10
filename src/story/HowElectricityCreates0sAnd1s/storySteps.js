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
    title: "Electical Circuits",
    beats: [
      {
        narration:
          "Inside a computer, there are huge numbers of tiny electrical circuits.\n\nA circuit is simply a path that electricity can flow through.",
        reveal: { nodes: ["n1"], edges: [] },
        revealTriggers: [{ phrase: "tiny electrical circuits", reveal: { nodes: ["n2"], edges: ["n1-n2"] }, focus: ["n1", "n2"] }],
        focus: ["n1"],
        images: [],
      },
    ],
  },
  {
    id: "step-2",
    title: "Circuits",
    beats: [
      {
        narration:
          "In a basic circuit, there are only two possibilities.\n\nEither the path is complete and electricity can flow, or the path is broken and electricity cannot flow.\n\n Or the path is complete and electricity can flow.\n\nA switch controls this path.\n\nWhen the switch is open, the path is broken and the bulb is off.\n\nWhen the switch is closed, the path is complete and the bulb lights up.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: [],
        images: [],
      },
      {
        narration:
          "This gives us two clear states: electricity not flowing and electricity flowing. \n\nA computer uses these two states to represent 0 and 1.\n\nJust to clarify. Inside a computer:\n\nElectricity not flowing represents 0.\n\nElectricity flowing represents 1.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        focus: [],
        images: [],
      },
    ],
  },
  {
    id: "step-3",
    title: "Switches",
    beats: [
      {
        narration:
          "Inside a computer, there are also tiny switches as part of these tiny circuits.\n\nThese switches control the flow of electricity.",
        reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
        revealTriggers: [
          {
            phrase: "tiny switches",
            reveal: { nodes: ["n3"], edges: ["n2-n3"] },
            focus: "n3",
          },
        ],
        focus: [],
        images: [],
      },
      {
        narration: "If a switch is open, electricity cannot flow, so the circuit represents 0.",
        reveal: { nodes: ["n1", "n2", "n3"], edges: ["n1-n2", "n2-n3"] },
        revealTriggers: [
          {
            phrase: "electricity cannot flow",
            reveal: { nodes: ["n4"], edges: ["n3-n4"] },
            focus: ["n4"],
          },
          {
            phrase: "circuit represents",
            reveal: { nodes: ["n6"], edges: ["n4-n6"] },
            focus: ["n6"],
          },
        ],

        focus: [],
        images: [],
      },
      {
        narration: "If a switch is closed, electricity can flow, so the circuit represents 1.",
        reveal: { nodes: ["n1", "n2", "n3", "n4", "n6"], edges: ["n1-n2", "n2-n3", "n3-n4", "n4-n6"] },
        revealTriggers: [
          {
            phrase: "electricity can flow",
            reveal: { nodes: ["n5"], edges: ["n3-n5"] },
            focus: ["n5"],
          },
          {
            phrase: "circuit represents",
            reveal: { nodes: ["n7"], edges: ["n5-n7"] },
            focus: ["n7"],
          },
        ],
        focus: [],
        images: [],
      },
    ],
  },
  {
    id: "step-4",
    title: "Summary",
    beats: [
      {
        narration: "This is how computers use tiny circuits and tiny switches to create 0s and 1s.",
        reveal: {
          nodes: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
          edges: ["n1-n2", "n2-n3", "n3-n4", "n3-n5", "n4-n6", "n5-n7"],
        },
        focus: ["n1", "n2", "n3", "n4", "n5", "n6", "n7"],
        images: [],
      },
    ],
  },
];
