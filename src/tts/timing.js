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
  if (!durationSec || !isFinite(durationSec) || durationSec <= 0 || spans.length === 0) return [];

  const tokens = spans.map((s) => raw.slice(s.start, s.end));
  const weights = tokens.map(tokenWeight);
  const total = weights.reduce((a, b) => a + b, 0) || 1;

  let acc = 0;
  const cum = weights.map((w) => {
    acc += (w / total) * durationSec;
    return acc;
  });

  cum[cum.length - 1] = durationSec;
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
