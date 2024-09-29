import { Typography } from "@/common/components/ui/Typography"
import { LucideInfo } from "lucide-react"
import React from "react"
interface ErrorMessageProps {
  title: string
  errors: string[]
}
const ErrorMessage = ({ title, errors }: ErrorMessageProps) => {
  if (!errors || errors.length === 0) {
    return null // Don't render anything if there are no errors
  }
  return (
    <div className="bg-error-100 py-2 px-3 my-3 rounded-md">
      <div className="flex items-center space-x-2 w-full">
        <LucideInfo className="w-4 h-4 text-error-500" />
        <Typography fontWeight={"bold"} className="text-error-500 text-sm">
          {title}
        </Typography>
      </div>

      <ul className="list-disc list-inside">
        {errors.map((error) => (
          <li key={error} className="text-error-500 pl-6 text-sm">
            {error}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ErrorMessage
