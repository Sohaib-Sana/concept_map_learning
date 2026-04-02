import { storySteps as statesStory } from "../story/StatesOfMatter/storySteps";
import { initialNodes as statesNodes, initialEdges as statesEdges } from "../story/StatesOfMatter/nodeBank";

import { storySteps as makingSenseOfStuff } from "../story/MakingSenseOfStuff/storySteps";
import { initialNodes as makingSenseOfStuffNodes, initialEdges as makingSenseOfStuffEdges } from "../story/MakingSenseOfStuff/nodeBank";

import { storySteps as computersHelpUsStory } from "../story/ComputersHelpsUs/storySteps";
import { initialNodes as computersHelpUsNodes, initialEdges as computersHelpUsEdges } from "../story/ComputersHelpsUs/nodeBank";

import { QUIZZES } from "../quiz/quizzes";

export const LESSONS = {
  statesOfMatter: {
    id: "statesOfMatter",
    title: "States of Matter",
    description: "Explore the different states of matter and how they change from one to another.",
    coverImage: "/images/states-of-matter.png",
    storySteps: statesStory,
    initialNodes: statesNodes,
    initialEdges: statesEdges,
    // quiz: QUIZZES.statesOfMatterQuiz,
  },

  makingSenseOfStuff: {
    id: "makingSenseOfStuff",
    title: "Making Sense of Stuff",
    description: "Learn how to make sense of complex scientific concepts.",
    coverImage: "/images/making-sense-of-stuff.png",
    storySteps: makingSenseOfStuff,
    initialNodes: makingSenseOfStuffNodes,
    initialEdges: makingSenseOfStuffEdges,
    quiz: QUIZZES.makingSenseOfStuffQuiz,
  },

  computersHelpUs: {
    id: "computersHelpUs",
    title: "Computers Help Us Have Fun, Connect and Work",
    description: "Learn how computing devices, apps and operating systems work together.",
    coverImage: "/images/computers-help-us.png",
    storySteps: computersHelpUsStory,
    initialNodes: computersHelpUsNodes,
    initialEdges: computersHelpUsEdges,
    // quiz: QUIZZES.computersHelpUsQuiz,
  },
};
