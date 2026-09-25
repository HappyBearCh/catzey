'use client';

import { useEffect, useState } from 'react';
import { getTodaysNumber, type TodaysNumber } from '@/lib/numerology';

// What day it is is a fact about the reader, not about the edition.
//
// Every public page is prerendered once and served as a static file, so a
// `new Date()` evaluated while rendering reports the *build* clock: the day's
// number and its date label froze on the deploy that produced the HTML and
// never moved again. Reading the clock after mount is the only way a static
// page can tell what day the reader is having, and it costs nothing — the
// Universal Day figure is arithmetic on the calendar, not a lookup.
//
// Returns null on the server and on the first client render so the two agree
// and hydration stays quiet. Call sites hold their layout with a placeholder
// until it resolves, and read correctly if it never does.
export function useToday(): TodaysNumber | null {
  const [today, setToday] = useState<TodaysNumber | null>(null);
  useEffect(() => setToday(getTodaysNumber()), []);
  return today;
}
