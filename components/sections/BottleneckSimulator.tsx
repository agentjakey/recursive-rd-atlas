'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Caption } from '@/components/ui/Typography'
import { BOTTLENECKS, Bottleneck } from '@/lib/data'

const SEVERITY_LABELS = ['', 'Moderate', 'Significant', 'Critical']
const SEVERITY_COLORS = ['', '#6B8A6B', '#D4A853', '#C2411C']

export function BottleneckSimulator() {
  const [active, setActive] = useState<string | null>(null)
  const activeBottleneck = BOTTLENECKS.find((b) => b.id === active) ?? null

  return (
    <SectionWrapper id="bottlenecks" label="Bottlenecks">
      <SectionHeading n={4}>Where the Loop Breaks</SectionHeading>

      <Prose>
        <p>
          For the loop to close fully, AI systems must not just execute research tasks
          but own the full research cycle: choosing problems, running experiments,
          interpreting results, and updating their own development. Each of the
          following bottlenecks represents a place where that loop currently breaks.
          Select one to see the evidence.
        </p>
      </Prose>

      <div className="mt-10 flex flex-col gap-2">
        {BOTTLENECKS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setActive(b.id === active ? null : b.id)}
            className="text-left border border-border transition-all duration-150 group"
            style={{
              background: active === b.id ? '#FFFFFF' : 'transparent',
              borderColor: active === b.id ? SEVERITY_COLORS[b.severity] : '#E4E2DB',
              padding: '16px 20px',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className="inline-block w-2 h-2 rounded-full"
                      style={{
                        background: dot <= b.severity ? SEVERITY_COLORS[b.severity] : '#E4E2DB',
                      }}
                    />
                  ))}
                </div>
                <span className="font-sans text-[15px] font-semibold text-primary">
                  {b.title}
                </span>
              </div>
              <span
                className="font-mono text-[10px] tracking-widest uppercase hidden md:block"
                style={{ color: SEVERITY_COLORS[b.severity] }}
              >
                {SEVERITY_LABELS[b.severity]}
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeBottleneck && (
          <motion.div
            key={activeBottleneck.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 border border-border"
            style={{
              background: '#FFFFFF',
              borderColor: SEVERITY_COLORS[activeBottleneck.severity],
              padding: '24px',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="font-mono text-[11px] tracking-widest uppercase"
                style={{ color: SEVERITY_COLORS[activeBottleneck.severity] }}
              >
                {SEVERITY_LABELS[activeBottleneck.severity]} Bottleneck
              </span>
            </div>

            <p className="font-serif text-[17px] text-primary leading-[1.8] mb-5">
              {activeBottleneck.description}
            </p>

            <div className="border-t border-border pt-4">
              <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-2">
                Evidence
              </p>
              <p className="font-sans text-[14px] text-secondary leading-[1.7] mb-2">
                {activeBottleneck.evidence}
              </p>
              <Caption>Source: {activeBottleneck.source}</Caption>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Prose>
        <p style={{ marginTop: '32px' }}>
          Research judgment is the deepest bottleneck. Executing a research step well
          is not the same as knowing which step is worth taking. Anthropic notes that
          "large performance gaps persist when it comes to Claude exercising judgement
          in choosing goals in both engineering and research." As of April 2026,
          humans still chose the research problem and defined the scoring rubric in
          every published experiment.
        </p>
      </Prose>
    </SectionWrapper>
  )
}
