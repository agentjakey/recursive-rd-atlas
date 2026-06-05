import { Hero } from '@/components/sections/Hero'
import { Framing } from '@/components/sections/Framing'
import { Timeline } from '@/components/sections/Timeline'
import { LoopMap } from '@/components/sections/LoopMap'
import { BottleneckSimulator } from '@/components/sections/BottleneckSimulator'
import { FailureModeCards } from '@/components/sections/FailureModeCards'
import { EvidencePanel } from '@/components/sections/EvidencePanel'
import { Thesis } from '@/components/sections/Thesis'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Framing />
      <Timeline />
      <LoopMap />
      <BottleneckSimulator />
      <FailureModeCards />
      <EvidencePanel />
      <Thesis />
      <Footer />
    </>
  )
}
