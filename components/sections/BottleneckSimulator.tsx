'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose } from '@/components/ui/Typography'

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

interface SliderDef {
  id: keyof SimState
  label: string
  description: string
  color: string
  group: 'capability' | 'oversight'
}

interface SimState {
  taskHorizon: number
  codeQuality: number
  experimentReliability: number
  computeAvailability: number
  humanReview: number
  evaluationStrength: number
  security: number
  governance: number
}

interface SimOutputs {
  acceleration: number
  oversightCapacity: number
  oversightDebt: number
  rsiProximity: number
  warningLevel: 'low' | 'medium' | 'high' | 'critical'
  bottleneck: { label: string; value: number; group: 'capability' | 'oversight' }
  failureMode: { name: string; why: string }
}

// ─────────────────────────────────────────────────────────
// SLIDER DEFINITIONS
// ─────────────────────────────────────────────────────────

const CAP_COLOR = '#4E8098'
const OVS_COLOR = '#6B8A6B'

const SLIDERS: SliderDef[] = [
  {
    id: 'taskHorizon',
    label: 'Agent Task Horizon',
    description: 'How long AI agents can work autonomously without human checkpoints. In March 2026, frontier models reached 12-hour horizons (METR).',
    color: CAP_COLOR,
    group: 'capability',
  },
  {
    id: 'codeQuality',
    label: 'Code Generation Quality',
    description: 'Reliability of AI-produced code: correctness, edge-case handling, and test coverage. Over 80% of Anthropic merged production code is AI-authored as of May 2026.',
    color: CAP_COLOR,
    group: 'capability',
  },
  {
    id: 'experimentReliability',
    label: 'Experiment Reliability',
    description: 'Fraction of AI-run experiments that return valid, non-corrupted, interpretable results. RE-Bench shows mixed reliability on extended tasks.',
    color: CAP_COLOR,
    group: 'capability',
  },
  {
    id: 'computeAvailability',
    label: 'Compute Availability',
    description: 'Raw compute budget available for training runs and large-scale inference. Frontier labs have significant and growing compute.',
    color: CAP_COLOR,
    group: 'capability',
  },
  {
    id: 'humanReview',
    label: 'Human Review Capacity',
    description: 'Bandwidth for humans to meaningfully review AI-generated code, experiments, and decisions. Currently lagging behind output volume at frontier labs.',
    color: OVS_COLOR,
    group: 'oversight',
  },
  {
    id: 'evaluationStrength',
    label: 'Evaluation Strength',
    description: 'Quality and coverage of automated evals. Whether they measure what they claim to. Goodhart\'s law applies when evals are weak.',
    color: OVS_COLOR,
    group: 'oversight',
  },
  {
    id: 'security',
    label: 'Security & Containment',
    description: 'Degree to which AI agent actions are bounded, logged, and reversible. Scaffold design determines blast radius.',
    color: OVS_COLOR,
    group: 'oversight',
  },
  {
    id: 'governance',
    label: 'Governance Coordination',
    description: 'Level of inter-lab coordination on safety standards and capability thresholds. Anthropic proposed a coordinated pause option in June 2026.',
    color: OVS_COLOR,
    group: 'oversight',
  },
]

// ─────────────────────────────────────────────────────────
// INITIAL STATE
// Approximate mid-2026 conditions based on public reporting
// ─────────────────────────────────────────────────────────

const INITIAL_STATE: SimState = {
  taskHorizon: 7,           // 12-hour horizon observed (METR, Mar 2026)
  codeQuality: 7,           // 80%+ merged production code AI-authored
  experimentReliability: 5, // RE-Bench shows mixed reliability at extended horizons
  computeAvailability: 8,   // compute is abundant at frontier labs
  humanReview: 4,           // lagging behind output volume
  evaluationStrength: 4,    // improving but not keeping pace with acceleration
  security: 5,              // moderate containment in current deployments
  governance: 3,            // limited inter-lab coordination as of mid-2026
}

// ─────────────────────────────────────────────────────────
// FORMULAS
// Toy model for intuition, not a forecast.
// All formulas are intentionally simple and documented here.
// ─────────────────────────────────────────────────────────

