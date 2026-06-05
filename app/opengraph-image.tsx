import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Recursive R&D Atlas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          justifyContent: 'space-between',
          borderTop: '4px solid #C2411C',
        }}
      >
        {/* Top: Byline + Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C2411C',
            }}
          >
            Latent Space Lab &middot; Jacob Ortiz
          </div>

          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '68px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#1A1915',
              lineHeight: 1.05,
              maxWidth: '820px',
            }}
          >
            Recursive R&D Atlas
          </div>

          <div
            style={{
              fontFamily: 'serif',
              fontSize: '22px',
              color: '#5C5A54',
              lineHeight: 1.5,
              maxWidth: '580px',
            }}
          >
            Mapping the path from AI-assisted coding to AI-driven research.
          </div>
        </div>

        {/* Bottom: Three key metrics */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-end' }}>
          {[
            { value: '80%+', label: 'AI Code Authorship', color: '#4E8098' },
            { value: '12 hrs', label: 'Task Horizon', color: '#9B7EBD' },
            { value: '64%', label: 'Research Step Selection', color: '#D4A853' },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                borderTop: `2px solid ${m.color}`,
                paddingTop: '14px',
                minWidth: '160px',
              }}
            >
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '40px',
                  fontWeight: 700,
                  color: '#1A1915',
                  lineHeight: 1.1,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '12px',
                  color: '#8A8880',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}

          <div
            style={{
              marginLeft: 'auto',
              fontFamily: 'sans-serif',
              fontSize: '12px',
              color: '#AEABA4',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Educational tool &middot; Not a forecast
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
