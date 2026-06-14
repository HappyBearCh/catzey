export interface AnimeEntry {
  title: string;
  studio: string;
  genres: string[];
  synopsis: string;
  episodes: number | null;
  source: 'manga' | 'light novel' | 'original' | 'visual novel' | 'web novel';
  status: 'airing' | 'upcoming' | 'finished';
  whereToWatch: string[];
  day?: string;
}

export interface AnimeSeason {
  slug: string;
  label: string;
  year: number;
  season: 'winter' | 'spring' | 'summer' | 'fall';
  status: 'current' | 'upcoming' | 'past';
  shows: AnimeEntry[];
}

export const SEASONS: AnimeSeason[] = [
  {
    slug: 'spring-2026',
    label: 'Spring 2026',
    year: 2026,
    season: 'spring',
    status: 'current',
    shows: [
      {
        title: 'One Piece',
        studio: 'Toei Animation',
        genres: ['Action', 'Adventure', 'Fantasy'],
        synopsis: "Monkey D. Luffy and the Straw Hat Pirates continue their journey through the Grand Line in pursuit of the legendary treasure One Piece, and Luffy's dream to become King of the Pirates.",
        episodes: null,
        source: 'manga',
        status: 'airing',
        whereToWatch: ['Crunchyroll', 'Funimation'],
        day: 'Sunday',
      },
      {
        title: 'Sakamoto Days',
        studio: 'TMS Entertainment',
        genres: ['Action', 'Comedy'],
        synopsis: "Taro Sakamoto was once the world's greatest assassin — now he runs a convenience store with his family. When old enemies come calling, retirement proves harder to maintain than he thought.",
        episodes: 13,
        source: 'manga',
        status: 'airing',
        whereToWatch: ['Netflix'],
        day: 'Friday',
      },
      {
        title: 'Frieren: Beyond Journey\'s End',
        studio: 'Madhouse',
        genres: ['Fantasy', 'Adventure', 'Drama'],
        synopsis: "The elven mage Frieren journeys northward with new companions, reflecting on centuries of memories and slowly learning what it means to connect with others whose lives are so much shorter than her own.",
        episodes: 24,
        source: 'manga',
        status: 'airing',
        whereToWatch: ['Crunchyroll'],
        day: 'Friday',
      },
      {
        title: 'Blue Box',
        studio: 'Lay-duce',
        genres: ['Romance', 'Sports', 'Slice of Life'],
        synopsis: "Taiki Inomata practices badminton every morning in the gym he shares with the girls' basketball team — including Chinatsu Kano, the girl he admires. Their school festival and dorm life bring them unexpectedly close.",
        episodes: 13,
        source: 'manga',
        status: 'airing',
        whereToWatch: ['Crunchyroll'],
        day: 'Thursday',
      },
      {
        title: 'Dungeon Meshi',
        studio: 'Trigger',
        genres: ['Adventure', 'Fantasy', 'Comedy'],
        synopsis: "After his sister is eaten by a dragon, Laios leads his party deeper into the dungeon — cooking and eating the monsters they encounter to survive. A fantasy adventure about ecology, community, and what we consume.",
        episodes: 24,
        source: 'manga',
        status: 'airing',
        whereToWatch: ['Netflix'],
        day: 'Wednesday',
      },
      {
        title: 'Jujutsu Kaisen: The Final Arc',
        studio: 'MAPPA',
        genres: ['Action', 'Dark Fantasy', 'Supernatural'],
        synopsis: "The catastrophic battle between Jujutsu sorcerers and cursed spirits reaches its conclusion. Yuji Itadori and his allies face impossible odds as the world transformed by Kenjaku's plan demands everything they have.",
        episodes: 24,
        source: 'manga',
        status: 'airing',
        whereToWatch: ['Crunchyroll', 'HBO Max'],
        day: 'Saturday',
      },
    ],
  },
  {
    slug: 'summer-2026',
    label: 'Summer 2026',
    year: 2026,
    season: 'summer',
    status: 'upcoming',
    shows: [
      {
        title: 'Kaiju No. 8 Season 2',
        studio: 'Production I.G',
        genres: ['Action', 'Sci-Fi', 'Monsters'],
        synopsis: "Kafka Hibino continues his double life as a Defense Force officer and the mysterious Kaiju No. 8 as new threats emerge that test the limits of both identities.",
        episodes: 12,
        source: 'manga',
        status: 'upcoming',
        whereToWatch: ['Crunchyroll'],
      },
      {
        title: 'Wind Breaker Season 2',
        studio: 'CloverWorks',
        genres: ['Action', 'Delinquents'],
        synopsis: "Haruka Sakura and the Bofurin continue defending their town as new gangs from across Japan arrive to challenge their territory and test the bonds forged in the first season.",
        episodes: 13,
        source: 'manga',
        status: 'upcoming',
        whereToWatch: ['Crunchyroll'],
      },
      {
        title: 'Spy × Family Season 3',
        studio: 'CloverWorks / WIT Studio',
        genres: ['Action', 'Comedy', 'Family'],
        synopsis: "The Forger family's web of secrets grows more complicated as Loid's mission deepens, Yor faces new threats, and Anya navigates the social politics of Eden Academy.",
        episodes: 13,
        source: 'manga',
        status: 'upcoming',
        whereToWatch: ['Crunchyroll'],
      },
      {
        title: 'Blue Lock: Episode Nagi',
        studio: 'Eight Bit',
        genres: ['Sports', 'Soccer'],
        synopsis: "A side-story following the enigmatic Seishiro Nagi and his journey into professional soccer alongside Reo Mikage, told in parallel to the main Blue Lock story.",
        episodes: 6,
        source: 'manga',
        status: 'upcoming',
        whereToWatch: ['Crunchyroll'],
      },
    ],
  },
];

export function getSeason(slug: string): AnimeSeason | null {
  return SEASONS.find((s) => s.slug === slug) ?? null;
}

export function getCurrentSeason(): AnimeSeason | null {
  return SEASONS.find((s) => s.status === 'current') ?? null;
}

export function getAllSeasons(): AnimeSeason[] {
  return SEASONS;
}
