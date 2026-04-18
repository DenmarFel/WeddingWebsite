import { redirect } from "next/navigation"
import { HouseholdRsvpForm } from "@/components/rsvp-form/household-rsvp-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { StickyHeader } from "@/components/sticky-header"

// Deadline: April 17, 2026 11:59 PM PST (UTC-8)
const RSVP_DEADLINE = new Date("2026-04-18T07:59:00Z")

export default function RsvpPage() {
  if (new Date() > RSVP_DEADLINE) {
    redirect("/")
  }

  return (
    <main className="min-h-screen">
      <StickyHeader startFixed={true} />
      <div className="fixed top-0 left-4 z-[60] h-[64px] max-w-4xl mx-auto flex items-center justify-center mix-blend-difference hover:scale-110">
        <Link
          href="/#rsvp"
          className="inline-flex items-center gap-2 text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider uppercase font-light">Back</span>
        </Link>
      </div>
      <div className="pt-24 pb-16 px-4">
        <HouseholdRsvpForm />
      </div>
    </main>
  )
}
