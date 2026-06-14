import { GoogleGenerativeAI } from '@google/generative-ai';
import { stripMarkdownInline } from './translator';

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
