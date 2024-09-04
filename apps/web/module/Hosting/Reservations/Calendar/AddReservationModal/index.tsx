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
} from "../../types/CalendarTable"
import RentalReservationForm from "./Rental/RentalReservationForm"
import RentalSelectLegendTypeForm from "./Rental/RentalSelectLegendForm"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  onSave: (reservation: SelectedReservation, reset: Function) => void
  data: any
}

const AddReservationModal = ({
  isModalOpen,
  onClose,
  onSave,
  data,
}: IReservationCalendarModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [filteredRooms, setFilteredRooms] = useState<Rental[]>([])
  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] = useState<boolean>(false)

  const handleSave = (data: any) => {
    const resetform = () => {
      form.reset()
      setSelectedCategory("")
    }
    onSave(data, resetform)
  }

  const handleRentalCancel = () => {
    onClose()
    form.setValue("status", "")
    setSelectedLegendType("")
    setIsLegendTypeSelected(false)
  }

  const form = useForm()

  useEffect(() => {
    if (data && selectedCategory) {
      const category = data.categories.find(
        (category: Category) => category.name === selectedCategory
      )
      setFilteredRooms(category ? category.rooms : [])
    } else {
      setFilteredRooms([])
    }
  }, [selectedCategory, data])

  useEffect(() => {
    if (data && selectedCategory) {
      const category = data.categories.find(
        (category: Category) => category.name === selectedCategory
      )
      setFilteredRooms(category ? category.rooms : [])
    } else {
      setFilteredRooms([])
    }
  }, [selectedCategory, data])
  
  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Add Reservation"
    >
      <form onSubmit={form.handleSubmit(handleSave)}>
      <FormProvider {...form}>
        {
          isLegendTypeSelected ? 
          <RentalReservationForm 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            data={data} 
            filteredRooms={filteredRooms} 
            handleSave={handleSave}
            handleRentalCancel={handleRentalCancel}
            setIsLegendTypeSelected={setIsLegendTypeSelected}
          /> : 
          <RentalSelectLegendTypeForm
            setSelectedLegendType={setSelectedLegendType}
            setIsLegendTypeSelected={setIsLegendTypeSelected}
            handleRentalCancel={handleRentalCancel}
          />
        }
      </FormProvider>
      </form>
    </ModalContainer>
  )
}

export default AddReservationModal
