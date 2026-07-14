/**
 * Seeds "The Grammar of the Page" — formal criticism of how manga actually works
 * on a reader: the panel, the gutter, the page turn, the line.
 *
 * The third of Catzye's essay series, and deliberately the one that answers what
 * neither of the others can. "The Numbers Behind the Manga" used a lens it openly
 * admitted was only a lens. "The Serialization Machine" explains manga through
 * the commercial forces acting on it — but a machine that presses equally on
 * everyone cannot explain why one page lands and another dies. That question is
 * formal, so this series is close reading.
 *
 * Its failure mode is not fabricated statistics but empty abstraction, so
 * lib/essay.ts's generateCraftEssay forces every claim down onto a specific,
 * nameable page a reader could go and look at.
 *
 * Run with: npx tsx scripts/seed-grammar-series.ts
 * Requires GEMINI_API_KEY (read from .env / .env.local) and DATABASE_URL.
 * Idempotent — re-running skips parts that already exist.
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function loadEnv(file: string) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    if (process.env[key]) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}
loadEnv('.env');
loadEnv('.env.local');

const prisma = new PrismaClient();

const SERIES = {
  title: 'The Grammar of the Page',
  slug: 'the-grammar-of-the-page',
  category: 'manga',
  description:
    'How manga actually works on a reader. A close-reading series on the formal machinery of comics — the panel, the gutter, the page turn, the line, and the silence between them.',
};

const TOPICS: { topic: string; anchors: string[] }[] = [
  {
    topic:
      'The Gutter: the most important part of a comic is the part that is blank, and the reader is the one who fills it',
    anchors: [
      'Closure — the reader supplying the motion, time, and violence that the page never draws',
      'Why the gutter makes comics participatory in a way film cannot be: the reader controls the pace of every transition',
      'What happens when an artist manipulates gutter width and rhythm deliberately, and what a page of uniform gutters costs you',
    ],
  },
  {
    topic:
      'The Page Turn: manga’s only true cliffhanger device, and the reason a chapter is built the way it is',
    anchors: [
      'The turn as a physical gate the artist controls — everything before it is setup, and the reveal is guaranteed to be unseen',
      'How a right-to-left reading order changes where the turn falls and what can be hidden behind it',
      'What is lost on a phone screen and an infinite scroll, where the turn does not exist',
    ],
  },
  {
    topic:
      'Panel Shape and Rhythm: how the size and proportion of a box controls the speed at which you read it',
    anchors: [
      'The relationship between panel size and perceived duration — the small panel as a beat, the large one as a held breath',
      'The tall thin panel and the horizontal wide panel as opposite instructions to the eye',
      'How a page establishes a rhythm precisely so it can break it',
    ],
  },
  {
    topic:
      'Drawing Speed: motion lines, impact frames, and the century-old problem of showing movement in a still image',
    anchors: [
      'Speed lines and the subjective-motion technique of moving the background rather than the figure',
      'The impact frame — the single flash of abstraction or inverted black at the moment of a hit',
      'Why manga commits so much harder to these devices than American comics, and what it buys',
    ],
  },
  {
    topic:
      'The Sound You Can See: onomatopoeia as drawing, and why translating a sound effect is a design problem, not a language one',
    anchors: [
      'Japanese sound effects as integrated graphic elements rather than lettering placed on top of art',
      'Sounds for things that make no sound — the famous silence effects — and what that reveals about the convention',
      'Why localisation struggles here, and the real trade-off between replacing the katakana and preserving the composition',
    ],
  },
  {
    topic:
      'The Silent Panel: ma, negative space, and the courage to spend a whole page on nothing happening',
    anchors: [
      'The concept of ma — interval, pause, the charged emptiness — and its use as a deliberate compositional tool',
      'Wordless sequences that carry the emotional weight of a chapter, and what the absence of dialogue forces the reader to do',
      'The commercial cost of a silent page in a weekly format, and why an artist spends it anyway',
    ],
  },
  {
    topic:
      'The Shojo Page: dissolved borders, floating figures, and a layout grammar built to render interior life rather than events',
    anchors: [
      'The characteristic shojo layout — overlapping panels, panels without frames, figures drifting outside the grid',
      'The Year 24 Group’s formal innovations and how radically they departed from the standard grid',
      'Why this grammar is better suited to emotion and worse suited to legible physical action, and how artists exploit that',
    ],
  },
  {
    topic:
      'The Shonen Page: the splash, the escalation, and a layout grammar engineered for legibility at speed',
    anchors: [
      'The clear read: how a battle page is composed so the eye cannot get lost',
      'The splash page and the double-page spread as the escalation currency of the genre',
      'What happens when the escalation grammar runs out of room — the visual inflation problem in long-running battle manga',
    ],
  },
  {
    topic:
      'The Iconic Face: why a simply drawn character is easier to become, and the abstraction at the centre of the medium',
    anchors: [
      'The principle that a simplified face invites identification while a detailed one demands observation',
      'The common manga strategy of a simply drawn protagonist moving through a densely rendered world',
      'Where the theory is too neat — realist artists whose faces are anything but iconic and who still command total identification',
    ],
  },
  {
    topic:
      'The Eye: the history of manga’s most parodied convention, and what an enormous pupil is actually doing',
    anchors: [
      'The historical development of the large eye, and the too-simple story usually told about its origins',
      'What the eye is doing formally: the largest available surface for reflected light, tears, and directed gaze',
      'Artists who deliberately refuse the convention and what their smaller eyes cost and gain them',
    ],
  },
  {
    topic:
      'Chibi and the Register Shift: how manga breaks its own reality for a joke and gets away with it',
    anchors: [
      'Super-deformation as a deliberate, instantly readable shift in tonal register rather than a lapse in style',
      'Why this works in a drawn medium and reads as jarring when adapted literally into other forms',
      'When the register shift undercuts a scene it should have left alone — the technique as a crutch',
    ],
  },
  {
    topic:
      'Screentone: light, texture, and mood applied in adhesive sheets — the material history of how manga got its greys',
    anchors: [
      'What screentone physically was, how it was applied and cut, and the labour it represented',
      'Tone as light and psychology rather than decoration — how it builds atmosphere and depth',
      'What changed when tone became digital, and the flatness that a careless digital application produces',
    ],
  },
  {
    topic:
      'Spotting Blacks: the artists who understand that ink is a design element and not just an outline',
    anchors: [
      'The distribution of solid black across a page as compositional structure — where the eye rests and where it is pulled',
      'Kentaro Miura, Junji Ito, and the use of dense black and fine hatching to produce dread',
      'The opposite strategy: artists who work almost entirely in white space, and what that lightness does',
    ],
  },
  {
    topic:
      'The Line: brush versus pen, and the argument that an artist’s handwriting is the whole of their style',
    anchors: [
      'The physical difference between a brush line and a nib line, and the different confidence each demands',
      'Line weight as hierarchy — what a thick contour and a fine interior line tell the eye to prioritise',
      'Artists whose line is instantly identifiable, and what specifically makes it so',
    ],
  },
  {
    topic:
      'The Background as Psychology: flower screens, screaming darkness, and the manga convention of drawing the inside of a head',
    anchors: [
      'The symbolic background — flowers, sparkles, sudden abstraction — as an externalisation of interior state',
      'The horror equivalent: backgrounds that curdle, hatch, and close in around a figure',
      'The risk of the convention becoming shorthand, and artists who keep it alive by using it sparingly',
    ],
  },
  {
    topic:
      'Right to Left: how the reading direction shapes composition, and what actually happens when you flip a page',
    anchors: [
      'Where the eye enters and exits a right-to-left page, and how artists compose movement along that path',
      'What flipping did to art in the early Western licensing era, beyond the obvious problem of handedness',
      'The subtler consequence: a character moving "forward" is moving left, which inverts the Western reading of momentum',
    ],
  },
  {
    topic:
      'The Spread: the double page as manga’s largest instrument, and the discipline of not overusing it',
    anchors: [
      'The spread as a single image occupying the reader’s whole field of view, and the physical experience of opening onto one',
      'The spread as a reveal, deployed immediately after a page turn — the medium’s biggest one-two punch',
      'Diminishing returns: series whose spreads lost force through overuse, and the restraint that keeps them powerful',
    ],
  },
  {
    topic:
      'The Transitions: the six ways to get from one panel to the next, and the one manga uses far more than anyone else',
    anchors: [
      'The taxonomy of panel transitions — moment to moment, action to action, subject to subject, scene to scene, aspect to aspect',
      'Aspect-to-aspect as the distinctive manga mode: no action advances, but a place or a mood is assembled from fragments',
      'Why this transition makes manga feel slower, more atmospheric, and more spatial than mainstream Western comics',
    ],
  },
  {
    topic:
      'Drawing Time: how a still page controls duration, and why a comic can make a single second last a chapter',
    anchors: [
      'The mechanisms by which a page encodes duration — panel count, size, dialogue density, and the gutter',
      'The extended moment: the battle beat stretched across pages, and the compression of years into a single panel',
      'The specific abuse of the technique: stalling, padding, and the reader’s ability to feel when time is being wasted',
    ],
  },
  {
    topic:
      'The Balloon: dialogue, thought, narration, and the fact that vertical text changes the shape of everything',
    anchors: [
      'How vertical Japanese text produces tall narrow balloons, and how that reshapes the panel around them',
      'Balloon shape and tail as tone of voice — the jagged shout, the trembling whisper, the borderless thought',
      'Why English lettering in a manga panel is a genuine design compromise, and what a good letterer does about it',
    ],
  },
  {
    topic:
      'The Architecture of a Chapter: nineteen pages, a hook, and an ending that must make you buy next week',
    anchors: [
      'The internal structure of a weekly chapter — the opening recap beat, the escalation, the final-page hook',
      'How the last panel of a chapter is composed differently from every other panel in it',
      'What this structure does to a story read in collected volumes, where the weekly hooks become visible seams',
    ],
  },
  {
    topic:
      'From Page to Screen: what an anime must add, what it must throw away, and why a faithful adaptation is impossible',
    anchors: [
      'The things anime must invent that the page never specified — voice, exact timing, the space between drawings',
      'The things it cannot keep: the reader-controlled pace, the page turn, the composed spread',
      'Adaptations that understood this and rebuilt the effect in the new grammar rather than copying the panel',
    ],
  },
  {
    topic:
      'Bad Pages: the failures nobody analyses — the muddled action, the illegible layout, the page you read twice and still cannot parse',
    anchors: [
      'Name and diagnose the specific failure modes concretely: the broken eye path where the reading order is genuinely ambiguous; staging where the reader cannot tell where two fighters are standing relative to each other; the impact frame that hides the actual hit; the crowded page where speech balloons force the eye backwards',
      'Ground each failure in a real, widely-discussed tendency in actual published manga — late-run battle series whose action grew sparse and hard to follow, dense psychological series whose late chapters left readers genuinely unable to reconstruct events. Discuss these as craft problems, describing what the page does to the eye, never as insults to the artist',
      'Why criticism is so much better at praising the great page than diagnosing the incoherent one — and be self-aware that vague praise like "dynamic paneling" is the same laziness in a nicer coat',
      'The honest observation that some celebrated artists are genuinely weaker at staging than at design or character, that this is a real and sayable thing, and that saying it requires describing the page rather than sneering at the person',
    ],
  },
  // ── Second movement: the hands ──────────────────────────────────────────────
  // The first movement built the vocabulary. This one turns it on individual
  // artists — what specifically their pages do that nobody else's do.
  // Appended BEFORE the closing essay, which must remain the final part.
  {
    topic:
      'Tezuka’s Camera: the man who taught manga to cut, pan, and zoom, and the cinematic grammar he imported wholesale',
    anchors: [
      'The cinematic devices Tezuka brought to the page — the establishing shot, the cut-in, the angle change within a static scene',
      'What manga looked like before this, and how radical the shift genuinely was',
      'The honest qualification: he did not invent all of it, and the "god of manga" framing flattens a messier history',
    ],
  },
  {
    topic:
      'Toriyama’s Clarity: the cleanest action pages ever drawn, and the argument that legibility is a higher achievement than complexity',
    anchors: [
      'The specific qualities of a Toriyama fight page: uncluttered staging, readable spatial relationships, the eye never lost',
      'His design sense — how a silhouette, a machine, or a creature is built to be instantly parsed and instantly redrawn',
      'What his imitators consistently fail to copy, and why clarity is harder than density',
    ],
  },
  {
    topic:
      'Miura’s Density: Berserk, the engraved page, and what happens when an artist refuses to leave any surface undrawn',
    anchors: [
      'The hatching, the armour, the crowds — the sheer information per square inch and what it does to reading speed',
      'How the density serves the story rather than decorating it: a world that is physically oppressive to look at',
      'The cost: the human cost of drawing it, and the pages where the density genuinely obscures the action',
    ],
  },
  {
    topic:
      'Ito’s Dread: the horror of the perfectly clean line, and why Junji Ito’s calm drawing is scarier than any mess',
    anchors: [
      'The controlled, almost clinical line and the flat lighting — horror delivered without visual hysteria',
      'The structural trick of the reveal panel, and how the page turn is used to detonate it',
      'Why his spirals and body horror work on a still page in a way they consistently fail to in animation',
    ],
  },
  {
    topic:
      'Araki’s Poses: JoJo, fashion photography, and a body language borrowed from a place no other manga was looking',
    anchors: [
      'The pose as the fundamental unit of a JoJo page — figures composed as though for a magazine spread, not a fight',
      'The onomatopoeia treated as a graphic object embedded in the image rather than annotation on top of it',
      'How the staging deliberately sacrifices spatial legibility for iconic force, and whether that is a flaw or the point',
    ],
  },
  {
    topic:
      'Inoue’s Bodies: Slam Dunk, Vagabond, and an artist who draws the weight and balance of a human being better than anyone',
    anchors: [
      'The anatomical truth of a body in motion — the shift of weight, the moment of suspension, the fatigue',
      'The famous wordless sequences and what the absence of dialogue and sound effects forces the reader to feel',
      'The shift from the pen of Slam Dunk to the brush of Vagabond, and how the tool changed the storytelling',
    ],
  },
  {
    topic:
      'Urasawa’s Faces: the thriller built entirely on the eyes, and an artist who stages suspense in a raised eyebrow',
    anchors: [
      'The face as the primary site of plot — how much narrative information a single reaction panel is asked to carry',
      'The restraint of his layouts, and how conventional panelling becomes an asset in a thriller',
      'The recurring criticism of his endings, and whether the formal machinery of suspense sets a trap the plot cannot escape',
    ],
  },
  {
    topic:
      'Asano’s Photorealism: Goodnight Punpun, the photographed background, and the cruelty of a beautiful world drawn around a bird',
    anchors: [
      'The photoreal backgrounds set against radically abstracted figures, and the dissonance that produces',
      'Punpun rendered as a crude bird among detailed humans — the most audacious use of the iconic-face principle in modern manga',
      'The accusation that the aesthetic is miserabilist decoration, and the honest case for and against it',
    ],
  },
  {
    topic:
      'Matsumoto’s Distortion: Tekkonkinkreet, a line that refuses to behave, and the argument that "bad" drawing can be the most alive',
    anchors: [
      'The warped perspective and rubbery figures — a deliberate rejection of the polished commercial line',
      'How the distortion produces a city that feels lived in and a childhood that feels genuinely unstable',
      'Where the influence of European comics is visible, and what he did with it that no one else did',
    ],
  },
  {
    topic:
      'Hagio’s Interiors: the Year 24 Group’s formal revolution, and the page that learned to hold two times at once',
    anchors: [
      'The dissolved panel and the overlaid image — memory, feeling, and present action occupying the same space',
      'How this layout genuinely could not be done in prose or film, and what it therefore proves about the medium',
      'The subsequent absorption of these techniques into mainstream manga, and how invisible their radicalism has become',
    ],
  },
  {
    topic:
      'CLAMP’s Decoration: the page as textile, and an aesthetic where ornament is not excess but structure',
    anchors: [
      'The elongated figures, the floating fabric, the panels overwhelmed by pattern',
      'How ornament carries emotional and narrative weight rather than merely filling space',
      'The legibility problem: pages where the decoration genuinely defeats the action, and whether they care',
    ],
  },
  {
    topic:
      'Fujimoto’s Cuts: Chainsaw Man, Look Back, and a storyteller who paces like a film editor with no respect for the reader’s comfort',
    anchors: [
      'The abrupt cut — the violent tonal shift executed across a single gutter',
      'The deliberately anticlimactic panel, and how withholding the expected money shot becomes its own device',
      'The Look Back sequence structure, and how a page turn is used to deliver grief rather than spectacle',
    ],
  },
  {
    topic:
      'Oda’s Overload: One Piece, the page you cannot see the bottom of, and a crowded chaos that somehow still reads',
    anchors: [
      'The maximalist page — dozens of figures, gags in the margins, and a composition that should collapse but does not',
      'The visual design of the world: silhouettes and shapes built so a character is identifiable at any scale',
      'Where the maximalism does defeat him — the genuinely hard-to-follow crowd fights of the later arcs',
    ],
  },
  {
    topic:
      'Togashi’s Text: Hunter x Hunter, the page overrun with writing, and an artist who broke his own medium and kept going',
    anchors: [
      'The famously text-dense pages and the sketchy hiatus-era art, treated as formal choices and as physical necessity',
      'The information-density approach to tension — rules, conditions, and explanation as the actual engine of suspense',
      'The honest question of whether the text-heavy pages are brilliant or simply unfinished, and why both can be true',
    ],
  },
  {
    topic:
      'Otomo’s Machines: Akira, the collapsing city, and the most rigorous draughtsmanship the medium has produced',
    anchors: [
      'The architectural precision — the perspective, the rubble, the consistency of a city drawn from every angle',
      'The famous destruction sequences and how the panel structure conveys physical scale',
      'The influence on everything after, and the cost of a standard almost nobody could sustain',
    ],
  },
  {
    topic:
      'Mizuki’s Two Registers: the cartoon yokai walking through a photorealist forest, and a split style that carries an argument',
    anchors: [
      'The signature contrast: simply drawn cartoon figures placed in meticulously rendered natural backgrounds',
      'How this split makes the supernatural feel like it genuinely inhabits the real world rather than replacing it',
      'The same technique turned on his war memoirs, where the cartoon soldier stands in a real jungle — and what that does',
    ],
  },

  {
    topic:
      'Why the Page: a closing essay. Numerology offered a lens that was only a lens, and economics explains the pressure on every artist equally — but neither can tell you why THIS page works. Only the page can',
    anchors: [
      'What formal analysis can do that neither a mystical frame nor a commercial one can: explain the specific effect of a specific choice',
      'The limits of formalism too — it explains how a page works, not why it moves you, and it can become a closed technical game',
      'The argument for reading with all three: the number, the money, and the line — and why the line is the one that is actually there on the paper',
    ],
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || 'grammar-essay';
  let suffix = 0;
  while (await prisma.article.findUnique({ where: { slug }, select: { id: true } })) {
    suffix++;
    slug = `${base}-${suffix}`;
  }
  return slug;
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required to generate the essays (checked env, .env, .env.local).');
  }

  const { generateCraftEssay } = await import('../lib/essay');

  const series = await prisma.series.upsert({
    where: { slug: SERIES.slug },
    update: {
      title: SERIES.title,
      description: SERIES.description,
      category: SERIES.category,
      topics: TOPICS.map((t) => t.topic),
    },
    create: {
      title: SERIES.title,
      slug: SERIES.slug,
      description: SERIES.description,
      category: SERIES.category,
      topics: TOPICS.map((t) => t.topic),
    },
  });
  console.log(`Series ready: ${series.title} (${series.id})`);

  // Dates run BACKWARDS from now — see the note in seed-numerology-series.ts.
  const PART_INTERVAL_MS = 2 * 24 * 60 * 60 * 1000;
  const seriesEnd = Date.now() - 24 * 60 * 60 * 1000;
  let failures = 0;

  for (let i = 0; i < TOPICS.length; i++) {
    const partNumber = i + 1;
    const { topic, anchors } = TOPICS[i];

    const existing = await prisma.article.findFirst({
      where: { seriesId: series.id, seriesOrder: partNumber },
      select: { id: true, slug: true },
    });
    if (existing) {
      console.log(`  Part ${partNumber}: exists (${existing.slug}) — skipping`);
      continue;
    }

    console.log(`  Part ${partNumber}: generating "${topic.slice(0, 60)}…"`);

    let essay: Awaited<ReturnType<typeof generateCraftEssay>> | null = null;
    for (let attempt = 1; attempt <= 3 && !essay; attempt++) {
      try {
        essay = await generateCraftEssay(
          SERIES.title,
          SERIES.description,
          topic,
          partNumber,
          TOPICS.length,
          anchors,
        );
      } catch (err) {
        console.log(`    · attempt ${attempt} failed: ${(err as Error).message}`);
      }
    }
    if (!essay) {
      console.log(`    ✗ Part ${partNumber}: giving up after 3 attempts — re-run the script to retry.`);
      failures++;
      continue;
    }

    const slug = await uniqueSlug(slugify(essay.title));
    const publishedAt = new Date(seriesEnd - (TOPICS.length - partNumber) * PART_INTERVAL_MS);

    const article = await prisma.article.create({
      data: {
        title: essay.title,
        excerpt: essay.excerpt,
        content: essay.content,
        slug,
        category: SERIES.category,
        source: 'Catzye Craft Desk',
        sourceUrl: `https://catzye.com/series/${SERIES.slug}/part-${partNumber}`,
        publishedAt,
        published: true,
        tags: essay.tags,
        entities: essay.entities,
        pullQuote: essay.pullQuote || null,
        seriesId: series.id,
        seriesOrder: partNumber,
      },
    });
    console.log(`    ✓ published /article/${article.slug} (${essay.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length} words)`);
  }

  console.log(failures ? `Done, with ${failures} part(s) skipped — re-run to retry them.` : 'Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
