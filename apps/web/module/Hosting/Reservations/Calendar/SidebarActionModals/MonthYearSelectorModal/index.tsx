import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"

interface IMonthYearSelectorModalProps {
  isModalOpen: boolean
  onClose: () => void
  filterMonthYear?: string
  setFilterMonthYear?: (filter: string) => void
}

const MonthYearSelectorModal = ({
  isModalOpen,
  onClose,
  filterMonthYear,
  setFilterMonthYear
}: IMonthYearSelectorModalProps) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("")

  const handleConfirm = () => {
    setFilterMonthYear && setFilterMonthYear(selectedMonthYear)
    onClose()
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Filter calendar"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Input
                type="month"
                value={selectedMonthYear}
                onChange={(e) => setSelectedMonthYear(e.target.value)} // Handle selected month/year
                label={"Select month and year"}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="flex justify-end gap-2 w-full">
            <Button type="button" variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="default" onClick={() => setSelectedMonthYear("")}>
              Clear
            </Button>
            <Button type="button" variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default MonthYearSelectorModal
