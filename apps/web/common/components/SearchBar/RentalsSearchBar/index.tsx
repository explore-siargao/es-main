import React from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { format } from "date-fns"
import { locations, vehicleTypes } from "../../Header/filter/constants"

function RentalsSearchBar() {
  const { register, watch } = useFormContext()
  const dateToday = format(new Date(), "yyyy-MM-dd")
  return (
    <div className="flex gap-2 w-full justify-between rounded-full items-center pr-3 border bg-white border-gray-300 mb-4">
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
      <Select
        className="w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Vehicle type"}
        {...register("vehicleType")}
      >
        <Option value="">Select vehicle type</Option>
        {vehicleTypes.map((vehicleType) => (
          <Option key={vehicleType.value} value={vehicleType.value}>
            {vehicleType.label}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Pick-up date"}
        {...register("pickUpDate")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Drop-off date"}
        {...register("dropOffDate")}
        disabled={!watch("pickUpDate")}
        min={watch("pickUpDate")}
      />
      <Button
        variant={"primary"}
        className="h-full px-4 py-3 justify-center items-center rounded-full gap-x-2"
      >
        <Search className="text-white h-5 w-5" />
        Search
      </Button>
    </div>
  )
}

export default RentalsSearchBar
