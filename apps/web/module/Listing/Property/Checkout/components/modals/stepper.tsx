import { cn } from "@/common/helpers/cn"
import { Check, Ellipsis } from "lucide-react"

export interface Step {
  label: string
  status: "completed" | "current" | "upcoming"
}

interface StepperProps {
  steps: Step[]
  className?: string
}

export function Stepper({ steps, className }: StepperProps) {
  if (!steps?.length) return null

  const completedSteps = steps.filter(
    (step) => step.status === "completed"
  ).length
  const hasCurrentStep = steps.some((step) => step.status === "current")

  // Adjust progress width to stop at the current step
  const progress = (completedSteps / (steps.length - 1)) * 100

  return (
    <div className={cn("mx-auto w-full pb-10", className)}>
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="mx-4 absolute top-3 left-6 right-0 h-px bg-gray-200 -translate-y-1/2" />

        {/* Progress Line */}
        <div
          className="mx-4 absolute top-3 left-6 h-px bg-primary-500 transition-all duration-300 -translate-y-1/2"
          style={{ width: `${progress}%` }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center border-4",
                step.status === "completed" &&
                  "bg-primary-500 border-primary-500",
                step.status === "current" &&
                  "bg-secondary-500 border-secondary-500",
                step.status === "upcoming" && "bg-gray-300 border-gray-200"
              )}
              style={{ marginBottom: "8px" }}
            >
              {step.status === "completed" ? (
                <Check className="w-3 h-3 text-white stroke-2" />
              ) : step.status === "current" ? (
                <Ellipsis className="w-3 h-3 text-white stroke-2" />
              ) : null}
            </div>
            {/* Step Label */}
            <span
              className={cn(
                "mt-2 text-sm whitespace-nowrap",
                step.status === "upcoming" ? "text-gray-400" : "text-gray-600"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
