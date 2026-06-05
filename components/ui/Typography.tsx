import { ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  className?: string
}

export function Prose({ children, className = '' }: BaseProps) {
  return (
    <div className={`font-serif text-[18px] leading-[1.8] text-primary space-y-5 ${className}`}>
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
  return (
    <div className={`mb-10 ${className}`}>
      <span className="block font-mono text-xs text-accent tracking-widest uppercase mb-3">
        {typeof n === 'number' ? String(n).padStart(2, '0') : n}
      </span>
      <h2 className="font-sans text-4xl font-semibold text-primary leading-tight">
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

  return (
    <aside
      className={`border-l-[3px] pl-5 py-0.5 my-8 ${className}`}
      style={{ borderLeftColor: borderColor }}
    >
      <div className="font-serif text-[17px] leading-[1.8] text-secondary">{children}</div>
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
    <span
      className={`font-mono text-[11px] tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  )
}
