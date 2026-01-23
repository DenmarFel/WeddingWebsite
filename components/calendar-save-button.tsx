"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"

/*
  CALENDAR SAVE COMPONENT
  -----------------------
  Easy to customize:
  - Update EVENT_DETAILS below with your actual wedding info
  - Styling uses your existing color tokens
  - Dropdown reveals Google, Apple/iCal, and Outlook options
*/

const EVENT_DETAILS = {
  title: "Charlene & Denmar's Wedding",
  description: "Join us for our wedding celebration at Casa Romantica Cultural Center",
  location: "415 Avenida Granada, San Clemente, CA 92672",
  // Format: YYYYMMDD (all day) or YYYYMMDDTHHmmss for specific time
  startDate: "20260530T160000",
  endDate: "20260530T230000",
}

export function CalendarSaveButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: EVENT_DETAILS.title,
      details: EVENT_DETAILS.description,
      location: EVENT_DETAILS.location,
      dates: `${EVENT_DETAILS.startDate}/${EVENT_DETAILS.endDate}`,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // Generate .ics file content for iCal/Outlook
  const generateIcsContent = () => {
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Charlene & Denmar Wedding//EN
BEGIN:VEVENT
DTSTART:${EVENT_DETAILS.startDate}
DTEND:${EVENT_DETAILS.endDate}
SUMMARY:${EVENT_DETAILS.title}
DESCRIPTION:${EVENT_DETAILS.description}
LOCATION:${EVENT_DETAILS.location}
END:VEVENT
END:VCALENDAR`
  }

  // Download .ics file
  const downloadIcs = () => {
    const blob = new Blob([generateIcsContent()], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "charlene-denmar-wedding.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setIsOpen(false)
  }

  // Outlook Web URL
  const getOutlookUrl = () => {
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: EVENT_DETAILS.title,
      body: EVENT_DETAILS.description,
      location: EVENT_DETAILS.location,
      startdt: "2026-05-30T16:00:00",
      enddt: "2026-05-30T23:00:00",
    })
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-5 py-2.5 bg-background/80 backdrop-blur-sm border border-border rounded-sm hover:bg-secondary transition-all duration-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Calendar className="w-4 h-4 text-accent" />
        <span className="text-sm tracking-widest uppercase font-light">Save the Date</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />

          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 min-w-[200px] bg-card border border-border shadow-lg rounded-sm overflow-hidden">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left w-full"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 3h-1V1.5h-2V3h-9V1.5h-2V3h-1C3.12 3 2 4.12 2 5.5v14c0 1.38 1.12 2.5 2.5 2.5h15c1.38 0 2.5-1.12 2.5-2.5v-14C22 4.12 20.88 3 19.5 3zm0 16.5h-15V8h15v11.5z" />
              </svg>
              <span className="text-sm font-light tracking-wide">Google Calendar</span>
            </a>

            <button
              onClick={downloadIcs}
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left w-full border-t border-border"
            >
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
              </svg>
              <span className="text-sm font-light tracking-wide">Apple Calendar</span>
            </button>

            <a
              href={getOutlookUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left w-full border-t border-border"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5 3h-19C1.67 3 1 3.67 1 4.5v15c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM21 19H3V8h18v11zM3 6V5h18v1H3z" />
              </svg>
              <span className="text-sm font-light tracking-wide">Outlook</span>
            </a>
          </div>
        </>
      )}
    </div>
  )
}
