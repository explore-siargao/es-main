import ModalContainer from "@/common/components/ModalContainer"
import { ReportHostModalProps } from "../../types/ReportHostModal"
import useReportHostStore from "@/common/store/useReportHostStore"
import { useEffect } from "react"
import DefaultOption from "../ReportHost/DefaultOption"
import Scam from "../ReportHost/Scam"
import ScamSelectables from "../ReportHost/ScamSelectables"
import Reported from "../ReportHost/Reported"
import OffensiveTextArea from "../ReportHost/OffensiveTextArea"
import Offensive from "../ReportHost/Offensive"
import OffensiveContent from "../ReportHost/OffensiveContent"
import SomethingElse from "../ReportHost/SomethingElse"

const ReportHostModal = ({ isOpen, onClose }: ReportHostModalProps) => {
  const reportListings = [
    {
      name: null,
      content: () => <DefaultOption />,
    },
    {
      name: "scam",
      content: () => <Scam />,
    },
    {
      name: "scamSelectables",
      content: () => <ScamSelectables />,
    },
    {
      name: "offensive",
      content: () => <Offensive />,
    },
    {
      name: "offensiveContent",
      content: () => <OffensiveContent />,
    },
    {
      name: "offensiveTextArea",
      content: () => <OffensiveTextArea isSecondLevel={false} />,
    },
    {
      name: "offensiveTextArea1",
      content: () => <OffensiveTextArea isSecondLevel={true} />,
    },
    {
      name: "somethingElse",
      content: () => <SomethingElse />,
    },
    {
      name: "submit",
      content: () => <Reported withFeedback={false} closeModal={onClose} />,
    },
    {
      name: "submitWithFeedback",
      content: () => <Reported withFeedback={true} closeModal={onClose} />,
    },
  ]

  const currentContent = useReportHostStore((state) => state.currentContent)
  const output = useReportHostStore((state) => state.output)

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="sm">
      {reportListings
        .find((listing) => currentContent === listing.name)
        ?.content()}
    </ModalContainer>
  )
}

export default ReportHostModal
