import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportHostStore from "@/common/store/useReportHostStore"
import { useState } from "react"

const options = [
  {
    text: "In a message the user sent to me",
  },
  {
    text: "On the user’s profile",
  },
  {
    text: "On a listing page",
  },
  {
    text: "In person, during a trip",
  },
  {
    text: "Somewhere else",
  },
]

const OffensiveContent = () => {
  const [selectedValue, setSelectedValue] = useState("")

  const setOutput = useReportHostStore((state) => state.setOutput)
  const setCurrentContent = useReportHostStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportHostStore((state) => state.removeLastValue)

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <div className="pt-5 pb-3 px-5">
          <Typography variant="h2" fontWeight="semibold">
            Where is the offensive content?
          </Typography>
        </div>
        <fieldset className="px-5">
          <div className="divide-y divide-gray-200 border-gray-200 mb-3">
            {options.map((option, index) => (
              <div key={index} className="relative flex items-start py-5">
                <div className="min-w-0 flex-1 leading-6">
                  <label htmlFor={`option-${index}`} className="select-none">
                    {option.text}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <input
                    id={`option-${index}`}
                    name="plan"
                    type="radio"
                    defaultChecked={undefined}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                    onChange={() => {
                      setSelectedValue(option.text)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="justify-between border-t border-gray-300 flex items-center">
        <Button
          variant="ghost"
          className="ml-1 underline font-medium"
          onClick={() => {
            setCurrentContent("offensive")
            removeLastValue()
          }}
        >
          Back
        </Button>
        <Button
          variant="default"
          className="mx-5 my-4 px-8  disabled:opacity-40"
          disabled={selectedValue === ""}
          onClick={() => {
            setCurrentContent("offensiveTextArea1")
            setOutput([selectedValue])
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default OffensiveContent
