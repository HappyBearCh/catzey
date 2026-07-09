// Daily numerology news-analysis column for Catzye.
//
// Ported from the numerolo project (src/news-analysis.js) and adapted to
// Catzye's stack: it reads the day's manga/anime headlines through the day's
// Universal Day number and produces a ~1200-word column, then stores it as a
// normal Article so it flows through the full article template (including its
// own numerology panel), RSS, and the sitemap.
//
// Writing engine:
//   • If GEMINI_API_KEY is set → Gemini writes the piece (structured JSON).
//   • Otherwise → a deterministic templated column, so the feature degrades
//     gracefully with no external dependency.

import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/db';
import {
  getTodaysNumber,
  getProfile,
  destinyNumber,
  type NumberProfile,
} from '@/lib/numerology';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export interface Headline {
  title: string;
  slug?: string;
  source?: string;
  description?: string;
}

interface DraftColumn {
  headline: string;
  dek: string;
  bodyHtml: string;
  generatedBy: 'gemini' | 'template';
}

export interface DailyColumn extends DraftColumn {
  dateKey: string;
  dateLabel: string;
  number: number;
  profile: NumberProfile;
  wordCount: number;
  matchedCount: number;
  scannedCount: number;
}

function escapeHtml(s: unknown): string {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

// Turn paragraph strings into safe HTML. A short line without sentence
// punctuation becomes a subheading.
function paragraphsToHtml(paras: string[]): string {
  return paras
    .map((p) => String(p || '').trim())
    .filter(Boolean)
    .map((p) => {
      const isHeading = p.length < 70 && !/[.!?:"]$/.test(p) && p.split(' ').length <= 9;
      return isHeading ? `<h2>${escapeHtml(p)}</h2>` : `<p>${escapeHtml(p)}</p>`;
    })
    .join('\n');
}

// ── Gemini path ───────────────────────────────────────────────────────────────
async function writeWithGemini(
  headlines: Headline[],
  matched: Headline[],
  number: number,
  profile: NumberProfile,
  dateLabel: string,
): Promise<DraftColumn | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const headlineList = headlines
    .slice(0, 24)
    .map(
      (h, i) =>
        `${i + 1}. "${h.title}"${h.source ? ` (${h.source})` : ''}${h.description ? ` — ${h.description}` : ''}`,
    )
    .join('\n');
  const matchedList = matched.slice(0, 10).map((h) => `• "${h.title}"`).join('\n') || '(none today)';

  const prompt = `You are a senior manga & anime culture columnist writing the daily news-analysis column for Catzye, a manga/anime news site with a literate, journalistic voice and a numerological lens. Today is ${dateLabel}.

Write a single cohesive news-analysis essay of about 1200 words (1100–1300) that surveys today's most important manga, anime, manhwa, and industry stories, FINDS THE CONNECTIONS between them, and weaves them into one argument about where the day's events are pointing. Real culture journalism first: be accurate to the headlines, substantive, and specific about titles, studios, publishers, and creators. Do not invent facts, quotes, or figures beyond what the headlines support — speak in terms of what the stories collectively suggest.

The editorial lens: in numerology today reduces to the number ${number} (${profile.title}) — a day of ${profile.vibration}. Use this number as a light, recurring thematic frame (an organizing metaphor for the day's mood), not as prediction or pseudoscience. Roughly 70% real analysis, 30% the numerological frame. Keep a thoughtful, grown-up tone — never breathless or superstitious.

TODAY'S HEADLINES (the raw material — draw from these):
${headlineList}

HEADLINES THAT NUMEROLOGICALLY "VIBRATE" TO TODAY'S NUMBER ${number}:
${matchedList}

Return ONLY JSON matching the schema: a punchy headline (max ~12 words), a one-sentence standfirst/dek, and "body" as an array of ~9-14 paragraph strings (a few may be 2-6 word section subheadings). Do not include the headline or dek inside body. No markdown, no links.`;

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty content');
  const parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim());
  if (!parsed.headline || !Array.isArray(parsed.body) || parsed.body.length < 4) {
    throw new Error('Gemini returned malformed column');
  }
  return {
    headline: String(parsed.headline).trim(),
    dek: String(parsed.dek || '').trim(),
    bodyHtml: paragraphsToHtml(parsed.body as string[]),
    generatedBy: 'gemini',
  };
}

