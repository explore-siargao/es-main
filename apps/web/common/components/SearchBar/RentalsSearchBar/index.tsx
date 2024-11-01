import React from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { format } from "date-fns"
import { E_Rental_Category } from "@repo/contract"
import { locations } from "../../Header/filter/modals/reducer/property-reducer"

function RentalsSearchBar() {
  const { register, watch } = useFormContext()
  const vehicleTypes = [
    "Any Vehicle",
    E_Rental_Category.Car,
    E_Rental_Category.Bicycle,
    E_Rental_Category.Motorbike,
  ]
  const dateToday = format(new Date(), "yyyy-MM-dd")
  return (
    <div className="flex gap-2 w-full justify-between rounded-full items-center pr-3 border bg-white border-gray-300 mb-4">
      <Select
        className="w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-4 rounded-full transition"
        label={"Location"}
        {...register("location")}
        id="testable"
      >
        <Option value="">Select Location</Option>
        {locations.map((loc) => (
          <Option key={loc.value} value={loc.value}>
            {loc.label}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Select
        className="w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Vehicle Type"}
        {...register("vehicleType")}
      >
        <Option value="">Select Vehicle Type</Option>
        {vehicleTypes.map((vehicleType) => (
          <Option key={vehicleType} value={vehicleType}>
            {vehicleType}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Pick-up Date"}
        {...register("pickUpDate")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Drop-off Date"}
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
