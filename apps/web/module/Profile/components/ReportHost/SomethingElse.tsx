import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportHostStore from "@/common/store/useReportHostStore"
import { APP_NAME } from "@repo/constants"
import { useState } from "react"

const options = [
  {
    text: "The host is unresponsive",
  },
  {
    text: "They collect fees or deposits outside of Airbnb",
  },
  {
    text: "My host is asking me to cancel",
  },
  {
    text: "I’m concerned they’re hosting in my neighborhood",
  },
  {
    text: "Something on this page is broken",
  },
]

const SomethingElse = () => {
  const [selectedValue, setSelectedValue] = useState("")

  const setOutput = useReportHostStore((state) => state.setOutput)
  const setCurrentContent = useReportHostStore(
    (state) => state.setCurrentContent
  )

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <div className="pt-5 pb-3 px-5">
          <Typography variant="h2" fontWeight="semibold">
            What’s happening?
          </Typography>
          <Typography variant="h4">
            This will only be shared with {APP_NAME}.
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
      <div className="justify-end border-t border-gray-300 flex items-center">
        <Button
          variant="default"
          className="mx-5 my-4 px-8  disabled:opacity-40"
          disabled={selectedValue === ""}
          onClick={() => {
            setCurrentContent("submit")
            setOutput([selectedValue])
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default SomethingElse
