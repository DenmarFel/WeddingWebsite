"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type AccessLevel = "guest" | "visitor" | null

interface AccessContextType {
  accessLevel: AccessLevel
  setAccessLevel: (level: AccessLevel) => void
  isAuthenticated: boolean
  resetAccess: () => void
}

const AccessContext = createContext<AccessContextType | undefined>(undefined)

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [accessLevel, setAccessLevelState] = useState<AccessLevel>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load access level from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wedding-access-level")
    if (stored === "guest" || stored === "visitor") {
      setAccessLevelState(stored)
      setIsAuthenticated(stored === "guest")
    }
  }, [])

  const setAccessLevel = (level: AccessLevel) => {
    setAccessLevelState(level)
    setIsAuthenticated(level === "guest")
    if (level) {
      localStorage.setItem("wedding-access-level", level)
    }
  }

  const resetAccess = () => {
    localStorage.removeItem("wedding-access-level")
    setAccessLevelState(null)
    setIsAuthenticated(false)
  }

  return (
    <AccessContext.Provider value={{ accessLevel, setAccessLevel, isAuthenticated, resetAccess }}>
      {children}
    </AccessContext.Provider>
  )
}

export function useAccess() {
  const context = useContext(AccessContext)
  if (!context) {
    throw new Error("useAccess must be used within AccessProvider")
  }
  return context
}
