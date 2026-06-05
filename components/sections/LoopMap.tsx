'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Callout } from '@/components/ui/Typography'
import { LOOP_STAGES, LoopStage } from '@/lib/data'

const STATE_LABELS: Record<LoopStage['currentState'], string> = {
  active: 'Current',
  emerging: 'Emerging',
  speculative: 'Not Yet Achieved',
}

const STATE_COLORS: Record<LoopStage['currentState'], string> = {
  active: '#4E8098',
  emerging: '#D4A853',
  speculative: '#8A8880',
}

export function LoopMap() {
  const [selected, setSelected] = useState<StageId | null>('assisted')
  const selectedStage = LOOP_STAGES.find((s) => s.id === selected) ?? null

  return (
    <SectionWrapper id="loop" label="The AI R&D Loop">
      <SectionHeading n={3}>The Loop, In Three Stages</SectionHeading>

      <Prose>
        <p>
          Recursive self-improvement is not a single event. It is the result of a loop
          closing incrementally. Each stage represents a qualitatively different relationship
          between human and AI in the research and development process. Select a stage
          to see where we are.
        </p>
      </Prose>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {LOOP_STAGES.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setSelected(stage.id === selected ? null : stage.id)}
            className="text-left border border-border transition-all duration-200"
            style={{
              background: selected === stage.id ? '#FFFFFF' : 'transparent',
              borderColor: selected === stage.id ? stage.color : '#E4E2DB',
              padding: '20px',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className="font-mono text-[11px] tracking-widest uppercase"
                style={{ color: stage.color }}
              >
                Stage {stage.n}
              </span>
              <span
                className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5"
                style={{
                  color: STATE_COLORS[stage.currentState],
                  background: `${STATE_COLORS[stage.currentState]}18`,
                  border: `1px solid ${STATE_COLORS[stage.currentState]}40`,
                }}
              >
                {STATE_LABELS[stage.currentState]}
              </span>
            </div>
            <p className="font-sans text-[15px] font-semibold text-primary leading-snug mb-1">
              {stage.title}
            </p>
            <p className="font-sans text-[13px] text-secondary">
              {stage.subtitle}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedStage && (
          <motion.div
            key={selectedStage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 border border-border"
            style={{ background: '#FFFFFF', padding: '28px 24px' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: selectedStage.color }}
              />
              <span
                className="font-mono text-[12px] tracking-widest uppercase font-medium"
                style={{ color: selectedStage.color }}
              >
                {selectedStage.title}
              </span>
            </div>

            <p className="font-serif text-[17px] text-primary leading-[1.8] mb-6">
              {selectedStage.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-5">
              <div>
                <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-2">
                  Human Role
                </p>
                <p className="font-sans text-[14px] text-secondary leading-[1.7]">
                  {selectedStage.humanRole}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-2">
                  AI Role
                </p>
                <p className="font-sans text-[14px] text-secondary leading-[1.7]">
                  {selectedStage.aiRole}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Callout variant="warning">
        Anthropic describes a second scenario where "AI development becomes substantially
        automated, but humans continue to set research directions and judge results" as
        the most plausible near-term trajectory. Organizations could achieve productivity
        multipliers allowing 100-person teams to perform 10,000-person work. That scenario
        is already partially underway.
      </Callout>
    </SectionWrapper>
  )
}

type StageId = 'assisted' | 'rd' | 'closed'
