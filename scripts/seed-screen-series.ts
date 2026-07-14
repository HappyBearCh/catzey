/**
 * Seeds "The Grammar of the Screen" — how anime works as a moving image.
 *
 * The companion to "The Grammar of the Page". That series reads the still page;
 * this one reads the frame and the cut. Note that "The Serialization Machine"
 * already covers sakuga, layouts, and animator labour — but strictly as economics
 * and working conditions. This series treats the same material as CRAFT: not what
 * an in-between animator is paid, but what animating on twos actually does to the
 * eye.
 *
 * Run with: npx tsx scripts/seed-screen-series.ts
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
  title: 'The Grammar of the Screen',
  slug: 'the-grammar-of-the-screen',
  category: 'anime',
  description:
    'How anime works as a moving image. A close-reading series on the craft of the frame and the cut — timing, layouts, compositing, colour, sound, and the art of deciding which drawings not to make.',
};

const TOPICS: { topic: string; anchors: string[] }[] = [
  {
    topic:
      'Ones, Twos, and Threes: the animator’s fundamental decision is how many drawings not to make, and it governs everything else',
    anchors: [
      'What animating on ones, twos, and threes actually means, and how each reads to the eye',
      'Why smoother is not better — the deliberate use of threes for weight and stillness, and ones reserved for the moments that must feel frictionless',
      'The myth that limited animation is simply the cheap option, and the honest part of the accusation that survives scrutiny',
    ],
  },
  {
    topic:
      'Timing and Spacing: why two identical drawings can read as a punch or a caress depending on the gap between them',
    anchors: [
      'Spacing as the encoding of acceleration — bunched drawings for slow, spread drawings for fast',
      'The anticipation-and-snap structure of an impactful movement, and the hold that follows it',
      'How a held frame at the end of an action is doing more work than the movement that preceded it',
    ],
  },
  {
    topic:
      'The Hold: anime’s most characteristic device is the drawing that does not move, and it is not laziness',
    anchors: [
      'The held cel with a slow pan or a drifting camera, and the sustained emotional pressure it creates',
      'The way a hold makes the subsequent movement land harder by contrast',
      'The genuinely lazy version of the same device, and how a viewer can tell the difference',
    ],
  },
  {
    topic:
      'Genga and Douga: the division of drawing labour, and what actually survives from key frame to finished cut',
    anchors: [
      'The split between key animation and in-betweening, and what each role actually decides',
      'How a key animator’s intention can be flattened or preserved by the in-betweens and the clean-up',
      'Why the same storyboard produces radically different cuts in different hands',
    ],
  },
  {
    topic:
      'The Layout Is the Direction: the least-discussed document in anime production is the one that decides what the shot actually is',
    anchors: [
      'What a layout specifies — framing, staging, camera, the relationship of figure to background',
      'Why the layout, not the storyboard, is where most of the visual authorship actually happens',
      'The consequence when layouts are weak: technically competent animation inside shots that say nothing',
    ],
  },
  {
    topic:
      'The Storyboard: the film exists on paper before a single frame is animated, and the ekonte is where an adaptation is truly made',
    anchors: [
      'What an ekonte contains — shot, duration, dialogue, camera — and how binding it is downstream',
      'The storyboard as the point at which a manga panel becomes a shot, or refuses to',
      'Directors whose storyboards are the authorship, and what that means for the credit fans give to studios instead',
    ],
  },
  {
    topic:
      'Smears, Multiples, and Impact Frames: the deliberate ugliness that the eye never consciously sees',
    anchors: [
      'The smear and the multiple as single frames of pure distortion that read as speed rather than as error',
      'The impact frame — the flash of inverted or abstracted imagery at the point of contact — and why it works',
      'Freeze-framing these and finding them grotesque, which is precisely the point: they are engineered for motion, not inspection',
    ],
  },
  {
    topic:
      'Effects Animation: fire, water, smoke, and the specialists who animate the things that have no skeleton',
    anchors: [
      'Why effects animation is a distinct discipline — no anatomy to fall back on, only rhythm and shape',
      'The stylised, hard-edged Japanese approach to fire and explosion versus a naturalistic treatment',
      'The debris and dust that sell physical weight, and how their absence makes even good action feel light',
    ],
  },
  {
    topic:
      'Character Acting: the quiet animation nobody applauds, and the argument that it is harder than any fight scene',
    anchors: [
      'Acting animation — weight shifts, hesitations, the way a hand finds a cup — and why it is so rarely praised',
      'How much of a performance survives in the gap between a voice track and a face that barely moves',
      'The specific studios and works where this quiet craft is the point, and what it costs to do well',
    ],
  },
  {
    topic:
      'The Camera That Does Not Exist: pans, follows, and the simulated lens of a medium with no camera at all',
    anchors: [
      'How camera movement is faked — sliding backgrounds, book pans, multiplane depth',
      'The deliberate imitation of live-action photographic artefacts: lens flare, rack focus, handheld shake',
      'What is gained by pretending to be a camera, and what the medium gives up when it never breaks that pretence',
    ],
  },
  {
    topic:
      'Compositing: the invisible department that decides what the whole thing actually looks like',
    anchors: [
      'What compositing does — light, bloom, diffusion, grade — and how it unifies drawings from many hands',
      'The modern glow, and the honest critique that it is often used to paper over weak drawing',
      'Works whose entire look is a compositing achievement rather than an animation one',
    ],
  },
  {
    topic:
      'Colour as Emotion: the colour script, the palette shift, and the scene that changes meaning when the light changes',
    anchors: [
      'Colour design as a planned arc across an episode or film rather than a per-shot decision',
      'The deliberate palette break — the moment the colour stops behaving and tells you something has gone wrong',
      'Where colour is doing the emotional work that the writing failed to do, and where it genuinely earns it',
    ],
  },
  {
    topic:
      'The Background Painting: the art director’s world, and the strange beauty of a painted room a character walks through once',
    anchors: [
      'The background as painting rather than drawing, and the tradition of art directors who defined studio looks',
      'The dissonance of a simply drawn figure against a hyper-detailed painted background, and why the eye accepts it',
      'The modern shift to digital backgrounds and photo-referencing, and what it changed about the texture of the image',
    ],
  },
  {
    topic:
      'Sound Is Half the Picture: the effect, the silence, and the fact that a cut is only as heavy as the noise it makes',
    anchors: [
      'How a sound effect creates physical impact that the animation alone never delivers',
      'The strategic use of total silence, and why it reads as louder than noise',
      'The way an ambient bed makes a painted background into a place — and the cheapness of a scene with a thin mix',
    ],
  },
  {
    topic:
      'The Insert Song: anime’s most shameless device, and why it works anyway',
    anchors: [
      'The needle-drop at the emotional climax — a device that should be manipulative and frequently is',
      'The mechanics of why it works: the song arrives as an external voice, granting the moment a scale the scene alone lacks',
      'Where it is a crutch covering for a scene that has not earned its climax, and how to tell the difference',
    ],
  },
  {
    topic:
      'The Lip Flap: post-scored voice, the three-mouth-shape convention, and a constraint that quietly shaped the acting',
    anchors: [
      'How Japanese anime typically records voice against finished or near-finished animation, and how that differs from the Western pre-scored tradition',
      'The limited mouth-shape convention and why anime acting therefore lives in the eyes and the body',
      'What this means for dubbing: a foreign language forced into a mouth shaped for another one',
    ],
  },
  {
    topic:
      'Editing and the Cut: anime’s pacing problem, and the difference between a scene that breathes and a scene that stalls',
    anchors: [
      'Cutting rhythm and the anime convention of holding a shot longer than a live-action editor would',
      'The pillow shot — the empty cutaway to a sky, a corridor, a cicada — and what it does to the pace',
      'Padding: the same held shot deployed because the episode is short, and how a viewer can feel the difference',
    ],
  },
  {
    topic:
      'The Mecha Specialists: mechanical animation as a separate craft, and why a robot is harder than a body',
    anchors: [
      'Why rigid mechanical forms are unforgiving — no squash and stretch to hide an error in volume or perspective',
      'The specialists who built their careers on machinery, and the conventions of mecha action they established',
      'What CG solved here and what it flattened',
    ],
  },
  {
    topic:
      'The Opening Sequence: ninety seconds that are frequently the best-animated thing in the show, and why',
    anchors: [
      'The OP as a short film with its own budget, director, and freedom from the plot',
      'The conventions — the cast pan, the fist, the falling protagonist — and the sequences that refuse them',
      'The uncomfortable fact that the OP is often better directed than any episode it introduces',
    ],
  },
  {
    topic:
      'Cel and Digital: what was actually lost when the paint dried up, and the nostalgia that overstates it',
    anchors: [
      'The material properties of cel and paint — the slight imperfection, the physical layering, the film grain',
      'What digital genuinely gained: colour range, compositing freedom, and the end of a brutal physical process',
      'The honest verdict on the nostalgia: what is really being mourned, and how much of it is the film stock rather than the artistry',
    ],
  },
  {
    topic:
      'Integrating CG: the seam between a drawn character and a rendered one, and the long battle to hide it',
    anchors: [
      'The specific tells that break the illusion — frame rate mismatch, over-smooth motion, lighting that does not sit',
      'The techniques used to close the gap: stepped frame rates, hand-corrected outlines, deliberate imperfection',
      'The works where CG is not hidden but embraced as its own texture, and whether that is the more honest path',
    ],
  },
  {
    topic:
      'The Directors Who Have a Signature: Kon’s match cuts, Ikuhara’s theatre, Yuasa’s elasticity',
    anchors: [
      'Satoshi Kon’s editing — the graphic match that stitches two realities together on a single cut',
      'Kunihiko Ikuhara’s repeated stylised sequences and stage-like abstraction as a structural device',
      'Masaaki Yuasa’s deliberate abandonment of consistent volume and perspective, and what that liberates',
    ],
  },
  {
    topic:
      'Restaging the Panel: how a great adaptation rebuilds a manga page instead of copying it',
    anchors: [
      'The impossibility of a literal translation: a panel has no duration, and a shot must have one',
      'What must be invented — the approach to the panel, the exit from it, the timing the page left to the reader',
      'Adaptations that reproduced the composition faithfully and killed it anyway, versus those that changed everything and kept it',
    ],
  },
  {
    topic:
      'What Moves: a closing essay. The page gives the reader control of time; the screen takes it away — and everything anime is good at follows from that single theft',
    anchors: [
      'The core trade: the reader sets the pace of a page, while a shot has a fixed duration the viewer cannot alter',
      'What the screen gains in return — sound, exact timing, performance, the cut — and why these are not lesser tools',
      'Why the two grammars are genuinely different arts rather than one being an adaptation of the other, and what that means for the endless argument about which is better',
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
  let slug = base || 'screen-essay';
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

  const { generateScreenEssay } = await import('../lib/essay');

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

    let essay: Awaited<ReturnType<typeof generateScreenEssay>> | null = null;
    for (let attempt = 1; attempt <= 3 && !essay; attempt++) {
      try {
        essay = await generateScreenEssay(
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
