import { Typography } from "@/common/components/ui/Typography"
import React from "react"

const Dashboard = () => {
  return (
    <div className="mt-20 mb-14">
      <div className="mb-4">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center mb-2"
        >
          Dashboard
        </Typography>
      </div>
    </div>
  )
}

export default Dashboard
