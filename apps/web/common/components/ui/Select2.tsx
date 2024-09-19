import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { Typography } from "./Typography"
import Asterisk from "./Asterisk"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  errorMessage?: string
  leftIcon?: React.ReactNode
  description?: string
}

const Select2 = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      children,
      id,
      label,
      errorMessage,
      leftIcon,
      description,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id} className="block text-text-900">
          <Typography variant="h4" fontWeight="semibold">
            {label} {props.required && <Asterisk />}
          </Typography>
        </label>
        <Typography className="text-xs text-gray-500 italic">
          {description}
        </Typography>
        <div
          className={cn(
            "rounded-xl py-3 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 mt-2",
            className
          )}
        >
          <select
            ref={ref}
            className="block w-full px-3 border-0 py-0 pl-3 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50"
            {...props}
          >
            {children}
          </select>
        </div>
        {errorMessage && (
          <Typography className="text-error-600 ml-1">
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
Select2.displayName = "Select2"

export { Select2 }
