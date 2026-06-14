export interface ChapterRelease {
  series: string;
  magazine: string;
  platformUrl: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  note?: string;
  tags: string[];
}

export const WEEKLY_RELEASES: ChapterRelease[] = [
  { series: 'My Hero Academia', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Monday', tags: ['superhero', 'action', 'shonen'] },
  { series: 'Undead Unluck', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Monday', tags: ['action', 'supernatural', 'shonen'] },
  { series: 'Jujutsu Kaisen', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Wednesday', tags: ['action', 'supernatural', 'shonen'] },
  { series: 'One Piece', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Wednesday', note: 'Release day may vary week-to-week', tags: ['adventure', 'action', 'shonen'] },
  { series: 'Boruto: Two Blue Vortex', magazine: 'V Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Wednesday', note: 'Monthly', tags: ['action', 'ninja', 'shonen'] },
  { series: 'Blue Lock', magazine: 'Weekly Shōnen Magazine', platformUrl: 'https://pocket.shonenmagazine.com', day: 'Wednesday', tags: ['sports', 'soccer', 'shonen'] },
  { series: 'Fairy Tail: 100 Years Quest', magazine: 'Weekly Shōnen Magazine', platformUrl: 'https://pocket.shonenmagazine.com', day: 'Wednesday', note: 'Bi-weekly', tags: ['action', 'magic', 'adventure'] },
  { series: 'Chainsaw Man', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Thursday', note: 'Part 2 schedule may vary', tags: ['action', 'dark', 'shonen'] },
  { series: 'Black Clover', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Thursday', tags: ['action', 'magic', 'shonen'] },
  { series: 'Frieren: Beyond Journey\'s End', magazine: 'Weekly Shōnen Sunday', platformUrl: 'https://websunday.net', day: 'Friday', tags: ['fantasy', 'adventure', 'drama'] },
  { series: 'Spy × Family', magazine: 'Shōnen Jump+', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Friday', note: 'Bi-weekly', tags: ['action', 'comedy', 'family'] },
  { series: 'Kaiju No. 8', magazine: 'Shōnen Jump+', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Friday', note: 'Bi-weekly', tags: ['action', 'monsters', 'sci-fi'] },
  { series: 'Wind Breaker', magazine: 'Shōnen Jump+', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Friday', note: 'Bi-weekly', tags: ['action', 'delinquents', 'shonen'] },
  { series: 'One-Punch Man', magazine: 'Shōnen Jump+', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Saturday', note: 'Irregular — check platform for updates', tags: ['action', 'comedy', 'superhero'] },
  { series: 'Vinland Saga', magazine: 'Monthly Afternoon', platformUrl: 'https://www.amazon.co.jp', day: 'Saturday', note: 'Monthly', tags: ['historical', 'action', 'seinen'] },
  { series: 'Detective Conan', magazine: 'Weekly Shōnen Sunday', platformUrl: 'https://websunday.net', day: 'Sunday', tags: ['mystery', 'detective', 'shonen'] },
  { series: 'Sakamoto Days', magazine: 'Weekly Shōnen Jump', platformUrl: 'https://mangaplus.shueisha.co.jp', day: 'Monday', tags: ['action', 'comedy', 'assassin'] },
];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type DayOfWeek = typeof DAYS_OF_WEEK[number];

export function getReleasesByDay(): Record<DayOfWeek, ChapterRelease[]> {
  const result = {} as Record<DayOfWeek, ChapterRelease[]>;
  for (const day of DAYS_OF_WEEK) {
    result[day] = WEEKLY_RELEASES.filter((r) => r.day === day);
  }
  return result;
}
