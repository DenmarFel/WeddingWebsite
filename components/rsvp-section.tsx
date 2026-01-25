"use client"
import Link from "next/link"
import { GuestOnly } from "./guest-only"

export function RsvpSection() {
  return (
    <section id="rsvp" className="min-h-screen flex items-center justify-center px-4">
      <GuestOnly
        visitorFallback={
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/50 mb-8">Please</p>
            <div className=" text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none tracking-tight">
              <div className="flex justify-center">
                <span className="inline-block" style={{ marginRight: "-0.05em" }}>
                  R
                </span>
                <span className="inline-block">S</span>
              </div>
              <div className="flex justify-center">
                <span className="inline-block" style={{ marginRight: "-0.05em" }}>
                  V
                </span>
                <span className="inline-block">P</span>
              </div>
            </div>
            <p className="mt-12 text-foreground/60 font-light text-lg">Available to invited guests only.</p>
          </div>
        }
      >
        <div className="text-center max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/50 mb-8">Please</p>

          {/* Large typographic RSVP */}
          <div className=" text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none tracking-tight mb-12">
            <div className="flex justify-center">
              <span className="inline-block" style={{ marginRight: "-0.05em" }}>
                R
              </span>
              <span className="inline-block">S</span>
            </div>
            <div className="flex justify-center">
              <span className="inline-block" style={{ marginRight: "-0.05em" }}>
                V
              </span>
              <span className="inline-block">P</span>
            </div>
          </div>

          <p className="text-foreground/70 font-light mb-2">
            BY <span className="text-foreground font-medium">APRIL 30</span> TO
          </p>
          <Link
            href="/rsvp"
            className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
          >
            Begin Your RSVP
          </Link>

          <p className="mt-16 text-foreground/50 font-light text-lg italic max-w-md mx-auto leading-relaxed">
            and kindly let us know
            <br />
            if you can join us in this
            <br />
            celebration of love.
          </p>
        </div>
      </GuestOnly>
    </section>
  )
}
