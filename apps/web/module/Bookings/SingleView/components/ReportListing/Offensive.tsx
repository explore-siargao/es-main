import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportListingStore from "@/common/store/useReportListingStore"
import { useState } from "react"

const options = [
  {
    text: "It’s discriminatory",
    exampleText: "Ex: Racist, homophobic, sexist",
    subTitle: "Describe how it’s discriminatory",
    placeholderText: "Ex: It’s discriminatory because the description says...",
  },
  {
    text: "It’s inappropriate",
    exampleText: "Ex: Sexually explicit, violent, graphic",
    subTitle: "Describe how it’s inappropriate",
    placeholderText: "Ex: It’s inappropriate because the photos shows...",
  },
  {
    text: "It’s abusive or hostile",
    exampleText: "Ex: Bullying, threats, verbal assaults",
    subTitle: "Describe how it’s abusive or hostile",
    placeholderText: "Ex: It’s hostile because the house rules say...",
  },
]

const Offensive = () => {
  const [selectedValue, setSelectedValue] = useState("")

  const setOutput = useReportListingStore((state) => state.setOutput)
  const setCurrentContent = useReportListingStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportListingStore(
    (state) => state.removeLastValue
  )
  const setSubTitle = useReportListingStore((state) => state.setSubTitle)
  const setPlaceHolder = useReportListingStore((state) => state.setPlaceHolder)

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <div className="pt-5 pb-3 px-5">
          <Typography variant="h2" fontWeight="semibold">
            Why do you think it’s offensive?
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
                      setSelectedValue(option.text)
                      // @ts-ignore
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
          // disabled={selectedValue === ""}
          onClick={() => {
            setCurrentContent("offensiveTextArea")
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
