import * as React from "react"
import CreatableSelect from "react-select/creatable"
import { cn } from "@/common/helpers/cn"
import Asterisk from "./Asterisk"
import { SingleValue } from "react-select"

export interface CreatableSelectProps {
  label: string
  options: { value: string; label: string }[]
  value: { value: string; label: string }
  defaultValue?: string
  onChange: (newValue: SingleValue<{ value: string; label: string }>) => void
  onCreateOption: (newOption: { value: string; label: string }) => void
  isRequired?: boolean
}

const CreatableSelectComponent: React.FC<CreatableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  onCreateOption,
  isRequired = false,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<{
    value: string
    label: string
  } | null>(value)

  React.useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleOnChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    onChange(newValue)
    setSelectedValue(newValue)
  }

  const handleCreateOption = (inputValue: string) => {
    const newOption = { value: inputValue, label: inputValue }
    onCreateOption(newOption)
    setSelectedValue(newOption)
    onChange(newOption)
  }

  return (
    <div
      className={cn(
        "rounded-md pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600"
      )}
    >
      <label className="block text-xs font-medium text-text-900 px-3">
        {label} {isRequired && <Asterisk />}
      </label>
      <CreatableSelect
        classNamePrefix="react-select"
        options={options}
        value={selectedValue}
        onChange={handleOnChange}
        onCreateOption={handleCreateOption}
        isClearable
        styles={{
          control: (provided) => ({
            ...provided,
            border: 0,
            boxShadow: "none",
            backgroundColor: "transparent",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "inherit",
            border: 0,
          }),
          input: (provided) => ({
            ...provided,
            color: "inherit",
            border: 0,
            outline: "none !important",
          }),
        }}
      />
    </div>
  )
}

export default CreatableSelectComponent
