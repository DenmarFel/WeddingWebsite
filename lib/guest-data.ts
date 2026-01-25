import type { Guest, Household, NameSearchResult } from '@/components/rsvp-form/rsvp-types'
import guestDataJson from '@/data/sample-guest-data.json'

// Load guest data from JSON file
const GUEST_DATA: Household[] = guestDataJson.households

/**
 * Search for guests by name
 * Returns all matching guests with their household info
 */
export function searchGuestsByName(firstName: string, lastName?: string): NameSearchResult[] {
  const results: NameSearchResult[] = []
  
  for (const household of GUEST_DATA) {
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
  
  return results
}

/**
 * Get household by guest ID
 */
export function getHouseholdByGuestId(guestId: string): { guest: Guest; household: Household } | null {
  for (const household of GUEST_DATA) {
    const guest = household.guests.find(g => g.id === guestId)
    if (guest) {
      return { guest, household }
    }
  }
  return null
}

/**
 * Get all guests in a household
 */
export function getHouseholdGuests(householdId: string): Guest[] {
  const household = GUEST_DATA.find(h => h.id === householdId)
  return household?.guests || []
}

/**
 * Check if a guest can RSVP for others in their household
 * Anyone in the household can RSVP for others
 */
export function canGuestRsvpForHousehold(guestId: string, householdId: string): boolean {
  const household = GUEST_DATA.find(h => h.id === householdId)
  return household?.guests.some(g => g.id === guestId) || false
}

/**
 * Format household display name for disambiguation
 */
export function formatHouseholdDisplayName(household: Household): string {
  const guestNames = household.guests.map(g => g.firstName).join(', ')
  return `Household: ${guestNames}`
}