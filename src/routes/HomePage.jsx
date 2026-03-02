import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LESSONS as STORIES } from "../lessons/index";

export default function HomePage() {
  const navigate = useNavigate();

  const storyList = useMemo(() => Object.values(STORIES), []);
  console.log(storyList);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Pick a story</h1>
          <p style={{ marginTop: 8, color: "#444", lineHeight: 1.4 }}>Choose one lesson to begin. You can come back later and start another.</p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {storyList.map((s) => (
            <div
              key={s.id}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ height: 160, background: "#f6f6f6" }}>
                {s.coverImage ? (
                  <img src={s.coverImage} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                ) : null}
                {s.name && <div style={{ padding: 16, color: "#333", fontWeight: 600 }}>{s.name}</div>}
              </div>

              <div style={{ padding: 16 }}>
                <h2 style={{ margin: 0, fontSize: 18 }}>{s.title}</h2>
                <p style={{ marginTop: 8, marginBottom: 14, color: "#555", lineHeight: 1.4 }}>{s.description}</p>

                <button
                  onClick={() => navigate(`/lesson/${encodeURIComponent(s.id)}`)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #111",
                    background: "#111",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: 18, color: "#777", fontSize: 13 }}>
          Tip: You can bookmark a lesson URL like <code>/lesson/matter</code>.
        </footer>
      </div>
    </div>
  );
}
