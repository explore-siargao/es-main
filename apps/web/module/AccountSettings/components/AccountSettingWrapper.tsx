"use client"
import React from "react"
import { WidthWrapper } from "../../../common/components/WidthWrapper"
import { cn } from "@/common/helpers/cn"

type Props = {
  children: React.ReactNode
  className?: string
}
const AccountSettingWrapper = ({ children, className }: Props) => {
  return (
    <WidthWrapper
      width="medium"
      className={cn("mt-24 md:mt-36 lg:mt-40", className)}
    >
      {children}
    </WidthWrapper>
  )
}

export default AccountSettingWrapper
