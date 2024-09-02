"use client"
import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import { LINK_ACCOUNT } from "@/common/constants"
import React from "react"
import { Breadcrumb } from "@/common/components/ui/Breadcrumb"
import OptIn from "./OptIn"
import { ACCOUNT, NOTIFICATIONS } from "@/common/constants"
import { Typography } from "@/common/components/ui/Typography"

const Notifications = () => {
  return (
    <AccountSettingWrapper>
      <div>
        <Breadcrumb home={ACCOUNT} page={NOTIFICATIONS} link={LINK_ACCOUNT} />
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="text-4xl my-3.5"
        >
          {NOTIFICATIONS}
        </Typography>
      </div>
      <div className="mt-4">
        <div className="divide-y">
          <OptIn />
        </div>
      </div>
    </AccountSettingWrapper>
  )
}

export default Notifications
