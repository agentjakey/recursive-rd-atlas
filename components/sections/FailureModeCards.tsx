'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Caption } from '@/components/ui/Typography'
import { FAILURE_MODES, FailureMode } from '@/lib/data'

const SEVERITY_CONFIG: Record<FailureMode['severity'], { label: string; color: string }> = {
  observed: { label: 'Observed', color: '#C2411C' },
  structural: { label: 'Structural', color: '#9B7EBD' },
  open: { label: 'Open Problem', color: '#4E8098' },
}

const FAMILY_COLORS: Record<string, string> = {
  Execution: '#4E8098',
  Autonomy: '#9B7EBD',
  Judgment: '#D4A853',
  Verification: '#C47C5A',
  Governance: '#6B8A6B',
}

export function FailureModeCards() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <SectionWrapper id="failures" label="Failure Modes">
      <SectionHeading n={5}>When the Loop Closes Badly</SectionHeading>

      <Prose>
        <p>
          These are failure modes specific to AI-driven R&D: behaviors that emerge
          when AI systems participate in developing successor systems. Some are already
          observed in controlled benchmarks. Some are structural properties of the
          architecture. Some are open problems that have no documented instance yet
          but follow necessarily from how these systems work.
        </p>
      </Prose>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
        {FAILURE_MODES.map((fm, i) => {
          const isExpanded = expanded === fm.id
          const sev = SEVERITY_CONFIG[fm.severity]
          const familyColor = FAMILY_COLORS[fm.family] ?? '#8A8880'

          return (
            <motion.div
              key={fm.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : fm.id)}
                className="w-full text-left border border-border transition-all duration-200"
                style={{
                  background: isExpanded ? '#FFFFFF' : 'transparent',
                  padding: '20px',
                  borderColor: isExpanded ? sev.color : '#E4E2DB',
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5"
                    style={{
                      color: familyColor,
                      background: `${familyColor}18`,
                      border: `1px solid ${familyColor}40`,
                    }}
                  >
                    {fm.family}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5"
                    style={{
                      color: sev.color,
                      background: `${sev.color}14`,
                      border: `1px solid ${sev.color}38`,
                    }}
                  >
                    {sev.label}
                  </span>
                </div>

                <p className="font-sans text-[15px] font-semibold text-primary leading-snug mb-2">
                  {fm.title}
                </p>

                <p
                  className="font-serif text-[14px] text-secondary leading-[1.7]"
                  style={{
                    display: isExpanded ? 'block' : '-webkit-box',
                    WebkitLineClamp: isExpanded ? undefined : 3,
                    WebkitBoxOrient: isExpanded ? undefined : 'vertical',
                    overflow: isExpanded ? 'visible' : 'hidden',
                  } as React.CSSProperties}
                >
                  {fm.description}
                </p>

                {isExpanded && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-2">
                      Example
                    </p>
                    <p className="font-sans text-[13px] text-secondary leading-[1.7] mb-2">
                      {fm.example}
                    </p>
                    <Caption>Source: {fm.source}</Caption>
                  </div>
                )}
              </button>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
        {(Object.entries(SEVERITY_CONFIG) as [FailureMode['severity'], { label: string; color: string }][]).map(
          ([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: val.color }}
              />
              <span className="font-mono text-[11px] text-secondary tracking-wide uppercase">
                {val.label}
              </span>
            </div>
          )
        )}
      </div>
    </SectionWrapper>
  )
}
