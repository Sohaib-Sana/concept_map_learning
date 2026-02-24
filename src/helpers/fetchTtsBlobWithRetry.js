// ✅ Put this helper somewhere above speak() (inside App.jsx, outside the component or inside App()).
export async function fetchTtsBlobWithRetry(payload, { tries = 2, baseDelayMs = 250 } = {}) {
  let lastText = "";
  for (let attempt = 0; attempt < tries; attempt++) {
    const resp = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (resp.ok) return await resp.blob();

    lastText = await resp.text().catch(() => "");
    // retry only on transient server errors
    if (resp.status < 500 || resp.status > 599) break;

    const jitter = Math.random() * 150;
    const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
    await new Promise((r) => setTimeout(r, delay));
  }

  throw new Error(`TTS failed: ${lastText.slice(0, 800)}`);
}
