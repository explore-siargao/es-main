"use client"
import React, { useEffect } from "react"
import PoliciesCheckboxes from "./PoliciesCheckboxes"
import { Button } from "@/common/components/ui/Button"
import { useParams, useRouter } from "next/navigation"
import { Typography } from "@/common/components/ui/Typography"
import {
  LucideHome,
  LucideMessageCircle,
  LucideShieldCheck,
  LucideShieldPlus,
} from "lucide-react"
import AdditionalRules from "./AdditionalRules"
import useSelectPoliciesStore from "./hooks/useSelectPoliciesStore"
import useGetPropertyById from "../../hooks/useGetPropertyById"
import useUpdatePropertyPolicies from "../../hooks/useUpdatePropertyPolicies"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/common/helpers/cn"

type Prop = {
  pageType: "setup" | "edit"
}

const Policies = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const policies = useSelectPoliciesStore((state) => state.policies)
  const setDefaultPolicies = useSelectPoliciesStore(
    (state) => state.setDefaultPolicies
  )
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetPropertyById(listingId)
  const { mutate, isPending } = useUpdatePropertyPolicies(listingId)
  const handleSave = () => {
    const addedPoliciesCount = policies.filter((policy) => policy.isSelected)
    if (
      addedPoliciesCount.length > 1 ||
      (data?.item?.Policies && data?.item?.policies.length > 0)
    ) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(data.message)
            queryClient.invalidateQueries({
              queryKey: ["property-finished-sections", listingId],
            })
            queryClient.invalidateQueries({
              queryKey: ["property", listingId],
            })
            if (pageType === "setup") {
              router.push(
                `/hosting/listings/properties/setup/${listingId}/photos`
              )
            }
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate({ policies }, callBackReq)
    } else {
      toast.error("Please select at least 1 policy")
    }
  }
  useEffect(() => {
    if (data?.item?.policies) {
      setDefaultPolicies(data?.item?.policies)
    }
  }, [data?.item?.policies, setDefaultPolicies])

  return (
    <div>
      <div className="mt-20">
        {" "}
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center pb-4"
        >
          Policies
        </Typography>
      </div>
      <div className="mb-24">
        <div className="grid grid-cols-3 gap-x-6">
          <PoliciesCheckboxes
            title="Things To Know"
            icon={<LucideMessageCircle className="h-4 w-4" />}
          />
          <div className="flex flex-col gap-4">
            <PoliciesCheckboxes
              title="Safety Considerations"
              icon={<LucideShieldCheck className="h-4 w-4" />}
              showReason
            />
            <PoliciesCheckboxes
              title="Safety Devices"
              icon={<LucideShieldPlus className="h-4 w-4" />}
            />
          </div>
          <PoliciesCheckboxes
            title="Property Info"
            icon={<LucideHome className="h-4 w-4" />}
            showReason
          />
          <div className="col-span-2">
            <AdditionalRules />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
        <Button
          size="sm"
          onClick={handleSave}
          className={cn(
            "disabled:bg-gray-600",
            isLoading || isPending ? "opacity-70 cursor-progress" : ""
          )}
        >
          {pageType === "setup" ? "Save & Next" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

export default Policies
