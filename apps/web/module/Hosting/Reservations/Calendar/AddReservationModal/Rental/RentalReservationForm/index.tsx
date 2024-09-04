import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { useForm, useFormContext } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"
import {
  Category,
  Rental,
  SelectedReservation,
} from "../../../../types/CalendarTable"

interface IRentalReservationFormProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  data: any
  filteredRooms: Rental[]
  handleRentalCancel: () => void
  handleSave: (data: any) => void
  setIsLegendTypeSelected: (data: boolean) => void
}

function RentalReservationForm({
  selectedCategory,
  setSelectedCategory,
  data,
  filteredRooms,
  handleSave,
  handleRentalCancel,
  setIsLegendTypeSelected
}: IRentalReservationFormProps) {
  const { register } = useFormContext()
  return (
    <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Select
              label="Rental type"
              id="rentalType"
              required
              {...register("rentalType", {
                required: "This field is required",
              })}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <Option value="">Select</Option>
              {data &&
                data?.categories?.map((category: Category) => (
                  <Option key={category.name} value={category.name}>
                    {category.name}
                  </Option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Select
              label="Subcategory"
              id="room"
              required
              disabled={selectedCategory ? false : true}
              {...register("room", {
                required: "This field is required",
              })}
            >
              <Option value="">Select</Option>
              {filteredRooms.map((room: Rental) => (
                <Option key={room.abbr} value={room.abbr}>
                  {room.abbr}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full">
            <Input
              id="name"
              label="Guest Name"
              {...register("name", {
                required: "This field is required",
              })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              className="w-full"
              id="guest"
              type="number"
              label="Number of Guests"
              {...register("guest_count", {
                required: "This field is required",
              })}
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              type="date"
              id="guest"
              label="Check in Date"
              {...register("start_date", {
                required: "This field is required",
              })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="date"
              id="guest"
              label="Check out Date"
              {...register("end_date", {
                required: "This field is required",
              })}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
        <div>
          <Button type="button" variant="default" onClick={() => setIsLegendTypeSelected(false)}>
            Back
          </Button>
        </div>
        <div className="flex justify-end gap-2 w-full">
          <Button type="button" variant="danger" onClick={handleRentalCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RentalReservationForm