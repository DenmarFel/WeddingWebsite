import { NextRequest, NextResponse } from "next/server"
import { SEATING_AUTH_COOKIE, createSessionToken, isCorrectPassword } from "@/lib/seating-auth"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (!process.env.SEATING_CHART_PASSWORD) {
    return NextResponse.json(
      { error: "Password not configured" },
      { status: 500 }
    )
  }

  if (isCorrectPassword(password)) {
    const response = NextResponse.json({ success: true })
    response.cookies.set(SEATING_AUTH_COOKIE, createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/seating_chart",
      maxAge: 60 * 60 * 12, // 12 hours
    })
    return response
  }

  return NextResponse.json(
    { error: "Incorrect password" },
    { status: 401 }
  )
}
