"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
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
import FacilitiesCheckboxes from "./facilities-checkboxes"

const Facilities = () => {
  return (
    <div>
      <div className="mb-8 grid grid-cols-3 gap-6">
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
