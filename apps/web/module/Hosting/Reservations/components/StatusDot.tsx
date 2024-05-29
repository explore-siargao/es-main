import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { VariantProps, cva } from "class-variance-authority"

const StatusDotVariants = cva("", {
  variants: {
    variant: {
      completed: "bg-green-500",
      incoming: "bg-yellow-500",
      canceled: "bg-red-500",
    },
  },
  defaultVariants: {
    variant: "incoming",
  },
})

export interface StatusDotProps
  extends React.DetailsHTMLAttributes<HTMLElement>,
    VariantProps<typeof StatusDotVariants> {
  children?: React.ReactNode
}

const StatusDot = React.forwardRef<HTMLElement, StatusDotProps>(
  ({ variant, className, children }, ref) => {
    const StatusDotClass = StatusDotVariants({
      variant,
      className,
    })
    return (
      <span
        ref={ref}
        className={cn("rounded-full w-2 h-2 inline-block mr-2", StatusDotClass)}
      >
        {children}
      </span>
    )
  }
)
StatusDot.displayName = "StatusDot"

export { StatusDot, StatusDotVariants }
