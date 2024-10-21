"use client"
import React, { useEffect } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/common/helpers/cn"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
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
import useSelectFacilityStore from "../../../store/useSelectFacilityStore"


const Facilities = () => {
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const facilities = useSelectFacilityStore((state) => state.facilities)
  const setDefaultFacilities = useSelectFacilityStore(
    (state) => state.setDefaultFacilities
  )

  return (
    <div>
      <Typography variant="h1" fontWeight="semibold">
        Property Facilities
      </Typography>
      <Typography
        variant="h4"
        fontWeight="normal"
        className="text-gray-500 pt-1 italic"
      >
        Checked Facilities will be filtered out 
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

    </div>
  )
}

export default Facilities
