"use client"
import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
// Import the specific effect you want (e.g., NET, BIRDS, WAVES, FOG)
import FOG from 'vanta/dist/vanta.fog.min'

export default function VantaBackground() {
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
          // highlightColor: 0xebebeb, 
          // midtoneColor: 0xf2f2f2,  
          // lowlightColor: 0xd9bcc8,  
          // baseColor: 0xFFFFFF,
          // blurFactor: 0.9,         // Keep it soft and dreamy
          // speed: 1,              // Slow, elegant movement
          // zoom: 0.5,
          highlightColor: 0xF4F5F8, 
          midtoneColor: 0xD2CABE,  
          lowlightColor: 0xD2CABE,  
          baseColor: 0xFAF8F4,
          blurFactor: 0.9,         // Keep it soft and dreamy
          speed: 2,              // Slow, elegant movement
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