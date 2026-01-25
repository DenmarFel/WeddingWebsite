"use client"

import { HouseholdRsvpForm } from "@/components/rsvp-form/household-rsvp-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAccess } from "@/contexts/access-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { StickyHeader } from "@/components/sticky-header"

export default function RsvpPage() {
  const { isAuthenticated, accessLevel } = useAccess()
  const router = useRouter()

  useEffect(() => {
    if (accessLevel && !isAuthenticated) {
      router.push("/#rsvp")
    }
  }, [accessLevel, isAuthenticated, router])

  if (!accessLevel) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-light">Loading...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen">
      <StickyHeader startFixed={true} />
      {/* Back button - positioned to not conflict with sticky header */}
      <div className="fixed top-0 left-4 z-[60] h-[64px] max-w-4xl mx-auto flex items-center justify-center mix-blend-difference hover:scale-110">
        <Link
          href="/#rsvp"
          className="inline-flex items-center gap-2 text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider uppercase font-light">Back</span>
        </Link>
      </div>

      {/* RSVP Form */}
      <div className="pt-24 pb-16 px-4">
        <HouseholdRsvpForm />
      </div>
    </main>
  )
}
