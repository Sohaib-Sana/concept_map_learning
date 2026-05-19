import { storySteps as statesStory } from "../story/StatesOfMatter/storySteps";
import { initialNodes as statesNodes, initialEdges as statesEdges } from "../story/StatesOfMatter/nodeBank";

import { storySteps as makingSenseOfStuff } from "../story/MakingSenseOfStuff/storySteps";
import { initialNodes as makingSenseOfStuffNodes, initialEdges as makingSenseOfStuffEdges } from "../story/MakingSenseOfStuff/nodeBank";

import { storySteps as computersHelpUsStory } from "../story/ComputersHelpsUs/storySteps";
import { initialNodes as computersHelpUsNodes, initialEdges as computersHelpUsEdges } from "../story/ComputersHelpsUs/nodeBank";

import { storySteps as shortHistoryStory } from "../story/ShortHistoryOfComputers/storySteps";
import { initialNodes as shortHistoryNodes, initialEdges as shortHistoryEdges } from "../story/ShortHistoryOfComputers/nodeBank";

import { storySteps as countLikeWeDoStory } from "../story/ComputersDontCountLikeWeDo/storySteps";
import { initialNodes as countLikeWeDoNodes, initialEdges as countLikeWeDoEdges } from "../story/ComputersDontCountLikeWeDo/nodeBank";

import { storySteps as electricityCreatesStory } from "../story/HowElectricityCreates0sAnd1s/storySteps";
import { initialNodes as electricityCreatesNodes, initialEdges as electricityCreatesEdges } from "../story/HowElectricityCreates0sAnd1s/nodeBank";

import { storySteps as fromNumbersToWordsPicturesAndSoundStory } from "../story/FromNumbersToWordsPicturesAndSound/storySteps";
import {
  initialNodes as fromNumbersToWordsPicturesAndSoundNodes,
  initialEdges as fromNumbersToWordsPicturesAndSoundEdges,
} from "../story/FromNumbersToWordsPicturesAndSound/nodeBank";

import { storySteps as oneInstructionStory } from "../story/OneInstructionAtATime/storySteps";
import { initialNodes as oneInstructionNodes, initialEdges as oneInstructionEdges } from "../story/OneInstructionAtATime/nodeBank";

import { storySteps as keepingThingsSafeStory } from "../story/KeepingThingsSafeWhenComputerLosesPower/storySteps";
import {
  initialNodes as keepingThingsSafeNodes,
  initialEdges as keepingThingsSafeEdges,
} from "../story/KeepingThingsSafeWhenComputerLosesPower/nodeBank";

import { storySteps as helpingCpuStory } from "../story/HelpingTheCpuGetWhatItNeedsFaster/storySteps";
import { initialNodes as helpingCpuNodes, initialEdges as helpingCpuEdges } from "../story/HelpingTheCpuGetWhatItNeedsFaster/nodeBank";

import { storySteps as cacheStory } from "../story/SpeedingUpTheComputerFurther/storySteps";
import { initialNodes as cacheNodes, initialEdges as cacheEdges } from "../story/SpeedingUpTheComputerFurther/nodeBank";

import { storySteps as ramFillsStory } from "../story/WhatHappensWhenRamFillsUp/storySteps";
import { initialNodes as ramFillsNodes, initialEdges as ramFillsEdges } from "../story/WhatHappensWhenRamFillsUp/nodeBank";

import { storySteps as switchOnStory } from "../story/WhatHappensWhenYouFirstSwitchAComputerOn/storySteps";
import { initialNodes as switchOnNodes, initialEdges as switchOnEdges } from "../story/WhatHappensWhenYouFirstSwitchAComputerOn/nodeBank";

import { storySteps as communicateStory } from "../story/WhatIfDevicesCouldNotCommunicate/storySteps";
import { initialNodes as communicateNodes, initialEdges as communicateEdges } from "../story/WhatIfDevicesCouldNotCommunicate/nodeBank";

import { storySteps as connectivityStory } from "../story/TheOtherSideOfConnectivity/storySteps";
import { initialNodes as connectivityNodes, initialEdges as connectivityEdges } from "../story/TheOtherSideOfConnectivity/nodeBank";

import { storySteps as softwareStory } from "../story/WhereDoesSoftwareComeFrom/storySteps";
import { initialNodes as softwareNodes, initialEdges as softwareEdges } from "../story/WhereDoesSoftwareComeFrom/nodeBank";

import { storySteps as partySoftwareStory } from "../story/HowToOrganizePartyAndWriteSoftware/storySteps";
import { initialNodes as partySoftwareNodes, initialEdges as partySoftwareEdges } from "../story/HowToOrganizePartyAndWriteSoftware//nodeBank";

import { storySteps as thinkingInStepsStory } from "../story/ThinkingInSteps/storySteps";
import { initialNodes as thinkingInStepsNodes, initialEdges as thinkingInStepsEdges } from "../story/ThinkingInSteps/nodeBank";

