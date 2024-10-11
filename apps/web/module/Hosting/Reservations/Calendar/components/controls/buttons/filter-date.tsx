import React from "react"
import { Button } from "@/common/components/ui/Button"
import { LucideCalendar, LucideX } from "lucide-react"
import { addDays } from "date-fns"

const FilterDate = ({
  setIsModalOpen,
  filterCalendarDate,
  setFilterCalendarDate,
  setStartDate,
}: {
  setIsModalOpen: (value: boolean) => void
  filterCalendarDate: string
  setFilterCalendarDate: (value: string) => void
  setStartDate: (value: Date) => void
}) => {
  return (
    <>
      {!filterCalendarDate ? (
        <Button
          size={"sm"}
          variant={"default"}
          className="rounded-full w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <LucideCalendar className="w-5" />
        </Button>
      ) : (
        <Button
          size={"sm"}
          variant={"default"}
          className="rounded-full w-full"
          onClick={() => {
            setFilterCalendarDate && setFilterCalendarDate("")
            setStartDate(addDays(new Date(), -4))
          }}
        >
          <LucideX className="w-5" />
        </Button>
      )}
    </>
  )
}

export default FilterDate
