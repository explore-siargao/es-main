import React from "react"

interface Item {
  id: string
  value: number
  label: string
}

interface RadioProps {
  radioItems: Item[]
  className?: string
  selectedValue: number | null
  setSelectedValue: (value: number) => void
}

const RadioInput: React.FC<RadioProps> = ({
  radioItems,
  className = "",
  selectedValue,
  setSelectedValue,
}: RadioProps) => {
  const handleInputChange = (value: number) => {
    setSelectedValue(Number(value))
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {radioItems.map((item) => (
        <label key={item.id} className="inline-flex items-center">
          <input
            type="radio"
            id={item.id}
            value={item.value}
            checked={selectedValue === item.value}
            onChange={() => handleInputChange(item.value)}
            className="form-radio cursor-pointer h-4 w-4 text-primary-600  focus:ring-primary-500 dark:focus:ring-primary-600 focus:ring-2  mr-2"
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  )
}

export default RadioInput
