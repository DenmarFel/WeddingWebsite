import { NextResponse } from "next/server"
import { google } from "googleapis"

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

export async function GET() {
  try {
    const sheets = await getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!spreadsheetId) {
      throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable')
    }

    // Read from "Seating" sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Seating!A2:C', // Skip header row
    })

    const rows = response.data.values || []
    
    // Convert rows to data structure: { "1": ["Name1", "Name2", ...], "2": [...] }
    const data: Record<string, string[]> = {}
    
    for (const row of rows) {
      const [tableNum, seatIdx, guestName] = row
      if (!tableNum) continue
      
      if (!data[tableNum]) {
        data[tableNum] = []
      }
      
      const idx = parseInt(seatIdx || '0', 10)
      data[tableNum][idx] = guestName || ''
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error loading seating chart:', error)
    return NextResponse.json(
      { error: 'Failed to load seating chart' },
      { status: 500 }
    )
  }
}
