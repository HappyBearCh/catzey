/**
 * Quick test for RSS site content extraction.
 * Run: npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" scripts/test-rss-content.ts
 */
import axios from 'axios';
import { load } from 'cheerio';

const HTTP_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'bs,hr,sr,en;q=0.8',
};

function cleanText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

const JUNK_PATTERNS = [
  /\b(advertisement|advertorial|sponsored|partner content)\b/i,
  /\b(reklama|oglas|sponzor|partnerski sadržaj)\b/i,
  /\b(pratite nas|follow us|subscribe|prijavi(te)? se na newsletter)\b/i,
  /facebook\.com|twitter\.com|instagram\.com/i,
  /\b(kolačić|cookie|privatnost|privacy policy)\b/i,
  /^(pročitajte|pogledajte|više o|read more|see also)/i,
  /©|\(c\) \d{4}|all rights reserved/i,
  /^https?:\/\/\S+$/,
];

function isJunk(text: string): boolean {
  if (text.length < 40) return true;
  const upper = (text.match(/[A-ZČĆŠĐŽ]/g) ?? []).length;
  if (upper / text.length > 0.5) return true;
  return JUNK_PATTERNS.some((re) => re.test(text));
}

const CONTENT_SELECTORS = [
  '[itemprop="articleBody"]',
  '.article-body', '.article-content', '.article-text',
  '.entry-content', '.post-content', '.tekst', '.news-body',
  '.text-editor-article', 'article', 'main',
];

async function testUrl(label: string, url: string) {
  console.log(`\n─── ${label} ───`);
  console.log(`URL: ${url}`);
  try {
    const res = await axios.get(url, { timeout: 15000, headers: HTTP_HEADERS });
    console.log(`HTTP: ${res.status}`);
    const $ = load(res.data);
    $('script,style,noscript,iframe,.ad,.ads,[class*="advert"],[class*="reklam"],[class*="oglas"],[class*="banner"],[class*="related"],[class*="share"],[class*="social"],nav,header,footer,aside,.sidebar,.comments').remove();

    let content = '';
    let matchedSel = '';
    for (const sel of CONTENT_SELECTORS) {
      const el = $(sel).first();
      if (!el.length) continue;
      const paras = el.find('p').map((_, p) => cleanText($(p).text())).get().filter(t => !isJunk(t));
      if (paras.length >= 2) { content = paras.join('\n\n'); matchedSel = sel; break; }
    }
    if (!content) {
      const paras = $('p').map((_, p) => cleanText($(p).text())).get().filter(t => !isJunk(t)).slice(0, 25);
      content = paras.join('\n\n');
      matchedSel = '<p> fallback';
    }

    const image = $('meta[property="og:image"]').attr('content')
      ?? $('[itemprop="articleBody"] img, .article-body img, article img').first().attr('src')
      ?? null;

    console.log(`Selector: ${matchedSel}`);
    console.log(`Content: ${content.length} chars`);
    console.log(`Image: ${image ?? 'none'}`);
    if (content.length > 0) {
      console.log(`Preview: ${content.slice(0, 200)}`);
    } else {
      console.log('WARN: 0 chars extracted!');
      // Show available selectors
      console.log('Available elements: ' + CONTENT_SELECTORS.filter(s => $(s).length > 0).join(', '));
    }
  } catch (err) {
    console.log(`ERROR: ${String(err)}`);
  }
}

async function main() {
  await testUrl('Klix.ba', 'https://www.klix.ba/vijesti/bih/granice-moci-evropske-unije-u-bosni-i-hercegovini-ulozili-su-milijarde-ali-kljucnu-politicku-rijec-vode-drugi/260519103');
  await testUrl('Slobodna Bosna', 'https://www.slobodna-bosna.ba/vijest/485737/glamurozno_vjenchanje_bettina_anderson_pokazala_vjenchani_prsten_nakon_udaje_za_donalda_trumpa_jr_foto.html');
  await testUrl('N1 Bosna', 'https://n1info.ba/sport/nogomet/preminuo-legendarni-hrvatski-fudbaler/');
  await testUrl('Dnevnik.ba', 'https://dnevnik.ba/vijesti/kod-dervente-spomenik-pripadnicima-hvo-a-sravnjen-sa-zemljom-zastupnik-nsrs-porazeni-i-u-ratu-i-u-miru/');
}

main().catch(console.error);
