import Link from 'next/link';
import { tagHref } from '@/lib/tags';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';

// scripts/numerologize.ts stamps every article with "Number N" and its shelf
// name. Those two are not keywords like the rest — they are the filing, so they
// lead the list, are set in gold, and go to the shelf rather than to a tag page.
const SHELF_NAMES = new Map(GROUP_NUMBERS.map((n) => [getGroup(n).shelf.toLowerCase(), n]));

function shelfFor(tag: string): number | null {
  const numbered = /^number (\d+)$/i.exec(tag.trim());
  if (numbered) {
    const n = Number(numbered[1]);
    return GROUP_NUMBERS.includes(n as (typeof GROUP_NUMBERS)[number]) ? n : null;
  }
  return SHELF_NAMES.get(tag.trim().toLowerCase()) ?? null;
}

interface TagListProps {
  tags: string[];
  basePath?: string;
}

export function TagList({ tags, basePath = '' }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  const shelfTags = tags.filter((t) => shelfFor(t) !== null);
  const keywordTags = tags.filter((t) => shelfFor(t) === null);

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {shelfTags.map((tag) => {
        const n = shelfFor(tag)!;
        return (
          <Link
            key={tag}
            href={`/number/${n}`}
            className="inline-block text-xs font-semibold px-2.5 py-1 border border-gold/40 text-gold hover:bg-gold/10 transition-colors rounded-sm"
          >
            {tag}
          </Link>
        );
      })}
      {keywordTags.map((tag) => (
        <Link
          key={tag}
          href={`${basePath}${tagHref(tag)}`}
          className="inline-block text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors rounded-sm"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
