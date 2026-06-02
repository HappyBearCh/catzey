import { put } from '@vercel/blob';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI, PersonGeneration } from '@google/genai';
import type { ImageCandidate } from './imageSearch';

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function buildImagenPrompt(title: string, excerpt: string, category: string): Promise<string> {
  const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(
    `Write a concise image generation prompt (1-2 sentences, max 150 characters) for a photorealistic news photograph that represents this article. Avoid text, logos, faces of real people, and fictional characters. Use journalistic, documentary style — objective and scene-setting.

Title: ${title}
Category: ${category}
Summary: ${excerpt}

Reply with only the prompt text, no explanation.`
  );
  return result.response.text().trim();
}

export async function generateArticleImage(
  title: string,
  excerpt: string,
  category: string,
): Promise<ImageCandidate> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const prompt = await buildImagenPrompt(title, excerpt, category);
  console.log('[imageGenerate] Imagen prompt:', prompt);

  const genai = new GoogleGenAI({ apiKey });

  // Try Imagen 3 first; fall back to Gemini 2.0 Flash image generation
  // (Imagen 3 requires explicit API access in Google AI Studio)
  let imageBuffer: Buffer;
  let credit: string;

  try {
    console.log('[imageGenerate] Trying Imagen 4 Fast...');
    const response = await genai.models.generateImages({
      model: 'imagen-4.0-fast-generate-001',
      prompt,
      config: { numberOfImages: 1, aspectRatio: '16:9', personGeneration: PersonGeneration.DONT_ALLOW },
    });
    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (!imageBytes) throw new Error('Imagen returned no image data');
    imageBuffer = typeof imageBytes === 'string'
      ? Buffer.from(imageBytes, 'base64')
      : Buffer.from(imageBytes);
    credit = 'AI Generated — Imagen 4 Fast';
  } catch (imagenErr: unknown) {
    const imagenMsg = imagenErr instanceof Error ? imagenErr.message : String(imagenErr);
    console.warn('[imageGenerate] Imagen 3 failed, trying Gemini Flash:', imagenMsg);

    try {
      const response = await genai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: { responseModalities: ['IMAGE'] },
      });
      const imagePart = response.candidates?.[0]?.content?.parts?.find(
        (p: { inlineData?: { data?: string } }) => p.inlineData?.data,
      );
      if (!imagePart?.inlineData?.data) {
        throw new Error(`Gemini Flash returned no image. Imagen 3 error was: ${imagenMsg}`);
      }
      imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
      credit = 'AI Generated — Gemini 2.5 Flash Image';
    } catch (flashErr: unknown) {
      const flashMsg = flashErr instanceof Error ? flashErr.message : String(flashErr);
      console.error('[imageGenerate] Both models failed:', { imagenMsg, flashMsg });
      throw new Error(flashMsg);
    }
  }

  const filename = `articles/ai-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.png`;
  const blob = await put(filename, imageBuffer, { access: 'public', contentType: 'image/png' });

  console.log('[imageGenerate] Stored at:', blob.url);
  return {
    url: blob.url,
    thumbUrl: blob.url,
    credit,
    description: prompt.slice(0, 100),
  };
}
