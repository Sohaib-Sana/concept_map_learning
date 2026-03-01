// api/tts.js
import crypto from "node:crypto";
import { head, put } from "@vercel/blob";

export const config = {
  api: { bodyParser: true, responseLimit: "32mb" },
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --------------------
// Server-side semaphore (best-effort per instance)
// --------------------
const MAX_CONCURRENT_TTS = 2;

function createSemaphore(max) {
  let active = 0;
  const queue = [];

  const acquire = () =>
    new Promise((resolve) => {
      const grant = () => {
        active += 1;
        resolve(() => {
          active -= 1;
          const next = queue.shift();
          if (next) next();
        });
      };

      if (active < max) grant();
      else queue.push(grant);
    });

  return { acquire };
}

const ttsSemaphore = createSemaphore(MAX_CONCURRENT_TTS);

// --------------------
// Single-flight by cache key (avoid duplicate TTS for same text/settings)
// --------------------
const inFlightByKey = new Map();

function parseRetryAfterMs(resp) {
  const ra = resp.headers?.get?.("Retry-After");
  if (!ra) return null;

  const secs = Number(ra);
  if (Number.isFinite(secs) && secs >= 0) return secs * 1000;

  return null;
}

async function fetchWithRetry(url, options, { retries = 4, baseDelayMs = 300 } = {}) {
  let lastErrText = "";
  let lastStatus = 0;
  let lastRetryAfterMs = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const resp = await fetch(url, options);

    if (resp.ok) return resp;

    lastStatus = resp.status;
    lastRetryAfterMs = parseRetryAfterMs(resp);
    lastErrText = await resp.text().catch(() => "");

    const shouldRetry = resp.status === 429 || (resp.status >= 500 && resp.status <= 599);

    if (!shouldRetry || attempt === retries) {
      const err = new Error("ElevenLabs TTS request failed");
      err.status = resp.status;
      err.details = lastErrText;
      if (lastRetryAfterMs != null) err.retryAfterMs = lastRetryAfterMs;
      throw err;
    }

    const jitter = Math.random() * 200;
    const expBackoff = baseDelayMs * Math.pow(2, attempt) + jitter;
    const delay = Math.max(lastRetryAfterMs ?? 0, expBackoff);

    await sleep(delay);
  }

  const err = new Error("ElevenLabs TTS request failed");
  err.status = lastStatus || 500;
  err.details = lastErrText || "Unknown error";
  if (lastRetryAfterMs != null) err.retryAfterMs = lastRetryAfterMs;
  throw err;
}

// Bump this if you want to invalidate ALL old cached audio at once
const CACHE_VERSION = "tts-v3-elevenlabs-autovoice";

