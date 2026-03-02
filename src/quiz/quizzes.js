// src/quiz/quizzes.js

export const QUIZZES = {
  makingSenseOfStuffQuiz: {
    id: "makingSenseOfStuff-quiz",
    title: "QUIZ",
    questions: [
      {
        prompt: "Which sentence best matches what the word “matter” means?",
        options: [
          "Anything that is alive",
          "Any material or substance that things are made from",
          "Only solids, not gases",
          "Only objects you can hold",
        ],
        correctIndex: 1,
        feedback: {
          correct: "✅ Correct — “matter” is the science word for all the different materials or substances that things are made from.",
          incorrect: "❌ Not quite. The correct answer is B. Matter means all materials or substances that things around us are made of.",
        },
      },
      {
        prompt: "A window and a plastic bottle are different “things”. What is the best way to describe what they’re made from?",
        options: [
          "They are made from different materials/substances",
          "They are made from the same material, just shaped differently",
          "Only the window is made from matter",
          "Only the bottle counts as matter because it’s man-made",
        ],
        correctIndex: 0,
        feedback: {
          correct: "✅ Yes — glass and plastic are different materials, so the answer is A.",
          incorrect: "❌ That’s not correct. The correct answer is A. Both are made from matter, and they are made from different materials.",
        },
      },
      {
        prompt: "Which statement about atoms is correct?",
        options: [
          "Atoms are tiny building blocks that matter is made from",
          "Atoms are the same as compounds",
          "Atoms are only found in metals",
          "Atoms are too big to be part of matter",
        ],
        correctIndex: 0,
        feedback: {
          correct: "✅ Correct — atoms are the tiny building blocks that make up all matter.",
          incorrect: "❌ That’s not right. The correct answer is A. Atoms are building blocks of matter.",
        },
      },

      {
        prompt: "What is an element?",
        options: [
          "A mixture of materials",
          "A substance made from only one type of atom",
          "A substance made from lots of different atoms",
          "A word that means “thing”",
        ],
        correctIndex: 1,
        feedback: {
          correct: "✅ Correct — an element is made from only one type of atom.",
          incorrect: "❌ Not quite. The correct answer is B. If different types of atoms are joined together, that forms a compound, not an element.",
        },
      },
      {
        prompt: "Which pair are most likely to be elements?",
        options: ["Oxygen and carbon", "Water and oxygen", "Carbon dioxide and water", "Plastic and glass"],
        correctIndex: 0,
        feedback: {
          correct: "✅ Well done — oxygen and carbon are both elements.",
          incorrect:
            "❌ That’s not correct. The correct answer is A. Water and carbon dioxide are compounds, and plastic and glass are materials made from atoms, not single elements.",
        },
      },
      {
        prompt: "What is a compound?",
        options: [
          "A substance made when different elements join together",
          "A substance made from only one type of atom",
          "Any material that is man-made",
          "A substance that cannot change",
        ],
        correctIndex: 0,
        feedback: {
          correct: "✅ Correct — a compound forms when different elements join together.",
          incorrect: "❌ Not quite. The correct answer is A. A substance made from one type of atom is an element, not a compound.",
        },
      },
      {
        prompt: "Water is made when hydrogen and oxygen join together. What does that make water?",
        options: ["An element", "A compound", "A mixture", "Not matter"],
        correctIndex: 1,
        feedback: {
          correct: "✅ Correct — because hydrogen and oxygen are different elements, water is a compound.",
          incorrect: "❌ That’s not right. The correct answer is B. When different elements join and form a new substance, it is called a compound.",
        },
      },
      {
        prompt: "Which idea best explains why compounds can be very different from the elements that make them?",
        options: [
          "Compounds always look exactly like the elements",
          "When elements join, they can create a new substance with new properties",
          "Elements disappear completely",
          "Compounds are just elements sitting next to each other",
        ],
        correctIndex: 1,
        feedback: {
          correct: "✅ Exactly — when elements join, they form a new substance with different properties.",
          incorrect:
            "❌ Not quite. The correct answer is B. Compounds are new substances and can behave very differently from the elements that made them.",
        },
      },
      {
        prompt: "Which statement is most accurate?",
        options: [
          "Only solids are matter",
          "Matter is only things you can see",
          "Materials/substances like air can still be matter",
          "Matter means living things only",
        ],
        correctIndex: 2,
        feedback: {
          correct: "✅ Correct — air is a substance, so it is matter even though you cannot see it.",
          incorrect: "❌ That’s not correct. The correct answer is C. Matter includes gases like air and is not limited to solids or living things.",
        },
      },
      {
        prompt: "Which order matches the flow in the diagram?",
        options: [
          "Things → Elements → Matter → Compounds → Atoms",
          "Things → Materials/Substances → Matter → Atoms → Elements → Compounds",
          "Things → Matter → Materials/Substances → Elements → Atoms → Compounds",
          "Things → Compounds → Matter → Atoms → Materials/Substances → Elements",
        ],
        correctIndex: 1,
        feedback: {
          correct: "✅ Correct — that is the correct sequence shown in the lesson.",
          incorrect:
            "❌ Not quite. The correct answer is B. First things are made of materials/substances, scientists call that matter, matter is made of atoms, atoms come in types called elements, and elements can form compounds.",
        },
      },
    ],
  },

  // statesOfMatter: { ... }
};
