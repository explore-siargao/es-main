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
    <div className="flex gap-2 w-full justify-center rounded-full items-center p-2 border bg-white border-gray-300 mb-4">
      <Input
        type="date"
        className="w-full rounded-l-full ring-0 bg-inherit focus-within:ring-0"
        label={"Date"}
        {...register("date")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Select
        className="w-64 rounded-l-full ring-0 bg-inherit focus-within:ring-0"
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
      {/* <div className="h-full p-4 bg-primary-500 justify-center items-center rounded-full">
        <Search className="text-white" />
      </div> */}
      <Button
        variant={"primary"}
        className="h-full p-4 justify-center items-center rounded-full"
      >
        <Search className="text-white" />
      </Button>
    </div>
  )
}

export default RentalsSearchBar
