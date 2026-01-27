"use client"

import { CalendarSaveButton } from "./calendar-save-button"
import { SaveTheDateBadge } from "./save-the-date-badge"
import { StickyHeader } from "./sticky-header"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="/cover-landscape.jpeg" alt="Charlene and Denmar" className="w-full h-full object-cover" />
      </div>
      
      <StickyHeader />

      <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-30">
        <SaveTheDateBadge />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
