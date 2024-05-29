import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import TextArea from "./TextArea"
import { useState } from "react"
import useReportListingStore from "@/common/store/useReportListingStore"

const Inaccurate = () => {
  const [value, setValue] = useState("")

  const handleSetValue = (text: string) => {
    setValue(text)
  }

  const setOutput = useReportListingStore((state) => state.setOutput)
  const setCurrentContent = useReportListingStore(
    (state) => state.setCurrentContent
  )
  const removeLastValue = useReportListingStore(
    (state) => state.removeLastValue
  )

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <div className="pt-5 pb-10 px-5">
          <Typography variant="h2" fontWeight="semibold" className="mb-7">
            Describe how it’s inaccurate or incorrect?
          </Typography>
          <TextArea
            placeholderText="Ex: This listing says it’s an entire home but it’s actually a private room."
            setValue={handleSetValue}
          />
        </div>
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
          disabled={value === ""}
          onClick={() => {
            setCurrentContent("submit")
            setOutput([value])
          }}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default Inaccurate
