/**
 * Seeds the "The Numbers Behind the Manga" numerology essay series and generates
 * each part with Gemini (the real numbers are computed in code and injected into
 * the prompt, so the readings stay accurate). Idempotent — re-running skips parts
 * that already exist.
 *
 * Run with: npx tsx scripts/seed-numerology-series.ts
 * Requires GEMINI_API_KEY (read from .env / .env.local) and DATABASE_URL.
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
  title: 'The Numbers Behind the Manga',
  slug: 'numbers-behind-the-manga',
  category: 'numerology',
  description:
    'A numerological reading of anime and manga — the franchises, heroes, creators, and studios of the medium, seen through the numbers their names reduce to. A lens for paying attention, not a forecast.',
};

// Each part: the topic Gemini writes to, and the subjects whose numbers are
// computed in code and injected so the prose stays accurate.
const TOPICS: { topic: string; subjects: string[] }[] = [
  {
    topic:
      'How to Read Manga Through Numbers: the method, the nine archetypes, and why a lens is worth using even if it is only a lens',
    subjects: ['Manga', 'Anime', 'Shonen'],
  },
  {
    topic: "The Big Three's Destiny Numbers: what One Piece, Naruto, and Bleach reduce to and how it maps to their stories",
    subjects: ['One Piece', 'Naruto', 'Bleach'],
  },
  {
    topic:
      'The New Guard: reading Demon Slayer, Jujutsu Kaisen, and Chainsaw Man through the numbers that succeeded the Big Three',
    subjects: ['Demon Slayer', 'Jujutsu Kaisen', 'Chainsaw Man'],
  },
  {
    topic: "What the Heroes' Names Vibrate To: the numerology of Monkey D. Luffy, Son Goku, and Guts",
    subjects: ['Monkey D. Luffy', 'Son Goku', 'Guts'],
  },
  {
    topic: 'The Mangaka Numbers: reading Eiichiro Oda, Kentaro Miura, and Rumiko Takahashi through their names',
    subjects: ['Eiichiro Oda', 'Kentaro Miura', 'Rumiko Takahashi'],
  },
  {
    topic: 'Reading the Studios: what Studio Ghibli, MAPPA, Ufotable, and Studio Pierrot reduce to',
    subjects: ['Studio Ghibli', 'MAPPA', 'Ufotable', 'Studio Pierrot'],
  },
  {
    topic: 'The Numbers of the Machine: Shueisha and Weekly Shonen Jump, the institutions behind the medium',
    subjects: ['Shueisha', 'Weekly Shonen Jump'],
  },
  {
    topic: 'Master Numbers in Anime: the 11, 22, and 33 — the titles and names that carry the master vibrations',
    subjects: ['Neon Genesis Evangelion', 'Fullmetal Alchemist', 'Attack on Titan'],
  },
  // ── Second batch ──────────────────────────────────────────────────────────
  {
    topic: 'The Modern Titans: reading Attack on Titan, Death Note, and Fullmetal Alchemist through their numbers',
    subjects: ['Attack on Titan', 'Death Note', 'Fullmetal Alchemist'],
  },
  {
    topic: "The Rivals and Villains: what Madara Uchiha, Sosuke Aizen, and Frieza's names vibrate to",
    subjects: ['Madara Uchiha', 'Sosuke Aizen', 'Frieza'],
  },
  {
    topic: 'The Founding Fathers: Osamu Tezuka, Akira Toriyama, and Hayao Miyazaki through numerology',
    subjects: ['Osamu Tezuka', 'Akira Toriyama', 'Hayao Miyazaki'],
  },
  {
    topic: 'The Second Wave of Studios: Madhouse, Bones, Wit Studio, and Kyoto Animation',
    subjects: ['Madhouse', 'Bones', 'Wit Studio', 'Kyoto Animation'],
  },
  {
    topic: 'The Manhwa Numbers: reading Solo Leveling, Tower of God, and The God of High School',
    subjects: ['Solo Leveling', 'Tower of God', 'The God of High School'],
  },
  {
    topic: 'The Classics: Dragon Ball, Sailor Moon, and Cowboy Bebop through the numbers',
    subjects: ['Dragon Ball', 'Sailor Moon', 'Cowboy Bebop'],
  },
  {
    topic: 'The Isekai Constellation: Re:Zero, Sword Art Online, and That Time I Got Reincarnated as a Slime',
    subjects: ['Re:Zero', 'Sword Art Online', 'That Time I Got Reincarnated as a Slime'],
  },
  {
    topic: 'The Heroines: reading Nezuko Kamado, Mikasa Ackerman, and Sakura Kinomoto through their names',
    subjects: ['Nezuko Kamado', 'Mikasa Ackerman', 'Sakura Kinomoto'],
  },
  // ── Third batch ───────────────────────────────────────────────────────────
  {
    topic: 'The Seinen Giants: reading Berserk, Vagabond, and Vinland Saga through the numbers',
    subjects: ['Berserk', 'Vagabond', 'Vinland Saga'],
  },
  {
    topic: 'The Court and the Pitch: numerology of Haikyuu, Slam Dunk, and Blue Lock',
    subjects: ['Haikyuu', 'Slam Dunk', 'Blue Lock'],
  },
  {
    topic: "The New Heroes: what Tanjiro Kamado, Satoru Gojo, and Denji's names vibrate to",
    subjects: ['Tanjiro Kamado', 'Satoru Gojo', 'Denji'],
  },
  {
    topic: 'The Mecha Legends: Mobile Suit Gundam, Code Geass, and Gurren Lagann through numerology',
    subjects: ['Mobile Suit Gundam', 'Code Geass', 'Gurren Lagann'],
  },
  {
    topic: 'The Auteur Directors: reading Hideaki Anno, Makoto Shinkai, and Satoshi Kon',
    subjects: ['Hideaki Anno', 'Makoto Shinkai', 'Satoshi Kon'],
  },
  {
    topic: 'The Long-Runners: Detective Conan, Doraemon, and Crayon Shin-chan through the numbers',
    subjects: ['Detective Conan', 'Doraemon', 'Crayon Shin-chan'],
  },
  {
    topic: 'Romance and Shojo: numerology of Fruits Basket, Nana, and Ouran High School Host Club',
    subjects: ['Fruits Basket', 'Nana', 'Ouran High School Host Club'],
  },
  {
    topic: 'The Modern Studios: Trigger, CloverWorks, A-1 Pictures, and Toei Animation',
    subjects: ['Trigger', 'CloverWorks', 'A-1 Pictures', 'Toei Animation'],
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
  let slug = base || 'numerology-essay';
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

  // Import after env is loaded so lib/essay picks up the key.
  const { generateNumerologyEssay } = await import('../lib/essay');

  // Upsert the series.
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

  const baseDate = new Date('2026-07-01T09:00:00Z');
  let failures = 0;

  for (let i = 0; i < TOPICS.length; i++) {
    const partNumber = i + 1;
    const { topic, subjects } = TOPICS[i];

    const existing = await prisma.article.findFirst({
      where: { seriesId: series.id, seriesOrder: partNumber },
      select: { id: true, slug: true },
    });
    if (existing) {
      console.log(`  Part ${partNumber}: exists (${existing.slug}) — skipping`);
      continue;
    }

    console.log(`  Part ${partNumber}: generating "${topic.slice(0, 60)}…"`);

    // Gemini occasionally returns malformed JSON; retry a couple of times and,
    // on persistent failure, skip this part (a re-run will pick it up) rather
    // than aborting the whole batch.
    let essay: Awaited<ReturnType<typeof generateNumerologyEssay>> | null = null;
    for (let attempt = 1; attempt <= 3 && !essay; attempt++) {
      try {
        essay = await generateNumerologyEssay(
          SERIES.title,
          SERIES.description,
          topic,
          partNumber,
          TOPICS.length,
          subjects,
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
        source: 'Catzye Numerology Desk',
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
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
