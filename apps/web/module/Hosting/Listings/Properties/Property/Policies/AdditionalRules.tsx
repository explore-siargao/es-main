import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { LucideScale } from "lucide-react"
import useSelectPoliciesStore from "./hooks/useSelectPoliciesStore"
import { Textarea2 } from "@/common/components/ui/Textarea2"

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
      <div>
        <Textarea2
          label=""
          description="You can add detailed rules here if they aren't covered by the checkboxes above."
          placeholder="Example: Please note that parties are not allowed, and smoking is restricted to designated outdoor areas. Pets are welcome with prior approval. Ensure to respect quiet hours from 10 PM to 7 AM."
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
