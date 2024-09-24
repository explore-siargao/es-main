import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"
import { T_Rentals } from "@repo/contract"
import { useForm } from "react-hook-form"

interface IEditPricePerDateProps {
  isModalOpen: boolean
  onClose: () => void
  selectedDate: string
  id?: string
}

const RentalsEditPricePerDatesModal = ({
  isModalOpen,
  onClose,
  selectedDate,
  id
}: IEditPricePerDateProps) => {
  const [toDate, setToDate] = useState("")
  const [dayRate, setDayRate] = useState("")
  const [dateFrom, setDateFrom] = useState(selectedDate || "")
  const [requiredDeposit, setRequiredDeposit] = useState("")
  const { handleSubmit } = useForm<T_Rentals>({})

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
      dateFrom: dateFrom,
      toDate: toDate,
      dayRate: Number(dayRate),
      requiredDeposit: Number(requiredDeposit)
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

  console.log(id)
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

          <div className="flex flex-col gap-4 pb-2 mt-4">
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
          <div className="flex flex-col gap-4 pb-4 mt-2">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Required Deposit"}
                value={requiredDeposit}
                onChange={(e) => setRequiredDeposit(e.target.value)}
                description="This upfront payment needed to secure the rental"
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
              >
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

export default RentalsEditPricePerDatesModal
