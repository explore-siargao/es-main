"use client"

import BudgetSlider from "@/common/components/Filters/BudgetFilter/BudgetSlider"
import CheckBoxFilter from "@/common/components/Filters/CheckBoxFilter"
import Minimap from "@/common/components/Filters/Minimap"
import NumericFilter from "@/common/components/Filters/NumericFilter"
import { Typography } from "@/common/components/ui/Typography"

const filterPrimaryData = [
  {
    type: "Hostels",
    filterCount: 301,
    category: "Properties",
  },
  {
    type: "Hotels",
    filterCount: 211,
    category: "Properties",
  },
  {
    type: "Apartments",
    filterCount: 219,
    category: "Properties",
  },
  {
    type: "Villas",
    filterCount: 316,
    category: "Properties",
  },
  {
    type: "Whole Places",
    filterCount: 19,
    category: "Properties",
  },
  {
    type: "Homestay",
    filterCount: 32,
    category: "Properties",
  },
  {
    type: "Resorts",
    filterCount: 53,
    category: "Properties",
  },
  {
    type: "Cars",
    filterCount: 300,
    category: "Rentals",
  },
  {
    type: "Motorbikes",
    filterCount: 221,
    category: "Rentals",
  },
  {
    type: "Bicycle",
    filterCount: 341,
    category: "Rentals",
  },
  {
    type: "Sightseeing",
    filterCount: 200,
    category: "Activities",
  },
  {
    type: "Walking",
    filterCount: 10,
    category: "Activities",
  },
  {
    type: "Sunset view",
    filterCount: 14,
    category: "Activities",
  },
  {
    type: "Sceneries",
    filterCount: 72,
    category: "Activities",
  },
  {
    type: "Visit",
    filterCount: 34,
    category: "Activities",
  },
]

const numericFilterData = [
  { type: "Bedrooms", filterCount: 0, category: "Rooms and beds" },
  { type: "Beds", filterCount: 0, category: "Rooms and beds" },
  { type: "Bathrooms", filterCount: 0, category: "Rooms and beds" },
]

type T_Filter = {
  category: string
  type: string
  filterCount: number
}

type SideFilterProps = {
  onFiltersChange: (filters: T_Filter[]) => void
  onBudgetChange: (minValue: number, maxValue: number) => void
}

const SideFilter = ({ onFiltersChange, onBudgetChange }: SideFilterProps) => {
  const handleBudgetSliderChange = (minValue: number, maxValue: number) => {
    onBudgetChange(minValue, maxValue)
  }

  const handleFilterChange = (filters: T_Filter[]) => {
    onFiltersChange(filters)
  }

  return (
    <div>
      <div className="mb-1">
        <Minimap />
      </div>
      <div className="h-10 w-80 rounded-tl-md rounded-tr-md border flex items-center p-4">
        <Typography variant="h2" fontWeight="semibold">
          Filter by:
        </Typography>
      </div>
      <div>
        {Array.from(
          new Set(filterPrimaryData.map((item) => item.category)),
          (category) => (
            <CheckBoxFilter
              key={category}
              category={category}
              filters={filterPrimaryData.filter(
                (item) => item.category === category
              )}
              onFilterChange={handleFilterChange}
            />
          )
        )}
      </div>
      <BudgetSlider
        title="Budget Range"
        min={0}
        max={10000}
        initialMinValue={1000}
        initialMaxValue={9000}
        onValueChange={handleBudgetSliderChange}
      />
      <div>
        <NumericFilter
          category="Rooms and beds"
          filters={numericFilterData}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  )
}

export default SideFilter
