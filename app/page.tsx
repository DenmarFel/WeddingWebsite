"use client"

import { useAccess } from "@/contexts/access-context"
import { AccessGate } from "@/components/access-gate"
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

export default function WeddingPage() {
  const { accessLevel } = useAccess()

  // Show gate if no access level is set
  if (!accessLevel) {
    return <AccessGate />
  }

  // Show main site once access is granted
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <OurStorySection />
      <DetailsSection />
      <RsvpSection />
      {/* <GallerySection /> */}
      <RegistrySection />
      <FaqSection />
      {/* <ContactSection /> */}
      <Footer />
    </main>
  )
}
