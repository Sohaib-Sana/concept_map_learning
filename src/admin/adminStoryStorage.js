// src/admin/adminStoryStorage.js
import { LESSONS as BASE_LESSONS } from "../lessons/index";

const STORAGE_KEY = "lesson_admin_stories_v1";
const DELETED_BASE_KEY = "lesson_admin_deleted_base_story_ids_v1";

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function getSavedStories() {
  return safeParse(localStorage.getItem(STORAGE_KEY), {});
}

function setSavedStories(stories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}

function getDeletedBaseStoryIds() {
  return safeParse(localStorage.getItem(DELETED_BASE_KEY), []);
}

function setDeletedBaseStoryIds(ids) {
  localStorage.setItem(DELETED_BASE_KEY, JSON.stringify(ids));
}

function normalizeStory(story) {
  return {
    id: story.id,
    title: story.title ?? "Untitled story",
    description: story.description ?? "",
    coverImage: story.coverImage ?? "",
    storySteps: Array.isArray(story.storySteps) ? story.storySteps : [],
    initialNodes: Array.isArray(story.initialNodes) ? story.initialNodes : [],
    initialEdges: Array.isArray(story.initialEdges) ? story.initialEdges : [],
    quiz: story.quiz,
    isAdminStory: story.isAdminStory ?? false,
  };
}

export function getAllStories() {
  const adminStories = getSavedStories();
  const deletedBaseIds = new Set(getDeletedBaseStoryIds());

  const baseStories = Object.fromEntries(
    Object.entries(BASE_LESSONS)
      .filter(([id]) => !deletedBaseIds.has(id))
      .map(([id, story]) => [id, normalizeStory(story)]),
  );

  return {
    ...baseStories,
    ...adminStories,
  };
}

export function getStoryById(storyId) {
  return getAllStories()[storyId] ?? null;
}

export function saveAdminStory(story) {
  const stories = getSavedStories();

  stories[story.id] = normalizeStory({
    ...story,
    isAdminStory: true,
  });

  setSavedStories(stories);
  return stories[story.id];
}

export function createAdminStory({ title = "New Story" } = {}) {
  const id = makeStoryId(title);
  const story = {
    id,
    title,
    description: "New lesson description",
    coverImage: "",
    initialNodes: [],
    initialEdges: [],
    storySteps: [
      {
        id: "step-0",
        title: "Start",
        beats: [
          {
            narration: "This is the beginning of the story.",
            reveal: {
              nodes: [],
              edges: [],
            },
          },
        ],
      },
    ],
    isAdminStory: true,
  };

  return saveAdminStory(story);
}

export function duplicateStory(storyId) {
  const story = getStoryById(storyId);
  if (!story) return null;

  const copiedId = makeStoryId(`${story.title} Copy`);

  const copiedStory = {
    ...structuredClone(story),
    id: copiedId,
    title: `${story.title} Copy`,
    isAdminStory: true,
  };

  return saveAdminStory(copiedStory);
}

export function deleteStory(storyId) {
  const savedStories = getSavedStories();

  if (savedStories[storyId]) {
    delete savedStories[storyId];
    setSavedStories(savedStories);
    return;
  }

  if (BASE_LESSONS[storyId]) {
    const deleted = new Set(getDeletedBaseStoryIds());
    deleted.add(storyId);
    setDeletedBaseStoryIds([...deleted]);
  }
}

export function restoreBaseStories() {
  localStorage.removeItem(DELETED_BASE_KEY);
}

export function resetAdminStories() {
  localStorage.removeItem(STORAGE_KEY);
}

export function makeStoryId(title) {
  const base = String(title)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  const idBase = base || "new-story";
  const existing = getAllStories();

  let id = idBase;
  let counter = 2;

  while (existing[id]) {
    id = `${idBase}-${counter}`;
    counter += 1;
  }

  return id;
}
