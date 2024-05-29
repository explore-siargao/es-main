import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportListingStore from "@/common/store/useReportListingStore"
import { APP_NAME } from "@repo/constants"
import { useState } from "react"

const options = [
  {
    to: "scamSelectables",
    text: "The host asked me to pay outside of " + APP_NAME,
    exampleText: "Ex: Wire transfer, cash, bank transfer",
    subTitle: "How did they ask you to pay?",
    selectables: [
      "Bank or wire transfer",
      "Credit or debit card",
      "Cash",
      "Paypal",
      "MoneyGram",
      "Western Union",
      "Something else",
    ],
  },
  {
    to: "scamSelectables",
    text: "The host shared their contact information",
    exampleText: "Ex: Personal email or phone number",
    subTitle: "Where did they share their contact information?",
    selectables: [
      "Photos",
      "Description",
      "House rules",
      APP_NAME + " message",
      "Somewhere else",
    ],
  },
  {
    to: "scamSelectables",
    text: "The host is advertising other services",
    exampleText: "Ex: Links to non-" + APP_NAME + " websites",
    subTitle: "Where did they advertise?",
    selectables: [
      "Photos",
      "Description",
      "House rules",
      APP_NAME + " message",
      "Somewhere else",
    ],
  },
  {
    to: "submit",
    text: "It’s a duplicate listing",
    exampleText: "Ex: Copies all or part of another listing",
    subTitle: "",
    selectables: [],
  },
  {
    to: "scamSelectables",
    text: "It’s misleading",
    exampleText: "Ex: Photos don’t match description, stock photos",
    subTitle: "What is misleading?",
    selectables: [
      "Photos",
      "Description",
      "House rules",
      "Title",
      "Location",
      "Price",
      "Amenities",
      "Bedrooms",
      "Bathrooms",
      "Something else",
    ],
  },
  {
    to: "submitWithFeedback",
    text: "It’s something else",
    exampleText: "",
    subtitle: "",
    selectables: [],
  },
]

const Scam = () => {
  const [selectedName, setSelectedName] = useState("")
  const [selectedValue, setSelectedValue] = useState("")

  const setOutput = useReportListingStore((state) => state.setOutput)
  const setCurrentContent = useReportListingStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportListingStore(
    (state) => state.removeLastValue
  )
  const setSubTitle = useReportListingStore((state) => state.setSubTitle)
  const setSelectables = useReportListingStore((state) => state.setSelectables)

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <div className="pt-5 pb-3 px-5">
          <Typography variant="h2" fontWeight="semibold">
            Why do you think it’s a scam?
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
                      // @ts-ignore
                      setSubTitle(option.subTitle)
                      setSelectables(option.selectables)
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

export default Scam
