import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LESSONS as STORIES, LESSON_CATEGORIES } from "../lessons/index";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("sciences");
  const navigate = useNavigate();
  const storyList = useMemo(() => Object.values(STORIES), []);
  const storyGroups = useMemo(() => {
    const groups = {
      sciences: [],
      "computer-science": [],
    };
    storyList.forEach((story) => {
      const category = story.category || "computer-science";
      if (groups[category]) {
        groups[category].push(story);
      }
    });
    return groups;
  }, [storyList]);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28, color: "#111" }}>Pick a Lesson</h1>
          <p style={{ marginTop: 8, color: "#444", lineHeight: 1.4 }}>Choose one lesson to begin. You can come back later and start another.</p>
        </header>

        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <label htmlFor="category-select" style={{ fontWeight: 700, color: "#111" }}>
            Select subject:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#111",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {Object.entries(LESSON_CATEGORIES).map(([categoryKey, categoryMeta]) => (
              <option key={categoryKey} value={categoryKey}>
                {categoryMeta.title}
              </option>
            ))}
          </select>
        </div>

        <div key={selectedCategory} style={{ marginBottom: 28 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 22, color: "#111" }}>{LESSON_CATEGORIES[selectedCategory].title}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {storyGroups[selectedCategory].map((s) => (
              <div
                key={s.id}
                style={{
                  border: "1px solid #e9e9e9",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    background: "linear-gradient(180deg, #fafafa, #f3f3f3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                  }}
                >
                  {s.coverImage ? (
                    <img
                      src={s.coverImage}
                      alt={s.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        borderRadius: 10,
                      }}
                    />
                  ) : null}
                </div>

                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.2,
                      color: "#111",
                    }}
                  >
                    {s.title}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "#555",
                      lineHeight: 1.45,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {s.description}
                  </p>

                  <div style={{ flex: 1 }} />

                  <button
                    onClick={() => navigate(`/${selectedCategory}/lessons/${encodeURIComponent(s.id)}`)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid #111",
                      background: "#111",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <footer style={{ marginTop: 18, color: "#777", fontSize: 13 }}>
          Tip: You can bookmark a lesson URL like <code>/lesson/matter</code>.
        </footer> */}
      </div>
    </div>
  );
}
