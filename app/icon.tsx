import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A1915',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Accent corner */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#C2411C',
          }}
        />
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: '17px',
            fontWeight: 700,
            color: '#FAFAF8',
            letterSpacing: '-0.04em',
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size }
  )
}
