import { ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  className?: string
}

export function Prose({ children, className = '' }: BaseProps) {
  return (
    <div className={`font-serif text-[18px] leading-[1.82] text-primary space-y-5 ${className}`}>
      {children}
    </div>
  )
}

export function Lead({ children, className = '' }: BaseProps) {
  return (
    <p className={`font-sans text-xl leading-relaxed text-secondary ${className}`}>
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  n: number | string
  children: ReactNode
  className?: string
}

export function SectionHeading({ n, children, className = '' }: SectionHeadingProps) {
  const label = typeof n === 'number' ? String(n).padStart(2, '0') : n
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <span
          className="font-mono text-[11px] tracking-[0.14em] uppercase"
          style={{ color: '#C2411C' }}
        >
          {label}
        </span>
        <span
          className="flex-1 h-px"
          style={{ background: '#E4E2DB' }}
          aria-hidden="true"
        />
      </div>
      <h2
        className="font-sans font-semibold text-primary leading-tight"
        style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', letterSpacing: '-0.02em' }}
      >
        {children}
      </h2>
    </div>
  )
}

interface CalloutProps extends BaseProps {
  variant?: 'default' | 'warning' | 'info' | 'care'
}

export function Callout({ children, className = '', variant = 'default' }: CalloutProps) {
  const borderColor =
    variant === 'warning'
      ? '#D4A853'
      : variant === 'info'
      ? '#4E8098'
      : variant === 'care'
      ? '#9B7EBD'
      : '#C2411C'

  const bg =
    variant === 'warning'
      ? '#D4A85306'
      : variant === 'info'
      ? '#4E809806'
      : variant === 'care'
      ? '#9B7EBD06'
      : '#C2411C06'

  return (
    <aside
      className={`border-l-[3px] pl-5 pr-4 py-3 my-8 ${className}`}
      style={{ borderLeftColor: borderColor, background: bg }}
    >
      <div className="font-serif text-[16px] leading-[1.8] text-secondary">{children}</div>
    </aside>
  )
}

export function H1({ children, className = '' }: BaseProps) {
  return (
    <h1
      className={`font-sans text-5xl md:text-6xl font-semibold text-primary leading-[1.1] ${className}`}
    >
      {children}
    </h1>
  )
}

export function H3({ children, className = '' }: BaseProps) {
  return (
    <h3 className={`font-sans text-xl font-semibold text-primary leading-snug ${className}`}>
      {children}
    </h3>
  )
}

export function Caption({ children, className = '' }: BaseProps) {
  return (
    <p className={`font-sans text-[13px] text-[#8A8880] leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

export function MonoLabel({ children, className = '' }: BaseProps) {
  return (
    <span className={`font-mono text-[11px] tracking-widest uppercase ${className}`}>
      {children}
    </span>
  )
}
