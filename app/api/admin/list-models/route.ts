import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get('Catzye_admin')?.value;
  const expected = process.env.ADMIN_PASSWORD ?? process.env.CRON_SECRET ?? '';
  if (!expected) return true;
  return cookie === Buffer.from(expected).toString('base64');
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not set' }, { status: 500 });

  const genai = new GoogleGenAI({ apiKey });
  const pager = await genai.models.list();

  const models: { name: string; supportedMethods: string[] }[] = [];
  for await (const model of pager) {
    models.push({
      name: model.name ?? '',
      supportedMethods: (model.supportedActions ?? []) as string[],
    });
  }

  const imageModels = models.filter(
    (m) =>
      m.name.includes('imagen') ||
      m.name.includes('image') ||
      m.supportedMethods.some((s) => s.toLowerCase().includes('image')),
  );

  return NextResponse.json({ imageModels, allModels: models });
}
