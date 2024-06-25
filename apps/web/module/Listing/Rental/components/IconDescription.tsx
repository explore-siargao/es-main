import { iconMap } from "@/common/helpers/iconMap"
import React from "react"

type T_IconDescriptionProps = {
  icon: string
  description: string
  isNotIncluded: boolean
}

const IconDescription: React.FC<T_IconDescriptionProps> = ({
  icon,
  description,
  isNotIncluded = false,
}) => {
  const IconDescriptionStyle = isNotIncluded
    ? { textDecoration: "line-through" }
    : {}

  return (
    <div className="flex items-center mb-5 gap-5">
      {/* @ts-expect-error */}
      {icon && iconMap[icon]()}
      <div className="flex" style={IconDescriptionStyle}>
        {description}
      </div>
    </div>
  )
}

export default IconDescription
