/**
 * Quick smoke test for the bosnjaci.net scraper logic.
 * Run: npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/test-bosnjaci.ts
 */
import axios from 'axios';
import { load } from 'cheerio';

const BOSNJACI_BASE = 'https://bosnjaci.net';

const HTTP_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'bs,hr,sr,en;q=0.8',
};

const BOSNJACI_MONTH: Record<string, number> = {
  januar: 0, februar: 1, mart: 2, april: 3, maj: 4, juni: 5,
  juli: 6, august: 7, septembar: 8, oktobar: 9, novembar: 10, decembar: 11,
  january: 0, february: 1, march: 2, may: 4, june: 5,
  july: 6, september: 8, october: 9, november: 10, december: 11,
};

function cleanText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

async function testIndexFetch() {
  console.log('\n=== Step 1: Fetch index page ===');
  const response = await axios.get(`${BOSNJACI_BASE}/index.php`, {
    timeout: 15000,
    headers: HTTP_HEADERS,
  });
  console.log(`HTTP status: ${response.status}`);
  console.log(`Content-Type: ${response.headers['content-type']}`);
  console.log(`Body size: ${response.data.length} chars`);

  const $ = load(response.data);
  const seen = new Set<string>();
  const links: { url: string; title: string; imageUrl: string | null }[] = [];

  $('a[href*="prilog.php"]').each((_, el) => {
    if (links.length >= 10) return;
    const href = $(el).attr('href') ?? '';
    if (!href.includes('pid=')) return;

    const url = href.startsWith('http')
      ? href
      : `${BOSNJACI_BASE}/${href.replace(/^\//, '')}`;

    const pidMatch = url.match(/[?&]pid=(\d+)/);
    if (!pidMatch) return;
    const pid = pidMatch[1];
    if (seen.has(pid)) return;
    seen.add(pid);

    const title = cleanText($(el).clone().find('img').remove().end().text());
    if (!title || title.length < 10) return;

    const imgSrc = $(el).find('img').attr('src') ?? null;
    const imageUrl = imgSrc
      ? (imgSrc.startsWith('http') ? imgSrc : `${BOSNJACI_BASE}/${imgSrc.replace(/^\//, '')}`)
      : null;

    links.push({ url, title, imageUrl });
  });

  console.log(`\nFound ${links.length} article links:`);
  links.forEach((l, i) => {
    console.log(`  [${i + 1}] ${l.url}`);
    console.log(`       Title: ${l.title.slice(0, 80)}`);
    console.log(`       Image: ${l.imageUrl ?? 'none'}`);
  });

  return links;
}

