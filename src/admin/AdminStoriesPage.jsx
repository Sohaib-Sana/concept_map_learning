// src/admin/AdminStoriesPage.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAdminStory, deleteStory, duplicateStory, getAllStories, resetAdminStories, restoreBaseStories } from "./adminStoryStorage";

export default function AdminStoriesPage() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const stories = useMemo(() => {
    return Object.values(getAllStories()).sort((a, b) => a.title.localeCompare(b.title));
  }, [refreshKey]);

  function refresh() {
    setRefreshKey((value) => value + 1);
  }

  function handleCreate() {
    const title = window.prompt("Story title?", "New Story");
    if (!title) return;

    const story = createAdminStory({ title });
    navigate(`/admin/stories/${story.id}`);
  }

  function handleDuplicate(storyId) {
    const story = duplicateStory(storyId);
    if (story) navigate(`/admin/stories/${story.id}`);
  }

  function handleDelete(storyId) {
    const confirmed = window.confirm("Delete this story from the admin list?");
    if (!confirmed) return;

    deleteStory(storyId);
    refresh();
  }

  function handleResetAdminStories() {
    const confirmed = window.confirm("Remove all locally created/edited admin stories?");
    if (!confirmed) return;

    resetAdminStories();
    refresh();
  }

  function handleRestoreBaseStories() {
    restoreBaseStories();
    refresh();
  }

  return (
    <main className="adminPage">
      <header className="adminHeader">
        <div>
          <p className="adminEyebrow">Admin Panel</p>
          <h1>Stories</h1>
          <p className="adminSubtext">Create, edit, duplicate, and remove lesson stories.</p>
        </div>

        <div className="adminHeaderActions">
          <Link className="adminButton adminButtonGhost" to="/">
            Back to lessons
          </Link>

          <button className="adminButton" onClick={handleCreate}>
            + New Story
          </button>
        </div>
      </header>

      <section className="adminToolbar">
        <button className="adminSmallButton" onClick={handleRestoreBaseStories}>
          Restore hidden base stories
        </button>

        <button className="adminSmallButton danger" onClick={handleResetAdminStories}>
          Reset admin stories
        </button>
      </section>

      <section className="storyGrid">
        {stories.map((story) => (
          <article key={story.id} className="storyAdminCard">
            <div>
              <p className="storyAdminId">{story.id}</p>
              <h2>{story.title}</h2>
              <p>{story.description || "No description yet."}</p>
            </div>

            <div className="storyAdminMeta">
              <span>{story.initialNodes?.length ?? 0} nodes</span>
              <span>{story.initialEdges?.length ?? 0} edges</span>
              <span>{story.isAdminStory ? "Admin copy" : "Base story"}</span>
            </div>

            <div className="storyAdminActions">
              <Link className="adminButton" to={`/admin/stories/${story.id}`}>
                Edit
              </Link>

              <button className="adminButton adminButtonGhost" onClick={() => handleDuplicate(story.id)}>
                Duplicate
              </button>

              <button className="adminButton danger" onClick={() => handleDelete(story.id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
