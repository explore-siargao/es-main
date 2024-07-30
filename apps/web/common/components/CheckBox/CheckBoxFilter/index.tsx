import { Typography } from "../../ui/Typography"

type T_Props = {
  title: string
  filters: T_Filters[]
}

type T_Filters = {
  type: string
  filterCount: number
}

const CheckBoxFilter = ({ title, filters }: T_Props) => {
  return (
    <div>
      <Typography className="mb-1" fontWeight="bold">
        {title}
      </Typography>
      <div className="space-y-1">
        {filters.map((filter, index) => (
          <div
            className="flex items-center justify-between max-w-xs"
            key={`filter_cb_${index}`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`filter_cb_${index}`}
                className={`text-primary-500 focus:ring-primary-500 h-4 w-4 rounded`}
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
