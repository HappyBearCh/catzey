import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export interface Crumb {
  name: string;
  /** Site-relative path. The last crumb is the page itself and is not linked. */
  href: string;
}

/**
 * The trail above a reference page, and the BreadcrumbList that describes it.
 * One component emits both so the visible trail and the structured data can
 * never disagree — Google shows the trail in place of the URL in results.
 * Each link is tall enough to be a comfortable tap target on a phone.
 */
export function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.href === '/' ? '' : c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={`mb-3 ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ol className="flex flex-wrap items-center font-sans text-sm text-ink-muted dark:text-parchment/60">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center min-w-0">
              {last ? (
                <span aria-current="page" className="py-1.5 truncate max-w-[16rem] text-ink-2 dark:text-parchment/80">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="py-1.5 hover:text-gold transition-colors">
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-ink-muted/60">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
