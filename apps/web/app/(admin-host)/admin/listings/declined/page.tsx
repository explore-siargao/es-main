import AuthGuard from "@/common/components/AuthGuard"
import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AdminListing from "@/module/Admin/Listings/Declined"

export const metadata: Metadata = {
  title: `Earnings - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const RentalsTableTab = () => {
  return (
    <AuthGuard>
      <AdminListing />
    </AuthGuard>
  )
}

export default RentalsTableTab
