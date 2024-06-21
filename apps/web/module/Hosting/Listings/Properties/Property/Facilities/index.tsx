"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/common/helpers/cn"
import useSelectFacilityStore from "./store/useSelectFacilityStore"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import useUpdatePropertyFacilities from "../../../hooks/useUpdatePropertyFacilities"
import FacilitiesCheckboxes from "./FacilitiesCheckboxes"
import {
  LucideBike,
  LucideBookA,
  LucideBriefcase,
  LucideConciergeBell,
  LucideCreditCard,
  LucideDrama,
  LucideDumbbell,
  LucideHandHelping,
  LucideLayoutList,
  LucideLeaf,
  LucidePalmtree,
  LucideParkingCircle,
  LucideShieldCheck,
  LucideSparkles,
  LucideUtensilsCrossed,
  LucideWifi,
} from "lucide-react"
import useGetPropertyById from "../../hooks/useGetPropertyById"

type Prop = {
  pageType: "setup" | "edit"
}

const Facilities = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = Number(params.listingId)
  const propertyId = params.listingId
  const { data, isLoading } = useGetPropertyById(propertyId)
  const { mutate, isPending } = useUpdatePropertyFacilities(listingId)
  const facilities = useSelectFacilityStore((state) => state.facilities)
  const setDefaultFacilities = useSelectFacilityStore(
    (state) => state.setDefaultFacilities
  )
  const handleSave = () => {
    const addedFacilityCount = facilities.filter(
      (facility) => facility.isSelected
    )
    if (
      addedFacilityCount.length > 1 ||
      (data?.item?.Facilities && data?.item?.Facilities.length > 0)
    ) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(data.message)
            queryClient.invalidateQueries({
              queryKey: ["property-finished-sections", listingId],
            })
            if (pageType === "setup") {
              router.push(
                `/hosting/listings/properties/setup/${listingId}/policies`
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
      mutate({ facilities }, callBackReq)
    } else {
      toast.error("Please select at least 1 facility")
    }
  }
  useEffect(() => {
    setDefaultFacilities(data?.item?.facilities)
  }, [data?.item?.facilities])
  return (
    <div className="mt-20 mb-24">
      <Typography variant="h1" fontWeight="semibold">
        Property Facilities
      </Typography>
      <div className="mt-6 mb-8 grid grid-cols-3 gap-6">
        <FacilitiesCheckboxes
          title="Most Popular"
          icon={<LucideSparkles className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Food & Drink"
          icon={<LucideUtensilsCrossed className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Services"
          icon={<LucideHandHelping className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Reception Services"
          icon={<LucideConciergeBell className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Entertainment and family services"
          icon={<LucideDrama className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Parking"
          icon={<LucideParkingCircle className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="General"
          icon={<LucideLayoutList className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Wellness"
          icon={<LucideDumbbell className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Activities"
          icon={<LucideBike className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Cleaning Services"
          icon={<LucideLeaf className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Internet"
          icon={<LucideWifi className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Business Facilities"
          icon={<LucideBriefcase className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="On-site Payment Methods"
          icon={<LucideCreditCard className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Languages Spoken"
          icon={<LucideBookA className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Safety & Security"
          icon={<LucideShieldCheck className="h-4 w-4" />}
        />
        <FacilitiesCheckboxes
          title="Outdoors"
          icon={<LucidePalmtree className="h-4 w-4" />}
        />
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

export default Facilities
