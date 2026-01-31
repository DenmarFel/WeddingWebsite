"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface EntryOverlayProps {
  onEnter: (soundEnabled: boolean) => void
}

export function EntryOverlay({ onEnter }: EntryOverlayProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleEnter = () => {
    setIsExiting(true)
    // Wait for transition to complete before calling onEnter
    setTimeout(() => {
      onEnter(soundEnabled)
    }, 800) // Match transition duration
  }

  return (
    <div 
      className={`fixed inset-0 z-[38] flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Blurred background layer - sits between background and sticky header text */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isExiting ? 'backdrop-blur-none bg-black/0' : 'backdrop-blur-md bg-black/20'
        }`}
      />
      
      {/* Enter button - centered on screen */}
      <Button
        onClick={handleEnter}
        variant="outline"
        size="lg"
        className={`relative bg-transparent border border-white text-white hover:bg-white/10 hover:text-white text-2xl px-16 py-10 z-10 font-serif min-w-[200px] transition-opacity duration-700 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Enter
      </Button>

      {/* Sound toggle - bottom of page */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-10 px-6 py-2 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm text-white/70 text-sm font-body transition-all duration-300 hover:bg-white/10 hover:text-white/90 hover:border-white/60 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full transition-colors ${soundEnabled ? 'bg-green-400' : 'bg-white/40'}`} />
          Sound {soundEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </button>
    </div>
  )
}
