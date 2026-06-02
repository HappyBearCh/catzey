export interface CategoryMilestone {
  year: string;
  event: string;
}

export interface CategoryInfo {
  slug: string;
  intro: string;
  history: CategoryMilestone[];
  facts: string[];
  notableWorks: string[];
}

export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  manga: {
    slug: 'manga',
    intro:
      'Manga is Japanese comics and graphic novels with a history stretching back over two centuries. Distinguished by expressive black-and-white art, cinematic panel layouts, and a uniquely right-to-left reading order, manga has grown into a global storytelling medium with annual sales surpassing $6 billion worldwide.',
    history: [
      { year: '1814', event: 'Katsushika Hokusai coins the word "manga" in his illustrated sketchbooks, meaning "whimsical pictures."' },
      { year: '1947', event: 'Osamu Tezuka publishes Shin Takarajima, establishing the cinematic panel style that defines modern manga.' },
      { year: '1959', event: 'Shueisha launches Weekly Shōnen Jump, which becomes the world\'s best-selling manga anthology.' },
      { year: '1984', event: 'Akira by Katsuhiro Otomo redefines manga\'s scope, pioneering cyberpunk and influencing global comics.' },
      { year: '1997', event: 'One Piece begins serialization; it later becomes the best-selling manga series of all time with over 530 million copies.' },
      { year: '2010s', event: 'Digital distribution and legal scanlation platforms explode manga readership in North America and Europe.' },
      { year: '2021', event: 'Global manga market hits a record high, with U.S. sales tripling in three years driven by Demon Slayer and Jujutsu Kaisen.' },
    ],
    facts: [
      'Manga is read right-to-left and back-to-front — the complete opposite of Western comics.',
      'Weekly Shōnen Jump has a peak circulation record of 6.53 million copies (1994–1995), making it the highest-circulating comics anthology in history.',
      'The Big Three — One Piece, Naruto, and Bleach — collectively sold over 900 million copies and defined a generation of readers.',
      'Manga covers every genre imaginable: from cooking (Food Wars!) to chess (3-gatsu no Lion) to gourmet dining (Oishinbo).',
      'Approximately 40% of all printed material sold in Japan is manga, and manga cafés ("manga kissa") rent out volumes by the hour.',
      'The iconic manga eyes were partly inspired by Betty Boop and early Disney characters, as Osamu Tezuka was a huge Disney fan.',
    ],
    notableWorks: ['One Piece', 'Dragon Ball', 'Naruto', 'Berserk', 'Demon Slayer', 'Attack on Titan', 'Fullmetal Alchemist', 'Death Note'],
  },

  anime: {
    slug: 'anime',
    intro:
      'Anime is Japanese animated film and television, recognized worldwide for its vivid art style, fantastical themes, and emotional storytelling. From hand-drawn cels of the Shōwa era to GPU-rendered digital productions streamed globally in real time, anime represents one of the most culturally influential entertainment industries on the planet.',
    history: [
      { year: '1917', event: 'Japan produces its first short animated films: Seitarō Kitayama\'s Momotarō and Seitaro Shimokawa\'s Imokawa Mukuzo.' },
      { year: '1945', event: 'Momotarō\'s Divine Sea Warriors becomes Japan\'s first feature-length anime, running 74 minutes and produced for the Imperial Navy.' },
      { year: '1963', event: 'Osamu Tezuka\'s Astro Boy premieres as the first weekly TV anime series, establishing the format still used today.' },
      { year: '1985', event: 'Studio Ghibli is founded by Hayao Miyazaki and Isao Takahata; Castle in the Sky is its first production.' },
      { year: '1995', event: 'Neon Genesis Evangelion airs, redefining what anime storytelling can explore and sparking global cult fandom.' },
      { year: '1997', event: 'Princess Mononoke breaks Japanese box-office records; Pokémon anime launches a franchise worth $150 billion.' },
      { year: '2007', event: 'Crunchyroll begins legal streaming, making simulcasts — anime broadcast globally hours after Japanese airing — the norm.' },
      { year: '2022', event: 'Demon Slayer: Mugen Train becomes the highest-grossing anime film ever, earning $504 million worldwide.' },
    ],
    facts: [
      'Japan produces around 200 new anime series per season (roughly 800 per year), more than any other country produces scripted television.',
      'Spirited Away (2001) was the first non-English film to win the Academy Award for Best Animated Feature.',
      'The term "anime" in Japan refers to all animation regardless of origin; outside Japan it specifically means Japanese animation.',
      'Voice actors (seiyuu) are celebrities in Japan, with dedicated fan clubs and sold-out live performances.',
      'Dragon Ball Z\'s Kamehameha is one of the most recognized fictional techniques in the world, inspiring countless imitations across sports and pop culture.',
      'Kyoto Animation\'s meticulous production process — hand-drawing details like fabric wrinkles — is so labor-intensive some episodes take four times longer than industry standard.',
    ],
    notableWorks: ['Neon Genesis Evangelion', 'Dragon Ball Z', 'Spirited Away', 'Cowboy Bebop', 'Attack on Titan', 'Fullmetal Alchemist: Brotherhood', 'Hunter x Hunter', 'Demon Slayer'],
  },

  industry: {
    slug: 'industry',
    intro:
      'The manga and anime industry is a multi-billion-dollar global ecosystem encompassing publishers, animation studios, streaming platforms, merchandise, and licensing. Understanding its business side reveals why certain series get made, how studios survive, and where the medium is heading in an increasingly digital world.',
    history: [
      { year: '1925', event: 'Kodansha, Japan\'s largest publisher, begins establishing the magazine infrastructure that will later define manga publishing.' },
      { year: '1949', event: 'Shueisha is founded as a spin-off of Shōgakukan; the two and Hakusensha later form the Big Three of manga publishing.' },
      { year: '1968', event: 'Weekly Shōnen Jump launches; its "reader survey" editorial system — where unpopular series get cancelled — shapes manga storytelling for decades.' },
      { year: '1997', event: 'Pokémon licensing explodes into a $150 billion franchise, demonstrating the scale of anime IP monetization.' },
      { year: '2009', event: 'Crunchyroll secures funding and pivots to a legal streaming model, validating the ad-supported/subscription anime market.' },
      { year: '2018', event: 'AT&T acquires Crunchyroll for $1.18 billion; later sold to Sony in 2021 for $1.175 billion, reflecting streaming wars entering anime.' },
      { year: '2021', event: 'Netflix, Amazon and Disney all invest heavily in exclusive anime production, driving up budgets and talent salaries industry-wide.' },
      { year: '2023', event: 'The global anime market is valued at over $25 billion, with merchandise and licensing accounting for the majority of revenue.' },
    ],
    facts: [
      'Most anime studios operate on razor-thin margins — key animators at smaller studios can earn less than $10/hour despite working 60+ hour weeks.',
      'The "production committee" (seisaku iinkai) system, where multiple companies co-invest in a show, spreads financial risk but also dilutes creative control.',
      'Licensing a manga for anime adaptation typically costs millions of dollars, but a hit anime can multiply the manga\'s sales tenfold overnight.',
      'Merchandise (figures, apparel, games) often generates more revenue than the anime itself — Attack on Titan merchandise alone exceeded $100 million.',
      'Webtoon (Korean) has disrupted the industry by paying creators upfront royalties, attracting talent away from traditional magazine serialization.',
      'Shueisha\'s Weekly Shōnen Jump uses reader survey cards — fans rank chapters weekly — meaning story arcs can be cut short or extended based on live popularity data.',
    ],
    notableWorks: ['Shueisha / Weekly Shōnen Jump', 'Kodansha', 'Studio Ghibli', 'MAPPA', 'Toei Animation', 'Crunchyroll', 'Kyoto Animation', 'A-1 Pictures'],
  },

  reviews: {
    slug: 'reviews',
    intro:
      'Manga and anime criticism has evolved from typed fanzines and forum threads into a thriving ecosystem of professional reviews, video essays, and community ratings. Reviews and critical discourse shape what gets licensed abroad, which series develop cult followings, and how the art form is perceived by mainstream audiences.',
    history: [
      { year: '1970s', event: 'Japanese dōjinshi culture produces early fan criticism and analysis of manga, distributed physically at events like Comiket.' },
      { year: '1980s', event: 'American fanzines like Animag and Protoculture Addicts begin covering anime, building the first Western critical community.' },
      { year: '1990s', event: 'Usenet groups (rec.arts.anime) and early web forums establish the template for collaborative fan reviewing online.' },
      { year: '2004', event: 'MyAnimeList launches, creating the first major community-driven rating database — it now hosts over 22,000 anime entries and 900,000+ members.' },
      { year: '2011', event: 'AniList launches as an alternative with richer metadata, social features, and open API, attracting a more data-focused audience.' },
      { year: '2013', event: 'Video essay channels on YouTube begin applying film criticism frameworks to anime, raising the level of analytical discourse.' },
      { year: '2020s', event: 'Professional outlets like The New York Times and The Guardian regularly publish anime reviews, signaling full mainstream acceptance.' },
    ],
    facts: [
      'Fullmetal Alchemist: Brotherhood holds a near-perfect 9.11 on MyAnimeList, consistently ranked the highest-rated anime of all time since 2011.',
      'Anime reviewers distinguish between "airing" scores and "final" scores — a series\' rating often jumps or drops dramatically after its ending is seen.',
      'The "3-episode rule" is an informal guideline among reviewers: give any series at least 3 episodes before dropping it, as many slow-burn greats take time to hook.',
      'Berserk\'s manga is often cited in critical circles as the gold standard of dark fantasy storytelling, despite never receiving a definitive animated adaptation.',
      'Review aggregators show stark divergence between critic scores and audience scores for experimental titles — Neon Genesis Evangelion\'s divisive ending is a classic example.',
      'Seasonal anime discussions on Reddit and Twitter have replaced traditional print reviews as the primary venue for real-time criticism, with threads receiving tens of thousands of replies.',
    ],
    notableWorks: ['MyAnimeList', 'AniList', 'Anime News Network', 'Crunchyroll Reviews', 'The Canipa Effect', 'Fullmetal Alchemist: Brotherhood', 'Berserk', 'Evangelion'],
  },

  'light-novels': {
    slug: 'light-novels',
    intro:
      'Light novels are a distinct Japanese literary format — short, fast-paced prose novels aimed at teenagers and young adults, illustrated with manga-style artwork. Sitting between full novels and manga, they serve as a primary source material for countless anime adaptations and have built a devoted global readership through legal digital platforms.',
    history: [
      { year: '1970s', event: 'Japanese publishers begin releasing illustrated "teen pocket novels" (teeniezu) — the direct precursors to light novels — in magazine format.' },
      { year: '1988', event: 'Slayers by Hajime Kanzaka launches, popularizing the fantasy light novel and establishing many genre conventions still used today.' },
      { year: '1993', event: 'The Sneaker Bunko and Dengeki Bunko imprints launch, becoming the two dominant publishers of light novels in Japan.' },
      { year: '2002', event: 'Sword Art Online begins as an online web novel by Reki Kawahara; its eventual publication sells 27 million+ copies and spawns a multimedia empire.' },
      { year: '2012', event: 'SAO anime adaptation triggers a massive uptick in light novel anime adaptations, establishing the isekai genre as a dominant force.' },
      { year: '2014', event: 'Re:Zero − Starting Life in Another World and Overlord begin publication, defining the "modern isekai" template.' },
      { year: '2016', event: 'Kadokawa reports that light novels account for over ¥30 billion ($200M) of its annual revenue, a 40% increase over five years.' },
    ],
    facts: [
      'A typical light novel runs 40,000–50,000 words — roughly half the length of a standard Western novel — with 5–15 full-page illustrations throughout.',
      'The isekai (異世界, "another world") subgenre dominates modern light novels: over 30% of all new LN releases now involve a protagonist transported to a fantasy world.',
      'Dengeki Bunko\'s annual sales contest has a single winner — the Dengeki Novel Prize — whose ¥10 million first prize remains the most prestigious LN award in Japan.',
      'Many mega-hit LNs (SAO, Re:Zero, Overlord) began as free web novels on the platform Shōsetsuka ni Narō ("Let\'s Become a Novelist"), showing how online serialization disrupts traditional publishing.',
      'Light novels are a major pipeline for anime: in any given year, roughly 60–70% of new fantasy anime series are adapted from LNs.',
      'The covers of light novels are considered collectible art; leading illustrators like abec (SAO) and so-bin (Overlord) have built standalone careers from their LN artwork.',
    ],
    notableWorks: ['Sword Art Online', 'Re:Zero', 'Overlord', 'No Game No Life', 'The Rising of the Shield Hero', 'Spice and Wolf', 'Monogatari Series', 'That Time I Got Reincarnated as a Slime'],
  },

  manhwa: {
    slug: 'manhwa',
    intro:
      'Manhwa is the Korean equivalent of manga — comics with a rich national history tracing back to 1909. The digital revolution transformed manhwa through the Webtoon format: infinite-canvas vertical scrolling strips designed specifically for smartphones, now read by over 85 million users globally and spawning major global streaming adaptations.',
    history: [
      { year: '1909', event: 'The first known Korean comic, a political satire strip, appears in the Daehan Minbo newspaper, marking manhwa\'s origins.' },
      { year: '1945', event: 'Post-liberation boom: Korean cartoonists develop a distinct national style, influenced by but separate from Japanese manga traditions.' },
      { year: '1997', event: 'The Asian financial crisis devastates print publishing; manhwa creators pivot online, accidentally pioneering the webcomic format.' },
      { year: '2004', event: 'Naver and Daum launch official webtoon platforms, offering creators revenue-sharing and readers free legal access — a model that will go global.' },
      { year: '2014', event: 'LINE Webtoon launches internationally in English, Spanish, and Chinese; Tower of God by SIU becomes the first major globally viral manhwa.' },
      { year: '2018', event: 'Solo Leveling by Chugong begins serialization; it becomes the most-read manhwa worldwide and is later adapted into anime by A-1 Pictures.' },
      { year: '2021', event: 'Webtoon (the platform) reaches 82 million monthly active users and is valued at $2.7 billion, signaling manhwa\'s mainstream global arrival.' },
    ],
    facts: [
      'Unlike manga, manhwa is read left-to-right — the same direction as Western comics — because Korea uses a horizontal writing system.',
      'Webtoon\'s vertical scroll format was invented out of necessity: early creators had no money for print and used basic HTML pages, accidentally creating the perfect mobile reading experience.',
      'Solo Leveling, the most-read manhwa globally, accumulated over 14 billion views on Kakao Page alone before its anime adaptation premiered in 2024.',
      'Korea\'s government actively funds manhwa creators through the Korea Manhwa Contents Agency (KOMACON), treating the medium as a cultural export worth protecting.',
      'Many major manhwa artists are anonymous or use pen names, a legacy of South Korea\'s historically strict government censorship of comics in the 20th century.',
      'The "dungeon hunter" and "regression" tropes — hero returns to the past with future knowledge — are uniquely dominant in manhwa, less common in Japanese manga.',
    ],
    notableWorks: ['Solo Leveling', 'Tower of God', 'The God of High School', 'Noblesse', 'Omniscient Reader', 'The Breaker', 'Lookism', 'True Beauty'],
  },

  events: {
    slug: 'events',
    intro:
      'The manga and anime event calendar is a global phenomenon — from Tokyo\'s massive biannual Comiket drawing 750,000 visitors to fan conventions on every continent. Events are where the community physically assembles: creators sign books, studios reveal trailers, cosplayers compete, and rare merchandise sells out within minutes.',
    history: [
      { year: '1975', event: 'Comiket (Comic Market) holds its inaugural event in Tokyo with just 700 attendees. Today it is the world\'s largest fan convention.' },
      { year: '1992', event: 'Anime Expo is founded in Los Angeles, becoming the largest anime convention in North America with 100,000+ annual attendees.' },
      { year: '1999', event: 'Japan Expo launches in Paris, France — it grows to become the largest anime/manga event outside Japan, drawing 250,000 visitors per year.' },
      { year: '2004', event: 'Jump Festa expands to a two-day format in Tokyo; it becomes the premier venue for Shueisha to announce new anime adaptations and game tie-ins.' },
      { year: '2008', event: 'AnimeJapan (formerly Tokyo International Anime Fair) becomes the industry\'s primary B2B and fan-facing trade show with 140,000+ visitors.' },
      { year: '2020', event: 'COVID-19 cancels virtually all physical events; Comiket goes hybrid with online markets, accelerating the digital event format.' },
      { year: '2023', event: 'Physical events fully return; AnimeNYC sets new records with 55,000+ attendees, reflecting post-pandemic surge in fandom activity.' },
    ],
    facts: [
      'Comiket\'s summer and winter events combined distribute over 700,000 self-published doujinshi (fan comics) across 35,000+ circle booths in a single weekend.',
      'World Cosplay Summit, held annually in Nagoya, Japan, is the official "cosplay Olympics" — 40+ countries send national teams to compete in craftsmanship and performance.',
      'A limited-edition figure or print revealed at Jump Festa can sell out its entire run on the convention floor within 30 minutes of doors opening.',
      'The Anime Music Video (AMV) competition at Anime Expo has been running since 1994 and remains one of the oldest continuous fan video competitions in the world.',
      'Panel rooms at major conventions routinely feature hour-long queues for popular voice actors — English dub VA Johnny Yong Bosch once had a line lasting over five hours.',
      'Crunchyroll Expo and Anime NYC have pioneered "industry panels with simulcast announcements" — viewers worldwide watch live streams simultaneously with convention audiences.',
    ],
    notableWorks: ['Comiket (Tokyo)', 'Anime Expo (Los Angeles)', 'Japan Expo (Paris)', 'Jump Festa (Tokyo)', 'AnimeJapan (Tokyo)', 'AnimeNYC', 'World Cosplay Summit (Nagoya)', 'Crunchyroll Expo'],
  },

  creators: {
    slug: 'creators',
    intro:
      'Behind every beloved manga and anime is a creator — or a team of them — whose vision, discipline, and artistry shape millions of lives. From legendary gods of manga who defined the medium itself to modern auteurs breaking records with every chapter, the creators of manga and anime represent some of the most influential storytellers of the 20th and 21st centuries.',
    history: [
      { year: '1928', event: 'Osamu Tezuka is born. His later works — Astro Boy, Black Jack, Dororo — earn him the title "God of Manga" and lay the foundation of the entire industry.' },
      { year: '1984', event: 'Akira Toriyama begins Dragon Ball; by the time of his death in 2024 the franchise had generated over $23 billion in revenue.' },
      { year: '1997', event: 'Eiichiro Oda begins One Piece, a series he has drawn weekly for 27+ years — it is the best-selling manga of all time.' },
      { year: '1999', event: 'Masashi Kishimoto launches Naruto, which sells 250+ million copies and defines a generation of global manga fans.' },
      { year: '2013', event: 'Hajime Isayama concludes the decade-long serialization of Attack on Titan with one of manga\'s most debated endings, cementing his legacy.' },
      { year: '2016', event: 'Koyoharu Gotouge begins Demon Slayer; the anime adaptation makes it the fastest manga to sell 150 million copies.' },
      { year: '2018', event: 'Gege Akutami launches Jujutsu Kaisen; within five years it surpasses 80 million copies in print, establishing a new generation of elite creators.' },
    ],
    facts: [
      'Eiichiro Oda has reportedly slept only 3 hours per night during One Piece\'s serialization, working in a studio that has accumulated thousands of reference volumes.',
      'Kentaro Miura worked on Berserk for 32 years before passing in 2021, leaving behind 364 chapters of arguably the most detailed pen-and-ink artwork in manga history.',
      'Hayao Miyazaki has announced retirement multiple times — at least five officially — and returned each time, saying he "couldn\'t stop drawing."',
      'The creator duo CLAMP consists of four women who have authored over 20 major series, including Cardcaptor Sakura and X/1999, making them among the most influential figures in manga history.',
      'Akira Toriyama designed the characters for the Dragon Quest video game series alongside Dragon Ball — his visual influence extends far beyond manga into global gaming culture.',
      'Many manga artists develop repetitive strain injuries and vision problems from the grueling weekly production schedule, which typically demands 18–20 pages in seven days.',
    ],
    notableWorks: ['Osamu Tezuka', 'Akira Toriyama', 'Eiichiro Oda', 'Hayao Miyazaki', 'Naoko Takeuchi', 'Kentaro Miura', 'Hajime Isayama', 'Koyoharu Gotouge'],
  },

  shonen: {
    slug: 'shonen',
    intro:
      'Shōnen (少年, "young boy") manga and anime is the dominant demographic category of the medium worldwide, targeting readers aged 12–18 with action, adventure, friendship, and perseverance themes. The shōnen tradition has produced the most commercially successful series in manga history and defined global pop culture for generations.',
    history: [
      { year: '1959', event: 'Weekly Shōnen Jump\'s predecessor, Weekly Shōnen Magazine, launches — the first mass-market manga anthology specifically targeting young male readers.' },
      { year: '1968', event: 'Weekly Shōnen Jump launches, featuring reader survey cards that let fans vote on chapters — unpopular series get cut, popular ones run indefinitely.' },
      { year: '1984', event: 'Dragon Ball begins in Jump; it peaks at 53 million circulation and introduces the "power level / training arc" shōnen template still dominant today.' },
      { year: '1999', event: 'Naruto and One Piece both launch; alongside Bleach they form the "Big Three" that dominate global shōnen culture for fifteen years.' },
      { year: '2009', event: 'Attack on Titan launches in Shōnen Magazine, proving the demographic can sustain morally complex, dark narratives beyond battle power systems.' },
      { year: '2016', event: 'My Hero Academia peaks global popularity as the "next Big Three" debate begins, with Demon Slayer, JJK, and MHA all launching within years of each other.' },
      { year: '2020', event: 'Demon Slayer: Mugen Train earns $504M globally, the highest-grossing anime film ever, and makes Shōnen Jump the most valuable weekly publication in comics.' },
    ],
    facts: [
      'The core shōnen values — "friendship, effort, victory" (友情・努力・勝利) — are literally written into Weekly Shōnen Jump\'s editorial mission statement.',
      'One Piece has been in continuous weekly serialization since 1997, making Eiichiro Oda\'s run of 27+ years the longest active shōnen manga series by a single author.',
      'The "power escalation" trope in shōnen — where enemies and protagonists grow exponentially stronger each arc — was codified by Dragon Ball and is now a defining genre feature.',
      'Despite targeting boys, some of the largest shōnen fan demographics globally are female — Naruto, Attack on Titan, and Demon Slayer all have majority-female fan bases in Western markets.',
      'Jump\'s cancellation policy is brutal: a series that ranks in the bottom three of reader surveys for multiple consecutive weeks is axed — many beloved series ended this way.',
      'The shōnen tournament arc — a structured combat competition used to showcase power growth — appears in nearly every major battle shōnen and was first popularized by Dragon Ball\'s World Martial Arts Tournament.',
    ],
    notableWorks: ['One Piece', 'Dragon Ball', 'Naruto', 'Bleach', 'My Hero Academia', 'Demon Slayer', 'Jujutsu Kaisen', 'Attack on Titan'],
  },

  seinen: {
    slug: 'seinen',
    intro:
      'Seinen (青年, "young man") manga and anime targets adult male readers aged 18–40, offering narratives with greater psychological complexity, moral ambiguity, and artistic experimentation than shōnen. Seinen is the demographic responsible for many of the medium\'s most acclaimed and literarily significant works, from Berserk to Monster to Vinland Saga.',
    history: [
      { year: '1967', event: 'Big Comic, Shōgakukan\'s flagship seinen anthology, launches — it publishes works like Golgo 13, the longest-running manga series in history at 200+ volumes.' },
      { year: '1980', event: 'Young Magazine (Kodansha) launches with Akira, which becomes seinen\'s defining statement of ambition: 2,000+ pages of dystopian cyberpunk.' },
      { year: '1989', event: 'Berserk begins serialization in Young Animal; Kentaro Miura\'s dark fantasy epic sets the benchmark for seinen art detail and thematic darkness.' },
      { year: '1994', event: 'Monster by Naoki Urasawa begins in Big Comic Original; its mature mystery narrative demonstrates seinen\'s capacity for literary crime fiction.' },
      { year: '2005', event: 'Vinland Saga (Young Magazine) begins, bringing historically grounded Viking-era storytelling to a generation raised on supernatural battle manga.' },
      { year: '2010', event: 'Oyasumi Punpun pushes seinen into literary surrealism, depicting depression and trauma with techniques borrowed from fine art rather than traditional comics.' },
      { year: '2019', event: 'Chainsaw Man (originally Shōnen Jump but seinen in tone) and Dungeon Meshi both demonstrate how seinen sensibilities are influencing mainstream manga.' },
    ],
    facts: [
      'Golgo 13 by Takao Saito, published since 1968 in Big Comic, holds the Guinness World Record for the longest-running manga series — over 200 volumes and still ongoing.',
      'Berserk\'s "Eclipse" story arc (chapters 75–94) is widely cited as the most emotionally devastating narrative sequence in manga history, frequently referenced in discussions of the medium\'s literary potential.',
      'Naoki Urasawa — author of Monster, 20th Century Boys, and Pluto — is the only manga artist to win the Eisner Award (American comics\' highest honor) multiple times.',
      'Seinen publications like Young Animal and Afternoon have historically been more willing to serialise experimental works that would never survive Jump\'s reader-survey cancellation system.',
      'Despite its "adult men" demographic label, seinen manga often features some of the most nuanced and empathetic portrayals of women in the medium — notably in works by Naoki Urasawa and Makoto Yukimura.',
      'Dungeon Meshi (Delicious in Dungeon) — which became a global hit anime in 2024 — spent a decade as a cult seinen manga before anime propelled it to 8 million+ copies sold.',
    ],
    notableWorks: ['Berserk', 'Vagabond', 'Vinland Saga', 'Monster', '20th Century Boys', 'Oyasumi Punpun', 'Dungeon Meshi', 'Chainsaw Man'],
  },
};
