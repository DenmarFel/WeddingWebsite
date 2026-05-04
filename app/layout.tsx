import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AudioProvider } from "@/contexts/audio-context"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { VantaBackground } from "@/components/VantaBackground"
import { SilkBackground } from "@/components/SilkBackground"

// Toggle which background to use
const USE_SILK_BACKGROUND = false

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
  description: "Join us as we celebrate our wedding in San Clemente, California"
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
    <html lang="en" className="scroll-top-on-load">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Force scroll to top before anything renders
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            `,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {USE_SILK_BACKGROUND ? <SilkBackground /> : <VantaBackground />}
        <AudioProvider>
          {children}
        </AudioProvider>
        <Analytics />
      </body>
    </html>
  )
}
