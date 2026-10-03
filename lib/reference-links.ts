import { load, type CheerioAPI } from 'cheerio';
import type { AnyNode, Text } from 'domhandler';
import { getAllWorks, getAllCreators, getAllGlossaryTerms } from '@/lib/education';

// Links the first mention of each reference entry in a body of HTML: series by
// their italicised title, creators by full name, glossary terms by name. The
// bodies were written by hand and already name these things constantly; this
// turns the mentions into the links a reader (and a crawler) would expect, so
// the reference reads as one connected work rather than separate pages.

interface Target {
  href: string;
  /** Matched against the whole text of an <em>, exactly. */
  titles?: string[];
  /** Matched inside running text. */
  pattern?: RegExp;
}

/**
 * The first usable match of a target in `text`. Glossary patterns are global
 * and case-insensitive, so a capitalised mention followed by another
 * capitalised word is part of a name ("Gekiga Kōbō", "Shōnen Jump") and is
 * passed over for the next one.
 */
function firstMention(target: Target, text: string): RegExpExecArray | null {
  const re = target.pattern!;
  if (!re.global) return re.exec(text);
  re.lastIndex = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    const partOfName = /^\p{Lu}/u.test(m[0]) && /^\s+\p{Lu}/u.test(text.slice(m.index + m[0].length));
    if (!partOfName) return m;
  }
  return null;
}

// Glossary terms that are also ordinary English words, or that a reference
// about manga mentions on every page. Linking them would be noise, not help.
const GENERIC_TERMS = new Set([
  'manga', 'chapter', 'panel', 'gutter', 'editor', 'assistant', 'canon', 'ship', 'filler', 'harem',
]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let cached: { series: Target[]; prose: Target[]; creatorPages: Map<string, string> } | null = null;

function targets() {
  if (cached) return cached;
  const series: Target[] = getAllWorks().map((w) => ({
    href: `/wiki/series/${w.slug}`,
    titles: [w.title, ...w.altTitles.filter((t) => /^[\x20-\x7eÀ-ɏĀ-ſ½×&!'’.:,-]+$/.test(t))],
  }));
  const prose: Target[] = [
    ...getAllCreators()
      .filter((c) => c.name.length >= 4)
      .map((c) => ({
        href: `/wiki/creator/${c.slug}`,
        pattern: new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegex(c.name)}(?![\\p{L}\\p{N}])`, 'u'),
      })),
    ...getAllGlossaryTerms()
      .filter((t) => !GENERIC_TERMS.has(t.slug) && t.term.length >= 4)
      .map((t) => ({
        href: `/glossary/${t.slug}`,
        pattern: new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegex(t.term)}(?![\\p{L}\\p{N}])`, 'giu'),
      })),
  ];
  // Longest pattern first, so "Weekly Shōnen Jump" wins over "Shōnen".
  prose.sort((a, b) => b.pattern!.source.length - a.pattern!.source.length);
  const creatorPages = new Map(getAllCreators().map((c) => [c.name, `/wiki/creator/${c.slug}`]));
  cached = { series, prose, creatorPages };
  return cached;
}

/** Text nodes a link may be placed in: running prose, outside links and the reading apparatus. */
function proseTextNodes($: CheerioAPI): Text[] {
  const nodes: Text[] = [];
  $('p, li')
    .filter((_, el) => $(el).closest('.num-reading, .num-standfirst, a').length === 0)
    .each((_, el) => {
      const walk = (node: AnyNode) => {
        if (node.type === 'text') nodes.push(node as Text);
        else if (node.type === 'tag' && node.name !== 'a' && node.name !== 'em') {
          for (const child of node.children) walk(child);
        }
      };
      for (const child of el.children) walk(child);
    });
  return nodes;
}

/**
 * Link reference mentions in `html`. `selfHref` is the page being rendered, so
 * an entry never links to itself; `skip` lists further hrefs to leave alone.
 */
export function linkReferenceMentions(html: string, selfHref: string, skip: string[] = []): string {
  const { series, prose, creatorPages } = targets();
  const used = new Set([selfHref, ...skip]);
  const $ = load(html, null, false);

  // Outbound encyclopaedia links for things the reference has its own entry
  // for are pointed at that entry instead: the reader stays in the reference,
  // and the entry gets the link.
  $('a[href^="https://en.wikipedia.org/"]').each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const own = series.find((t) => t.titles!.includes(text))?.href ?? creatorPages.get(text);
    if (!own || own === selfHref) return;
    $el.attr('href', own).removeAttr('target').removeAttr('rel').addClass('ref-link');
    used.add(own);
  });

  // Series: an <em> whose whole text is a known title.
  $('em').each((_, el) => {
    const $el = $(el);
    if ($el.closest('a, .num-reading, .num-standfirst, h1, h2, h3').length) return;
    const text = $el.text().trim();
    const hit = series.find((t) => !used.has(t.href) && t.titles!.includes(text));
    if (!hit) return;
    used.add(hit.href);
    $el.wrap(`<a href="${hit.href}" class="ref-link"></a>`);
  });

  // Creators and glossary terms: first mention in running text.
  for (const node of proseTextNodes($)) {
    const text = node.data ?? '';
    let best: { target: Target; index: number; length: number } | null = null;
    for (const target of prose) {
      if (used.has(target.href)) continue;
      const m = firstMention(target, text);
      if (m && (!best || m.index < best.index)) best = { target, index: m.index, length: m[0].length };
    }
    if (!best) continue;
    used.add(best.target.href);
    const before = text.slice(0, best.index);
    const match = text.slice(best.index, best.index + best.length);
    const after = text.slice(best.index + best.length);
    $(node).replaceWith(
      `${escapeHtml(before)}<a href="${best.target.href}" class="ref-link">${escapeHtml(match)}</a>${escapeHtml(after)}`,
    );
  }

  return $.html();
}
