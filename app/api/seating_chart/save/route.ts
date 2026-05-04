import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json()
    
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      )
    }

    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!spreadsheetId) {
      throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable')
    }

    // Convert data object to rows: [tableNum, seatIdx, guestName]
    const rows: (string | number)[][] = [['Table Number', 'Seat Index', 'Guest Name']]
    
    for (const [tableNum, seats] of Object.entries(data)) {
      if (Array.isArray(seats)) {
        seats.forEach((guestName, idx) => {
          rows.push([tableNum, idx, guestName || ''])
        })
      }
    }

    // Clear existing data and write new data to "Seating" sheet
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Seating!A:C',
    })

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Seating!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: rows,
      },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving seating chart:", error)
    return NextResponse.json(
      { error: "Failed to save seating chart" },
      { status: 500 }
    )
  }
}
