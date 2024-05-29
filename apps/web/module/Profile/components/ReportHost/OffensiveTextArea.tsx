import { Typography } from "@/common/components/ui/Typography"
import TextArea from "./TextArea"
import { useState } from "react"
import { Button } from "@/common/components/ui/Button"
import useReportHostStore from "@/common/store/useReportHostStore"

type OffensiveTextAreaProps = {
  isSecondLevel: boolean
}

const OffensiveTextArea = ({ isSecondLevel }: OffensiveTextAreaProps) => {
  const [value, setValue] = useState("")

  const handleSetValue = (text: string) => {
    setValue(text)
  }

  const subTitle = useReportHostStore((state) => state.subTitle)
  const placeholderText = useReportHostStore((state) => state.placeholder)
  const setOutput = useReportHostStore((state) => state.setOutput)
  const setCurrentContent = useReportHostStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportHostStore((state) => state.removeLastValue)

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <div className="pt-5 pb-10 px-5">
          <Typography variant="h2" fontWeight="semibold">
            {subTitle}
          </Typography>
          <Typography variant="h4" className="mb-7">
            Please provide specific details.
          </Typography>
          <TextArea
            placeholderText={placeholderText}
            setValue={handleSetValue}
          />
        </div>
      </div>
      <div className="justify-between border-t border-gray-300 flex items-center">
        <Button
          variant="ghost"
          className="ml-1 underline font-medium"
          onClick={() => {
            if (isSecondLevel) {
              setCurrentContent("offensiveContent")
            } else {
              setCurrentContent("offensive")
            }

            removeLastValue()
          }}
        >
          Back
        </Button>
        <Button
          variant="default"
          className="mx-5 my-4 px-8  disabled:opacity-40"
          disabled={value === ""}
          onClick={() => {
            setCurrentContent("submit")
            setOutput([value])
          }}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default OffensiveTextArea
