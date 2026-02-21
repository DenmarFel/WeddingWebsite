"use client"

import { useMemo } from "react"
import { handleAddToCalendar } from "@/lib/calendar-utils"

export function SaveTheDateBadge() {
  const daysRemaining = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weddingMidnight = new Date("2026-05-30T00:00:00")

    const diffInMs = weddingMidnight.getTime() - today.getTime()
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

    return diffInDays > 0 ? diffInDays : 0
  }, [])

  return (
    <button
      onClick={handleAddToCalendar}
      className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 cursor-pointer transition-transform duration-300 hover:scale-110 bg-transparent border-none animate-pulse-scale"
    >
      {/* Spinning Text Layer */}
      <div className="absolute inset-0 animate-[spin_26s_linear_infinite] group-hover:pause-animation">
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
