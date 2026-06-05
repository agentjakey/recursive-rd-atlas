import { AUTHOR, GITHUB_URL, LAST_UPDATED, SIBLING_PROJECTS } from '@/lib/config'

const SOURCES = [
  {
    label: 'Anthropic Institute: Recursive Self-Improvement',
    url: 'https://www.anthropic.com/institute/recursive-self-improvement',
  },
  {
    label: 'Anthropic Research Agenda',
    url: 'https://www.anthropic.com/research/anthropic-institute-agenda',
  },
  {
    label: 'METR: Time Horizons',
    url: 'https://metr.org/time-horizons/',
  },
  {
    label: 'METR: RE-Bench (Evaluating R&D Capabilities)',
    url: 'https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/',
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[720px] mx-auto px-6 pt-12 pb-16">

        {/* Site identity */}
        <div className="mb-10 pb-10 border-b border-border">
          <p className="font-sans text-[15px] font-semibold text-primary" style={{ letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Recursive R&D Atlas
          </p>
          <p className="font-serif text-[15px] text-secondary leading-[1.7]">
            An educational tool for understanding the current state of AI involvement
            in AI R&D. No claims here are predictions. All quantitative statements
            are sourced from Anthropic Institute or METR publications.
          </p>
        </div>

        {/* Two-col: About + Sibling Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-4">
              About
            </p>
            <p className="font-serif text-[15px] text-secondary leading-[1.8]">
              Built by{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-[#D0CCC5] hover:decoration-secondary transition-[text-decoration-color] duration-150"
              >
                {AUTHOR}
              </a>{' '}
              as a research communication tool. Recursive self-improvement is not
              presented as proven or inevitable. The goal is to make visible where
              the evidence currently points.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-4">
              Sibling Projects
            </p>
            <div className="flex flex-col gap-2.5">
              {SIBLING_PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-sans text-[14px] text-secondary hover:text-primary transition-colors duration-150"
                >
                  <span
                    className="inline-block w-1 h-1 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ background: '#C2411C' }}
                  />
                  <span className="underline underline-offset-2 decoration-[#D0CCC5] group-hover:decoration-secondary transition-[text-decoration-color] duration-150">
                    {p.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sources */}
        <div className="border-t border-border pt-8 mb-8">
          <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-4">
            Primary Sources
          </p>
          <div className="flex flex-col gap-2">
            {SOURCES.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 font-sans text-[13px] text-secondary hover:text-primary transition-colors duration-150"
              >
                <span
                  className="flex-shrink-0 mt-[7px] inline-block w-1 h-1 rounded-full"
                  style={{ background: '#8A8880' }}
                />
                <span className="underline underline-offset-2 decoration-transparent group-hover:decoration-[#8A8880] transition-[text-decoration-color] duration-150">
                  {s.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="border-t border-border pt-8">
          <p
            className="font-serif italic text-[15px] text-[#8A8880] leading-[1.78] mb-5"
            style={{ maxWidth: '560px' }}
          >
            Recursive self-improvement is not presented here as an inevitability.
            The goal is to make visible what the data actually says, so that the
            questions worth asking become clearer.
          </p>
          <p className="font-mono text-[11px] text-[#AEABA4]">
            Last updated: {LAST_UPDATED} &middot; MIT License &middot; Errors are mine
          </p>
        </div>
      </div>
    </footer>
  )
}
