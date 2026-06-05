'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Caption, Callout } from '@/components/ui/Typography'
import { EVIDENCE_ITEMS, EvidenceItem } from '@/lib/data'

const TREND_SYMBOLS: Record<EvidenceItem['trend'], string> = {
  up: '+',
  down: '-',
  mixed: '~',
}

const TREND_COLORS: Record<EvidenceItem['trend'], string> = {
  up: '#4E8098',
  down: '#C2411C',
  mixed: '#D4A853',
}

const TREND_LABELS: Record<EvidenceItem['trend'], string> = {
  up: 'Rising',
  down: 'Falling',
  mixed: 'Mixed',
}

export function EvidencePanel() {
  return (
    <SectionWrapper id="evidence" label="Evidence">
      <SectionHeading n={6}>What the Data Says</SectionHeading>

      <Prose>
        <p>
          These are the key metrics currently in the public record on AI involvement
          in R&D. All figures are sourced from Anthropic Institute publications or
          METR evaluations. Interpretations reflect careful readings of what the
          data establishes and what it does not.
        </p>
      </Prose>

      <div className="mt-10 flex flex-col gap-4">
        {EVIDENCE_ITEMS.map((item, i) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            className="border border-border card-hover"
            style={{ background: '#FFFFFF', padding: '24px' }}
          >
            {/* Metric header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-secondary tracking-widest uppercase mb-2">
                  {item.metric}
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="font-sans font-semibold text-primary tabular-nums"
                    style={{ fontSize: '30px', lineHeight: 1.1 }}
                  >
                    {item.value}
                  </span>
                  <span className="font-sans text-[13px] text-[#8A8880]">
                    {item.subvalue}
                  </span>
                </div>
              </div>

              {/* Trend badge */}
              <div
                className="flex flex-col items-center gap-1 flex-shrink-0 px-3 py-2 border"
                style={{
                  color: TREND_COLORS[item.trend],
                  borderColor: `${TREND_COLORS[item.trend]}40`,
                  background: `${TREND_COLORS[item.trend]}0C`,
                  minWidth: '56px',
                }}
              >
                <span className="font-mono text-[18px] font-bold leading-none">
                  {TREND_SYMBOLS[item.trend]}
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase leading-none">
                  {TREND_LABELS[item.trend]}
                </span>
              </div>
            </div>

            {/* Interpretation block */}
            <div
              className="border-t border-border pt-4 border-l-[2px] pl-4 mt-1"
              style={{ borderLeftColor: `${TREND_COLORS[item.trend]}50` }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: '#8A8880' }}>
                Interpretation
              </p>
              <p className="font-serif text-[15px] text-secondary leading-[1.78] mb-3">
                {item.interpretation}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: TREND_COLORS[item.trend] }}
                />
                <Caption>Source: {item.source}</Caption>
              </div>
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
