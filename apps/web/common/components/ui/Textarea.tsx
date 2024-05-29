import * as React from "react"
import { cn } from "@/common/helpers/cn"
import Asterisk from "./Asterisk"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div>
        <div
          className={cn(
            "relative rounded-md ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600"
          )}
        >
          {label && (
            <label
              htmlFor={id}
              className="block text-xs font-medium text-text-900 px-3 pt-2.5"
            >
              {label} {props.required && <Asterisk />}
            </label>
          )}
          <textarea
            className={cn(
              "flex min-h-[80px] w-full px-3 text-sm border-0 focus:ring-0 bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
