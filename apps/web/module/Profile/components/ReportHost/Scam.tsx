import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useReportHostStore from "@/common/store/useReportHostStore"
import { APP_NAME } from "@repo/constants"
import { useState } from "react"

const options = [
  {
    to: "scamSelectables",
    text: "They asked me to pay outside of Airbnb",
    exampleText: "Ex: Wire transfer, cash, bank transfer",
    subTitle: "How did they ask you to pay?",
    selectables: [
      "Bank or wire transfer",
      "Credit or debit card",
      "Cash",
      "Paypal",
      "MoneyGram",
      "Western Union",
    ],
  },
  {
    to: "scamSelectables",
    text: "They asked me to communicate outside of " + APP_NAME,
    exampleText: "Ex: Email, phone, instant message app",
    subTitle: "Where did they share their contact info?",
    selectables: [
      "Photos",
      "Description",
      "House rules",
      APP_NAME + " message",
    ],
  },
  {
    to: "scamSelectables",
    text: "They advertised or solicited something",
    exampleText: "Ex: Other booking websites, hosting services",
    subTitle: "Where did they advertise or solicit?",
    selectables: [
      "Photos",
      "Description",
      "House rules",
      APP_NAME + " message",
    ],
  },
  {
    to: "submit",
    text: "They collect fees or deposits outside of " + APP_NAME,
    exampleText: "Ex: Additional security deposit or fees",
    subTitle: "",
    selectables: [],
  },
  {
    to: "submit",
    text: "They offered another Host",
    exampleText: "",
    subTitle: "",
    selectables: [],
  },
]

const Scam = () => {
  const [selectedName, setSelectedName] = useState("")
  const [selectedValue, setSelectedValue] = useState("")

  const setOutput = useReportHostStore((state) => state.setOutput)
  const setCurrentContent = useReportHostStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportHostStore((state) => state.removeLastValue)
  const setSubTitle = useReportHostStore((state) => state.setSubTitle)
  const setSelectables = useReportHostStore((state) => state.setSelectables)

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
