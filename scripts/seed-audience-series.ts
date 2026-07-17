/**
 * Seeds the series row for "The Audience Draws Back".
 *
 * Like scripts/seed-crossing-series.ts, this generates nothing. It only creates
 * the Series record. Every essay is written by hand in scripts/authored-audience.ts
 * and published with scripts/publish-authored.ts. No API key required.
 *
 * Run with: npx tsx scripts/seed-audience-series.ts
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
  title: 'The Audience Draws Back',
  slug: 'the-audience-draws-back',
  category: 'anime',
  description:
    'The audience as coauthor. A series on the social life of manga and anime — doujinshi and Comiket, shipping and reading against the text, the parasocial bond, cosplay, and the collector’s shelf. On the only audience in art that answers a drawing with a drawing, and on why the fan and the numerologist are the same person.',
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
