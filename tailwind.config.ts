import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        primary: '#1A1915',
        secondary: '#5C5A54',
        accent: '#C2411C',
        border: '#E4E2DB',
        surface: '#FFFFFF',
        muted: '#F2F0EB',
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      maxWidth: {
        prose: '720px',
        wide: '960px',
        full: '1100px',
      },
    },
  },
  plugins: [],
}

export default config
