type TextAreaProps = {
  placeholderText: string
  setValue: (text: string) => void
}

const TextArea = ({ placeholderText, setValue }: TextAreaProps) => {
  return (
    <textarea
      rows={4}
      name="comment"
      id="comment"
      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:leading-6"
      defaultValue={""}
      placeholder={placeholderText}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  )
}

export default TextArea
