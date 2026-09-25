import { destinyNumber } from '@/lib/numerology';
import { GROUP_NUMBERS } from '@/lib/number-groups';
import type { Article } from '@/lib/types';
import { TodaysNumberPanel, type HeadlineMatch } from './TodaysNumberPanel';

interface Props {
  articles?: Article[];
}

const MATCHES_SHOWN = 4;

// Which texts vibrate to which number is a property of the edition, so it is
// worked out here, at build time — but for all twelve numbers, because the
// panel does not learn which one it needs until it is running in the reader's
// browser and can see the date.
export function TodaysNumber({ articles = [] }: Props) {
  const matches: Record<number, HeadlineMatch[]> = {};
  for (const n of GROUP_NUMBERS) matches[n] = [];

  for (const a of articles) {
    const bucket = matches[destinyNumber(a.title)];
    if (bucket && bucket.length < MATCHES_SHOWN) {
      bucket.push({ slug: a.slug, title: a.title });
    }
  }

  return <TodaysNumberPanel matches={matches} />;
}
