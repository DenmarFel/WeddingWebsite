import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import type { Guest, Household, NameSearchResult } from '@/components/rsvp-form/rsvp-types'

// Initialize Google Sheets API
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

// Cache for guest data (optional - helps with performance)
let cachedGuestData: { households: Household[]; timestamp: number } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchGuestData(): Promise<Household[]> {
  // Check cache first
  if (cachedGuestData && Date.now() - cachedGuestData.timestamp < CACHE_DURATION) {
    return cachedGuestData.households
  }

  const sheets = await getGoogleSheetsClient()
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!spreadsheetId) {
    throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID environment variable')
  }

  // Fetch guest data from sheet
  // Expected format: Two columns (First Name, Last Name)
  // Blank rows separate households
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "'Guest List'!A2:B", // Skip header row
  })

  const rows = response.data.values || []
  
  // Helper to generate ID from name
  const generateId = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
  
  // Group guests by household (separated by blank rows)
  const householdsMap = new Map<string, Household>()
  let currentHouseholdGuests: Guest[] = []
  let householdCounter = 1
  
  for (const row of rows) {
    // Check if row is blank (new household separator)
    if (!row || row.length === 0 || (!row[0]?.trim() && !row[1]?.trim())) {
      // Save current household if it has guests
      if (currentHouseholdGuests.length > 0) {
        const householdId = `household-${householdCounter}`
        householdsMap.set(householdId, {
          id: householdId,
          guests: [...currentHouseholdGuests],
        })
        currentHouseholdGuests = []
        householdCounter++
      }
      continue
    }
    
    const firstName = row[0]?.trim()
    const lastName = row[1]?.trim()
    
    if (!firstName) continue // Skip if no first name
    
    // Auto-generate guest ID
    const guestId = `guest-${generateId(firstName)}-${generateId(lastName || '')}`
    
    currentHouseholdGuests.push({
      id: guestId,
      firstName,
      lastName: lastName || '',
    })
  }
  
  // Don't forget the last household
  if (currentHouseholdGuests.length > 0) {
    const householdId = `household-${householdCounter}`
    householdsMap.set(householdId, {
      id: householdId,
      guests: [...currentHouseholdGuests],
    })
  }
  
  const households = Array.from(householdsMap.values())
  
  // Update cache
  cachedGuestData = {
    households,
    timestamp: Date.now(),
  }
  
  return households
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const firstName = searchParams.get('firstName')
    const lastName = searchParams.get('lastName')
    
    if (!firstName) {
      return NextResponse.json(
        { error: 'firstName parameter is required' },
        { status: 400 }
      )
    }
    
    // Fetch guest data from Google Sheets
    const households = await fetchGuestData()
    
    // Search for matching guests
    const results: NameSearchResult[] = []
    
    for (const household of households) {
      for (const guest of household.guests) {
        const firstNameMatch = guest.firstName.toLowerCase() === firstName.toLowerCase()
        const lastNameMatch = !lastName || guest.lastName.toLowerCase() === lastName.toLowerCase()
        
        if (firstNameMatch && lastNameMatch) {
          results.push({
            guest,
            household,
            isAmbiguous: false, // Will be set after we check all results
          })
        }
      }
    }
    
    // Mark as ambiguous if multiple guests found with same name
    if (results.length > 1) {
      results.forEach(result => {
        result.isAmbiguous = true
      })
    }
    
    return NextResponse.json({
      success: true,
      results,
      count: results.length,
    })
    
  } catch (error) {
    console.error('Error searching guests:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search guests',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
