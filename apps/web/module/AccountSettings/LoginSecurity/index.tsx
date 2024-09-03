"use client"
import AccountSettingWrapper from "@/module/AccountSettings/components/AccountSettingWrapper"
import { LINK_ACCOUNT } from "@/common/constants"
import React from "react"
import { Breadcrumb } from "@/common/components/ui/Breadcrumb"
import UpdatePassword from "./UpdatePassword"
import DeactivateAccount from "./DeactivateAccount"
import { ACCOUNT, LOGIN_SECURITY } from "@/common/constants"
import { Typography } from "@/common/components/ui/Typography"

const LoginSecurity = () => {
  return (
    <AccountSettingWrapper>
      <div>
        <Breadcrumb home={ACCOUNT} page={LOGIN_SECURITY} link={LINK_ACCOUNT} />
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="text-4xl my-3.5"
        >
          {LOGIN_SECURITY}
        </Typography>
      </div>
      <div className="mt-4">
        <UpdatePassword />
        <DeactivateAccount />
      </div>
    </AccountSettingWrapper>
  )
}

export default LoginSecurity
