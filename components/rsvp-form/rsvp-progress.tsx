interface RsvpProgressProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function RsvpProgress({ currentStep, totalSteps, stepTitle }: RsvpProgressProps) {
  return (
    <div className="text-center">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-12 rounded-full transition-colors duration-300 ${
              index + 1 <= currentStep ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Step title */}
      <p className="text-sm tracking-wider uppercase text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </p>
      <h2 className="text-xl md:text-2xl font-light tracking-wide mt-1">{stepTitle}</h2>
    </div>
  )
}
