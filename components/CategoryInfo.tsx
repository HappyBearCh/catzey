import Link from 'next/link';
import { CATEGORY_INFO } from '@/lib/category-info';
import { titleValue, getGroup } from '@/lib/number-groups';
import { reduce } from '@/lib/numerology';

// A milestone year is a number the history already contained, so it reduces
// like anything else. Ranges and decades ("2010s") do not, and get nothing
// rather than a guess.
function yearValue(year: string): number | null {
  return /^\d{4}$/.test(year) ? reduce(Number(year)) : null;
}

interface Props {
  slug: string;
}

export function CategoryInfo({ slug }: Props) {
  const info = CATEGORY_INFO[slug];
  if (!info) return null;

  return (
    <div className="mb-10 overflow-hidden panel">
      {/* Header strip */}
      <div className="bg-ground px-6 py-5 border-b border-white/10 flex items-start justify-between gap-6">
        <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">
          {info.intro}{' '}
          <span className="text-primary-accent">
            The dates below carry their own reductions, and every name is a way into its shelf.
          </span>
        </p>
        <Link
          href={`/${slug}/guide`}
          className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-primary-accent border border-primary-accent/40 px-3 py-1.5 hover:bg-primary-accent/10 transition-colors whitespace-nowrap"
        >
          Full Guide →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink dark:divide-parchment bg-paper dark:bg-ground tone-fill">
        {/* Timeline */}
        <div className="px-6 py-5">
          <h3 className="panel-head -mx-6 -mt-5 mb-4">Key Milestones</h3>
          <ol className="space-y-3">
            {info.history.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 mt-0.5 text-2xs font-semibold text-white bg-primary px-1.5 py-0.5 rounded-sm min-w-[3rem] text-center">
                  {item.year}
                </span>
                {yearValue(item.year) !== null && (
                  <span
                    className="flex-shrink-0 mt-0.5 text-2xs font-display text-gold"
                    title={`${item.year} reduces to ${yearValue(item.year)}`}
                  >
                    {yearValue(item.year)}
                  </span>
                )}
                <p className="text-xs text-gray-600 leading-relaxed">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Facts + Notable Works */}
        <div className="px-6 py-5 space-y-6">
          <div>
            <h3 className="panel-head -mx-6 -mt-5 mb-4">Did You Know?</h3>
            <ul className="space-y-2.5">
              {info.facts.map((fact, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-accent mt-1.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{fact}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="panel-head -mx-6 mb-3">Notable Works &amp; Names</h3>
            {/* Each name carries its own shelf, so the tag doubles as a way in
                to everything else that reduced the same way. */}
            <div className="flex flex-wrap gap-2">
              {info.notableWorks.map((work) => {
                const n = titleValue(work);
                return (
                  <Link
                    key={work}
                    href={`/number/${n}`}
                    title={`${work} reduces to ${n} — ${getGroup(n).shelf}`}
                    className="text-xs font-semibold px-2.5 py-1 bg-site-light text-primary border border-site-border rounded-sm hover:border-gold transition-colors"
                  >
                    {work}
                    <span className="text-gold/70 font-normal"> · {n}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
