import { NextResponse } from 'next/server';

// The newsletter is retired and its subscriber list went with the database, so
// there is nothing left to remove anyone from. The route stays because links in
// emails that were already sent still point here, and they should land on a
// confirmation rather than a 404.
export function GET() {
  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:60px;">
      <h2>You've been unsubscribed.</h2>
      <p>The Catzye newsletter has ended, and no further emails will be sent.</p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://catzye.com'}">← Back to Catzye</a></p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } },
  );
}
