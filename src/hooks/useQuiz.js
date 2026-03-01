// src/hooks/useQuiz.js
import { useCallback, useMemo, useState } from "react";

export function useQuiz(quizDef) {
  const questions = quizDef?.questions ?? [];

  const [mode, setMode] = useState("idle"); // "idle" | "inProgress" | "complete"
  const [qIndex, setQIndex] = useState(0);
  const [answerByIndex, setAnswerByIndex] = useState({}); // { [qIndex]: { selectedIndex, isCorrect } }

  const current = questions[qIndex] ?? null;

  const currentFeedback = useMemo(() => answerByIndex[qIndex] ?? null, [answerByIndex, qIndex]);

  const progressText = useMemo(() => {
    if (!questions.length) return "";
    return `${Math.min(qIndex + 1, questions.length)}/${questions.length}`;
  }, [qIndex, questions.length]);

  const score = useMemo(() => {
    const vals = Object.values(answerByIndex);
    return vals.reduce((sum, v) => sum + (v?.isCorrect ? 1 : 0), 0);
  }, [answerByIndex]);

  const startQuiz = useCallback(() => {
    setMode("inProgress");
    setQIndex(0);
    setAnswerByIndex({});
  }, []);

  const answer = useCallback(
    (selectedIndex) => {
      if (mode !== "inProgress") return;
      if (!current) return;

      // lock after first selection
      if (answerByIndex[qIndex]) return;

      const isCorrect = selectedIndex === current.correctIndex;
      setAnswerByIndex((prev) => ({
        ...prev,
        [qIndex]: { selectedIndex, isCorrect },
      }));
    },
    [mode, current, answerByIndex, qIndex],
  );

  const next = useCallback(() => {
    if (mode !== "inProgress") return;

    // cannot skip: must answer first
    if (!answerByIndex[qIndex]) return;

    const last = qIndex >= questions.length - 1;
    if (last) {
      setMode("complete");
      return;
    }
    setQIndex((i) => i + 1);
  }, [mode, answerByIndex, qIndex, questions.length]);

  return {
    mode,
    startQuiz,
    currentQuestion: current,
    questionIndex: qIndex,
    questionCount: questions.length,
    progressText,
    currentFeedback,
    answer,
    next,
    score,
  };
}
