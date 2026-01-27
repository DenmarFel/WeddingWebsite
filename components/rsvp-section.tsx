"use client"
import Link from "next/link"
import { GuestOnly } from "./guest-only"

export function RsvpSection() {
  return (
    <section id="rsvp" className="py-20 px-4 flex flex-col items-center justify-center">
      {/* Top scroll indicator */}
      <div className="text-foreground/30 text-4xl font-extralight mb-16">|</div>
      
      <GuestOnly
        visitorFallback={
          <div className="text-center max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-16 font-medium">Please</p>
            
            {/* Clean RSVP Typography */}
            <div className="mb-16">
              <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-serif font-light leading-[0.8] tracking-tight text-foreground">
                RSVP
              </h1>
            </div>
            
            <p className="text-foreground/70 font-normal text-lg">Available to invited guests only.</p>
          </div>
        }
      >
        <div className="text-center max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/60 mb-16 font-medium">Please</p>

          {/* Clean RSVP Typography */}
          <div className="mb-16">
            <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-serif font-light leading-[0.8] tracking-tight text-foreground mb-12">
              RSVP
            </h1>
          </div>

          {/* Deadline - Elegant and Minimal */}
          <div className="mb-12">
            <p className="text-foreground/80 font-normal text-lg mb-2">
              Response required by
            </p>
            <p className="text-2xl font-serif font-medium text-foreground tracking-wide">
              April 17th, 2026
            </p>
          </div>

          {/* CTA Button - Minimal and Elegant */}
          <Link
            href="/rsvp"
            className="inline-block px-8 py-3 text-foreground font-normal text-lg tracking-wide border border-foreground/30 rounded-lg hover:bg-foreground/5 hover:border-foreground/50 transition-all duration-300"
          >
            Begin Your RSVP
          </Link>

          <p className="mt-16 text-foreground/60 font-normal text-lg italic max-w-md mx-auto leading-relaxed">
            and kindly let us know
            <br />
            if you can join us in this
            <br />
            celebration of love.
          </p>
        </div>
      </GuestOnly>
      
      {/* Bottom scroll indicator */}
      <div className="text-foreground/30 text-4xl font-extralight mt-16">|</div>
    </section>
  )
}
