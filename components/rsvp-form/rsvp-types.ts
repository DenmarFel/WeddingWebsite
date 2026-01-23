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
