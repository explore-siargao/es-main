import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"
import { useForm } from "react-hook-form"
import { T_Activity } from "@repo/contract"

interface IEditPricePerDateProps {
  isModalOpen: boolean
  onClose: () => void
  selectedDate: string
  activityId: string | undefined
}

const ActivityEditPricePerDatesModal = ({
  isModalOpen,
  onClose,
  selectedDate,
  activityId,
}: IEditPricePerDateProps) => {
  const [toDate, setToDate] = useState("")
  const [basePrice, setBasePrice] = useState("")
  const [dateFrom, setDateFrom] = useState(selectedDate || "")
  const [exceededPersonPrice, setExceededPersonPrice] = useState("")
  const { handleSubmit } = useForm<T_Activity>({})
  const clearInputs = () => {
    setToDate("")
    setBasePrice("")
    setExceededPersonPrice("")
  }

  const handleClose = () => {
    clearInputs()
    onClose()
  }

  const handleSave = () => {
    const payload = {
      fromDate: dateFrom,
      toDate: toDate,
      basePrice: Number(basePrice),
      exceededPersonPrice: Number(exceededPersonPrice),
    }
    console.log(payload)
    clearInputs()
  }

  const handleCancel = () => {
    handleClose()
  }

  useEffect(() => {
    setDateFrom(selectedDate)
  }, [selectedDate])

  console.log(activityId)
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
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
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
                placeholder="e.g., 2024-09-30"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-2 mt-4">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Base Price"}
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                description="Enter the base price for each day within the specified date range"
                placeholder="e.g., 1000"
                className="w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-4 mt-2">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Exceed Person Price"}
                value={exceededPersonPrice}
                onChange={(e) => setExceededPersonPrice(e.target.value)}
                description=" Enter the price that will be charged for each person exceeding the default limit within the selected date range"
                placeholder="e.g., 1000"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex items-center pt-4 border-t border-gray-200">
            <div className="flex justify-end gap-2 w-full">
              <Button type="button" variant="danger" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default ActivityEditPricePerDatesModal
