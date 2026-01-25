"use client"

import { RsvpForm } from "@/components/rsvp-form/rsvp-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAccess } from "@/contexts/access-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/#rsvp"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wider uppercase font-light">Back</span>
          </Link>
          <span className="text-xl font-light tracking-widest">C & D</span>
          <div className="w-16" />
        </div>
      </header>

      {/* RSVP Form */}
      <div className="pt-24 pb-16 px-4">
        <RsvpForm />
      </div>
    </main>
  )
}
