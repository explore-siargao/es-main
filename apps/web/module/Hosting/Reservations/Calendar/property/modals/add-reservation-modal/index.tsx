import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useForm } from "react-hook-form"
import useAddPropertyReservation from "./hooks/use-add-property-reservation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useCalendarStore } from "../../stores/use-calendar-store"
import ReservationForm from "./reservation-form"
import SelectStatusForm from "./select-status-form"

const AddReservationModal = () => {
  const queryClient = useQueryClient()
  const {
    selectedLegendType,
    isLegendTypeSelected,
    isAddReservationModalOpen,
    setSelectedLegendType,
    setIsLegendTypeSelected,
    setIsAddReservationModalOpen,
  } = useCalendarStore((state) => state)

  const { mutate } = useAddPropertyReservation()

  const form = useForm()

  const closeAddReservationModal = () => {
    setIsAddReservationModalOpen(false)
    setTimeout(() => {
      form.setValue("status", "")
      setSelectedLegendType("")
      setIsLegendTypeSelected(false)
      form.reset()
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
          closeAddReservationModal()
          form.reset()
        } else {
          toast.error(data.message as string)
        }
      },
    })
  }

  return (
    <ModalContainer
      onClose={closeAddReservationModal}
      isOpen={isAddReservationModalOpen}
      size="sm"
      title="Add Reservation"
    >
      <form onSubmit={form.handleSubmit(handleSave)}>
        <FormProvider {...form}>
          {isLegendTypeSelected ? (
            <ReservationForm
              handleSave={handleSave}
              handleRentalCancel={closeAddReservationModal}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              selectedLegendType={selectedLegendType}
            />
          ) : (
            <SelectStatusForm
              selectedLegendType={selectedLegendType}
              setSelectedLegendType={setSelectedLegendType}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              handleRentalCancel={closeAddReservationModal}
            />
          )}
        </FormProvider>
      </form>
    </ModalContainer>
  )
}

export default AddReservationModal
