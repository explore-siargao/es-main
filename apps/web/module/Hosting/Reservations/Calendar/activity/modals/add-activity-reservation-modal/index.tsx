import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useForm } from "react-hook-form"
import ReservationForm from "../../modals/add-activity-reservation-modal/reservation-form"
import useAddActivityReservation from "../../hooks/use-add-activity-reservation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import SelectStatusForm from "./select-status-form"

interface AddActivityReservationModalProps {
  isModalOpen: boolean
  onClose: () => void
}

const AddActivityReservationModal = ({
  isModalOpen,
  onClose,
}: AddActivityReservationModalProps) => {
  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] =
    useState<boolean>(false)

  const handleRentalCancel = () => {
    onClose()

    setTimeout(() => {
      form.setValue("status", "")
      setSelectedLegendType("")
      setIsLegendTypeSelected(false)
    }, 200)
  }
  const { mutate } = useAddActivityReservation()
  const queryClient = useQueryClient()
  const handleSave = (data: any) => {
    mutate(data, {
      onSuccess: (data) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-activity"],
          })
          toast.success(data.message as string)
          setIsLegendTypeSelected(false)
          onClose()
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
            <ReservationForm
              handleSave={handleSave}
              handleRentalCancel={handleRentalCancel}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              selectedLegendType={selectedLegendType}
            />
          ) : (
            <SelectStatusForm
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

export default AddActivityReservationModal