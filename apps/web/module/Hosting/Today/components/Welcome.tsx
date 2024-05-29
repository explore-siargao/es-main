"use client"
import { Typography } from "@/common/components/ui/Typography"
import useSessionStore from "@/common/store/useSessionStore"
import React from "react"

const Welcome = () => {
  const session = useSessionStore()
  return (
    <div className="flex items-center justify-between pb-4">
      <Typography variant="h1" fontWeight="semibold" className="flex text-4xl">
        Welcome, {session.personalInfo?.firstName}!
      </Typography>
      {/* <Button variant="outline" className="flex items-end">
        Complete your listing
      </Button> */}
    </div>
  )
}

export default Welcome
