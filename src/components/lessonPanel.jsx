// src/components/lessonPanel.jsx
export function LessonPanel({ started, title, progressText, beatText, beatImages, isRunning, canGoBack, onStart, onStop, onBack }) {
  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#222" }}>{title ?? "Concept Map Lesson"}</div>
        {started && <div style={{ fontSize: 12, color: "#666" }}>{progressText}</div>}
      </div>

      <div style={{ fontSize: 13, color: "#222", marginTop: 10, lineHeight: 1.5 }}>{started ? beatText : "Tap Start to begin the lesson."}</div>

      {started && beatImages?.length > 0 && (
        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {beatImages.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={`reference ${i + 1}`}
              style={{
                width: "100%",
                height: 130,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #eee",
              }}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {started && (
          <button
            onClick={onBack}
            disabled={!canGoBack}
            style={{
              ...btnSecondary,
              opacity: canGoBack ? 1 : 0.5,
              cursor: canGoBack ? "pointer" : "not-allowed",
            }}
          >
            Back
          </button>
        )}

        {!isRunning ? (
          <button onClick={onStart} style={{ ...btnPrimary, flex: 1 }}>
            Start
          </button>
        ) : (
          <button onClick={onStop} style={{ ...btnDanger, flex: 1 }}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

const panelStyle = {
  position: "absolute",
  right: 16,
  top: 16,
  width: 360,
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #e9e9e9",
  borderRadius: 12,
  padding: 14,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "left",
};

const btnPrimary = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #222138",
  background: "#222138",
  color: "white",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
};

const btnSecondary = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "white",
  color: "#111",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
};

const btnDanger = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #e3b0b0",
  background: "#fff5f5",
  color: "#a11111",
  fontSize: 13,
  fontWeight: 900,
  cursor: "pointer",
};
