import type { Metadata } from 'next';
import { linkReferenceMentions } from '@/lib/reference-links';
import { metaDescription, splitReading, documentTitle } from '@/lib/seo';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { OnThisPage } from '@/components/OnThisPage';
import { extractHeadings, injectHeadingIds, splitStandfirst } from '@/lib/headings';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { UpdatedLine } from '@/components/UpdatedLine';
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
// demand. Saying so lets Next 404 at the routing layer.
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
  const title = `${term.term}: Meaning in Manga & Anime`;
  // "<term>: <definition>" — the snippet then answers the query it matched
  // with the word itself in front, as a dictionary entry does.
  const description = metaDescription(`${term.term}: ${term.shortDefSource ?? term.shortDef}`);
  const ogImage = `/og?title=${encodeURIComponent(term.term)}`;
  return {
    title: documentTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      title,
      description,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params;
  const term = await getGlossaryTerm(slug);
  if (!term) notFound();
  const split = splitReading(term.body);
  const body = injectHeadingIds(split.body);
  const reading = split.reading;
  const headings = extractHeadings(body);
  const { standfirst, rest } = splitStandfirst(body);

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
    description: term.shortDefSource ?? term.shortDef,
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termLd) }} />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Glossary', href: '/glossary' },
          { name: term.term, href: `/glossary/${term.slug}` },
        ]}
      />

      {category && (
        <span className="inline-block eyebrow text-gold mb-2">
          {category.label}
        </span>
      )}

      <h1 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-ink dark:text-parchment mb-2">{term.term}</h1>


      {term.aliases.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Also written: {term.aliases.join(', ')}
        </p>
      )}

      {/* The one-line definition is what gets quoted in featured snippets, so it
          sits first, alone, and reads as a complete sentence. */}
      <p className="mt-4 bubble text-lg md:text-xl leading-relaxed text-ink dark:text-parchment/90 mb-8">
        {term.shortDefSource ?? term.shortDef}
      </p>

      {standfirst && <div className="ref-prose" dangerouslySetInnerHTML={{ __html: standfirst }} />}

      <OnThisPage headings={headings} />

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: linkReferenceMentions(rest, `/glossary/${term.slug}`) }}
      />

      <UpdatedLine
        url={`${BASE}/glossary/${term.slug}`}
        name={term.term}
        updatedAt={term.updatedAt}
        about={`${BASE}/glossary/${term.slug}`}
        className="mt-6"
      />


      {examples.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="chapter-title text-lg mb-5"><span>Seen in</span></h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {examples.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/wiki/series/${w.slug}`}
                  className="block p-3 border-2 border-[rgb(var(--ink-line))] rounded-sm hover:border-primary/40 transition-colors"
                >
                  <span className="font-bold text-sm block">{w.title}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{w.synopsisSource ?? w.synopsis}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="chapter-title text-lg mb-4"><span>Related terms</span></h2>
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

      {reading && (
        <div className="ref-prose mt-12" dangerouslySetInnerHTML={{ __html: reading }} />
      )}

      <ShelfNeighbours
        title={term.term}
        selfHref={`/glossary/${term.slug}`}
        className="mt-10"
      />

      <Link
        href="/glossary"
        className="mt-10 block text-center text-xs font-bold uppercase tracking-wider text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors"
      >
        Browse the full glossary →
      </Link>
    </div>
  );
}
