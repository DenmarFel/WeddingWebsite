import Link from "next/link"
import { Check } from "lucide-react"
import type { RsvpFormData } from "./rsvp-types"
import { downloadICSFile, getGoogleCalendarUrl } from "@/lib/calendar-utils"

interface RsvpConfirmationProps {
  formData: RsvpFormData
  isAttending: boolean
}

export function RsvpConfirmation({ formData, isAttending }: RsvpConfirmationProps) {
  const handleAppleCalendar = (e: React.MouseEvent) => {
    e.preventDefault()
    downloadICSFile()
  }

  const handleGoogleCalendar = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(getGoogleCalendarUrl(), "_blank", "noopener,noreferrer")
  }

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
            <p className="text-lg font-serif text-foreground/70 mb-8">
              We are thrilled you will be joining us on our special day.
            </p>

            {/* Add to Calendar Section */}
            <div className="mt-8 mb-8">
              <p className="font-serif text-foreground/60 mb-6">Save the date</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={handleAppleCalendar}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-serif text-sm text-foreground/80 border border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple Calendar
                </button>
                
                <button
                  onClick={handleGoogleCalendar}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-serif text-sm text-foreground/80 border border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Calendar
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg font-serif text-foreground/70 mb-4">
              We're sorry you won't be able to make it, but we appreciate you letting us know.
            </p>
            <p className="font-serif text-foreground/60">You'll be in our thoughts on our special day.</p>
          </>
        )}

        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 font-serif text-foreground/80 border border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 text-sm tracking-widest uppercase cursor-pointer"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
