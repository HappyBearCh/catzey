import Link from 'next/link';
import { CATEGORY_INFO } from '@/lib/category-info';

interface Props {
  slug: string;
}

export function CategoryInfo({ slug }: Props) {
  const info = CATEGORY_INFO[slug];
  if (!info) return null;

  return (
    <div className="mb-10 rounded-sm overflow-hidden border border-site-border">
      {/* Header strip */}
      <div className="bg-gradient-to-r from-[#1a1530] to-[#0f0b1e] px-6 py-5 border-b border-white/10 flex items-start justify-between gap-6">
        <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">{info.intro}</p>
        <Link
          href={`/${slug}/guide`}
          className="flex-shrink-0 text-xs font-black uppercase tracking-widest text-primary-accent border border-primary-accent/40 px-3 py-1.5 hover:bg-primary-accent/10 transition-colors whitespace-nowrap"
        >
          Full Guide →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-site-border bg-white">
        {/* Timeline */}
        <div className="px-6 py-5">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-primary inline-block" />
            Key Milestones
          </h3>
          <ol className="space-y-3">
            {info.history.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 mt-0.5 text-2xs font-black text-white bg-primary px-1.5 py-0.5 rounded-sm min-w-[3rem] text-center">
                  {item.year}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Facts + Notable Works */}
        <div className="px-6 py-5 space-y-6">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary inline-block" />
              Did You Know?
            </h3>
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
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary inline-block" />
              Notable Works &amp; Names
            </h3>
            <div className="flex flex-wrap gap-2">
              {info.notableWorks.map((work) => (
                <span
                  key={work}
                  className="text-xs font-semibold px-2.5 py-1 bg-site-light text-primary border border-site-border rounded-sm"
                >
                  {work}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
