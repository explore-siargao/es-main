import React, { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { format } from "date-fns"
import { Option, Select } from "@/common/components/ui/Select"
import { locations } from "../../Header/filter/constants"
import { useSearchParams } from "next/navigation"
import { Spinner } from "../../ui/Spinner"

function ActivitiesSearchBar() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useFormContext()
  const dateToday = format(new Date(), "yyyy-MM-dd")
  useEffect(() => {
    if (isLoading) setIsLoading(false)
  }, [searchParams])
  return (
    <div className="flex gap-2 w-full justify-between items-center rounded-full pr-3 border bg-white border-gray-300 mb-4">
      <Select
        className="w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-4 rounded-full transition"
        label={"Location"}
        {...register("location")}
        id="testable"
      >
        <Option value="">Select location</Option>
        {locations.map((loc) => (
          <Option key={loc.value} value={loc.value}>
            {loc.label}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-[12rem] 4xl:w-[18rem] ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Date"}
        {...register("activityDate")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8 mx-5" />
      <Input
        type="number"
        className="w-[23rem] 4xl:w-[28rem] ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Number of guest/s"}
        placeholder="Add guests"
        {...register("numberOfGuest")}
      />
      <Button
        variant={"primary"}
        className="h-full px-4 py-3 justify-center items-center rounded-full gap-x-2"
        onClick={() => setIsLoading(true)}
      >
        {!isLoading ? (
          <Search className="text-white h-5 w-5" />
        ) : (
          <Spinner variant="primary" size="xs" />
        )}
        {!isLoading ? "Search" : "Searching"}
      </Button>
    </div>
  )
}

export default ActivitiesSearchBar
