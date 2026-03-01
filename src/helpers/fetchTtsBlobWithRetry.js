// src/helpers/fetchTtsBlobWithRetry.js

const MAX_CONCURRENT_TTS = 2;

// --------------------
// Tiny semaphore (no deps)
// --------------------
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
// In-flight dedupe (same payload => same Promise)
// --------------------
const inFlight = new Map();

function stableKey(payload) {
  // For your payload shape (voiceId, modelId, outputFormat, voiceSettings, text),
  // JSON.stringify is stable enough. If you later add non-deterministic fields,
  // consider stripping them here.
  try {
    return JSON.stringify(payload);
  } catch {
    // Fallback (should be rare)
    return String(payload);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseRetryAfterMs(resp) {
  const ra = resp.headers?.get?.("Retry-After");
  if (!ra) return null;

  // Retry-After can be seconds or an HTTP date; handle seconds only (most common).
  const secs = Number(ra);
  if (Number.isFinite(secs) && secs >= 0) return secs * 1000;

  return null;
}

async function fetchBlobWithRetryInternal(payload, { tries = 4, baseDelayMs = 400 } = {}) {
  let lastText = "";

  for (let attempt = 0; attempt < tries; attempt++) {
    const resp = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (resp.ok) return await resp.blob();

    lastText = await resp.text().catch(() => "");

    const shouldRetry = resp.status === 429 || (resp.status >= 500 && resp.status <= 599);

    if (!shouldRetry || attempt === tries - 1) break;

    const retryAfterMs = parseRetryAfterMs(resp);
    const jitter = Math.random() * 200;
    const expBackoff = baseDelayMs * Math.pow(2, attempt);
    const delay = Math.max(retryAfterMs ?? 0, expBackoff + jitter);

    await sleep(delay);
  }

  throw new Error(`TTS failed: ${lastText.slice(0, 800)}`);
}

/**
 * Public API (unchanged name).
 * Now includes:
 * - concurrency limiting to 2
 * - single-flight dedupe
 * - retry on 429 + 5xx
 */
export async function fetchTtsBlobWithRetry(payload, opts) {
  const key = stableKey(payload);

  if (inFlight.has(key)) return inFlight.get(key);

  const p = (async () => {
    const release = await ttsSemaphore.acquire();
    try {
      return await fetchBlobWithRetryInternal(payload, opts);
    } finally {
      release();
    }
  })().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, p);
  return p;
}
