import React from "react"
import { iconMap } from "@/common/helpers/iconMap"

interface IconDescriptionProps {
  icon?: keyof typeof iconMap
  description: string
  isNotIncluded: boolean
  className?: string
}

const IconDescription: React.FC<IconDescriptionProps> = ({
  icon,
  description,
  isNotIncluded,
}) => {
  const lines = description.split("\n")

  return (
    <div className="flex mb-4 gap-2">
      {icon && iconMap[icon] && (
        <div className="flex-shrink-0">
          {iconMap[icon]({ className: "w-5 h-5" })}
        </div>
      )}
      <div className="flex-col">
        {lines.map((line, index) => (
          <div
            key={index}
            className={isNotIncluded ? "line-through" : undefined}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconDescription
