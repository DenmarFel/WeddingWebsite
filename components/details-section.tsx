import { WeddingMap } from "./wedding-map"
import { GuestOnly } from "./guest-only"

export function DetailsSection() {
  return (
    <section id="details" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* THE CLEANED-UP HEADER BLOCK */}
        <div className="text-center space-y-12 mb-16">
          
          {/* Section 1: Introduction */}
          <header className="space-y-4">
            <p className="text-[0.75rem] uppercase tracking-[0.3em] text-foreground/40 font-medium">
              Please join Charlene and Denmar as they say "I do" on
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-serif font-light text-foreground/90 tracking-tight leading-none">
              Saturday, May 30th, 2026
            </h1>
          </header>

          {/* Section 2: Location */}
          <div className="space-y-3">
            <p className="text-sm italic font-serif text-foreground/40">at</p>
            <h2 className="text-2xl md:text-3xl font-light text-foreground/80 tracking-wide">
              La Ventura
            </h2>
            <p className="text-[0.95rem] text-foreground/50 font-light max-w-xs mx-auto leading-relaxed">
              2316 South El Camino Real<br/>
              San Clemente, California
            </p>
          </div>

          {/* Section 3: The Time (Single source of truth) */}
          <footer className="inline-block border-t border-foreground/10 px-12 pt-8">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-foreground/40 mb-2">
              Ceremony begins at
            </p>
            <p className="text-2xl font-serif font-light text-foreground/80">4:30 PM</p>
          </footer>
        </div>

        {/* GUEST LOGIC & MAP (Structure remains as you had it) */}
        <GuestOnly
          visitorFallback={
            <div className="text-center py-12 max-w-md mx-auto border border-dashed border-foreground/10 rounded-xl">
              <p className="text-base text-foreground/70 mb-2 font-serif italic">Details available to invited guests</p>
              <p className="text-[0.75rem] uppercase tracking-widest text-foreground/40">Please enter your guest password to view</p>
            </div>
          }
        >
          <div className="max-w-3xl mx-auto">
            {/* Map */}
            <div>
              <WeddingMap />
            </div>
            
            {/* Any extra GuestOnly content can go here */}
          </div>
        </GuestOnly>
        
      </div>
    </section>
  )
}