/**
 * Seeds the series row for "Drawn to Be Loved".
 *
 * Like the other authored series (crossing, audience, belief), this generates
 * nothing. It only creates the Series record. Every essay is written by hand in
 * scripts/authored-character.ts and published with scripts/publish-authored.ts.
 * No API key required.
 *
 * Run with: npx tsx scripts/seed-character-series.ts
 * Idempotent — re-running updates the description and leaves articles alone.
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function loadEnv(file: string) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    if (process.env[m[1]]) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[m[1]] = val;
  }
}
loadEnv('.env');
loadEnv('.env.local');

const prisma = new PrismaClient();

const SERIES = {
  title: 'Drawn to Be Loved',
  slug: 'drawn-to-be-loved',
  category: 'anime',
  description:
    'How a character is built to be loved, sold, and remembered. A close-reading series on the engineering of a person — the silhouette recognizable at a glance, the oversized eyes where the soul was put, the archetype, the name, the moe designed to trigger attachment, and the merchandised body. On the paradox that a manufactured object becomes a beloved being, written by a critic whose entire conceit was reading the names of characters.',
};

async function main() {
  const series = await prisma.series.upsert({
    where: { slug: SERIES.slug },
    update: { description: SERIES.description, title: SERIES.title, category: SERIES.category },
    create: SERIES,
  });
  const count = await prisma.article.count({ where: { seriesId: series.id } });
  console.log(`Series ready: ${series.title} (${series.id})`);
  console.log(`  slug: ${series.slug}   category: ${series.category}   existing parts: ${count}`);
  console.log('\nnow run: npx tsx scripts/publish-authored.ts');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
