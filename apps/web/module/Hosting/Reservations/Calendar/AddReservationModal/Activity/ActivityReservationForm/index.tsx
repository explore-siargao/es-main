import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { useForm, useFormContext } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"
import useGetRentalNamesByCategory from "../../../hooks/useGetRentalNamesByCategory"
import { useState } from "react"
import useGetVehiclesByRentalId from "../../../hooks/useGetVehiclesByRentalId"
import { Textarea } from "@/common/components/ui/Textarea"

interface IActivityReservationFormProps {
  handleRentalCancel: () => void
  handleSave: (data: any) => void
  setIsLegendTypeSelected: (data: boolean) => void
  selectedLegendType: string
}

function ActivityReservationForm({
  handleSave,
  handleRentalCancel,
  setIsLegendTypeSelected,
  selectedLegendType,
}: IActivityReservationFormProps) {
  const { register, reset } = useFormContext()

  return (
    <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Select
              label="Activity"
              id="activity"
              required
              {...register("activity", {
                required: "This field is required",
              })}
            >
              <Option value="">Select</Option>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Select label="Slot" id="slot" required>
              <Option value="">Select</Option>
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
            <Input
              type="date"
              id="startDate"
              label="Start Date"
              {...register("start_date", {
                required: "This field is required",
              })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="date"
              id="endDate"
              label="End Date"
              {...register("end_date", {
                required: "This field is required",
              })}
              required
            />
          </div>
        </div>

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

export default ActivityReservationForm
