// src/components/quizPanelBig.jsx

export function QuizPanel({ panelRef, title = "QUIZ", progressText, question, feedback, onAnswer, onNext }) {
  const hasAnswered = !!feedback;
  const canGoNext = hasAnswered; // must answer before Next

  return (
    <div ref={panelRef} className="lpPanel lpPanel--quiz" data-testid="quiz-panel">
      {/* Header */}
      <div className="lpHeaderRow">
        <div className="lpHeaderLeft">
          <div className="lpHeaderTitle">{title}</div>
          <div className="lpHeaderSub">
            {!question
              ? "No questions found."
              : feedback
                ? feedback.isCorrect
                  ? "Correct — press Next"
                  : "Not quite — press Next"
                : "Choose one option to continue"}
          </div>
        </div>

        <div className="lpProgressPill">{progressText}</div>
      </div>

      {/* Body */}
      {!question ? null : (
        <>
          {/* Question */}
          <div className="lpQCard">
            <div className="lpQPrompt">{question.prompt}</div>

            <div className="lpQOptions">
              {question.options.map((opt, idx) => {
                const selected = feedback?.selectedIndex === idx;
                const isCorrect = idx === question.correctIndex;

                const showFeedback = !!feedback;
                const isWrongSelected = showFeedback && selected && !feedback.isCorrect;
                const isCorrectShown = showFeedback && isCorrect;

                const cls = ["lpQOptionBtn", isWrongSelected ? "isWrong" : "", isCorrectShown ? "isCorrect" : ""].filter(Boolean).join(" ");

                return (
                  <button
                    key={`${opt}-${idx}`}
                    onClick={() => onAnswer(idx)}
                    className={cls}
                    type="button"
                    disabled={hasAnswered} // lock after first selection
                  >
                    <span className="lpQOptionText">{opt}</span>
                    <span className="lpQChevron">{isCorrectShown ? "✓" : "›"}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="lpQFeedbackWrap">
                <div className={`lpQFeedback ${feedback.isCorrect ? "isCorrect" : "isWrong"}`}>
                  {feedback.isCorrect ? (question.feedback?.correct ?? "✅ Correct.") : (question.feedback?.incorrect ?? "❌ Incorrect.")}
                </div>
              </div>
            )}
          </div>

          {/* Controls (locked: no back/skip/close) */}
          <div className="lpControlsRow justify-between">
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`lpBtn lpBtnPrimary ${!canGoNext ? "isDisabled" : ""}`}
              type="button"
              style={{ flex: 1 }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
