import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getCategoryLabel } from '@/lib/types';
import { titleValue, getGroup } from '@/lib/number-groups';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Catzye';
  const category = searchParams.get('category') ?? '';
  const imageUrl = searchParams.get('img');
  const categoryLabel = category ? getCategoryLabel(category) : '';

  // The share card carries the same two labels the page does: what the text is
  // about, and the number its title reduces to.
  const shelfNumber = titleValue(title);
  const shelf = getGroup(shelfNumber);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#0d0c14',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image with overlay */}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.3,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(13,12,20,0.98) 0%, rgba(13,12,20,0.62) 50%, rgba(13,12,20,0.25) 100%)',
          }}
        />

        {/* Gold rule, as on the page */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: '#c9a227' }} />

        {/* The numeral, set in the margin the way the plate sets it */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            right: '48px',
            width: '128px',
            height: '128px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '999px',
            border: '2px solid rgba(201,162,39,0.55)',
            color: '#c9a227',
          }}
        >
          <div style={{ display: 'flex', fontSize: '58px', lineHeight: 1 }}>{String(shelfNumber)}</div>
          <div
            style={{
              display: 'flex',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginTop: '8px',
              opacity: 0.8,
            }}
          >
            {shelf.shelf}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {categoryLabel && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  background: '#c9a227',
                  color: '#0d0c14',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                }}
              >
                {categoryLabel}
              </div>
            </div>
          )}

          <div
            style={{
              color: '#ece5d4',
              fontSize: title.length > 80 ? '36px' : title.length > 50 ? '44px' : '52px',
              fontWeight: 900,
              lineHeight: 1.15,
              maxWidth: '860px',
            }}
          >
            {title}
          </div>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
            <div style={{ color: '#e6d492', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Catzye
            </div>
            <div style={{ color: '#9a927f', fontSize: '14px', marginLeft: '8px' }}>
              {shelf.tagline}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        // OG URLs are derived from title/category/img, so a given URL is
        // immutable — cache aggressively at the edge and in social scrapers.
        'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
      },
    },
  );
}
