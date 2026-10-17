'use client';

import { useToday } from './useToday';

// The day's number in the masthead margin. The container is rendered either
// way so the wordmark sits in the same place before and after the clock is
// read; only the seal itself waits.
export function TodaySigil() {
  const today = useToday();

  return (
    <div className="hidden md:flex items-center w-7 h-7">
      {today && (
        <span className="sigil sigil-sm" title={`Today's number · ${today.dateLabel}`}>
          {today.number}
        </span>
      )}
    </div>
  );
}
