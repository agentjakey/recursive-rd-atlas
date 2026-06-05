'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Prose, Callout } from '@/components/ui/Typography'
import { LOOP_NODES, type LoopNode } from '@/lib/data'

// Ellipse geometry: center (330, 250), rx=245, ry=178, viewBox 660x500.
// 7 nodes evenly spaced from top (-90deg), clockwise, step=51.43deg.
const SVG_W = 660
const SVG_H = 500
const CX = 330
const CY = 250
const RX = 245
const RY = 178

// Precomputed node positions on the ellipse (SVG pixel coords)
const NODE_SVG = [
  { x: 330, y: 72 },   // 0: Model
  { x: 522, y: 139 },  // 1: Agent Scaffold
  { x: 569, y: 290 },  // 2: Code / Experiment
  { x: 437, y: 410 },  // 3: Evaluation
  { x: 223, y: 410 },  // 4: Research Decision
  { x: 91,  y: 290 },  // 5: Training Run
  { x: 138, y: 139 },  // 6: New Model
] as const

// Midpoints between adjacent nodes on the ellipse, with clockwise tangent rotation
const ARROW_MIDS = [
  { x: 437, y: 90,  rot: 19.2 },   // 0 -> 1
  { x: 569, y: 210, rot: 72.4 },   // 1 -> 2
  { x: 522, y: 361, rot: 137.8 },  // 2 -> 3
  { x: 330, y: 428, rot: 180 },    // 3 -> 4
  { x: 138, y: 361, rot: 222.2 },  // 4 -> 5
  { x: 91,  y: 210, rot: 287.6 },  // 5 -> 6
  { x: 223, y: 90,  rot: 340.8 },  // 6 -> 0
] as const

// Convert SVG pixel coords to % for HTML absolute positioning
function toPct(svgX: number, svgY: number) {
  return {
    left: `${(svgX / SVG_W) * 100}%`,
    top: `${(svgY / SVG_H) * 100}%`,
  }
}

// Shared field label style
function FieldLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-2">
      {children}
    </p>
  )
}

