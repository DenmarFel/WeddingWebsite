"use client"

import { useState } from "react"
import { RsvpStep } from "./rsvp-step"
import { RsvpProgress } from "./rsvp-progress"
import { RsvpConfirmation } from "./rsvp-confirmation"
import type { RsvpFormData, RsvpQuestion } from "./rsvp-types"

/*
  MODULAR RSVP FORM
  -----------------
  To add/remove/modify questions:
  1. Edit the RSVP_QUESTIONS array below
  2. Each question has:
     - id: unique identifier (also the key in form data)
     - type: "text" | "textarea" | "select" | "radio" | "checkbox" | "number" | "email"
     - label: the question text
     - required: whether it's required
     - options: for select/radio/checkbox types
     - placeholder: optional placeholder text
     - conditionalOn: optional - only show if another field has a specific value
     - min/max: for number inputs
     
  The form automatically handles:
  - Multi-step navigation
  - Validation
  - Conditional questions (e.g., show meal choice only if attending)
*/

const RSVP_QUESTIONS: RsvpQuestion[] = [
  // Step 1: Basic Info
  {
    id: "firstName",
    type: "text",
    label: "First Name",
    required: true,
    placeholder: "Your first name",
    step: 1,
  },
  {
    id: "lastName",
    type: "text",
    label: "Last Name",
    required: true,
    placeholder: "Your last name",
    step: 1,
  },
  {
    id: "email",
    type: "email",
    label: "Email Address",
    required: true,
    placeholder: "your@email.com",
    step: 1,
  },

  // Step 2: Attendance
  {
    id: "attending",
    type: "radio",
    label: "Will you be joining us?",
    required: true,
    options: [
      { value: "yes", label: "Joyfully Accept" },
      { value: "no", label: "Regretfully Decline" },
    ],
    step: 2,
  },
  {
    id: "guestCount",
    type: "number",
    label: "Number of guests (including yourself)",
    required: true,
    min: 1,
    max: 5,
    step: 2,
    conditionalOn: { field: "attending", value: "yes" },
  },
  {
    id: "guestNames",
    type: "textarea",
    label: "Guest Names",
    required: false,
    placeholder: "Please list the names of your guests",
    step: 2,
    conditionalOn: { field: "attending", value: "yes" },
  },

  // Step 3: Meal & Dietary (only if attending)
  {
    id: "mealChoice",
    type: "select",
    label: "Meal Preference",
    required: true,
    options: [
      { value: "", label: "Select your preference" },
      { value: "beef", label: "Filet Mignon" },
      { value: "chicken", label: "Herb Roasted Chicken" },
      { value: "fish", label: "Pan-Seared Salmon" },
      { value: "vegetarian", label: "Vegetarian Option" },
      { value: "vegan", label: "Vegan Option" },
    ],
    step: 3,
    conditionalOn: { field: "attending", value: "yes" },
  },
  {
    id: "allergies",
    type: "checkbox",
    label: "Allergies",
    required: false,
    options: [
      { value: "peanuts", label: "Peanuts" },
      { value: "tree-nuts", label: "Tree Nuts" },
      { value: "dairy", label: "Dairy" },
      { value: "eggs", label: "Eggs" },
      { value: "soy", label: "Soy" },
      { value: "wheat", label: "Wheat/Gluten" },
      { value: "shellfish", label: "Shellfish" },
      { value: "fish", label: "Fish" },
      { value: "sesame", label: "Sesame" },
    ],
    step: 3,
    conditionalOn: { field: "attending", value: "yes" },
  },
  {
    id: "otherAllergies",
    type: "text",
    label: "Other Allergies",
    required: false,
    placeholder: "Please specify any other allergies",
    step: 3,
    conditionalOn: { field: "attending", value: "yes" },
  },
  {
    id: "dietaryRestrictions",
    type: "checkbox",
    label: "Dietary Restrictions",
    required: false,
    options: [
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "kosher", label: "Kosher" },
      { value: "halal", label: "Halal" },
      { value: "gluten-free", label: "Gluten-Free" },
      { value: "dairy-free", label: "Dairy-Free" },
    ],
    step: 3,
    conditionalOn: { field: "attending", value: "yes" },
  },
  {
    id: "otherDietary",
    type: "text",
    label: "Other Dietary Requirements",
    required: false,
    placeholder: "Any other dietary needs we should know about",
    step: 3,
    conditionalOn: { field: "attending", value: "yes" },
  },

  // Step 4: Additional Info
  {
    id: "songRequest",
    type: "text",
    label: "Song Request",
    required: false,
    placeholder: "What song will get you on the dance floor?",
    step: 4,
    conditionalOn: { field: "attending", value: "yes" },
  },
  {
    id: "message",
    type: "textarea",
    label: "Message for the Couple",
    required: false,
    placeholder: "Share your well wishes or a note for us...",
    step: 4,
  },
]

const STEP_TITLES = ["Your Information", "Attendance", "Meal Preferences", "Final Details"]

export function RsvpForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RsvpFormData>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Determine total steps based on attendance
  const isAttending = formData.attending === "yes"
  const totalSteps = isAttending ? 4 : 2

  // Get questions for current step
  const currentQuestions = RSVP_QUESTIONS.filter((q) => {
    if (q.step !== currentStep) return false

    // Check conditional visibility
    if (q.conditionalOn) {
      return formData[q.conditionalOn.field] === q.conditionalOn.value
    }

    return true
  })

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    currentQuestions.forEach((q) => {
      if (q.required) {
        const value = formData[q.id]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[q.id] = `${q.label} is required`
        }
      }

      // Email validation
      if (q.type === "email" && formData[q.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[q.id] as string)) {
          newErrors[q.id] = "Please enter a valid email address"
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      // If not attending and on step 2, skip to final step
      if (!isAttending && currentStep === 2) {
        setCurrentStep(4)
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
      }
    }
  }

  const handleBack = () => {
    // If not attending and on step 4, go back to step 2
    if (!isAttending && currentStep === 4) {
      setCurrentStep(2)
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1))
    }
  }

  const handleSubmit = () => {
    if (validateStep()) {
      // Here you would send the data to your backend
      console.log("RSVP Submitted:", formData)
      localStorage.setItem("rsvp-submitted", "true")
      setIsSubmitted(true)
    }
  }

  const updateFormData = (id: string, value: string | string[] | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear error when field is updated
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  if (isSubmitted) {
    return <RsvpConfirmation formData={formData} isAttending={isAttending} />
  }

  // Calculate progress step (accounting for skipped steps when not attending)
  const progressStep = !isAttending && currentStep === 4 ? 2 : currentStep
  const progressTotal = !isAttending ? 2 : totalSteps

  return (
    <div className="max-w-xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2">RSVP</h1>
        <p className="text-muted-foreground font-light">Please respond by April 17, 2026</p>
      </div>

      {/* Progress */}
      <RsvpProgress currentStep={progressStep} totalSteps={progressTotal} stepTitle={STEP_TITLES[currentStep - 1]} />

      {/* Form Step */}
      <div className="bg-card p-6 md:p-10 mt-8">
        <RsvpStep questions={currentQuestions} formData={formData} errors={errors} onUpdate={updateFormData} />

        {/* Navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t border-border">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-sm tracking-wider uppercase font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {(isAttending ? currentStep < totalSteps : currentStep < 4) ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm tracking-widest uppercase"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors text-sm tracking-widest uppercase"
            >
              Submit RSVP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
