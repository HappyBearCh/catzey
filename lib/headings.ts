export interface Heading {
  id: string;
  text: string;
  level: number;
}

function toId(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'section';
}

export function extractHeadings(html: string): Heading[] {
  // Numbered the way injectHeadingIds numbers them, so each link finds its section.
  const seen = new Map<string, number>();
  return [...html.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi)]
    .map(([, level, inner]) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const base = toId(text);
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      return { level: parseInt(level), text, id: n === 1 ? base : `${base}-${n}` };
    })
    .filter((h) => h.text.length > 0);
}

export function injectHeadingIds(html: string): string {
  // Two sections may share a heading; a repeated id would send both jump links
  // to the first, so later ones are numbered.
  const seen = new Map<string, number>();
  return html.replace(/<h([23])([^>]*?)>([\s\S]*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    if (attrs.includes('id=')) return `<h${level}${attrs}>${inner}</h${level}>`;
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const base = toId(text);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    const id = n === 1 ? base : `${base}-${n}`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

/**
 * Separates an entry's filing line (the standfirst the numerology pass writes
 * at the top of every body) from the text under it, so a page can put its
 * jump links between the two rather than between the filing line and the
 * first section.
 */
export function splitStandfirst(html: string): { standfirst: string; rest: string } {
  const m = html.match(/^\s*<!--catzye:standfirst-->[\s\S]*?<!--\/catzye:standfirst-->/);
  return m ? { standfirst: m[0], rest: html.slice(m[0].length) } : { standfirst: '', rest: html };
}

export function splitHtmlAfterNthParagraph(html: string, n: number): [string, string] {
  let search = 0;
  for (let i = 0; i < n; i++) {
    const idx = html.indexOf('</p>', search);
    if (idx === -1) return [html, ''];
    search = idx + 4;
  }
  return [html.slice(0, search), html.slice(search)];
}
