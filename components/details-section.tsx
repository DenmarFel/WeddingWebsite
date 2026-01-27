import { useState, useEffect, useRef } from "react";
import { WeddingMap } from "./wedding-map";

export function DetailsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const eventDetails = {
    title: "Charlene & Denmar Wedding",
    location: "2316 South El Camino Real, San Clemente, California",
    description: "Please join us as we say 'I do'!",
    start: "20260530T233000Z", // 4:30 PM PDT
    end: "20260531T060000Z",   // 11:00 PM PDT
  };

  // Google Link
  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;

  // Apple/Outlook .ics Link
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${eventDetails.start}`,
    `DTEND:${eventDetails.end}`,
    `SUMMARY:${eventDetails.title}`,
    `LOCATION:${eventDetails.location}`,
    `DESCRIPTION:${eventDetails.description}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

  return (
    <section id="details" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center space-y-12 mb-16">
          
          <header className="space-y-4">
            <p className="text-[0.75rem] uppercase tracking-[0.3em] text-foreground/60 font-medium">
              Please join Charlene and Denmar as they say "I do" on
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-serif font-normal text-foreground tracking-tight leading-none">
              Saturday, May 30th, 2026
            </h1>
          </header>

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

          <footer className="inline-block border-t border-foreground/20 px-12 pt-8">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-foreground/60 mb-2">
              Ceremony begins at
            </p>
            <p className="text-2xl font-serif font-normal text-foreground mb-6">4:30 PM</p>
            
            {/* DROPDOWN CALENDAR BUTTON */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-normal tracking-wide text-foreground/80 border border-foreground/30 rounded-lg hover:bg-foreground/10 hover:text-foreground hover:border-foreground/50 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5"/>
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5"/>
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5"/>
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5"/>
                </svg>
                Add to Calendar
              </button>

              {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                  <div className="py-1 flex flex-col">
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-center"
                    >
                      Google Calendar
                    </a>
                    <hr className="border-gray-100" />
                    <a
                      href={icsUrl}
                      download="Wedding-Charlene-Denmar.ics"
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-center"
                    >
                      Apple / Outlook
                    </a>
                  </div>
                </div>
              )}
            </div>
          </footer>
        </div>

        <div className="max-w-3xl mx-auto">
          <WeddingMap />
        </div>
        
      </div>
    </section>
  );
}