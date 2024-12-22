import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import useCheckInOutDateStore from "@/module/Listing/property/stores/use-check-in-out-date-store"
import { Calendar } from "@/common/components/ui/Calendar"
import { format } from "date-fns"
import { useState } from "react"

interface CheckInOutModalProps {
  isOpen: boolean
  onClose: () => void
}

const ScheduleDateModal = ({ isOpen, onClose }: CheckInOutModalProps) => {
  const updateDateRange = useCheckInOutDateStore(
    (state) => state.updateDateRange
  )
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <ModalContainer size="auto" isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 pb-14 px-5">
        <Typography variant="h6" className="mb-4">
          {selectedDate != undefined
            ? format(selectedDate, "LLL dd, y")
            : "No Date selected"}{" "}
        </Typography>
        <div className="mt-6">
          <Calendar
            mode="single"
            defaultMonth={selectedDate}
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date)
              updateDateRange({ from: date, to: undefined })
            }}
            numberOfMonths={1}
            size="lg"
            disabled={{ before: new Date() }}
          />
        </div>
        <Button
          variant="ghost"
          className="underline md:float-right"
          size="sm"
          onClick={() => updateDateRange({ from: undefined, to: undefined })}
        >
          Clear dates
        </Button>
      </div>
    </ModalContainer>
  )
}
export default ScheduleDateModal
