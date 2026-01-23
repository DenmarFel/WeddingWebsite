"use client"

import { useState } from "react"
import { useAccess } from "@/contexts/access-context"
import { useAudio } from "@/contexts/audio-context"
import { useTheme } from "@/contexts/theme-context"

/*
  DEBUG CONTROLS
  --------------
  A floating debug panel to help you test different access levels and reset the form.
  Remove this component in production or set SHOW_DEBUG to false.
*/

const SHOW_DEBUG = true // Set to false to hide debug controls

export function DebugControls() {
  const { accessLevel, resetAccess } = useAccess()
  const { volume, setVolume } = useAudio()
  const { colorScheme, setColorScheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  if (!SHOW_DEBUG) return null

  const clearRsvpData = () => {
    localStorage.removeItem("rsvp-submitted")
    window.location.reload()
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-destructive/90 transition-colors text-sm font-mono"
        >
          Debug
        </button>
      )}

      {/* Debug Panel */}
      {isOpen && (
        <div className="bg-card border-2 border-destructive rounded-lg shadow-2xl p-4 w-72">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-sm font-semibold">Debug Controls</h3>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {/* Current Status */}
            <div className="bg-muted/50 p-2 rounded">
              <div className="text-muted-foreground mb-1">Status:</div>
              <div className="font-semibold">
                {accessLevel === "guest" && "✓ Guest Access"}
                {accessLevel === "visitor" && "✓ Visitor Access"}
                {!accessLevel && "⊘ No Access"}
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Volume:</span>
                <span className="font-semibold">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Color Scheme Selector */}
            <div className="bg-muted/50 p-3 rounded space-y-2">
              <div className="text-muted-foreground mb-2">Color Scheme:</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setColorScheme("default")}
                  className={`py-2 px-3 rounded text-xs transition-colors ${
                    colorScheme === "default"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => setColorScheme("blush")}
                  className={`py-2 px-3 rounded text-xs transition-colors ${
                    colorScheme === "blush"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Blush Rose
                </button>
                <button
                  onClick={() => setColorScheme("sage")}
                  className={`py-2 px-3 rounded text-xs transition-colors ${
                    colorScheme === "sage"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Sage Green
                </button>
                <button
                  onClick={() => setColorScheme("lavender")}
                  className={`py-2 px-3 rounded text-xs transition-colors ${
                    colorScheme === "lavender"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Lavender
                </button>
                <button
                  onClick={() => setColorScheme("ocean")}
                  className={`py-2 px-3 rounded text-xs transition-colors ${
                    colorScheme === "ocean"
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  Ocean Blue
                </button>
              </div>
            </div>

            {/* Reset Access */}
            <button
              onClick={resetAccess}
              className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-700 dark:text-orange-300 py-2 rounded transition-colors"
            >
              Reset Access Gate
            </button>

            {/* Clear RSVP */}
            <button
              onClick={clearRsvpData}
              className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 py-2 rounded transition-colors"
            >
              Clear RSVP Data
            </button>

            {/* Refresh Page */}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 py-2 rounded transition-colors"
            >
              Reload Page
            </button>

            <div className="text-[10px] text-muted-foreground pt-2 border-t border-border">
              Set SHOW_DEBUG to false in debug-controls.tsx to hide this panel
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
