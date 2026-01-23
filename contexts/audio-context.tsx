"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useAccess } from "./access-context"

interface AudioContextType {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  toggleMute: () => void
  setVolume: (volume: number) => void
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
  const [volume, setVolumeState] = useState(0.4)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const { accessLevel } = useAccess()

  useEffect(() => {
    // Only initialize audio after user has selected access level
    if (!accessLevel || typeof window === "undefined") return

    const audio = new Audio("/images/ana-20done-20-20so-20high-20school-20-28wedding-20violin-20version-29.mp3")
    audio.loop = true
    audio.volume = volume
    audioRef.current = audio

    // Create Web Audio API context for visualization
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioContextRef.current = audioCtx

    const source = audioCtx.createMediaElementSource(audio)
    const analyserNode = audioCtx.createAnalyser()
    analyserNode.fftSize = 256

    source.connect(analyserNode)
    analyserNode.connect(audioCtx.destination)

    // Autoplay with user interaction fallback
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("[v0] Audio autoplay blocked, waiting for user interaction")
        // Add click listener to start on first interaction
        const startOnClick = async () => {
          try {
            await audio.play()
            setIsPlaying(true)
            document.removeEventListener("click", startOnClick)
          } catch (e) {
            console.error("[v0] Failed to start audio:", e)
          }
        }
        document.addEventListener("click", startOnClick)
      }
    }

    playAudio()

    return () => {
      audio.pause()
      audio.src = ""
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [accessLevel, volume])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, volume, toggleMute, setVolume }}>
      {children}
    </AudioContext.Provider>
  )
}
