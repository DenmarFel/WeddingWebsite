import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.SEATING_CHART_PASSWORD

  if (!correctPassword) {
    return NextResponse.json(
      { error: "Password not configured" },
      { status: 500 }
    )
  }

  if (password === correctPassword) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: "Incorrect password" },
    { status: 401 }
  )
}
