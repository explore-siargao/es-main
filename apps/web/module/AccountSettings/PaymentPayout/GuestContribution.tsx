"use client"
import { Typography } from "@/common/components/ui/Typography"
import { LINK_HOME } from "@/common/constants"
import { cn } from "@/common/helpers/cn"
import { Switch } from "@headlessui/react"
import { APP_NAME } from "@repo/constants"
import Link from "next/link"
import React, { useState } from "react"

const GuestContribution = () => {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="my-5">
      <Typography variant="h2" fontWeight="semibold">
        Guest contributions
      </Typography>
      <Typography fontWeight="light" className="pb-4">
        To show their appreciation for great hospitality, guests can send an
        optional financial contribution to a host after completing a stay or an
        {APP_NAME} Experience. You can choose to automatically allow or decline
        future contributions from guests.
      </Typography>
      <div className="flex justify-between border-b border-b-text-100 py-5">
        <label htmlFor="switchToggle" className="w-full">
          Allow contribution
        </label>
        <Switch
          id="switchToggle"
          checked={enabled}
          onChange={setEnabled}
          className={cn(
            enabled ? "bg-text-600" : "bg-text-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-text-600 focus:ring-offset-2"
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={cn(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
      <Typography fontWeight="light" className="mt-10">
        100% of all contributions will be deposited into your payout account,
        unless you have an account balance. Your payout is subject to the{" "}
        <Link href={LINK_HOME} className="font-semibold">
          Payment Terms of Service.
        </Link>{" "}
        Please note that contributions may not be tax deductible or eligible for
        tax credits.
      </Typography>
    </div>
  )
}

export default GuestContribution
