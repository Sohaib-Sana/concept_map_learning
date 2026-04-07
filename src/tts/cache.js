// src/tts/cache.js
const TTS_CACHE_NAME = "elevenlabs-tts-v2";

// Create a stable cache key URL (must be a valid URL for CacheStorage)
function makeCacheRequest(hash) {
  return new Request(`https://tts-cache.local/${hash}.mp3`, { method: "GET" });
}

export async function sha256Base64Url(input) {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function getCachedAudioBlob(hash) {
  try {
    if (!("caches" in window)) return null;
    const cache = await caches.open(TTS_CACHE_NAME);
    const req = makeCacheRequest(hash);
    const match = await cache.match(req);
    if (!match) return null;
    return await match.blob();
  } catch {
    return null;
  }
}

export async function putCachedAudioBlob(hash, blob) {
  try {
    if (!("caches" in window)) return;
    const cache = await caches.open(TTS_CACHE_NAME);
    const req = makeCacheRequest(hash);
    const res = new Response(blob, {
      headers: {
        "Content-Type": blob.type || "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
    await cache.put(req, res);
  } catch {
    // ignore cache errors
  }
}

export async function hashForTtsRequest(ttsReq) {
  // The hash MUST be derived from exactly what affects the output.
  const payload = JSON.stringify({ v: 2, ...ttsReq });
  try {
    return await sha256Base64Url(payload);
  } catch {
    return `${payload.length}-${String(ttsReq.text ?? "").length}`;
  }
}
