"use client"
import { Typography } from "../ui/Typography"
import BudgetSlider from "./BudgetFilter/BudgetSlider"
import CheckBoxFilter from "./CheckBoxFilter"
import Minimap from "./Minimap"
import NumericFilter from "./NumericFilter"

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

const filterData = [
  {
    type: "Free WiFi",
    filterCount: 249,
    category: "Popular filters",
  },
  {
    type: "Beach",
    filterCount: 137,
    category: "Popular filters",
  },
  {
    type: "Bed and Breakfasts",
    filterCount: 5,
    category: "Popular filters",
  },
  {
    type: "Balcony",
    filterCount: 165,
    category: "Popular filters",
  },
  {
    type: "Free cancellation",
    filterCount: 196,
    category: "Popular filters",
  },
  {
    type: "Private pool",
    filterCount: 23,
    category: "Popular filters",
  },
  {
    type: "Hotels",
    filterCount: 135,
    category: "Popular filters",
  },
  {
    type: "Kitchen facilities",
    filterCount: 71,
    category: "Meals",
  },
  {
    type: "Breakfast included",
    filterCount: 129,
    category: "Meals",
  },
  {
    type: "Parking",
    filterCount: 39,
    category: "Facilities",
  },
  {
    type: "Free WiFi",
    filterCount: 249,
    category: "Facilities",
  },
  {
    type: "Restaurant",
    filterCount: 120,
    category: "Facilities",
  },
  {
    type: "Pet friendly",
    filterCount: 33,
    category: "Facilities",
  },
  {
    type: "Room service",
    filterCount: 131,
    category: "Facilities",
  },
  {
    type: "24-hour front desk",
    filterCount: 134,
    category: "Facilities",
  },
  {
    type: "Fitness center",
    filterCount: 27,
    category: "Facilities",
  },
  {
    type: "Non-smoking rooms",
    filterCount: 221,
    category: "Facilities",
  },
  {
    type: "Airport shuttle",
    filterCount: 116,
    category: "Facilities",
  },
  {
    type: "Family rooms",
    filterCount: 160,
    category: "Facilities",
  },
  {
    type: "Spa",
    filterCount: 30,
    category: "Facilities",
  },
  {
    type: "Electric vehicle charging station",
    filterCount: 3,
    category: "Facilities",
  },
  {
    type: "Wheelchair accessible",
    filterCount: 28,
    category: "Facilities",
  },
  {
    type: "Swimming pool",
    filterCount: 102,
    category: "Facilities",
  },
  {
    type: "Hotels",
    filterCount: 135,
    category: "Property Type",
  },
  {
    type: "Entire homes & apartments",
    filterCount: 57,
    category: "Property Type",
  },
  {
    type: "Resorts",
    filterCount: 56,
    category: "Property Type",
  },
  {
    type: "Apartments",
    filterCount: 42,
    category: "Property Type",
  },
  {
    type: "Hostels",
    filterCount: 14,
    category: "Property Type",
  },
  {
    type: "Guesthouses",
    filterCount: 8,
    category: "Property Type",
  },
  {
    type: "Bed and Breakfasts",
    filterCount: 5,
    category: "Property Type",
  },
  {
    type: "Villas",
    filterCount: 4,
    category: "Property Type",
  },
  {
    type: "Homestays",
    filterCount: 2,
    category: "Property Type",
  },
  {
    type: "Lodges",
    filterCount: 1,
    category: "Property Type",
  },
  {
    type: "Luxury tents",
    filterCount: 1,
    category: "Property Type",
  },
  {
    type: "Accessible by elevator",
    filterCount: 41,
    category: "Room Facilities",
  },
  {
    type: "Air conditioning",
    filterCount: 252,
    category: "Room Facilities",
  },
  {
    type: "Hot tub",
    filterCount: 12,
    category: "Room Facilities",
  },
  {
    type: "Streaming service (like Netflix)",
    filterCount: 13,
    category: "Room Facilities",
  },
  {
    type: "Sea view",
    filterCount: 51,
    category: "Room Facilities",
  },
  {
    type: "Private pool",
    filterCount: 23,
    category: "Room Facilities",
  },
  {
    type: "Pool towels",
    filterCount: 54,
    category: "Room Facilities",
  },
  {
    type: "Upper floors accessible by stairs only",
    filterCount: 106,
    category: "Room Facilities",
  },
  {
    type: "Balcony",
    filterCount: 165,
    category: "Room Facilities",
  },
  {
    type: "Inner courtyard view",
    filterCount: 11,
    category: "Room Facilities",
  },
  {
    type: "Bathtub",
    filterCount: 68,
    category: "Room Facilities",
  },
]

const numericFilterData = [
  { type: "Bedrooms", filterCount: 0, category: "Rooms and beds" },
  { type: "Beds", filterCount: 0, category: "Rooms and beds" },
  { type: "Bathrooms", filterCount: 0, category: "Rooms and beds" },
]

const SideFilter = () => {
  const handleBudgetSliderChange = (minValue: number, maxValue: number) => {
    console.log(`Selected budget range: ₱${minValue} - ₱${maxValue}`)
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
        {Array.from(
          new Set(filterData.map((item) => item.category)),
          (category) => (
            <CheckBoxFilter
              key={category}
              category={category}
              filters={filterData.filter((item) => item.category === category)}
            />
          )
        )}
      </div>
      <div>
        {Array.from(
          new Set(numericFilterData.map((item) => item.category)),
          (category) => (
            <NumericFilter
              key={category}
              category={category}
              filters={numericFilterData.filter(
                (item) => item.category === category
              )}
            />
          )
        )}
      </div>
    </div>
  )
}

export default SideFilter
