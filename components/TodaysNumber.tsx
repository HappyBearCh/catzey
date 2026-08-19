import Link from 'next/link';
import { getTodaysNumber, destinyNumber } from '@/lib/numerology';
import type { Article } from '@/lib/types';

interface Props {
  articles?: Article[];
}

// The "Universal Day" number for today, plus which of the day's headlines
// numerologically vibrate to it — the daily numerological read of the news.
export function TodaysNumber({ articles = [] }: Props) {
  const today = getTodaysNumber();
  const profile = today.profile;
  const matches = articles.filter((a) => destinyNumber(a.title) === today.number).slice(0, 4);

  return (
    <section
      className="my-4 rounded-sm overflow-hidden border border-primary/30 bg-gradient-to-r from-[#1a1530] to-[#0f0b1e]"
      aria-label="Today's number"
    >
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Number */}
        <div className="flex items-center gap-4 px-5 py-4 sm:border-r border-b sm:border-b-0 border-white/10">
          <div
            className="flex-shrink-0 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: profile.color }}
          >
            <span className="text-3xl font-semibold leading-none">{today.number}</span>
          </div>
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-primary-accent">
              Today&apos;s Number
            </p>
            <p className="text-white font-semibold text-lg leading-tight">{profile.title}</p>
            <p className="text-2xs text-gray-400">{today.dateLabel}</p>
          </div>
        </div>

        {/* Meaning + matches */}
        <div className="flex-1 px-5 py-4 min-w-0">
          <p className="text-sm text-gray-200 leading-relaxed">
            The day vibrates to the <strong className="text-white">{today.number}</strong> — the
            energy of {profile.vibration}.
          </p>
          {matches.length > 0 && (
            <div className="mt-2">
              <p className="text-2xs font-semibold uppercase tracking-widest text-primary-accent mb-1">
                Headlines vibrating to {today.number}
              </p>
              <ul className="space-y-0.5">
                {matches.map((a) => (
                  <li key={a.id}>
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
            <Link
              href="/numerology/daily"
              className="inline-block text-2xs font-bold uppercase tracking-widest text-primary-accent hover:underline"
            >
              Read today&apos;s analysis →
            </Link>
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
