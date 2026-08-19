import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SafeImage } from '@/components/SafeImage';
import { getWork, getAllWorks, getCreatorsBySlugs } from '@/lib/education';

export const revalidate = false; // content is baked in at build time — never revalidate

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

interface Props {
  params: Promise<{ slug: string }>;
}

function years(startYear: number | null, endYear: number | null, status: string | null): string {
  if (!startYear) return '';
  if (status === 'ongoing' || (!endYear && status !== 'completed')) return `${startYear}–present`;
  if (endYear && endYear !== startYear) return `${startYear}–${endYear}`;
  return `${startYear}`;
}

// Prerendered at build, ISR thereafter — see the note on the glossary route.
export async function generateStaticParams() {
  const works = await getAllWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  const url = `${BASE}/wiki/series/${work.slug}`;
  const title = `${work.title} — Series Guide`;
  const ogImage = `/og?title=${encodeURIComponent(work.title)}`;
  return {
    title,
    description: work.synopsis,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: work.synopsis,
      url,
      type: 'article',
      images: [{ url: work.imageUrl ?? ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description: work.synopsis, images: [work.imageUrl ?? ogImage] },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) notFound();

  const creators = await getCreatorsBySlugs(work.creatorSlugs);
  const run = years(work.startYear, work.endYear, work.status);

  const workLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: work.title,
    ...(work.altTitles.length > 0 && { alternateName: work.altTitles }),
    description: work.synopsis,
    url: `${BASE}/wiki/series/${work.slug}`,
    ...(work.imageUrl && { image: work.imageUrl }),
    ...(work.startYear && { datePublished: String(work.startYear) }),
    ...(work.genres.length > 0 && { genre: work.genres }),
    ...(work.volumes && { numberOfEpisodes: work.volumes }),
    ...(creators.length > 0 && {
      author: creators.map((c) => ({
        '@type': 'Person',
        name: c.name,
        url: `${BASE}/wiki/creator/${c.slug}`,
      })),
    }),
    inLanguage: 'ja',
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Wiki', item: `${BASE}/wiki` },
      { '@type': 'ListItem', position: 3, name: work.title, item: `${BASE}/wiki/series/${work.slug}` },
    ],
  };

  const facts: Array<[string, string]> = [
    ...(run ? [['Published', run] as [string, string]] : []),
    ...(work.demographic ? [['Demographic', work.demographic] as [string, string]] : []),
    ...(work.magazine ? [['Magazine', work.magazine] as [string, string]] : []),
    ...(work.volumes ? [['Volumes', String(work.volumes)] as [string, string]] : []),
    ...(work.status ? [['Status', work.status] as [string, string]] : []),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/wiki" className="hover:text-primary transition-colors">Wiki</Link>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{work.title}</h1>
      {work.altTitles.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{work.altTitles.join(' · ')}</p>
      )}

      <p className="text-lg font-semibold leading-snug border-l-4 border-primary pl-4 py-2 bg-primary/5 mb-6">
        {work.synopsis}
      </p>

      {work.imageUrl && (
        <figure className="mb-6 relative w-full aspect-video overflow-hidden rounded-sm">
          <SafeImage
            src={work.imageUrl}
            alt={work.imageAlt ?? work.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
            fallback={<div className="absolute inset-0 bg-black" />}
          />
        </figure>
      )}

      {/* A compact fact table is what readers scan first on a reference page and
          what assistants tend to lift as the answer. */}
      {facts.length > 0 && (
        <dl className="mb-10 border-t border-gold/25">
          {facts.map(([k, v]) => (
            <div key={k} className="datarow">
              <dt className="eyebrow">{k}</dt>
              <dd className="font-display text-lg capitalize text-ink dark:text-parchment">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {creators.length > 0 && (
        <div className="mb-8">
          <p className="text-2xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Created by</p>
          <div className="flex flex-wrap gap-2">
            {creators.map((c) => (
              <Link
                key={c.slug}
                href={`/wiki/creator/${c.slug}`}
                className="text-sm font-bold px-3 py-1.5 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors rounded-sm"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: work.body }}
      />

      {work.genres.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {work.genres.map((g) => (
              <Link
                key={g}
                href={`/genre/${g.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs px-2.5 py-1 bg-site-light dark:bg-gray-800 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-colors rounded-sm"
              >
                {g}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
