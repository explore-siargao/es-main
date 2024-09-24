import { useEffect, useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"
import { T_Property } from "@repo/contract"
import { useForm } from "react-hook-form"

interface IEditPricePerDateProps {
  isModalOpen: boolean
  onClose: () => void
  selectedDate: string
  unitId?: string
}

const PropertyEditPricePerDatesModal = ({
  isModalOpen,
  onClose,
  selectedDate,
  unitId,
}: IEditPricePerDateProps) => {
  const [toDate, setToDate] = useState("")
  const [baseRate, setBaseRate] = useState("")
  const [dateFrom, setDateFrom] = useState(selectedDate || "")
  const [baseRateMaxCapacity, setBaseRateMaxCapacity] = useState("")
  const [maxCapacity, setMaxCapacity] = useState("")
  const [pricePerAdditionalPerson, setPricePerAdditionalperson] = useState("")
  const { handleSubmit } = useForm<T_Property>({})

  const clearInputs = () => {
    setToDate("")
    setBaseRate("")
    setBaseRateMaxCapacity("")
    setMaxCapacity("")
    setPricePerAdditionalperson("")
  }

  const handleClose = () => {
    clearInputs()
    onClose()
  }

  const handleSave = () => {
    const payload = {
      dateFrom: dateFrom,
      toDate: toDate,
      baseRate: Number(baseRate),
      baseRateMaxCapacity: Number(baseRateMaxCapacity),
      maxCapacity: Number(maxCapacity),
      pricePerAdditionalPerson: Number(pricePerAdditionalPerson),
    }
    console.log(payload)
    clearInputs()
  }

  const handleCancel = () => {
    handleClose()
  }

  useEffect(() => {
    setDateFrom(selectedDate)
  }, [selectedDate])

  console.log("unitId: ", unitId)
  return (
    <ModalContainer
      onClose={handleClose}
      isOpen={isModalOpen}
      size="sm"
      title="Edit Price Per Dates"
    >
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <Input2
                type="date"
                label={"From Date"}
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                description="Enter the start date"
                placeholder="e.g., 2024-09-23"
                className="w-full"
                required
              />
            </div>

            <div className="flex-1">
              <Input2
                type="date"
                label={"To Date"}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                description="Enter the end date"
                placeholder="e.g., 2024-09-30"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-2 mt-4">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Base Rate"}
                value={baseRate}
                onChange={(e) => setBaseRate(e.target.value)}
                description="Enter the base price for a single day within the selected date range"
                placeholder="e.g., 10000"
                className="w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-2 mt-2">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Base Rate Maximum Capacity"}
                value={baseRateMaxCapacity}
                onChange={(e) => setBaseRateMaxCapacity(e.target.value)}
                description="The base price for the maximum capacity. The total number of people or items included"
                placeholder="e.g., 20000"
                className="w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-2 mt-2">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Maximum Capacity"}
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                description="The maximum number of people or items allowed"
                placeholder="e.g., 20"
                className="w-full"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-4 mt-2">
            <div className="flex flex-col w-full">
              <Input2
                type="number"
                label={"Price Per Additional Person"}
                value={pricePerAdditionalPerson}
                onChange={(e) => setPricePerAdditionalperson(e.target.value)}
                description="The extra cost per additional person beyond the base rate"
                placeholder="e.g., 5000"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex items-center pt-4 border-t border-gray-200">
            <div className="flex justify-end gap-2 w-full">
              <Button
                type="button"
                variant="danger"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default PropertyEditPricePerDatesModal