async function testArticleFetch(url: string) {
  console.log(`\n=== Step 2: Fetch article ===`);
  console.log(`URL: ${url}`);
  const response = await axios.get(url, { timeout: 15000, headers: HTTP_HEADERS });
  console.log(`HTTP status: ${response.status}`);

  const $ = load(response.data);

  // Diagnostics before removal
  console.log(`\n--- HTML diagnostics ---`);
  console.log(`h1 count: ${$('h1').length}`);
  console.log(`h2 count: ${$('h2').length}`);
  console.log(`h3 count: ${$('h3').length}`);
  console.log(`p count: ${$('p').length}`);
  console.log(`td count: ${$('td').length}`);
  console.log(`div count: ${$('div').length}`);
  console.log(`table count: ${$('table').length}`);

  // Show first h1/h2 text
  if ($('h1').length) console.log(`First h1: "${$('h1').first().text().slice(0, 120)}"`);
  if ($('h2').length) console.log(`First h2: "${$('h2').first().text().slice(0, 120)}"`);

  // Show all p tags (first 10)
  console.log(`\nAll <p> tags (first 10):`);
  $('p').slice(0, 10).each((i, el) => {
    const t = cleanText($(el).text());
    console.log(`  [${i}] len=${t.length} "${t.slice(0, 100)}"`);
  });

  // Show first 5 td texts and find the biggest td
  console.log(`\nFirst 5 <td> texts:`);
  $('td').slice(0, 5).each((i, el) => {
    const t = cleanText($(el).text());
    if (t.length > 5) console.log(`  [${i}] len=${t.length} "${t.slice(0, 100)}"`);
  });

  // Dump inner HTML of the largest td
  let biggestTd = { idx: -1, len: 0, html: '' };
  $('td').each((i, el) => {
    const h = $(el).html() ?? '';
    if (h.length > biggestTd.len) biggestTd = { idx: i, len: h.length, html: h };
  });
  console.log(`\nLargest td (index ${biggestTd.idx}, ${biggestTd.len} chars HTML):`);
  console.log(biggestTd.html.slice(0, 2000));

  // Also show all div texts inside biggest td
  const $bigTd = $('td').eq(biggestTd.idx);
  console.log(`\nDivs inside biggest td (first 15):`);
  $bigTd.find('div').slice(0, 15).each((i, el) => {
    const t = cleanText($(el).text());
    if (t.length > 5) console.log(`  [${i}] len=${t.length} "${t.slice(0, 120)}"`);
  });

  // Show snippet around "Objavljeno"
  const rawHtml = $.html() ?? '';
  const objIdx = rawHtml.indexOf('Objavljeno');
  if (objIdx !== -1) {
    console.log(`\nHTML around "Objavljeno":\n  ${rawHtml.slice(Math.max(0, objIdx - 50), objIdx + 100)}`);
  } else {
    console.log('\n"Objavljeno" not found in HTML');
  }

  // Title from div.naslov
  const title = cleanText($('.naslov').first().text());
  console.log(`\nTitle (.naslov): "${title.slice(0, 100)}"`);

  const dateMatch = rawHtml.match(/Objavljeno:\s*(\d+)\.\s*([A-Za-zšđčćž]+)\s*(\d{4})/i);
  if (dateMatch) {
    const BOSNJACI_MONTH_LOCAL: Record<string, number> = {
      januar: 0, februar: 1, mart: 2, april: 3, maj: 4, juni: 5,
      juli: 6, august: 7, septembar: 8, oktobar: 9, novembar: 10, decembar: 11,
      january: 0, february: 1, march: 2, may: 4, june: 5,
      july: 6, september: 8, october: 9, november: 10, december: 11,
    };
    const day = parseInt(dateMatch[1]);
    const month = BOSNJACI_MONTH_LOCAL[dateMatch[2].toLowerCase()] ?? 0;
    const year = parseInt(dateMatch[3]);
    const pubDate = new Date(year, month, day);
    console.log(`Date: ${pubDate.toDateString()} (raw: "${dateMatch[0]}")`);
  } else {
    console.log('Date: not found');
  }

  let imageUrl: string | null = null;
  $('img').each((_, el) => {
    if (imageUrl) return;
    const src = $(el).attr('src') ?? '';
    if (src.includes('/foto/')) {
      imageUrl = src.startsWith('http') ? src : `${BOSNJACI_BASE}/${src.replace(/^\//, '')}`;
    }
  });
  console.log(`Image: ${imageUrl ?? 'none'}`);

  // Content: pick the .uvod div with the most text
  let content = '';
  let maxLen = 0;
  $('.uvod').each((_, el) => {
    const text = cleanText($(el).text());
    if (text.length > maxLen) { maxLen = text.length; content = text; }
  });

  console.log(`\nContent length: ${content.length} chars`);
  if (content.length > 0) {
    console.log(`\nFirst 300 chars:\n  ${content.slice(0, 300)}`);
    console.log(`\nLast 200 chars:\n  ${content.slice(-200)}`);
  } else {
    console.log('WARNING: no content extracted!');
  }
}

async function main() {
  console.log('Bosnjaci.net scraper smoke test');
  console.log('================================');
  try {
    const links = await testIndexFetch();
    if (links.length === 0) {
      console.error('\nFAIL: No article links found on index page');
      process.exit(1);
    }
    await testArticleFetch(links[0].url);
    console.log('\n================================');
    console.log('PASS: Scraper is working correctly');
  } catch (err) {
    console.error('\nFAIL:', err);
    process.exit(1);
  }
}

main();
