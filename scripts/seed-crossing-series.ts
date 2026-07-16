/**
 * Seeds the series row for "What Survives the Crossing".
 *
 * Unlike the other four seed scripts, this one does NOT generate anything. It
 * only creates the Series record. Every essay in this series is written by hand
 * in scripts/authored-crossing.ts and published with scripts/publish-authored.ts.
 * There is no GEMINI_API_KEY or ANTHROPIC_API_KEY requirement here.
 *
 * Run with: npx tsx scripts/seed-crossing-series.ts
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
  title: 'What Survives the Crossing',
  slug: 'what-survives-the-crossing',
  category: 'manga',
  description:
    'What changes when manga and anime cross languages. A close-reading series on translation, localization, dubbing, and lettering — on titles renamed by lawyers, sound effects drawn into the art, and the difference between carrying a work across and rebuilding it on the far bank.',
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
