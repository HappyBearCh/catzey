import { readTitle, getProfile, type ReducedValue } from '@/lib/numerology';

interface Props {
  title: string;
  // Optional label describing what is being read, e.g. "This headline"
  subject?: string;
  className?: string;
}

function NumberBadge({
  n,
  label,
  sub,
}: {
  n: number;
  label: string;
  sub: string;
}) {
  const profile = getProfile(n);
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl font-black text-white shadow-md"
        style={{ backgroundColor: profile.color }}
      >
        {n || '—'}
      </div>
      <span className="mt-2 text-2xs font-black uppercase tracking-widest text-primary">
        {label}
      </span>
      <span className="text-2xs text-gray-500 dark:text-gray-400 leading-tight">{sub}</span>
    </div>
  );
}

function stepsText(r: ReducedValue): string {
  return r.steps.length > 1 ? r.steps.join(' → ') : String(r.raw);
}

// A numerological reading of a headline/title — the numbers, the meaning, and a
// letter-by-letter breakdown. Rendered on every article and reusable elsewhere.
export function NumerologyPanel({ title, subject = 'This headline', className = '' }: Props) {
  const reading = readTitle(title);
  const profile = reading.profile;

  return (
    <section
      className={`rounded-sm overflow-hidden border border-primary/30 ${className}`}
      aria-label="Numerological reading"
    >
      {/* Header strip */}
      <div className="bg-gradient-to-r from-[#1a1530] to-[#0f0b1e] px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-primary-accent text-lg leading-none">✦</span>
          <h2 className="text-xs font-black uppercase tracking-widest text-primary-accent">
            Numerological Reading
          </h2>
        </div>
        <p className="mt-1.5 text-sm text-gray-300 leading-relaxed">
          {subject} carries a <strong className="text-white">Destiny Number {reading.destiny}</strong> —{' '}
          <span className="text-primary-accent font-semibold">{profile.title}</span>. A vibration of{' '}
          {profile.vibration}.
        </p>
      </div>

      <div className="bg-white dark:bg-site-dark-2 px-5 py-5">
        {/* The three core numbers */}
        <div className="flex items-start justify-around gap-3 mb-5">
          <NumberBadge n={reading.destiny} label="Destiny" sub="Full title" />
          <NumberBadge n={reading.heartDesire} label="Heart" sub="Vowels" />
          <NumberBadge n={reading.dream} label="Personality" sub="Consonants" />
        </div>

        {/* Meaning */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {profile.meaning}
        </p>

        {/* Keyword tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {profile.keywords.map((k) => (
            <span
              key={k}
              className="text-2xs font-semibold px-2 py-0.5 bg-site-light text-primary border border-site-border rounded-sm dark:bg-primary/10 dark:border-primary/30 dark:text-primary-accent"
            >
              {k}
            </span>
          ))}
        </div>

        {/* Letter breakdown */}
        <div className="border-t border-site-border pt-4">
          <h3 className="text-2xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
            How the numbers are built
          </h3>
          <div className="flex flex-wrap gap-1 mb-3" aria-hidden="true">
            {reading.breakdown.chars.map((c, i) =>
              c.letter ? (
                <span
                  key={i}
                  className={`inline-flex flex-col items-center justify-center w-6 rounded-sm text-2xs font-bold leading-none py-1 ${
                    c.isVowel
                      ? 'bg-primary-accent/15 text-primary-dark dark:text-primary-accent'
                      : 'bg-primary/10 text-primary'
                  }`}
                  title={`${c.letter} = ${c.value}${c.isVowel ? ' (vowel)' : ''}`}
                >
                  <span className="uppercase">{c.letter}</span>
                  <span className="opacity-60">{c.value}</span>
                </span>
              ) : (
                <span key={i} className="w-2" />
              ),
            )}
          </div>
          <dl className="grid grid-cols-3 gap-2 text-2xs text-gray-600 dark:text-gray-400">
            <div>
              <dt className="font-black uppercase tracking-wider text-primary">Destiny</dt>
              <dd>
                {stepsText(reading.breakdown.destiny)} = <strong>{reading.destiny}</strong>
              </dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-wider text-primary">Heart</dt>
              <dd>
                {stepsText(reading.breakdown.heartDesire)} = <strong>{reading.heartDesire}</strong>
              </dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-wider text-primary">Personality</dt>
              <dd>
                {stepsText(reading.breakdown.dream)} = <strong>{reading.dream}</strong>
              </dd>
            </div>
          </dl>
        </div>

        <p className="mt-4 text-2xs text-gray-400 dark:text-gray-500 leading-relaxed">
          Every headline is reduced with standard Pythagorean numerology — each letter mapped to a
          digit 1–9, summed, and reduced to a single digit or master number. A lens for paying
          attention, not a forecast.
        </p>
      </div>
    </section>
  );
}
