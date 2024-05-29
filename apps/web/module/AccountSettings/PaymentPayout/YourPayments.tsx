import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"

const YourPayments = () => {
  return (
    <AccountSettingWrapper>
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="text-4xl my-3.5"
      >
        Your payments
      </Typography>

      <Typography variant={"p"} className="text-text-400">
        Once you have a reservation, this is where you can come to track your
        payments and refunds.
      </Typography>
    </AccountSettingWrapper>
  )
}
export default YourPayments
