"use client"
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
// Import the specific effect you want (e.g., NET, BIRDS, WAVES, FOG)
// @ts-ignore
import FOG from 'vanta/dist/vanta.fog.min'

export function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE, // You MUST pass the THREE instance here
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xFCFCFC,
          midtoneColor: 0xECEBE8,
          lowlightColor: 0xE8E7E4,
          baseColor: 0xFAFAF8,
          blurFactor: 0.9,
          speed: 1.5,
          zoom: 1,
        })
      )
    }
    // Cleanup: destroy the effect when the component unmounts
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div 
      ref={vantaRef} 
      style={{ 
        position: "fixed", // This makes it "sticky"
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "100vh", 
        zIndex: -1,       // Puts it behind your sections
        pointerEvents: "none" // Ensures you can still click buttons on top of it
      }} 
    />
  )
}