// ── Templated fallback ─────────────────────────────────────────────────────────
function writeTemplated(
  headlines: Headline[],
  matched: Headline[],
  number: number,
  profile: NumberProfile,
  dateLabel: string,
): DraftColumn {
  const top = headlines.slice(0, 6);
  const lead = top[0];
  const second = top[1];
  const others = top.slice(2);
  const matchCount = matched.length;
  const scanCount = headlines.length;
  const word = profile.keyword;
  const line = profile.vibration;

  const sourceNames = [...new Set(top.map((h) => h.source).filter(Boolean))].slice(0, 4) as string[];
  const sourcePhrase = sourceNames.length
    ? sourceNames.slice(0, -1).join(', ') +
      (sourceNames.length > 1 ? ' and ' + sourceNames[sourceNames.length - 1] : sourceNames[0])
    : 'the manga and anime press';

  const paras: string[] = [];

  paras.push(`Today's Number: ${number}`);

  if (lead) {
    paras.push(
      `On ${dateLabel}, the day's headlines arrive under the sign of the ${number} — the numerologist's number of ${word}, a vibration of ${line}. It is a useful lens, if only a literary one, for reading a news cycle led this morning by "${lead.title}." Strip away the mysticism and the number still works as a mood: the stories crossing the wire share a common temperature, and today that temperature reads as ${word}.`,
    );
  } else {
    paras.push(
      `On ${dateLabel}, the day reduces numerologically to the ${number} — the number of ${word}, a vibration of ${line}. Even on a quiet news morning, that frame is a useful way to read the mood of the manga and anime wire.`,
    );
  }

  if (second) {
    paras.push(
      `Set "${lead ? lead.title : ''}" beside "${second.title}" and a thread begins to show. The two stories come from different desks — perhaps different corners of the industry — yet both turn on the same underlying tension that the ${number} tends to surface: the pull between what is being started and what is being held together. Read together rather than apart, the day's lead items stop looking like isolated announcements and start looking like a single weather system.`,
    );
  }

  paras.push(`The Connective Thread`);

  if (others.length) {
    const list = others.map((h) => `"${h.title}"`).join(', ');
    paras.push(
      `Beneath the lead, the supporting stories — ${list} — fill in the pattern. Coverage from ${sourcePhrase} keeps circling the same themes: franchises under strain, decisions deferred, and the quiet recalculation of who holds the initiative. None of these stories was written with the others in mind, which is precisely why their convergence is worth noting. The job of analysis is to read the cycle as a whole, and the whole, today, leans hard into ${word}.`,
    );
  } else {
    paras.push(
      `Coverage from ${sourcePhrase} keeps circling a small set of themes today: franchises under strain, decisions deferred, and the quiet recalculation of who holds the initiative. The job of analysis is to read the cycle as a whole — and the whole, today, leans into ${word}.`,
    );
  }

  paras.push(
    `Catzye scanned ${scanCount} headlines across the major manga and anime feeds today. Of those, ${matchCount} carry titles that reduce, letter by letter, to today's number ${number}. That is a coincidence of language rather than fate — but it is the kind of coincidence that makes you look twice, and looking twice is the whole point of reading the news slowly.`,
  );

  if (matched.length) {
    const mlist = matched.slice(0, 4).map((h) => `"${h.title}"`).join('; ');
    paras.push(
      `Among those number-${number} headlines: ${mlist}. Whatever you make of the arithmetic, the stories themselves reward attention. Each one, in its way, is a story about ${line} — which is to say, a story about the choices facing the people in it.`,
    );
  }

  paras.push(`What To Watch`);
  paras.push(
    `If the ${number} is the number of ${word}, then the test of the next few days is whether today's openings are followed through or quietly abandoned. Numerology would call that the difference between the number's higher and lower expression. A journalist would just call it the follow-up — the second-day story that tells you whether the first one mattered. Either way, the questions are the same: who acts, who waits, and who pays for the delay.`,
  );
  paras.push(
    `Catzye's daily analysis reads the news through the lens of the day's number. It is not a forecast. It is a way of paying attention — a reminder that the headlines, however scattered, tend to rhyme. Check back tomorrow, when the number turns over and the pattern shifts with it.`,
  );

  let bodyHtml = paragraphsToHtml(paras);

  if (countWords(bodyHtml) < 850) {
    paras.push(`A Note on Method`);
    paras.push(
      `Every headline on this page was pulled from our newsroom feeds and reduced using standard Pythagorean numerology — each letter mapped to a digit one through nine, summed by word, then reduced until a single digit or master number remains. The same arithmetic that gives a name its Destiny number gives a headline its vibration. We make no claim that the universe arranges the news to suit a number. We claim only that a constraint, even an arbitrary one, is a good way to force fresh attention onto stories you might otherwise scroll past — and that the day's events, read together, almost always tell a more coherent story than any one of them does alone.`,
    );
    bodyHtml = paragraphsToHtml(paras);
  }

  const cap = (s: string) => s.replace(/^\w/, (c) => c.toUpperCase());
  return {
    headline: lead
      ? `The ${number} Day: Reading ${dateLabel.split(',')[0]}'s Manga & Anime News Through the Number of ${cap(word)}`
      : `The Number ${number}: A Quiet Day Under the Sign of ${cap(word)}`,
    dek: `Catzye's daily news analysis: ${scanCount} headlines, ${matchCount} vibrating to today's number ${number} — and the thread that connects them.`,
    bodyHtml,
    generatedBy: 'template',
  };
}

