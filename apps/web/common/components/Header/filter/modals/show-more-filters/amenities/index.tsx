"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"

import {
  LucideArmchair,
  LucideBath,
  LucideCookingPot,
  LucideLayoutList,
  LucidePalmtree,
  LucideSparkles,
} from "lucide-react"
import AmenitiesCheckboxes from "./amenities-checkboxes"

const Amenities = () => {
  return (
    <div>
      <Typography variant="h1" fontWeight="semibold">
        Room Amenities
      </Typography>
      <Typography
        variant="h4"
        fontWeight="normal"
        className="text-gray-500 pt-1 italic"
      >
        Checked Amenities will be filtered
      </Typography>
      <div className="mt-6 mb-8 grid grid-cols-3 gap-6">
        <AmenitiesCheckboxes
          title="Most Popular"
          icon={<LucideSparkles className="h-4 w-4" />}
        />
        <AmenitiesCheckboxes
          title="Bathroom"
          icon={<LucideBath className="h-4 w-4" />}
        />
        <AmenitiesCheckboxes
          title="Living Area"
          icon={<LucideArmchair className="h-4 w-4" />}
        />
        <AmenitiesCheckboxes
          title="Kitchen"
          icon={<LucideCookingPot className="h-4 w-4" />}
        />
        <AmenitiesCheckboxes
          title="General"
          icon={<LucideLayoutList className="h-4 w-4" />}
        />
        <AmenitiesCheckboxes
          title="Outdoors"
          icon={<LucidePalmtree className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}

export default Amenities
