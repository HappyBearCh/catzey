import { load } from 'cheerio';
import { entityHref } from '@/lib/entity-slug';

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Links the first mention of each entity inside article body HTML to its
 * /topic page. Only touches text nodes that are direct children of <p>
 * elements, so headings, existing links, and inline markup are left alone.
 */
export function linkEntitiesInHtml(html: string, entities: string[]): string {
  const candidates = entities
    .map((e) => e.trim())
    .filter((e) => e.length >= 3)
    // Longest first so "Weekly Shonen Jump" wins over "Shonen Jump"
    .sort((a, b) => b.length - a.length);
  if (candidates.length === 0) return html;

  const $ = load(html, null, false);
  const remaining = new Set(candidates);

  $('p').each((_, p) => {
    if (remaining.size === 0) return false;
    $(p)
      .contents()
      .each((_, node) => {
        if (node.type !== 'text' || remaining.size === 0) return;
        const text = node.data ?? '';

        // Find the earliest match among entities not yet linked
        let best: { entity: string; index: number } | null = null;
        for (const entity of remaining) {
          const re = new RegExp(`(?<![\\w])${escapeRegex(entity)}(?![\\w])`);
          const m = re.exec(text);
          if (m && (!best || m.index < best.index)) best = { entity, index: m.index };
        }
        if (!best) return;

        // Replace all matchable entities in this node in one pass
        const parts: string[] = [];
        let cursor = 0;
        while (cursor < text.length) {
          let next: { entity: string; index: number } | null = null;
          for (const entity of remaining) {
            const re = new RegExp(`(?<![\\w])${escapeRegex(entity)}(?![\\w])`);
            const m = re.exec(text.slice(cursor));
            if (m && (!next || m.index < next.index)) next = { entity, index: cursor + m.index };
          }
          if (!next) {
            parts.push(escapeHtml(text.slice(cursor)));
            break;
          }
          parts.push(escapeHtml(text.slice(cursor, next.index)));
          parts.push(
            `<a href="${entityHref(next.entity)}" class="entity-link">${escapeHtml(next.entity)}</a>`,
          );
          remaining.delete(next.entity);
          cursor = next.index + next.entity.length;
        }
        $(node).replaceWith(parts.join(''));
      });
  });

  return $.html();
}
