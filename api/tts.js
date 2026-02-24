// api/tts.js
export const config = {
  api: { bodyParser: true, responseLimit: "32mb" },
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url, options, { retries = 3, baseDelayMs = 250 } = {}) {
  let lastErrText = "";
  for (let attempt = 0; attempt <= retries; attempt++) {
    const resp = await fetch(url, options);
    if (resp.ok) return resp;

    lastErrText = await resp.text().catch(() => "");
    // Retry on transient 5xx and Gemini INTERNAL
    const shouldRetry = resp.status >= 500 && resp.status <= 599;

    if (!shouldRetry || attempt === retries) {
      const err = new Error("Gemini TTS request failed");
      err.status = resp.status;
      err.details = lastErrText;
      throw err;
    }

    // exponential backoff + jitter
    const jitter = Math.random() * 150;
    const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
    await sleep(delay);
  }
  // should never reach
  throw new Error(lastErrText || "Unknown error");
}

function pcm16leToWav(pcmBuffer, { sampleRate = 24000, channels = 1 } = {}) {
  const bitsPerSample = 16;
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY env var" });

  const { text, voiceName = "Kore", model = "gemini-2.5-flash-preview-tts" } = req.body || {};
  const raw = String(text ?? "");
  if (!raw.trim()) return res.status(400).json({ error: "Missing text" });

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

    const resp = await fetchWithRetry(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: raw }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
          },
        }),
      },
      { retries: 3, baseDelayMs: 300 },
    );

    const json = await resp.json();
    const b64 = json?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!b64) return res.status(500).json({ error: "No audio data returned from Gemini" });

    const pcm = Buffer.from(b64, "base64");
    const wav = pcm16leToWav(pcm, { sampleRate: 24000, channels: 1 });

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(wav);
  } catch (e) {
    return res.status(e.status || 500).json({
      error: "Gemini TTS request failed",
      status: e.status || 500,
      details: String(e.details || e.message || e),
    });
  }
}
