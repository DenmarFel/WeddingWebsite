"use client"

import type React from "react"

import { useState } from "react"
import { useAccess } from "@/contexts/access-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isValidGuestPassword } from "@/lib/guest-passwords"

export function AccessGate() {
  const { setAccessLevel } = useAccess()
  const [step, setStep] = useState<"choice" | "password">("choice")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const handleChoice = (choice: "guest" | "visitor") => {
    if (choice === "guest") {
      setStep("password")
    } else {
      // Visitor - grant limited access
      handleGateOpen("visitor")
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidGuestPassword(password)) {
      handleGateOpen("guest")
    } else {
      setError("Incorrect password. Please try again.")
      setPassword("")
    }
  }

  const handleGateOpen = (level: "guest" | "visitor") => {
    setIsAnimating(true)
    // You can hook your door opening animation here
    setTimeout(() => {
      setAccessLevel(level)
    }, 500) // Adjust timing for your animation
  }

  return (
    <div
      id="access-gate"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background pattern/texture - you can replace with doors or other design */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main content container - this is what you'll animate as doors */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12 shadow-xl">
          {/* Names as header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider text-foreground">
              C <span className="text-muted-foreground">&</span> D
            </h1>
            <p className="mt-2 text-sm tracking-widest text-muted-foreground uppercase">May 30, 2026</p>
          </div>

          {/* Choice step */}
          {step === "choice" && (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground mb-6">Welcome to our celebration</p>

              <Button
                onClick={() => handleChoice("guest")}
                variant="outline"
                className="w-full h-16 text-lg font-light tracking-wide hover:bg-accent/10"
              >
                I am an honored guest
              </Button>

              <Button
                onClick={() => handleChoice("visitor")}
                variant="ghost"
                className="w-full h-16 text-lg font-light tracking-wide hover:bg-accent/5"
              >
                I am just passing by
              </Button>
            </div>
          )}

          {/* Password step */}
          {step === "password" && (
            <div>
              <button
                onClick={() => {
                  setStep("choice")
                  setPassword("")
                  setError("")
                }}
                className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
              >
                ← Back
              </button>

              <p className="text-center text-muted-foreground mb-6">Please enter the guest password</p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Guest password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  className="h-12 text-center tracking-widest"
                  autoFocus
                />

                {error && <p className="text-sm text-destructive text-center">{error}</p>}

                <Button type="submit" className="w-full h-12 text-lg font-light tracking-wide">
                  Enter
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
