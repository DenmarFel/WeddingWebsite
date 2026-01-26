export type QuestionType = "text" | "textarea" | "select" | "radio" | "checkbox" | "number" | "email"

export interface QuestionOption {
  value: string
  label: string
}

export interface RsvpQuestion {
  id: string
  type: QuestionType
  label: string
  required: boolean
  placeholder?: string
  options?: QuestionOption[]
  step: number
  conditionalOn?: {
    field: string
    value: string
  }
  min?: number
  max?: number
}

export type RsvpFormData = Record<string, string | string[] | number>

// New types for household-based RSVP system
export interface Guest {
  id: string
  firstName: string
  lastName: string
  householdId: string
}

export interface Household {
  id: string
  guests: Guest[]
}

export interface GuestResponse {
  guestId: string
  attending: boolean
  allergies?: string
  dietaryRestrictions?: string[]
  otherDietary?: string
  message?: string // Will be duplicated from the review screen
}

export interface HouseholdRsvpData {
  householdId: string
  submittedBy: string // Guest ID of who submitted the form
  submittedAt: Date
  responses: GuestResponse[]
  sharedResponses: {
    // Questions that apply to the whole group
    attending: boolean // Overall household attendance decision
  }
}

// For the name lookup/disambiguation flow
export interface NameSearchResult {
  guest: Guest
  household: Household
  isAmbiguous: boolean // true if multiple guests have the same name
}

// Form state for multi-guest selection
export interface MultiGuestFormData {
  selectedGuestIds: string[] // Which guests the submitter is RSVPing for
  householdAttending: boolean // Overall attendance decision
  individualResponses: Record<string, Partial<GuestResponse>> // Individual preferences per guest
}
