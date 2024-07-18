import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { Typography } from "./Typography"
import Asterisk from "./Asterisk"
 
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string,
  errorMessage?: string
  leftIcon?: React.ReactNode,
  description?:string
}
 
const Textarea2 = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, errorMessage, leftIcon, description, ...props }, ref) => {
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
            "relative rounded-md ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 mt-1"
          )}
        >
          <div className="flex gap-1 items-center">
            {leftIcon}
            <textarea
              id={id}
              className={cn(
                "flex min-h-[80px] w-full px-3 text-sm border-0 focus:ring-0 bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}             ref={ref}
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
Textarea2.displayName = "Textarea2"
 
export { Textarea2 }