"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

import { cn } from "@/common/helpers/cn"
import { buttonVariants } from "./Button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  size: "lg" | "md"
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  size = "md",
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={classNames}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
