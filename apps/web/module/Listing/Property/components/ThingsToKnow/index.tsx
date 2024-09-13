import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import TitleLists from "./TitleLists"
import { useParams } from "next/navigation"
import useGetPropertyById from "@/module/Hosting/Listings/Properties/hooks/useGetPropertyById"
import { T_Property_Policy } from "@repo/contract"

const ThingsToKnow = () => {
  const params = useParams<{ propertyId: string }>()
  const propertyId = String(params.propertyId)
  const { data, isPending } = useGetPropertyById(propertyId)

  const groupedPolicies: Record<string, T_Property_Policy[]> = {}
  if (data?.item?.policies) {
    data.item.policies.forEach((policy: T_Property_Policy) => {
      const { category } = policy
      if (!groupedPolicies[category]) {
        groupedPolicies[category] = []
      }
      groupedPolicies[category]?.push(policy)
    })
  }

  return (
    <>
      <Typography variant="h2" fontWeight="semibold">
        Policies
      </Typography>
      <div className="flex w-full mt-4 mb-6 gap-4">
        {Object.entries(groupedPolicies)?.map(([category, items]) => (
          <div key={category} className="w-full md:w-1/3">
            <TitleLists title={category} policies={items} maxVisibleItems={3} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ThingsToKnow
