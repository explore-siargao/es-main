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
import useGetPropertyByHost from "@/module/Hosting/Listings/Properties/hooks/useGetPropertyByHost"
import { T_Property } from "@repo/contract"
import useGetPropertyById from "@/module/Admin/Listings/hooks/useGetPropertyById"
import useGetUnitById from "../hooks/useGetUnitById"

interface IPropertyReservationFormProps {
  handleRentalCancel: () => void
  handleSave: (data: any) => void
  setIsLegendTypeSelected: (data: boolean) => void
  selectedLegendType: string
}

function PropertyReservationForm({
  handleSave,
  handleRentalCancel,
  setIsLegendTypeSelected,
  selectedLegendType,
}: IPropertyReservationFormProps) {
  const [selectedUnitId, setSelectedUnitId] = useState("")
  const [selectedPropertyId, setSelectedPropertyId] = useState("")
  const { register, reset } = useFormContext()
  const { data: properties, isLoading: isPropertiesLoading } =
    useGetPropertyByHost()
  const { data: propertyUnits, isLoading: isPropertyUnitsLoading } =
    useGetPropertyById(selectedPropertyId)
  const { data: units, isLoading: isUnitsLoading } =
    useGetUnitById(selectedUnitId)

  return (
    <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Select
              label="Property"
              id="property"
              required
              disabled={isPropertiesLoading}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
            >
              <Option value="">Select</Option>
              {properties?.items?.map((property: any) => (
                <Option key={property._id} value={property._id}>
                  {property.title}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <Select
              label="Units"
              id="units"
              required
              disabled={
                !selectedPropertyId ||
                propertyUnits?.item?.bookableUnits.length === 0 ||
                isPropertyUnitsLoading
              }
              onChange={(e) => setSelectedUnitId(e.target.value)}
            >
              <Option value="">Select</Option>
              {propertyUnits &&
                propertyUnits?.item?.bookableUnits?.map((unit: any) => (
                  <Option key={unit._id} value={unit._id}>
                    {unit.title}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-4 border-b border-gray-200 md:pb-4">
          <div className="flex flex-col w-full">
            <Select
              label="Available Units"
              id="unitId"
              required
              disabled={
                units?.items?.length === 0 || !selectedUnitId || isUnitsLoading
              }
              {...register("unitId", {
                required: "This field is required",
              })}
            >
              <Option value="">Select</Option>
              {units &&
                units?.items?.map((unit: any) => (
                  <Option key={unit._id} value={unit._id}>
                    {unit.name}
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
              {...register("startDate", {
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
              {...register("endDate", {
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

export default PropertyReservationForm
