'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Caption, Callout } from '@/components/ui/Typography'
import { EVIDENCE_ITEMS, EvidenceItem } from '@/lib/data'

const TREND_ICONS: Record<EvidenceItem['trend'], string> = {
  up: '+',
  down: '-',
  mixed: '~',
}

const TREND_COLORS: Record<EvidenceItem['trend'], string> = {
  up: '#4E8098',
  down: '#C2411C',
  mixed: '#D4A853',
}

export function EvidencePanel() {
  return (
    <SectionWrapper id="evidence" label="Evidence">
      <SectionHeading n={6}>What the Data Says</SectionHeading>

      <Prose>
        <p>
          These are the key metrics currently in the public record on AI involvement
          in R&D. All figures are sourced from Anthropic Institute publications or
          METR evaluations. The interpretations are careful readings of what the
          data establishes and what it does not.
        </p>
      </Prose>

      <div className="mt-10 flex flex-col gap-4">
        {EVIDENCE_ITEMS.map((item, i) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            className="border border-border"
            style={{ background: '#FFFFFF', padding: '24px' }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <p className="font-mono text-[11px] text-secondary tracking-widest uppercase mb-2">
                  {item.metric}
                </p>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-sans font-semibold text-primary"
                    style={{ fontSize: '32px', lineHeight: 1.1 }}
                  >
                    {item.value}
                  </span>
                  <span className="font-sans text-[13px] text-[#8A8880]">
                    {item.subvalue}
                  </span>
                </div>
              </div>
              <div
                className="font-mono text-[18px] font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center border"
                style={{
                  color: TREND_COLORS[item.trend],
                  borderColor: `${TREND_COLORS[item.trend]}40`,
                  background: `${TREND_COLORS[item.trend]}0F`,
                }}
              >
                {TREND_ICONS[item.trend]}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-2">
                Interpretation
              </p>
              <p className="font-serif text-[15px] text-secondary leading-[1.75] mb-2">
                {item.interpretation}
              </p>
              <Caption>Source: {item.source}</Caption>
            </div>
          </motion.div>
        ))}
      </div>

      <Callout variant="care">
        METR notes that measurements above 16 hours are currently unreliable with
        their existing task suite. The time horizon data should be read as a lower
        bound on AI task capability, not a complete picture. The ceiling has not
        yet been empirically observed.
      </Callout>
    </SectionWrapper>
  )
}
