import { createBrowserRouter } from "react-router-dom";
import LessonFlowPage from "./LessonFlowPage";
import HomePage from "./HomePage";

export function makeRouter() {
  return createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/lesson/:storyId", element: <LessonFlowPage /> },
  ]);
}
