import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { FormProvider, useForm } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"
import {
  Category,
  Rental,
  SelectedReservation,
} from "../../../types/CalendarTable"
import RentalReservationForm from "./RentalReservationForm"
import RentalSelectLegendTypeForm from "./RentalSelectLegendForm"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  onSave: (reservation: SelectedReservation, reset: Function) => void
  data: any
}

const AddRentalReservationModal = ({
  isModalOpen,
  onClose,
  onSave,
  data,
}: IReservationCalendarModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] =
    useState<boolean>(false)

  const handleSave = (data: any) => {
    console.log(data)
    const resetform = () => {
      form.reset()
      setSelectedCategory("")
    }
    // onSave(data, resetform)
  }

  const handleRentalCancel = () => {
    onClose()

    setTimeout(() => {
      form.setValue("status", "")
      setSelectedLegendType("")
      setIsLegendTypeSelected(false)
    }, 200)
  }

  const form = useForm()

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Add Reservation"
    >
      <form onSubmit={form.handleSubmit(handleSave)}>
        <FormProvider {...form}>
          {isLegendTypeSelected ? (
            <RentalReservationForm
              handleSave={handleSave}
              handleRentalCancel={handleRentalCancel}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              selectedLegendType={selectedLegendType}
            />
          ) : (
            <RentalSelectLegendTypeForm
              selectedLegendType={selectedLegendType}
              setSelectedLegendType={setSelectedLegendType}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              handleRentalCancel={handleRentalCancel}
            />
          )}
        </FormProvider>
      </form>
    </ModalContainer>
  )
}

export default AddRentalReservationModal