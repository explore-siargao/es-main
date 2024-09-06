import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useForm } from "react-hook-form"
import RentalReservationForm from "./RentalReservationForm"
import RentalSelectLegendTypeForm from "./RentalSelectLegendForm"
import useAddRentalReservation from "../../hooks/useAddRentalReservation"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  data: any
}

const AddRentalReservationModal = ({
  isModalOpen,
  onClose,
  data,
}: IReservationCalendarModalProps) => {
  const queryClient = useQueryClient()
  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] =
    useState<boolean>(false)

  const { mutate } = useAddRentalReservation()

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
            queryKey: ["calendar-car"],
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
