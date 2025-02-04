import AuthGuard from "@/common/components/AuthGuard"
import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import Message from "@/module/Listing/property/message2"

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const AccomodationPage = () => {
  return (
    <AuthGuard>
      <Message />
    </AuthGuard>
  )
}

export default AccomodationPage
