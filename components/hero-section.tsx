"use client"

import { CalendarSaveButton } from "./calendar-save-button"
import { GuestOnly } from "./guest-only"
import { useEffect } from "react"
import { gsap } from "gsap"
import { SaveTheDateBadge } from "./save-the-date-badge"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#title",
        start: "top top",
        end: "+=300",
        scrub: true,
        onEnter: () => {
          gsap.set("#title-blur", {
            position: "fixed",
            top: "-200px",
            paddingTop: "264px",
            height: "64px",
            width: "100%",
          })
          gsap.set("#title", {
            position: "fixed",
            top: "0",
            width: "100%",
            height: "64px",
            mixBlendMode: "difference",
          })
        },
        onLeaveBack: () => {
          gsap.set("#title-blur", {
            height: "0",
            width: "0",
          })
          gsap.set("#title", {
            position: "absolute",
            top: "10%",
            width: "auto",
            height: "auto",
            mixBlendMode: "normal",
          })
        },
      },
    })

    // Fade out "harlene" and "enmar", slide C & D together, AND shrink the text
    // Collapse for the letters
    tl.to(".remove", { 
      opacity: 0, 
      width: 0, 
      margin: 0,
    }, 0)
    .to("#title", {
        fontSize: "var(--target-size)", // Shrink to smaller size for navbar
        duration: 0.5,
      },
      "-=0.5",
    )
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="/cover-landscape.jpeg" alt="Charlene and Denmar" className="w-full h-full object-cover" />
      </div>
      
      {/* Blur layer - sibling to title */}
      <div 
        id="title-blur" 
        style={{ top: '10%' }} 
        className="absolute w-full pointer-events-none z-[39]"
      />

      <div 
        id="title" 
        style={{ top: '10%' }} 
        className="flex flex-col items-center justify-center text-[clamp(2.5rem,6vw,6rem)] px-3 w-full max-w-[100vw] font-medium tracking-wide z-40 text-white absolute [--target-size:2.5rem]"
      >
        <div className="remove text-lg mt-2">The Wedding of</div>
        <div className="flex">
          C<span className="remove">harlene</span>
          <span className="remove">&nbsp;</span>
          &
          <span className="remove">&nbsp;</span>
          D<span className="remove">enmar</span>
        </div>
        <div className="remove text-lg mt-2">Saturday, May 30, 2026 | San Clemente, CA</div>
      </div>

      <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-30">
        <SaveTheDateBadge />
      </div>

      <div className="relative z-10 text-center px-4">
        <GuestOnly
          visitorFallback={
            <p className="mt-12 text-lg md:text-xl font-light tracking-widest text-white/80">Coming Soon</p>
          }
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
