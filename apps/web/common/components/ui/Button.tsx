import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/common/helpers/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-text-600 text-white hover:bg-text-700 focus:ring-2 focus:ring-offset-2 focus:ring-text-300",
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-300",
        danger:
          "bg-error-500 text-white hover:bg-error-600 focus:ring-2 focus:ring-offset-2 focus:ring-error-300",
        warning:
          "bg-warning-500 text-white hover:bg-warning-600 focus:ring-2 focus:ring-offset-2 focus:ring-warning-300",
        success:
          "bg-success-700 text-white hover:bg-success-600 focus:ring-2 focus:ring-offset-2 focus:ring-success-300",
        outline: "border border-text-300 bg-transparent hover:bg-text-50",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-2 focus:ring-offset-2 focus:ring-secondary-300",
        ghost: "text-text-600 hover:text-text-400",
        link: "text-text-500 hover:text-text-950 underline-offset-4 hover:underline",
        shaded:
          "border border-text-200 text-text-500 bg-transparent hover:bg-text-50 hover:bg-opacity-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
        link: "px-0 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  imagePosition?: Position
  icon?: React.ReactNode
}
enum Position {
  "end",
  "start",
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      icon,
      imagePosition,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {imagePosition === Position.start ? icon : null}
        {children}
        {imagePosition === Position.end ? icon : null}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
