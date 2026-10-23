import { prisma } from '@/lib/db';
import { TodaysNumber } from '@/components/TodaysNumber';
import { GROUP_NUMBERS, getGroup } from '@/lib/number-groups';
import { getAllEntries } from '@/lib/shelves';
import { getAllStandaloneGuides } from '@/lib/standalone-guides';
import {
  LEARN_TRACKS,
  getTopicsInTrack,
  getAllWorks,
  getAllCreators,
  getAllGlossaryTerms,
} from '@/lib/education';
import Link from 'next/link';
import type { Metadata } from 'next';
import { openGraph, twitter } from '@/lib/seo';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

export const metadata: Metadata = {
  // `absolute` so the root layout's "%s | Catzye" template does not append a
  // second "Catzye" to a title that already opens with the brand.
  title: { absolute: 'Catzye — Learn Manga: Guides, Glossary & Series Reference' },
  description:
    'Learn how manga works: explainers on genres, craft, history and industry, a full glossary of manga terminology, and reference entries for series and creators.',
  alternates: { canonical: '/' },
  openGraph: openGraph({
    title: 'Catzye — Learn Manga: Guides, Glossary & Series Reference',
    description:
      'Learn how manga works: explainers on genres, craft, history and industry, a full glossary of manga terminology, and reference entries for series and creators.',
    url: BASE,
  }),
  twitter: twitter({ title: 'Catzye — Learn Manga' }),
};

const LEARN_ENTRY_POINTS = [
  {
    href: '/learn',
    title: 'Learn',
    blurb: 'Ordered explainers across basics, genres, craft, history and the industry.',
  },
  {
    href: '/glossary',
    title: 'Glossary',
    blurb: 'Every term you will run into, defined in a sentence and explained in full.',
  },
  {
    href: '/wiki',
    title: 'Wiki',
    blurb: 'Reference entries for the series themselves and the creators behind them.',
  },
];

// The terms a newcomer runs into first, in roughly the order they meet them.
// The full list is one click away.
const COMMON_TERMS = [
  'mangaka', 'tankobon', 'serialization', 'one-shot', 'shonen', 'shojo', 'seinen', 'josei',
  'isekai', 'manhwa', 'webtoon', 'light-novel', 'anime-adaptation', 'scanlation', 'simulpub',
  'doujinshi', 'yonkoma', 'omake', 'tsundere', 'otaku',
];

// Frozen edition (see lib/db.ts) — nothing here changes until the next deploy,
// so a timer only bought re-renders and ISR writes for identical output.
export const revalidate = false;

