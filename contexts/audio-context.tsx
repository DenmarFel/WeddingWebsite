"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"

interface AudioContextType {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  toggleMute: () => void
  setVolume: (volume: number) => void
  resumeAudio: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(0.05) // Set a softer default
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null) // Ref to control volume ramps

  useEffect(() => {
    if (typeof window === "undefined") return

    const audio = new Audio("/audio/so-high-school-violin.webm")
    audio.loop = true
    // We set the base audio element volume to 1 and control 
    // the "real" volume via the GainNode for smoother transitions.
    audio.volume = 1 
    audioRef.current = audio

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioContextRef.current = audioCtx

    const source = audioCtx.createMediaElementSource(audio)
    const analyserNode = audioCtx.createAnalyser()
    const gainNode = audioCtx.createGain() // The "Volume Knob"
    
    analyserNode.fftSize = 256
    gainNodeRef.current = gainNode

    // Route: Audio -> Gain (Volume) -> Analyser (Visuals) -> Speakers
    source.connect(gainNode)
    gainNode.connect(analyserNode)
    analyserNode.connect(audioCtx.destination)

    // Start the gain at 0 (silent)
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)

    // Don't autoplay - wait for user interaction via resumeAudio()

    // Page visibility change handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs, minimized browser, etc.)
        if (audio && !audio.paused) {
          audio.pause()
          setIsPlaying(false)
        }
      }
      // Note: We don't auto-resume when page becomes visible
      // User needs to manually start music again
    }

    // Page unload handler (for mobile when closing browser)
    const handleBeforeUnload = () => {
      if (audio && !audio.paused) {
        audio.pause()
        setIsPlaying(false)
      }
    }

    // Blur handler (when window loses focus)
    const handleBlur = () => {
      if (audio && !audio.paused) {
        audio.pause()
        setIsPlaying(false)
      }
    }

    // Add event listeners for page/tab changes
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("blur", handleBlur)

    return () => {
      // Cleanup event listeners
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("blur", handleBlur)
      
      audio.pause()
      audio.src = ""
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, []) // Remove accessLevel dependency

  const toggleMute = () => {
    if (audioRef.current && gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current
      if (!isMuted) {
        // Fade out to 0 over 0.5s before muting
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
        setTimeout(() => { audioRef.current!.muted = true }, 500)
      } else {
        // Unmute and fade back in
        audioRef.current.muted = false
        gainNodeRef.current.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5)
      }
      setIsMuted(!isMuted)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (gainNodeRef.current && audioContextRef.current) {
      // Immediate volume change if the user slides a volume bar
      gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime)
    }
  }

  const resumeAudio = async () => {
    if (audioRef.current && audioContextRef.current && gainNodeRef.current) {
      try {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        await audioRef.current.play()
        setIsPlaying(true)
        // Smoothly ramp up to the desired volume over 5 seconds
        gainNodeRef.current.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 5)
      } catch (error) {
        console.error("Failed to resume audio:", error)
      }
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, volume, toggleMute, setVolume, resumeAudio }}>
      {children}
    </AudioContext.Provider>
  )
}
