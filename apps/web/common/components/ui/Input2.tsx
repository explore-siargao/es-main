import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { Typography } from "./Typography"
import Asterisk from "./Asterisk"
 
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string,
  errorMessage?: string
  leftIcon?: React.ReactNode,
  description?:string
}
 
const Input2 = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, errorMessage, leftIcon, description, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-900"
        >
          {label} {props.required && <Asterisk />}
        </label>
        <Typography className="text-xs text-gray-500 italic">
          {description}
        </Typography>
        <div
          className={cn(
            "relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 mt-1",
            className
          )}
        >
          <div className="flex gap-1 items-center">
            {leftIcon}
            <input
              type={type}
              id={id}
              className="block w-full border-0 p-0 mb-2 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50"
              ref={ref}
              {...props}
            />
          </div>
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
Input2.displayName = "Input2"
 
export { Input2 }