// Only hand-written essays reach the front page; the machine-written ones stay
// at their URLs but out of everything that promotes them (Article.generated).
async function getEssays() {
  const [essays, series] = await Promise.all([
    prisma.article.findMany({
      where: { published: true, generated: { not: true } },
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.series.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);
  const partsBySeries = new Map<string, number>();
  for (const e of essays) {
    if (e.seriesId) partsBySeries.set(e.seriesId, (partsBySeries.get(e.seriesId) ?? 0) + 1);
  }
  return {
    essays,
    series: series
      .filter((s) => partsBySeries.has(s.id))
      .map((s) => ({ ...s, parts: partsBySeries.get(s.id)! })),
  };
}

// The front page leads with the reference, not with dates: the edition is
// finished work, so "latest" would only ever advertise how long ago it was.
export default async function HomePage() {
  const { essays, series } = await getEssays();

  // One way in per learn track: its first explainer.
  const startHere = LEARN_TRACKS.map((track) => ({
    track,
    topic: getTopicsInTrack(track.slug)[0],
  })).filter((t) => t.topic);

  // The longest runs and the most prolific creators — the entries a reader is
  // most likely to have come looking for.
  const works = [...getAllWorks()].sort((a, b) => (b.volumes ?? 0) - (a.volumes ?? 0)).slice(0, 6);
  const creators = [...getAllCreators()]
    .sort((a, b) => b.notableWorks.length - a.notableWorks.length)
    .slice(0, 6);
  const glossary = getAllGlossaryTerms();
  const bySlug = new Map(glossary.map((t) => [t.slug, t]));
  const commonTerms = COMMON_TERMS.flatMap((slug) => bySlug.get(slug) ?? []);

  // The front page is arranged the way the reference is: by what each title
  // reduces to, not by what it is about. Explainers and glossary entries come
  // before reporting within a shelf because they are the part that keeps.
  const entries = await getAllEntries();
  const shelves = GROUP_NUMBERS.map((n) => ({
    n,
    group: getGroup(n),
    entries: entries.filter((e) => e.value === n).slice(0, 4),
  })).filter((s) => s.entries.length > 0);

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        {/* Headline, one sentence of what is here, and the three ways in. The
            day's number is in the header and closes the page, so it is not
            repeated here. */}
        <section className="pt-14 pb-8 md:pt-24 md:pb-12 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-sans text-xs text-ink-muted dark:text-parchment/60 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-seal" aria-hidden="true" />
            A hand-written manga reference, filed by number
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mx-auto text-ink dark:text-parchment">
            How manga works, <span className="text-gold">and where it came from</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed text-ink-2 dark:text-parchment/70">
            Explainers written to be read in order, a glossary of every term you will
            meet, and reference entries for the series and the people who drew them —
            each one read against its numbers.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto text-left">
            {LEARN_ENTRY_POINTS.map(({ href, title, blurb }) => (
              <Link key={href} href={href} className={`group ${CARD} p-6`}>
                <span className="flex items-center justify-between font-display text-xl font-bold mb-1.5 text-ink dark:text-parchment">
                  {title}
                  <Arrow />
                </span>
                <span className="block text-sm leading-relaxed text-ink-muted dark:text-parchment/55">
                  {blurb}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Start here */}
        <section className="my-16">
          <SectionHead title="Start here" note="The first explainer on each track" href="/learn" link="All explainers" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {startHere.map(({ track, topic }) => (
              <Link key={track.slug} href={`/learn/${topic.slug}`} className={`group ${CARD} p-6`}>
                <span className="block mb-2 font-sans text-xs font-medium text-gold">{track.label}</span>
                <span className="block font-display text-xl font-bold leading-snug mb-2 text-ink dark:text-parchment">
                  {topic.title}
                </span>
                <span className="block text-sm leading-relaxed text-ink-muted dark:text-parchment/55 line-clamp-3">
                  {topic.summarySource ?? topic.summary}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* The wiki */}
        <section className="my-16">
          <SectionHead
            title="The wiki"
            note={`${getAllWorks().length} series · ${getAllCreators().length} creators`}
            href="/wiki"
            link="Browse the wiki"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <EntryList
              heading="Series"
              items={works.map((w) => ({
                href: `/wiki/series/${w.slug}`,
                title: w.title,
                meta: [w.startYear, w.volumes ? `${w.volumes} vols` : null].filter(Boolean).join(' · '),
              }))}
            />
            <EntryList
              heading="Creators"
              items={creators.map((c) => ({
                href: `/wiki/creator/${c.slug}`,
                title: c.name,
                meta: c.role,
              }))}
            />
          </div>
        </section>

        {/* The glossary, as a strip of terms */}
        <section className="my-16">
          <SectionHead title="The glossary" note="The terms you will meet first" href="/glossary" link={`All ${glossary.length} terms`} />
          <ul className="flex flex-wrap gap-2">
            {commonTerms.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/glossary/${t.slug}`}
                  className="inline-block rounded-full border border-line bg-[#fbf9f5] dark:bg-ground-2 px-3.5 py-1.5 font-sans text-sm text-ink-2 dark:text-parchment/75 hover:border-gold/40 hover:text-gold transition-colors"
                >
                  {t.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Guides */}
        <section className="my-16">
          <SectionHead title="Guides" note="Longer reads, start to finish" href="/guides" link="All guides" />
          <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
            {getAllStandaloneGuides().slice(0, 6).map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group flex items-baseline gap-3 py-3.5 border-b border-line"
                >
                  <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink-2 dark:text-parchment/85 group-hover:text-gold transition-colors">
                    {guide.title}
                  </span>
                  <span className="shrink-0 font-sans text-xs text-gray-500">{guide.readingTime} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* The reference, shelf by shelf */}
        <section className="my-20 rounded-3xl bg-paper-2/70 dark:bg-ground-2/60 px-4 py-12 sm:px-8 md:py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="font-sans text-xs font-medium text-gold mb-3">The whole reference, by number</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink dark:text-parchment">
              Twelve shelves
            </h2>
            <p className="mt-4 text-ink-2 dark:text-parchment/70 leading-relaxed">
              Every text here — explainer, glossary entry, reference page, essay —
              is filed by the number its title reduces to. Titles that reduce alike
              turn out to be doing alike, which is the only claim this arrangement makes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {shelves.map(({ n, group, entries: shelfEntries }) => (
              <div key={n} className="panel flex flex-col">
                <Link href={`/number/${n}`} className="panel-head group">
                  <span className="sigil sigil-sm">{n}</span>
                  <span className="group-hover:text-gold transition-colors">{group.shelf}</span>
                </Link>
                <div className="px-5 pb-5 pt-1 flex flex-col flex-1">
                  <p className="text-sm leading-snug text-ink-muted dark:text-parchment/55 mb-3">
                    {group.tagline}
                  </p>

                  <ul className="flex-1">
                    {shelfEntries.map((entry) => (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          className="group flex items-baseline gap-2.5 py-2 border-t border-line"
                        >
                          <span className="shrink-0 whitespace-nowrap basis-[5.5rem] font-sans text-xs text-ink-muted dark:text-parchment/55">
                            {entry.kindLabel}
                          </span>
                          <span className="min-w-0 font-display text-[0.95rem] leading-snug text-ink-2 dark:text-parchment/85 group-hover:text-gold transition-colors line-clamp-2">
                            {entry.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/number/${n}`}
                    className="mt-2 inline-block py-1.5 font-sans text-sm font-medium text-gold hover:underline underline-offset-4"
                  >
                    The whole shelf →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-10">
            <Link
              href="/numbers#calculator"
              className="inline-block rounded-full bg-ink text-paper dark:bg-parchment dark:text-ink px-5 py-2.5 font-sans text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Work out any title&apos;s number →
            </Link>
          </p>
        </section>

        {/* Essays */}
        <section className="my-16">
          <SectionHead title="Essay series" note="Long-form, read in order" href="/series" link="All series" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {series.map((s) => (
              <Link key={s.id} href={`/series/${s.slug}`} className={`group ${CARD} p-6`}>
                <span className="flex items-center justify-between gap-3 font-display text-xl font-bold mb-1.5 text-ink dark:text-parchment">
                  {s.title}
                  <Arrow />
                </span>
                <span className="block text-sm leading-relaxed text-ink-muted dark:text-parchment/55 line-clamp-2 mb-3">
                  {s.description}
                </span>
                <span className="font-sans text-xs text-ink-muted dark:text-parchment/55">
                  {s.parts} hand-written {s.parts === 1 ? 'part' : 'parts'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* The day's number, read against the essays. */}
        <TodaysNumber articles={essays} />
      </div>
    </>
  );
}

// A card: a hairline, a soft corner, and a small lift on hover. Every block of
// links on the page uses it, so they read as one family.
const CARD =
  'block rounded-2xl border border-line bg-[#fbf9f5] dark:bg-ground-2 hover:border-gold/30 hover:shadow-[0_10px_30px_-14px_rgba(20,17,15,0.25)] hover:-translate-y-0.5 transition-all duration-200';

function Arrow() {
  return (
    <span
      className="shrink-0 text-base text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      aria-hidden="true"
    >
      →
    </span>
  );
}

function SectionHead({ title, note, href, link }: { title: string; note: string; href: string; link: string }) {
  return (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-2 mb-6">
      <div className="min-w-0">
        <h2 className="font-display text-2xl md:text-[1.75rem] font-bold tracking-tight text-ink dark:text-parchment">{title}</h2>
        <p className="mt-1 font-sans text-sm text-ink-muted dark:text-parchment/55">{note}</p>
      </div>
      <span className="flex-1" />
      <Link href={href} className="inline-block py-1.5 font-sans text-sm font-medium text-gold hover:underline underline-offset-4">
        {link} →
      </Link>
    </div>
  );
}

function EntryList({ heading, items }: { heading: string; items: { href: string; title: string; meta: string }[] }) {
  return (
    <div className="rounded-2xl border border-line bg-[#fbf9f5] dark:bg-ground-2 px-5 pt-4 pb-2">
      <h3 className="mb-1 font-sans text-xs font-medium text-ink-muted dark:text-parchment/55">{heading}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.href} className="border-b border-line last:border-0">
            <Link
              href={item.href}
              className="group flex items-baseline gap-3 py-3"
            >
              <span className="min-w-0 flex-1 font-display text-lg leading-snug text-ink-2 dark:text-parchment/85 group-hover:text-gold transition-colors">
                {item.title}
              </span>
              <span className="shrink-0 font-sans text-xs text-ink-muted dark:text-parchment/55">{item.meta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
