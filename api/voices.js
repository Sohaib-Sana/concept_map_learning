// api/voices.js
export default async function handler(req, res) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing ELEVENLABS_API_KEY env var" });

  try {
    const resp = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": apiKey },
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return res.status(resp.status).json({
        error: "Failed to fetch voices",
        status: resp.status,
        details: data,
      });
    }

    // Return minimal data (id + name)
    const voices = (data.voices ?? []).map((v) => ({
      voice_id: v.voice_id,
      name: v.name,
      category: v.category,
    }));

    return res.status(200).json({ voices });
  } catch (e) {
    return res.status(500).json({
      error: "Failed to fetch voices",
      details: String(e?.message || e),
    });
  }
}
