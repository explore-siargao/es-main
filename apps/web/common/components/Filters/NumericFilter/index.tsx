import { Minus, Plus } from "lucide-react"
import { Typography } from "../../ui/Typography"
import useFilterStore from "@/common/store/useFilterStore"
import { useEffect } from "react"

type T_Props = {
  category: string
  filters: T_Filters[]
}

type T_Filters = {
  type: string
  filterCount: number
}

const NumericFilter = ({ category, filters }: T_Props) => {
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

  useEffect(() => {
    console.log(filterData)
  }, [filterData])

  return (
    <div className="border max-w-xs p-4">
      <Typography className="mb-2" fontWeight="bold">
        {category}
      </Typography>
      {filters.map((filter, index) => (
        <div className="grid grid-cols-2 items-center space-y-2">
          <Typography key={filter.type}>{filter.type}</Typography>
          <div className="flex justify-between border border-neutral-400 rounded-md max-w">
            <button
              className="px-4 py-2 text-primary-800 rounded-l-md enabled:hover:bg-primary-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => decreaseFilterCount(category, filter.type)}
              disabled={getFilterCount(category, filter.type) === 0}
            >
              <Minus className="h-4 w-4" />
            </button>
            <Typography className={`p-2 disabled:text-gray-400 text-gray-700`}>
              {getFilterCount(category, filter.type)}
            </Typography>
            <button
              className="px-4 py-2 text-primary-800 rounded-r-md enabled:hover:bg-primary-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => increaseFilterCount(category, filter.type)}
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