function computeOutputs(s: SimState): SimOutputs {
  // ACCELERATION (0-100)
  // Mean of the four capability inputs, scaled to 100.
  // Each input contributes equally — no interaction terms.
  // Higher task horizon, better code, more reliable experiments, and more compute
  // all push the loop to run faster and with less human involvement.
  const acceleration = Math.round(
    ((s.taskHorizon + s.codeQuality + s.experimentReliability + s.computeAvailability) / 4) * 10
  )

  // OVERSIGHT CAPACITY (0-100)
  // Mean of the four oversight inputs, scaled to 100.
  // Human review, evaluation quality, containment, and governance each provide
  // equal countervailing force. Weakest link matters most in practice, but this
  // model uses mean for simplicity — see bottleneck output for weakest-link logic.
  const oversightCapacity = Math.round(
    ((s.humanReview + s.evaluationStrength + s.security + s.governance) / 4) * 10
  )

  // OVERSIGHT DEBT (0-100)
  // How much acceleration exceeds available oversight.
  // Negative values (oversight surplus) are clamped to 0.
  // Debt is the core risk signal: it means the loop is running faster than
  // it is being watched.
  const oversightDebt = Math.max(0, acceleration - oversightCapacity)

  // RSI PROXIMITY (0-100)
  // Composite risk score. 60% weight on absolute acceleration (how fast things move),
  // 40% weight on the oversight gap (how unmanaged that speed is).
  // Clamped to [0, 100]. This is NOT a probability estimate.
  const rsiProximity = Math.min(100, Math.round(acceleration * 0.6 + oversightDebt * 0.4))

  // WARNING LEVEL
  // Thresholds chosen to reflect intuitive risk bands:
  //   0-24:  LOW      — normal operations, oversight keeps pace
  //  25-49:  MEDIUM   — acceleration beginning to outpace some dimensions
  //  50-74:  HIGH     — significant deficit, intervention warranted
  //  75-100: CRITICAL — oversight severely lags, loop may close unexpectedly
  const warningLevel: SimOutputs['warningLevel'] =
    rsiProximity >= 75 ? 'critical'
    : rsiProximity >= 50 ? 'high'
    : rsiProximity >= 25 ? 'medium'
    : 'low'

  // BOTTLENECK
  // If oversight debt > 0: safety bottleneck = lowest oversight input (weakest link).
  // If oversight debt = 0: capability bottleneck = lowest capability input (what limits progress).
  // This reflects the real-world intuition that when oversight lags, the binding constraint
  // is whichever safety mechanism is thinnest.
  const oversightCandidates = [
    { label: 'Human Review Capacity',  value: s.humanReview,         id: 'humanReview',         group: 'oversight' as const },
    { label: 'Evaluation Strength',    value: s.evaluationStrength,   id: 'evaluationStrength',  group: 'oversight' as const },
    { label: 'Security & Containment', value: s.security,             id: 'security',            group: 'oversight' as const },
    { label: 'Governance Coordination',value: s.governance,           id: 'governance',          group: 'oversight' as const },
  ]
  const capabilityCandidates = [
    { label: 'Agent Task Horizon',     value: s.taskHorizon,          id: 'taskHorizon',         group: 'capability' as const },
    { label: 'Code Generation Quality',value: s.codeQuality,          id: 'codeQuality',         group: 'capability' as const },
    { label: 'Experiment Reliability', value: s.experimentReliability,id: 'experimentReliability',group: 'capability' as const },
    { label: 'Compute Availability',   value: s.computeAvailability,  id: 'computeAvailability', group: 'capability' as const },
  ]

  const weakestOversight  = oversightCandidates.reduce((a, b)  => a.value <= b.value ? a : b)
  const weakestCapability = capabilityCandidates.reduce((a, b) => a.value <= b.value ? a : b)
  const bottleneck = oversightDebt > 0 ? weakestOversight : weakestCapability

  // MOST LIKELY FAILURE MODE
  // Heuristic derived from bottleneck + cross-condition checks.
  // If debt = 0: no active failure mode at current settings.
  // Special case: very high task horizon + very low human review triggers Progress Plateau
  // regardless of which oversight factor is technically lowest — this combination is
  // documented in METR RE-Bench (humans outperform AI agents at 32-hour budgets,
  // implying compounding error without human checkpoints).
  // Otherwise: failure mode is inferred from the weakest oversight input.
  let failureMode: SimOutputs['failureMode']

  if (oversightDebt === 0) {
    failureMode = {
      name: 'None at current settings',
      why: 'Oversight capacity meets or exceeds acceleration. The system is within a manageable range at these slider values.',
    }
  } else if (s.taskHorizon >= 8 && s.humanReview <= 2) {
    failureMode = {
      name: 'Progress Plateau',
      why: 'Agents run for extended periods without human checkpoints. Errors compound across iterations. By the time a human intervenes, multiple downstream runs have already built on flawed outputs.',
    }
  } else {
    switch (weakestOversight.id) {
      case 'evaluationStrength':
        failureMode = {
          name: 'Evaluator Collapse',
          why: 'The scoring function cannot keep pace with model capability. What gets measured stops matching what matters. The system optimizes for the metric rather than the underlying goal.',
        }
        break
      case 'security':
        failureMode = {
          name: 'Unconstrained Action Scope',
          why: 'Agent actions are not well-bounded. A capable model with broad tool access and weak containment can take unintended, irreversible actions before any human review step triggers.',
        }
        break
      case 'governance':
        failureMode = {
          name: 'Rate Invisibility',
          why: 'No shared mechanism for measuring or slowing the aggregate rate of AI R&D acceleration across labs. Each organization proceeds independently, making the overall rate invisible to any single observer.',
        }
        break
      default:
        failureMode = {
          name: 'Verification Overhead',
          why: 'Human review capacity is the binding constraint. Volume of AI output exceeds the bandwidth for meaningful oversight. Approval becomes a rubber stamp rather than a genuine check.',
        }
    }
  }

  return { acceleration, oversightCapacity, oversightDebt, rsiProximity, warningLevel, bottleneck, failureMode }
}

