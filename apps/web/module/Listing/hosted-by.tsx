import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import Image from "@/common/components/ui/image"
import React from "react"
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns"

function getRelativeDifference(
  inputDateString: string,
  currentDateString: string = new Date().toISOString()
): string {
  const inputDate = new Date(inputDateString)
  const currentDate = new Date(currentDateString)

  if (isNaN(inputDate.getTime()) || isNaN(currentDate.getTime())) {
    throw new Error("Invalid date format. Please provide valid date strings.")
  }

  const yearsDiff = differenceInYears(inputDate, currentDate)
  if (yearsDiff !== 0) {
    return `${Math.abs(yearsDiff)} year${Math.abs(yearsDiff) > 1 ? "s" : ""}`
  }

  const monthsDiff = differenceInMonths(inputDate, currentDate)
  if (monthsDiff !== 0) {
    return `${Math.abs(monthsDiff)} month${Math.abs(monthsDiff) > 1 ? "s" : ""}`
  }

  const daysDiff = differenceInDays(inputDate, currentDate)
  return `${Math.abs(daysDiff)} day${Math.abs(daysDiff) > 1 ? "s" : ""}`
}

const HostedBy = ({
  name,
  language,
  profilePicture,
  joinDate,
}: {
  name: string
  language: string
  profilePicture: string
  joinDate: string
}) => {
  return (
    <div className="flex gap-3 items-center justify-between">
      <div>
        <Typography variant="h4">
          Hosted by <span className="font-semibold">{name}</span>
        </Typography>
        <Typography variant="h5" className="text-text-300">
          Speak {language} · {getRelativeDifference(joinDate)} hosting
        </Typography>
      </div>
      <div className={cn(`rounded-full h-12 w-12`)}>
        <Image
          src={`/assets/${profilePicture ? profilePicture : "1.jpg"}`}
          width={100}
          height={100}
          alt="Avatar"
          className="object-cover h-full w-full rounded-full"
        />
      </div>
    </div>
  )
}

export default HostedBy
