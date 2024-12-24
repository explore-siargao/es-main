import React from "react"
import { LucideInfo } from "lucide-react"
import { Typography } from "@/common/components/ui/Typography"
import { T_Activity } from "@repo/contract-2/activity"

const HostPolicies = ({ activity }: { activity: T_Activity }) => {
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        Host policies
      </Typography>
      <div className="mt-2">
        <div className="grid grid-cols-1">
          {activity.policies && activity.policies.length > 0 ? activity.policies.map((policy) => (
            <div className="flex my-3">
              <LucideInfo className="text-primary-700 mr-3 " /> {policy}
            </div>
          ))  : null}
        </div>
      </div>
    </div>
  )
}

export default HostPolicies
