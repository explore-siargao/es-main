import React from "react"
import {
  LucideInfo,
  LucideLightbulb,
  LucideMonitorSmartphone,
  LucideScale,
  LucideShield,
} from "lucide-react"
import { Typography } from "@/common/components/ui/Typography"
import { T_Property } from "@repo/contract-2/property"

const HostPolicies = ({ property }: { property: T_Property }) => {
  const thingsToKnow = property.policies?.filter(
    (policy) => policy.category === "Things To Know"
  )
  const safetyConsiderations = property.policies?.filter(
    (policy) => policy.category === "Safety Considerations"
  )
  const safetyDevices = property.policies?.filter(
    (policy) => policy.category === "Safety Devices"
  )
  const propertyInformation = property.policies?.filter(
    (policy) => policy.category === "Property Information"
  )
  const additionalRules = property.policies?.filter(
    (policy) => policy.category === "Additional Rules"
  )
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        Host policies
      </Typography>
      <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4">
        {thingsToKnow && thingsToKnow.length > 0 ? (
          <div>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex gap-2"
            >
              <LucideLightbulb /> Things to know
            </Typography>
            <ul className="ml-6 mt-4 text-text-400 list-decimal">
              {thingsToKnow && thingsToKnow.length > 0
                ? thingsToKnow.map((policy) => <li>{policy.policy}</li>)
                : null}
            </ul>
          </div>
        ) : null}
        {safetyConsiderations && safetyConsiderations.length > 0 ? (
          <div>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex gap-2"
            >
              <LucideShield /> Safety considerations
            </Typography>
            <ul className="ml-6 mt-4 text-text-400 list-decimal">
              {thingsToKnow && thingsToKnow.length > 0
                ? thingsToKnow.map((policy) => <li>{policy.policy}</li>)
                : null}
            </ul>
          </div>
        ) : null}
        {safetyDevices && safetyDevices.length > 0 ? (
          <div>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex gap-2"
            >
              <LucideMonitorSmartphone /> Safety devices
            </Typography>
            <ul className="ml-6 mt-4 text-text-400 list-decimal">
              {safetyDevices && safetyDevices.length > 0
                ? safetyDevices.map((policy) => <li>{policy.policy}</li>)
                : null}
            </ul>
          </div>
        ) : null}
        {propertyInformation && propertyInformation.length > 0 ? (
          <div>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex gap-2"
            >
              <LucideInfo /> Property information
            </Typography>
            <ul className="ml-6 mt-4 text-text-400 list-decimal">
              {propertyInformation && propertyInformation.length > 0
                ? propertyInformation.map((policy) => <li>{policy.policy}</li>)
                : null}
            </ul>
          </div>
        ) : null}
        {additionalRules && additionalRules.length > 0 ? (
          <div>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex gap-2"
            >
              <LucideScale /> Additional rules
            </Typography>
            <ul className="ml-6 mt-4 text-text-400 list-decimal">
              {additionalRules && additionalRules.length > 0
                ? additionalRules.map((policy) => <li>{policy.policy}</li>)
                : null}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default HostPolicies
