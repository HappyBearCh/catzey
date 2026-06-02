/**
 * Tests RSS feed parsing — verifies that item URLs are extracted correctly.
 * Run: npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/test-rss-parse.ts
 */
import axios from 'axios';
import { load } from 'cheerio';

const FEEDS = [
  { url: 'https://www.slobodna-bosna.ba/rss/100/sve_vijesti.html', source: 'Slobodna Bosna' },
  { url: 'https://www.dnevnik.ba/rss.xml', source: 'Dnevnik.ba' },
  { url: 'https://n1info.ba/feed/', source: 'N1 Bosna' },
  { url: 'https://www.klix.ba/rss', source: 'Klix.ba' },
];

const RSS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Accept: 'application/rss+xml,application/xml,text/xml,*/*;q=0.8',
  'Accept-Language': 'bs,hr,sr,en;q=0.8',
};

function cleanText(t: string) { return t.replace(/\s+/g, ' ').trim(); }

async function parseFeed(feedUrl: string, source: string) {
  console.log(`\n─── ${source} ───`);
  const res = await axios.get(feedUrl, { timeout: 15000, headers: RSS_HEADERS, responseType: 'text' });
  const $ = load(res.data, { xmlMode: true });
  const items = $('item');
  console.log(`Items in feed: ${items.length}`);

  let found = 0;
  items.slice(0, 5).each((_, el) => {
    const rawTitle = cleanText($(el).find('title').first().text())
      .replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();

    // Try different ways to get URL
    const linkText = cleanText($(el).find('link').first().text());
    const guidText = $(el).find('guid').first().text().trim();
    const url = linkText.startsWith('http') ? linkText : guidText;

    const pubDate = $(el).find('pubDate').first().text();

    const isValid = url.startsWith('http');
    found += isValid ? 1 : 0;

    console.log(`  ${isValid ? '✓' : '✗'} "${rawTitle.slice(0, 60)}"`);
    console.log(`    link text: "${linkText.slice(0, 80)}"`);
    console.log(`    guid:      "${guidText.slice(0, 80)}"`);
    console.log(`    url used:  "${url.slice(0, 80)}"`);
    console.log(`    pubDate:   "${pubDate}"`);
  });
  console.log(`Result: ${found}/5 items have valid URLs`);
}

async function main() {
  for (const feed of FEEDS) {
    try {
      await parseFeed(feed.url, feed.source);
    } catch (err) {
      console.log(`\n─── ${feed.source} ─── ERROR: ${String(err)}`);
    }
  }
}

main().catch(console.error);
