/**
 * Image source statistics for Catzye articles.
 * Usage: npx tsx scripts/image-stats.ts [--verbose]
 *
 * Classifies each article image by origin, showing counts and percentages.
 * Pass --verbose to list article titles under each source.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const verbose = process.argv.includes('--verbose');

interface Source {
  name: string;
  color: string;
}

function classifyUrl(url: string): string {
  // Vercel Blob — sub-classify by filename pattern
  if (url.includes('blob.vercel-storage.com') || url.includes('.public.blob.vercel-storage.com')) {
    return url.includes('/articles/ai-') ? 'AI Generated (Imagen)' : 'Vercel Blob (mirrored)';
  }
  if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) return 'Wikipedia / Wikimedia Commons';
  if (url.includes('openverse')) return 'Openverse (CC)';
  if (url.includes('pexels.com') || url.includes('images.pexels')) return 'Pexels';
  if (url.includes('pixabay.com') || url.includes('cdn.pixabay')) return 'Pixabay';
  if (url.includes('unsplash.com') || url.includes('images.unsplash')) return 'Unsplash';
  if (url.includes('flickr.com') || url.includes('staticflickr.com') || url.includes('live.staticflickr')) return 'Flickr';
  if (url.includes('loc.gov')) return 'Library of Congress';
  if (url.includes('nasa.gov') || url.includes('images-assets.nasa') || url.includes('apod.nasa')) return 'NASA';
  if (url.includes('europeana.eu') || url.includes('europeana-proxy')) return 'Europeana';
  if (url.includes('si.edu') || url.includes('ids.si.edu')) return 'Smithsonian Open Access';
  if (url.includes('dp.la') || url.includes('dpla.info')) return 'DPLA';
  if (url.includes('animenewsnetwork.com')) return 'Anime News Network';
  if (url.includes('myanimelist.net') || url.includes('cdn.myanimelist')) return 'MyAnimeList';
  if (url.includes('comicbook.com')) return 'Comic Book';
  if (url.includes('cbr.com')) return 'CBR';
  if (url.includes('bleedingcool.com')) return 'Bleeding Cool';
  if (url.includes('comicsbeat.com')) return 'The Beat';
  if (url.includes('icv2.com')) return 'ICv2';
  return 'Other / Unknown';
}

function classifyCredit(credit: string): string {
  const c = credit.toLowerCase();
  if (c.startsWith('ai generated')) return 'AI Generated (Imagen)';
  if (c.includes('wikipedia')) return 'Wikipedia / Wikimedia Commons';
  if (c.includes('wikimedia')) return 'Wikipedia / Wikimedia Commons';
  if (c.includes('openverse')) return 'Openverse (CC)';
  if (c.includes('pexels')) return 'Pexels';
  if (c.includes('pixabay')) return 'Pixabay';
  if (c.includes('unsplash')) return 'Unsplash';
  if (c.includes('flickr')) return 'Flickr';
  if (c.includes('library of congress')) return 'Library of Congress';
  if (c.includes('nasa')) return 'NASA';
  if (c.includes('europeana')) return 'Europeana';
  if (c.includes('smithsonian')) return 'Smithsonian Open Access';
  if (c.includes('dpla') || c.includes('dp.la')) return 'DPLA';
  if (c === 'uploaded') return 'Manually Uploaded';
  return '';
}

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function bar(fraction: number, width = 30): string {
  const filled = Math.round(fraction * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, imageUrl: true, imageCredit: true, published: true, category: true },
    orderBy: { publishedAt: 'desc' },
  });

  const total = articles.length;
  const withImage = articles.filter((a) => a.imageUrl);
  const withoutImage = articles.filter((a) => !a.imageUrl);

  // Classify each article
  type Row = { title: string; url: string; published: boolean; category: string };
  const bySource = new Map<string, Row[]>();

  for (const a of withImage) {
    // Prefer credit field (more accurate) over URL heuristic when available
    const source =
      (a.imageCredit ? classifyCredit(a.imageCredit) : '') ||
      classifyUrl(a.imageUrl!);

    const list = bySource.get(source) ?? [];
    list.push({ title: a.title, url: a.imageUrl!, published: a.published, category: a.category });
    bySource.set(source, list);
  }

  const sorted = [...bySource.entries()].sort((a, b) => b[1].length - a[1].length);

  // ── Print ──────────────────────────────────────────────────────────────────
  console.log(`\n${ANSI.bold}${ANSI.cyan}══ Catzye Image Source Statistics ══${ANSI.reset}\n`);
  console.log(`  Total articles  : ${ANSI.bold}${total}${ANSI.reset}`);
  console.log(`  With image      : ${ANSI.bold}${withImage.length}${ANSI.reset}  (${pct(withImage.length, total)})`);
  console.log(`  Without image   : ${ANSI.dim}${withoutImage.length}${ANSI.reset}  (${pct(withoutImage.length, total)})\n`);

  console.log(`${ANSI.bold}  Source breakdown (${withImage.length} images):${ANSI.reset}\n`);

  const nameWidth = Math.max(...sorted.map(([s]) => s.length), 12);

  for (const [source, rows] of sorted) {
    const count = rows.length;
    const fraction = count / withImage.length;
    const pctStr = pct(count, withImage.length).padStart(6);
    const barStr = bar(fraction, 28);
    const countStr = String(count).padStart(4);

    let color = ANSI.reset;
    if (source.startsWith('AI')) color = ANSI.magenta;
    else if (source.includes('Vercel Blob')) color = ANSI.blue;
    else if (source.includes('Uploaded')) color = ANSI.yellow;

    console.log(
      `  ${color}${source.padEnd(nameWidth)}${ANSI.reset}  ${ANSI.dim}${barStr}${ANSI.reset}  ${countStr}  ${pctStr}`,
    );

    if (verbose) {
      for (const row of rows) {
        console.log(`    ${ANSI.dim}[${row.published ? 'pub' : 'dft'}] ${row.title.slice(0, 70)}${ANSI.reset}`);
      }
    }
  }

  if (withoutImage.length > 0) {
    console.log(`\n${ANSI.bold}  Articles with no image:${ANSI.reset}  ${withoutImage.length}`);
    if (verbose) {
      for (const a of withoutImage) {
        console.log(`    ${ANSI.dim}[${a.published ? 'pub' : 'dft'}] ${a.title.slice(0, 70)}${ANSI.reset}`);
      }
    }
  }

  // Credit field coverage
  const withCredit = withImage.filter((a) => a.imageCredit);
  console.log(`\n${ANSI.dim}  imageCredit field populated: ${withCredit.length} / ${withImage.length} (${pct(withCredit.length, withImage.length)})${ANSI.reset}`);
  console.log(`  ${ANSI.dim}(Run prisma db push to apply the schema change, then new images will store credit automatically.)${ANSI.reset}\n`);

  await prisma.$disconnect();
}

function pct(n: number, total: number): string {
  if (total === 0) return '0%';
  return `${((n / total) * 100).toFixed(1)}%`;
}

main().catch((err) => { console.error(err); process.exit(1); });
