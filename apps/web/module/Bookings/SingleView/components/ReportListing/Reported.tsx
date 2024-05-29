import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import TextArea from "./TextArea"
import { useState } from "react"
import useReportListingStore from "@/common/store/useReportListingStore"

type ReportedProps = {
  withFeedback: boolean
  closeModal: () => void
}

const Reported = ({ withFeedback, closeModal }: ReportedProps) => {
  const [value, setValue] = useState("")

  const handleSetValue = (text: string) => {
    setValue(text)
  }

  const setOutput = useReportListingStore((state) => state.setOutput)
  const setCurrentContent = useReportListingStore(
    (state) => state.setCurrentContent
  )

  return (
    <>
      <div>
        <div className="pt-5 pb-10 px-5">
          <Typography variant="h2" fontWeight="semibold" className="mb-4">
            We got your report
          </Typography>
          {withFeedback ? (
            <>
              <Typography variant="p" className="mb-3">
                Thanks for taking the time to report this to us.
              </Typography>
              <Typography variant="p" className="mb-7">
                You let us know that you wanted to report something else. We’d
                love to know how we could be doing better.
              </Typography>
              <Typography variant="h3" className="mb-2">
                Tell us more about what happened:
              </Typography>
              <TextArea placeholderText="" setValue={handleSetValue} />
            </>
          ) : (
            <>
              <Typography variant="p">
                Thanks for taking the time to let us know what’s going on.
                Reports like yours are helping us learn how to make it easier to
                find what you’re looking for.
              </Typography>
            </>
          )}
        </div>
      </div>
      <div className="justify-end border-t border-gray-300 flex items-center">
        {withFeedback ? (
          <>
            <Button variant="ghost" className="underline" onClick={closeModal}>
              Close
            </Button>
            <Button
              variant="default"
              className="mx-5 my-4 px-8  disabled:opacity-40"
              disabled={value === ""}
              onClick={() => {
                setCurrentContent("feedback")
                setOutput([value])
              }}
            >
              Send feedback
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            className="mx-5 my-4 px-8"
            onClick={closeModal}
          >
            Ok
          </Button>
        )}
      </div>
    </>
  )
}

export default Reported
