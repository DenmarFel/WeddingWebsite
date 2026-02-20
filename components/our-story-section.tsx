"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const STORY_MILESTONES = [
  {
    image: "/high-school.jpeg",
    caption: "from humble beginnings in 9th grade English...",
    year: "2014",
    focalPoint: "center 20%",
  },
  {
    image: "/graduate-photo.png",
    caption: "putting in the work, together and for each other...",
    year: "2022",
    focalPoint: "center center",
  },
  {
    image: "/house-photo-1.jpg",
    caption: "settling in before settling down...",
    year: "2024",
    focalPoint: "center center",
  },
  {
    image: "/proposal-image.jpg",
    caption: "...and finally making it official.",
    year: "9/10/2024",
    focalPoint: "center 60%",
  },
]

export function OurStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    milestonesRef.current.forEach((el) => {
      if (!el) return

      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="story" className="relative">
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 py-24">
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-center max-w-4xl leading-tight mb-12 text-balance">
          Chapters of a life built together, one page at a time...
        </h2>
        <div className="text-foreground/30 text-4xl font-extralight">|</div>
      </div>

      <div className="flex flex-col items-center gap-24 md:gap-32 px-6 md:px-16 pb-32">
        {STORY_MILESTONES.map((milestone, index) => (
          <div
            key={index}
            ref={(el) => { milestonesRef.current[index] = el }}
            className="flex flex-col items-center w-full max-w-xs md:max-w-lg"
          >
            <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-foreground/70 mb-3 font-medium">
              {milestone.year}
            </p>

            <div className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-muted/20">
              <img
                src={milestone.image || "/placeholder.svg"}
                alt={milestone.caption}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: milestone.focalPoint || "center center",
                }}
              />
            </div>

            <p className="story-caption mt-5 text-lg md:text-xl text-foreground/70 max-w-sm text-center leading-relaxed italic">
              {milestone.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
