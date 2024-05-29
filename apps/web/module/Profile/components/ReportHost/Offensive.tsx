import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportHostStore from "@/common/store/useReportHostStore"
import { APP_NAME } from "@repo/constants"
import { useState } from "react"

const options = [
  {
    to: "offensiveContent",
    text: "They’re being discriminatory",
    exampleText: "Ex: Racist, homophobic, sexist",
    subTitle: "Describe how they’re being discriminatory",
    placeholderText: "Ex: They’re being discriminatory because...",
  },
  {
    to: "offensiveTextArea",
    text: "They’re being inappropriate",
    exampleText: "Ex: Sexually suggestive, graphic",
    subTitle: "Describe how they’re being inappropriate",
    placeholderText: "Ex: They’re being inappropriate because...",
  },
  {
    to: "offensiveTextArea",
    text: "They’re being abusive or hostile",
    exampleText: "Ex: Bullying, threats, verbal assaults",
    subTitle: "Describe how they’re being abusive or hostile",
    placeholderText: "They’re being abusive because...",
  },
]

const Offensive = () => {
  const [selectedName, setSelectedName] = useState("")
  const [selectedValue, setSelectedValue] = useState("")

  const setOutput = useReportHostStore((state) => state.setOutput)
  const setCurrentContent = useReportHostStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportHostStore((state) => state.removeLastValue)
  const setSubTitle = useReportHostStore((state) => state.setSubTitle)
  const setPlaceHolder = useReportHostStore((state) => state.setPlaceHolder)

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
                  <h4 className="text-gray-500">{option.exampleText}</h4>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <input
                    id={`option-${index}`}
                    name="plan"
                    type="radio"
                    defaultChecked={undefined}
                    className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                    onChange={() => {
                      setSelectedName(option.to)
                      setSelectedValue(option.text)
                      setSubTitle(option.subTitle)
                      setPlaceHolder(option.placeholderText)
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
            setCurrentContent(null)
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
            setCurrentContent(selectedName)
            setOutput([selectedValue])
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default Offensive
