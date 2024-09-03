import React from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"

function RentalsSearchBar() {
  const { register } = useFormContext()
  const categories = ["Car", "Motorbike", "Bicycle"]
  return (
    <div className="flex gap-2 w-full justify-between rounded-xl items-center py-2 pl-2 pr-[19px] border bg-white border-gray-300 mb-4">
      <Select
        className="w-64 ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Category"}
        {...register("search")}
      >
        <Option value="">Select Category</Option>
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Pickup Date"}
        {...register("date")}
      />

      <Input
        type="date"
        className="w-full ring-0 bg-inherit focus-within:ring-0 hover:bg-gray-200"
        label={"Pickup Drop Date"}
        {...register("date")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />

      {/* <div className="h-full p-4 bg-primary-500 justify-center items-center rounded-full">
        <Search className="text-white" />
      </div> */}
      <Button
        variant={"primary"}
        className="h-full px-4 py-3 justify-center items-center rounded-xl gap-x-2"
      >
        <Search className="text-white h-5 w-5" />
        Search
      </Button>
    </div>
  )
}

export default RentalsSearchBar