// ─────────────────────────────────────────────────────────
// WARNING CONFIG
// ─────────────────────────────────────────────────────────

const WARNING = {
  low: {
    label: 'Low',
    color: '#6B8A6B',
    bg: '#6B8A6B0F',
    border: '#6B8A6B50',
    description: 'Oversight capacity is keeping pace with acceleration. Normal operations within a manageable range.',
  },
  medium: {
    label: 'Medium',
    color: '#D4A853',
    bg: '#D4A8530F',
    border: '#D4A85350',
    description: 'Acceleration is beginning to outpace some oversight dimensions. Worth monitoring closely.',
  },
  high: {
    label: 'High',
    color: '#C47C5A',
    bg: '#C47C5A0F',
    border: '#C47C5A50',
    description: 'Significant oversight deficit. Multiple safety factors are lagging acceleration. Intervention is warranted.',
  },
  critical: {
    label: 'Critical',
    color: '#C2411C',
    bg: '#C2411C0F',
    border: '#C2411C50',
    description: 'Oversight capacity severely lags acceleration. The loop may close without adequate human visibility or control.',
  },
} as const

// ─────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────

function SimSlider({
  def,
  value,
  onChange,
}: {
  def: SliderDef
  value: number
  onChange: (v: number) => void
}) {
  const pct = (value / 10) * 100

  return (
    <div className="py-3.5 border-b border-border last:border-b-0">
      <div className="flex items-baseline justify-between mb-0.5">
        <label
          htmlFor={`slider-${def.id}`}
          className="font-sans text-[14px] font-semibold text-primary cursor-pointer"
        >
          {def.label}
        </label>
        <span
          className="font-mono text-[14px] font-semibold tabular-nums ml-4 flex-shrink-0"
          style={{ color: def.color }}
          aria-live="polite"
          aria-label={`${def.label} value: ${value} out of 10`}
        >
          {value}
          <span className="text-[#8A8880] font-normal text-[12px]">/10</span>
        </span>
      </div>
      <p className="font-sans text-[12px] leading-[1.55] mb-2.5" style={{ color: '#8A8880' }}>
        {def.description}
      </p>
      <input
        id={`slider-${def.id}`}
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="sim-slider"
        aria-label={`${def.label}: ${value} out of 10`}
        style={{
          '--thumb-color': def.color,
          '--thumb-glow': `${def.color}30`,
          background: `linear-gradient(to right, ${def.color} 0%, ${def.color} ${pct}%, #E4E2DB ${pct}%, #E4E2DB 100%)`,
        } as React.CSSProperties}
      />
    </div>
  )
}

