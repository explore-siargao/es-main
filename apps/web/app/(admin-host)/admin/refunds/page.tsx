import AuthGuard from "@/common/components/AuthGuard"
import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import AdminListing from "@/module/Admin/Refunds"

export const metadata: Metadata = {
  title: `Admin Analytics - ${APP_NAME}`,
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
