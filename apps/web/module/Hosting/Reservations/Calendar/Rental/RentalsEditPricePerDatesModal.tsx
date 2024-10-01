import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"
import { T_Rentals } from "@repo/contract"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useUpdateRentalPricePerDate from "../hooks/useUpdateRentalPricePerDate"
import { useQueryClient } from "@tanstack/react-query"

interface IEditPricePerDateProps {
  isModalOpen: boolean
  onClose: () => void
  selectedDate: string
  rentalId?: string
}

const RentalsEditPricePerDatesModal = ({
  isModalOpen,
  onClose,
  selectedDate,
  rentalId,
}: IEditPricePerDateProps) => {
  const queryClient = useQueryClient()
  const [toDate, setToDate] = useState("")
  const [dayRate, setDayRate] = useState("")
  const [fromDate, setFromDate] = useState(selectedDate || "")
  const [requiredDeposit, setRequiredDeposit] = useState("")
  const { handleSubmit } = useForm<T_Rentals>({})

  const { mutate, isPending } = useUpdateRentalPricePerDate(rentalId!)

  const clearInputs = () => {
    setToDate("")
    setDayRate("")
    setRequiredDeposit("")
  }

  const handleClose = () => {
    clearInputs()
    onClose()
  }

  const handleSave = () => {
    const payload = {
      fromDate: fromDate,
      toDate: toDate,
      dayRate: Number(dayRate),
    }
    mutate(payload, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-car"],
          })
          queryClient.invalidateQueries({
            queryKey: ["calendar-motor"],
          })
          queryClient.invalidateQueries({
            queryKey: ["calendar-bike"],
          })
          toast.success(data.message)
          onClose()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    })
    clearInputs()
  }

  const handleCancel = () => {
    handleClose()
  }

  useEffect(() => {
    setFromDate(selectedDate)
  }, [selectedDate])

  console.log("RentalId:", rentalId)
  return (
    <ModalContainer
      onClose={handleClose}
      isOpen={isModalOpen}
      size="sm"
      title="Edit Price Per Dates"
    >
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <Input2
                type="date"
                label={"From Date"}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                description="Enter the start date"
                placeholder="e.g., 2024-09-23"
                className="w-full"
                required
              />
            </div>

            <div className="flex-1">
              <Input2
                type="date"
                label={"To Date"}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                description="Enter the end date"
                placeholder="e.g., 2024-09-30"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-2 mt-4 mb-2">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Day Rate (24-hour)"}
                value={dayRate}
                onChange={(e) => setDayRate(e.target.value)}
                description="This rental price for a full 24-hour period, starting from the time of pick-up"
                placeholder="e.g., 1000"
                className="w-full"
                required
              />
            </div>
          </div>
          <div className="flex items-center pt-4 border-t border-gray-200">
            <div className="flex justify-end gap-2 w-full">
              <Button
                type="button"
                variant="danger"
                onClick={() => handleCancel()}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isPending}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default RentalsEditPricePerDatesModal