// ── Compose the column (no persistence) ────────────────────────────────────────
export async function generateDailyColumn(
  headlines: Headline[],
  date: Date = new Date(),
): Promise<DailyColumn> {
  const today = getTodaysNumber(date);
  const number = today.number;
  const profile = getProfile(number);
  const matched = (headlines || []).filter((h) => destinyNumber(h.title) === number);

  let draft: DraftColumn | null = null;
  try {
    draft = await writeWithGemini(headlines, matched, number, profile, today.dateLabel);
  } catch (err) {
    console.error('[daily-analysis] Gemini failed, using template:', (err as Error).message);
  }
  if (!draft) {
    draft = writeTemplated(headlines, matched, number, profile, today.dateLabel);
  }

  return {
    ...draft,
    dateKey: today.dateKey,
    dateLabel: today.dateLabel,
    number,
    profile,
    wordCount: countWords(draft.bodyHtml),
    matchedCount: matched.length,
    scannedCount: (headlines || []).length,
  };
}

export const DAILY_CATEGORY = 'numerology';

export function dailySlug(dateKey: string): string {
  return `daily-numerology-${dateKey}`;
}

// ── Generate + persist as an Article ───────────────────────────────────────────
// Pulls the day's headlines from recently published articles, writes the column,
// and upserts it as a published Article. Returns the stored slug.
export async function generateAndStoreDailyColumn(
  date: Date = new Date(),
): Promise<{ slug: string; created: boolean; column: DailyColumn }> {
  // The day's news pool: the most recent real articles (exclude prior columns).
  const recent = await prisma.article.findMany({
    where: { published: true, category: { not: DAILY_CATEGORY } },
    orderBy: { publishedAt: 'desc' },
    take: 40,
    select: { title: true, slug: true, source: true, excerpt: true },
  });
  const headlines: Headline[] = recent.map((a) => ({
    title: a.title,
    slug: a.slug,
    source: a.source,
    description: a.excerpt,
  }));

  const column = await generateDailyColumn(headlines, date);
  const slug = dailySlug(column.dateKey);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com';

  const data = {
    title: column.headline,
    content: column.bodyHtml,
    excerpt: column.dek.slice(0, 300),
    category: DAILY_CATEGORY,
    source: 'Catzye Numerology Desk',
    published: true,
    tags: ['numerology', 'daily analysis', `number ${column.number}`],
    entities: [] as string[],
    editorNote: `Generated ${column.generatedBy === 'gemini' ? 'with editorial AI' : 'from the daily template'} · ${column.scannedCount} headlines scanned, ${column.matchedCount} vibrating to ${column.number}.`,
  };

  const existing = await prisma.article.findUnique({ where: { slug }, select: { id: true } });
  if (existing) {
    await prisma.article.update({
      where: { slug },
      data: { ...data, updatedAt: new Date() },
    });
    return { slug, created: false, column };
  }

  await prisma.article.create({
    data: {
      ...data,
      slug,
      sourceUrl: `${base}/article/${slug}`,
      publishedAt: date,
    },
  });
  return { slug, created: true, column };
}
