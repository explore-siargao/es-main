import React, { useState } from "react"
import useFilterStore from "@/common/store/useFilterStore"
import { Typography } from "../../ui/Typography"
import { LucideChevronDown } from "lucide-react"

type T_Props = {
  category: string
  filters: T_Filters[]
}

type T_Filters = {
  type: string
  filterCount: number
}

const CheckBoxFilter = ({ category, filters }: T_Props) => {
  const filterData = useFilterStore((state) => state.filterData)
  const setFilter = useFilterStore((state) => state.setFilter)
  const [showAll, setShowAll] = useState(false)

  const handleCheckboxChange = (filter: T_Filters) => {
    if (filterData.some((f) => f.type === filter.type)) {
      // Remove filter if it's existing
      setFilter(filterData.filter((f) => f.type !== filter.type))
    } else {
      // Add new filter
      //@ts-ignore
      setFilter([...filterData, { category, type: filter.type }])
    }
  }

  const itemsToShow = showAll ? filters : filters.slice(0, 5)

  const handleToggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div className="border max-w-xs p-4">
      <Typography className="mb-1" fontWeight="bold">
        {category}
      </Typography>
      <div className="space-y-1">
        {itemsToShow.map((filter, index) => (
          <div className="flex items-center justify-between" key={filter.type}>
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
      {filters.length > 5 && (
        <button
          onClick={handleToggleShowAll}
          className="text-primary-600 mt-2 flex items-center space-x-1"
        >
          <span>{showAll ? "Show less" : `Show all ${filters.length}`}</span>
          <LucideChevronDown
            className={`transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  )
}

export default CheckBoxFilter