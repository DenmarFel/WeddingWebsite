"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { OurStorySection } from "@/components/our-story-section"
import { DetailsSection } from "@/components/details-section"
import { GallerySection } from "@/components/gallery-section"
import { RsvpSection } from "@/components/rsvp-section"
import { RegistrySection } from "@/components/registry-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { EntryOverlay } from "@/components/entry-overlay"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { useAudio } from "@/contexts/audio-context"

export default function WeddingPage() {
  const [enteredNow, setEnteredNow] = useState(false)
  const { resumeAudio } = useAudio()

  // Skip overlay if user already entered this session (false during SSR to avoid hydration mismatch)
  const enteredEarlier = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem("hasEntered") === "true",
    () => false
  )
  const hasEntered = enteredNow || enteredEarlier

  const handleEnter = (soundEnabled: boolean) => {
    setEnteredNow(true)
    sessionStorage.setItem("hasEntered", "true")
    if (soundEnabled) {
      resumeAudio()
    }
  }

  // Force scroll to top on mount and prevent scroll restoration
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    
    // Force immediate scroll to top
    document.documentElement.classList.add('no-scroll-restoration')
    window.scrollTo(0, 0)
    
    // Use multiple attempts to ensure scroll happens
    const scrollToTop = () => window.scrollTo(0, 0)
    scrollToTop()
    requestAnimationFrame(scrollToTop)
    setTimeout(scrollToTop, 0)
    setTimeout(scrollToTop, 10)
    
    return () => {
      document.documentElement.classList.remove('no-scroll-restoration')
    }
  }, [])

  // Prevent scrolling when overlay is shown
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [hasEntered])

  return (
    <main className="min-h-screen">
      {!hasEntered && <EntryOverlay onEnter={handleEnter} />}
      <Navigation />
      <HeroSection hasEntered={hasEntered} />
      <OurStorySection />
      <DetailsSection />
      <RsvpSection />
      {/* <GallerySection /> */}
      <RegistrySection />
      <FaqSection />
      {/* <ContactSection /> */}
      <Footer />
      <AudioVisualizer />
    </main>
  )
}
