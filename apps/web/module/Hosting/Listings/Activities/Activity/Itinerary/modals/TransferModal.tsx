import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch, useState } from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Option, Select } from "@/common/components/ui/Select"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { TRANSFERS } from "../constants"
import toast from "react-hot-toast"
import { useSegmentsStore } from "../store/useSegmentsStore"
import { Input } from "@/common/components/ui/Input"

interface ISetUpProfileAboutYouModalProps {
  isModalOpen: boolean
  onClose: Dispatch<boolean>
}

const TransferModal = ({
  isModalOpen,
  onClose,
}: ISetUpProfileAboutYouModalProps) => {
  const updateSegments = useSegmentsStore((state) => state.updateSegments)
  const [transfer, setTransfer] = useState("")
  const [location, setLocation] = useState("")
  const [durationHour, setDurationHour] = useState(0)
  const [durationMinute, setDurationMinute] = useState(0)
  const [optional, setOptional] = useState("No")
  const [fee, setFee] = useState("No")

  const submitSegment = () => {
    if (!transfer) {
      toast.error("Select at least 1 activity")
    } else if (!durationHour && !durationMinute) {
      toast.error("Please add duration for this segment")
    } else {
      updateSegments({
        transfer,
        durationHour,
        durationMinute,
        optional: optional === "Yes",
        hasAdditionalFee: fee === "Yes",
      })
      toast.success("New transfer was added")
      onClose(false)
    }
  }

  return (
    <ModalContainer
      onClose={() => onClose(!isModalOpen)}
      isOpen={isModalOpen}
      size="sm"
      title="Itinerary Transfer"
    >
      <div className="pt-4 pb-10 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div>
          <Typography variant="h4" fontWeight="semibold" className="mb-4">
            What type of vehicle use for this transfer?
          </Typography>
          <div className="w-full">
            <Select
              label="Transfer"
              required
              className="col-span-1"
              onChange={(e) => setTransfer(e.target.value)}
            >
              <Option value={""}>Select Transfer</Option>
              {TRANSFERS.map((transfer) => (
                <Option key={transfer} value={transfer}>
                  {transfer}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-6">
          <Typography variant="h4" fontWeight="semibold" className="mb-4">
            How long does this transfer last?
          </Typography>
          <div className="flex gap-12">
            <div>
              <Typography variant="h5" className="mb-2">
                Hours
              </Typography>
              <div className="flex rounded-md">
                <button
                  className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    durationHour > 0 &&
                      setDurationHour((durationHour) => durationHour - 1)
                  }}
                >
                  <MinusIcon className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  id="type-count"
                  className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  value={durationHour}
                  min={0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    setDurationHour(val)
                  }}
                />
                <button
                  className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() =>
                    setDurationHour((durationHour) => durationHour + 1)
                  }
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div>
              <Typography variant="h5" className="mb-2">
                Minutes
              </Typography>
              <div className="flex rounded-md">
                <button
                  className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    durationMinute > 0 &&
                      setDurationMinute((durationMinute) => durationMinute - 1)
                  }}
                >
                  <MinusIcon className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  id="type-count"
                  className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  value={durationMinute}
                  min={0}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    setDurationMinute(val)
                  }}
                />
                <button
                  className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() =>
                    setDurationMinute((durationMinute) => durationMinute + 1)
                  }
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block font-medium text-text-900">
            Is this transfer optional?
          </label>
          <div className="flex items-center mt-2">
            <label
              htmlFor="segment-optional-no"
              className="mr-2 block text-sm font-medium leading-6 text-gray-900"
            >
              No
            </label>
            <input
              id="segment-optional-no"
              name="isSegmentOptional"
              type="radio"
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              onChange={(e) => setOptional(e.target.value)}
              defaultChecked
              value="No"
              required
            />
            <label
              htmlFor="segment-optional-yes"
              className="ml-4 mr-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Yes
            </label>
            <input
              id="segment-optional-yes"
              name="isSegmentOptional"
              onChange={(e) => setOptional(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              value="Yes"
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block font-medium text-text-900">
            Is this transfer require an additional fee?
          </label>
          <div className="flex items-center mt-2">
            <label
              htmlFor="segment-fee-no"
              className="mr-2 block text-sm font-medium leading-6 text-gray-900"
            >
              No
            </label>
            <input
              id="segment-fee-no"
              name="isSegmentHasFee"
              type="radio"
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              onChange={(e) => setFee(e.target.value)}
              defaultChecked
              value="No"
              required
            />
            <label
              htmlFor="segment-fee-yes"
              className="ml-4 mr-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Yes
            </label>
            <input
              id="segment-fee-yes"
              name="isSegmentHasFee"
              onChange={(e) => setFee(e.target.value)}
              type="radio"
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              value="Yes"
              required
            />
          </div>
        </div>
      </div>
      <ModalContainerFooter
        isPending={false}
        buttonFn={() => submitSegment()}
        positive="Save"
        negative="Cancel"
        onClose={() => onClose(!isModalOpen)}
      />
    </ModalContainer>
  )
}

export default TransferModal
