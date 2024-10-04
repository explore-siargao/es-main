import React from 'react'
import EditPricePerDatesModal from "./modals/EditPricePerDatesModal"
import InfoCancelModal from "./modals/InfoCancelModal"
import AddReservationModal from "./modals/AddReservationModal"
import toast from "react-hot-toast"
import { useCalendarStore } from './store/useCalendarStore'

const ModalsWrapper = () => {
  const {
    filteredData,
    tempRoomAbbr,
    setFilteredData,
    setEditingRoom,
  } = useCalendarStore(state => state);

  const handleSaveRoom = (categoryName: string, bedIndex: number) => {
    const newFilteredData = { ...filteredData }
    const category = newFilteredData?.items?.find(
      (category) => category.name === categoryName
    )
    if (category) {
      //@ts-ignore
      const bed = category?.beds[bedIndex]
      if (bed) {
        bed.abbr = tempRoomAbbr
        setFilteredData(newFilteredData)
        toast.success("Successfully changed room property name")
      } else {
        toast.error("Property room not found in category")
      }
    } else {
      toast.error("Category not found")
    }

    setEditingRoom(null)
  }

  return (
    <>
      <InfoCancelModal/>
      <EditPricePerDatesModal />
      <AddReservationModal/>
    </>
  )
}

export default ModalsWrapper