'use client'

import { useState } from 'react'
import { NAV_LINKS } from '@/lib/config'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-[#FAFAF8]/90 backdrop-blur-sm"
      style={{ height: '56px' }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-full flex items-center justify-between">
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="font-sans text-[15px] font-semibold text-primary"
          style={{ letterSpacing: '-0.02em' }}
        >
          Recursive R&D Atlas
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-sans text-[12px] text-secondary hover:text-primary transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-8 h-8"
        >
          <span
            className={`block w-5 h-[1.5px] bg-primary origin-center transition-transform duration-200 ${
              open ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-primary transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-primary origin-center transition-transform duration-200 ${
              open ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden border-t border-border bg-[#FAFAF8] overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-8 py-5 grid grid-cols-3 gap-x-4 gap-y-3">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-sans text-[13px] text-secondary hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