import { storySteps as computationalThinkingStory } from "../story/ComputationalThinking/storySteps";
import { initialNodes as computationalThinkingNodes, initialEdges as computationalThinkingEdges } from "../story/ComputationalThinking/nodeBank";

import { QUIZZES } from "../quiz/quizzes";

export const LESSONS = {
  statesOfMatter: {
    id: "statesOfMatter",
    title: "States of Matter",
    description: "Explore the different states of matter and how they change from one to another.",
    coverImage: "/images/Chemistry/states-of-matter.png",
    storySteps: statesStory,
    initialNodes: statesNodes,
    initialEdges: statesEdges,
    category: "sciences",
  },

  makingSenseOfStuff: {
    id: "makingSenseOfStuff",
    title: "Making Sense of Stuff",
    description: "Learn how to make sense of complex scientific concepts.",
    coverImage: "/images/Chemistry/making-sense-of-stuff.png",
    storySteps: makingSenseOfStuff,
    initialNodes: makingSenseOfStuffNodes,
    initialEdges: makingSenseOfStuffEdges,
    quiz: QUIZZES.makingSenseOfStuffQuiz,
    category: "sciences",
  },

  computersHelpUs: {
    id: "computersHelpUs",
    title: "Computers Help Us Have Fun, Connect and Work",
    description: "Learn how computing devices, apps and operating systems work together.",
    coverImage: "/images/Computer/computers-help-us.png",
    storySteps: computersHelpUsStory,
    initialNodes: computersHelpUsNodes,
    initialEdges: computersHelpUsEdges,
    category: "computer-science",
  },

  shortHistoryOfComputers: {
    id: "shortHistoryOfComputers",
    title: "A (very) Short History of Computers",
    description: "See how computers changed from human calculators to modern hardware that runs software.",
    coverImage: "/images/Computer/short-history-of-computers.png",
    storySteps: shortHistoryStory,
    initialNodes: shortHistoryNodes,
    initialEdges: shortHistoryEdges,
    category: "computer-science",
  },

  computersDontCountLikeWeDo: {
    id: "computersDontCountLikeWeDo",
    title: "Computers Don't Count Like We Do!",
    description: "Learn why computers use binary instead of decimal, and how 0s and 1s fit electricity.",
    coverImage: "/images/Computer/computers-dont-count-like-we-do.png",
    storySteps: countLikeWeDoStory,
    initialNodes: countLikeWeDoNodes,
    initialEdges: countLikeWeDoEdges,
    category: "computer-science",
  },

  howElectricityCreates0sAnd1s: {
    id: "howElectricityCreates0sAnd1s",
    title: "How Electricity Creates 0s and 1s",
    description: "See how circuits, switches, and binary let computers represent data.",
    coverImage: "/images/Computer/how-electricity-creates-0s-and-1s.png",
    storySteps: electricityCreatesStory,
    initialNodes: electricityCreatesNodes,
    initialEdges: electricityCreatesEdges,
    category: "computer-science",
  },

  fromNumbersToWordsPicturesAndSound: {
    id: "fromNumbersToWordsPicturesAndSound",
    title: "From Numbers to Words, Pictures and Sound",
    description: "Discover how computers turn binary numbers into text, images, and audio you can read, see, and hear.",
    coverImage: "/images/Computer/from-numbers-to-words-pictures-and-sound.png",
    storySteps: fromNumbersToWordsPicturesAndSoundStory,
    initialNodes: fromNumbersToWordsPicturesAndSoundNodes,
    initialEdges: fromNumbersToWordsPicturesAndSoundEdges,
    category: "computer-science",
  },

  oneInstructionAtATime: {
    id: "oneInstructionAtATime",
    title: "One Instruction at a Time",
    description: "Learn how the CPU carries out software instructions using fetch, decode, and execute.",
    coverImage: "/images/Computer/one-instruction-at-a-time.png",
    storySteps: oneInstructionStory,
    initialNodes: oneInstructionNodes,
    initialEdges: oneInstructionEdges,
    category: "computer-science",
  },

  keepingThingsSafeWhenComputerLosesPower: {
    id: "keepingThingsSafeWhenComputerLosesPower",
    title: "Keeping Things Safe When your Computer Loses Power",
    description: "Learn why computing devices need permanent storage for software and user files.",
    coverImage: "/images/Computer/keeping-things-safe-when-computer-loses-power.png",
    storySteps: keepingThingsSafeStory,
    initialNodes: keepingThingsSafeNodes,
    initialEdges: keepingThingsSafeEdges,
    category: "computer-science",
  },

  helpingTheCpuGetWhatItNeedsFaster: {
    id: "helpingTheCpuGetWhatItNeedsFaster",
    title: "Helping the CPU Get What It Needs Faster",
    description: "Learn how RAM helps the CPU access instructions and data more quickly.",
    coverImage: "/images/Computer/helping-the-cpu-get-what-it-needs-faster.png",
    storySteps: helpingCpuStory,
    initialNodes: helpingCpuNodes,
    initialEdges: helpingCpuEdges,
    category: "computer-science",
  },

  speedingUpTheComputerFurther: {
    id: "speedingUpTheComputerFurther",
    title: "Speeding Up the Computer Further",
    description: "See how cache gives the CPU very fast access to frequently needed information.",
    coverImage: "/images/Computer/speeding-up-the-computer-further.png",
    storySteps: cacheStory,
    initialNodes: cacheNodes,
    initialEdges: cacheEdges,
    category: "computer-science",
  },

  whatHappensWhenRamFillsUp: {
    id: "whatHappensWhenRamFillsUp",
    title: "What Happens When RAM Fills Up?",
    description: "Explore virtual memory and why a computer slows down when RAM runs out.",
    coverImage: "/images/Computer/what-happens-when-ram-fills-up.png",
    storySteps: ramFillsStory,
    initialNodes: ramFillsNodes,
    initialEdges: ramFillsEdges,
    category: "computer-science",
  },

  whatHappensWhenYouFirstSwitchAComputerOn: {
    id: "whatHappensWhenYouFirstSwitchAComputerOn",
    title: "What Happens When You First Switch a Computer On?",
    description: "Learn how ROM and BIOS help a computer start up and load the operating system.",
    coverImage: "/images/Computer/what-happens-when-you-first-switch-a-computer-on.png",
    storySteps: switchOnStory,
    initialNodes: switchOnNodes,
    initialEdges: switchOnEdges,
    category: "computer-science",
  },

  whatIfDevicesCouldNotCommunicate: {
    id: "whatIfDevicesCouldNotCommunicate",
    title: "What if Devices Could Not Communicate?",
    description: "Understand why networks make computing devices far more useful.",
    coverImage: "/images/Computer/what-if-devices-could-not-communicate.png",
    storySteps: communicateStory,
    initialNodes: communicateNodes,
    initialEdges: communicateEdges,
    category: "computer-science",
  },

  theOtherSideOfConnectivity: {
    id: "theOtherSideOfConnectivity",
    title: "The Other Side of Connectivity",
    description: "Explore some of the risks and responsibilities that come with connected devices.",
    coverImage: "/images/Computer/the-other-side-of-connectivity.png",
    storySteps: connectivityStory,
    initialNodes: connectivityNodes,
    initialEdges: connectivityEdges,
    category: "computer-science",
  },

  whereDoesSoftwareComeFrom: {
    id: "whereDoesSoftwareComeFrom",
    title: "Where Does Software Come From?",
    description: "Learn about the development and distribution of software.",
    coverImage: "/images/Computer/where-does-software-come-from.png",
    storySteps: softwareStory,
    initialNodes: softwareNodes,
    initialEdges: softwareEdges,
    category: "computer-science",
  },

  howToOrganizePartyAndWriteSoftware: {
    id: "howToOrganizePartyAndWriteSoftware",
    title: "How to Organize a Party and Write Software",
    description: "See how organizing a party is like writing software, and what it takes to do both well.",
    coverImage: "/images/Computer/how-to-organize-a-party-and-write-software.png",
    storySteps: partySoftwareStory,
    initialNodes: partySoftwareNodes,
    initialEdges: partySoftwareEdges,
    category: "computer-science",
  },

  thinkingInSteps: {
    id: "thinkingInSteps",
    title: "Thinking in Steps",
    description: "Learn how to break down complex problems into manageable steps.",
    coverImage: "/images/Computer/thinking-in-steps.png",
    storySteps: thinkingInStepsStory,
    initialNodes: thinkingInStepsNodes,
    initialEdges: thinkingInStepsEdges,
    category: "computer-science",
  },

  computationalThinking: {
    id: "computationalThinking",
    title: "Computational Thinking",
    description: "Explore the key concepts of computational thinking and how they help us solve problems.",
    coverImage: "/images/Computer/computational-thinking.png",
    storySteps: computationalThinkingStory,
    initialNodes: computationalThinkingNodes,
    initialEdges: computationalThinkingEdges,
    category: "computer-science",
  },
};

export const LESSON_CATEGORIES = {
  sciences: {
    id: "sciences",
    title: "Sciences",
    pathPrefix: "/sciences/lessons",
  },
  "computer-science": {
    id: "computer-science",
    title: "Computer Science",
    pathPrefix: "/computer-science/lessons",
  },
};

export const LESSONS_BY_CATEGORY = Object.values(LESSONS).reduce((acc, lesson) => {
  const category = lesson.category || "computer-science";
  acc[category] = acc[category] ?? [];
  acc[category].push(lesson);
  return acc;
}, {});
