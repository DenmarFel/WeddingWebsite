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
  const [volume, setVolumeState] = useState(0.05) // Set a softer default
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null) // Ref to control volume ramps
  const { accessLevel } = useAccess()

  useEffect(() => {
    if (!accessLevel || typeof window === "undefined") return

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

    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        
        // Smoothly ramp up to the desired volume over 5 seconds
        gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 5)
      } catch (error) {
        console.log("[Wedding-Site] Autoplay blocked, waiting for interaction")
        const startOnClick = async () => {
          try {
            if (audioCtx.state === 'suspended') await audioCtx.resume()
            await audio.play()
            setIsPlaying(true)
            gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 5)
            document.removeEventListener("click", startOnClick)
          } catch (e) {
            console.error("Failed to start audio:", e)
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
  }, [accessLevel]) // Only re-run if access level changes

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

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, volume, toggleMute, setVolume }}>
      {children}
    </AudioContext.Provider>
  )
}
