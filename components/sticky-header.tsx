"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StickyHeaderProps {
  startFixed?: boolean // If true, starts in fixed position (for non-hero pages)
  hasEntered?: boolean // If false, reset to initial state
}

export function StickyHeader({ startFixed = false, hasEntered = true }: StickyHeaderProps) {
  useEffect(() => {
    // If overlay is shown (hasEntered = false), reset to initial state
    if (!hasEntered) {
      // Kill only sticky header scroll triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === "#title") {
          trigger.kill()
        }
      })
      
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
        fontSize: "clamp(2.5rem,6vw,6rem)",
      })
      return
    }

    if (startFixed) {
      // For pages like RSVP - start in fixed position
      gsap.set("#title", {
        position: "fixed",
        top: "0",
        width: "100%",
        height: "64px",
        mixBlendMode: "difference",
        fontSize: "2.5rem",
      })
      gsap.set("#title-blur", {
        position: "fixed",
        top: "-200px",
        paddingTop: "264px",
        height: "64px",
        width: "100%",
      })
    } else {
      // For hero page - animate on scroll
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
    }

    return () => {
      // Only kill sticky header scroll triggers on cleanup
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === "#title") {
          trigger.kill()
        }
      })
    }
  }, [startFixed, hasEntered])

  return (
    <>
      {/* Blur layer */}
      <div 
        id="title-blur" 
        style={startFixed ? {} : { top: '10%' }} 
        className="absolute w-full pointer-events-none z-[34]"
      />

      <div 
        id="title" 
        style={startFixed ? {} : { top: '10%' }} 
        className={`flex flex-col items-center justify-center px-3 w-full max-w-[100vw] font-medium tracking-wide z-40 text-white absolute [--target-size:2.5rem] pointer-events-none ${
          startFixed 
            ? 'text-[2.5rem]' 
            : 'text-[clamp(2.5rem,6vw,6rem)]'
        }`}
      >
        {!startFixed && <div className="remove text-lg mt-2">The Wedding of</div>}
        <div className="flex">
          C{!startFixed && <span className="remove">harlene</span>}
          {!startFixed && <span className="remove">&nbsp;</span>}
          &
          {!startFixed && <span className="remove">&nbsp;</span>}
          D{!startFixed && <span className="remove">enmar</span>}
        </div>
        {!startFixed && <div className="remove text-lg mt-2">Saturday, May 30, 2026 | San Clemente, CA</div>}
      </div>
    </>
  )
}