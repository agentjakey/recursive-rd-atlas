import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Callout } from '@/components/ui/Typography'

export function Thesis() {
  return (
    <SectionWrapper id="thesis" label="Thesis">
      <SectionHeading n={7}>What This Means</SectionHeading>

      <Prose>
        <p>
          The loop has not closed. AI systems are not building their successors
          autonomously. Recursive self-improvement, as Anthropic defines it, has not
          occurred. These are not contested claims. They are the findings of the
          organizations closest to the frontier, stated plainly.
        </p>
        <p>
          What is also not contested: the rate of change is fast and measurable.
          Task horizons grew 180x in two years. AI systems are already authoring
          the majority of code at a leading frontier lab. Research judgment, the
          hardest remaining bottleneck, improved from 51% to 64% in five months.
          If that trend line continues, the bottleneck narrows faster than most
          institutions are prepared for.
        </p>
        <p>
          The Anthropic Institute names three open problems that need solving
          before any of this can be governed well: telemetry systems for measuring
          aggregate AI R&D speed, intervention points for slowing recursive
          self-improvement if it begins to occur, and clarity on which entities
          should control acceleration rates. None of those problems have solutions
          yet.
        </p>
      </Prose>

      <Callout variant="default">
        Anthropic has proposed that AI labs explore whether a coordinated option
        to slow or temporarily pause frontier development should exist if risks
        rise. They acknowledge that verification of any such agreement is &ldquo;much
        more challenging than with other technologies.&rdquo; The proposal exists. The
        mechanism does not.
      </Callout>

      <Prose>
        <p>
          The useful question is not whether recursive self-improvement will happen.
          It is whether the people and institutions responsible for safety,
          governance, and oversight will be able to detect a meaningful change
          in rate and respond to it in time. The evidence reviewed here suggests
          the rate is already fast enough to demand that question be answered before
          the answer is needed.
        </p>
        <p>
          The bottleneck is judgment: which problems matter, what surprising results
          mean, and whether an AI system evaluating its own outputs can be trusted
          to catch its own errors. Until those three things change, humans remain
          the irreplaceable component. The work is to understand what changes when
          they are not.
        </p>
      </Prose>

      <div
        className="border-t border-border"
        style={{ marginTop: '40px', paddingTop: '32px' }}
      >
        <p className="font-serif italic text-[17px] text-secondary leading-[1.8]" style={{ maxWidth: '580px' }}>
          The map is not the territory. But a map that shows you where the roads
          end and the unmarked terrain begins is still worth having.
        </p>
      </div>
    </SectionWrapper>
  )
}
