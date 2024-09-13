import React from "react"
import ListingDateRangePicker from "../ListingDateRangePicker"
import ModalContainer from "@/common/components/ModalContainer"

const checkInOutCalendarModal = () => {
  return (
    <ModalContainer onClose={() => null} isOpen={true}>
      <ListingDateRangePicker title={""} />
    </ModalContainer>
  )
}

export default checkInOutCalendarModal
