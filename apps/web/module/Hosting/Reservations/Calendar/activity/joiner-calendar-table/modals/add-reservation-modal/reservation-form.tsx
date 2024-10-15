"use client"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { useFormContext } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"
import { useEffect, useState } from "react"
import { Textarea } from "@/common/components/ui/Textarea"
import useGetActivityByHost from "../../../hooks/use-get-activity-by-host"
import { usePathname } from "next/navigation"
import useGetPrivateActivitySlots from "../../../hooks/use-get-private-activity-slots"
import useGetJoinerActivitySlots from "../../../hooks/use-get-joiner-activity-slots"

interface IActivityReservationFormProps {
  handleRentalCancel: () => void
  handleSave: (data: any) => void
  setIsLegendTypeSelected: (data: boolean) => void
  selectedLegendType: string
}

function ReservationForm({
  handleSave,
  handleRentalCancel,
  setIsLegendTypeSelected,
  selectedLegendType,
}: IActivityReservationFormProps) {
  const pathName = usePathname()
  const lastSegment = pathName.split("/").filter(Boolean).pop()
  const { register, reset, setValue } = useFormContext()
  const [selectedActivityId, setSelectedActivityId] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlotId, setSelectedSlotId] = useState("")
  const { data: activities, isLoading: isActivitiesLoading } =
    useGetActivityByHost(lastSegment)

  // Only call the hook when both selectedActivityId and selectedDate are valid
  const { data: slots, refetch } = useGetJoinerActivitySlots(
    selectedActivityId && selectedDate ? selectedActivityId : null,
    selectedSlotId ? selectedSlotId : null,
    selectedDate ? selectedDate : null
  )

  useEffect(() => {
    if (selectedActivityId && selectedDate) {
      refetch() // Only refetch when both are selected
      if (slots && slots.item) {
        setValue("dayId", slots.message)
      }
    }
    if (selectedSlotId) {
      refetch()
    }
  }, [selectedActivityId, selectedDate, selectedSlotId])

  return (
    <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Select
              label="Activity"
              id="activityId"
              required
              disabled={isActivitiesLoading}
              {...register("activityId", {
                required: "This field is required",
              })}
              onChange={(e) => {
                setSelectedActivityId(e.target.value)
              }}
            >
              <Option value="">Select</Option>
              {activities?.items?.map((property: any) => (
                <Option key={property._id} value={property._id}>
                  {property.title}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input
              type="date"
              id="Date"
              label="Date"
              {...register("date", {
                required: "This field is required",
              })}
              required
              onChange={(e) => {
                setSelectedDate(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <Select
              label="Time Slots"
              id="slot"
              {...register("slotId", { required: "This field is required" })}
              required
              onChange={(e) => {
                setSelectedSlotId(e.target.value)
              }}
            >
              <Option value="">Select</Option>
              {slots && slots.item?.timeSlots
                ? slots.item?.timeSlots.map((property: any) => (
                    <Option key={property._id} value={property._id}>
                      {`${property.startTime} - ${property.endTime}`}
                    </Option>
                  ))
                : null}
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Select
              label="Slot"
              id="idsId"
              required
              disabled={isActivitiesLoading}
              {...register("idsId", {
                required: "This field is required",
              })}
            >
              <Option value="">Select</Option>
              {slots && slots.item?.slots
                ? slots.item.slots.map((property: any) => (
                    <Option key={property._id} value={property._id}>
                      {`${property.name}`}
                    </Option>
                  ))
                : null}
            </Select>
          </div>
        </div>

        {selectedLegendType !== "Out-of-Service-Dates" && (
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
                type="number"
                id="guestNumber"
                label="Guest Number"
                {...register("guestNumber", {
                  required: "This field is required",
                })}
                required
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Textarea
              id="notes"
              label="Notes"
              {...register("notes")}
              required={false}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
        <div>
          <Button
            type="button"
            variant="default"
            onClick={() => setIsLegendTypeSelected(false)}
          >
            Back
          </Button>
        </div>
        <div className="flex justify-end gap-2 w-full">
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              handleRentalCancel()
              reset()
            }}
          >
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

export default ReservationForm
