'use client';

import { titleNumbers, getGroup } from '@/lib/number-groups';

interface Props {
  /** The headline as currently typed. */
  title: string;
  className?: string;
}

/**
 * Where this headline will be filed, updated as it is typed.
 *
 * On a site arranged by title reduction, the headline is not just a label — it
 * decides which shelf a piece lands on and what it will be read alongside. An
 * editor who cannot see that until after publishing is working blind, and the
 * only way to move a piece is to rewrite its title. So the working is shown
 * live, in the form, next to the field that determines it.
 *
 * The arithmetic is the same `titleNumbers` the published page uses, so what an
 * editor sees here is exactly what will ship.
 */
export function ShelfPreview({ title, className = '' }: Props) {
  const trimmed = title.trim();

  if (!trimmed) {
    return (
      <p className={`text-xs text-gray-400 ${className}`}>
        The shelf follows from the headline. Start typing to see where this lands.
      </p>
    );
  }

  const numbers = titleNumbers(trimmed);
  const group = getGroup(numbers.value);

  return (
    <div className={`border border-gray-200 rounded-sm p-3 bg-gray-50 ${className}`}>
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 w-10 h-10 rounded-full border border-amber-500/50 text-amber-700 flex items-center justify-center text-base font-semibold"
          aria-hidden="true"
        >
          {numbers.value}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-700">
            {group.shelf}
            {group.master && <span className="ml-2 text-amber-700">master number</span>}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{group.tagline}</p>
        </div>
      </div>

      {/* The working, so the figure can be checked rather than trusted. */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-2xs text-gray-500">
        {numbers.words.map((w, i) => (
          <span key={`${w.word}-${i}`}>
            {w.word} <span className="font-semibold text-gray-700">{w.sum}</span>
          </span>
        ))}
        <span className="text-amber-700 font-semibold">
          = {numbers.raw}
          {numbers.raw !== numbers.value && ` → ${numbers.value}`}
        </span>
      </div>

      <p className="text-2xs text-gray-400 mt-2">
        Heart&apos;s Desire {numbers.heart} · Personality {numbers.personality}. Rewording the
        headline moves the piece; nothing else will.
      </p>
    </div>
  );
}
