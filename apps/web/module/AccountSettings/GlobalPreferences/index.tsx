"use client"
import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import { LINK_ACCOUNT } from "@/common/constants"
import React from "react"
import { Breadcrumb } from "@/common/components/ui/Breadcrumb"
import PreferredLanguage from "./PreferredLanguage"
import PreferredCurrency from "./PreferredCurrency"
import { ACCOUNT, GLOBAL_PREFERENCES } from "@/common/constants"
import { Typography } from "@/common/components/ui/Typography"

const GlobalPreferences = () => {
  return (
    <AccountSettingWrapper>
      <div>
        <Breadcrumb
          home={ACCOUNT}
          page={GLOBAL_PREFERENCES}
          link={LINK_ACCOUNT}
        />
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="text-4xl my-3.5"
        >
          {GLOBAL_PREFERENCES}
        </Typography>
      </div>
      <div className="mt-4">
        <div className="divide-y">
          <PreferredLanguage />
          <PreferredCurrency />
        </div>
      </div>
    </AccountSettingWrapper>
  )
}

export default GlobalPreferences
