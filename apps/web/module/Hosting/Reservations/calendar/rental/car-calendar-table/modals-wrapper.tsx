import React from "react"
import InfoCancelModal from "./modals/info-cancel-modal"
import EditPricePerDatesModal from "./modals/edit-price-per-dates-modal"

const ModalsWrapper = () => {
  return (
    <>
      <InfoCancelModal />
      <EditPricePerDatesModal />
    </>
  )
}

export default ModalsWrapper
