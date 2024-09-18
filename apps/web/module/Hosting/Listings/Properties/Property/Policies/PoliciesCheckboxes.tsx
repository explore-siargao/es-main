import React, { ReactNode } from "react"
import { Typography } from "@/common/components/ui/Typography"
import useSelectPoliciesStore from "./hooks/useSelectPoliciesStore"
import { Textarea2 } from "@/common/components/ui/Textarea2"

type Props = {
  title: string
  icon: ReactNode
  showReason?: boolean
}

const PoliciesCheckboxes = ({ title, icon, showReason = false }: Props) => {
  const policies = useSelectPoliciesStore((state) => state.policies).filter(
    (policy) => policy.category === title
  )
  const updatePolicy = useSelectPoliciesStore((state) => state.updatePolicy)

  return (
    <div>
      <div className="flex items-center space-x-2.5">
        {icon}
        <Typography variant="h4" fontWeight="semibold">
          {title}
        </Typography>
      </div>
      {policies.map((policy) => (
        <div key={policy.policy} className="mt-2">
          <fieldset>
            <input
              id={policy.policy}
              type="checkbox"
              checked={policy.isSelected}
              onChange={(e) =>
                updatePolicy({ ...policy, isSelected: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor={policy.policy} className="pl-2 text-sm pt-4">
              {policy.policy}
            </label>
          </fieldset>
          {policy.isSelected && showReason ? (
            <div className="ml-6">
              <label className="text-sm text-gray-400 pt-2">
                Reason (optional)
              </label>
              {title === "Safety Considerations" ? (
                <Textarea2
                  label=""
                  placeholder="Example: Ensure all safety guidelines are followed, including appropriate emergency procedures, and avoid actions that could cause harm or damage."
                  defaultValue={policy.reason || ""}
                  onChange={(e) =>
                    updatePolicy({ ...policy, reason: e.target.value })
                  }
                />
              ) : (
                <Textarea2
                  label=""
                  placeholder="Example: Ensure compliance with all safety guidelines, including emergency procedures, proper use of property amenities, and general precautions to prevent accidents or damage."
                  defaultValue={policy.reason || ""}
                  onChange={(e) =>
                    updatePolicy({ ...policy, reason: e.target.value })
                  }
                />
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
export default PoliciesCheckboxes
