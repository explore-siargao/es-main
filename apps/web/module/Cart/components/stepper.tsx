import { Typography } from "@/common/components/ui/Typography"
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

  return (
    <div className={cn("w-full pb-20 mt-5 flex items-center", className)}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center",
            index < steps.length - 1 && "w-full"
          )}
        >
          {/* Step Circle and Line */}
          <div className="relative flex items-center w-full">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center border-4 z-10",
                step.status === "completed" &&
                  "bg-primary-500 border-primary-500",
                step.status === "current" &&
                  "bg-secondary-500 border-secondary-500",
                step.status === "upcoming" && "bg-gray-300 border-gray-200"
              )}
            >
              {step.status === "completed" ? (
                <>
                  <Check className="w-3 h-3 text-white stroke-2" />
                  <Typography className="absolute top-7 whitespace-nowrap">
                    {step.label}
                  </Typography>
                </>
              ) : step.status === "current" ? (
                <>
                  <Ellipsis className="w-3 h-3 text-white stroke-2" />{" "}
                  <Typography className="absolute top-7">
                    {step.label}
                  </Typography>
                </>
              ) : (
                <Typography className="absolute top-7">{step.label}</Typography>
              )}
            </div>

            {/* Line Segment */}
            {index < steps.length - 1 && (
              <div className="relative flex-1">
                <div className="absolute top-1/2 -translate-y-1/2 h-px bg-gray-200 left-3 right-3">
                  <div
                    className={cn(
                      "absolute h-px bg-primary-500 transition-all duration-300",
                      steps[index]?.status === "completed" && "w-full",
                      steps[index]?.status !== "completed" && "w-0"
                    )}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
