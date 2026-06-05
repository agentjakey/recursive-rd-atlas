import { AUTHOR, GITHUB_URL, LAST_UPDATED, SIBLING_PROJECTS } from '@/lib/config'

export function Footer() {
  const linkStyle = {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(92, 90, 84, 0.45)',
    textUnderlineOffset: '2px',
  } as React.CSSProperties

  return (
    <footer className="border-t border-border">
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <p
              className="font-mono text-[11px] text-accent tracking-widest uppercase"
              style={{ marginBottom: '14px' }}
            >
              About
            </p>
            <p className="font-serif text-[16px] text-secondary leading-[1.8]">
              Built by{' '}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {AUTHOR}
              </a>{' '}
              as a research communication tool. All claims are sourced from Anthropic Institute
              publications and METR evaluations. This is not a prediction. It is a map of where
              the evidence currently points.
            </p>
          </div>

          <div>
            <p
              className="font-mono text-[11px] text-accent tracking-widest uppercase"
              style={{ marginBottom: '14px' }}
            >
              Sibling Projects
            </p>
            <div className="flex flex-col gap-3">
              {SIBLING_PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] text-secondary hover:text-primary transition-colors"
                  style={{
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(92, 90, 84, 0.35)',
                    textUnderlineOffset: '2px',
                  }}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mb-8">
          <p
            className="font-mono text-[11px] text-accent tracking-widest uppercase"
            style={{ marginBottom: '14px' }}
          >
            Sources
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Anthropic Institute: Recursive Self-Improvement', url: 'https://www.anthropic.com/institute/recursive-self-improvement' },
              { label: 'Anthropic Research Agenda', url: 'https://www.anthropic.com/research/anthropic-institute-agenda' },
              { label: 'METR: Time Horizons', url: 'https://metr.org/time-horizons/' },
              { label: 'METR: RE-Bench', url: 'https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/' },
            ].map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] text-secondary hover:text-primary transition-colors"
                style={{
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(92, 90, 84, 0.35)',
                  textUnderlineOffset: '2px',
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p
            className="font-serif italic text-[14px] text-[#8A8880] leading-[1.7] mb-4"
            style={{ maxWidth: '560px' }}
          >
            Recursive self-improvement is not presented here as an inevitability. The goal is to
            make visible what the data actually says, so that the questions worth asking become
            clearer.
          </p>
          <p className="font-mono text-[11px] text-[#8A8880]">
            Last updated: {LAST_UPDATED} &middot; MIT License &middot; Errors are mine.
          </p>
        </div>
      </div>
    </footer>
  )
}
