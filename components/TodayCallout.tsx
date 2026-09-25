'use client';

import { getProfile } from '@/lib/numerology';
import { useToday } from './useToday';

// The "today is an N day" box on the numerology guide. The day comes from the
// reader's clock (see useToday); until it does, the box keeps its shape and
// says nothing rather than reporting the day the site was built.
export function TodayCallout() {
  const today = useToday();
  const profile = today ? getProfile(today.number) : null;

  return (
    <div
      className="mb-10 border-2 border-ink dark:border-parchment bg-ground px-5 py-4 flex items-center gap-4"
      aria-busy={!today}
    >
      <div
        className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
        style={{ backgroundColor: profile?.color ?? 'rgba(255,255,255,0.08)' }}
      >
        {today?.number}
      </div>
      <div className="min-w-0">
        {today && profile ? (
          <p className="text-sm text-gray-200 leading-relaxed">
            <span className="font-semibold text-primary-accent uppercase tracking-widest text-2xs block mb-0.5">
              Today is a {today.number} day
            </span>
            {profile.title} — {profile.vibration}.
          </p>
        ) : (
          <>
            <span className="block h-2 w-32 rounded-sm bg-white/10" />
            <span className="mt-2 block h-3 w-56 max-w-full rounded-sm bg-white/[0.06]" />
          </>
        )}
      </div>
    </div>
  );
}
