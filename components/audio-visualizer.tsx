"use client"

import { useEffect, useRef } from "react"
import { useAudio } from "@/contexts/audio-context"

export function AudioVisualizer() {
  const { isPlaying, isMuted, toggleMute, resumeAudio } = useAudio()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawStaticBars = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw 5 static bars at minimum height when paused/muted
      const barCount = 5
      const barWidth = 2
      const gap = 2
      const startX = 0
      const minHeight = 8

      for (let i = 0; i < barCount; i++) {
        const x = startX + i * (barWidth + gap)
        const y = (24 - minHeight) / 2
        ctx.fillRect(x, y, barWidth, minHeight)
      }
    }

    const draw = (timestamp: number) => {
      // Only continue animation if playing and not muted
      if (isPlaying && !isMuted) {
        animationRef.current = requestAnimationFrame(draw)
      }

      if (!timeRef.current) timeRef.current = timestamp
      const elapsed = timestamp - timeRef.current

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw 5 bars with animated heights
      const barCount = 5
      const barWidth = 2
      const gap = 2
      const startX = 0

      for (let i = 0; i < barCount; i++) {
        // Each bar has different animation speed and phase
        const speed = 0.002 + i * 0.0005
        const phase = i * 0.5
        const minHeight = 8
        const maxHeight = 20

        // When muted OR not playing, bars stay at minimum height
        const targetHeight = (isMuted || !isPlaying)
          ? minHeight
          : minHeight + (Math.sin(elapsed * speed + phase) * 0.5 + 0.5) * (maxHeight - minHeight)

        const x = startX + i * (barWidth + gap)
        const y = (24 - targetHeight) / 2

        ctx.fillRect(x, y, barWidth, targetHeight)
      }
    }

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }

    if (isPlaying && !isMuted) {
      // Start animation if playing and not muted
      draw(0)
    } else {
      // Draw static bars if paused or muted
      drawStaticBars()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, isMuted])

  return (
    <button
      onClick={() => {
        if (!isPlaying) {
          // If audio is paused, resume it
          resumeAudio()
        } else {
          // If audio is playing, toggle mute
          toggleMute()
        }
      }}
      className="fixed top-0 right-6 z-[35] h-[64px] flex items-center justify-center bg-transparent border-none mix-blend-difference nav-button cursor-pointer outline-none"
      aria-label={!isPlaying ? "Resume music" : (isMuted ? "Unmute music" : "Mute music")}
      title={!isPlaying ? "Click to resume" : (isMuted ? "Click to unmute" : "Click to mute")}
    >
      {/* Canvas Visualizer */}
      <canvas ref={canvasRef} width="28" height="24" className="transition-opacity duration-300 invert" />
    </button>
  )
}
