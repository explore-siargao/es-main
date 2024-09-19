import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useFormContext } from "react-hook-form"
import PropertyReservationForm from "./PropertyReservationForm"
import SelectLegendTypeForm from "../SelectLegendForm"
import useAddPropertyReservation from "./hooks/useAddPropertyReservation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  setSelectedLegendType: (legend: string) => void
  selectedLegendType: string
  setIsLegendTypeSelected: (data: boolean) => void
  isLegendTypeSelected: boolean
}

const AddPropertyReservationModal = ({
  isModalOpen,
  onClose,
  setSelectedLegendType,
  selectedLegendType,
  setIsLegendTypeSelected,
  isLegendTypeSelected,
}: IReservationCalendarModalProps) => {
  const queryClient = useQueryClient()

  const { mutate } = useAddPropertyReservation()

  const handleSave = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-property"],
          })
          toast.success(data.message as string)
          onClose()
          form.reset()
        } else {
          toast.error(data.message as string)
        }
      },
    })
  }

  const form = useFormContext()

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
              handleRentalCancel={onClose}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              selectedLegendType={selectedLegendType}
            />
          ) : (
            <SelectLegendTypeForm
              selectedLegendType={selectedLegendType}
              setSelectedLegendType={setSelectedLegendType}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              handleRentalCancel={onClose}
            />
          )}
        </FormProvider>
      </form>
    </ModalContainer>
  )
}

export default AddPropertyReservationModal
