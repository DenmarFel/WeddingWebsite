"use client"

import { useState, useEffect, useRef } from "react"
import { WeddingMap } from "./wedding-map"
import { downloadICSFile, getGoogleCalendarUrl } from "@/lib/calendar-utils"

export function DetailsSection() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAppleCalendar = (e: React.MouseEvent) => {
    e.preventDefault()
    downloadICSFile()
    setIsOpen(false)
  }

  const handleGoogleCalendar = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(getGoogleCalendarUrl(), "_blank", "noopener,noreferrer")
    setIsOpen(false)
  }

  return (
    <section id="details" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* THE CLEANED-UP HEADER BLOCK */}
        <div className="text-center space-y-12 mb-16">
          
          {/* Section 1: Introduction */}
          <header className="space-y-4">
            <p className="text-[0.75rem] uppercase tracking-[0.3em] text-foreground/60 font-medium">
              Please join Charlene and Denmar as they say &quot;I do&quot; on
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-serif font-normal text-foreground tracking-tight leading-none">
              Saturday, May 30th, 2026
            </h1>
          </header>

          {/* Section 2: Location */}
          <div className="space-y-3">
            <p className="text-sm italic font-serif text-foreground/60">at</p>
            <h2 className="text-2xl md:text-3xl font-normal text-foreground tracking-wide">
              La Ventura
            </h2>
            <p className="text-[0.95rem] text-foreground/70 font-normal max-w-xs mx-auto leading-relaxed">
              2316 South El Camino Real<br/>
              San Clemente, California
            </p>
          </div>    

          {/* Section 3: The Time (Single source of truth) */}
          <footer className="inline-block border-t border-foreground/20 px-12 pt-8">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-foreground/60 mb-2">
              Doors open at
            </p>
            <p className="text-2xl font-serif font-normal text-foreground mb-6">4:00 PM</p>
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-foreground/60 mb-2">
              Ceremony begins at
            </p>
            <p className="text-2xl font-serif font-normal text-foreground mb-6">4:30 PM</p>
            
            {/* Add to Calendar Dropdown */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-normal tracking-wide text-foreground/80 border border-foreground/30 rounded-lg hover:bg-foreground/10 hover:text-foreground hover:border-foreground/50 transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5"/>
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5"/>
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5"/>
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5"/>
                </svg>
                Add to Calendar
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg shadow-lg bg-card border border-border z-50 overflow-hidden">
                  <div className="flex flex-col">
                    <button
                      onClick={handleAppleCalendar}
                      className="px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Apple Calendar
                    </button>
                    <div className="border-t border-border"></div>
                    <button
                      onClick={handleGoogleCalendar}
                      className="px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google Calendar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </footer>
        </div>

        {/* MAP */}
        <div className="max-w-3xl mx-auto">
          <div>
            <WeddingMap />
          </div>
        </div>
        
      </div>
    </section>
  )
}
