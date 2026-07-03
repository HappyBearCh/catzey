import type { ReviewData } from './types';

export const RATING_SCALE = 10;

/**
 * Resolve a single 1–10 score for a review: the explicit overall if present,
 * otherwise the average of whichever sub-scores exist. Returns null when the
 * article carries no usable score (so callers can skip Review schema entirely).
 */
export function reviewOverall(r: ReviewData | null | undefined): number | null {
  if (!r) return null;
  if (typeof r.overall === 'number') return r.overall;
  const subs = [r.story, r.art, r.pacing, r.characters].filter(
    (n): n is number => typeof n === 'number',
  );
  if (subs.length === 0) return null;
  return Math.round((subs.reduce((a, b) => a + b, 0) / subs.length) * 10) / 10;
}
