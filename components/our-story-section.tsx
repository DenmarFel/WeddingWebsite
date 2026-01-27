"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const STORY_MILESTONES = [
  {
    image: "/high-school.jpeg",
    caption: "from humble beginnings in 9th grade English...",
    year: "2014",
    focalPoint: "center 20%" // Keep heads at the top
  },
  {
    image: "/graduate-photo.png",
    caption: "putting in the work, together and for each other...",
    year: "2022",
    focalPoint: "center center"
  },
  {
    image: "/house-photo-1.jpg",
    caption: "settling in before settling down...",
    year: "2024",
    focalPoint: "center center"
  },
  {
    image: "/proposal-image.jpg",
    caption: "...and finally making it official.",
    year: "9/10/2024",
    focalPoint: "center 60%" // Keep heads at the top
  },
]

export function OurStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [progress,setProgress] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const container = containerRef.current
    const slides = slidesRef.current

    if (!section || !container || !slides) return

    const totalWidth = slides.scrollWidth - window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const currentIndex = Math.round(self.progress * (STORY_MILESTONES.length - 1))
          setIndex(currentIndex)
          setProgress(self.progress)
        },
      },
    })

    tl.to(slides, {
      x: -totalWidth,
      ease: "none",
    })

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

      <div
        id="story-progress-bar"
        style={{ 
          width: `${progress * 100}vw`,
          opacity: progress > 0.01 && progress <= 0.99999 ? 0.3 : 0
        }}
      ></div>

      <div ref={containerRef} className="h-screen w-full overflow-hidden">

        <div
          ref={slidesRef}
          className="flex h-full items-center"
          style={{ width: `${STORY_MILESTONES.length * 100}vw` }}
        >
          {STORY_MILESTONES.map((milestone, index) => (
            <div
              key={index}
              // Added pt-20 (80px) to keep text below your header on desktop
              className="h-full w-screen flex-shrink-0 flex flex-col items-center justify-center px-6 md:px-16 pt-20 md:pt-24"
            >
              {/* 1. Year: Increased container height to ensure it has breathing room */}
              <div className="h-10 md:h-14 flex items-end">
                <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  {milestone.year}
                </p>
              </div>

              {/* 2. Image Container: Using 65vh to ensure text fits on smaller laptops */}
              <div className="relative w-full max-w-[90vw] md:max-w-none md:w-auto h-auto md:h-full max-h-[60vh] md:max-h-[65vh] aspect-[4/5] md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl bg-muted/20">
                <img
                  src={milestone.image || "/placeholder.svg"}
                  alt={milestone.caption}
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: milestone.focalPoint || "center center" 
                  }}
                />
              </div>

              {/* 3. Caption: Keeping it tight to the image */}
              <div className="min-h-[60px] md:min-h-[100px] flex items-start text-center px-4">
                <p className="story-caption mt-4 text-base md:text-lg text-foreground/80 max-w-sm md:max-w-lg leading-relaxed italic">
                  {milestone.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
