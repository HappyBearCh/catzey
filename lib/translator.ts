import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export function markdownToHtml(text: string): string {
  if (!text) return text;
  if (text.trimStart().startsWith('<')) return text;
  return text
    .split(/\n{2,}/)
    .map((paragraph) => {
      let p = paragraph.trim();
      if (!p) return '';
      p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      p = p.replace(/\*([^*\n]+?)\*/g, '<strong>$1</strong>');
      p = p.replace(/_([^_\n]+?)_/g, '<em>$1</em>');
      return `<p>${p}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}

export function stripMarkdownInline(text: string): string {
  if (!text) return text;
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*([^*\n]+?)\*/g, '$1')
    .replace(/_([^_\n]+?)_/g, '$1');
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractFieldRegex(text: string, field: string): string {
  // Match "field": "value" handling escaped quotes and newlines inside the value
  const re = new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"`, 's');
  const m = text.match(re);
  return m ? m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : '';
}

function parseGeminiJson(rawText: string): Record<string, string> {
  // Strip markdown fences and surrounding whitespace
  const text = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

  // Attempt 1: direct JSON.parse
  try { return JSON.parse(text); } catch { /* fall through */ }

  // Attempt 2: find the outermost {...} block and parse it
  const blockMatch = text.match(/\{[\s\S]*\}/);
  if (blockMatch) {
    try { return JSON.parse(blockMatch[0]); } catch { /* fall through */ }

    // Attempt 3: escape literal newlines/carriage-returns inside quoted strings
    try {
      const fixed = blockMatch[0].replace(
        /("(?:[^"\\]|\\.)*")/g,
        (m) => m.replace(/\n/g, '\\n').replace(/\r/g, '\\r'),
      );
      return JSON.parse(fixed);
    } catch { /* fall through */ }
  }

  // Attempt 4: field-by-field regex extraction
  const title = extractFieldRegex(rawText, 'title');
  const content = extractFieldRegex(rawText, 'content');
  const summary = extractFieldRegex(rawText, 'summary');
  if (title && content && summary) return { title, content, summary };

  // Log raw response before giving up so we can diagnose future issues
  console.error('[translator] Failed to parse Gemini response:\n', rawText.slice(0, 1000));
  throw new Error(`Cannot parse Gemini JSON. Raw (first 300 chars): ${rawText.slice(0, 300)}`);
}

// Extract the retry-after delay from a 429 error message, default to fallback ms.
function retryDelayMs(err: unknown, fallbackMs: number): number {
  const msg = String(err);
  const match = msg.match(/retryDelay['":\s]+["']?(\d+(?:\.\d+)?)s/);
  if (match) return Math.ceil(parseFloat(match[1])) * 1000 + 2000;
  return fallbackMs;
}

async function callWithRetry(fn: () => Promise<string>, label: string): Promise<string> {
  // Never retry 429 — the wait can be 60s+ and will blow the function timeout.
  // On 429 we throw immediately; the article will be retried on the next cron run.
  // For other transient errors (5xx, network blips) we do one quick retry.
  const MAX_RETRIES = 2;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = String(err);
      if (msg.includes('429')) throw err;
      const isTransient =
        msg.includes('503') ||
        msg.includes('502') ||
        msg.includes('500') ||
        msg.includes('JSON.parse') ||
        msg.includes('unexpected token') ||
        msg.includes('network');
      if (!isTransient || attempt === MAX_RETRIES) throw err;
      console.warn(`[translator] Transient error on ${label} (attempt ${attempt}), retrying in 3s: ${msg.slice(0, 120)}`);
      await sleep(3000);
    }
  }
  throw lastErr;
}

export async function summarizeAndTranslate(fields: {
  title: string;
  content: string;
  sourceUrl: string;
  source: string;
}): Promise<{
  title: string;
  summary: string;
  content: string;
  keywords: string[];
  entities: string[];
  pullQuote: string;
  editorNote: string;
}> {
  console.log(`[translator] Gemini EN rewrite: "${fields.title.substring(0, 60)}" (${fields.content.length} chars)`);

  const prompt = `You are a senior editor at Catzye, a manga and anime news site with a knowledgeable, opinionated voice. Rewrite the article below to about 50% of its original length.

Writing style:
- Write like a manga/anime journalist who genuinely cares about the medium — not a press release rephraser
- Lead with the most interesting or surprising fact, not a dry summary of what happened
- Add brief context where useful (e.g. why a studio matters, what a series is known for, how this fits a trend)
- Use short, punchy sentences. Vary rhythm. Avoid corporate language and passive voice.
- A light editorial opinion is welcome ("this is a significant shift", "fans have been waiting years for this") but keep it grounded in fact
- Do NOT include any hyperlinks, URLs, or markdown links. Do not mention the source URL anywhere.
- Do NOT use any markdown formatting. No asterisks, no underscores, no pound signs. Plain text only.

Return ONLY valid JSON with exactly these seven fields and no markdown code fences:
{"title": "...", "content": "...", "summary": "...", "keywords": "...", "entities": "...", "pullQuote": "...", "editorNote": "..."}

Field definitions:
- "title": a punchy, specific headline that captures the most newsworthy angle — do not copy the original
- "content": the full rewritten article in clean paragraphs, with editorial voice as described above. No links, no markdown, no asterisks.
- "summary": a 2–3 sentence excerpt for article preview cards — lead with the hook, not the backstory
- "keywords": 3–5 comma-separated English search terms (people, places, events) suitable for image search — e.g. "One Piece, manga release, Eiichiro Oda"
- "entities": up to 5 comma-separated named people, places, and organizations explicitly mentioned — e.g. "Eiichiro Oda, Shueisha, Weekly Shonen Jump"
- "pullQuote": the single most interesting or surprising sentence from the article (under 140 characters), suitable for a pull quote
- "editorNote": 2–3 sentences of editorial commentary from the Catzye team — what this means for fans, why it matters, or what to watch next. Conversational tone ("This could be...", "Fans will want to watch...", "What's interesting here is...").

Source name: ${fields.source}
Source URL: ${fields.sourceUrl}
Original title: ${fields.title}

Article:
${fields.content}`;

  const text = await callWithRetry(
    () => model.generateContent(prompt).then((r) => r.response.text()),
    'EN rewrite',
  );

  const parsed = parseGeminiJson(text);
  if (!parsed.title || !parsed.content || !parsed.summary) {
    throw new Error(`Gemini EN rewrite missing fields: ${text.slice(0, 200)}`);
  }
  const keywords = (parsed.keywords ?? '')
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
  const entities = (parsed.entities ?? '')
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
  console.log(`[translator] EN rewrite done: "${parsed.title.substring(0, 60)}" keywords: ${keywords.join(', ')}`);
  return {
    title: parsed.title,
    content: markdownToHtml(parsed.content),
    summary: stripMarkdownInline(parsed.summary),
    keywords,
    entities,
    pullQuote: stripMarkdownInline((parsed.pullQuote ?? '').slice(0, 200)),
    editorNote: stripMarkdownInline((parsed.editorNote ?? '').slice(0, 600)),
  };
}
