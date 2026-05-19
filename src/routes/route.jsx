import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import LessonFlowPage from "./LessonFlowPage";
import HomePage from "./HomePage";
import AdminStoriesPage from "../admin/AdminStoriesPage";
import AdminStoryEditorPage from "../admin/AdminStoryEditorPage";
import { LESSONS as STORIES } from "../lessons/index";

function LessonRedirect() {
  const { storyId } = useParams();
  const story = STORIES[storyId];
  if (!story) return <Navigate to="/" replace />;
  const category = story.category || "computer-science";
  return <Navigate to={`/${category}/lessons/${encodeURIComponent(storyId)}`} replace />;
}

export function makeRouter() {
  return createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/lesson/:storyId", element: <LessonRedirect /> },
    { path: "/sciences/lessons/:storyId", element: <LessonFlowPage /> },
    { path: "/computer-science/lessons/:storyId", element: <LessonFlowPage /> },
    { path: "/admin/stories", element: <AdminStoriesPage /> },
    { path: "/admin/stories/:storyId", element: <AdminStoryEditorPage /> },
  ]);
}
