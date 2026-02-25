// src/components/lessonPanel.jsx
export function LessonPanel({
  panelRef,
  started,
  title,
  progressText,
  beatText,
  beatImages,
  isRunning,
  canGoBack,
  canGoNext,
  onStart,
  onResume,
  onStop,
  onBack,
  onNext,
  canResume,
  highlightRange,
  speakingState,
  question,
  waitingForAnswer,
  onAnswer,
  questionFeedback,
}) {
  const isQuestionMode = !!(waitingForAnswer && question);
  const primaryLabel = !started ? "Start" : isRunning ? (speakingState === "loading" ? "Loading..." : "Pause") : canResume ? "Resume" : "Start";
  const onPrimaryClick = !started ? onStart : isRunning ? onStop : canResume ? onResume : onStart;
  const disablePrimary = started && isRunning && speakingState !== "speaking";

  return (
    <div ref={panelRef} className="lpPanel">
      {/* Header */}
      <div className="lpHeaderRow">
        <div className="lpHeaderLeft">
          <div className="lpHeaderTitle">{isQuestionMode ? "QUESTION" : (title ?? "States of Matter")}</div>
          <div className="lpHeaderSub">{isQuestionMode ? "Choose one option to continue" : started ? "Lesson" : ""}</div>
        </div>

        {!isQuestionMode && started && <div className="lpProgressPill">{progressText}</div>}
      </div>

      {/* Body (hidden in question mode) */}
      {!isQuestionMode && (
        <>
          <div className="lpBodyText">{started ? renderHighlighted(beatText, highlightRange) : "Tap Start to begin the lesson."}</div>

          {started && beatImages?.length > 0 && (
            <div className="lpImageGrid">
              {beatImages.map((src, i) => (
                <img key={`${src}-${i}`} src={src} alt={`reference ${i + 1}`} className="lpImage" />
              ))}
            </div>
          )}
        </>
      )}

      {/* Question */}
      {isQuestionMode && (
        <div className="lpQCard">
          <div className="lpQPrompt">{question.prompt}</div>

          <div className="lpQOptions">
            {question.options.map((opt, idx) => {
              const selected = questionFeedback?.selectedIndex === idx;
              const isCorrect = idx === question.correctIndex;

              const showFeedback = !!questionFeedback; // after first click
              const isWrongSelected = showFeedback && selected && !questionFeedback.isCorrect;
              const isCorrectShown = showFeedback && isCorrect;

              const cls = ["lpQOptionBtn", isWrongSelected ? "isWrong" : "", isCorrectShown ? "isCorrect" : ""].filter(Boolean).join(" ");

              return (
                <button
                  key={opt + idx}
                  onClick={() => onAnswer(idx)}
                  className={cls}
                  type="button"
                  disabled={questionFeedback?.isCorrect === true} // lock after correct (optional)
                >
                  <span className="lpQOptionText">{opt}</span>
                  <span className="lpQChevron">{isCorrectShown ? "✓" : "›"}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="lpControlsRow">
        {started && (
          <button onClick={onBack} disabled={!canGoBack} className={`lpBtn lpBtnSecondary ${!canGoBack ? "isDisabled" : ""}`} type="button">
            Back
          </button>
        )}

        <button
          onClick={onPrimaryClick}
          disabled={disablePrimary}
          className={`lpBtn ${isRunning ? "lpBtnDanger" : "lpBtnPrimary"} ${disablePrimary ? "isDisabled" : ""}`}
          type="button"
          style={{ flex: 1 }}
        >
          {primaryLabel}
        </button>

        {started && (
          <button onClick={onNext} disabled={!canGoNext} className={`lpBtn lpBtnSecondary ${!canGoNext ? "isDisabled" : ""}`} type="button">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function renderHighlighted(text, range) {
  const t = text ?? "";
  if (!range || typeof range.start !== "number" || typeof range.end !== "number") return t;

  const start = Math.max(0, Math.min(range.start, t.length));
  const end = Math.max(start, Math.min(range.end, t.length));
  if (start === end) return t;

  return (
    <>
      {t.slice(0, start)}
      <mark className="lpHighlight">{t.slice(start, end)}</mark>
      {t.slice(end)}
    </>
  );
}
