import { Minus, Plus } from "lucide-react"
import { Typography } from "../../ui/Typography"
import useFilterStore from "@/common/store/useFilterStore"

type T_Filter = {
  category: string
  type: string
  filterCount: number
}

type T_Props = {
  category: string
  filters: T_Filter[]
  onFilterChange: (filters: T_Filter[]) => void
}

const NumericFilter = ({ category, filters, onFilterChange }: T_Props) => {
  const filterData = useFilterStore((state) => state.filterData)
  const increaseFilterCount = useFilterStore(
    (state) => state.increaseFilterCount
  )
  const decreaseFilterCount = useFilterStore(
    (state) => state.decreaseFilterCount
  )

  const getFilterCount = (category: string, type: string) => {
    const filter = filterData.find(
      (filter) => filter.category === category && filter.type === type
    )
    return filter ? filter.filterCount : 0
  }

  const handleIncrease = (category: string, type: string) => {
    increaseFilterCount(category, type)
    const updatedFilter = {
      category,
      type,
      filterCount: getFilterCount(category, type) + 1,
    }
    onFilterChange([
      ...filterData.filter(
        (f) => !(f.category === category && f.type === type)
      ),
      updatedFilter,
    ])
  }

  const handleDecrease = (category: string, type: string) => {
    if (getFilterCount(category, type) > 0) {
      decreaseFilterCount(category, type)
      const updatedFilter = {
        category,
        type,
        filterCount: getFilterCount(category, type) - 1,
      }
      const newFilterData = filterData.filter(
        (f) => !(f.category === category && f.type === type)
      )
      if (updatedFilter.filterCount > 0) {
        onFilterChange([...newFilterData, updatedFilter])
      } else {
        onFilterChange(newFilterData)
      }
    }
  }

  return (
    <div className="border max-w-xs p-4 rounded-bl-md rounded-br-md">
      <Typography className="mb-2" fontWeight="bold">
        {category}
      </Typography>
      {filters.map((filter, index) => (
        <div
          className="grid grid-cols-2 items-center space-y-2"
          key={filter.type}
        >
          <Typography>{filter.type}</Typography>
          <div className="flex justify-between  border-neutral-400 rounded-md max-w">
            <button
              className="px-4 py-2 text-primary-800 rounded-l-md enabled:hover:bg-primary-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleDecrease(category, filter.type)}
              disabled={getFilterCount(category, filter.type) === 0}
            >
              <Minus className="h-4 w-4" />
            </button>
            <Typography className={`p-2 disabled:text-gray-400 text-gray-700`}>
              {getFilterCount(category, filter.type)}
            </Typography>
            <button
              className="px-4 py-2 text-primary-800 rounded-r-md enabled:hover:bg-primary-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleIncrease(category, filter.type)}
            >
              <Plus className="h-4 w-4 " />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NumericFilter
