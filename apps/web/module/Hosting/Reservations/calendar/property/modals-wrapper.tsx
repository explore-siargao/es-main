import React from "react"
import EditPricePerDatesModal from "./modals/edit-price-per-dates-modal"
import InfoCancelModal from "./modals/info-cancel-modal"

const ModalsWrapper = () => {
  return (
    <>
      <InfoCancelModal />
      <EditPricePerDatesModal />
    </>
  )
}

export default ModalsWrapper
