"use client"

import React, { useMemo } from "react"

export function SaveTheDateBadge() {
  // ─── Edit your event details here ───
  const EVENT = {
    title: "Charlene & Denmar Wedding",
    description:
      "Join us for the wedding celebration of Charlene Santos & Denmar Feliciano! " +
      "Ceremony begins at 4:30 PM, followed by cocktail hour and reception. " +
      "Formal attire requested. " +
      "For more details visit: https://charmarwedding.com",
    location: "La Ventura, 2316 South El Camino Real, San Clemente, CA 92672",
    // Times in UTC — 4:30 PM PDT = 23:30 UTC, 11:00 PM PDT = 06:00 UTC next day
    startUTC: "20260530T233000Z",
    endUTC: "20260531T050000Z",
    filename: "Wedding-Charlene-Denmar.ics",
    url: "https://charmarwedding.com",
  }
  // ────────────────────────────────────

  const weddingDate = new Date("2026-05-30")
  
  const daysRemaining = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weddingMidnight = new Date("2026-05-30T00:00:00")

    const diffInMs = weddingMidnight.getTime() - today.getTime()
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

    return diffInDays > 0 ? diffInDays : 0
  }, [])

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);

    if (isApple) {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Wedding//EN",
        "BEGIN:VEVENT",
        `DTSTART:${EVENT.startUTC}`,
        `DTEND:${EVENT.endUTC}`,
        `SUMMARY:${EVENT.title}`,
        `DESCRIPTION:${EVENT.description.replace(/\n/g, "\\n")}`,
        `LOCATION:${EVENT.location}`,
        `URL:${EVENT.url}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = EVENT.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT.title)}&dates=${EVENT.startUTC}/${EVENT.endUTC}&location=${encodeURIComponent(EVENT.location)}&details=${encodeURIComponent(EVENT.description)}`;
      window.open(googleUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      onClick={handleCalendarClick}
      className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 cursor-pointer transition-transform duration-300 hover:scale-110 bg-transparent border-none"
    >
      {/* Spinning Text Layer */}
      <div className="absolute inset-0 animate-[spin_10s_linear_infinite] group-hover:pause-animation">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <path
              id="badgePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-[8.5px] uppercase fill-white font-medium tracking-[0.05em]">
            <textPath xlinkHref="#badgePath" textLength="232">
              Save the Date • Save the Date • Save the Date •&nbsp;
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 group-hover:bg-white">
        <span className="text-sm md:text-xl font-semibold leading-none tracking-tighter text-white group-hover:text-black">
          {daysRemaining}
        </span>
        <span className="text-[8px] md:text-[10px] uppercase tracking-widest leading-none mt-0.5 md:mt-1 text-white/80 group-hover:text-black/70">
          days
        </span>
      </div>
    </button>
  )
}