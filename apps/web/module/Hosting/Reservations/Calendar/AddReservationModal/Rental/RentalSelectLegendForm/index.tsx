import { Button } from "@/common/components/ui/Button"
import { useFormContext } from "react-hook-form"
import { Option, Select } from "@/common/components/ui/Select"

interface IRentalReservationFormProps {
  selectedLegendType: string
  setSelectedLegendType: (data: string) => void
  setIsLegendTypeSelected: (data: boolean) => void
  handleRentalCancel: () => void
}

function RentalSelectLegendTypeForm({
  selectedLegendType,
  setSelectedLegendType,
  setIsLegendTypeSelected,
  handleRentalCancel
}: IRentalReservationFormProps) {
  const { register } = useFormContext()

  const handleConfirm = () => {
    setIsLegendTypeSelected(true)
  }

  const statusEnum = [
    "Confirmed",
    "Not-Confirmed",
    "Cancelled",
    "Checked-In",
    "Checked-Out",
    "No-Show",
    "Blocked-Dates",
    "Out-of-Service",
  ]
  
  return (
    <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Select
              label="Status"
              id="status"
              required
              {...register("status", {
                required: "This field is required",
              })}
              onChange={(e) => setSelectedLegendType(e.target.value)}
            >
              <Option value="">Select</Option>
              {statusEnum.map((status: string) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
        <div className="flex justify-end gap-2 w-full">
          <Button type="button" variant="danger" onClick={handleRentalCancel}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleConfirm} disabled={selectedLegendType === ""}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RentalSelectLegendTypeForm