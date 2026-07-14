/**
 * Seeds "The Serialization Machine" — a reported essay series about the
 * commercial and editorial forces that shape manga: the weekly deadline, the
 * reader survey, the editor, cancellation, the production committee, and the
 * bodies that break under all of it.
 *
 * Deliberately NOT a numerology series. Where "The Numbers Behind the Manga"
 * used a frame it openly admitted was only a frame, this one makes claims that
 * are meant to be checkable — so lib/essay.ts's generateIndustryEssay forbids
 * invented figures and quotes.
 *
 * Run with: npx tsx scripts/seed-serialization-series.ts
 * Requires GEMINI_API_KEY (read from .env / .env.local) and DATABASE_URL.
 * Idempotent — re-running skips parts that already exist.
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Load env BEFORE importing lib/essay (which reads GEMINI_API_KEY at module load).
function loadEnv(file: string) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    if (process.env[key]) continue; // don't override real env
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}
loadEnv('.env');
loadEnv('.env.local');

const prisma = new PrismaClient();

const SERIES = {
  title: 'The Serialization Machine',
  slug: 'the-serialization-machine',
  category: 'industry',
  description:
    'How manga actually gets made, sold, and killed. A reported essay series on the machinery behind the medium — the weekly deadline, the reader survey, the editor, the production committee, and the creative consequences of all of it.',
};

// Each part: the topic, plus the anchor cases the essay must genuinely engage
// with rather than name-drop. Keeping the anchors concrete is what stops the
// model drifting into vague industry gestures.
const TOPICS: { topic: string; anchors: string[] }[] = [
  {
    topic:
      'The Weekly Deadline: what it means to draw roughly nineteen pages every week, forever — the single constraint that shapes almost everything else about mainstream manga',
    anchors: [
      'The weekly serialization schedule of Weekly Shonen Jump and what a typical week actually looks like for a serialized artist',
      'Why the weekly format is unusual by global comics standards, and how it differs from the monthly and quarterly rhythms elsewhere',
      'The visible consequences in the art itself: sketchier weeks, recycled backgrounds, splash pages used to buy time',
    ],
  },
  {
    topic:
      'The Reader Survey: the feedback loop that decides which series live, and how a postcard from a teenager became the most powerful force in shonen manga',
    anchors: [
      'How the Weekly Shonen Jump reader survey works and how results feed back into page order within the magazine',
      'Position in the magazine as both a signal and a sentence — what it means to run at the back',
      'The creative distortion the survey produces: cliffhanger inflation, the pressure to escalate, the reluctance to write a quiet chapter',
    ],
  },
  {
    topic:
      'The Editor: the most misunderstood job in manga, and the argument that the medium’s defining works are collaborations that only carry one name',
    anchors: [
      'Kazuhiko Torishima and Akira Toriyama — the rejections, the redrafts, and what that relationship actually consisted of',
      'What a manga editor does day to day, and how the role differs from an American comics editor',
      'The uncomfortable question of credit: where the line falls between editorial guidance and co-authorship',
    ],
  },
  {
    topic:
      'Cancellation: the ten-week guillotine, the abrupt final chapter, and what a killed series looks like from the inside',
    anchors: [
      'How quickly an underperforming Jump series can be ended, and the tell-tale signs of a compressed ending',
      'Specific well-documented cases of series that were plainly cut short, and how the last chapters read differently as a result',
      'The survivorship bias in how fans discuss manga: we argue about the canon and never see the graveyard',
    ],
  },
  {
    topic:
      'The Invisible Studio: the assistants, the backgrounds, and the fiction of the solitary genius with a pen',
    anchors: [
      'What manga assistants actually do — backgrounds, screentone, inking, and the division of labour on a weekly title',
      'The single-byline convention and why manga credits so little of the labour on the page',
      'Assistants who became major authors themselves, and what the apprenticeship pipeline produces',
    ],
  },
  {
    topic:
      'Where the Money Actually Is: the magazine loses money, the tankobon pays for everything, and why that inverts what you assume about the business',
    anchors: [
      'The economics of the anthology magazine as a loss-leading advertisement for collected volumes',
      'How royalties broadly work for a serialized mangaka, and why volume sales dominate the picture',
      'What this economic structure rewards: length, continuity, and the collectible arc',
    ],
  },
  {
    topic:
      'The Production Committee: the ownership structure that explains why an anime can be a hit while the people who made it see little of the money',
    anchors: [
      'What a production committee is, who sits on it, and how rights and revenue are actually divided',
      'Why animation studios are frequently contractors rather than owners of the work they make',
      'The consequences for creative control, and for a studio’s ability to build durable value from a hit',
    ],
  },
  {
    topic:
      'The Anime as Advertisement: the adaptation is not the destination, it is the marketing, and once you see it you cannot unsee it',
    anchors: [
      'The historical role of anime adaptation in driving manga volume sales',
      'How the timing of an adaptation is tied to the publisher’s commercial calendar rather than the story’s natural shape',
      'The modern complication: streaming money changing the incentives, and adaptations that now function as products in themselves',
    ],
  },
  {
    topic:
      'Filler and the Overtaking Problem: what happens when a weekly anime catches up with a weekly manga, and the strange artifacts it leaves behind',
    anchors: [
      'The structural cause of filler: an adaptation running at the speed of its source',
      'Anime-original endings and the Fullmetal Alchemist case — the 2003 series versus Brotherhood as a natural experiment',
      'Why the industry has partly solved this with seasonal, split-cour scheduling, and what was lost and gained',
    ],
  },
  {
    topic:
      'The Incentive Never to End: how commercial success traps a story, and why the manga you love may be structurally forbidden from finishing',
    anchors: [
      'The economics of a long-running hit and the institutional pressure against concluding it',
      'One Piece and the difference between a long story and a stretched one',
      'Well-documented cases of arcs that visibly expanded under success, and how a reader can tell',
    ],
  },
  {
    topic:
      'The Rushed Ending: the most common tragedy in manga, and a taxonomy of the ways a story gets compressed to death',
    anchors: [
      'The difference between an ending that is quick and an ending that is amputated',
      'Concrete, well-documented examples of endings widely read as compressed, and the textual evidence for it',
      'Whether the reader is a fair judge here — the risk of blaming the machine for a writer’s genuine choice',
    ],
  },
  {
    topic:
      'The Metrics Replace the Postcard: Shonen Jump+, click data, and what happens when the survey becomes a dashboard',
    anchors: [
      'How Shonen Jump+ and the digital-first platforms measure readership differently from the paper survey',
      'What kinds of series the digital metric rewards that the paper survey did not — and vice versa',
      'Spy x Family and the argument that digital-first has genuinely widened what can get serialized',
    ],
  },
  {
    topic:
      'The Vertical Scroll: how webtoon killed the page, and what the format’s economics do to the storytelling',
    anchors: [
      'The formal shift from the composed double-page spread to the infinite vertical scroll',
      'Naver and Kakao’s episode-unlock monetisation, and the pacing incentives it creates',
      'The studio model in Korean webtoon production and how it differs from the Japanese assistant system',
    ],
  },
  {
    topic:
      'Piracy and the Scanlation Paradox: the thing that spread manga worldwide and the thing that takes money out of it are the same thing',
    anchors: [
      'The historical role of scanlation in building an international readership before official channels existed',
      'The industry’s current anti-piracy posture and the rise of official simultaneous publication as the real answer',
      'The genuine ambivalence here — refusing the easy moral, and being honest about who was and was not harmed',
    ],
  },
  {
    topic:
      'The Bodies That Break: hiatus, illness, and the human cost of a schedule that was never designed for a human',
    anchors: [
      'Yoshihiro Togashi’s documented back problems and the long Hunter x Hunter hiatuses',
      'Kentaro Miura’s death and Berserk left unfinished — what it means for a work to outlive the hand that made it',
      'How the industry has and has not changed its practices in response, and what a humane schedule would even look like',
    ],
  },
  {
    topic:
      'Who Gets to Debut: the award pipeline, the one-shot, and the narrow gate every mangaka has to pass through',
    anchors: [
      'The rookie award and one-shot system as the standard route into serialization',
      'What the pipeline selects for, and the kinds of talent it is structurally likely to miss',
      'The counter-route: doujinshi, social media, and creators who arrived without the gate’s permission',
    ],
  },
  {
    topic:
      'The Women of the Industry: shojo’s commercial engine, the Year 24 Group, and the persistent gap between influence and institutional power',
    anchors: [
      'The Year 24 Group and the artistic reinvention of shojo, against its commercial context',
      'The magazine structure that segregates readership by gender and age, and what that structure does to careers',
      'Where women’s creative influence in manga is enormous and where institutional power still is not — being precise rather than sweeping',
    ],
  },
  {
    topic:
      'The Character Economy: merchandising, licensing, and the moment a story stops being a story and becomes an asset',
    anchors: [
      'How character licensing and merchandise revenue can dwarf the income from the comic itself',
      'The design consequences: silhouettes that read at figurine scale, casts built for collectibility',
      'Where this is a corrupting force and where it is simply how the medium has always funded itself',
    ],
  },
  {
    topic:
      'The Animator’s Wage: the labour crisis at the bottom of a booming industry, and the gap between record revenue and the people drawing the frames',
    anchors: [
      'The documented pay structure for in-between animators and the piece-rate system',
      'The MAPPA overwork discourse and what animators themselves have publicly said about conditions',
      'Why a boom in streaming revenue has not straightforwardly reached the people doing the drawing',
    ],
  },
  {
    topic:
      'The Streaming Gold Rush: what Netflix, Crunchyroll, and the global licensing money did to what gets greenlit',
    anchors: [
      'The scale of the shift from a domestic disc-sales market to a global streaming market',
      'How that changed which projects get funded, and the resulting production volume and its strain',
      'The argument that the audience got more anime and the industry got less able to make it well',
    ],
  },
  {
    topic:
      'The Adaptation Bottleneck: too many shows, not enough people, and an industry producing more than it can physically draw',
    anchors: [
      'The production volume problem and the shortage of experienced key animators and directors',
      'Visible symptoms: delayed episodes, recap episodes, and the quality collapses fans notice',
      'Whether the ceiling here is money, time, or trained hands — and why the answer matters',
    ],
  },
  {
    topic:
      'The Next Pressure: AI, and the honest case for both alarm and scepticism about what it does to a medium built on drawn labour',
    anchors: [
      'Where generative tools plausibly touch the manga and anime pipeline first, and where they realistically do not',
      'The specific vulnerability of the in-between and background layers — the same layers that function as the industry’s training ground',
      'Refusing both the doom and the hype: what is actually known versus what is being asserted',
    ],
  },
  // ── Second movement: ownership, law, and the wider media mix ────────────────
  // Appended BEFORE the closing essay, which must remain the final part.
  {
    topic:
      'Who Actually Owns Naruto: copyright, the mangaka, and the publisher — the ownership question almost no fan can answer correctly',
    anchors: [
      'How rights are typically held between a mangaka and their publisher in Japan, and how that contrasts with the American work-for-hire tradition',
      'What it means in practice that a creator retains copyright but the publisher controls the commercial apparatus around it',
      'The cases where creators have exercised real control, and the structural reasons most do not',
    ],
  },
  {
    topic:
      'Shonen Is Not a Genre: the demographic categories are marketing segments, and mistaking them for genres explains a great deal of bad criticism',
    anchors: [
      'What shonen, shojo, seinen, and josei actually denote — the target readership of a magazine, not the content of a story',
      'Works routinely misfiled by English-language readers because the demographic label was read as a genre',
      'How the magazine segmentation shapes what a creator is permitted to write, and how creators work around it',
    ],
  },
  {
    topic:
      'The Doujinshi Tolerance: an enormous derivative-works economy that is arguably illegal and that the industry deliberately declines to stop',
    anchors: [
      'The scale and function of the doujinshi market and Comiket as its central institution',
      'The legal grey zone: why rights holders generally tolerate derivative fan works, and the commercial logic of that tolerance',
      'The pipeline argument — doujinshi as an unofficial training ground and talent scout for the professional industry',
    ],
  },
  {
    topic:
      'The Censor’s Hand: obscenity law, regulatory pressure, and the quiet ways manga has been shaped by what it is not allowed to draw',
    anchors: [
      'Japan’s obscenity provisions and the practical conventions the industry adopted in response',
      'The Tokyo youth ordinance debates and the publishers’ and creators’ reaction to them',
      'Self-censorship as the real mechanism: the edits that happen before anyone outside the building ever objects',
    ],
  },
  {
    topic:
      'The Media Mix: the theory that manga was never really the product, and that the whole system is a machine for turning a character into every possible object',
    anchors: [
      'The media-mix model as scholars such as Marc Steinberg have described it, and its historical roots in Tezuka-era licensing',
      'How a modern franchise is planned across manga, anime, film, games, and merchandise from an early stage',
      'What this does to storytelling: characters designed for portability, worlds built to be extended indefinitely',
    ],
  },
  {
    topic:
      'The Gacha Subsidy: mobile games, and the uncomfortable fact that a phone game’s whales may be funding the anime you love',
    anchors: [
      'How mobile game revenue compares in scale to disc, streaming, and merchandise income for a franchise',
      'Fate/Grand Order and the model of a game bankrolling a wider media franchise',
      'The creative consequence: adaptations greenlit as marketing for a game rather than on their own merits',
    ],
  },
  {
    topic:
      'The Theatrical Event: Demon Slayer, Mugen Train, and the film as the moment an anime stops being television and becomes an economic phenomenon',
    anchors: [
      'The Mugen Train theatrical release and what its performance demonstrated about the ceiling of anime at the box office',
      'Why the film format changes the economics — ticket revenue, ownership, and the compressed release window',
      'The strategic consequence: franchises now structured to arrive at a film, and what that does to a series’ pacing',
    ],
  },
  {
    topic:
      'The Anisong Economy: the opening theme is not a mood-setter, it is a record label’s promotional slot, and it has been since the beginning',
    anchors: [
      'How OP and ED slots function commercially for music labels and artists',
      'The tie-in structure: labels sitting on production committees and the placement of their artists',
      'Where the system nevertheless produced genuinely great music, and the artists who built careers through it',
    ],
  },
  {
    topic:
      'The Seiyuu Machine: agencies, idol careers, and how voice acting in Japan became a performance industry rather than a booth job',
    anchors: [
      'The agency system and the career structure of a working voice actor in Japan',
      'The idol-ification of the profession — concerts, singles, and public personas as a required second job',
      'The labour reality beneath the celebrity tier, and the gap between famous seiyuu and the rest',
    ],
  },
  {
    topic:
      'The Translators Nobody Credits: manga localisation, the rates, the deadlines, and the fights fans have about the results',
    anchors: [
      'The working conditions and pay structure of manga and anime translators, and the freelance basis of much of the work',
      'The recurring public fights over localisation choices, and what they usually get wrong about how the work is done',
      'Simultaneous publication and the brutal turnaround it demands from the people doing the translating',
    ],
  },
  {
    topic:
      'The Consolidation: Sony, Kadokawa, and the quiet corporate absorption of the anime pipeline',
    anchors: [
      'Sony’s position across Aniplex, Funimation, and Crunchyroll, and what that vertical integration means',
      'Kadokawa’s model — light novels, manga, anime, and games under one roof, with the light novel pipeline feeding the rest',
      'The argument for and against consolidation: stability and funding on one side, narrowed creative gatekeeping on the other',
    ],
  },
  {
    topic:
      'The Light Novel Pipeline: how an amateur web-fiction site became the industry’s primary source of new anime, and what that selection process does to the stories',
    anchors: [
      'Shosetsuka ni Naro and the web-novel-to-light-novel-to-manga-to-anime escalator',
      'What the pipeline selects for, and the structural reason so many adaptations share a house style',
      'The counter-examples: works that came through this route and are genuinely good, and why dismissing the whole pipeline is lazy',
    ],
  },
  {
    topic:
      'The Live-Action Problem: Hollywood, Japanese live-action adaptation, and a failure rate too consistent to be an accident',
    anchors: [
      'The recurring structural reasons live-action adaptations of manga struggle, beyond simple fan complaint',
      'Well-documented adaptations that failed and the specific decisions behind them',
      'The counter-cases that worked, and what they did differently',
    ],
  },
  {
    topic:
      'The Shrinking Shelf: the collapse of print circulation, the manga café, and the secondhand market the industry earns nothing from',
    anchors: [
      'The long decline in magazine circulation from its 1990s peak, and what replaced it',
      'The manga café and rental economy, and the reading that happens entirely outside a sale',
      'The secondhand market and why publishers are structurally hostile to it',
    ],
  },
  {
    topic:
      'No Union: the mangaka is a freelancer with no collective bargaining, and almost every problem in this series traces back to that fact',
    anchors: [
      'The contractual position of a serialized mangaka and the absence of collective representation',
      'How this compares to unionised creative labour elsewhere, and what protections that absence removes',
      'The recent stirrings of organisation among animators and creators, and whether they have changed anything yet',
    ],
  },
  {
    topic:
      'The Remake Economy: reboots, faithful re-adaptations, and the business logic of making the same anime twice',
    anchors: [
      'The re-adaptation trend and the commercial reasons a studio remakes a work that already has an anime',
      'Fullmetal Alchemist: Brotherhood, Hunter x Hunter (2011), and the faithful-remake model',
      'What is gained and what is lost when the industry mines its own back catalogue rather than taking a risk',
    ],
  },

  {
    topic:
      'What the Machine Explains: a closing essay. The commercial reading is powerful and it is not everything — an honest accounting of where the mechanics genuinely explain the art, and where they become an excuse not to look at it',
    anchors: [
      'The genuine explanatory wins: rushed endings, bloated arcs, and escalation are real consequences of real incentives',
      'The limits: the machine is the same for everyone, and it does not explain why one artist under those constraints made something extraordinary',
      'Why a materialist reading of art is worth doing anyway, and how it differs from a frame that merely feels illuminating',
    ],
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || 'serialization-essay';
  let suffix = 0;
  while (await prisma.article.findUnique({ where: { slug }, select: { id: true } })) {
    suffix++;
    slug = `${base}-${suffix}`;
  }
  return slug;
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required to generate the essays (checked env, .env, .env.local).');
  }

  const { generateIndustryEssay } = await import('../lib/essay');

  const series = await prisma.series.upsert({
    where: { slug: SERIES.slug },
    update: {
      title: SERIES.title,
      description: SERIES.description,
      category: SERIES.category,
      topics: TOPICS.map((t) => t.topic),
    },
    create: {
      title: SERIES.title,
      slug: SERIES.slug,
      description: SERIES.description,
      category: SERIES.category,
      topics: TOPICS.map((t) => t.topic),
    },
  });
  console.log(`Series ready: ${series.title} (${series.id})`);

  const baseDate = new Date('2026-07-14T09:00:00Z');
  let failures = 0;

  for (let i = 0; i < TOPICS.length; i++) {
    const partNumber = i + 1;
    const { topic, anchors } = TOPICS[i];

    const existing = await prisma.article.findFirst({
      where: { seriesId: series.id, seriesOrder: partNumber },
      select: { id: true, slug: true },
    });
    if (existing) {
      console.log(`  Part ${partNumber}: exists (${existing.slug}) — skipping`);
      continue;
    }

    console.log(`  Part ${partNumber}: generating "${topic.slice(0, 60)}…"`);

    // Gemini occasionally returns malformed JSON; retry, and on persistent
    // failure skip this part (a re-run picks it up) rather than aborting.
    let essay: Awaited<ReturnType<typeof generateIndustryEssay>> | null = null;
    for (let attempt = 1; attempt <= 3 && !essay; attempt++) {
      try {
        essay = await generateIndustryEssay(
          SERIES.title,
          SERIES.description,
          topic,
          partNumber,
          TOPICS.length,
          anchors,
        );
      } catch (err) {
        console.log(`    · attempt ${attempt} failed: ${(err as Error).message}`);
      }
    }
    if (!essay) {
      console.log(`    ✗ Part ${partNumber}: giving up after 3 attempts — re-run the script to retry.`);
      failures++;
      continue;
    }

    const slug = await uniqueSlug(slugify(essay.title));
    const publishedAt = new Date(baseDate.getTime() + i * 2 * 24 * 60 * 60 * 1000); // +2 days per part

    const article = await prisma.article.create({
      data: {
        title: essay.title,
        excerpt: essay.excerpt,
        content: essay.content,
        slug,
        category: SERIES.category,
        source: 'Catzye Industry Desk',
        sourceUrl: `https://catzye.com/series/${SERIES.slug}/part-${partNumber}`,
        publishedAt,
        published: true,
        tags: essay.tags,
        entities: essay.entities,
        pullQuote: essay.pullQuote || null,
        seriesId: series.id,
        seriesOrder: partNumber,
      },
    });
    console.log(`    ✓ published /article/${article.slug} (${essay.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length} words)`);
  }

  console.log(failures ? `Done, with ${failures} part(s) skipped — re-run to retry them.` : 'Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
