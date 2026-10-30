import { createHmac, timingSafeEqual } from "crypto"
import type { NextRequest } from "next/server"

export const SEATING_AUTH_COOKIE = "seating_chart_auth"

// Cookie value is derived from the password, so changing SEATING_CHART_PASSWORD
// invalidates every existing session.
function sessionToken(password: string): string {
  return createHmac("sha256", password).update("seating-chart-session").digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

export function isCorrectPassword(password: unknown): boolean {
  const correctPassword = process.env.SEATING_CHART_PASSWORD
  if (!correctPassword || typeof password !== "string") return false
  return safeEqual(password, correctPassword)
}

export function createSessionToken(): string {
  return sessionToken(process.env.SEATING_CHART_PASSWORD!)
}

export function isAuthorized(request: NextRequest): boolean {
  const correctPassword = process.env.SEATING_CHART_PASSWORD
  const token = request.cookies.get(SEATING_AUTH_COOKIE)?.value
  if (!correctPassword || !token) return false
  return safeEqual(token, sessionToken(correctPassword))
}
