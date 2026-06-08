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
  return [...html.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi)]
    .map(([, level, inner]) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      return { level: parseInt(level), text, id: toId(text) };
    })
    .filter((h) => h.text.length > 0);
}

export function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*?)>([\s\S]*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    if (attrs.includes('id=')) return `<h${level}${attrs}>${inner}</h${level}>`;
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = toId(text);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
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
