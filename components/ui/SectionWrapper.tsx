'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  label: string
  children: ReactNode
  fullWidth?: boolean
  className?: string
}

export function SectionWrapper({
  id,
  label,
  children,
  fullWidth = false,
  className = '',
}: SectionWrapperProps) {
  return (
    <section id={id} aria-label={label} className={`border-b border-border ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={fullWidth ? 'py-20' : 'max-w-[720px] mx-auto px-6 py-20'}
      >
        {children}
      </motion.div>
    </section>
  )
}
