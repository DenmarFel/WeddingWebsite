"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Guest, Household } from "./rsvp-types"

interface HouseholdSelectionProps {
  currentGuest: Guest
  household: Household
  onSelectionComplete: (selectedGuestIds: string[], attending: boolean) => void
  onBack: () => void
}

export function HouseholdSelection({ 
  currentGuest, 
  household, 
  onSelectionComplete, 
  onBack 
}: HouseholdSelectionProps) {
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([currentGuest.id])
  const [attending, setAttending] = useState<string>("")

  const handleGuestToggle = (guestId: string, checked: boolean) => {
    setSelectedGuestIds(prev => 
      checked 
        ? [...prev, guestId]
        : prev.filter(id => id !== guestId)
    )
  }

  const handleContinue = () => {
    if (attending && selectedGuestIds.length > 0) {
      onSelectionComplete(selectedGuestIds, attending === "yes")
    }
  }

  const otherGuests = household.guests.filter(g => g.id !== currentGuest.id)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light tracking-wide mb-2">
          Welcome, {currentGuest.firstName}!
        </h2>
        <p className="text-muted-foreground font-light">
          Who are you RSVPing for today?
        </p>
      </div>

      {/* Guest Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select guests to RSVP for:</h3>
        
        {/* Current guest (always selected) */}
        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
          <Checkbox 
            id={currentGuest.id}
            checked={true}
            disabled={true}
          />
          <Label htmlFor={currentGuest.id} className="flex-1">
            <div className="font-medium">
              {currentGuest.firstName} {currentGuest.lastName} (You)
            </div>
          </Label>
        </div>

        {/* Other household members */}
        {otherGuests.map((guest) => (
          <div key={guest.id} className="flex items-center space-x-2 p-3 border rounded-md">
            <Checkbox 
              id={guest.id}
              checked={selectedGuestIds.includes(guest.id)}
              onCheckedChange={(checked) => handleGuestToggle(guest.id, checked as boolean)}
            />
            <Label htmlFor={guest.id} className="flex-1 cursor-pointer">
              <div className="font-medium">
                {guest.firstName} {guest.lastName}
              </div>
            </Label>
          </div>
        ))}

        <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
          <strong>Note:</strong> You can RSVP for your entire household, or uncheck names if you'd prefer 
          they submit their own responses. Anyone you don't select can still RSVP individually later.
        </div>
      </div>

      {/* Attendance Decision */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Will you be joining us?</h3>
        <RadioGroup value={attending} onValueChange={setAttending}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="attending-yes" />
            <Label htmlFor="attending-yes">Joyfully Accept</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="attending-no" />
            <Label htmlFor="attending-no">Regretfully Decline</Label>
          </div>
        </RadioGroup>
        
        {attending === "yes" && (
          <div className="text-sm text-muted-foreground bg-green-50 p-3 rounded-md">
            Great! We'll ask for individual preferences (dietary restrictions, allergies, etc.) for each person on the next steps.
          </div>
        )}
        
        {attending === "no" && (
          <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">
            We're sorry you can't make it! You can still leave a message for the couple if you'd like.
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={!attending || selectedGuestIds.length === 0}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}