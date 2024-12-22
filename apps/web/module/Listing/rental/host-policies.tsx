import React from "react"
import { LucideInfo } from "lucide-react"
import { T_Rental } from "@repo/contract-2/rental"
import { Typography } from "@/common/components/ui/Typography"

const HostPolicies = ({ rental }: { rental: T_Rental }) => {
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        Host policies
      </Typography>
      <div className="mt-2">
        <div className="grid grid-cols-2">
          {rental.policies && rental.policies.length > 0 ? rental.policies.map((policy) => (
            <div className="flex my-3">
              <LucideInfo className="text-info-500 mr-4 " /> {policy}
            </div>
          ))  : null}
        </div>
      </div>
    </div>
  )
}

export default HostPolicies
