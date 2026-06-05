'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose } from '@/components/ui/Typography'
import { RD_FAILURE_MODES, type RDFailureMode } from '@/lib/data'

const SEVERITY_CONFIG: Record<RDFailureMode['severity'], { label: string; color: string }> = {
  observed: { label: 'Observed', color: '#C2411C' },
  structural: { label: 'Structural', color: '#9B7EBD' },
  open: { label: 'Open Problem', color: '#4E8098' },
}

const FAMILY_COLORS: Record<string, string> = {
  Oversight: '#4E8098',
  Measurement: '#D4A853',
  Training: '#C47C5A',
  Visibility: '#9B7EBD',
  Access: '#7B4B44',
  Judgment: '#6B8A6B',
  Security: '#C2411C',
  Governance: '#5C7D8A',
}

function ExpandLabel({ field, color }: { field: string; color: string }) {
  return (
    <p
      className="font-mono text-[11px] tracking-widest uppercase mb-1.5"
      style={{ color }}
    >
      {field}
    </p>
  )
}

export function FailureModeCards() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <SectionWrapper id="failures" label="Failure Modes">
      <SectionHeading n={5}>When the Loop Closes Badly</SectionHeading>

      <Prose>
        <p>
          These are failure modes specific to AI-driven R&D: patterns that emerge when
          AI systems participate in developing successor systems. Some are already
          documented in benchmark evaluations. Some are structural properties of the
          architecture that follow from how recursive improvement works. Some are open
          problems without a documented instance yet, but which cannot be ruled out.
        </p>
      </Prose>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
        {RD_FAILURE_MODES.map((fm, i) => {
          const isExpanded = expanded === fm.id
          const sev = SEVERITY_CONFIG[fm.severity]
          const familyColor = FAMILY_COLORS[fm.family] ?? '#8A8880'

          return (
            <motion.div
              key={fm.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : fm.id)}
                aria-expanded={isExpanded}
                className="w-full text-left border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 hover:shadow-[0_2px_10px_rgba(26,25,21,0.06)]"
                style={{
                  background: isExpanded ? '#FFFFFF' : 'transparent',
                  padding: '20px',
                  borderColor: isExpanded ? familyColor : '#E4E2DB',
                  outlineColor: familyColor,
                }}
              >
                {/* Badge row */}
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
                    className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 flex-shrink-0"
                    style={{
                      color: sev.color,
                      background: `${sev.color}14`,
                      border: `1px solid ${sev.color}38`,
                    }}
                  >
                    {sev.label}
                  </span>
                </div>

                {/* Title */}
                <p className="font-sans text-[15px] font-semibold text-primary leading-snug mb-2">
                  {fm.title}
                </p>

                {/* Definition: clamped when collapsed, full when expanded */}
                <p
                  className="font-serif text-[14px] text-secondary leading-[1.7]"
                  style={
                    isExpanded
                      ? {}
                      : ({
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } as React.CSSProperties)
                  }
                >
                  {fm.definition}
                </p>

                {/* Expanded content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Why it matters */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <ExpandLabel field="Why it matters" color="#C2411C" />
                      <p className="font-serif text-[14px] text-secondary leading-[1.75]">
                        {fm.whyItMatters}
                      </p>
                    </div>

                    {/* Warning sign */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <ExpandLabel field="Warning sign" color="#C09A3A" />
                      <p className="font-serif text-[14px] text-secondary leading-[1.75]">
                        {fm.warningSign}
                      </p>
                    </div>

                    {/* Possible mitigation */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <ExpandLabel field="Possible mitigation" color="#4E7A6B" />
                      <p className="font-serif text-[14px] text-secondary leading-[1.75]">
                        {fm.mitigation}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Expand / collapse hint */}
                <div className="mt-3 flex items-center justify-end">
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: isExpanded ? familyColor : '#AEABA4' }}
                  >
                    {isExpanded ? '-- collapse' : '++ expand'}
                  </span>
                </div>
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
        {(
          Object.entries(SEVERITY_CONFIG) as [
            RDFailureMode['severity'],
            { label: string; color: string },
          ][]
        ).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: val.color }}
            />
            <span className="font-mono text-[11px] text-secondary tracking-wide uppercase">
              {val.label}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
