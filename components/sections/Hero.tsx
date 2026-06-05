'use client'

import { motion } from 'framer-motion'
import { MetricCard } from '@/components/ui/MetricCard'

// ─────────────────────────────────────────────────────────
// HERO LOOP DIAGRAM
// Conceptual schematic only. Six nodes on an ellipse,
// placed at 60-degree intervals clockwise from the top.
// ViewBox 500x375, ellipse cx=250 cy=188 rx=185 ry=134.
// ─────────────────────────────────────────────────────────

const NODES = [
  { label: 'Model',      cx: 250, cy: 54,  color: '#4E8098', lx: 250, ly: 30,  anchor: 'middle' },
  { label: 'Agent',      cx: 410, cy: 121, color: '#9B7EBD', lx: 425, ly: 125, anchor: 'start'  },
  { label: 'Experiment', cx: 410, cy: 255, color: '#D4A853', lx: 425, ly: 259, anchor: 'start'  },
  { label: 'Evaluation', cx: 250, cy: 322, color: '#C47C5A', lx: 250, ly: 345, anchor: 'middle' },
  { label: 'Training',   cx: 90,  cy: 255, color: '#6B8A6B', lx: 75,  ly: 259, anchor: 'end'    },
  { label: 'New Model',  cx: 90,  cy: 121, color: '#C2411C', lx: 75,  ly: 125, anchor: 'end'    },
] as const

// Arc midpoints at -60, 0, 60, 120, 180, 240 degrees with clockwise tangent rotation
const ARROWS = [
  { x: 343, y: 72,  rot: 30  },
  { x: 435, y: 188, rot: 90  },
  { x: 343, y: 304, rot: 150 },
  { x: 157, y: 304, rot: 210 },
  { x: 65,  y: 188, rot: 270 },
  { x: 157, y: 72,  rot: 330 },
] as const

function HeroLoopDiagram() {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-5" style={{ color: '#AEABA4' }}>
        The AI R&D Loop (Conceptual)
      </p>
      <svg
        viewBox="0 0 500 375"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label="Conceptual loop diagram: six nodes in a cycle from Model through Agent, Experiment, Evaluation, Training, and New Model, then back to Model"
        role="img"
      >
        <defs>
          <filter id="hero-dot-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ellipse path */}
        <ellipse
          cx={250} cy={188} rx={185} ry={134}
          fill="none"
          stroke="#DDD9D1"
          strokeWidth="1"
          strokeDasharray="4 7"
        />

        {/* Arrow triangles at arc midpoints */}
        {ARROWS.map((a, i) => (
          <polygon
            key={i}
            points="-5,-2.8 5,0 -5,2.8"
            fill="#C4C0B8"
            transform={`translate(${a.x},${a.y}) rotate(${a.rot})`}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={i}>
            <circle
              cx={node.cx} cy={node.cy} r={11}
              fill={`${node.color}18`}
              stroke={node.color}
              strokeWidth="1.5"
              filter="url(#hero-dot-glow)"
            />
            <circle
              cx={node.cx} cy={node.cy} r={4.5}
              fill={node.color}
            />
            <text
              x={node.lx}
              y={node.ly}
              textAnchor={node.anchor as 'middle' | 'start' | 'end'}
              fill="#5C5A54"
              fontSize="10.5"
              letterSpacing="0.04em"
              style={{ fontFamily: 'var(--font-dm-mono, "DM Mono", monospace)' }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <p className="font-mono text-[10px] text-[#AEABA4] tracking-[0.1em] uppercase text-center mt-4">
        Section 03 has interactive detail
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section id="hero" className="border-b border-border">
      <div className="max-w-[1100px] mx-auto px-8 pt-[88px] pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-x-16 items-start">

          {/* ── Left: Text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Author label */}
            <motion.p
              variants={item}
              className="font-mono text-accent"
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '36px',
              }}
            >
              <a
                href="https://agentjakey.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity duration-150"
              >
                Latent Space Lab
              </a>
              {' '}&middot; Jacob Ortiz
            </motion.p>

            {/* Headline */}
            <motion.div variants={item}>
              <h1
                className="font-sans font-bold text-primary"
                style={{
                  fontSize: 'clamp(40px, 5.8vw, 64px)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                }}
              >
                Recursive R&D Atlas
              </h1>
              <p
                className="font-sans font-normal text-secondary"
                style={{
                  fontSize: 'clamp(16px, 2vw, 21px)',
                  marginTop: '14px',
                  lineHeight: 1.45,
                }}
              >
                Mapping the path from AI-assisted coding to AI-driven research.
              </p>
            </motion.div>

            {/* Mobile diagram: shown between headline and body on sm and md screens */}
            <motion.div variants={item} className="lg:hidden my-8 max-w-[420px]">
              <HeroLoopDiagram />
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={item}
              className="border-l-[2px] pl-5 py-0.5"
              style={{ borderLeftColor: '#E4E2DB', marginTop: '32px' }}
            >
              <p
                className="font-serif italic text-secondary"
                style={{ fontSize: '17px', lineHeight: 1.75 }}
              >
                &ldquo;We are not there yet, and recursive self-improvement is not
                inevitable.&rdquo;
              </p>
              <p className="font-sans text-[12px] mt-2" style={{ color: '#8A8880' }}>
                Anthropic Institute, May 2026
              </p>
            </motion.div>

            {/* Body */}
            <motion.p
              variants={item}
              className="font-serif text-primary"
              style={{ fontSize: '18px', lineHeight: 1.85, marginTop: '28px' }}
            >
              Something is happening. Over 80% of Anthropic&apos;s merged production code is
              authored by Claude. The time horizon for autonomous task completion grew from
              4 minutes to 12 hours in two years. AI systems are beginning to participate
              in research decisions. None of this is recursive self-improvement. The path
              is visible and the gaps are measurable. This project maps what the evidence
              actually says.
            </motion.p>

            {/* Metric cards */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border mt-10 pt-8"
            >
              <MetricCard
                label="AI Code Authorship"
                value="80%+"
                subLabel="Anthropic, May 2026"
                accent="#4E8098"
              />
              <MetricCard
                label="Task Horizon"
                value="12 hrs"
                subLabel="from 4 min, Mar 2024"
                accent="#9B7EBD"
              />
              <MetricCard
                label="Research Step Selection"
                value="64%"
                subLabel="beats humans, Apr 2026"
                accent="#D4A853"
              />
            </motion.div>

            {/* Caption */}
            <motion.p
              variants={item}
              className="font-sans text-[13px] mt-4"
              style={{ color: '#8A8880' }}
            >
              ~12 min read &middot; Sources: Anthropic Institute, METR &middot;{' '}
              <span
                className="font-mono text-[11px] tracking-wide uppercase"
                style={{ color: '#AEABA4' }}
              >
                Educational tool, not a forecast
              </span>
            </motion.p>
          </motion.div>

          {/* ── Right: Loop diagram (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:block lg:sticky lg:top-[72px] pt-10"
          >
            <HeroLoopDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
