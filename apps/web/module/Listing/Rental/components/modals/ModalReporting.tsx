import ModalContainer from "@/common/components/ModalContainer"
import RightRadioList from "@/common/components/RightRadioList"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { APP_NAME } from "@repo/constants"
import { ChangeEvent, useState } from "react"

interface ModalReportingProps {
  isOpen: boolean
  onClose: () => void
  reportListingArr: {
    name: string
    choices?: {
      description: string
      reason?: string
      report?: { reportRes: string }[]
    }[]
  }[]
}

var selection = {
  mainProblem: null as string | null,
  report: null as string | null,
  reportDetails: null as string | null,
  otherDetails: null as string | null,
}

{
  mainProblem: "It's a scam"
  report: "The host asked me to pay outside of Explore Siargao"
  reportDetails: "Credit card or debit"
  otherDetails: "Ex. listing says its an entire"
}

const ModalReporting = ({
  isOpen,
  onClose,
  reportListingArr,
}: ModalReportingProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [selectedDescription, setSelectedDescription] = useState<string>("")
  const [isInaccurateSelected, setIsInaccurateSelected] = useState(false)
  const [isReport, setIsReport] = useState(false)
  const [isScam, setIsScam] = useState(false)
  const [isOffensive, setIsOffensive] = useState(false)
  const [isSomethingElse, setIsSomethingElse] = useState(false)

  const [selectedReportRes, setSelectedReportRes] = useState<string>("")
  const [isReportSelected, setIsReportSelected] = useState(false)
  //for third page
  const [isBankorWire, setBankorWire] = useState(false)
  const [isCreditOrDebit, setCreditOrDebit] = useState(false)

  const isNextButtonDisabled = currentPage === 1 && !selectedOption

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setIsInaccurateSelected(option === "It's inaccurate or incorrect")
    setIsReport(option === "We got your report")
    setIsScam(option === "Why do you think it’s a scam?")
    setIsOffensive(option === "Why do you think it’s offensive?")
    setIsSomethingElse(option === "Why are you reporting this listing?")

    if (option === "It's inaccurate or incorrect") {
      setIsInaccurateSelected(true)
    } else if (option === "It’s not a real place to stay") {
      setIsReport(true)
      storeSelection()
    } else if (option === "It’s a scam") {
      setIsScam(true)
    } else if (option === "It’s offensive") {
      setIsOffensive(true)
    } else if (option === "It's something else") {
      setIsSomethingElse(true)
    }
  }

  const handleReportSelect = (report: string) => {
    console.log("Selected Report:", report)
    setSelectedReportRes(report)
    setIsReportSelected(true)
  }

  const handleReportReasonSelect = (report: string) => {
    //this is for page 3
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    setIsInaccurateSelected(selectedOption === "It's inaccurate or incorrect")
    setIsReport(selectedOption === "It’s not a real place to stay")
    setIsScam(selectedOption === "It's a scam")
    setIsOffensive(selectedOption === "It's offensive")
    setIsSomethingElse(selectedOption === "It's something else")

    //sa third page to
    setBankorWire(
      selectedReportRes === `The host asked me to pay outside of ${APP_NAME}`
    )
    setCreditOrDebit(
      selectedReportRes === "The host shared their contact information"
    )
  }
  const prevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const selectedReport = reportListingArr.find(
    (report) => report.name === selectedOption
  )
  const selectedReportReason = reportListingArr.find((report) => {
    return report.choices?.some((choice) => choice.reason === selectedReportRes)
  })

  console.log("selectedReportReason:", selectedReportReason)

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setSelectedDescription(event.target.value)
  }

  const handleButtonClick = () => {
    if (selectedOption === "It's not a real place to stay") {
      storeSelection()
    }
    nextPage()
    storeSelection()
  }

  const storeSelection = () => {
    selection.mainProblem = selectedOption
    selection.report = selectedReportRes
    selection.otherDetails = selectedDescription
    console.log(selection)
    //iaadd pa thirpage
  }

  return (
    <ModalContainer size="sm" onClose={onClose} isOpen={isOpen}>
      <div className="p-6 flex flex-col divide-text-100 overflow-y-auto h-[400px]">
        {currentPage === 1 && (
          <>
            <Typography
              variant="h2"
              fontWeight="semibold"
              className="flex mb-1"
            >
              {currentPage === 1 || !isInaccurateSelected
                ? "Why are you reporting this listing?"
                : "Describe how it's inaccurate or incorrect"}
            </Typography>
            <Typography variant="h4" fontWeight="semibold" className="mt-2">
              {currentPage === 1 || !isScam
                ? "This won't be shared with the Host."
                : ""}
            </Typography>
            <div>
              <RightRadioList
                title={""}
                lists={reportListingArr.map((reportReason) => ({
                  id: reportReason.name,
                  option: reportReason.name,
                }))}
                onSelect={(option) => handleOptionSelect(option)}
              />
            </div>
          </>
        )}
        {currentPage === 2 && (
          <>
            {isInaccurateSelected && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex mb-1"
              >
                Describe how it's inaccurate or incorrect
              </Typography>
            )}
            {isReport && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex border-none"
              >
                We got your report
              </Typography>
            )}
            {isScam && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex border-none"
              >
                Why do you think it's a scam?
              </Typography>
            )}
            {isOffensive && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex border-none"
              >
                Why do you think it's offensive
              </Typography>
            )}
            {isSomethingElse && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex border-none"
              >
                Why are you reporting this listing?
              </Typography>
            )}

            {selectedOption === "It's inaccurate or incorrect" && (
              <textarea
                className=" p-2 border border-gray-300 rounded-md w-full h-32 mt-7"
                placeholder="Ex. This listing says it's an entire home but its actually a private room."
                value={selectedDescription}
                onChange={handleDescriptionChange}
              />
            )}

            {selectedOption === "It’s not a real place to stay" && (
              <div className="mt-7">
                <Typography variant="h3">
                  Thanks for taking the time to let us know what’s going on.
                  Reports like yours help keep our community safe and secure.
                </Typography>
              </div>
            )}
            {selectedOption === "It’s a scam" && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex mb-1"
              >
                Why do you think it’s a scam?
              </Typography>
            )}
            {selectedOption === "It’s offensive" && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex mb-1"
              >
                Why do you think it’s offensive?
              </Typography>
            )}
            {selectedOption === "It’s something else" && (
              <Typography
                variant="h2"
                fontWeight="semibold"
                className="flex mb-1"
              >
                Why are you reporting this listing?
              </Typography>
            )}
            {/* //Page 2 ko to*/}
            {selectedReport?.choices && selectedReport.choices.length > 0 && (
              <RightRadioList
                title=""
                lists={(selectedReport?.choices || []).map((choice, num) => ({
                  id: choice.reason || num.toString(),
                  option: choice.reason || "",
                  description: choice.description || "",
                  report: choice.reason || "",
                }))}
                onSelect={(report) => {
                  handleReportSelect(report)
                  console.log(report)
                  console.log(selectedReport)
                }}
              />
            )}
          </>
        )}
        {currentPage === 3 && (
          <>
            {console.log("selectedReportReason:", selectedReportReason)}
            {console.log(
              "selectedReportReason?.choices:",
              selectedReportReason?.choices
            )}
            {selectedReport?.choices && selectedReport.choices.length > 0 && (
              <RightRadioList
                title=""
                lists={(selectedReportReason?.choices || []).flatMap(
                  (choice: { report?: { reportRes: string }[] }) =>
                    (choice.report || []).map(
                      (reportItem: { reportRes: string }) => ({
                        id: reportItem.reportRes,
                        option: reportItem.reportRes,
                        description: undefined,
                        report: reportItem.reportRes || "",
                      })
                    )
                )}
                onSelect={(report) => {
                  handleReportReasonSelect(report)
                  console.log("Selected Report Reason", selectedReportReason)
                }}
              />
            )}
          </>
        )}
      </div>

      <div className="flex items-center p-4 md:p-5 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
        <div className="flex justify-between w-full">
          {currentPage === 1 && (
            <Button variant="default" onClick={nextPage} className="ml-auto">
              Next
            </Button>
          )}
          {currentPage === 2 && (
            <>
              <Button variant="ghost" onClick={prevPage} className=" mr-2">
                Back
              </Button>
              <Button
                variant="default"
                onClick={handleButtonClick}
                disabled={isNextButtonDisabled}
                className=" ml-2"
              >
                Next
              </Button>
            </>
          )}
          {currentPage === 3 && (
            <>
              <Button variant="ghost" onClick={prevPage} className=" mr-2">
                Back
              </Button>
              <Button
                variant="default"
                onClick={handleButtonClick}
                disabled={isNextButtonDisabled}
                className=" ml-2"
              >
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  )
}

export default ModalReporting
