import AuthGuard from "@/common/components/AuthGuard"
import AddReview from "@/module/AddReview"
import React from "react"

function page() {
  return (
    <AuthGuard>
      <AddReview />
    </AuthGuard>
  )
}

export default page
