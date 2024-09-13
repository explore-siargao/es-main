import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useFormContext } from "react-hook-form"
import RentalReservationForm from "./RentalReservationForm"
import useAddRentalReservation from "../../hooks/useAddRentalReservation"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import SelectLegendTypeForm from "../SelectLegendForm"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  setSelectedLegendType: (legend: string) => void
  selectedLegendType: string
  setIsLegendTypeSelected: (data: boolean) => void
  isLegendTypeSelected: boolean
}

const AddRentalReservationModal = ({
  isModalOpen,
  onClose,
  setSelectedLegendType,
  selectedLegendType,
  setIsLegendTypeSelected,
  isLegendTypeSelected,
}: IReservationCalendarModalProps) => {
  const queryClient = useQueryClient()

  const { mutate } = useAddRentalReservation()

  const handleSave = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-car"],
          })
          toast.success(data.message as string)
          onClose()
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
            <RentalReservationForm
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

export default AddRentalReservationModal
