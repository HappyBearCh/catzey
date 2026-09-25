'use client';

import Link from 'next/link';
import { getProfile } from '@/lib/numerology';
import { useToday } from './useToday';

export interface HeadlineMatch {
  slug: string;
  title: string;
}

interface Props {
  /** Every number's matching headlines, worked out at build time. */
  matches: Record<number, HeadlineMatch[]>;
}

// The "Universal Day" number for today, plus which of the reference's texts
// numerologically vibrate to it. The day is read from the reader's clock
// (see useToday), so until that resolves the panel shows its own outline
// rather than a number it would have to take back.
export function TodaysNumberPanel({ matches }: Props) {
  const today = useToday();
  const profile = today ? getProfile(today.number) : null;
  const vibrating = today ? matches[today.number] ?? [] : [];

  return (
    <section
      className="my-4 rounded-sm overflow-hidden border-2 border-ink dark:border-parchment bg-ground"
      aria-label="Today's number"
      aria-busy={!today}
    >
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Number */}
        <div className="flex items-center gap-4 px-5 py-4 sm:border-r border-b sm:border-b-0 border-white/10">
          <div
            className="flex-shrink-0 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: profile?.color ?? 'rgba(255,255,255,0.08)' }}
          >
            <span className="text-3xl font-semibold leading-none">{today?.number}</span>
          </div>
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-primary-accent">
              Today&apos;s Number
            </p>
            {today && profile ? (
              <>
                <p className="text-white font-semibold text-lg leading-tight">{profile.title}</p>
                <p className="text-2xs text-gray-400">{today.dateLabel}</p>
              </>
            ) : (
              <>
                <span className="mt-1.5 block h-3.5 w-40 rounded-sm bg-white/10" />
                <span className="mt-1.5 block h-2 w-28 rounded-sm bg-white/[0.06]" />
              </>
            )}
          </div>
        </div>

        {/* Meaning + matches */}
        <div className="flex-1 px-5 py-4 min-w-0">
          {today && profile ? (
            <p className="text-sm text-gray-200 leading-relaxed">
              The day vibrates to the <strong className="text-white">{today.number}</strong> — the
              energy of {profile.vibration}.
            </p>
          ) : (
            <>
              <span className="block h-3 w-full max-w-sm rounded-sm bg-white/10" />
              <span className="mt-2 block h-3 w-2/3 max-w-xs rounded-sm bg-white/[0.06]" />
            </>
          )}
          {today && vibrating.length > 0 && (
            <div className="mt-2">
              <p className="text-2xs font-semibold uppercase tracking-widest text-primary-accent mb-1">
                Texts vibrating to {today.number}
              </p>
              <ul className="space-y-0.5">
                {vibrating.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/article/${a.slug}`}
                      className="text-xs text-gray-300 hover:text-primary-accent transition-colors line-clamp-1"
                    >
                      › {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {today && (
              <Link
                href={`/number/${today.number}`}
                className="inline-block text-2xs font-bold uppercase tracking-widest text-primary-accent hover:underline"
              >
                Open the {today.number} shelf →
              </Link>
            )}
            <Link
              href="/numerology"
              className="inline-block text-2xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary-accent"
            >
              What the numbers mean →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
