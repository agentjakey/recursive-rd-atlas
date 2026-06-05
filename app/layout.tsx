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

export const metadata: Metadata = {
  title: 'Recursive R&D Atlas',
  description:
    'Mapping the path from AI-assisted coding to AI-driven research. A careful look at where the loop closes, where it breaks, and what the evidence actually says.',
  authors: [{ name: 'Jacob Ortiz' }],
  openGraph: {
    title: 'Recursive R&D Atlas',
    description: 'Mapping the path from AI-assisted coding to AI-driven research.',
    type: 'website',
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
