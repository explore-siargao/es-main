import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportHostStore from "@/common/store/useReportHostStore"
import { APP_NAME } from "@repo/constants"
import { useState } from "react"

const ScamSelectables = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const selectables = useReportHostStore((state) => state.selectables)
  const subTitle = useReportHostStore((state) => state.subTitle)
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
            {subTitle}
          </Typography>
          <Typography variant="h4" className="mb-7">
            This will only be shared with {APP_NAME}.
          </Typography>
          {selectables.map((selectable, index) => (
            <div className="inline-block mb-6 mr-2">
              <label
                key={`selectable-${index}`}
                className={`${selectedOptions.includes(selectable) ? "ring-2 ring-gray-900" : "ring-1 ring-gray-300"} px-4 py-2 rounded-full hover:ring-gray-900 cursor-pointer`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-900 hidden"
                  checked={selectedOptions.includes(selectable)}
                  onChange={() => {
                    setSelectedOptions((selectedOptions) => {
                      if (selectedOptions.includes(selectable)) {
                        return selectedOptions.filter(
                          (option) => option !== selectable
                        )
                      } else {
                        return [...selectedOptions, selectable]
                      }
                    })
                  }}
                />
                <span>{selectable}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="justify-between border-t border-gray-300 flex items-center">
        <Button
          variant="ghost"
          className="ml-1 underline font-medium"
          onClick={() => {
            setCurrentContent("scam")
            removeLastValue()
          }}
        >
          Back
        </Button>
        <Button
          variant="default"
          className="mx-5 my-4 px-8  disabled:opacity-40"
          disabled={selectedOptions.length < 1}
          onClick={() => {
            setCurrentContent("submit")
            setOutput([...selectedOptions])
          }}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default ScamSelectables
