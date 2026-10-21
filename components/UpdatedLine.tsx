import { SITE_URL } from '@/lib/seo';

interface UpdatedLineProps {
  url: string;
  name: string;
  updatedAt: string;
  /** @id of the thing the page is about (#series, #person, the DefinedTerm). Omit to skip the WebPage node. */
  about?: string;
  className?: string;
}

/**
 * "Updated <date>" under a reference entry. Readers judging whether an entry
 * about a running series is current need the date, and the WebPage node gives
 * search engines the same date as dateModified — the entity types these pages
 * describe (ComicSeries, Person, DefinedTerm) have nowhere to carry it.
 * Formatted in UTC: the dates are stored as UTC midnights, and a local-time
 * format would print the previous day on a build machine west of Greenwich.
 */
export function UpdatedLine({ url, name, updatedAt, about, className = '' }: UpdatedLineProps) {
  const date = new Date(updatedAt);
  const label = date.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' });
  const pageLd = about && {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    dateModified: date.toISOString(),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': about },
    inLanguage: 'en',
  };
  return (
    <>
      {pageLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />}
      <p className={`text-xs text-gray-500 dark:text-gray-400 ${className}`}>
        Updated <time dateTime={date.toISOString()}>{label}</time>
      </p>
    </>
  );
}
