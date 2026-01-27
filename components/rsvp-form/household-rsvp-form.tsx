"use client"

import { useState } from "react"
import { NameLookup } from "./name-lookup"
import { HouseholdSelection } from "./household-selection"
import { IndividualPreferences } from "./individual-preferences"
import { HouseholdReview } from "./household-review"
import { RsvpConfirmation } from "./rsvp-confirmation"
import { getHouseholdGuests } from "@/lib/guest-data"
import type { Guest, Household, GuestResponse, HouseholdRsvpData } from "./rsvp-types"

type FormStep = "lookup" | "selection" | "preferences" | "review" | "confirmation"

export function HouseholdRsvpForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("lookup")
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null)
  const [household, setHousehold] = useState<Household | null>(null)
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([])
  const [isAttending, setIsAttending] = useState(false)
  const [individualResponses, setIndividualResponses] = useState<Record<string, Partial<GuestResponse>>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectedGuests = selectedGuestIds
    .map(id => household?.guests.find(g => g.id === id))
    .filter(Boolean) as Guest[]

  const handleGuestSelected = (guest: Guest, householdData: Household) => {
    setCurrentGuest(guest)
    setHousehold(householdData)
    setCurrentStep("selection")
  }

  const handleSelectionComplete = (guestIds: string[], attending: boolean) => {
    setSelectedGuestIds(guestIds)
    setIsAttending(attending)
    
    // Initialize responses for selected guests
    const initialResponses: Record<string, Partial<GuestResponse>> = {}
    guestIds.forEach(id => {
      initialResponses[id] = {
        guestId: id,
        attending: attending
      }
    })
    setIndividualResponses(initialResponses)
    
    if (attending) {
      setCurrentStep("preferences")
    } else {
      // If not attending, skip to review
      setCurrentStep("review")
    }
  }

  const handlePreferencesComplete = (responses: Record<string, Partial<GuestResponse>>) => {
    setIndividualResponses(responses)
    setCurrentStep("review")
  }

  const handleSubmit = async (message: string) => {
    if (!currentGuest || !household) return

    // Prepare the final submission data with message duplicated for each guest
    const submissionData: HouseholdRsvpData = {
      householdId: household.id,
      submittedBy: currentGuest.id,
      submittedAt: new Date(),
      sharedResponses: {
        attending: isAttending
      },
      responses: selectedGuestIds.map(guestId => {
        const guest = household.guests.find(g => g.id === guestId)
        return {
          guestId,
          firstName: guest?.firstName || "",
          lastName: guest?.lastName || "",
          attending: isAttending,
          message: message, // Duplicate the message for each guest
          ...individualResponses[guestId]
        }
      }) as GuestResponse[]
    }

    try {
      // Send to API route
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (result.success) {
        console.log("RSVP saved successfully:", result)
        
        // Still store in localStorage as backup
        localStorage.setItem("household-rsvp-submitted", JSON.stringify(submissionData))
        
        setIsSubmitted(true)
        setCurrentStep("confirmation")
      } else {
        console.error("Failed to save RSVP:", result.error)
        // You might want to show an error message to the user here
        alert("Failed to save RSVP. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      // Fallback to localStorage if API fails
      localStorage.setItem("household-rsvp-submitted", JSON.stringify(submissionData))
      alert("There was an issue saving your RSVP, but it has been stored locally. Please contact us if this persists.")
      
      setIsSubmitted(true)
      setCurrentStep("confirmation")
    }
  }

  const handleBackToLookup = () => {
    setCurrentStep("lookup")
    setCurrentGuest(null)
    setHousehold(null)
    setSelectedGuestIds([])
    setIsAttending(false)
    setIndividualResponses({})
  }

  const handleBackToSelection = () => {
    setCurrentStep("selection")
  }

  const handleBackToPreferences = () => {
    setCurrentStep("preferences")
  }

  if (currentStep === "confirmation") {
    return (
      <RsvpConfirmation 
        formData={{
          firstName: currentGuest?.firstName || "",
          lastName: currentGuest?.lastName || "",
          attending: isAttending ? "yes" : "no",
          guestCount: selectedGuests.length,
          // Add other fields as needed for the confirmation component
        }} 
        isAttending={isAttending} 
      />
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2">RSVP</h1>
        <p className="text-muted-foreground font-light">Please respond by April 30, 2026</p>
      </div>

      {/* Form Content */}
      <div className="bg-card p-6 md:p-10">
        {currentStep === "lookup" && (
          <NameLookup onGuestSelected={handleGuestSelected} />
        )}

        {currentStep === "selection" && currentGuest && household && (
          <HouseholdSelection
            currentGuest={currentGuest}
            household={household}
            onSelectionComplete={handleSelectionComplete}
            onBack={handleBackToLookup}
          />
        )}

        {currentStep === "preferences" && (
          <IndividualPreferences
            guests={selectedGuests}
            isAttending={isAttending}
            onComplete={handlePreferencesComplete}
            onBack={handleBackToSelection}
          />
        )}

        {currentStep === "review" && currentGuest && household && (
          <HouseholdReview
            household={household}
            selectedGuests={selectedGuests}
            isAttending={isAttending}
            responses={individualResponses}
            submittedBy={currentGuest}
            onSubmit={handleSubmit}
            onBack={isAttending ? handleBackToPreferences : handleBackToSelection}
          />
        )}
      </div>
    </div>
  )
}