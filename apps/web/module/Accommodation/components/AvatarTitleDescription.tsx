import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import Image from "next/image"
import React from "react"
import { T_AvatarTitleDescriptionProps } from "../types/AvatarTitleDescription"

const AvatarTitleDescription = ({
  size = "sm",
  avatarKey,
  title,
  subTitle,
  isSubTitleDark = false,
}: T_AvatarTitleDescriptionProps) => {
  return (
    <div className="flex gap-3 items-center">
      <div
        className={cn(
          `rounded-full`,
          size === "md" ? "h-16 w-16" : "h-12 w-12"
        )}
      >
        <Image
          src={`/assets/${avatarKey}`}
          width={100}
          height={100}
          alt="Avatar"
          className="object-cover h-full w-full rounded-full"
        />
      </div>
      <div>
        <Typography variant={size === "md" ? "h3" : "h4"}>{title}</Typography>
        <Typography
          className={cn(
            size === "md" ? "" : "text-sm",
            !isSubTitleDark ? "text-text-300" : ""
          )}
        >
          {subTitle}
        </Typography>
      </div>
    </div>
  )
}

export default AvatarTitleDescription
