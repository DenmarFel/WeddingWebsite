"use client"

import { useEffect, useState } from "react"
import { SaveTheDateBadge } from "./save-the-date-badge"
import { StickyHeader } from "./sticky-header"

const LINES = [
  "Doors open at 4:00\u00A0PM",
  "Ceremony begins promptly at 4:30\u00A0PM",
]

const DISPLAY_DURATION = 3500
const FADE_DURATION = 1200

function FadingText() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hold = setTimeout(() => {
      setVisible(false)
      const next = setTimeout(() => {
        setIndex((i) => (i + 1) % LINES.length)
        setVisible(true)
      }, FADE_DURATION)
      return () => clearTimeout(next)
    }, DISPLAY_DURATION)

    return () => clearTimeout(hold)
  }, [index])

  return (
    <div
      className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-3 py-2"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      <p className="text-white text-sm md:text-base font-light tracking-wide leading-relaxed">
        {LINES[index]}
      </p>
    </div>
  )
}

interface HeroSectionProps {
  hasEntered?: boolean
}

export function HeroSection({ hasEntered = true }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="/cover-landscape.jpeg" alt="Charlene and Denmar" className="w-full h-full object-cover" />
      </div>
      
      <StickyHeader hasEntered={hasEntered} />

      {/* Shared bottom anchor line — both items centered on it via translateY(50%) */}
      <div className="absolute bottom-16 md:bottom-20 left-6 md:left-12 z-30 max-w-[38%] translate-y-1/2">
        <FadingText />
      </div>

      <div className="absolute bottom-16 md:bottom-20 right-6 md:right-12 z-30 translate-y-1/2">
        <SaveTheDateBadge />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
