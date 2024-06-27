import ModalContainer from "@/common/components/ModalContainer"
import useReportListingStore from "@/common/store/useReportListingStore"
import { useEffect } from "react"
import React from "react"
import DefaultOption from "@/module/Bookings/SingleView/components/ReportListing/DefaultOption"
import Inaccurate from "@/module/Bookings/SingleView/components/ReportListing/Inaccurate"
import Scam from "@/module/Bookings/SingleView/components/ReportListing/Scam"
import ScamSelectables from "@/module/Bookings/SingleView/components/ReportListing/ScamSelectables"
import Offensive from "@/module/Bookings/SingleView/components/ReportListing/Offensive"
import OffensiveTextArea from "@/module/Bookings/SingleView/components/ReportListing/OffensiveTextArea"
import SomethingElse from "@/module/Bookings/SingleView/components/ReportListing/SomethingElse"
import Reported from "@/module/Bookings/SingleView/components/ReportListing/Reported"
import Feedback from "@/module/Bookings/SingleView/components/ReportListing/Feedback"

type ReportListingModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ReportListingModal = ({ isOpen, onClose }: ReportListingModalProps) => {
  const reportListings = [
    {
      name: null,
      content: () => <DefaultOption />,
    },
    {
      name: "inaccurate",
      content: () => <Inaccurate />,
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
      name: "offensiveTextArea",
      content: () => <OffensiveTextArea />,
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
    {
      name: "feedback",
      content: () => <Feedback closeModal={onClose} />,
    },
  ]

  const currentContent = useReportListingStore((state) => state.currentContent)
  const output = useReportListingStore((state) => state.output)

  useEffect(() => {
    console.log(output)
  }, [output])

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="sm">
      {reportListings
        .find((listing) => currentContent === listing.name)
        ?.content()}
    </ModalContainer>
  )
}

export default ReportListingModal
