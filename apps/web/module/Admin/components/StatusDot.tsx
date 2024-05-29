import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { VariantProps, cva } from "class-variance-authority"

const StatusDotVariants = cva("", {
  variants: {
    variant: {
      live: "bg-green-500",
      declined: "bg-red-500",
      pending: "bg-yellow-500",
      incomplete: "bg-amber-500",
    },
  },
  defaultVariants: {
    variant: "incomplete",
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
