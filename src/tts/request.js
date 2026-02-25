// src/tts/request.js

function buildTeachingPrompt(text) {
  return ["Use a patient teaching tone: clear articulation, warm pace, and brief pauses after sentences.", text].join("\n");
}

export function buildTtsRequest(rawText, teachingToneOn) {
  const raw = String(rawText ?? "");
  const promptText = teachingToneOn ? buildTeachingPrompt(raw) : raw;

  // If you truly want the accent instruction to apply, it MUST be included in the text sent to Gemini.
  const finalText = [
    "Read the transcript in a British English accent (UK).",
    "Keep the transcript wording exactly the same (do not add or remove words).",
    promptText,
  ].join("\n");

  return {
    model: "gemini-2.5-flash-preview-tts",
    voiceName: "Kore",
    text: finalText,
  };
}
