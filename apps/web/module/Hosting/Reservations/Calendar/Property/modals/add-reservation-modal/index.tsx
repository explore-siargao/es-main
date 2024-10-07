import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useForm } from "react-hook-form"
import SelectLegendTypeForm from "../../../components/SelectLegendForm"
import useAddPropertyReservation from "./hooks/use-add-property-reservation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useCalendarStore } from "../../stores/use-calendar-store"
import PropertyReservationForm from "./property-reservation-form"

const AddReservationModal = () => {
  const queryClient = useQueryClient()
  const {
    selectedLegendType,
    isLegendTypeSelected,
    isAddReservationModalOpen,
    filteredData,
    setSelectedLegendType,
    setIsLegendTypeSelected,
    setIsAddReservationModalOpen,
    setFilteredData,
  } = useCalendarStore(state => state);

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

  const handleSaveNewReservation = (newReservation: any, reset: Function) => {
    const updatedData = { ...filteredData }
    const category = updatedData?.items?.filter(
      (category) => category.name === newReservation.category
    )
    if (category && category?.length > 0) {
      const selectedCategory = category[0]
      if (selectedCategory) {
        const bed = selectedCategory?.beds?.find(
          (rm) => rm.name === newReservation.bed
        )
        if (bed) {
          bed.reservations.push(newReservation)
          setFilteredData(updatedData)
          toast.success("Reservation added successfully")
          reset()
        } else {
          toast.error("Room not found")
        }
      }
    }
    closeAddReservationModal()
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
            <PropertyReservationForm
              handleSave={handleSave}
              handleRentalCancel={closeAddReservationModal}
              setIsLegendTypeSelected={setIsLegendTypeSelected}
              selectedLegendType={selectedLegendType}
            />
          ) : (
            <SelectLegendTypeForm
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
