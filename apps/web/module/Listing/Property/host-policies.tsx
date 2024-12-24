import React from "react"
import { LucideInfo, LucideLightbulb, LucideMonitorSmartphone, LucideScale, LucideShield } from "lucide-react"
import { Typography } from "@/common/components/ui/Typography"
import { T_Property } from "@repo/contract-2/property"

const HostPolicies = ({ property }: { property: T_Property }) => {
  const thingsToKnow = property.policies?.filter((policy) => policy.category === "Things To Know")
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        Host policies
      </Typography>
      <div className="mt-6 grid grid-cols-4">
        <div>
          <Typography variant="h4" fontWeight="semibold" className="flex gap-2">
            <LucideLightbulb /> Things to know
          </Typography>
          <ul className="ml-6 mt-4 text-text-400 list-decimal">
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
          </ul>
        </div>
        <div>
          <Typography variant="h4" fontWeight="semibold" className="flex gap-2">
            <LucideShield /> Safety considerations
          </Typography>
          <ul className="ml-6 mt-4 text-text-400 list-decimal">
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
          </ul>
        </div>
        <div>
          <Typography variant="h4" fontWeight="semibold" className="flex gap-2">
            <LucideMonitorSmartphone /> Safety devices
          </Typography>
          <ul className="ml-6 mt-4 text-text-400 list-decimal">
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
          </ul>
        </div>
        <div>
          <Typography variant="h4" fontWeight="semibold" className="flex gap-2">
            <LucideInfo /> Property information
          </Typography>
          <ul className="ml-6 mt-4 text-text-400 list-decimal">
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
          </ul>
        </div>
      </div>
      <div className="mt-6">
          <Typography variant="h4" fontWeight="semibold" className="flex gap-2">
            <LucideScale /> Additional rules
          </Typography>
          <ul className="ml-6 mt-4 text-text-400 list-decimal">
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
            {thingsToKnow && thingsToKnow.length > 0 ? thingsToKnow.map((policy) => (
              <li>
                {policy.policy}
              </li>
            )) : null}
          </ul>
        </div>
    </div>
  )
}

export default HostPolicies
