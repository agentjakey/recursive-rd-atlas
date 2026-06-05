import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Callout } from '@/components/ui/Typography'

export function Framing() {
  return (
    <SectionWrapper id="framing" label="Framing">
      <SectionHeading n={1}>What This Is About</SectionHeading>

      <Prose>
        <p>
          Recursive self-improvement refers to an AI system becoming capable of fully
          autonomously designing and developing its own successor. That capability does not
          exist today. What does exist is a measurable, documented trend toward greater
          AI involvement in the research and engineering process that produces AI systems.
        </p>
        <p>
          The distinction matters. A lot of writing about this topic either collapses
          the gap between "AI writes code faster" and "AI builds itself," or treats
          the gap as so large that the trend is irrelevant. Neither framing serves
          careful thinking.
        </p>
        <p>
          This project is structured around that gap. What is already happening, what
          is measurably emerging, and what remains speculative. Where the bottlenecks
          are. What failure modes look like when the loop starts to close. And what
          the evidence, as of mid-2026, actually says about the path between here and there.
        </p>
      </Prose>

      <Callout variant="info">
        Anthropic identifies three possible futures: current trends stall, AI substantially
        automates development while humans set research directions, or AI systems achieve
        full recursive self-improvement and begin building successors. The second scenario
        is already partially underway. The third has not occurred.
      </Callout>

      <Prose>
        <p>
          The Anthropic Institute's research agenda frames the core question this way:
          when AI systems develop their successors autonomously, how do humans exercise
          meaningful visibility into and control over those systems? That question does
          not require recursive self-improvement to already be happening. It requires
          it to be plausible enough to plan for.
        </p>
        <p>
          METR's time-horizon measurements find that exponential trend fits outperform
          linear and logistic models. They explicitly reject logistic curves because
          there is no evidence of the exponential growth in time horizon slowing down.
          That is a statement about current observations, not a guarantee about the future.
          But it is a statement worth taking seriously.
        </p>
      </Prose>
    </SectionWrapper>
  )
}
