"use client"

import { useAccess } from "@/contexts/access-context"
import type { ReactNode } from "react"

interface GuestOnlyProps {
  children: ReactNode
  visitorFallback?: ReactNode
  hideForVisitor?: boolean
}

/**
 * Reusable component to control content visibility based on access level
 *
 * Usage examples:
 *
 * 1. Show only for guests (hide completely for visitors):
 *    <GuestOnly hideForVisitor>{content}</GuestOnly>
 *
 * 2. Show different content for visitors:
 *    <GuestOnly visitorFallback={<p>Limited info</p>}>{full content}</GuestOnly>
 *
 * 3. Show nothing for visitors (default):
 *    <GuestOnly>{content}</GuestOnly>
 */
export function GuestOnly({ children, visitorFallback, hideForVisitor = false }: GuestOnlyProps) {
  const { isAuthenticated, accessLevel } = useAccess()

  // If access level not set yet, don't render anything
  if (!accessLevel) {
    return null
  }

  // Guest sees everything
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Visitor handling
  if (hideForVisitor) {
    return null
  }

  return visitorFallback ? <>{visitorFallback}</> : null
}
