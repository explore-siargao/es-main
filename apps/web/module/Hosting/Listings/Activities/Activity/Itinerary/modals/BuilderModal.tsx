import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch, useState } from "react"
import { LucideX, MinusIcon, PlusIcon } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { Option, Select } from "@/common/components/ui/Select"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { ACTIVITIES } from "../constants"
import toast from "react-hot-toast"
import { useSegmentsStore } from "../store/useSegmentsStore"

interface ISetUpProfileAboutYouModalProps {
  isModalOpen: boolean
  onClose: Dispatch<boolean>
}

const BuilderModal = ({
  isModalOpen,
  onClose,
}: ISetUpProfileAboutYouModalProps) => {
  const updateSegments = useSegmentsStore((state) => state.updateSegments)
  const [activities, setActivities] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [durationHour, setDurationHour] = useState(0)
  const [durationMinute, setDurationMinute] = useState(0)
  const [optional, setOptional] = useState("No")
  const [fee, setFee] = useState("No")

  const updateActivities = (activity: string) => {
    const isExist = activities.find((item) => item === activity)
    if (!isExist) {
      const data = [...activities, activity]
      setActivities([...data])
    }
  }

  const removeActivity = (activity: string) => {
    const isExist = activities.find((item) => item === activity)
    if (isExist) {
      const updated = activities.filter((e) => e !== activity)
      setActivities([...updated])
    }
  }

  const submitSegment = () => {
    if (activities.length === 0) {
      toast.error("Select at least 1 activity")
    } else if (!location) {
      toast.error("Location is needed for this segment")
    } else if (!durationHour && !durationMinute) {
      toast.error("Please add duration for this segment")
    } else {
      updateSegments({
        activities,
        location,
        durationHour,
        durationMinute,
        optional: optional === "Yes",
        fee: fee === "Yes",
      })
      toast.success("New segment was added")
      setActivities([])
      onClose(false)
    }
  }

  return (
    <ModalContainer
      onClose={() => onClose(!isModalOpen)}
      isOpen={isModalOpen}
      size="sm"
      title="Itinerary Segment"
    >
      <div className="pt-4 pb-10 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div>
          <Typography variant="h4" fontWeight="semibold" className="mb-4">
            What happens during this segment?
          </Typography>
          <div className="w-full">
            <Select
              label="Activity"
              required
              className="col-span-1"
              onChange={(e) => updateActivities(e.target.value)}
            >
              <Option value={""}>Select Activity</Option>
              {ACTIVITIES.map((activity) => (
                <Option key={activity} value={activity}>
                  {activity}
                </Option>
              ))}
            </Select>
            {activities.length > 0 && (
              <div className="flex gap-4 pt-4">
                {activities.map((activity) => (
                  <div className="bg-primary-400 text-text-500 font-semibold py-2 px-3 rounded-lg text-xs flex gap-2 items-center">
                    {activity}
                    <button
                      type="button"
                      onClick={() => removeActivity(activity)}
                    >
                      <LucideX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <Typography variant="h4" fontWeight="semibold" className="mb-4">
            Where does this segment take place?
          </Typography>
          <div className="w-full">
            <Input
              id="location"
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-6">
          <Typography variant="h4" fontWeight="semibold" className="mb-4">
            How long does this segment last?
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
            Is this segment optional?
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
            Is this segment require an additional fee?
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

export default BuilderModal
