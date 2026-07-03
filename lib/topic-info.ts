// Curated hub content for high-traffic topics (major series, studios, creators).
//
// A /topic/[entity] page is otherwise just an article list. For the handful of
// entities that draw real search demand, an editorial intro + key facts turns
// the page into a genuine hub that can rank for "[series] news" rather than a
// thin archive. Entities without an entry simply render the article list as
// before, so this scales lazily — add entries for whatever starts ranking.

export interface TopicFact {
  label: string;
  value: string;
}

export interface TopicInfo {
  /** Canonical display name (should match the entity string used on articles). */
  name: string;
  /** Alternative spellings that should resolve to this entry. */
  aliases?: string[];
  intro: string;
  facts: TopicFact[];
}

const TOPICS: TopicInfo[] = [
  {
    name: 'One Piece',
    aliases: ['onepiece'],
    intro:
      'One Piece is Eiichiro Oda’s record-breaking pirate epic, serialized in Weekly Shōnen Jump since 1997 and the best-selling manga of all time. Follow the latest chapter breakdowns, anime adaptation news, and franchise announcements as the story enters its Final Saga.',
    facts: [
      { label: 'Creator', value: 'Eiichiro Oda' },
      { label: 'Magazine', value: 'Weekly Shōnen Jump' },
      { label: 'Running since', value: '1997' },
      { label: 'Demographic', value: 'Shōnen' },
    ],
  },
  {
    name: 'Jujutsu Kaisen',
    aliases: ['jjk'],
    intro:
      'Jujutsu Kaisen is Gege Akutami’s dark supernatural action series about sorcerers who battle Cursed Spirits. One of the defining Shōnen Jump hits of its generation, it spans a hit manga (now concluded), a chart-topping anime by MAPPA, and a blockbuster prequel film.',
    facts: [
      { label: 'Creator', value: 'Gege Akutami' },
      { label: 'Magazine', value: 'Weekly Shōnen Jump' },
      { label: 'Anime studio', value: 'MAPPA' },
      { label: 'Demographic', value: 'Shōnen' },
    ],
  },
  {
    name: 'Chainsaw Man',
    intro:
      'Chainsaw Man is Tatsuki Fujimoto’s chaotic, genre-bending series about Denji, a young man who merges with his devil dog to become the Chainsaw Man. Known for its brutal action and emotional whiplash, it continues in Part 2 on Shōnen Jump+ alongside MAPPA’s acclaimed anime.',
    facts: [
      { label: 'Creator', value: 'Tatsuki Fujimoto' },
      { label: 'Magazine', value: 'Shōnen Jump+' },
      { label: 'Anime studio', value: 'MAPPA' },
      { label: 'Demographic', value: 'Shōnen / Seinen' },
    ],
  },
  {
    name: 'Demon Slayer',
    aliases: ['kimetsu no yaiba', 'demon slayer: kimetsu no yaiba'],
    intro:
      'Demon Slayer: Kimetsu no Yaiba is Koyoharu Gotouge’s smash-hit series about Tanjiro Kamado’s quest to cure his sister and avenge his family. Its ufotable anime adaptation became a global phenomenon, and its film shattered box-office records in Japan.',
    facts: [
      { label: 'Creator', value: 'Koyoharu Gotouge' },
      { label: 'Magazine', value: 'Weekly Shōnen Jump' },
      { label: 'Anime studio', value: 'ufotable' },
      { label: 'Status', value: 'Manga complete' },
    ],
  },
  {
    name: 'My Hero Academia',
    aliases: ['boku no hero academia', 'mha'],
    intro:
      'My Hero Academia is Kohei Horikoshi’s superhero series set in a world where most people have powers called Quirks. Following Izuku Midoriya’s rise from powerless boy to hero-in-training, it grew into one of Jump’s biggest modern franchises across manga, anime, and film.',
    facts: [
      { label: 'Creator', value: 'Kohei Horikoshi' },
      { label: 'Magazine', value: 'Weekly Shōnen Jump' },
      { label: 'Anime studio', value: 'Bones' },
      { label: 'Status', value: 'Manga complete' },
    ],
  },
  {
    name: 'Frieren',
    aliases: ['frieren: beyond journey\'s end', 'sousou no frieren'],
    intro:
      'Frieren: Beyond Journey’s End is Kanehito Yamada and Tsukasa Abe’s quietly profound fantasy about an elven mage reflecting on mortality after her hero’s party disbands. Its award-winning Madhouse anime brought a new wave of readers to this meditative, critically adored series.',
    facts: [
      { label: 'Creators', value: 'Kanehito Yamada, Tsukasa Abe' },
      { label: 'Magazine', value: 'Weekly Shōnen Sunday' },
      { label: 'Anime studio', value: 'Madhouse' },
      { label: 'Demographic', value: 'Shōnen' },
    ],
  },
  {
    name: 'Spy × Family',
    aliases: ['spy family', 'spy x family'],
    intro:
      'Spy × Family is Tatsuya Endo’s comedy-thriller about a spy, an assassin, and a telepath who form a fake family — each hiding their true identity from the others. A breakout Shōnen Jump+ hit, it blends espionage, action, and warm domestic comedy.',
    facts: [
      { label: 'Creator', value: 'Tatsuya Endo' },
      { label: 'Magazine', value: 'Shōnen Jump+' },
      { label: 'Anime studio', value: 'Wit Studio, CloverWorks' },
      { label: 'Demographic', value: 'Shōnen' },
    ],
  },
  {
    name: 'Blue Lock',
    intro:
      'Blue Lock is Muneyuki Kaneshiro and Yusuke Nomura’s high-intensity soccer series that reframes the sport as a ruthless competition to forge Japan’s ultimate striker. Its aggressive art and psychological edge made it one of the biggest sports manga of the decade.',
    facts: [
      { label: 'Creators', value: 'Muneyuki Kaneshiro, Yusuke Nomura' },
      { label: 'Magazine', value: 'Weekly Shōnen Magazine' },
      { label: 'Anime studio', value: 'Eight Bit' },
      { label: 'Demographic', value: 'Shōnen' },
    ],
  },
];

const TOPIC_LOOKUP = new Map<string, TopicInfo>();
for (const t of TOPICS) {
  TOPIC_LOOKUP.set(t.name.toLowerCase(), t);
  for (const alias of t.aliases ?? []) TOPIC_LOOKUP.set(alias.toLowerCase(), t);
}

export function getTopicInfo(entity: string): TopicInfo | undefined {
  return TOPIC_LOOKUP.get(entity.trim().toLowerCase());
}
