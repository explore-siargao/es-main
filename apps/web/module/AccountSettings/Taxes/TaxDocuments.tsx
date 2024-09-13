import { Typography } from "@/common/components/ui/Typography"
import { LINK_ACCOUNT_PAYMENT_PAYOUT } from "@/common/constants"
import Link from "next/link"
import React from "react"

const TaxDocuments = () => {
  return (
    <div className="divide-y">
      <div className="pb-6">
        <Typography>
          Tax documents required for filing taxes are available to review and
          download here.
        </Typography>
        <Typography className="mt-2">
          You can also file taxes using detailed earnings info, available in the{" "}
          <Link
            href={LINK_ACCOUNT_PAYMENT_PAYOUT}
            className="underline font-semibold"
          >
            earnings summary
          </Link>
          .
        </Typography>
      </div>
      <div className="py-6">
        <Typography variant="h3" className="font-semibold">
          2023
        </Typography>
        <Typography variant="p" className="text-text-200">
          No tax document issued
        </Typography>
      </div>
      <div className="py-6">
        <Typography variant="h3" className="font-semibold">
          2022
        </Typography>
        <Typography variant="p" className="text-text-200">
          No tax document issued
        </Typography>
      </div>
      <div className="py-6">
        <Typography variant="h3" className="font-semibold">
          2021
        </Typography>
        <Typography variant="p" className="text-text-200">
          No tax document issued
        </Typography>
      </div>
      <div className="py-6">
        <Typography variant="h3" className="font-semibold">
          2020
        </Typography>
        <Typography variant="p" className="text-text-200">
          No tax document issued
        </Typography>
      </div>
    </div>
  )
}

export default TaxDocuments
