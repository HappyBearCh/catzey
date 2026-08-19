// The publishing backlog. The generator works through this list in order and
// upserts by slug, so the file is the single source of truth for what the site
// covers — add a subject here and it gets written; remove one and it simply
// stops being refreshed. Ordering is deliberate: foundational entries first, so
// that later pages have something real to link back to.

export interface TopicSeed {
  subject: string;
  track: string;
}

export const GLOSSARY_BACKLOG: string[] = [
  // Demographics — the labels everything else is described in terms of.
  'Shonen', 'Seinen', 'Shojo', 'Josei', 'Kodomomuke',
  // Format & craft.
  'Manga', 'Manhwa', 'Manhua', 'Tankobon', 'One-shot', 'Chapter',
  'Panel', 'Gutter', 'Speed lines', 'Screentone', 'Onomatopoeia',
  'Right-to-left reading', 'Splash page', 'Color spread', 'Omake',
  // Genre vocabulary — the highest-volume searches on the site.
  'Isekai', 'Shonen battle manga', 'Slice of life', 'Iyashikei', 'Mecha',
  'Magical girl', 'Sports manga', 'Cooking manga', 'Horror manga',
  'Romance manga', 'Yuri', 'Yaoi', 'Boys Love', 'Harem', 'Reverse harem',
  'Battle shonen power system', 'Tournament arc', 'Time skip',
  // Character archetypes people search by name.
  'Tsundere', 'Yandere', 'Kuudere', 'Dandere', 'Senpai', 'Kohai',
  'Shonen protagonist', 'Rival character',
  // Industry.
  'Mangaka', 'Assistant', 'Editor', 'Serialization', 'Weekly Shonen Jump',
  'Hiatus', 'Licensing', 'Simulpub', 'Scanlation', 'Official translation',
  'Anime adaptation', 'Filler', 'Manga cafe', 'Doujinshi',
  // Fandom.
  'Canon', 'Fanservice', 'Waifu', 'Ship', 'Spoiler culture', 'Otaku', 'Weeb',
];

export const TOPIC_BACKLOG: TopicSeed[] = [
  // basics — the entry path for a total newcomer.
  { subject: 'What is manga, and how is it different from comics?', track: 'basics' },
  { subject: 'How to read manga right to left', track: 'basics' },
  { subject: 'How to start reading manga when you have never read any', track: 'basics' },
  { subject: 'Where to read manga legally', track: 'basics' },
  { subject: 'How manga volumes, chapters and arcs fit together', track: 'basics' },
  { subject: 'Manga vs anime: what changes in adaptation', track: 'basics' },
  // genres
  { subject: 'Shonen, seinen, shojo and josei explained', track: 'genres' },
  { subject: 'What is isekai and why is there so much of it?', track: 'genres' },
  { subject: 'How to find manga in a genre you already like', track: 'genres' },
  { subject: 'What makes a battle shonen work', track: 'genres' },
  { subject: 'Slice of life and iyashikei: manga with no plot', track: 'genres' },
  // craft
  { subject: 'How a manga page is composed', track: 'craft' },
  { subject: 'How manga controls pacing without motion or sound', track: 'craft' },
  { subject: 'Screentone, hatching and how manga creates depth in black and white', track: 'craft' },
  { subject: 'How sound effects work in manga', track: 'craft' },
  { subject: 'How manga lettering and translation choices change a scene', track: 'craft' },
  // history
  { subject: 'A short history of manga', track: 'history' },
  { subject: 'Osamu Tezuka and the invention of modern manga', track: 'history' },
  { subject: 'How Weekly Shonen Jump shaped what manga looks like', track: 'history' },
  { subject: 'The 1990s manga boom and its aftermath', track: 'history' },
  { subject: 'How manga reached English-language readers', track: 'history' },
  // industry
  { subject: 'How a manga gets serialized', track: 'industry' },
  { subject: 'What a manga editor actually does', track: 'industry' },
  { subject: 'Why manga series go on hiatus', track: 'industry' },
  { subject: 'How manga creators are paid', track: 'industry' },
  { subject: 'Why some manga never get an official translation', track: 'industry' },
  // culture
  { subject: 'What doujinshi is and why it matters', track: 'culture' },
  { subject: 'Scanlation: how it works and why it is contested', track: 'culture' },
  { subject: 'How manga fandom talks: a guide to the vocabulary', track: 'culture' },
];

export const WORK_BACKLOG: string[] = [
  'One Piece', 'Berserk', 'Monster', 'Vagabond', 'Fullmetal Alchemist',
  'Death Note', 'Naruto', 'Bleach', 'Dragon Ball', 'Hunter x Hunter',
  'Attack on Titan', 'Vinland Saga', 'Chainsaw Man', 'Jujutsu Kaisen',
  '20th Century Boys', 'Pluto', 'Akira', 'Nausicaa of the Valley of the Wind',
  'Slam Dunk', 'Blame!', 'Yotsuba&!', 'Fruits Basket', 'Nana',
  'Sailor Moon', 'Cardcaptor Sakura', 'Oyasumi Punpun', 'A Silent Voice',
  'March Comes in Like a Lion', 'Frieren: Beyond Journey’s End',
  'Spy x Family', 'Blue Lock', 'Demon Slayer', 'My Hero Academia',
  'Solo Leveling', 'Tower of God', 'The Apothecary Diaries',
];

export const CREATOR_BACKLOG: string[] = [
  'Osamu Tezuka', 'Katsuhiro Otomo', 'Hayao Miyazaki', 'Naoki Urasawa',
  'Kentaro Miura', 'Takehiko Inoue', 'Eiichiro Oda', 'Akira Toriyama',
  'Yoshihiro Togashi', 'Hirohiko Araki', 'Rumiko Takahashi', 'Junji Ito',
  'Inio Asano', 'Tsutomu Nihei', 'Hajime Isayama', 'Makoto Yukimura',
  'Tatsuki Fujimoto', 'Gege Akutami', 'Naoko Takeuchi', 'CLAMP',
  'Kiyohiko Azuma', 'Ai Yazawa', 'Chica Umino', 'Kanehito Yamada',
  'Tatsuya Endo', 'Koyoharu Gotouge', 'Kohei Horikoshi', 'Sui Ishida',
];

export type ContentKind = 'topic' | 'term' | 'work' | 'creator';

/**
 * Round-robin across the four kinds so the site grows evenly rather than
 * finishing the glossary before a single explainer exists. Explainers are
 * weighted highest — they are the pages with real search demand behind them.
 */
export const GENERATION_ORDER: ContentKind[] = [
  'topic', 'term', 'work', 'topic', 'term', 'creator',
];
