import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { addDays, parse } from "date-fns"
import { Typography } from "@/common/components/ui/Typography"

interface FilterDateModalProps {
  isModalOpen: boolean
  onClose: () => void
  setFilterCalendarDate: (filter: string) => void
  setStartDate: (filter: Date) => void
}

const FilterDateModal = ({
  isModalOpen,
  onClose,
  setFilterCalendarDate,
  setStartDate,
}: FilterDateModalProps) => {
  const [selectedDate, setSelectedDate] = useState("")
  const handleConfirm = () => {
    setFilterCalendarDate(selectedDate)
    const parsedDate = parse(selectedDate, "yyyy-MM-dd", new Date())
    setStartDate(addDays(parsedDate, -4))
    onClose()
    setTimeout(() => {
      setSelectedDate("")
    }, 300)
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
              <Typography>Jump to specific date</Typography>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                label={"Select date"}
                className="mt-2"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="flex justify-end gap-2 w-full">
            <Button type="button" variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => setSelectedDate("")}
            >
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

export default FilterDateModal
