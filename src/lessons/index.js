import { storySteps as statesStory } from "../story/StatesOfMatter/storySteps";
import { initialNodes as statesNodes, initialEdges as statesEdges } from "../story/StatesOfMatter/nodeBank";

import { storySteps as makingSenseOfStuff } from "../story/MakingSenseOfStuff/storySteps";
import { initialNodes as makingSenseOfStuffNodes, initialEdges as makingSenseOfStuffEdges } from "../story/MakingSenseOfStuff/nodeBank";
import { QUIZZES } from "../quiz/quizzes";

export const LESSONS = {
  statesOfMatter: {
    id: "statesOfMatter",
    name: "States of Matter",
    storySteps: statesStory,
    initialNodes: statesNodes,
    initialEdges: statesEdges,
  },
  makingSenseOfStuff: {
    id: "makingSenseOfStuff",
    name: "Making Sense of Stuff",
    storySteps: makingSenseOfStuff,
    initialNodes: makingSenseOfStuffNodes,
    initialEdges: makingSenseOfStuffEdges,
    quiz: QUIZZES.makingSenseOfStuffQuiz,
  },
};
