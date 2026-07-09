import { readTitle, getProfile } from '@/lib/numerology';
import { getCategoryLabel } from '@/lib/types';

interface Props {
  slug: string;
}

// A compact numerological read of a whole category — the name reduced to its
// governing number, shown atop the category archive so every section carries the
// numerological lens.
export function CategoryNumerology({ slug }: Props) {
  const label = getCategoryLabel(slug);
  const reading = readTitle(label);
  const profile = getProfile(reading.destiny);

  return (
    <section
      className="mb-6 rounded-sm border border-primary/30 bg-gradient-to-r from-[#1a1530] to-[#0f0b1e] px-5 py-4 flex items-center gap-5"
      aria-label={`Numerology of ${label}`}
    >
      <div
        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg"
        style={{ backgroundColor: profile.color }}
      >
        <span className="text-3xl md:text-4xl font-black leading-none">{reading.destiny}</span>
        <span className="text-[0.55rem] uppercase tracking-widest opacity-80 mt-0.5">Number</span>
      </div>
      <div className="min-w-0">
        <p className="text-2xs font-black uppercase tracking-widest text-primary-accent mb-1">
          The Numerology of {label}
        </p>
        <p className="text-sm text-gray-200 leading-relaxed">
          <strong className="text-white">{label}</strong> vibrates to the number{' '}
          <strong className="text-white">{reading.destiny}</strong> — {profile.title.toLowerCase()},
          the energy of {profile.vibration}. {profile.meaning}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {profile.keywords.slice(0, 4).map((k) => (
            <span
              key={k}
              className="text-2xs font-semibold px-2 py-0.5 rounded-sm bg-white/10 text-primary-accent border border-white/10"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
