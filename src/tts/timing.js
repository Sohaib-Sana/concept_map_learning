// src/tts/timing.js

export function buildSpans(raw) {
  const spans = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(raw))) spans.push({ start: m.index, end: m.index + m[0].length });
  return spans;
}

function tokenWeight(token) {
  const punct = /[.?!,:;)]$/.test(token) ? 6 : 0;
  const dash = /—|–/.test(token) ? 4 : 0;
  return token.length + punct + dash;
}

export function buildCumulativeTimes(raw, spans, durationSec) {
  if (spans.length === 0) return [];

  const tokens = spans.map((s) => raw.slice(s.start, s.end));
  const weights = tokens.map(tokenWeight);
  const total = weights.reduce((a, b) => a + b, 0) || 1;

  // If duration is not available from metadata, estimate it from token count.
  // This helps produce reasonable timings so reveal triggers can still fire
  // even when the audio element doesn't expose a valid duration immediately.
  let useDuration = durationSec;
  if (!useDuration || !isFinite(useDuration) || useDuration <= 0) {
    const AVG_SEC_PER_WORD = 0.35; // ~171 wpm
    useDuration = Math.max(0.5, tokens.length * AVG_SEC_PER_WORD);
  }

  let acc = 0;
  const cum = weights.map((w) => {
    acc += (w / total) * useDuration;
    return acc;
  });

  cum[cum.length - 1] = useDuration;
  return cum;
}

export function findTokenIndexAtTime(cumTimes, t) {
  let lo = 0;
  let hi = cumTimes.length - 1;
  let ans = hi;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (t <= cumTimes[mid]) {
      ans = mid;
      hi = mid - 1;
    } else lo = mid + 1;
  }
  return ans;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function highlightRangeFromToken(raw, spans, tokenIndex, HIGHLIGHT_WORDS, LOOKAHEAD_WORDS) {
  if (!spans.length) return null;
  const i = clamp(tokenIndex, 0, spans.length - 1);

  const startToken = Math.max(0, i - (HIGHLIGHT_WORDS - 1));
  const endToken = Math.min(spans.length - 1, i + LOOKAHEAD_WORDS);

  const start = spans[startToken].start;
  const end = endToken + 1 < spans.length ? spans[endToken + 1].start : raw.length;

  return { start, end };
}

export function normalizeTextForMatch(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[“”"'.!,?:;()\-—–]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findPhraseTokenRange(raw, phrase) {
  const spans = buildSpans(raw);
  if (!spans.length || !phrase) return null;

  const tokens = spans.map((s) => raw.slice(s.start, s.end));

  const normalizedTokens = tokens.map((t) =>
    t
      .toLowerCase()
      .replace(/[“”"'.!,?:;()\-—–]/g, "")
      .trim(),
  );

  const phraseTokens = String(phrase)
    .toLowerCase()
    .replace(/[“”"'.!,?:;()\-—–]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (!phraseTokens.length) return null;

  const validIndices = [];
  for (let i = 0; i < normalizedTokens.length; i++) {
    if (normalizedTokens[i]) validIndices.push(i);
  }

  for (let i = 0; i <= validIndices.length - phraseTokens.length; i++) {
    let ok = true;

    for (let j = 0; j < phraseTokens.length; j++) {
      const rawTokenIndex = validIndices[i + j];
      if (normalizedTokens[rawTokenIndex] !== phraseTokens[j]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      return {
        start: validIndices[i],
        end: validIndices[i + phraseTokens.length - 1],
      };
    }
  }

  return null;
}
