import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getCategoryLabel } from '@/lib/types';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Catzye';
  const category = searchParams.get('category') ?? '';
  const imageUrl = searchParams.get('img');
  const categoryLabel = category ? getCategoryLabel(category) : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#0f0b1e',
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
            background: 'linear-gradient(to top, rgba(15,11,30,0.98) 0%, rgba(15,11,30,0.6) 50%, rgba(15,11,30,0.25) 100%)',
          }}
        />

        {/* Purple accent top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: '#7c3aed' }} />

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
                  background: '#7c3aed',
                  color: 'white',
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
              color: 'white',
              fontSize: title.length > 80 ? '36px' : title.length > 50 ? '44px' : '52px',
              fontWeight: 900,
              lineHeight: 1.15,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
            <div style={{ color: '#e879f9', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Catzye
            </div>
            <div style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>
              catzye.com
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
