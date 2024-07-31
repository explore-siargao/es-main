import useFilterStore from "@/common/store/useFilterStore"
import { Typography } from "../../ui/Typography"

type T_Props = {
  category: string
  filters: T_Filters[]
}

type T_Filters = {
  type: string
  filterCount: number
}

// IMPLEMENTATION EXAMPLE FOR OTHER PAGE

{
  /* 
  const filterData = [
    {
      type: "Hotels",
      filterCount: 1388,
      category: "Popular filters",
    },
    {
      type: "Pets allowed",
      filterCount: 100,
      category: "Popular filters",
    },
    {
      type: "Free WiFi",
      filterCount: 2773,
      category: "Popular filters",
    },
    {
      type: "5 stars",
      filterCount: 87,
      category: "Popular filters",
    },
    {
      type: "Free cancellation",
      filterCount: 196,
      category: "Popular filters",
    },
    {
      type: "No prepayment",
      filterCount: 382,
      category: "Popular filters",
    },
    {
      type: "Parking",
      filterCount: 350,
      category: "Facilities",
    },
    {
      type: "Restaurant",
      filterCount: 116,
      category: "Facilities",
    },
    {
      type: "Room service",
      filterCount: 105,
      category: "Facilities",
    },
    {
      type: "Fitness centre",
      filterCount: 78,
      category: "Facilities",
    },
    {
      type: "Pets allowed",
      filterCount: 51,
      category: "Facilities",
    },
    {
      type: "Free WiFi",
      filterCount: 498,
      category: "Facilities",
    },
  ]

  <div>
  {Array.from(
    new Set(filterData.map((item) => item.category)),
    (category) => (
      <CheckBoxFilter
        key={category}
        category={category}
        filters={filterData.filter(
          (item) => item.category === category
        )}
      />
    )
  )}
  </div> 
  */
}

const CheckBoxFilter = ({ category, filters }: T_Props) => {
  const filterData = useFilterStore((state) => state.filterData)
  const setFilter = useFilterStore((state) => state.setFilter)

  const handleCheckboxChange = (filter: T_Filters) => {
    if (filterData.some((f) => f.type === filter.type)) {
      // remove filter if it's existing
      setFilter(filterData.filter((f) => f.type !== filter.type))
    } else {
      // add new filter
      setFilter([...filterData, { category, type: filter.type }])
    }
  }

  return (
    <div className="border max-w-xs p-4">
      <Typography className="mb-1" fontWeight="bold">
        {category}
      </Typography>
      <div className="space-y-1">
        {filters.map((filter, index) => (
          <div
            className="flex items-center justify-between"
            key={`filter_cb_${index}`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`filter_cb_${index}`}
                className={`text-primary-500 focus:ring-primary-500 h-4 w-4 rounded`}
                checked={filterData.some((f) => f.type === filter.type)}
                onChange={() => handleCheckboxChange(filter)}
              />
              <Typography className="mt-0.5">{filter.type}</Typography>
            </div>
            <Typography className="text-gray-500">
              {filter.filterCount}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckBoxFilter
