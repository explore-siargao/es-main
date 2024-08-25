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
  listingCategory: string
  filterItemType?: string
}

const SideFilter = ({
  onFiltersChange,
  onBudgetChange,
  listingCategory,
  filterItemType,
}: SideFilterProps) => {
  const handleBudgetSliderChange = (minValue: number, maxValue: number) => {
    onBudgetChange(minValue, maxValue)
  }

  const handleFilterChange = (filters: T_Filter[]) => {
    onFiltersChange(filters)
  }

  const filterCategory =
    listingCategory === "property"
      ? "Properties"
      : listingCategory === "activities"
        ? "Activities"
        : listingCategory === "rentals"
          ? "Rentals"
          : ""

  return (
    <div>
      <div className="mb-6">
        <Minimap />
      </div>
      <div className="rounded-tl-xl rounded-tr-xl border-t border-r border-l border-gray-300 flex items-center py-2 px-4">
        <Typography fontWeight="semibold">Filters</Typography>
      </div>
      <div className="border-t border-r border-l border-gray-300">
        {Array.from(
          new Set(
            filterPrimaryData
              .filter(
                (item) => !filterCategory || item.category === filterCategory
              )
              .map((item) => item.category)
          ),
          (category) => (
            <CheckBoxFilter
              key={category}
              category={category}
              filters={filterPrimaryData.filter(
                (item) => item.category === category
              )}
              onFilterChange={handleFilterChange}
              defaultChecked={filterItemType}
            />
          )
        )}
      </div>
      {/* <div className="border-t border-r border-l border-gray-300">
        <BudgetSlider
          title="Budget Range"
          min={0}
          max={10000}
          initialMinValue={1000}
          initialMaxValue={9000}
          onValueChange={handleBudgetSliderChange}
        />
      </div> */}
      <div className="border border-gray-300 rounded-bl-xl rounded-br-xl">
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
