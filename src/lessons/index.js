import { storySteps as statesStory } from "../story/StatesOfMatter/storySteps";
import { initialNodes as statesNodes, initialEdges as statesEdges } from "../story/StatesOfMatter/nodeBank";

import { storySteps as atomsStory } from "../story/MakingSenseOfStuff/storySteps";
import { initialNodes as atomsNodes, initialEdges as atomsEdges } from "../story/MakingSenseOfStuff/nodeBank";

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
    storySteps: atomsStory,
    initialNodes: atomsNodes,
    initialEdges: atomsEdges,
  },
};
