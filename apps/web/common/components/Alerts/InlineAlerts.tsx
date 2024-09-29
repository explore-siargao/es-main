import React, { useState } from "react"
import {
  LucideAlertTriangle,
  LucideInfo,
  LucideXCircle,
  LucideCheckCircle,
  LucideX,
} from "lucide-react"
import { cn } from "@/common/helpers/cn"

interface AlertProps {
  type: "success" | "danger" | "warning" | "info"
  title: string
  onClose?: () => void
  children?: React.ReactNode
}

const InlineAlerts: React.FC<AlertProps> = ({
  type,
  title,
  onClose,
  children,
}) => {
  const [showAlert, setShowAlert] = useState(true)

  const handleClose = () => {
    setShowAlert(false)
    onClose?.()
  }

  if (!showAlert) return null

  const iconMap = {
    success: LucideCheckCircle,
    danger: LucideXCircle,
    info: LucideInfo,
    warning: LucideAlertTriangle,
  }

  const Icon = iconMap[type]

  const colorClasses = {
    success: { bg: "bg-green-50", text: "text-green-800" },
    danger: { bg: "bg-red-50", text: "text-red-800" },
    info: { bg: "bg-blue-50", text: "text-blue-800" },
    warning: { bg: "bg-yellow-50", text: "text-yellow-800" },
  }

  const alertClasses = cn(
    "pt-1",
    "relative",
    "rounded-md",
    colorClasses[type]?.bg
  )

  const textClasses = cn("text-sm", "font-semibold", colorClasses[type]?.text)

  const descClasses = cn("pt-2", "text-sm", colorClasses[type]?.text)

  return (
    <div className={alertClasses}>
      <div className="rounded-md p-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon
              className={cn(
                "h-5",
                "w-5",
                type === "success" && "text-green-400",
                type === "danger" && "text-red-400",
                type === "info" && "text-blue-400",
                type === "warning" && "text-yellow-400"
              )}
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className={textClasses}>
              {title}
              <button
                type="button"
                className={cn(
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  "hover:text-opacity-75",
                  type === "success" && "text-green-600",
                  type === "danger" && "text-red-600",
                  type === "info" && "text-blue-600",
                  type === "warning" && "text-yellow-600",
                  "absolute",
                  "right-5"
                )}
                onClick={handleClose}
              >
                <LucideX className="h-4 w-4" aria-hidden="true" size={"md"} />
              </button>
            </h3>
            <div className={descClasses}>
              <p>{children}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InlineAlerts
