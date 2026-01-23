import { WeddingMap } from "./wedding-map"
import { GuestOnly } from "./guest-only"

export function DetailsSection() {
  return (
    <section id="details" className="py-12 md:py-20 px-4 bg-background font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <p className="text-sm md:text-base font-sans uppercase tracking-widest text-foreground/50 mb-3">
            You are invited to celebrate with us on
          </p>
          <h2 className="text-4xl font-serif font-light mb-3 leading-tight">
            Saturday, May 30th, 2026
          </h2>
          <p className="text-sm md:text-base font-sans uppercase tracking-widest text-foreground/50 mb-3">
            at
          </p>
          <p className="text-3xl font-serif font-light text-foreground/80 mb-3">
            La Ventura
          </p>
          <p className="text-base md:text-lg font-serif text-foreground/60">
            San Clemente, California
          </p>
        </div>

        <GuestOnly
          visitorFallback={
            <div className="text-center py-12 max-w-md mx-auto">
              <p className="text-base text-foreground/70 mb-2">Details available to invited guests</p>
              <p className="text-sm text-foreground/50">Please enter your guest password to view</p>
            </div>
          }
        >
          <div className="max-w-3xl mx-auto">
            {/* Just time and map */}
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm font-sans uppercase tracking-widest text-foreground/50 mb-2">
                Ceremony begins at
              </p>
              <p className="text-3xl md:text-4xl font-serif font-light">4:30 PM</p>
            </div>

            {/* Map */}
            <div>
              <WeddingMap />
            </div>
          </div>
        </GuestOnly>
      </div>
    </section>
  )
}
