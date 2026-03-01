// src/tts/request.js

export function buildTtsRequest(rawText, teachingToneOn) {
  const raw = String(rawText ?? "").trim();

  // Optional: slightly adjust voice settings when teachingToneOn is enabled
  // (These are safe knobs; tweak as you like.)
  const voiceSettings = teachingToneOn
    ? {
        stability: 0.55,
        similarity_boost: 0.85,
        style: 0.25,
        use_speaker_boost: true,
      }
    : {
        stability: 0.45,
        similarity_boost: 0.85,
        style: 0.2,
        use_speaker_boost: true,
      };

  return {
    // Leave empty to let the server pick a usable voice automatically
    voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID || "",

    modelId: "eleven_multilingual_v2",
    outputFormat: "mp3_44100_128",

    voiceSettings,

    // IMPORTANT: send ONLY the text you want spoken
    text: raw,
  };
}
