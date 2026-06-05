'use client'

import { motion } from 'framer-motion'
import { MetricCard } from '@/components/ui/MetricCard'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function Hero() {
  return (
    <section id="hero" className="border-b border-border">
      <motion.div
        className="mx-auto px-8"
        style={{ maxWidth: '680px', paddingTop: '120px', paddingBottom: '80px' }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="font-mono text-accent"
          style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '32px' }}
        >
          <a href="https://agentjakey.substack.com/" target="_blank" rel="noopener noreferrer">
            Latent Space Lab
          </a>
          {' '}&middot; Jacob Ortiz
        </motion.p>

        <motion.div variants={item}>
          <h1
            className="font-sans font-bold text-primary"
            style={{
              fontSize: '64px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Recursive R&D Atlas
          </h1>
          <p
            className="font-sans font-normal text-secondary"
            style={{ fontSize: '22px', marginTop: '12px', lineHeight: 1.4 }}
          >
            Mapping the path from AI-assisted coding to AI-driven research.
          </p>
        </motion.div>

        <motion.p
          variants={item}
          className="font-serif italic text-secondary"
          style={{ fontSize: '17px', lineHeight: 1.7, marginTop: '40px', marginBottom: '24px' }}
        >
          &ldquo;We are not there yet, and recursive self-improvement is not inevitable.&rdquo;
          <span className="not-italic font-sans text-[13px] text-[#8A8880] block mt-1">
            Anthropic Institute, May 2026
          </span>
        </motion.p>

        <motion.p
          variants={item}
          className="font-serif text-primary"
          style={{ fontSize: '19px', lineHeight: 1.85 }}
        >
          Something is happening. Over 80% of Anthropic's merged production code is now
          authored by Claude. The time horizon for autonomous task completion grew from
          4 minutes to 12 hours in two years. AI systems are beginning to participate
          in research decisions. None of this is recursive self-improvement. But the
          path is visible, and the gaps are measurable. This project maps what the
          evidence actually says.
        </motion.p>

        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 border-t border-border"
          style={{ marginTop: '40px', paddingTop: '32px' }}
        >
          <MetricCard label="AI Code Authorship" value="80%+" subLabel="Anthropic, May 2026" />
          <MetricCard label="Task Horizon" value="12 hrs" subLabel="from 4 min, Mar 2024" />
          <MetricCard label="Research Step Selection" value="64%" subLabel="beats humans, Apr 2026" />
        </motion.div>

        <motion.p
          variants={item}
          className="font-sans text-[13px] text-[#8A8880]"
          style={{ marginTop: '16px' }}
        >
          ~12 min read &middot; Sources: Anthropic Institute, METR
        </motion.p>
      </motion.div>
    </section>
  )
}
