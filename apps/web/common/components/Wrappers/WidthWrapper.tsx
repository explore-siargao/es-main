import React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/common/helpers/cn"

const WidthWrapperVariants = cva(
  "flex flex-col mx-auto w-full max-w-[2520px] justify-center",
  {
    variants: {
      width: {
        small: "px-24 xl:px-72 2xl:px-96",
        medium: "px-24 2xl:px-40",
        home: "px-24 2xl:px-36",
        wide: "px-24 lg:px-5 max-w-full",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      width: "wide",
    },
  }
)

export interface WidthWrapperProps
  extends React.DetailsHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof WidthWrapperVariants> {
  children: React.ReactNode
}
const WidthWrapper = React.forwardRef<HTMLDivElement, WidthWrapperProps>(
  ({ className, children, width, ...props }, ref) => {
    return (
      <div className={cn(WidthWrapperVariants({ width, className }))}>
        {children}
      </div>
    )
  }
)
WidthWrapper.displayName = "WidthWrapper"
export { WidthWrapper, WidthWrapperVariants }
