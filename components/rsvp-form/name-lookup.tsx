"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { searchGuestsByName, formatHouseholdDisplayName } from "@/lib/guest-data"
import type { Guest, Household, NameSearchResult } from "./rsvp-types"

interface NameLookupProps {
  onGuestSelected: (guest: Guest, household: Household) => void
}

export function NameLookup({ onGuestSelected }: NameLookupProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [searchResults, setSearchResults] = useState<NameSearchResult[]>([])
  const [selectedResult, setSelectedResult] = useState<string>("")
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!firstName.trim()) {
      setError("Please enter your first name")
      return
    }

    setIsSearching(true)
    setError("")

    try {
      const results = await searchGuestsByName(firstName.trim(), lastName.trim() || undefined)
      
      if (results.length === 0) {
        setError("We couldn't find your name on our guest list. Please check the spelling or contact us if you believe this is an error.")
        setSearchResults([])
        setShowResults(false)
        return
      }

      setSearchResults(results)
      
      // If only one result and not ambiguous, automatically proceed
      if (results.length === 1 && !results[0].isAmbiguous) {
        onGuestSelected(results[0].guest, results[0].household)
        return
      }

      // Otherwise show results for user to choose
      setShowResults(true)
      setSelectedResult("")
    } catch (err) {
      setError("An error occurred while searching. Please try again.")
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleContinue = () => {
    const selected = searchResults.find(r => r.guest.id === selectedResult)
    if (selected) {
      onGuestSelected(selected.guest, selected.household)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResults && selectedResult) {
        handleContinue()
      } else {
        handleSearch()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light tracking-wide mb-2">Find Your Invitation</h2>
        <p className="text-muted-foreground font-light">
          Enter your name as it appears on your invitation
        </p>
      </div>

      {!showResults && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your first name"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your last name (optional)"
              className="mt-1"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button 
            onClick={handleSearch}
            className="w-full"
            disabled={!firstName.trim() || isSearching}
          >
            {isSearching ? 'Searching...' : 'Find My Invitation'}
          </Button>
        </div>
      )}

      {showResults && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">
              {searchResults.length === 1 ? "Is this you?" : "Which invitation is yours?"}
            </h3>
            
            <RadioGroup value={selectedResult} onValueChange={setSelectedResult}>
              {searchResults.map((result) => (
                <div key={result.guest.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={result.guest.id} id={result.guest.id} className="cursor-pointer" />
                  <Label htmlFor={result.guest.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">
                      {result.guest.firstName} {result.guest.lastName}
                    </div>
                    {/* {result.isAmbiguous && (
                      <div className="text-sm text-muted-foreground">
                        {formatHouseholdDisplayName(result.household)}
                      </div>
                    )} */}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowResults(false)
                setSelectedResult("")
                setError("")
              }}
              className="flex-1"
            >
              Search Again
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={!selectedResult}
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}