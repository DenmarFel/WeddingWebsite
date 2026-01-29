import type { Guest, Household, NameSearchResult } from '@/components/rsvp-form/rsvp-types'

/**
 * Search for guests by name via API
 * Returns all matching guests with their household info
 */
export async function searchGuestsByName(firstName: string, lastName?: string): Promise<NameSearchResult[]> {
  const params = new URLSearchParams({ firstName })
  if (lastName) {
    params.append('lastName', lastName)
  }
  
  const response = await fetch(`/api/guests/search?${params.toString()}`)
  
  if (!response.ok) {
    throw new Error('Failed to search guests')
  }
  
  const data = await response.json()
  return data.results || []
}

/**
 * Get household by guest ID via API
 */
export async function getHouseholdByGuestId(guestId: string): Promise<{ guest: Guest; household: Household } | null> {
  const response = await fetch(`/api/guests/household?guestId=${encodeURIComponent(guestId)}`)
  
  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error('Failed to fetch household')
  }
  
  const data = await response.json()
  return data.success ? { guest: data.guest, household: data.household } : null
}

/**
 * Get all guests in a household via API
 */
export async function getHouseholdGuests(householdId: string): Promise<Guest[]> {
  const response = await fetch(`/api/guests/household?householdId=${encodeURIComponent(householdId)}`)
  
  if (!response.ok) {
    if (response.status === 404) {
      return []
    }
    throw new Error('Failed to fetch household guests')
  }
  
  const data = await response.json()
  return data.guests || []
}

/**
 * Check if a guest can RSVP for others in their household
 * Anyone in the household can RSVP for others
 */
export function canGuestRsvpForHousehold(guestId: string, household: Household): boolean {
  return household.guests.some(g => g.id === guestId)
}

/**
 * Format household display name for disambiguation
 */
export function formatHouseholdDisplayName(household: Household): string {
  const guestNames = household.guests.map(g => `${g.firstName} ${g.lastName}`).join(', ')
  return `${guestNames}`
}