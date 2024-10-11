import { Button } from "@/common/components/ui/Button"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { addDays, parse } from "date-fns"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/common/helpers/cn"

const Move = ({
  className,
  filterCalendarDate,
  setStartDate,
  startDate,
  setFilterCalendarDate,
  queryKey,
}: {
  className?: string,
  filterCalendarDate: string
  setStartDate: (value: Date) => void
  startDate: Date
  setFilterCalendarDate: (value: string) => void
  queryKey: string
}) => {
  const queryClient = useQueryClient()

  const resetToToday = () => {
    if (filterCalendarDate !== "") {
      const parsedDate = parse(filterCalendarDate, "yyyy-MM-dd", new Date())
      setStartDate(addDays(parsedDate, -4))
    } else {
      setStartDate(addDays(new Date(), -4))
    }
  }

  const adjustStartDate = (direction: number) => {
    setStartDate(addDays(startDate, direction))
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    })
  }

  return (
    <div className={cn(`flex gap-2`, className)}>
      <Button
        variant={"outline"}
        onClick={() => adjustStartDate(-1)}
        className="py-2 px-4 rounded w-max rounded-l-full"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"outline"}
        className="py-2 px-4 rounded-none w-full"
        onClick={() => {
          setFilterCalendarDate?.("")
          resetToToday?.()
        }}
      >
        TODAY
      </Button>
      <Button
        variant={"outline"}
        onClick={() => adjustStartDate(1)}
        className="py-2 px-4 rounded w-max rounded-r-full"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default Move