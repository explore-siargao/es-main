import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { useForm } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"
import { Category, Room, SelectedReservation } from "../../types/CalendarTable"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  onSave: (reservation: SelectedReservation, reset: Function) => void
  data: any
}

const AddReservationModal = ({
  isModalOpen,
  onClose,
  onSave,
  data,
}: IReservationCalendarModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])

  const handleSave = (data: any) => {
    const resetform = () => {
      reset()
      setSelectedCategory("")
    }
    onSave(data, resetform)
  }

  const { register, reset, handleSubmit } = useForm()

  useEffect(() => {
    if (data && selectedCategory) {
      const category = data.categories.find(
        (category: Category) => category.name === selectedCategory
      )
      setFilteredRooms(category ? category.rooms : [])
    } else {
      setFilteredRooms([])
    }
  }, [selectedCategory, data])

  useEffect(() => {
    if (data && selectedCategory) {
      const category = data.categories.find((category: Category) => category.name === selectedCategory);
      setFilteredRooms(category ? category.rooms : []);
    } else {
      setFilteredRooms([])
    }
  }, [selectedCategory, data])

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Add Reservation"
    >
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-4">
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <Select
                  label="Category"
                  id="category"
                  required
                  {...register("category", {
                    required: "This field is required",
                  })}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <Option value="">Select</Option>
                  {data &&
                    data.categories.map((category: Category) => (
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
                  {filteredRooms.map((room: Room) => (
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
            <div className="flex justify-end gap-2 w-full">
              <Button variant="danger" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default AddReservationModal
