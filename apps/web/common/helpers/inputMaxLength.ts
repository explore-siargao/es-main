import { useState } from "react"

const inputMaxLength = (initialValue: string, maxLength: number) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    if (inputText.length <= maxLength) {
      setValue(inputText)
    }
  }

  return { value, onChange: handleChange }
}

export default inputMaxLength
