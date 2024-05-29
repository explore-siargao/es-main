import { useEffect, useState } from "react"
import { Typography } from "./ui/Typography"

interface RightRadioListProps {
  title: string
  lists: {
    id: number | string
    option: string
    description?: string
    report?: string
  }[]
  defaultSelectedId?: number | string
  description?: string
  onSelect: (option: string) => void
}

const RightRadioList: React.FC<RightRadioListProps> = ({
  title,
  lists,
  onSelect,
  defaultSelectedId,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelectedId || "")
  useEffect(() => {
    setSelectedOption(defaultSelectedId || "")
  }, [defaultSelectedId])

  const handleOptionChange = (event: { target: { value: any } }) => {
    const value = event.target.value
    setSelectedOption(value)
    onSelect(value)
  }

  return (
    <div className="flex flex-col w-full">
      <Typography variant="h2" className="w-full py-3 border-b">
        {title}
      </Typography>
      {lists.map((choice) => (
        <div key={choice.id} className="flex w-full py-3 border-b">
          <label className="flex items-center w-full">
            <div>
              <Typography variant="p" className="text-gray-600">
                {choice.option}
              </Typography>
              <div className="items-start">
                {choice.description && (
                  <Typography variant="p" className="text-gray-400">
                    {choice.description}
                  </Typography>
                )}
              </div>
            </div>
            <input
              name="helper-radio"
              type="radio"
              value={choice.option}
              checked={
                selectedOption === choice.option ||
                selectedOption === defaultSelectedId
              }
              onChange={handleOptionChange}
              className="ml-auto w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
          </label>
        </div>
      ))}
    </div>
  )
}
export default RightRadioList
