"use client"

import { useState } from "react"

export default function SeatingChartPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/seating_chart/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      setAuthenticated(true)
    } else {
      setError("Incorrect password")
      setPassword("")
    }
  }

  if (authenticated) {
    return (
      <main className="min-h-screen">
        <div className="w-full h-screen">
          <iframe
            src="/seating_chart_saved.html"
            className="w-full h-full border-0"
            title="Seating Chart"
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
          <h1 className="text-2xl font-serif font-light text-foreground mb-6 text-center">
            Seating Chart
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white/30"
                autoComplete="off"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-foreground hover:bg-white/20 transition-colors"
            >
              Access
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
