import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"
import { T_Property } from "@repo/contract"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useCalendarStore } from "../stores/use-calendar-store"
import useUpdateUnitPricePerDate from "../hooks/use-update-unit-price-per-date"
import { QK_CALENDAR_PROPERTIES } from "../constants"

const EditPricePerDatesModal = () => {
  const {
    selectedDate,
    selectedUnitId,
    isEditPricePerDatesModalOpen,
    setIsEditPricePerDatesModalOpen,
  } = useCalendarStore((state) => state)
  const [toDate, setToDate] = useState("")
  const [baseRate, setBaseRate] = useState("")
  const [dateFrom, setDateFrom] = useState(selectedDate || "")
  const queryClient = useQueryClient()
  const { handleSubmit } = useForm<T_Property>({})
  const { mutate, isPending } = useUpdateUnitPricePerDate(
    selectedUnitId as string
  )

  const clearInputs = () => {
    setToDate("")
    setBaseRate("")
  }

  const handleClose = () => {
    clearInputs()
    setIsEditPricePerDatesModalOpen(false)
  }

  const handleSave = () => {
    const payload = {
      fromDate: dateFrom,
      toDate: toDate,
      baseRate: Number(baseRate),
    }
    mutate(payload, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [QK_CALENDAR_PROPERTIES],
          })
          toast.success(data.message)
          setIsEditPricePerDatesModalOpen(false)
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
    setDateFrom(selectedDate)
  }, [selectedDate])

  return (
    <ModalContainer
      onClose={handleClose}
      isOpen={isEditPricePerDatesModalOpen}
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
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
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
                label={"Base Rate"}
                value={baseRate}
                onChange={(e) => setBaseRate(e.target.value)}
                description="Enter the base price for a single day within the selected date range"
                placeholder="e.g., 10000"
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

export default EditPricePerDatesModal
