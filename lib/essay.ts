import { GoogleGenerativeAI } from '@google/generative-ai';
import { stripMarkdownInline } from './translator';
import { readTitle } from './numerology';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export interface GeneratedEssay {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  entities: string[];
  pullQuote: string;
}

function parseJson(raw: string): Record<string, unknown> {
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try { return JSON.parse(text); } catch { /* fall through */ }
  const block = text.match(/\{[\s\S]*\}/);
  if (block) {
    try { return JSON.parse(block[0]); } catch { /* fall through */ }
    try {
      const fixed = block[0].replace(
        /("(?:[^"\\]|\\.)*")/g,
        (m) => m.replace(/\n/g, '\\n').replace(/\r/g, '\\r'),
      );
      return JSON.parse(fixed);
    } catch { /* fall through */ }
  }
  throw new Error('Could not parse Gemini JSON response');
}

export async function generateEssay(
  seriesTitle: string,
  seriesDescription: string,
  topic: string,
  partNumber: number,
  totalParts: number,
): Promise<GeneratedEssay> {
  const prompt = `You are a senior manga and anime culture writer for Catzye.com, a professional magazine for manga and anime enthusiasts.

You are writing Part ${partNumber} of ${totalParts} in the essay series: "${seriesTitle}"
Series overview: ${seriesDescription || seriesTitle}

Topic for this part: "${topic}"

Requirements:
- 1800–2400 words of rich, original prose
- Name specific manga titles (with Japanese titles in parentheses where helpful), authors, publishers, historical dates, and cultural context
- Academic depth with engaging, readable style — not a Wikipedia summary
- Where relevant, trace how the topic evolved across different manga eras (pre-war, postwar, bubble era, digital era)
- Connect to broader Japanese cultural, social, or historical forces
- Structure: engaging 2-paragraph introduction, 4–5 H2 sections with descriptive headers, strong conclusion that ties back to the series theme
- DO NOT use markdown — only HTML tags: <h2>, <h3>, <p>, <strong>, <em>

Return ONLY this JSON object (no markdown fences, no extra text):
{
  "title": "Part ${partNumber}: [an engaging, specific title for this essay]",
  "excerpt": "1–2 sentence description optimised for search, under 155 chars",
  "content": "<h2>First Section</h2><p>...</p><h2>Second Section</h2><p>...</p>",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "entities": ["Manga Title", "Author Name", "Publisher Name"],
  "pullQuote": "one memorable sentence from the essay, 15–35 words"
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const parsed = parseJson(raw);

  const tags = Array.isArray(parsed.tags) ? (parsed.tags as string[]).slice(0, 8) : [];
  const entities = Array.isArray(parsed.entities) ? (parsed.entities as string[]).slice(0, 12) : [];

  return {
    title: stripMarkdownInline(String(parsed.title ?? topic)),
    excerpt: stripMarkdownInline(String(parsed.excerpt ?? '').slice(0, 160)),
    content: String(parsed.content ?? ''),
    tags,
    entities,
    pullQuote: stripMarkdownInline(String(parsed.pullQuote ?? '')),
  };
}

// ── Numerology-aware essay generator ──────────────────────────────────────────
// A variant of generateEssay for "The Numbers Behind the Manga" series. It reads
// the numerology of each named subject IN CODE and injects the real numbers into
// the prompt, so the model writes accurate readings instead of inventing them.
function numerologyDataBlock(subjects: string[]): string {
  const rows = subjects
    .map((s) => (s || '').trim())
    .filter(Boolean)
    .map((s) => {
      const r = readTitle(s);
      return `• "${s}" → Destiny ${r.destiny} (${r.profile.title}); Heart's Desire ${r.heartDesire}; Personality ${r.dream}. Vibration: ${r.profile.vibration}.`;
    });
  return rows.join('\n') || '(no specific subjects — write about the numbers themselves)';
}

export async function generateNumerologyEssay(
  seriesTitle: string,
  seriesDescription: string,
  topic: string,
  partNumber: number,
  totalParts: number,
  subjects: string[],
): Promise<GeneratedEssay> {
  const dataBlock = numerologyDataBlock(subjects);

  const prompt = `You are a senior manga and anime culture writer for Catzye.com. You are writing an essay that reads the medium through the lens of numerology — literate, grown-up cultural criticism, NOT horoscope copy or pseudoscience.

You are writing Part ${partNumber} of ${totalParts} in the essay series: "${seriesTitle}"
Series overview: ${seriesDescription || seriesTitle}

Topic for this part: "${topic}"

NUMEROLOGY DATA (authoritative — these numbers were computed with standard Pythagorean numerology; use ONLY these, never compute or invent your own numbers, and do not contradict them):
${dataBlock}

Numerology key you may reference: 1 Leader/Pioneer, 2 Diplomat, 3 Creative Communicator, 4 Builder, 5 Freedom Seeker, 6 Nurturer, 7 Analyst/Seeker, 8 Visionary/Achiever, 9 Humanitarian/Sage; master numbers 11 (Visionary), 22 (Master Builder), 33 (Master Teacher). Destiny = whole name; Heart's Desire = vowels; Personality = consonants.

Requirements:
- 1600–2200 words of rich, original prose.
- Roughly 60% genuine manga/anime culture writing (accurate specifics: real titles with Japanese where helpful, authors, studios, publishers, dates, cultural context) and 40% the numerological reading, used as an organizing frame.
- Weave the computed numbers above into the argument — quote the exact Destiny numbers given and connect each number's archetype to what the work/creator/studio actually is and does.
- Be honest about the game: numerology is a lens for paying attention, a source of coincidences worth a second look, NOT a claim that the universe assigns fate. Keep an intelligent, slightly playful, never breathless tone. Do not invent facts, quotes, or figures.
- Structure: a 2-paragraph introduction, 4–5 H2 sections with descriptive headers, and a conclusion that ties back to the series theme.
- DO NOT use markdown — only HTML tags: <h2>, <h3>, <p>, <strong>, <em>.

Return ONLY this JSON object (no markdown fences, no extra text):
{
  "title": "Part ${partNumber}: [an engaging, specific title for this essay]",
  "excerpt": "1–2 sentence description optimised for search, under 155 chars",
  "content": "<h2>First Section</h2><p>...</p><h2>Second Section</h2><p>...</p>",
  "tags": ["numerology", "tag2", "tag3", "tag4", "tag5"],
  "entities": ["Manga/Anime/Studio/Creator names referenced"],
  "pullQuote": "one memorable sentence from the essay, 15–35 words"
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const parsed = parseJson(raw);

  const rawTags = Array.isArray(parsed.tags) ? (parsed.tags as string[]) : [];
  const tags = Array.from(new Set(['numerology', ...rawTags])).slice(0, 8);
  const entities = Array.isArray(parsed.entities) ? (parsed.entities as string[]).slice(0, 12) : [];

  return {
    title: stripMarkdownInline(String(parsed.title ?? topic)),
    excerpt: stripMarkdownInline(String(parsed.excerpt ?? '').slice(0, 160)),
    content: String(parsed.content ?? ''),
    tags,
    entities,
    pullQuote: stripMarkdownInline(String(parsed.pullQuote ?? '')),
  };
}
