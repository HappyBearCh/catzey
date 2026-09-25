'use client';

import { getProfile } from '@/lib/numerology';
import { useToday } from './useToday';

// The front page's title plate: the day's numeral struck between two rules,
// and the reading under it. Both the seal and the line hold their exact
// geometry before the reader's clock is read (see useToday), so nothing on
// the page moves when the number arrives.
export function TodayPlate() {
  const today = useToday();

  return (
    <>
      <div className="flex items-center justify-center gap-5 mb-8" aria-hidden="true">
        <span className="block w-10 h-0.5 bg-ink/30 dark:bg-parchment/30" />
        <span className="sigil sigil-xl">{today?.number}</span>
        <span className="block w-10 h-0.5 bg-ink/30 dark:bg-parchment/30" />
      </div>
      <p className="eyebrow mb-10">
        {today ? (
          <>
            Today vibrates to {today.number} · {getProfile(today.number).keyword}
          </>
        ) : (
          ' '
        )}
      </p>
    </>
  );
}
