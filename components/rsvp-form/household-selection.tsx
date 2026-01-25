"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Guest, Household } from "./rsvp-types"

interface GuestContactInfo {
  email: string
  phone: string
}

interface HouseholdSelectionProps {
  currentGuest: Guest
  household: Household
  onSelectionComplete: (selectedGuestIds: string[], attending: boolean, contactUpdates: Record<string, GuestContactInfo>) => void
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
  const [contactInfo, setContactInfo] = useState<Record<string, GuestContactInfo>>(() => {
    // Initialize with existing contact info
    const initial: Record<string, GuestContactInfo> = {}
    household.guests.forEach(guest => {
      initial[guest.id] = {
        email: guest.email || "",
        phone: guest.phone || ""
      }
    })
    return initial
  })

  const handleGuestToggle = (guestId: string, checked: boolean) => {
    setSelectedGuestIds(prev => 
      checked 
        ? [...prev, guestId]
        : prev.filter(id => id !== guestId)
    )
  }

  const handleContactInfoChange = (guestId: string, field: 'email' | 'phone', value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [guestId]: {
        ...prev[guestId],
        [field]: value
      }
    }))
  }

  const handleContinue = () => {
    if (attending && selectedGuestIds.length > 0) {
      onSelectionComplete(selectedGuestIds, attending === "yes", contactInfo)
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
        <div className="p-4 bg-muted/50 rounded-md border">
          <div className="flex items-center space-x-2 mb-3">
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
          
          {/* Contact info for current guest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
            <div>
              <Label htmlFor={`email-${currentGuest.id}`} className="text-sm">Email</Label>
              <Input
                id={`email-${currentGuest.id}`}
                type="email"
                placeholder="your@email.com"
                value={contactInfo[currentGuest.id]?.email || ""}
                onChange={(e) => handleContactInfoChange(currentGuest.id, 'email', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`phone-${currentGuest.id}`} className="text-sm">Phone</Label>
              <Input
                id={`phone-${currentGuest.id}`}
                type="tel"
                placeholder="555-0123"
                value={contactInfo[currentGuest.id]?.phone || ""}
                onChange={(e) => handleContactInfoChange(currentGuest.id, 'phone', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Other household members */}
        {otherGuests.map((guest) => (
          <div key={guest.id} className="p-4 border rounded-md">
            <div className="flex items-center space-x-2 mb-3">
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
            
            {/* Contact info for other guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
              <div>
                <Label htmlFor={`email-${guest.id}`} className="text-sm">Email</Label>
                <Input
                  id={`email-${guest.id}`}
                  type="email"
                  placeholder="their@email.com"
                  value={contactInfo[guest.id]?.email || ""}
                  onChange={(e) => handleContactInfoChange(guest.id, 'email', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`phone-${guest.id}`} className="text-sm">Phone</Label>
                <Input
                  id={`phone-${guest.id}`}
                  type="tel"
                  placeholder="555-0123"
                  value={contactInfo[guest.id]?.phone || ""}
                  onChange={(e) => handleContactInfoChange(guest.id, 'phone', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
          <strong>Note:</strong> You can RSVP for your entire household, or uncheck names if you'd prefer 
          they submit their own responses. Anyone you don't select can still RSVP individually later.
          Please update contact information as needed.
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