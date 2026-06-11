export interface StandaloneGuide {
  slug: string;
  title: string;
  subtitle: string;
  readingTime: number;
  heroImage: { src: string; alt: string; credit: string; creditUrl: string; license: string };
  body: string;
}

const STANDALONE_GUIDES: StandaloneGuide[] = [
  {
    slug: 'how-to-start-reading-manga',
    title: 'How to Start Reading Manga: A Complete Beginner\'s Guide',
    subtitle: 'Everything you need to know before picking up your first volume',
    readingTime: 6,
    heroImage: {
      src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80&fit=crop&auto=format',
      alt: 'Open book on a desk with soft light',
      credit: 'Thought Catalog',
      creditUrl: 'https://unsplash.com/@thoughtcatalog',
      license: 'Unsplash License',
    },
    body: `
<p>Picking up manga for the first time can feel overwhelming. Walk into any manga section and you face hundreds of volumes, dozens of genres, and series that have been running for thirty years. This guide cuts through the noise and tells you exactly what to read first, where to read it, and how the medium works — so you spend less time researching and more time reading.</p>

<h2>How to Read Manga: Direction and Panels</h2>
<p>The first thing every new reader needs to know: manga reads <strong>right to left</strong>, top to bottom. The spine of a manga volume is on the right, and pages turn right to left. Panels within each page also flow from right to left and top to bottom. Most publishers note this at the back of translated volumes and some include a visual guide inside. It feels unnatural for about five pages, then becomes completely automatic. Within a few chapters you will not think about it at all.</p>
<p>Within a single panel, dialogue balloons and narration boxes are also read right to left, top to bottom. If two characters are speaking, the balloon on the right belongs to the speaker who talks first. When panels are stacked vertically, read from top-right to bottom-left. This grammar is consistent across all manga and will feel natural very quickly.</p>

<h2>The Best Manga for Beginners</h2>
<p>The right starting point depends on what you enjoy in other stories.</p>
<ul>
  <li><strong>For action and adventure:</strong> <em>Demon Slayer</em> (Koyoharu Gotouge, 23 volumes, complete) is the most beginner-friendly entry point in modern manga — short enough to finish in a weekend of reading, visually spectacular, and emotionally direct. <em>My Hero Academia</em> is a longer alternative with excellent character work.</li>
  <li><strong>For rich fantasy:</strong> <em>Fullmetal Alchemist</em> (Hiromu Arakawa, 27 volumes, complete) is widely considered the best-plotted manga ever made. It tells a complete, satisfying story with no filler, strong female characters, and themes that hold up for adult readers.</li>
  <li><strong>For something quiet:</strong> <em>Yotsuba&amp;!</em> (Kiyohiko Azuma, ongoing) follows a cheerful five-year-old discovering the world. No fighting, no stakes — just warm, precise slice-of-life storytelling that has converted thousands of skeptics into manga readers.</li>
  <li><strong>For romance:</strong> <em>Fruits Basket</em> (Natsuki Takaya, 23 volumes, complete) is the definitive shōjo entry point — emotionally intelligent, funny, and deeply satisfying.</li>
  <li><strong>For horror or psychological drama:</strong> <em>Monster</em> (Naoki Urasawa, 18 volumes, complete) is a clinical thriller about a surgeon who saves a child who grows up to become a serial killer. It reads like a prestige television series.</li>
</ul>

<h2>Where to Read Manga Legally</h2>
<p>You have several good options, from free to subscription to physical:</p>
<ul>
  <li><strong>Manga Plus</strong> (mangaplus.shueisha.co.jp) — Shueisha's official free platform. Legal, updated weekly, and includes the first and last three chapters of most major Jump series. The best free legal option.</li>
  <li><strong>Viz Manga / Shōnen Jump app</strong> — $2.99/month gives access to the complete digital library of Viz-licensed titles including One Piece, Naruto, and hundreds more. Excellent value.</li>
  <li><strong>Crunchyroll Manga</strong> — Included with some Crunchyroll subscriptions. Strong selection of simulpub titles updated weekly.</li>
  <li><strong>Physical volumes</strong> — Available at most bookshops and online. Paperback volumes typically cost $10–13 each. Many readers prefer physical for longer series.</li>
</ul>

<h2>Understanding Manga Genres</h2>
<p>Manga is categorised by demographic rather than content genre. <em>Shōnen</em> (少年, "boy") targets teenage boys and features action, friendship, and growth — this is where One Piece, Demon Slayer, and Naruto live. <em>Shōjo</em> (少女, "girl") targets teenage girls and emphasises relationships and emotional interiority. <em>Seinen</em> (青年, "young man") targets adult men and tends toward more complex or darker storytelling. <em>Josei</em> (女性, "woman") targets adult women with more grounded romantic and slice-of-life stories.</p>
<p>These categories describe the magazine the manga runs in, not a hard limit on who reads it. Some of the most passionate shōnen readers are adult women; some of the most dedicated seinen readers are teenagers. Read what sounds interesting regardless of the label.</p>

<h2>How Long Does It Take to Read Manga?</h2>
<p>An average manga volume takes 20–30 minutes to read. A 23-volume completed series like Demon Slayer represents 8–10 hours of reading — a weekend. Longer ongoing series like One Piece (1,100+ chapters) are multi-month or multi-year commitments. There is no obligation to binge everything at once. Many readers follow ongoing series one chapter per week as they release, the same way the original Japanese readers do.</p>

<h2>What to Read After Your First Series</h2>
<p>Once you have finished your first series, the manga landscape opens up quickly. If you enjoyed Demon Slayer, try <em>Jujutsu Kaisen</em> or <em>Blue Exorcist</em>. If Fullmetal Alchemist captured you, move to <em>Vinland Saga</em> or <em>Berserk</em>. If Yotsuba&amp;! was your entry, try <em>A Silent Voice</em> or <em>March Comes in Like a Lion</em>. The medium rewards exploration — its range is wider than most Western readers expect on first encounter.</p>
    `,
  },
  {
    slug: 'what-is-isekai',
    title: 'What Is Isekai? The Complete Guide to the Genre',
    subtitle: 'From humble web novel origins to the genre that conquered anime',
    readingTime: 6,
    heroImage: {
      src: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=1200&q=80&fit=crop&auto=format',
      alt: 'Fantasy landscape with dramatic light',
      credit: 'Jeremy Perkins',
      creditUrl: 'https://unsplash.com/@jeremyperkins',
      license: 'Unsplash License',
    },
    body: `
<p>Search any anime streaming platform and isekai is everywhere — a hero wakes up in a fantasy world, discovers they have a special ability, and begins an adventure that blends game mechanics with medieval world-building. The genre dominates seasonal anime charts, light novel bestseller lists, and manga rankings simultaneously. To understand modern manga and anime, you need to understand isekai: what it is, where it came from, and why it resonates with millions of readers worldwide.</p>

<h2>What Does Isekai Mean?</h2>
<p><em>Isekai</em> (異世界) is a Japanese word meaning "different world" or "another world." As a genre, it describes stories in which a character from the ordinary world is transported, reincarnated, or summoned into a parallel world — typically a fantasy realm that resembles a role-playing video game, complete with levels, stats, skills, and monsters. The protagonist usually possesses an unusual ability or advantage unavailable to native inhabitants: foreknowledge of game mechanics, skills from their previous life, or a divine blessing that makes them uniquely powerful.</p>
<p>The appeal is legible: isekai is a power fantasy dressed in the mechanics of JRPGs. The reader, who likely has played games and understands their systems, can inhabit a character who navigates a fantasy world with the same logic they apply to Final Fantasy or Dragon Quest — but with narrative stakes and emotional consequences that a game cannot fully provide.</p>

<h2>The Origins of Isekai</h2>
<p>The isekai concept long predates its current genre label. Lewis Carroll's <em>Alice's Adventures in Wonderland</em> (1865) and L. Frank Baum's <em>The Wonderful Wizard of Oz</em> (1900) are structural isekai. Japanese literary antecedents include the 8th-century folk tale of <em>Urashima Tarō</em>, who visits an underwater kingdom. In manga, <em>Inuyasha</em> (Rumiko Takahashi, 1996) sent a modern Japanese schoolgirl to feudal Japan — a template the genre would develop further.</p>
<p>The modern isekai genre crystallised in the 2000s on <a href="https://syosetu.com/" target="_blank" rel="noopener">Shōsetsuka ni Narō</a> ("Let's Become a Novelist"), a free Japanese web fiction platform where amateur writers could post serialised stories and receive immediate reader feedback. Authors discovered that isekai stories — particularly those featuring overpowered protagonists who rise to dominance through game-like progression — attracted enormous audiences. Publishers began acquiring successful Narou stories, adapting them into light novels, and then into manga and anime. <em>Sword Art Online</em>, <em>Re:Zero</em>, <em>Overlord</em>, and <em>That Time I Got Reincarnated as a Slime</em> all followed this pipeline.</p>

<h2>The Most Popular Isekai Series</h2>
<p>The isekai genre has produced some of the biggest commercial successes in recent manga and anime:</p>
<ul>
  <li><strong>Sword Art Online</strong> (Reki Kawahara) — the series that mainstreamed isekai internationally, following players trapped inside a virtual reality game where death is permanent. Over 27 million volumes sold worldwide.</li>
  <li><strong>Re:Zero − Starting Life in Another World</strong> (Tappei Nagatsuki) — a psychological deconstruction of isekai tropes, where the protagonist respawns after death with no memory gain but accumulating trauma. Critically acclaimed for its emotional depth.</li>
  <li><strong>That Time I Got Reincarnated as a Slime</strong> (Fuse) — a subversive take where the protagonist reincarnates as a slime monster rather than a heroic figure. Over 37 million volumes sold; one of the genre's biggest ongoing franchises.</li>
  <li><strong>Overlord</strong> (Kugane Maruyama) — the protagonist is trapped in a game's final moments and becomes the most powerful undead entity in a new world. Notable for its morally complex protagonist who is, by conventional standards, a villain.</li>
  <li><strong>Mushoku Tensei: Jobless Reincarnation</strong> (Rifujin na Magonote) — considered by many the genre's most technically sophisticated entry, following a protagonist reincarnated as a baby with memories of his past life and extraordinary magical aptitude.</li>
</ul>

<h2>Types of Isekai Stories</h2>
<p>The genre has diversified significantly as it matured. The main subgenres include:</p>
<ul>
  <li><strong>Classic transport isekai</strong> — protagonist is summoned or transported (truck-kun is a running joke: many protagonists die by being hit by a truck). Includes Sword Art Online and No Game No Life.</li>
  <li><strong>Reincarnation isekai</strong> — protagonist dies and is reborn in another world, often as a baby. Mushoku Tensei is the landmark example.</li>
  <li><strong>Villainess isekai</strong> — the protagonist reincarnates as the villain of an otome game and must avoid a "bad ending." <em>My Next Life as a Villainess</em> is the best-known example; the subgenre is particularly popular with female readers.</li>
  <li><strong>Slow life isekai</strong> — protagonist uses modern knowledge to live comfortably rather than fighting. <em>Spice and Wolf</em> (economics-focused trading) and various farming/crafting isekai fit here.</li>
</ul>

<h2>Why Is Isekai So Popular?</h2>
<p>Isekai's dominance has several structural explanations. The genre offers explicit power progression — characters grow measurably stronger over time, a satisfaction borrowed directly from RPG mechanics. It offers wish fulfillment without the guilt of a conventional power fantasy, because the protagonist's advantages are framed as earned or divinely granted rather than arbitrary. And it provides the fantasy of a fresh start: a protagonist who was ordinary or even a failure in their original world discovers that in the new world, their mundane knowledge or latent abilities make them exceptional.</p>
<p>Critics point out the genre's repetitiveness — the same overpowered protagonist template, the same harem of devoted companions, the same escalating threats — as evidence of creative stagnation. The counterargument is that genre conventions exist precisely so readers know what they are getting, and the best isekai authors (Nagatsuki, Maruyama, Kawahara) use those conventions as a framework for genuine character development and thematic exploration.</p>

<h2>Best Isekai to Start With</h2>
<p>If you are new to the genre, three starting points cover its range well. <strong>That Time I Got Reincarnated as a Slime</strong> is the most accessible and cheerful entry — no darkness, good pacing, satisfying world-building. <strong>Re:Zero</strong> is the most emotionally demanding and rewarding — it interrogates isekai assumptions rather than fulfilling them. <strong>Mushoku Tensei</strong> (manga adaptation recommended over light novel for newcomers) is the most ambitious and novelistic. Any of the three will give you a clear sense of what the genre can do at its best.</p>
    `,
  },
  {
    slug: 'best-manga-2025',
    title: 'Best Manga of 2025: Essential Reading List',
    subtitle: 'The standout series, new releases, and hidden gems of the year',
    readingTime: 5,
    heroImage: {
      src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80&fit=crop&auto=format',
      alt: 'Stack of books on a wooden surface',
      credit: 'Thought Catalog',
      creditUrl: 'https://unsplash.com/@thoughtcatalog',
      license: 'Unsplash License',
    },
    body: `
<p>2025 has been a year of transitions in manga: major long-running series have reached milestone chapters, new titles have broken through from web novel origins, and a handful of completed series have earned the kind of retrospective praise usually reserved for classics. This list covers the essential reading of 2025 — ongoing juggernauts, satisfying completions, and breakout new titles worth your time.</p>

<h2>Best Ongoing Manga in 2025</h2>
<p><strong>One Piece</strong> (Eiichiro Oda) continued its Final Saga in 2025 with revelations that rewarded readers who have followed the series since 1997. Oda has described this as the most ambitious arc he has ever written, and the chapter-by-chapter release has generated consistent viral moments on social media. If you have been waiting to catch up, 2025 is arguably the best time to do so — the story's accumulated mythology pays off in ways that earlier arcs only hinted at.</p>
<p><strong>Jujutsu Kaisen</strong> (Gege Akutami) delivered some of its most technically accomplished fight sequences in 2025, with Akutami's panel composition reaching new levels of kinetic complexity. The series entered its concluding arc with a focus and urgency that dispelled concerns about late-series pacing.</p>
<p><strong>Dungeon Meshi</strong> (Ryōko Kui), though completed in 2023, continued to attract new readers in 2025 following its acclaimed anime adaptation. Its exploration of ecology, ethics, and community through the frame of a party that cooks and eats dungeon monsters is unlike anything else in the medium.</p>

<h2>Best New Manga of 2025</h2>
<p>Several new series launched in 2025 that warranted immediate attention. <strong>Sakamoto Days</strong>, while launched in 2020, reached mainstream Western attention in 2025 through its anime adaptation and is the rare action comedy that is genuinely funny and genuinely exciting in equal measure — following a retired assassin who now runs a convenience store. New launches in Weekly Shōnen Jump and Jump+ continued the trend of tightly plotted series designed for completion rather than indefinite continuation.</p>
<p>The isekai category saw several notable 2025 launches that distinguished themselves from the genre's repetitive mainstream: stories that used the transported-to-another-world frame to explore economics, ecology, or political systems rather than combat progression. The slow diversification of isekai away from pure power fantasy continued at pace.</p>

<h2>Best Completed Series to Catch Up On in 2025</h2>
<p>2025 is an excellent year to read manga that ended in the previous two years, when enough critical perspective has accumulated to know which completions were satisfying. The shortlist:</p>
<ul>
  <li><strong>Chainsaw Man Part 1</strong> (Tatsuki Fujimoto, 97 chapters) — the most formally ambitious Weekly Shōnen Jump series in years, deliberately subverting every genre expectation. Its nihilism is earned rather than performative, and its ending is divisive in exactly the way that meaningful artistic choices are divisive.</li>
  <li><strong>Spy x Family</strong> (Tatsuya Endo) — ongoing but excellent for binge-reading. A spy assembles a fake family — adopting a telepathic daughter and marrying an assassin — for a mission. The comedy of their mutual deception is warm and brilliantly constructed.</li>
  <li><strong>Frieren: Beyond Journey's End</strong> (Kanehito Yamada and Tsukasa Abe) — an elven mage reflects on a hero's journey decades after its completion, exploring what adventure and loss mean across a lifespan measured in centuries. Quietly devastating and unlike anything else being published.</li>
</ul>

<h2>Best Manga for Readers New to the Medium in 2025</h2>
<p>For readers approaching manga for the first time in 2025, the accessibility of the current landscape is better than it has ever been. Legal digital platforms offer complete series at low cost; physical volumes are widely available. The best starting points for 2025 newcomers remain <em>Demon Slayer</em> (23 volumes, complete, extraordinary anime adaptation to follow), <em>Fullmetal Alchemist</em> (27 volumes, complete, universally acclaimed), and <em>Frieren: Beyond Journey's End</em> (ongoing, accessible even without prior manga experience).</p>

<h2>Where to Read These Series</h2>
<p>All titles mentioned are available through <strong>Manga Plus</strong> (free, official, Shueisha titles), the <strong>Viz Manga app</strong> ($2.99/month, extensive library), <strong>Crunchyroll Manga</strong>, and <strong>Amazon Kindle</strong> (individual volume purchases). Physical volumes are available from most major bookshops and Amazon. Reading legally supports the creators who make the medium possible.</p>
    `,
  },
];

export function getStandaloneGuide(slug: string): StandaloneGuide | null {
  return STANDALONE_GUIDES.find((g) => g.slug === slug) ?? null;
}

export function getAllStandaloneGuides(): StandaloneGuide[] {
  return STANDALONE_GUIDES;
}
