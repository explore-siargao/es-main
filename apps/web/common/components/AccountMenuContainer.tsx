"use client"
import Link from "next/link"
import { cn } from "@/common/helpers/cn"
import * as React from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Typography } from "./ui/Typography"

type Props = {
  title: string
  icon: React.ReactNode
  content: string
  link: string
  className?: string
}

const AccountMenuContainer = ({
  className,
  icon,
  title,
  content,
  link,
}: Props) => {
  return (
    <Link
      className={cn(
        `flex md:grid p-4 rounded-2xl gap-5 content-between select-none drop-shadow-xl border hover:shadow-lg transition`,
        className
      )}
      href={link}
    >
      {icon}
      <div className="hidden md:block">
        <Typography variant="p" fontWeight="semibold">
          {title}
        </Typography>
        <span className="text-text-300 text-sm">{content}</span>
      </div>
      <div className="flex md:hidden self-center justify-between w-full">
        {title}
        <ChevronRightIcon className="h-5 w-auto" />
      </div>
    </Link>
  )
}

AccountMenuContainer.displayName = "AccountMenuContainer"

export { AccountMenuContainer }
