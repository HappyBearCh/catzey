import type { Metadata } from 'next';
import { linkReferenceMentions } from '@/lib/reference-links';
import { metaDescription, splitReading, documentTitle } from '@/lib/seo';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { OnThisPage } from '@/components/OnThisPage';
import { extractHeadings, injectHeadingIds, splitStandfirst } from '@/lib/headings';
import { UpdatedLine } from '@/components/UpdatedLine';
import { ShelfNeighbours } from '@/components/ShelfNeighbours';
import { notFound } from 'next/navigation';
import { SafeImage } from '@/components/SafeImage';
import { getWork, getAllWorks, getCreatorsBySlugs, getSimilarWorks, getLearnTopic, type Work, type Creator } from '@/lib/education';
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
  // Two credited creators can push the title past what a results page shows,
  // and then the series name is all that survives the cut. Credit the first
  // creator alone in that case, and none if even that does not fit.
  const firstCreator = getCreatorsBySlugs(work.creatorSlugs)[0]?.name;
  const title =
    [creators, firstCreator, '']
      .map((by) => `${work.title} Manga${by ? ` by ${by}` : ''}`)
      .find((t) => t.length <= 62) ?? `${work.title} Manga`;
  const description = metaDescription(`${workLead(work, creators)} ${work.synopsisSource ?? work.synopsis}`);
  const ogImage = `/og?title=${encodeURIComponent(work.title)}`;
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

/**
 * One sentence that says what the entry is about before the synopsis says what
 * happens in it: the run, the readership, the leading genre and the creator are
 * the words a search for the series is made of, and the synopsis alone carries
 * none of them.
 */
function workLead(work: Work, creators: string): string {
  const run = years(work.startYear, work.endYear, work.status);
  const kind = [work.demographic, work.genres[0]?.toLowerCase()].filter(Boolean).join(' ');
  const article = /^[aeiou]/i.test(kind) ? 'an' : 'a';
  const by = creators ? ` by ${creators}` : '';
  const complete =
    work.status === 'completed' && work.volumes
      ? `, complete in ${work.volumes === 1 ? 'one volume' : `${work.volumes} volumes`}`
      : work.status === 'ongoing'
        ? ', still running'
        : '';
  return `${work.title}${run ? ` (${run})` : ''} is ${kind ? `${article} ${kind} ` : 'a '}manga${by}${complete}.`;
}

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
  const split = splitReading(work.body);
  const body = injectHeadingIds(split.body);
  const reading = split.reading;
  const headings = extractHeadings(body);
  const { standfirst, rest } = splitStandfirst(body);
  const guides = creators.flatMap((c) => getLearnTopic(`where-to-start-with-${c.slug}`) ?? []);

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

  const facts: Array<[string, string]> = [
    ...(run ? [['Published', run] as [string, string]] : []),
    ...(work.status ? [['Status', work.status] as [string, string]] : []),
    ...(work.volumes ? [['Volumes', String(work.volumes)] as [string, string]] : []),
    ...(work.demographic ? [['Demographic', work.demographic] as [string, string]] : []),
    ...(work.magazine ? [['Magazine', work.magazine.split(';').map((m) => m.trim()).join(', ')] as [string, string]] : []),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Wiki', href: '/wiki' },
          { name: work.title, href: `/wiki/series/${work.slug}` },
        ]}
      />

      <h1 className="font-display text-3xl md:text-[2.6rem] font-bold tracking-tight leading-tight text-ink dark:text-parchment">
        {work.title}
      </h1>
      {work.altTitles.length > 0 && (
        <p className="mt-1 text-sm text-ink-muted dark:text-parchment/60">{work.altTitles.join(' · ')}</p>
      )}

      <p className="mt-5 mb-6 bubble text-lg md:text-xl leading-relaxed text-ink dark:text-parchment/90">
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
      {/* A compact fact box is what readers scan first on a reference page and
          what assistants tend to lift as the answer. Two columns on a phone keep
          it to a few lines, so the entry itself starts on the first screen. */}
      {(facts.length > 0 || creators.length > 0) && (
        // Cells wrap and grow to fill their row, so a short last row never
        // leaves an empty box; each draws its own top and left hairline, and
        // the negative margins tuck the outer ones under the frame.
        <dl className="mb-10 flex flex-wrap manga-panel [&>div]:-mt-px [&>div]:-ml-px [&>div]:border-t [&>div]:border-l [&>div]:border-line">
          {creators.length > 0 && (
            <div className="basis-full px-4 py-3">
              <dt className="eyebrow mb-1">{creators.length > 1 ? 'Creators' : 'Creator'}</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1">
                {creators.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/wiki/creator/${c.slug}`}
                    className="font-display text-lg text-gold hover:underline underline-offset-4"
                  >
                    {c.name}
                  </Link>
                ))}
              </dd>
            </div>
          )}
          {facts.map(([k, v]) => (
            <div key={k} className={`grow px-4 py-3 ${k === 'Magazine' ? 'basis-[14rem]' : 'basis-[9rem]'}`}>
              <dt className="eyebrow mb-1">{k}</dt>
              <dd className="font-display text-base capitalize text-ink dark:text-parchment">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {guides.map((guide) => (
        <Link
          key={guide.slug}
          href={`/learn/${guide.slug}`}
          className="group block mb-8 p-4 border-2 border-[rgb(var(--ink-line))] rounded-sm hover:border-primary/40 transition-colors"
        >
          <span className="eyebrow block mb-1">Reading guide</span>
          <span className="font-display text-lg font-semibold text-ink dark:text-parchment group-hover:text-primary transition-colors">
            {guide.title} →
          </span>
        </Link>
      ))}

      {standfirst && <div className="ref-prose" dangerouslySetInnerHTML={{ __html: standfirst }} />}

      <OnThisPage headings={headings} />

      <div
        className="ref-prose"
        dangerouslySetInnerHTML={{ __html: linkReferenceMentions(rest, `/wiki/series/${work.slug}`) }}
      />

      <UpdatedLine
        url={`${BASE}/wiki/series/${work.slug}`}
        name={work.title}
        updatedAt={work.updatedAt}
        about={`${BASE}/wiki/series/${work.slug}#series`}
        className="mt-6"
      />

      {answers.length > 0 && (
        <section className="mt-12" aria-labelledby="quick-answers">
          <h2 id="quick-answers" className="chapter-title text-xl mb-5">
            <span>Quick answers</span>
          </h2>
          <dl className="manga-panel px-5 divide-y divide-line">
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
          <h2 id="similar-series" className="chapter-title text-xl mb-5">
            <span>If you like {work.title}</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {similar.map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/wiki/series/${w.slug}`}
                  className="group manga-panel block p-4 h-full"
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

      {reading && <div className="ref-prose mt-12" dangerouslySetInnerHTML={{ __html: reading }} />}

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
              const chip = 'chip text-xs px-3 py-1';
              return getGenreInfo(slug) ? (
                <Link
                  key={g}
                  href={`/genre/${slug}`}
                  className={`${chip} text-ink dark:text-parchment`}
                >
                  {g}
                </Link>
              ) : (
                <span key={g} className={`${chip} !border-dashed text-ink-muted dark:text-gray-400 hover:!bg-transparent hover:!text-ink-muted`}>
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