function normalizeText(s) {
  return String(s ?? "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function makeCacheKey({ requestedVoiceId, usedVoiceId, modelId, outputFormat, voiceSettings, text }) {
  const canonical = {
    v: CACHE_VERSION,
    provider: "elevenlabs",
    requestedVoiceId: requestedVoiceId || "",
    usedVoiceId: usedVoiceId || "",
    modelId: modelId || "",
    outputFormat: outputFormat || "",
    voiceSettings: voiceSettings || null,
    text: normalizeText(text),
  };
  return crypto.createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

async function getVoices(apiKey) {
  const resp = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": apiKey },
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const err = new Error("Failed to fetch voices");
    err.status = resp.status;
    err.details = JSON.stringify(data);
    throw err;
  }
  return data.voices ?? [];
}

function pickFallbackVoiceId(voices) {
  // simplest: first voice returned by the account
  return voices?.[0]?.voice_id || null;
}

async function callElevenLabsTts({ apiKey, voiceId, outputFormat, text, modelId, voiceSettings }) {
  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(outputFormat)}`;

  const resp = await fetchWithRetry(
    endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: voiceSettings,
      }),
    },
    { retries: 4, baseDelayMs: 300 },
  );

  const audioArrayBuffer = await resp.arrayBuffer();
  return Buffer.from(audioArrayBuffer);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing ELEVENLABS_API_KEY env var" });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ error: "Missing BLOB_READ_WRITE_TOKEN (Vercel Blob)" });
  }

  const {
    text,
    voiceId: requestedVoiceId = "", // may be empty
    modelId = "eleven_multilingual_v2",
    outputFormat = "mp3_44100_128",
    voiceSettings = {
      stability: 0.45,
      similarity_boost: 0.85,
      style: 0.2,
      use_speaker_boost: true,
    },
  } = req.body || {};

  const raw = String(text ?? "");
  if (!raw.trim()) return res.status(400).json({ error: "Missing text" });

  // Limit overall concurrency to reduce ElevenLabs 429s (best-effort per instance)
  const release = await ttsSemaphore.acquire();

  try {
    // 1) Resolve voice
    let voices = null;
    let usedVoiceId = requestedVoiceId;

    if (!usedVoiceId) {
      voices = await getVoices(apiKey);
      usedVoiceId = pickFallbackVoiceId(voices);
      if (!usedVoiceId) {
        return res.status(500).json({ error: "No voices available on this ElevenLabs account." });
      }
      res.setHeader("X-TTS-Voice", "AUTO");
    } else {
      res.setHeader("X-TTS-Voice", "REQUESTED");
    }

    // 2) Cache key includes requested + used
    const key = makeCacheKey({
      requestedVoiceId,
      usedVoiceId,
      modelId,
      outputFormat,
      voiceSettings,
      text: raw,
    });

    const ext = "mp3";
    const pathname = `tts/${key}.${ext}`;

    // 3) Cache lookup
    const cached = await head(pathname).catch(() => null);
    if (cached?.url) {
      res.setHeader("X-TTS-Cache", "HIT");
      res.statusCode = 303;
      res.setHeader("Location", cached.url);
      return res.end();
    }

    // 3.5) Single-flight: if same key is being generated, await it.
    if (inFlightByKey.has(key)) {
      const blobUrl = await inFlightByKey.get(key);
      res.setHeader("X-TTS-Cache", "WAIT");
      res.statusCode = 303;
      res.setHeader("Location", blobUrl);
      return res.end();
    }

    const generationPromise = (async () => {
      // 4) Generate audio (with fallback if 402)
      let audioBuffer;
      try {
        audioBuffer = await callElevenLabsTts({
          apiKey,
          voiceId: usedVoiceId,
          outputFormat,
          text: raw,
          modelId,
          voiceSettings,
        });
      } catch (e) {
        if (e?.status === 402) {
          voices = voices || (await getVoices(apiKey));
          const fallbackId = pickFallbackVoiceId(voices);

          if (!fallbackId) {
            const err = new Error("No fallback voice available on this account.");
            err.status = 402;
            throw err;
          }

          usedVoiceId = fallbackId;
          // Note: headers will be set on the outer response; for single-flight callers, cache key already decided.
          audioBuffer = await callElevenLabsTts({
            apiKey,
            voiceId: usedVoiceId,
            outputFormat,
            text: raw,
            modelId,
            voiceSettings,
          });
        } else {
          throw e;
        }
      }

      // 5) Store in Blob (public) with long cache max-age
      const blob = await put(pathname, audioBuffer, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: "audio/mpeg",
        cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year
      });

      return blob.url;
    })();

    inFlightByKey.set(key, generationPromise);

    let blobUrl;
    try {
      blobUrl = await generationPromise;
    } finally {
      inFlightByKey.delete(key);
    }

    res.setHeader("X-TTS-Cache", "MISS");
    res.statusCode = 303;
    res.setHeader("Location", blobUrl);
    return res.end();
  } catch (e) {
    // If we still hit 429 (multi-instance scale), pass back Retry-After if known
    if (e?.status === 429 && e?.retryAfterMs != null) {
      res.setHeader("Retry-After", String(Math.ceil(e.retryAfterMs / 1000)));
    }

    return res.status(e.status || 500).json({
      error: "ElevenLabs TTS request failed",
      status: e.status || 500,
      details: String(e.details || e.message || e),
    });
  } finally {
    release();
  }
}
