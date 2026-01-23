import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AccessProvider } from "@/contexts/access-context"
import { AudioProvider } from "@/contexts/audio-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { DebugControls } from "@/components/debug-controls"
import { AudioVisualizer } from "@/components/audio-visualizer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Charlene & Denmar | May 30, 2026",
  description: "Join us as we celebrate our wedding in San Clemente, California",
}

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          <AccessProvider>
            <AudioProvider>
              {children}
              <AudioVisualizer />
              <DebugControls />
            </AudioProvider>
          </AccessProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
