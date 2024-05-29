import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"

const Payouts = () => {
  return (
    <div className="my-5">
      <Typography variant="h2" fontWeight="semibold">
        How you’ll get paid
      </Typography>
      <Typography fontWeight="light" className="pb-4">
        Add at least one payout method so we know where to send your money.
      </Typography>
      <Button>Set up payouts</Button>
    </div>
  )
}

export default Payouts
