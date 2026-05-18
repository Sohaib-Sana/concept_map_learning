import { createBrowserRouter } from "react-router-dom";
import LessonFlowPage from "./LessonFlowPage";
import HomePage from "./HomePage";
import AdminStoriesPage from "../admin/adminStoriesPage";
import AdminStoryEditorPage from "../admin/AdminStoryEditorPage";

export function makeRouter() {
  return createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/lesson/:storyId", element: <LessonFlowPage /> },
    { path: "/admin/stories", element: <AdminStoriesPage /> },
    { path: "/admin/stories/:storyId", element: <AdminStoryEditorPage /> },
  ]);
}
