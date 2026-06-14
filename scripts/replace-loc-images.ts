/**
 * Replace all Library of Congress images with Flickr images.
 * Usage:
 *   npx tsx scripts/replace-loc-images.ts            # live run
 *   npx tsx scripts/replace-loc-images.ts --dry-run  # preview only, no DB writes
 */

// Load .env / .env.local before anything else
import { readFileSync } from 'fs';
import { resolve } from 'path';
function loadEnvFile(name: string) {
  try {
    const raw = readFileSync(resolve(process.cwd(), name), 'utf-8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* file absent — ok */ }
}
loadEnvFile('.env');
loadEnvFile('.env.local');

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 600; // stay well under Flickr's rate limit

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// ── Flickr search ──────────────────────────────────────────────────────────

interface FlickrPhoto {
  url: string;
  thumbUrl: string;
  credit: string;
  description: string;
}

async function searchFlickr(query: string): Promise<FlickrPhoto | null> {
  const apiKey = process.env.FLICKR_API_KEY;
  if (!apiKey) throw new Error('FLICKR_API_KEY not set');

  const params = new URLSearchParams({
    method: 'flickr.photos.search',
    api_key: apiKey,
    text: query,
    license: '4,5,7,9,10',   // CC BY, CC BY-SA, No known copyright, CC0, PDM
    content_type: '1',
    media: 'photos',
    sort: 'relevance',
    extras: 'url_z,url_l,owner_name,title',
    per_page: '5',
    format: 'json',
    nojsoncallback: '1',
  });

  const res = await axios.get(`https://api.flickr.com/services/rest/?${params}`, { timeout: 12000 });
  const photos: Array<{ url_l?: string; url_z?: string; owner_name?: string; title?: string }> =
    res.data?.photos?.photo ?? [];

  for (const p of photos) {
    const url = p.url_l ?? p.url_z;
    if (!url) continue;
    return {
      url,
      thumbUrl: p.url_z ?? url,
      credit: `Flickr — ${p.owner_name ?? 'unknown'}`,
      description: p.title ?? '',
    };
  }
  return null;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.FLICKR_API_KEY) {
    console.error('\n✗  FLICKR_API_KEY is not set.\n');
    console.error('  Get a free key at https://www.flickr.com/services/api/keys/');
    console.error('  Then run:\n');
    console.error('    FLICKR_API_KEY=your_key npx tsx scripts/replace-loc-images.ts\n');
    console.error('  Or add it to your .env file:\n');
    console.error('    echo "FLICKR_API_KEY=your_key" >> .env\n');
    process.exit(1);
  }

  const articles = await prisma.article.findMany({
    where: { imageUrl: { contains: 'loc.gov' } },
    select: { id: true, title: true, imageUrl: true, tags: true, category: true },
    orderBy: { publishedAt: 'desc' },
  });

  const total = articles.length;
  console.log(`\nFound ${total} articles with Library of Congress images.`);
  if (DRY_RUN) console.log('DRY RUN — no changes will be written.\n');
  else console.log('');

  let replaced = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const prefix = `[${String(i + 1).padStart(3)}/${total}]`;

    // Build query from tags first, fall back to title words
    const query = a.tags.length > 0
      ? a.tags.slice(0, 3).join(' ')
      : a.title.split(/\s+/).slice(0, 5).join(' ');

    process.stdout.write(`${prefix} ${a.title.slice(0, 55).padEnd(55)} `);

    try {
      const photo = await searchFlickr(query);

      if (!photo) {
        // Retry with shortened title if tags produced nothing
        const titleQuery = a.title.split(/\s+/).slice(0, 4).join(' ');
        const retry = query !== titleQuery ? await searchFlickr(titleQuery) : null;
        if (!retry) {
          console.log('⚠  no Flickr result — keeping LoC image');
          failed++;
          await sleep(DELAY_MS);
          continue;
        }
        Object.assign(photo ?? {}, retry);
      }

      const chosen = photo!;
      console.log(`✓  ${chosen.credit.slice(0, 50)}`);

      if (!DRY_RUN) {
        await prisma.article.update({
          where: { id: a.id },
          data: { imageUrl: chosen.url, imageCredit: chosen.credit },
        });
      }

      replaced++;
    } catch (err) {
      console.log(`✗  error: ${String(err).slice(0, 80)}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n── Done ─────────────────────────────────────`);
  console.log(`  Replaced : ${replaced}`);
  console.log(`  Failed   : ${failed} (kept original LoC image)`);
  if (DRY_RUN) console.log('  (dry run — run without --dry-run to apply)');
  console.log('');

  await prisma.$disconnect();
}

main().catch((err) => { console.error(err); process.exit(1); });
