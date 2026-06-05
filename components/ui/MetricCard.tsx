interface MetricCardProps {
  label: string
  value: string | number
  subLabel?: string
}

export function MetricCard({ label, value, subLabel }: MetricCardProps) {
  return (
    <div
      className="border border-border"
      style={{ background: '#FFFFFF', padding: '20px 24px' }}
    >
      <p
        className="font-mono text-[11px] text-secondary tracking-widest uppercase"
        style={{ marginBottom: '8px' }}
      >
        {label}
      </p>
      <p
        className="font-sans font-semibold text-primary"
        style={{ fontSize: '28px', lineHeight: 1.2, marginBottom: subLabel ? '4px' : 0 }}
      >
        {value}
      </p>
      {subLabel && (
        <p className="font-sans text-[12px] text-[#8A8880]">{subLabel}</p>
      )}
    </div>
  )
}
