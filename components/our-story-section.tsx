"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const STORY_MILESTONES = [
  {
    image: "/high-school.jpeg",
    caption: "from humble beginnings in 9th grade English...",
    year: "2014",
  },
  {
    image: "/graduate-photo.png",
    caption: "putting in the work, together and for each other...",
    year: "2022",
  },
  {
    image: "/house-photo-1.jpg",
    caption: "settling in before settling down...",
    year: "2024",
  },
  {
    image: "/proposal-image.jpg",
    caption: "...and finally making it official.",
    year: "9/10/2024",
  },
]

export function OurStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const container = containerRef.current
    const slides = slidesRef.current

    if (!section || !container || !slides) return

    const totalWidth = slides.scrollWidth - window.innerWidth
    
    // Add extra scroll distance to give the last slide more screen time
    const extraScrollForLastSlide = window.innerWidth * 0.2 // 50% of viewport width

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth + extraScrollForLastSlide}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Adjust progress calculation to account for the pause at the end
          // Map the progress so the last slide indicator fills during the extra scroll time
          const adjustedProgress = Math.min(self.progress / 0.7, 1) // 0.7 because 30% is the pause
          const currentIndex = Math.round(adjustedProgress * (STORY_MILESTONES.length - 1))
          setIndex(currentIndex)
        },
      },
    })

    tl.to(slides, {
      x: -totalWidth,
      ease: "none",
    })
    // Add a pause at the end to keep the last slide visible longer
    tl.to({}, { duration: 0.3 })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="story" className="relative">
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-8 py-24">
        <h2 className=" text-4xl md:text-6xl lg:text-7xl text-center max-w-4xl leading-tight mb-12 text-balance">
          Chapters of a life built together, one page at a time...
        </h2>
        {/* Simple pipe/line indicator instead of arrow */}
        <div className="text-foreground/30 text-4xl font-extralight">|</div>
      </div>

      <div ref={containerRef} className="h-screen w-full overflow-hidden">
        <div
          ref={slidesRef}
          className="flex h-full items-center"
          style={{ width: `${STORY_MILESTONES.length * 100}vw` }}
        >
          {STORY_MILESTONES.map((milestone, index) => (
            <div
              key={index}
              className="h-full w-screen flex-shrink-0 flex flex-col items-center justify-center px-8 md:px-16 lg:px-24"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">{milestone.year}</p>

              <div className="relative w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={milestone.image || "/placeholder.svg"}
                  alt={milestone.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="story-caption mt-8 text-xl text-foreground/80 ">
                {milestone.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Progress indicator - fixed at bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {STORY_MILESTONES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-foreground/60 w-8" : "bg-foreground/20 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
