"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ColorScheme = "default" | "blush" | "sage" | "lavender" | "ocean" | "mediterranean" | "santorini" | "amalfi"

interface ThemeContextType {
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const COLOR_SCHEMES = {
  default: {
    "--background": "oklch(0.98 0.005 80)",
    "--foreground": "oklch(0.25 0.02 50)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.25 0.02 50)",
    "--primary": "oklch(0.35 0.02 50)",
    "--primary-foreground": "oklch(0.98 0.005 80)",
    "--secondary": "oklch(0.95 0.01 80)",
    "--secondary-foreground": "oklch(0.35 0.02 50)",
    "--muted": "oklch(0.94 0.01 80)",
    "--muted-foreground": "oklch(0.5 0.02 50)",
    "--accent": "oklch(0.55 0.08 145)",
    "--accent-foreground": "oklch(0.98 0.005 80)",
    "--border": "oklch(0.88 0.01 80)",
    "--input": "oklch(0.92 0.01 80)",
    "--ring": "oklch(0.55 0.08 145)",
  },
  blush: {
    "--background": "oklch(0.98 0.01 15)",
    "--foreground": "oklch(0.25 0.02 15)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.25 0.02 15)",
    "--primary": "oklch(0.35 0.05 15)",
    "--primary-foreground": "oklch(0.98 0.01 15)",
    "--secondary": "oklch(0.96 0.015 20)",
    "--secondary-foreground": "oklch(0.35 0.05 15)",
    "--muted": "oklch(0.95 0.015 20)",
    "--muted-foreground": "oklch(0.5 0.02 15)",
    "--accent": "oklch(0.65 0.12 350)",
    "--accent-foreground": "oklch(0.98 0.01 15)",
    "--border": "oklch(0.9 0.015 15)",
    "--input": "oklch(0.93 0.015 15)",
    "--ring": "oklch(0.65 0.12 350)",
  },
  sage: {
    "--background": "oklch(0.97 0.008 160)",
    "--foreground": "oklch(0.25 0.02 160)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.25 0.02 160)",
    "--primary": "oklch(0.35 0.03 160)",
    "--primary-foreground": "oklch(0.97 0.008 160)",
    "--secondary": "oklch(0.94 0.012 155)",
    "--secondary-foreground": "oklch(0.35 0.03 160)",
    "--muted": "oklch(0.93 0.012 155)",
    "--muted-foreground": "oklch(0.5 0.02 160)",
    "--accent": "oklch(0.5 0.1 145)",
    "--accent-foreground": "oklch(0.97 0.008 160)",
    "--border": "oklch(0.87 0.012 160)",
    "--input": "oklch(0.91 0.012 160)",
    "--ring": "oklch(0.5 0.1 145)",
  },
  lavender: {
    "--background": "oklch(0.97 0.01 280)",
    "--foreground": "oklch(0.25 0.02 280)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.25 0.02 280)",
    "--primary": "oklch(0.35 0.04 280)",
    "--primary-foreground": "oklch(0.97 0.01 280)",
    "--secondary": "oklch(0.94 0.015 285)",
    "--secondary-foreground": "oklch(0.35 0.04 280)",
    "--muted": "oklch(0.93 0.015 285)",
    "--muted-foreground": "oklch(0.5 0.02 280)",
    "--accent": "oklch(0.6 0.15 285)",
    "--accent-foreground": "oklch(0.97 0.01 280)",
    "--border": "oklch(0.88 0.015 280)",
    "--input": "oklch(0.91 0.015 280)",
    "--ring": "oklch(0.6 0.15 285)",
  },
  ocean: {
    "--background": "oklch(0.97 0.01 220)",
    "--foreground": "oklch(0.25 0.025 220)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.25 0.025 220)",
    "--primary": "oklch(0.35 0.04 220)",
    "--primary-foreground": "oklch(0.97 0.01 220)",
    "--secondary": "oklch(0.94 0.015 215)",
    "--secondary-foreground": "oklch(0.35 0.04 220)",
    "--muted": "oklch(0.93 0.015 215)",
    "--muted-foreground": "oklch(0.5 0.025 220)",
    "--accent": "oklch(0.55 0.12 230)",
    "--accent-foreground": "oklch(0.97 0.01 220)",
    "--border": "oklch(0.88 0.015 220)",
    "--input": "oklch(0.91 0.015 220)",
    "--ring": "oklch(0.55 0.12 230)",
  },
  mediterranean: {
    "--background": "oklch(0.98 0.01 65)",
    "--foreground": "oklch(0.28 0.025 55)",
    "--card": "oklch(0.995 0.005 70)",
    "--card-foreground": "oklch(0.28 0.025 55)",
    "--primary": "oklch(0.35 0.04 60)",
    "--primary-foreground": "oklch(0.98 0.01 65)",
    "--secondary": "oklch(0.92 0.02 70)",
    "--secondary-foreground": "oklch(0.35 0.04 60)",
    "--muted": "oklch(0.9 0.02 70)",
    "--muted-foreground": "oklch(0.52 0.025 55)",
    "--accent": "oklch(0.55 0.14 35)", // Terracotta/burnt orange
    "--accent-foreground": "oklch(0.98 0.01 65)",
    "--border": "oklch(0.88 0.02 65)",
    "--input": "oklch(0.92 0.02 70)",
    "--ring": "oklch(0.55 0.14 35)",
  },
  santorini: {
    "--background": "oklch(0.99 0.005 240)",
    "--foreground": "oklch(0.25 0.03 240)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.25 0.03 240)",
    "--primary": "oklch(0.3 0.05 240)",
    "--primary-foreground": "oklch(0.99 0.005 240)",
    "--secondary": "oklch(0.95 0.01 235)",
    "--secondary-foreground": "oklch(0.3 0.05 240)",
    "--muted": "oklch(0.94 0.01 235)",
    "--muted-foreground": "oklch(0.48 0.03 240)",
    "--accent": "oklch(0.52 0.18 240)", // Deep Aegean blue
    "--accent-foreground": "oklch(0.99 0.005 240)",
    "--border": "oklch(0.9 0.01 240)",
    "--input": "oklch(0.93 0.01 235)",
    "--ring": "oklch(0.52 0.18 240)",
  },
  amalfi: {
    "--background": "oklch(0.985 0.008 90)",
    "--foreground": "oklch(0.27 0.025 200)",
    "--card": "oklch(0.998 0.003 85)",
    "--card-foreground": "oklch(0.27 0.025 200)",
    "--primary": "oklch(0.32 0.04 200)",
    "--primary-foreground": "oklch(0.985 0.008 90)",
    "--secondary": "oklch(0.94 0.015 85)",
    "--secondary-foreground": "oklch(0.32 0.04 200)",
    "--muted": "oklch(0.92 0.015 85)",
    "--muted-foreground": "oklch(0.5 0.025 200)",
    "--accent": "oklch(0.58 0.16 195)", // Coastal turquoise
    "--accent-foreground": "oklch(0.985 0.008 90)",
    "--border": "oklch(0.89 0.015 90)",
    "--input": "oklch(0.92 0.015 85)",
    "--ring": "oklch(0.58 0.16 195)",
  },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("default")

  useEffect(() => {
    // Load saved color scheme from localStorage
    const saved = localStorage.getItem("color-scheme") as ColorScheme
    if (saved && COLOR_SCHEMES[saved]) {
      setColorScheme(saved)
    }
  }, [])

  useEffect(() => {
    // Apply color scheme to CSS variables
    const root = document.documentElement
    const colors = COLOR_SCHEMES[colorScheme]

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Save to localStorage
    localStorage.setItem("color-scheme", colorScheme)
  }, [colorScheme])

  return <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
