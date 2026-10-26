import { getAllWorks, getAllCreators, getAllGlossaryTerms, workRun } from '@/lib/education';

// A tag or topic hub is a list of essays. On its own that says little about the
// subject, and for a series or a term the reference already has the page that
// does. This finds that page, so the hub can lead with it, and holds a short
// hand-written framing for the hubs whose subject has no entry of its own.

export interface HubReference {
  kind: 'Series' | 'Creator' | 'Glossary';
  href: string;
  title: string;
  summary: string;
  facts: string[];
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** The wiki or glossary entry whose name matches a hub's subject, if any. */
export function findHubReference(name: string): HubReference | null {
  const n = norm(name);
  const work = getAllWorks().find(
    (w) => norm(w.slug) === n || norm(w.title) === n || w.altTitles.some((a) => norm(a) === n),
  );
  if (work) {
    const run = workRun(work);
    return {
      kind: 'Series',
      href: `/wiki/series/${work.slug}`,
      title: work.title,
      summary: work.synopsisSource ?? work.synopsis,
      facts: [run, work.demographic ?? '', work.volumes ? `${work.volumes} volumes` : '', work.status ?? ''].filter(Boolean),
    };
  }
  const creator = getAllCreators().find((c) => norm(c.slug) === n || norm(c.name) === n);
  if (creator) {
    return {
      kind: 'Creator',
      href: `/wiki/creator/${creator.slug}`,
      title: creator.name,
      summary: creator.bioSource ?? creator.bio,
      facts: [creator.role, creator.bornYear ? `born ${creator.bornYear}` : ''].filter(Boolean),
    };
  }
  const term = getAllGlossaryTerms().find(
    (t) => norm(t.slug) === n || norm(t.term) === n || t.aliases.some((a) => norm(a) === n),
  );
  if (term) {
    return {
      kind: 'Glossary',
      href: `/glossary/${term.slug}`,
      title: term.term,
      summary: term.shortDefSource ?? term.shortDef,
      facts: [],
    };
  }
  return null;
}

/**
 * Framing for hubs whose subject has no reference entry. Plain text with
 * [label](href) links to the guides that cover the subject in depth. Keyed by
 * "tag:<slug>" or "topic:<slug>".
 */
const INTROS: Record<string, string> = {
  'tag:4kids':
    '4Kids Entertainment was the New York company that brought much of the anime American children watched around 2000 to television, among them Yu-Gi-Oh!, Shaman King, Sonic X and, from 2004, One Piece. It was known for heavy localisation: Japanese names were changed, food and writing were painted over, and violence was cut for broadcast. The essays here use its dubs as a case study in what crosses into another culture and what is quietly removed on the way. The company filed for bankruptcy in 2011. See also [how manga lettering and translation choices work](/learn/manga-lettering-and-translation-choices).',
  'topic:4kids-entertainment':
    '4Kids Entertainment was the New York licensing company behind many of the anime dubs American children grew up with around 2000, including Yu-Gi-Oh!, Shaman King and, from 2004, One Piece. Its versions were cut and rewritten for broadcast: names anglicised, Japanese food and text painted out, violence removed. The essays collected here read those edits as evidence of what a culture expects a cartoon to be. The company filed for bankruptcy in 2011. For the wider question, see [what changes when manga becomes anime](/learn/manga-vs-anime-what-changes-in-adaptation).',
  'tag:craft':
    'Craft is how a manga is physically and visually made: the page layout and the order in which a reader moves through it, the panel and the gutter, inking, screentone and the hand lettering of sound effects. The essays tagged here look at a particular choice on the page and what it does to the reader. For the fundamentals, start with [how a manga page is composed](/learn/how-a-manga-page-is-composed), [the tools of a manga artist](/learn/the-tools-of-a-manga-artist) and [screentone, hatching and black-and-white art](/learn/screentone-hatching-and-black-and-white-art).',
  'tag:dubbing':
    'Dubbing replaces an anime’s Japanese voice track with a new performance in another language, and every dub makes choices a subtitle does not have to: lines rewritten to match mouth movements, jokes replaced, names and honorifics kept or dropped, and a cast directed to sound like the original or like something new. The essays tagged here look at dubs that changed how a series was received, from heavily edited children’s broadcasts to performances admired as much as the originals. See also [what changes in adaptation](/learn/manga-vs-anime-what-changes-in-adaptation).',
  'tag:finale':
    'A finale is where a long manga has to account for everything it promised, often after years of weekly serialisation and with an anime still running behind it. The essays tagged here look at how particular series ended: endings that divided readers, endings forced by cancellation or an author’s illness, and endings that changed how the whole story reads. For how serialisation shapes an ending, see [how a manga gets serialized](/learn/how-a-manga-gets-serialized).',
  'tag:lettering':
    'Lettering is everything written on a manga page: the dialogue in its balloons, captions, and the hand-drawn sound effects that are part of the artwork. Translating it means deciding whether to replace those effects, gloss them or leave them, and how to fit English into balloons shaped for vertical Japanese. The essays tagged here look at those decisions in particular books. Start with [how sound effects work in manga](/learn/how-sound-effects-work-in-manga) and [manga lettering and translation choices](/learn/manga-lettering-and-translation-choices).',
  'tag:meaning':
    'These essays ask what a manga or anime means, as distinct from what happens in it: what a recurring image is doing, what a name or number signals, and what a story believes about effort, fate or people. They read closely, and they read against the title’s numbers, which is how this reference files everything. For the method behind that filing, see [how the shelves work](/numbers).',
  'tag:subtitles':
    'Subtitles carry an anime’s dialogue as text, and they have to compress it: a line has to be read in the time it is spoken, so wordplay, honorifics and tone are often the first things cut. The essays tagged here look at what a particular subtitle track kept and lost, and at the long history of fan subtitles that preceded official simulcasts. See also [scanlation, how it works and why it is contested](/learn/scanlation-how-it-works-and-why-it-is-contested) and the glossary entry on [simulpub](/glossary/simulpub).',
  'tag:titles':
    'A manga’s title is often the first thing changed when it travels: shortened, translated literally, or replaced outright for a market that would not understand the original. The essays tagged here look at what particular titles say, what was lost or added when they crossed into English, and, since this reference files every text by the number its title reduces to, what the letters themselves add up to. See [how the shelves work](/numbers).',
  'topic:dark-horse-comics':
    'Dark Horse Comics, founded in Oregon in 1986, was one of the first American publishers to commit to manga in English. Its list included Lone Wolf and Cub, Ghost in the Shell, Blade of the Immortal, Hellsing, Oh My Goddess!, Astro Boy and Berserk, often in editions that introduced these series to Western readers for the first time. The essays collected here look at how its editions shaped what English-language readers thought manga was.',
  'topic:shinji-ikari':
    'Shinji Ikari is the fourteen-year-old protagonist of Neon Genesis Evangelion, summoned by his estranged father to pilot the giant Evangelion Unit-01 against beings called Angels. He does not want to fight and says so, and the series is built around his fear, his need for approval and the adults who use him. He is one of the most discussed protagonists in anime, and the essays collected here read him closely. See the reference entry for [Neon Genesis Evangelion](/wiki/series/neon-genesis-evangelion).',
  'topic:what-survives-the-crossing':
    'What Survives the Crossing is one of this reference’s essay series: a close reading of what changes when manga and anime cross into another language, through translation, localisation, dubbing, subtitles and lettering, one case at a time. Read it in order from [the series page](/series/what-survives-the-crossing), or start with the guide to [manga lettering and translation choices](/learn/manga-lettering-and-translation-choices).',
};

export function getHubIntro(kind: 'tag' | 'topic', slug: string): string | null {
  return INTROS[`${kind}:${slug}`] ?? null;
}

/** The same framing as plain text, for a meta description. */
export function getHubIntroText(kind: 'tag' | 'topic', slug: string): string | null {
  return getHubIntro(kind, slug)?.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') ?? null;
}
