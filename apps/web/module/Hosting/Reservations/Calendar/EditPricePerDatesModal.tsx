import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"

interface IEditPricePerDateProps {
  isModalOpen: boolean
  onClose: () => void
}

const EditPricePerDatesModal = ({
  isModalOpen,
  onClose,
}: IEditPricePerDateProps) => {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [price, setPrice] = useState("")

  const handleSave = () => {
    onClose()
    setTimeout(() => {}, 300)
  }
  const handleCancel = () => {
    onClose()
    setFromDate("")
    setToDate("")
    setPrice("")
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Edit Price Per Dates"
    >
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

        <div className="flex flex-col gap-4 pb-4 mt-4">
          <div className="flex flex-col w-full">
            <Input2
              type="number"
              label={"Price"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              description="Enter the price per day for the selected dates"
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
            <Button
              type="button"
              variant="primary"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default EditPricePerDatesModal
