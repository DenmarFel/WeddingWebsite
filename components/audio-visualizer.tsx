"use client"

import { useEffect, useRef } from "react"
import { useAudio } from "@/contexts/audio-context"
import { useAccess } from "@/contexts/access-context"

export function AudioVisualizer() {
  const { isMuted, toggleMute } = useAudio()
  const { accessLevel } = useAccess()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    // Don't show visualizer until user has entered the site
    if (!accessLevel || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(draw)

      if (!timeRef.current) timeRef.current = timestamp
      const elapsed = timestamp - timeRef.current

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw 5 bars with animated heights
      const barCount = 5
      const barWidth = 3
      const gap = 2
      const startX = 0

      for (let i = 0; i < barCount; i++) {
        // Each bar has different animation speed and phase
        const speed = 0.002 + i * 0.0005
        const phase = i * 0.5
        const minHeight = 8
        const maxHeight = 20

        // When muted, bars stay at minimum height
        const targetHeight = isMuted
          ? minHeight
          : minHeight + (Math.sin(elapsed * speed + phase) * 0.5 + 0.5) * (maxHeight - minHeight)

        const x = startX + i * (barWidth + gap)
        const y = (24 - targetHeight) / 2

        // Use white for perfect mix-blend-difference logic
        // ctx.fillStyle = "#ffffff"
        ctx.fillRect(x, y, barWidth, targetHeight)
      }
    }

    draw(0)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMuted, accessLevel])

  // Don't render until user has entered the site
  if (!accessLevel) return null

  return (
    <button
      onClick={toggleMute}
      className="fixed top-0 right-6 z-[60] h-[64px] flex items-center justify-center bg-transparent border-none mix-blend-difference nav-button cursor-pointer outline-none"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      title={isMuted ? "Click to unmute" : "Click to mute"}
    >
      {/* Canvas Visualizer */}
      <canvas ref={canvasRef} width="28" height="24" className="transition-opacity duration-300 invert" />
    </button>
  )
}
