"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Guest, GuestResponse, Household } from "./rsvp-types"

interface HouseholdReviewProps {
  household: Household
  selectedGuests: Guest[]
  isAttending: boolean
  responses: Record<string, Partial<GuestResponse>>
  submittedBy: Guest
  onSubmit: (message: string) => void
  onBack: () => void
}

export function HouseholdReview({
  household,
  selectedGuests,
  isAttending,
  responses,
  submittedBy,
  onSubmit,
  onBack
}: HouseholdReviewProps) {
  const [message, setMessage] = useState("")

  const formatArrayField = (arr: string[] | undefined) => {
    return arr && arr.length > 0 ? arr.join(", ") : "None"
  }

  const handleSubmit = () => {
    onSubmit(message)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light tracking-wide mb-2">Review Your RSVP</h2>
        <p className="text-muted-foreground font-light">
          Please review the details below before submitting
        </p>
      </div>

      {/* Household Summary */}
      <div className="bg-muted/50 p-4 rounded-md">
        <h3 className="font-medium mb-2">RSVP Summary</h3>
        <div className="text-sm space-y-1">
          <div><strong>Submitted by:</strong> {submittedBy.firstName} {submittedBy.lastName}</div>
          <div><strong>Attending:</strong> {isAttending ? "Yes" : "No"}</div>
          <div><strong>Number of guests:</strong> {selectedGuests.length}</div>
        </div>
      </div>

      {/* Individual Responses */}
      <div className="space-y-4">
        <h3 className="font-medium">Guest Details</h3>
        {selectedGuests.map((guest) => {
          const response = responses[guest.id] || {}
          return (
            <div key={guest.id} className="border rounded-md p-4">
              <h4 className="font-medium mb-3">
                {guest.firstName} {guest.lastName}
                {guest.id === submittedBy.id && " (You)"}
              </h4>
              
              {/* Dietary Information (only if attending) */}
              {isAttending && (
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <strong>Allergies:</strong> {response.allergies || "None"}
                  </div>
                  <div>
                    <strong>Dietary Restrictions:</strong> {formatArrayField(response.dietaryRestrictions)}
                  </div>
                  <div>
                    <strong>Other Dietary:</strong> {response.otherDietary || "None"}
                  </div>
                </div>
              )}

              {!isAttending && (
                <div className="text-sm text-muted-foreground">
                  Not attending
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Message for the Couple */}
      <div>
        <Label htmlFor="message">Message for the Couple</Label>
        <Textarea
          id="message"
          placeholder="Share your well wishes or a note for us..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground mt-1">
          This message will be included with each person's RSVP response.
        </p>
      </div>

      {/* Important Notes */}
      <div className="bg-blue-50 p-4 rounded-md text-sm">
        <h4 className="font-medium mb-2">Important Notes:</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• You can update your RSVP by returning to this form anytime before the deadline</li>
          <li>• Anyone not included in this RSVP can still submit their own response</li>
          <li>• If you have questions, please contact us directly</li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex space-x-3 pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="flex-1 cursor-pointer">
          Back to Edit
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer">
          Submit RSVP
        </Button>
      </div>
    </div>
  )
}