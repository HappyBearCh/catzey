import type { Metadata } from 'next';
import Link from 'next/link';
import { ShelfBadge } from '@/components/ShelfBadge';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { notFound } from 'next/navigation';
import {
  getGlossaryTerm,
  getAllGlossaryTerms,
  getGlossaryTermsBySlugs,
  getWorksBySlugs,
  GLOSSARY_CATEGORIES,
} from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ term: string }>;
}

// Prerender every entry at build and serve the rest from ISR. A dynamic segment
// with no generateStaticParams is rendered per request and never cached, which
// would make `revalidate` above a no-op and bill a function call for every
// crawler hit — the same trap the tag and topic routes document.
// Every valid slug comes from a closed, file-backed set, so anything outside
// generateStaticParams is a genuine 404 and there is nothing to render on
// demand. Saying so lets Next 404 at the routing layer — which is also what
// makes the sibling loading.tsx safe: a loading boundary flushes a 200 shell,
// and once that is sent notFound() can no longer set a status. The article, tag
// and topic routes solve the same problem with gating layouts; here the params
// are finite, so the simpler answer applies.
export const dynamicParams = false;

export async function generateStaticParams() {
  const terms = await getAllGlossaryTerms();
  return terms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: slug } = await params;
  const term = await getGlossaryTerm(slug);
  if (!term) return {};
  const url = `${BASE}/glossary/${term.slug}`;
  const title = `${term.term} — Meaning & Explanation`;
  const ogImage = `/og?title=${encodeURIComponent(term.term)}`;
  return {
    title,
    description: term.shortDef,
    alternates: { canonical: url },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      title,
      description: term.shortDef,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: term.shortDef, images: [ogImage] },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params;
  const term = await getGlossaryTerm(slug);
  if (!term) notFound();

  const [related, examples] = await Promise.all([
    getGlossaryTermsBySlugs(term.related),
    getWorksBySlugs(term.examples),
  ]);
  const category = GLOSSARY_CATEGORIES.find((c) => c.slug === term.category);

  const termLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${BASE}/glossary/${term.slug}`,
    name: term.term,
    description: term.shortDef,
    url: `${BASE}/glossary/${term.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${BASE}/glossary`,
      name: 'Catzye Manga Glossary',
      url: `${BASE}/glossary`,
    },
    ...(term.aliases.length > 0 && { alternateName: term.aliases }),
    ...(category && { termCode: category.slug }),
    inLanguage: 'en',
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${BASE}/glossary` },
      { '@type': 'ListItem', position: 3, name: term.term, item: `${BASE}/glossary/${term.slug}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/glossary" className="hover:text-primary transition-colors">Glossary</Link>
      </nav>

      {category && (
        <span className="inline-block bg-primary text-white text-2xs font-semibold uppercase tracking-widest px-2 py-0.5 mb-3">
          {category.label}
        </span>
      )}

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{term.term}</h1>

      <ShelfBadge title={term.term} showSum className="mb-4" />

      {term.aliases.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Also written: {term.aliases.join(', ')}
        </p>
      )}

      {/* The one-line definition is what gets quoted in featured snippets, so it
          sits first, alone, and reads as a complete sentence. */}
      <p className="text-lg md:text-xl font-semibold leading-snug border-l-4 border-primary pl-4 pr-4 py-3 tone-fill mb-8">
        {term.shortDef}
      </p>

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: term.body }}
      />

      <ShelfNeighbours
        title={term.term}
        selfHref={`/glossary/${term.slug}`}
        className="mt-10"
      />

      {examples.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Seen in</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {examples.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/wiki/series/${w.slug}`}
                  className="block p-3 border border-site-border rounded-sm hover:border-primary/40 transition-colors"
                >
                  <span className="font-bold text-sm block">{w.title}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{w.synopsis}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Related terms</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/glossary/${r.slug}`}
                className="text-xs px-2.5 py-1 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors rounded-sm"
              >
                {r.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link
        href="/glossary"
        className="mt-10 block text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors"
      >
        Browse the full glossary →
      </Link>
    </div>
  );
}
