import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useForm } from "react-hook-form"
import PropertyReservationForm from "./PropertyReservationForm"
import SelectLegendTypeForm from "../SelectLegendForm"
import useAddPropertyReservation from "./hooks/useAddPropertyReservation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
}

const AddPropertyReservationModal = ({
  isModalOpen,
  onClose,
}: IReservationCalendarModalProps) => {
  const queryClient = useQueryClient()
  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] =
    useState<boolean>(false)

  const { mutate } = useAddPropertyReservation()

  const handleRentalCancel = () => {
    onClose()

    setTimeout(() => {
      form.setValue("status", "")
      setSelectedLegendType("")
      setIsLegendTypeSelected(false)
    }, 200)
  }

  const handleSave = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-property"],
          })
          toast.success(data.message as string)
          handleRentalCancel()
          form.reset()
        } else {
          toast.error(data.message as string)
        }
      },
    })
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
            <PropertyReservationForm
              handleSave={handleSave}
              handleRentalCancel={handleRentalCancel}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              selectedLegendType={selectedLegendType}
            />
          ) : (
            <SelectLegendTypeForm
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

export default AddPropertyReservationModal
