import Link from 'next/link';
import { tagHref } from '@/lib/tags';

interface TagListProps {
  tags: string[];
  basePath?: string;
}

export function TagList({ tags, basePath = '' }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
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