// Detail panel rendered below both layouts
function DetailPanel({ node }: { node: LoopNode }) {
  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-6 border"
      style={{ background: '#FFFFFF', borderColor: node.color }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4 border-b border-border"
        style={{ borderBottomColor: `${node.color}40` }}
      >
        <span
          className="inline-flex items-center justify-center w-9 h-9 font-mono text-[11px] font-semibold flex-shrink-0"
          style={{ background: `${node.color}18`, color: node.color }}
        >
          {String(node.index + 1).padStart(2, '0')}
        </span>
        <span
          className="font-sans text-[18px] font-semibold leading-snug"
          style={{ color: node.color }}
        >
          {node.label}
        </span>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* What happens here */}
        <div>
          <FieldLabel>What happens here</FieldLabel>
          <p className="font-serif text-[17px] text-primary leading-[1.8]">
            {node.what}
          </p>
        </div>

        {/* Automated today + Still human */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-border pt-5">
          <div>
            <FieldLabel>Automated today</FieldLabel>
            <p className="font-sans text-[14px] text-secondary leading-[1.75]">
              {node.automated}
            </p>
          </div>
          <div>
            <FieldLabel>Still depends on humans</FieldLabel>
            <p className="font-sans text-[14px] text-secondary leading-[1.75]">
              {node.humanDependent}
            </p>
          </div>
        </div>

        {/* Danger */}
        <div className="border-t border-border pt-5">
          <FieldLabel>Dangerous if automated poorly</FieldLabel>
          <p className="font-serif text-[15px] text-secondary leading-[1.75]">
            {node.danger}
          </p>
        </div>

        {/* Warning signs */}
        <div className="border-t border-border pt-5">
          <FieldLabel>Warning signs</FieldLabel>
          <ul className="space-y-2">
            {node.warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0 mt-[7px] w-[5px] h-[5px] rounded-full"
                  style={{ background: node.color }}
                />
                <p className="font-sans text-[14px] text-secondary leading-[1.75]">{w}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export function LoopMap() {
  const [selected, setSelected] = useState<string>('model')
  const selectedNode = LOOP_NODES.find((n) => n.id === selected) ?? LOOP_NODES[0]

  function toggle(id: string) {
    setSelected(id)
  }

  return (
    <SectionWrapper id="loop" label="The AI R&D Loop">
      <SectionHeading n={3}>The Recursive R&D Loop</SectionHeading>

      <Prose>
        <p>
          The loop from model to model is not hypothetical. Each stage exists today
          in some form. What varies is the degree of human involvement at each node.
          Select any node to see what is automated, where humans remain critical,
          and where risks concentrate if that human involvement is removed.
        </p>
      </Prose>

      {/* ---- DESKTOP DIAGRAM (md+) ---- */}
      <div className="relative hidden md:block mt-10" style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}>

        {/* SVG layer: ellipse path + directional triangle markers */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Defs: glow filter for active node ring */}
          <defs>
            <filter id="loop-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background loop ellipse */}
          <ellipse
            cx={CX} cy={CY} rx={RX} ry={RY}
            fill="none"
            stroke="#E4E2DB"
            strokeWidth="1.5"
            strokeDasharray="5 8"
          />

          {/* Active node glow ring (behind node button) */}
          <circle
            cx={NODE_SVG[selectedNode.index].x}
            cy={NODE_SVG[selectedNode.index].y}
            r={44}
            fill={`${selectedNode.color}14`}
            stroke={selectedNode.color}
            strokeWidth="1.5"
            filter="url(#loop-glow)"
            style={{ transition: 'all 0.25s ease' }}
          />

          {/* Directional arrow triangles at arc midpoints */}
          {ARROW_MIDS.map((mid, i) => (
            <polygon
              key={i}
              points="-6,-3.5 6,0 -6,3.5"
              fill="#C8C5BE"
              transform={`translate(${mid.x}, ${mid.y}) rotate(${mid.rot})`}
            />
          ))}
        </svg>

        {/* HTML node buttons (positioned absolutely over SVG) */}
        {LOOP_NODES.map((node) => {
          const pos = toPct(NODE_SVG[node.index].x, NODE_SVG[node.index].y)
          const isActive = selected === node.id

          return (
            <button
              key={node.id}
              type="button"
              aria-label={`${node.label}: click to see loop details`}
              aria-pressed={isActive}
              onClick={() => toggle(node.id)}
              className="absolute flex flex-col items-center justify-center text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                left: pos.left,
                top: pos.top,
                transform: 'translate(-50%, -50%)',
                width: '92px',
                minHeight: '48px',
                padding: '8px 6px',
                background: isActive ? '#FFFFFF' : '#FAFAF8',
                border: `1.5px solid ${isActive ? node.color : '#D8D5CE'}`,
                boxShadow: isActive
                  ? `0 0 0 2px ${node.color}50, 0 0 22px 6px ${node.color}30`
                  : '0 1px 3px rgba(0,0,0,0.06)',
                zIndex: isActive ? 20 : 10,
                outlineColor: node.color,
              }}
            >
              <span
                className="font-mono leading-none"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? node.color : '#8A8880',
                  marginBottom: '3px',
                }}
              >
                {String(node.index + 1).padStart(2, '0')}
              </span>
              <span
                className="font-sans font-semibold leading-tight"
                style={{
                  fontSize: '12px',
                  color: isActive ? node.color : '#1A1915',
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {node.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* ---- MOBILE LAYOUT (< md): vertical flowchart ---- */}
      <div className="md:hidden mt-8">
        <div className="flex flex-col">
          {LOOP_NODES.map((node, i) => {
            const isActive = selected === node.id
            const isLast = i === LOOP_NODES.length - 1

            return (
              <div key={node.id} className="flex flex-col items-stretch">
                <button
                  type="button"
                  aria-label={`${node.label}: click to see loop details`}
                  aria-pressed={isActive}
                  onClick={() => toggle(node.id)}
                  className="flex items-center gap-3 text-left border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: isActive ? '#FFFFFF' : 'transparent',
                    borderColor: isActive ? node.color : '#E4E2DB',
                    boxShadow: isActive ? `0 0 0 1px ${node.color}40, 0 0 14px 3px ${node.color}20` : 'none',
                    padding: '14px 16px',
                    outlineColor: node.color,
                  }}
                >
                  {/* Index bubble */}
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-9 h-9 font-mono text-[11px] font-semibold"
                    style={{
                      background: isActive ? `${node.color}22` : '#F2F0EB',
                      color: isActive ? node.color : '#8A8880',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span
                    className="font-sans text-[15px] font-semibold leading-snug"
                    style={{ color: isActive ? node.color : '#1A1915' }}
                  >
                    {node.label}
                  </span>

                  {isActive && (
                    <span
                      className="ml-auto font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: node.color }}
                    >
                      selected
                    </span>
                  )}
                </button>

                {/* Connector arrow */}
                {!isLast ? (
                  <div className="flex justify-start pl-[26px] py-1">
                    <svg width="14" height="20" viewBox="0 0 14 20" aria-hidden="true">
                      <line x1="7" y1="0" x2="7" y2="13" stroke="#E4E2DB" strokeWidth="1.5" />
                      <polygon points="2,10 7,19 12,10" fill="#D0CCC5" />
                    </svg>
                  </div>
                ) : (
                  /* Loop-back indicator after last node */
                  <div className="flex items-center gap-2 mt-3 ml-1 pl-2 border-l-2 border-dashed border-border pb-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M12 2 C12 2 13 7 8 10 C3 13 1 10 1 7 C1 4 3 2 6 2 L4 0 M6 2 L4 4"
                        stroke="#C0BDB6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-mono text-[11px] text-[#8A8880] tracking-widest uppercase">
                      loops back to Model
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ---- DETAIL PANEL (both layouts) ---- */}
      <AnimatePresence mode="wait">
        <DetailPanel key={selectedNode.id} node={selectedNode} />
      </AnimatePresence>

      <Callout variant="warning">
        The Research Decision node is where the loop either stays open or closes.
        As of April 2026, Claude beat human research step choices 64% of the time,
        up from 51% five months earlier. Humans still chose which problem to work
        on and defined what success meant. That boundary has not moved. When it does,
        the nature of the loop changes.
      </Callout>
    </SectionWrapper>
  )
}
