import ModalContainer from "@/common/components/ModalContainer"
import { DateRange } from "react-day-picker"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"
import useCheckInOutDateStore from "@/module/Listing/property/stores/use-check-in-out-date-store"
import { Calendar } from "@/common/components/ui/Calendar"
import { differenceInDays, format } from "date-fns"

interface CheckInOutModalProps {
  isOpen: boolean
  onClose: () => void
}

const CheckInOutModal = ({ isOpen, onClose }: CheckInOutModalProps) => {
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const updateDateRange = useCheckInOutDateStore(
    (state) => state.updateDateRange
  )
  const nights = differenceInDays(
    dateRange.to ?? new Date(),
    dateRange.from ?? new Date()
  )
  return (
    <ModalContainer size="auto" isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 pb-14 px-5">
        <Typography variant="h2" fontWeight="semibold" className="mb-1">
          {nights} night{nights > 1 && `s`}
        </Typography>
        <Typography variant="h5" className="mb-4">
          {dateRange?.from != undefined
            ? format(dateRange.from, "LLL dd, y")
            : "Date from"}{" "}
          -{" "}
          {dateRange?.to != undefined
            ? format(dateRange.to, "LLL dd, y")
            : "Date to"}
        </Typography>
        <div className="mt-6">
          <Calendar
            mode="range"
            numberOfMonths={2}
            required 
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(data) => updateDateRange(data as DateRange)}
            size="lg"
            disabled={{ before: new Date() }}
            classNames={{
              today: "text-primary-500 bg-primary-100",
              selected: "bg-primary-200 text-text-500",
              range_start: "bg-primary-500 rounded-l-lg text-white",
              range_middle: "bg-primary-200",
              range_end: "bg-primary-500 rounded-r-lg text-white",
              nav_button_next: "text-primary-500",
            }}
            style={{
              fontFamily: "'Nunito', sans-serif;",
            }}
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
export default CheckInOutModal
