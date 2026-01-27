"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { Guest, GuestResponse } from "./rsvp-types"

interface IndividualPreferencesProps {
  guests: Guest[]
  isAttending: boolean
  onComplete: (responses: Record<string, Partial<GuestResponse>>) => void
  onBack: () => void
}

export function IndividualPreferences({ 
  guests, 
  isAttending, 
  onComplete, 
  onBack 
}: IndividualPreferencesProps) {
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, Partial<GuestResponse>>>({})

  const currentGuest = guests[currentGuestIndex]
  const currentResponse = responses[currentGuest.id] || {}

  const updateCurrentResponse = (field: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [currentGuest.id]: {
        ...prev[currentGuest.id],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (currentGuestIndex < guests.length - 1) {
      setCurrentGuestIndex(prev => prev + 1)
    } else {
      onComplete(responses)
    }
  }

  const handleBack = () => {
    if (currentGuestIndex > 0) {
      setCurrentGuestIndex(prev => prev - 1)
    } else {
      onBack()
    }
  }

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "kosher", label: "Kosher" },
    { value: "halal", label: "Halal" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
  ]

  // Skip preferences if not attending
  if (!isAttending) {
    onComplete(responses)
    return null
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light tracking-wide mb-2">
          Dietary Preferences
        </h2>
        <p className="text-muted-foreground font-light">
          {guests.length > 1 
            ? `${currentGuest.firstName} ${currentGuest.lastName} (${currentGuestIndex + 1} of ${guests.length})`
            : `${currentGuest.firstName} ${currentGuest.lastName}`
          }
        </p>
      </div>

      <div className="space-y-6">
        {/* Allergies */}
        <div>
          <Label htmlFor="allergies">Allergies</Label>
          <Input
            id="allergies"
            placeholder="Please list any food allergies (e.g., peanuts, shellfish, dairy)"
            value={currentResponse.allergies || ""}
            onChange={(e) => updateCurrentResponse('allergies', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Dietary Restrictions */}
        <div>
          <Label>Dietary Restrictions</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {dietaryOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 hover:bg-muted/50 p-2 rounded cursor-pointer">
                <Checkbox
                  id={`dietary-${option.value}`}
                  checked={(currentResponse.dietaryRestrictions || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const current = currentResponse.dietaryRestrictions || []
                    const updated = checked
                      ? [...current, option.value]
                      : current.filter(d => d !== option.value)
                    updateCurrentResponse('dietaryRestrictions', updated)
                  }}
                  className="cursor-pointer"
                />
                <Label htmlFor={`dietary-${option.value}`} className="text-sm cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <Input
              placeholder="Other dietary requirements"
              value={currentResponse.otherDietary || ""}
              onChange={(e) => updateCurrentResponse('otherDietary', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={handleBack} className="flex-1 cursor-pointer">
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1 cursor-pointer"
        >
          {currentGuestIndex < guests.length - 1 ? "Next Person" : "Review & Submit"}
        </Button>
      </div>
    </div>
  )
}