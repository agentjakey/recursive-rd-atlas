'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Caption } from '@/components/ui/Typography'
import { TIMELINE, TimelineEvent } from '@/lib/data'

const CATEGORY_COLORS: Record<TimelineEvent['category'], string> = {
  'task-horizon': '#4E8098',
  'benchmark': '#9B7EBD',
  'judgment': '#D4A853',
  'policy': '#C2411C',
}

const CATEGORY_LABELS: Record<TimelineEvent['category'], string> = {
  'task-horizon': 'Task Horizon',
  'benchmark': 'Benchmark',
  'judgment': 'Judgment',
  'policy': 'Policy',
}

export function Timeline() {
  return (
    <SectionWrapper id="timeline" label="Timeline">
      <SectionHeading n={2}>The Record So Far</SectionHeading>

      <Prose>
        <p>
          These are documented data points from Anthropic Institute publications and
          METR evaluations. The pace of change in the task horizon column is the
          primary empirical case that this trend deserves serious attention.
        </p>
      </Prose>

      <div className="mt-10 mb-6 flex flex-wrap gap-x-5 gap-y-2">
        {(Object.entries(CATEGORY_LABELS) as [TimelineEvent['category'], string][]).map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: CATEGORY_COLORS[cat] }}
            />
            <span className="font-mono text-[11px] text-secondary tracking-wide uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-8">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-[1px]"
          style={{ background: '#E4E2DB' }}
        />

        <div className="flex flex-col gap-0">
          {TIMELINE.map((event, i) => (
            <motion.div
              key={event.date + event.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex gap-5 pb-8"
            >
              <div className="flex-shrink-0 mt-[6px]">
                <span
                  className="block w-[15px] h-[15px] rounded-full border-2"
                  style={{
                    background: CATEGORY_COLORS[event.category],
                    borderColor: '#FAFAF8',
                    outline: `1px solid ${CATEGORY_COLORS[event.category]}`,
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span
                    className="font-mono text-[11px] tracking-widest uppercase"
                    style={{ color: CATEGORY_COLORS[event.category] }}
                  >
                    {event.date}
                  </span>
                  <span className="font-sans text-[13px] text-[#8A8880] uppercase tracking-wide">
                    {CATEGORY_LABELS[event.category]}
                  </span>
                </div>
                <p className="font-sans text-[15px] font-semibold text-primary leading-snug mb-1">
                  {event.label}
                </p>
                <p className="font-serif text-[15px] text-secondary leading-[1.75]">
                  {event.detail}
                </p>
                <Caption className="mt-1">Source: {event.source}</Caption>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Prose>
        <p>
          The task horizon grew 180x in two years, from 4-minute tasks in March 2024
          to 12-hour tasks in March 2026. METR reports that measurements above 16 hours
          are currently unreliable with their existing task suite, meaning the ceiling
          has not yet been observed empirically.
        </p>
      </Prose>
    </SectionWrapper>
  )
}
