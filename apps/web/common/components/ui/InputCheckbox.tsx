interface CheckboxProps {
  id: number
  colorVariant: string
  checked?: boolean
  onChange: (id: number, event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({ id, colorVariant, checked, onChange }: CheckboxProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e)
  }

  const getColorClassName = () => {
    switch (colorVariant) {
      case "primary":
        return "text-primary-500 focus:ring-primary-500"
      case "secondary":
        return "text-secondary-500 focus:ring-secondary-500"
      default:
        return ""
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        checked={checked}
        onChange={handleCheckboxChange}
        className={`form-checkbox ${getColorClassName()} h-4 w-4 rounded`}
      />
    </div>
  )
}

export default Checkbox
