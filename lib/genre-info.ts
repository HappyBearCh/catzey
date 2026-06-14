export interface GenreInfo {
  slug: string;
  label: string;
  description: string;
  longDescription: string;
  relatedTags: string[];
  notableWorks: string[];
}

export const GENRES: Record<string, GenreInfo> = {
  isekai: {
    slug: 'isekai',
    label: 'Isekai',
    description: 'Stories where a character is transported, reincarnated, or summoned to another world.',
    longDescription: 'Isekai (異世界, "another world") is one of the most popular genres in modern manga and anime. Whether through death and reincarnation, magical transportation, or being summoned as a hero, protagonists leave the ordinary world and enter fantasy realms — often modeled on role-playing games complete with stats, levels, and skills. From the psychological depth of Re:Zero to the warm optimism of That Time I Got Reincarnated as a Slime, the genre spans an enormous tonal range.',
    relatedTags: ['isekai', 'reincarnation', 'another world', 'fantasy', 'overpowered', 'transported', 'summoned hero'],
    notableWorks: ["Re:Zero", "That Time I Got Reincarnated as a Slime", "Sword Art Online", "Overlord", "Mushoku Tensei", "My Next Life as a Villainess"],
  },
  shonen: {
    slug: 'shonen',
    label: 'Shōnen',
    description: 'Action-driven stories built on themes of growth, friendship, and surpassing your limits.',
    longDescription: 'Shōnen (少年, "boy") is the most commercially dominant category in manga, home to some of the industry\'s biggest franchises. Shōnen series typically center on a young protagonist\'s journey toward mastery — whether in combat, sports, or another competitive arena — with friendship and rivalry as the emotional engines of growth. The genre rewards long-form investment: the best shōnen series build enormous casts and worlds over hundreds of chapters.',
    relatedTags: ['shonen', 'action', 'battle', 'power system', 'tournament', 'friendship', 'rivals'],
    notableWorks: ["One Piece", "Demon Slayer", "My Hero Academia", "Jujutsu Kaisen", "Naruto", "Dragon Ball"],
  },
  romance: {
    slug: 'romance',
    label: 'Romance',
    description: 'Stories centered on love, relationships, and the emotional complexity of connection.',
    longDescription: 'Romance manga encompasses everything from the lighthearted school rom-com to the emotionally devastating adult drama. Japanese romance manga has developed highly specific subgenres: the slow burn of rivals-to-lovers, the comedy of persistent misunderstandings, and the bittersweet ache of unrequited love. Romance underpins shōjo and josei manga but appears across every demographic category.',
    relatedTags: ['romance', 'love', 'school romance', 'slice of life', 'confession', 'relationships', 'shoujo'],
    notableWorks: ["Fruits Basket", "Kaguya-sama: Love is War", "Your Lie in April", "Horimiya", "Skip and Loafer", "Lovely Complex"],
  },
  horror: {
    slug: 'horror',
    label: 'Horror',
    description: 'Dark, unsettling stories exploring fear, the supernatural, and the extremes of human experience.',
    longDescription: 'Horror manga has produced some of the medium\'s most formally daring work. Unlike Western horror, Japanese manga horror frequently blends psychological dread with body horror and existential unease. Junji Ito redefined what horror could do on the page; Chainsaw Man brought horror logic into shōnen action. The genre rewards readers who can handle darkness and formal experimentation.',
    relatedTags: ['horror', 'dark', 'supernatural', 'psychological', 'gore', 'terror', 'junji ito'],
    notableWorks: ["Uzumaki", "Tomie", "Homunculus", "Dorohedoro", "Chainsaw Man", "Shiver"],
  },
  'slice-of-life': {
    slug: 'slice-of-life',
    label: 'Slice of Life',
    description: 'Quiet, character-driven stories about everyday moments and the small joys of ordinary living.',
    longDescription: 'Slice-of-life manga finds meaning in the unremarkable. No chosen heroes, no world-ending stakes — instead, characters navigate relationships, work, seasonal rhythms, and small personal discoveries. The genre demands patience and rewards it with emotional depth. It encompasses everything from cosy bakery dramas to devastating portraits of quiet lives.',
    relatedTags: ['slice of life', 'everyday', 'cozy', 'heartwarming', 'school life', 'daily life', 'iyashikei'],
    notableWorks: ["Yotsuba&!", "Barakamon", "March Comes in Like a Lion", "A Silent Voice", "Takagi-san", "Mushishi"],
  },
  sports: {
    slug: 'sports',
    label: 'Sports',
    description: 'Manga driven by athletic competition, training arcs, and the drama of pushing a body to its limits.',
    longDescription: 'Sports manga is one of the most technically demanding genres to write well — the author must make readers care about athletic competition even if they have no prior interest in the sport. The best sports manga achieve this through character work, carefully constructed rivalries, and the intrinsic drama of a body pushed to its limits. Haikyuu!! made volleyball gripping; Slam Dunk made basketball mythological.',
    relatedTags: ['sports', 'competition', 'training', 'volleyball', 'basketball', 'soccer', 'baseball', 'swimming'],
    notableWorks: ["Haikyuu!!", "Slam Dunk", "Blue Lock", "Ao Ashi", "Eyeshield 21", "Kuroko no Basket"],
  },
  mecha: {
    slug: 'mecha',
    label: 'Mecha',
    description: 'Science fiction stories centered on giant robots and the pilots who control them.',
    longDescription: 'Mecha is one of manga and anime\'s most distinctly Japanese genres, born from postwar fascination with machines and science fiction literature. From the super-robot tradition of Mazinger Z to the deconstructionist trauma of Evangelion, mecha manga explores what it means to be human inside — and sometimes at the mercy of — a mechanical body.',
    relatedTags: ['mecha', 'robot', 'sci-fi', 'giant robot', 'pilot', 'gundam', 'evangelion'],
    notableWorks: ["Neon Genesis Evangelion", "Code Geass", "Gundam", "Gurren Lagann", "Knights of Sidonia", "86"],
  },
  seinen: {
    slug: 'seinen',
    label: 'Seinen',
    description: 'Mature, complex stories targeting adult male readers — darker themes, nuanced characters, sophisticated plots.',
    longDescription: 'Seinen (青年, "young man") describes manga published in magazines targeting adult men. Free from the tonal constraints of shōnen, seinen manga tends toward moral ambiguity, violence without triumph, and narrative complexity. It is home to some of the medium\'s most acclaimed works — stories that interrogate rather than celebrate genre conventions.',
    relatedTags: ['seinen', 'mature', 'dark', 'psychological', 'adult', 'complex'],
    notableWorks: ["Berserk", "Vinland Saga", "Monster", "Vagabond", "Punpun", "Oyasumi Punpun"],
  },
};

export function getGenreInfo(slug: string): GenreInfo | null {
  return GENRES[slug] ?? null;
}

export function getAllGenres(): GenreInfo[] {
  return Object.values(GENRES);
}
