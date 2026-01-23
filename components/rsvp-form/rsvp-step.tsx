"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RsvpQuestion, RsvpFormData } from "./rsvp-types"

interface RsvpStepProps {
  questions: RsvpQuestion[]
  formData: RsvpFormData
  errors: Record<string, string>
  onUpdate: (id: string, value: string | string[] | number) => void
}

export function RsvpStep({ questions, formData, errors, onUpdate }: RsvpStepProps) {
  const renderQuestion = (question: RsvpQuestion) => {
    const value = formData[question.id]
    const error = errors[question.id]

    const labelElement = (
      <Label htmlFor={question.id} className="text-sm tracking-wider uppercase mb-2 block">
        {question.label}
        {question.required && <span className="text-accent ml-1">*</span>}
      </Label>
    )

    const errorElement = error && <p className="text-sm text-destructive mt-1">{error}</p>

    switch (question.type) {
      case "text":
      case "email":
        return (
          <div key={question.id} className="space-y-2">
            {labelElement}
            <Input
              id={question.id}
              type={question.type}
              value={(value as string) || ""}
              onChange={(e) => onUpdate(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="bg-background border-border"
            />
            {errorElement}
          </div>
        )

      case "number":
        return (
          <div key={question.id} className="space-y-2">
            {labelElement}
            <Input
              id={question.id}
              type="number"
              min={question.min}
              max={question.max}
              value={(value as number) || question.min || 1}
              onChange={(e) => onUpdate(question.id, Number.parseInt(e.target.value, 10))}
              className="bg-background border-border w-24"
            />
            {errorElement}
          </div>
        )

      case "textarea":
        return (
          <div key={question.id} className="space-y-2">
            {labelElement}
            <Textarea
              id={question.id}
              value={(value as string) || ""}
              onChange={(e) => onUpdate(question.id, e.target.value)}
              placeholder={question.placeholder}
              className="bg-background border-border resize-none"
              rows={3}
            />
            {errorElement}
          </div>
        )

      case "select":
        return (
          <div key={question.id} className="space-y-2">
            {labelElement}
            <Select value={(value as string) || ""} onValueChange={(val) => onUpdate(question.id, val)}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder={question.options?.[0]?.label || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {question.options?.slice(1).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errorElement}
          </div>
        )

      case "radio":
        return (
          <div key={question.id} className="space-y-4">
            {labelElement}
            <RadioGroup
              value={(value as string) || ""}
              onValueChange={(val) => onUpdate(question.id, val)}
              className="space-y-3"
            >
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="font-light cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errorElement}
          </div>
        )

      case "checkbox":
        return (
          <div key={question.id} className="space-y-4">
            {labelElement}
            <div className="grid grid-cols-2 gap-3">
              {question.options?.map((option) => {
                const checked = Array.isArray(value) && value.includes(option.value)
                return (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option.value}`}
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const currentValues = Array.isArray(value) ? value : []
                        if (isChecked) {
                          onUpdate(question.id, [...currentValues, option.value])
                        } else {
                          onUpdate(
                            question.id,
                            currentValues.filter((v) => v !== option.value),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option.value}`} className="font-light text-sm cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                )
              })}
            </div>
            {errorElement}
          </div>
        )

      default:
        return null
    }
  }

  return <div className="space-y-6">{questions.map(renderQuestion)}</div>
}
