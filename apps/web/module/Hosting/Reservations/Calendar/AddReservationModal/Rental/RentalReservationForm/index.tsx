import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { useForm, useFormContext } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"
import {
  Category,
  Rental,
  SelectedReservation,
} from "../../../../types/CalendarTable"
import useGetRentalNamesByCategory from "../../../hooks/useGetRentalNamesByCategory"
import { useState } from "react"
import useGetVehiclesByRentalId from "../../../hooks/useGetVehiclesByRentalId"
import { Textarea } from "@/common/components/ui/Textarea"

interface IRentalReservationFormProps {
  handleRentalCancel: () => void
  handleSave: (data: any) => void
  setIsLegendTypeSelected: (data: boolean) => void
  selectedLegendType: string
}

const rentalTypes = ["Car", "Motorbike", "Bicycle"]

function RentalReservationForm({
  handleSave,
  handleRentalCancel,
  setIsLegendTypeSelected,
  selectedLegendType,
}: IRentalReservationFormProps) {
  const [selectedRentalType, setSelectedRentalType] = useState("")
  const [selectedRentalId, setSelectedRentalId] = useState("")
  const { register, reset } = useFormContext()
  const {
    data: rentalNamesByCategory,
    isLoading: isRentalNamesByCategoryLoading,
  } = useGetRentalNamesByCategory(selectedRentalType)
  const { data: vehiclesByRentalId, isLoading: isVehiclesByRentalIdLoading } =
    useGetVehiclesByRentalId(selectedRentalId)

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
              onChange={(e) => setSelectedRentalType(e.target.value)}
            >
              <Option value="">Select</Option>
              {rentalTypes.map((type: string) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Select
              label="Vehicle"
              id="vehicle"
              required
              disabled={
                selectedRentalType
                  ? false
                  : true ||
                    isRentalNamesByCategoryLoading ||
                    rentalNamesByCategory?.items?.length! === 0
              }
              {...register("rentalId", {
                required: "This field is required",
              })}
              onChange={(e) => setSelectedRentalId(e.target.value)}
            >
              <Option value="">Select</Option>
              {rentalNamesByCategory &&
                rentalNamesByCategory?.items?.map((vehicle: any) => (
                  <Option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-4 border-b border-gray-200 md:pb-4">
          <div className="flex flex-col w-full">
            <Select
              label="Available Units"
              id="unit"
              required
              disabled={
                selectedRentalId
                  ? false
                  : true ||
                    isVehiclesByRentalIdLoading ||
                    vehiclesByRentalId?.items?.length! === 0
              }
              {...register("qtyIdsId", {
                required: "This field is required",
              })}
            >
              <Option value="">Select</Option>
              {vehiclesByRentalId &&
                vehiclesByRentalId?.items?.map((vehicle: any) => (
                  <Option key={vehicle._id} value={vehicle._id}>
                    {vehicle.name}
                  </Option>
                ))}
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
              label="Notes(Optional)"
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

export default RentalReservationForm
