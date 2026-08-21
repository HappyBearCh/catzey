// The numbers a manga carries without being asked.
//
// The rest of the reference files a text by reducing its title, and is candid
// that this is an imposition — for a translated work it usually reduces a
// licensing decision rather than anything the author wrote. These are the other
// kind of number: a series really does run to twenty-two volumes, really did
// serialise for eight years, really did begin in 1999. Nobody chose those to
// mean anything, which is exactly what makes them worth reducing.
//
// Manga is unusually rich in them. It is a medium that counts itself out loud —
// chapter numbers, volume numbers, weekly issue numbers, cour lengths — and a
// reader who knows a series is 22 volumes knows something real about its shape.

import { figure, type Figure } from '@/lib/numerologize';
import type { Work } from '@/lib/education';

/**
 * Every figure the works file knows about one series, in the order they are
 * printed. Missing data is skipped rather than guessed: an unfinished series
 * has no run length, and several older entries have no volume count.
 */
export function workFigures(work: Pick<Work, 'volumes' | 'startYear' | 'endYear' | 'status'>): Figure[] {
  const figures: Figure[] = [];

  if (work.volumes && work.volumes > 0) {
    figures.push(
      figure('volumes', work.volumes, `${work.volumes} collected tankōbon volumes`),
    );
  }

  // Run length counts both end years inclusively — a series that ran 1999–2006
  // ran for eight years, not seven. Only completed runs get one; an ongoing
  // series measured against today would give a figure that changes annually,
  // and every reading here is meant to be stable.
  if (work.startYear && work.endYear && work.endYear >= work.startYear) {
    const years = work.endYear - work.startYear + 1;
    figures.push(figure('years serialised', years, `${work.startYear}–${work.endYear}`));
  }

  if (work.startYear) {
    figures.push(figure('debut year', work.startYear, `first serialised in ${work.startYear}`));
  }

  return figures;
}

/**
 * The one figure a series can carry that the others cannot: how long it has
 * been unfinished. Deliberately not a Figure — it changes every January, and
 * the readings on this site have to be reproducible from the files alone.
 */
export function isOpenEnded(work: Pick<Work, 'startYear' | 'endYear' | 'status'>): boolean {
  return Boolean(work.startYear) && !work.endYear && work.status !== 'completed';
}
