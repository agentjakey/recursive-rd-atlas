interface MetricCardProps {
  label: string
  value: string | number
  subLabel?: string
  accent?: string
}

export function MetricCard({ label, value, subLabel, accent }: MetricCardProps) {
  return (
    <div
      className="border border-border transition-[box-shadow,border-color] duration-150 hover:shadow-[0_2px_10px_rgba(26,25,21,0.07)] hover:border-[#D0CCC5]"
      style={{
        background: '#FFFFFF',
        padding: '18px 20px 20px',
        borderTop: accent ? `2px solid ${accent}` : undefined,
      }}
    >
      <p
        className="font-mono text-[11px] text-secondary tracking-widest uppercase"
        style={{ marginBottom: '8px' }}
      >
        {label}
      </p>
      <p
        className="font-sans font-semibold text-primary tabular-nums"
        style={{ fontSize: '26px', lineHeight: 1.2, marginBottom: subLabel ? '4px' : 0 }}
      >
        {value}
      </p>
      {subLabel && (
        <p className="font-sans text-[12px] text-[#8A8880] leading-snug">{subLabel}</p>
      )}
    </div>
  )
}
