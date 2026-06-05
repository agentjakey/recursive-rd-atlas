import type { Metadata } from 'next'
import { Sora, Lora, DM_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/ui/Nav'
import { ReadingProgress } from '@/components/ui/ReadingProgress'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const SITE_URL = 'https://recursive-rd-atlas.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Recursive R&D Atlas',
  description:
    'Interactive atlas of AI-driven AI R&D, recursive self-improvement warning signs, bottlenecks, and oversight failure modes. Educational tool. Not a forecast.',
  authors: [{ name: 'Jacob Ortiz', url: 'https://github.com/agentjakey' }],
  keywords: [
    'recursive self-improvement',
    'AI R&D',
    'AI safety',
    'mechanistic interpretability',
    'METR',
    'Anthropic',
    'bottleneck simulator',
    'oversight failure modes',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Recursive R&D Atlas',
    description:
      'Mapping the path from AI-assisted coding to AI-driven research. Educational tool based on Anthropic Institute and METR publications.',
    siteName: 'Recursive R&D Atlas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursive R&D Atlas',
    description:
      'Mapping the path from AI-assisted coding to AI-driven research. Educational tool based on Anthropic Institute and METR publications.',
    creator: '@agentjakey',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${lora.variable} ${dmMono.variable}`}>
        <ReadingProgress />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
