import Link from "next/link"
import { Heart, Check } from "lucide-react"
import type { RsvpFormData } from "./rsvp-types"

interface RsvpConfirmationProps {
  formData: RsvpFormData
  isAttending: boolean
}

export function RsvpConfirmation({ formData, isAttending }: RsvpConfirmationProps) {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="bg-card p-8 md:p-12">
        {/* Success icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
          <Check className="w-8 h-8 text-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">Thank You, {formData.firstName}!</h1>

        <div className="w-16 h-px bg-accent mx-auto mb-6" />

        {isAttending ? (
          <>
            <p className="text-lg font-light text-muted-foreground mb-4">
              We are thrilled you will be joining us on our special day.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-light text-muted-foreground mb-4">
              We're sorry you won't be able to make it, but we appreciate you letting us know.
            </p>
            <p className="text-base font-light text-muted-foreground">You'll be in our thoughts on our special day.</p>
          </>
        )}

        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 bg-secondary hover:bg-muted text-foreground border border-border transition-colors text-sm tracking-widest uppercase cursor-pointer"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
