import React from "react"
import EditPricePerDatesModal from "./modals/edit-price-per-dates-modal"
import InfoCancelModal from "./modals/info-cancel-modal"
import AddReservationModal from "./modals/add-reservation-modal"
import toast from "react-hot-toast"
import { useCalendarStore } from "./stores/use-calendar-store"

const ModalsWrapper = () => {
  const {
    filteredData,
    tempUnitQtyName,
    setFilteredData,
    setEditingUnitQtyId,
  } = useCalendarStore((state) => state)

  const handleSaveRoom = (categoryName: string, bedIndex: number) => {
    const newFilteredData = { ...filteredData }
    const category = newFilteredData?.items?.find(
      (category) => category.name === categoryName
    )
    if (category) {
      //@ts-ignore
      const bed = category?.beds[bedIndex]
      if (bed) {
        bed.name = tempUnitQtyName
        setFilteredData(newFilteredData)
        toast.success("Successfully changed room property name")
      } else {
        toast.error("Property room not found in category")
      }
    } else {
      toast.error("Category not found")
    }

    setEditingUnitQtyId(null)
  }

  return (
    <>
      <InfoCancelModal />
      <EditPricePerDatesModal />
      <AddReservationModal />
    </>
  )
}

export default ModalsWrapper
