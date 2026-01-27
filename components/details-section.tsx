import { WeddingMap } from "./wedding-map"

export function DetailsSection() {
  return (
    <section id="details" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* THE CLEANED-UP HEADER BLOCK */}
        <div className="text-center space-y-12 mb-16">
          
          {/* Section 1: Introduction */}
          <header className="space-y-4">
            <p className="text-[0.75rem] uppercase tracking-[0.3em] text-foreground/60 font-medium">
              Please join Charlene and Denmar as they say "I do" on
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-serif font-normal text-foreground tracking-tight leading-none">
              Saturday, May 30th, 2026
            </h1>
          </header>

          {/* Section 2: Location */}
          <div className="space-y-3">
            <p className="text-sm italic font-serif text-foreground/60">at</p>
            <h2 className="text-2xl md:text-3xl font-normal text-foreground tracking-wide">
              La Ventura
            </h2>
            <p className="text-[0.95rem] text-foreground/70 font-normal max-w-xs mx-auto leading-relaxed">
              2316 South El Camino Real<br/>
              San Clemente, California
            </p>
          </div>

          {/* Section 3: The Time (Single source of truth) */}
          <footer className="inline-block border-t border-foreground/20 px-12 pt-8">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-foreground/60 mb-2">
              Ceremony begins at
            </p>
            <p className="text-2xl font-serif font-normal text-foreground mb-6">4:30 PM</p>
            
            {/* Add to Calendar Button */}
            <a
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=Charlene+%26+Denmar+Wedding&dates=20260530T220000Z/20260531T040000Z&details=San+Clemente,+California"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-normal tracking-wide text-foreground/80 border border-foreground/30 rounded-lg hover:bg-foreground/10 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5"/>
              </svg>
              Add to Calendar
            </a>
          </footer>
        </div>

        {/* MAP */}
        <div className="max-w-3xl mx-auto">
          <div>
            <WeddingMap />
          </div>
        </div>
        
      </div>
    </section>
  )
}