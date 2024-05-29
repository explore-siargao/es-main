import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { VariantProps, cva } from "class-variance-authority"

const PaymentStatusVariants = cva("", {
  variants: {
    variant: {
      Success: "bg-green-400",
      InProgress: "bg-orange-400",
      Denied: "bg-red-400",
    },
  },
  defaultVariants: {
    variant: "InProgress",
  },
})

export interface PaymentStatusProps
  extends React.DetailsHTMLAttributes<HTMLElement>,
    VariantProps<typeof PaymentStatusVariants> {
  children?: React.ReactNode
}

const PaymentStatus = React.forwardRef<HTMLElement, PaymentStatusProps>(
  ({ variant, className, children }, ref) => {
    const PaymentStatusClass = PaymentStatusVariants({ variant, className })
    return (
      <span
        ref={ref}
        className={cn(
          "rounded-full w-2 h-2 inline-block mr-2",
          PaymentStatusClass
        )}
      >
        {children}
      </span>
    )
  }
)
PaymentStatus.displayName = "PaymentStatus"

export { PaymentStatus, PaymentStatusVariants }
