'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const isBosnian = pathname.startsWith('/bs');

  function getOppositeUrl(): string {
    if (isBosnian) {
      // /bs → /
      // /bs/[category] → /[category]
      // /bs/article/[slug] → /article/[slug]
      return pathname.replace(/^\/bs/, '') || '/';
    } else {
      // / → /bs
      // /[category] → /bs/[category]
      // /article/[slug] → /bs/article/[slug]
      return '/bs' + (pathname === '/' ? '' : pathname);
    }
  }

  return (
    <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
      <Link
        href={isBosnian ? getOppositeUrl() : '#'}
        className={`px-2 py-1 rounded transition-colors ${
          !isBosnian ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </Link>
      <Link
        href={!isBosnian ? getOppositeUrl() : '#'}
        className={`px-2 py-1 rounded transition-colors ${
          isBosnian ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        BS
      </Link>
    </div>
  );
}
