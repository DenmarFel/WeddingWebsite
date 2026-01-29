import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import type { HouseholdRsvpData } from '@/components/rsvp-form/rsvp-types'

// Initialize Google Sheets API
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
    const rsvpData: HouseholdRsvpData = await request.json()
    
    // Get Google Sheets client
    const sheets = await getGoogleSheetsClient()
    // Use the same spreadsheet as guest list
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!spreadsheetId) {
      throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable')
    }

    const sheetName = 'RSVP Submissions'

    // Check if headers exist, if not add them
    const headerRange = `'${sheetName}'!A1:K1`
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange,
    })

    // If no headers, add them
    if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            'Submission Date',
            'Household ID', 
            'Submitted By',
            'Guest ID',
            'First Name',
            'Last Name',
            'Attending',
            'Allergies',
            'Dietary Restrictions',
            'Other Dietary',
            'Message'
          ]],
        },
      })
    }

    // Prepare rows for each guest response
    const rows = rsvpData.responses.map(response => [
      new Date(rsvpData.submittedAt).toLocaleString(), // Submission Date
      rsvpData.householdId, // Household ID
      rsvpData.submittedBy, // Submitted By (Guest ID)
      response.guestId, // Guest ID
      response.firstName, // First Name
      response.lastName, // Last Name
      response.attending ? 'Yes' : 'No', // Attending
      response.allergies || '', // Allergies
      Array.isArray(response.dietaryRestrictions) 
        ? response.dietaryRestrictions.join(', ') 
        : '', // Dietary Restrictions
      response.otherDietary || '', // Other Dietary
      response.message || '', // Message
    ])

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:K`,
      valueInputOption: 'RAW',
      requestBody: {
        values: rows,
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP saved successfully',
      guestCount: rsvpData.responses.length,
      sheetName: sheetName
    })

  } catch (error) {
    console.error('Error saving RSVP to Google Sheets:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save RSVP',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}