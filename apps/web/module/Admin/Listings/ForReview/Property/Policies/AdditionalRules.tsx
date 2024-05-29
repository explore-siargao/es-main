import React from "react"
import { Textarea } from "@/common/components/ui/Textarea"
import { Typography } from "@/common/components/ui/Typography"
import { LucideScale } from "lucide-react"
import useSelectPoliciesStore from "./hooks/useSelectPoliciesStore"

const AdditionalRules = () => {
  const title = "Additional Rules"
  const policy = useSelectPoliciesStore((state) => state.policies).find(
    (policy) => policy.category === title
  )
  const updatePolicy = useSelectPoliciesStore((state) => state.updatePolicy)

  return (
    <div className="pt-6">
      <div className="flex items-center space-x-2.5">
        <LucideScale className="h-4 w-4" />
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
      </div>
      <div className="pt-4">
        <Textarea
          className="h-[160px] w-full"
          value={policy?.policy}
          // @ts-expect-error
          onChange={(e) => updatePolicy({ ...policy, policy: e.target.value })}
        />
      </div>
    </div>
  )
}

export default AdditionalRules
