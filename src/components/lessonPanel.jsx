// src/components/lessonPanel.jsx
export function LessonPanel({
  panelRef, // ✅ NEW
  started,
  title,
  progressText,
  beatText,
  beatImages,
  isRunning,
  canGoBack,
  canGoNext,
  onStart,
  onStop,
  onBack,
  onNext,

  // ✅ NEW: { start:number, end:number } | null
  highlightRange,
}) {
  const primaryLabel = !started ? "Start" : isRunning ? "Pause" : "Resume";
  const onPrimaryClick = !started ? onStart : isRunning ? onStop : onStart;

  return (
    <div ref={panelRef} style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#222" }}>{title ?? "States of Matter"}</div>
        {started && <div style={{ fontSize: 12, color: "#666" }}>{progressText}</div>}
      </div>

      <div style={{ fontSize: 13, color: "#222", marginTop: 10, lineHeight: 1.5 }}>
        {started ? renderHighlighted(beatText, highlightRange) : "Tap Start to begin the lesson."}
      </div>

      {started && beatImages?.length > 0 && (
        <div style={{ marginTop: 12, display: "grid", gap: 2 }}>
          {beatImages.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={`reference ${i + 1}`}
              style={{
                width: "18rem",
                height: "18rem",
                objectFit: "fill",
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

        <button onClick={onPrimaryClick} style={{ ...(isRunning ? btnDanger : btnPrimary), flex: 1 }}>
          {primaryLabel}
        </button>

        {started && (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            style={{
              ...btnSecondary,
              opacity: canGoNext ? 1 : 0.5,
              cursor: canGoNext ? "pointer" : "not-allowed",
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

// ✅ NEW helper
function renderHighlighted(text, range) {
  const t = text ?? "";
  if (!range || typeof range.start !== "number" || typeof range.end !== "number") return t;

  const start = Math.max(0, Math.min(range.start, t.length));
  const end = Math.max(start, Math.min(range.end, t.length));
  if (start === end) return t;

  return (
    <>
      {t.slice(0, start)}
      <mark
        style={{
          background: "rgba(255, 230, 0, 0.55)",
          borderRadius: 6,
          padding: "0 2px",
        }}
      >
        {t.slice(start, end)}
      </mark>
      {t.slice(end)}
    </>
  );
}

const panelStyle = {
  position: "fixed", // ✅ was "absolute"
  left: 16,
  top: 16,
  width: 300,
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #e9e9e9",
  borderRadius: 12,
  padding: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  textAlign: "left",
  zIndex: 50, // ✅ ensure it stays above canvas
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