function OutputBar({
  label,
  value,
  color,
  annotate,
}: {
  label: string
  value: number
  color: string
  annotate?: string
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#8A8880' }}>
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          {annotate && (
            <span className="font-mono text-[10px] tracking-wide" style={{ color }}>
              {annotate}
            </span>
          )}
          <span
            className="font-sans text-[24px] font-semibold tabular-nums leading-none"
            style={{ color }}
          >
            {value}
          </span>
        </div>
      </div>
      <div className="h-[3px] w-full" style={{ background: '#E4E2DB', borderRadius: '2px' }}>
        <motion.div
          className="h-full"
          style={{ background: color, borderRadius: '2px' }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────

export function BottleneckSimulator() {
  const [state, setState] = useState<SimState>(INITIAL_STATE)
  const outputs = useMemo(() => computeOutputs(state), [state])

  function set(id: keyof SimState) {
    return (val: number) => setState((prev) => ({ ...prev, [id]: val }))
  }

  const w = WARNING[outputs.warningLevel]
  const capSliders = SLIDERS.filter((s) => s.group === 'capability')
  const ovsSliders = SLIDERS.filter((s) => s.group === 'oversight')

  return (
    <SectionWrapper id="bottlenecks" label="Bottleneck Simulator" fullWidth>

      {/* ── Intro at prose width ── */}
      <div className="max-w-[720px] mx-auto px-6">
        <SectionHeading n={4}>Bottleneck Simulator</SectionHeading>

        {/* Disclaimer banner */}
        <div
          className="flex items-start gap-3 px-4 py-3 mb-8 border-l-[3px]"
          style={{ borderLeftColor: '#D4A853', background: '#D4A85308' }}
        >
          <span
            className="font-mono text-[10px] tracking-widest uppercase flex-shrink-0 mt-[2px]"
            style={{ color: '#D4A853' }}
          >
            Toy Model
          </span>
          <p className="font-sans text-[13px] leading-[1.65]" style={{ color: '#5C5A54' }}>
            This is a toy model for intuition, not a forecast. Formulas are intentionally
            simplified and fully transparent in the source code. Vary the sliders to
            explore how acceleration and oversight interact. Do not treat any output
            as a prediction.
          </p>
        </div>

        <Prose>
          <p>
            The four capability inputs drive acceleration: how fast the AI R&D loop
            can run. The four oversight inputs set how much capacity exists to monitor
            and control that speed. When acceleration exceeds oversight capacity,
            the gap is the core risk. The derived outputs show what happens as that
            gap grows.
          </p>
        </Prose>
      </div>

      {/* ── Simulator grid at wider width ── */}
      <div className="max-w-[960px] mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_304px] gap-6 items-start">

          {/* ─── LEFT: Sliders ─── */}
          <div className="flex flex-col gap-5">

            {/* Capability group */}
            <div className="border border-border" style={{ background: '#FFFFFF' }}>
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: CAP_COLOR }}
                />
                <span
                  className="font-mono text-[11px] tracking-widest uppercase"
                  style={{ color: CAP_COLOR }}
                >
                  AI Capability Inputs
                </span>
                <span className="font-mono text-[10px] ml-auto" style={{ color: '#8A8880' }}>
                  drives acceleration
                </span>
              </div>
              <div className="px-5">
                {capSliders.map((def) => (
                  <SimSlider
                    key={def.id}
                    def={def}
                    value={state[def.id]}
                    onChange={set(def.id)}
                  />
                ))}
              </div>
            </div>

            {/* Oversight group */}
            <div className="border border-border" style={{ background: '#FFFFFF' }}>
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border">
                <span
                  className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: OVS_COLOR }}
                />
                <span
                  className="font-mono text-[11px] tracking-widest uppercase"
                  style={{ color: OVS_COLOR }}
                >
                  Oversight Capacity Inputs
                </span>
                <span className="font-mono text-[10px] ml-auto" style={{ color: '#8A8880' }}>
                  resists runaway
                </span>
              </div>
              <div className="px-5">
                {ovsSliders.map((def) => (
                  <SimSlider
                    key={def.id}
                    def={def}
                    value={state[def.id]}
                    onChange={set(def.id)}
                  />
                ))}
              </div>
            </div>

            {/* Reset */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setState(INITIAL_STATE)}
                className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: '#8A8880', outlineColor: '#8A8880' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#5C5A54')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8880')}
              >
                Reset to defaults
              </button>
            </div>
          </div>

          {/* ─── RIGHT: Outputs ─── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-[72px]">

            {/* Acceleration + Oversight bars */}
            <div className="border border-border px-5 py-5" style={{ background: '#FFFFFF' }}>
              <p className="font-mono text-[11px] tracking-widest uppercase mb-4" style={{ color: '#8A8880' }}>
                Derived Outputs
              </p>

              <div className="flex flex-col gap-4 mb-4">
                <OutputBar
                  label="Acceleration"
                  value={outputs.acceleration}
                  color={CAP_COLOR}
                />
                <OutputBar
                  label="Oversight"
                  value={outputs.oversightCapacity}
                  color={OVS_COLOR}
                />
              </div>

              {/* Gap visualization */}
              <div className="relative h-[2px] w-full mb-4" style={{ background: '#E4E2DB' }}>
                {outputs.oversightDebt > 0 && (
                  <motion.div
                    className="absolute h-full"
                    style={{
                      left: `${outputs.oversightCapacity}%`,
                      background: '#C2411C',
                    }}
                    animate={{ width: `${Math.min(outputs.oversightDebt, 100 - outputs.oversightCapacity)}%` }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
              </div>

              {/* Oversight debt row */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#8A8880' }}>
                    Oversight Debt
                  </span>
                  <p className="font-sans text-[11px] mt-0.5" style={{ color: '#8A8880' }}>
                    acceleration minus oversight
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={outputs.oversightDebt}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="font-sans text-[28px] font-semibold tabular-nums leading-none"
                    style={{ color: outputs.oversightDebt > 0 ? '#C2411C' : '#6B8A6B' }}
                  >
                    {outputs.oversightDebt > 0 ? `+${outputs.oversightDebt}` : '0'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Warning Level */}
            <AnimatePresence mode="wait">
              <motion.div
                key={outputs.warningLevel}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="border-2 px-5 py-4"
                style={{ borderColor: w.border, background: w.bg }}
              >
                <p
                  className="font-mono text-[11px] tracking-widest uppercase mb-1"
                  style={{ color: w.color }}
                >
                  RSI Warning Level
                </p>
                <p
                  className="font-sans font-bold leading-none mb-2"
                  style={{ fontSize: '36px', color: w.color }}
                >
                  {w.label.toUpperCase()}
                </p>
                <p className="font-sans text-[13px] leading-[1.6]" style={{ color: '#5C5A54' }}>
                  {w.description}
                </p>

                <div
                  className="flex items-center justify-between mt-3 pt-3 border-t"
                  style={{ borderColor: `${w.color}28` }}
                >
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#8A8880' }}>
                    RSI Proximity
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-[3px]" style={{ background: '#E4E2DB', borderRadius: '2px' }}>
                      <motion.div
                        className="h-full"
                        style={{ background: w.color, borderRadius: '2px' }}
                        animate={{ width: `${outputs.rsiProximity}%` }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                    <span
                      className="font-mono text-[13px] font-semibold tabular-nums"
                      style={{ color: w.color }}
                    >
                      {outputs.rsiProximity}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Current Bottleneck */}
            <div className="border border-border px-5 py-4" style={{ background: '#FFFFFF' }}>
              <p className="font-mono text-[11px] tracking-widest uppercase mb-2.5" style={{ color: '#8A8880' }}>
                Current Bottleneck
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={outputs.bottleneck.label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-sans text-[14px] font-semibold text-primary leading-snug">
                      {outputs.bottleneck.label}
                    </p>
                    <span
                      className="font-mono text-[12px] font-semibold tabular-nums px-2 py-0.5 flex-shrink-0"
                      style={{
                        color: outputs.bottleneck.group === 'oversight' ? OVS_COLOR : CAP_COLOR,
                        background: outputs.bottleneck.group === 'oversight' ? `${OVS_COLOR}18` : `${CAP_COLOR}18`,
                      }}
                    >
                      {outputs.bottleneck.value}/10
                    </span>
                  </div>
                  <p
                    className="font-mono text-[10px] tracking-widest uppercase mt-1"
                    style={{ color: outputs.bottleneck.group === 'oversight' ? OVS_COLOR : CAP_COLOR }}
                  >
                    {outputs.bottleneck.group === 'oversight' ? 'weakest safety factor' : 'limiting capability factor'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Most Likely Failure Mode */}
            <AnimatePresence mode="wait">
              <motion.div
                key={outputs.failureMode.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border border-border px-5 py-4"
                style={{ background: '#FFFFFF' }}
              >
                <p className="font-mono text-[11px] tracking-widest uppercase mb-2.5" style={{ color: '#8A8880' }}>
                  Most Likely Failure Mode
                </p>
                <p className="font-sans text-[15px] font-semibold text-primary mb-2 leading-snug">
                  {outputs.failureMode.name}
                </p>
                <p className="font-serif text-[13px] leading-[1.7]" style={{ color: '#5C5A54' }}>
                  {outputs.failureMode.why}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Closing prose ── */}
        <div className="max-w-[720px] mt-10 border-t border-border pt-8">
          <Prose>
            <p>
              Research judgment is the deepest bottleneck this simulator cannot quantify.
              No slider captures whether the AI system knows which problem is worth
              working on. Anthropic notes that "large performance gaps persist when it
              comes to Claude exercising judgement in choosing goals in both engineering
              and research." As of April 2026, humans still chose the research problem
              and defined the scoring rubric in every published experiment.
            </p>
          </Prose>
        </div>
      </div>
    </SectionWrapper>
  )
}
