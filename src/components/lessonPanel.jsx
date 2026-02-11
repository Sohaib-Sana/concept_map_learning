// src/components/LessonPanel.jsx
export function LessonPanel({ started, step, stepIndex, totalSteps, onStart, onNext, onBack }) {
  return (
    <div
      style={{
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
      }}
    >
      {!started ? (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Concept Map Lesson</div>
          <div style={{ fontSize: 13, color: "#444", marginBottom: 12 }}>Press start to begin. Nodes will reveal step-by-step.</div>
          <button onClick={onStart} style={btnPrimary}>
            Start
          </button>
        </>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{step?.title}</div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {stepIndex + 1}/{totalSteps}
            </div>
          </div>

          <div style={{ fontSize: 13, color: "#222", marginTop: 10, lineHeight: 1.5 }}>{step?.narration}</div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={onBack}
              disabled={stepIndex === 0}
              style={{
                ...btnSecondary,
                opacity: stepIndex === 0 ? 0.5 : 1,
                cursor: stepIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              Back
            </button>

            <button
              onClick={onNext}
              disabled={stepIndex === totalSteps - 1}
              style={{
                ...btnPrimary,
                opacity: stepIndex === totalSteps - 1 ? 0.5 : 1,
                cursor: stepIndex === totalSteps - 1 ? "not-allowed" : "pointer",
                flex: 1,
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const btnPrimary = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #222138",
  background: "#222138",
  color: "white",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const btnSecondary = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "white",
  color: "#111",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
