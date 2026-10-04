import type { Metadata } from 'next';
import { linkReferenceMentions } from '@/lib/reference-links';
import { metaDescription } from '@/lib/seo';
import Link from 'next/link';
import { ShelfBadge } from '@/components/ShelfBadge';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { notFound } from 'next/navigation';
import { SafeImage } from '@/components/SafeImage';
import { getWork, getAllWorks, getCreatorsBySlugs, getSimilarWorks, type Work, type Creator } from '@/lib/education';
import { getGenreInfo } from '@/lib/genre-info';

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
// Every valid slug comes from a closed, file-backed set, so anything outside
// generateStaticParams is a genuine 404 and there is nothing to render on
// demand. Saying so lets Next 404 at the routing layer.
export const dynamicParams = false;

export async function generateStaticParams() {
  const works = await getAllWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  const url = `${BASE}/wiki/series/${work.slug}`;
  // "<title> Manga" is how the series is searched for; the creator and run
  // are what tell a reader from the results page that this is the reference.
  const creators = getCreatorsBySlugs(work.creatorSlugs).map((c) => c.name).join(' & ');
  const title = `${work.title} Manga${creators ? ` by ${creators}` : ''}`;
  const description = metaDescription(work.synopsisSource ?? work.synopsis);
  const ogImage = `/og?title=${encodeURIComponent(work.title)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: 'Catzye',
      locale: 'en_US',
      title,
      description,
      url,
      type: 'article',
      images: [{ url: work.imageUrl ?? ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [work.imageUrl ?? ogImage] },
  };
}

const AUDIENCE: Record<string, string> = {
  shonen: 'teenage boys',
  seinen: 'adult men',
  shojo: 'teenage girls',
  josei: 'adult women',
};

function list(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * The questions people search about a series, answered from the entry's own
 * fields. Nothing here is written per series, so an answer can only be as
 * wrong as the record it is built from — and it changes when the record does.
 */
function quickAnswers(work: Work, creators: Creator[]): { question: string; answer: string }[] {
  const qa: { question: string; answer: string }[] = [];
  const t = work.title;
  const volumes = work.volumes ? (work.volumes === 1 ? 'a single volume' : `${work.volumes} volumes`) : null;

  if (work.startYear && work.status) {
    // A completed series with no recorded end year ran for longer than the
    // record can say, so it is described by when it began, not as one year.
    const span = !work.endYear
      ? `began in ${work.startYear}`
      : work.endYear !== work.startYear
        ? `ran from ${work.startYear} to ${work.endYear}`
        : `ran in ${work.startYear}`;
    const answer =
      work.status === 'completed'
        ? `Yes. ${t} ${span}${volumes ? ` and is complete in ${volumes}` : ' and is complete'}.`
        : work.status === 'hiatus'
          ? `Not yet. ${t} began in ${work.startYear} and its serialisation is on hiatus.`
          : `No. ${t} began in ${work.startYear} and is still being serialised.`;
    qa.push({ question: `Is ${t} finished?`, answer });
  }

  if (volumes && work.status === 'completed') {
    qa.push({ question: `How many volumes does ${t} have?`, answer: `${t} is complete in ${volumes}.` });
  }

  if (creators.length > 0) {
    const writer = creators.find((c) => c.role === 'writer');
    const artist = creators.find((c) => c.role === 'illustrator');
    const answer =
      creators.length === 2 && writer && artist
        ? `${t} is written by ${writer.name} and drawn by ${artist.name}.`
        : `${t} was created by ${list(creators.map((c) => c.name))}.`;
    qa.push({ question: `Who created ${t}?`, answer });
  }

  if (work.magazine) {
    // Several magazines means the series moved, in the order recorded — not
    // that it ran in all of them at once.
    const [first, ...later] = work.magazine.split(';').map((m) => m.trim()).filter(Boolean);
    const answer =
      later.length === 0
        ? `${t} ${work.status === 'ongoing' ? 'is' : 'was'} serialised in ${first}.`
        : work.status === 'ongoing'
          ? `${t} began in ${first} and is now serialised in ${later[later.length - 1]}.`
          : `${t} was serialised in ${first}, and later in ${list(later)}.`;
    qa.push({ question: `Where was ${t} serialised?`, answer });
  }

  if (work.demographic || work.genres.length > 0) {
    const demographic =
      work.demographic && AUDIENCE[work.demographic]
        ? `${t} is a ${work.demographic} manga, published for a readership of ${AUDIENCE[work.demographic]}.`
        : '';
    const genres = work.genres.length > 0 ? ` Its genres are ${list(work.genres.map((g) => g.toLowerCase()))}.` : '';
    qa.push({ question: `What kind of manga is ${t}?`, answer: `${demographic}${genres}`.trim() });
  }

  return qa;
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) notFound();

  const creators = await getCreatorsBySlugs(work.creatorSlugs);
  const run = years(work.startYear, work.endYear, work.status);
  const answers = quickAnswers(work, creators);
  const similar = getSimilarWorks(work);

  const faqLd = answers.length > 0 && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answers.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  const workLd = {
    '@context': 'https://schema.org',
    // ComicSeries is schema.org's type for a serialised comic. The series and
    // creator entities carry @ids so the two pages describe one graph.
    '@type': 'ComicSeries',
    '@id': `${BASE}/wiki/series/${work.slug}#series`,
    name: work.title,
    ...(work.altTitles.length > 0 && { alternateName: work.altTitles }),
    description: work.synopsisSource ?? work.synopsis,
    url: `${BASE}/wiki/series/${work.slug}`,
    ...(work.imageUrl && { image: work.imageUrl }),
    ...(work.startYear && { startDate: String(work.startYear) }),
    ...(work.endYear && work.status === 'completed' && { endDate: String(work.endYear) }),
    ...(work.genres.length > 0 && { genre: work.genres }),
    ...(creators.length > 0 && {
      author: creators.map((c) => ({
        '@type': 'Person',
        '@id': `${BASE}/wiki/creator/${c.slug}#person`,
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
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 mb-4 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/wiki" className="hover:text-primary transition-colors">Wiki</Link>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{work.title}</h1>

      <ShelfBadge title={work.title} showSum className="mb-4" />
      {work.altTitles.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{work.altTitles.join(' · ')}</p>
      )}

      <p className="text-lg font-semibold leading-snug border-l-4 border-primary pl-4 py-2 bg-primary/5 mb-6">
        {work.synopsisSource ?? work.synopsis}
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
        <dl className="mb-10 border-t-2 border-ink dark:border-parchment">
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
        dangerouslySetInnerHTML={{ __html: linkReferenceMentions(work.body, `/wiki/series/${work.slug}`) }}
      />

      {answers.length > 0 && (
        <section className="mt-12" aria-labelledby="quick-answers">
          <h2 id="quick-answers" className="eyebrow mb-4 pb-2 border-b-2 border-ink dark:border-parchment">
            Quick answers
          </h2>
          <dl className="divide-y divide-rule/25 dark:divide-rule">
            {answers.map(({ question, answer }) => (
              <div key={question} className="py-3">
                <dt className="font-display font-semibold text-ink dark:text-parchment">{question}</dt>
                <dd className="mt-1 text-ink-2 dark:text-parchment/80 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {similar.length > 0 && (
        <section className="mt-12" aria-labelledby="similar-series">
          <h2 id="similar-series" className="eyebrow mb-4 pb-2 border-b-2 border-ink dark:border-parchment">
            If you like {work.title}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule/25 dark:bg-rule border border-rule/25 dark:border-rule">
            {similar.map((w) => (
              <li key={w.slug} className="bg-paper dark:bg-ground">
                <Link
                  href={`/wiki/series/${w.slug}`}
                  className="group block p-4 h-full hover:bg-paper-2 dark:hover:bg-ground-2 transition-colors"
                >
                  <span className="block font-display text-lg font-semibold text-ink dark:text-parchment group-hover:text-gold transition-colors">
                    {w.title}
                  </span>
                  <span className="block text-xs text-gray-500 mb-1.5">
                    {[w.startYear, w.demographic, w.genres.slice(0, 2).join(', ').toLowerCase()].filter(Boolean).join(' · ')}
                  </span>
                  <span className="block text-sm leading-relaxed text-ink-muted dark:text-parchment/70 line-clamp-2">
                    {w.synopsisSource ?? w.synopsis}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ShelfNeighbours
        title={work.title}
        selfHref={`/wiki/series/${work.slug}`}
        className="mt-10"
      />

      {work.genres.length > 0 && (
        <section className="mt-10 pt-6 border-t border-site-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Genres</h2>
          {/* Only eight genre hubs exist. This used to mint a link for every
              genre on the work regardless, so a page tagged "drama, action,
              supernatural" shipped three dead links — twelve distinct 404s
              across the wiki, all of them crawlable. Genres without a hub still
              show, as plain chips. */}
          <div className="flex flex-wrap gap-2">
            {work.genres.map((g) => {
              const slug = g.toLowerCase().replace(/\s+/g, '-');
              const chip = 'text-xs px-2.5 py-1 bg-site-light dark:bg-gray-800 border rounded-sm';
              return getGenreInfo(slug) ? (
                <Link
                  key={g}
                  href={`/genre/${slug}`}
                  className={`${chip} text-primary border-primary/30 hover:bg-primary hover:text-white transition-colors`}
                >
                  {g}
                </Link>
              ) : (
                <span key={g} className={`${chip} text-ink-muted dark:text-gray-400 border-site-border dark:border-gray-700`}>
                  {g}
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
