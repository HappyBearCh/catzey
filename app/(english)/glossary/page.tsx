import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGlossaryTerms, groupByInitial, GLOSSARY_CATEGORIES } from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  title: 'Manga Glossary — Every Term, Explained',
  description:
    'A plain-English glossary of manga and anime terminology: demographics, genres, craft, industry and fandom terms, each defined and explained with examples.',
  alternates: { canonical: `${BASE}/glossary` },
  openGraph: {
    title: 'Manga Glossary — Every Term, Explained',
    description: 'Plain-English definitions for manga and anime terminology.',
    url: `${BASE}/glossary`,
    images: [{ url: `/og?title=${encodeURIComponent('Manga Glossary')}`, width: 1200, height: 630 }],
  },
};

export default async function GlossaryIndexPage() {
  const terms = await getAllGlossaryTerms();
  const groups = groupByInitial(terms);
  const letters = [...groups.keys()];

  // DefinedTermSet is the correct container type for a glossary and lets each
  // entry's DefinedTerm point back here via inDefinedTermSet.
  const setLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${BASE}/glossary`,
    name: 'Catzye Manga Glossary',
    description: 'Definitions of manga and anime terminology.',
    url: `${BASE}/glossary`,
    hasDefinedTerm: terms.slice(0, 100).map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.shortDef,
      url: `${BASE}/glossary/${t.slug}`,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${BASE}/glossary` },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(setLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <span>Glossary</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Manga Glossary</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Every term you&apos;ll run into reading manga — what it means, where it comes from, and
        when it actually applies. {terms.length} entries and counting.
      </p>

      {terms.length === 0 ? (
        <p className="text-sm text-gray-500">The glossary is being written. Check back shortly.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-site-border">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold border border-site-border hover:bg-primary hover:text-white hover:border-primary transition-colors rounded-sm"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {GLOSSARY_CATEGORIES.map((c) => {
              const n = terms.filter((t) => t.category === c.slug).length;
              if (n === 0) return null;
              return (
                <span key={c.slug} className="text-2xs font-bold uppercase tracking-wider px-2.5 py-1 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 rounded-sm">
                  {c.label} · {n}
                </span>
              );
            })}
          </div>

          {[...groups.entries()].map(([letter, items]) => (
            <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b border-site-border">{letter}</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {items.map((t) => (
                  <div key={t.slug}>
                    <dt className="font-bold">
                      <Link href={`/glossary/${t.slug}`} className="hover:text-primary transition-colors">
                        {t.term}
                      </Link>
                    </dt>
                    <dd className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{t.shortDef}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
