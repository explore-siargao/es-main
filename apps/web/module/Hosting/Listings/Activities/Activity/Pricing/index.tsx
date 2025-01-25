"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { Button } from "@/common/components/ui/Button"
import { useParams, useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import useGetActivityById from "../../hooks/useGetActivityById"
import { Option, Select } from "@/common/components/ui/Select"
import { LucidePlus, LucideX } from "lucide-react"
import useUpdateActivityPricingSlots from "../../hooks/useUpdateActivityPricingSlots"
import { Input2 } from "@/common/components/ui/Input2"
import { E_Activity_Experience_Type } from "@repo/contract/build/Activities/enum"

type TimeSlot = {
  startTime: string
  endTime: string
  ids?: [{ _id: string; name: string }]
}

type DaySchedule = {
  [key: string]: {
    slots: TimeSlot[]
  }
}

type Prop = {
  pageType: "setup" | "edit"
}

const ActivityPricing = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const activityId = String(params.listingId)
  const { data, isLoading } = useGetActivityById(activityId)
  const { mutateAsync, isPending } = useUpdateActivityPricingSlots(activityId)

  const [schedule, setSchedule] = useState<DaySchedule>({
    monday: { slots: [] },
    tuesday: { slots: [] },
    wednesday: { slots: [] },
    thursday: { slots: [] },
    friday: { slots: [] },
    saturday: { slots: [] },
    sunday: { slots: [] },
  })

  const [minCapacity, setMinCapacity] = useState(0)
  const [maxCapacity, setMaxCapacity] = useState(0)
  const [price, setPrice] = useState(0)

  const experienceType: E_Activity_Experience_Type = data?.item?.experienceType

  const onSubmit = async () => {
    const allEmpty = Object.values(schedule).every(
      (arr) => arr.slots.length === 0
    )
    if (allEmpty) {
      toast.error("Please add at least one time slot for any day.")
    } else if (minCapacity > maxCapacity) {
      toast.error("Minimum capacity must be less than or equal to Max capacity")
    } else if (price < 1) {
      toast.error("Price must be greater than 0")
    } else {
      const pricingData = {
        experienceType: experienceType,
        schedule: {
          monday: {
            slots: schedule.monday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
          tuesday: {
            slots: schedule.tuesday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
          wednesday: {
            slots: schedule.wednesday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
          thursday: {
            slots: schedule.thursday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
          friday: {
            slots: schedule.friday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
          saturday: {
            slots: schedule.saturday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
          sunday: {
            slots: schedule.sunday?.slots.map((slot) => ({
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          },
        },
        slotCapacity: {
          minimum: minCapacity,
          maximum: maxCapacity,
        },
        pricePerPerson: price,
      }

      try {
        const callBackReq = {
          onSuccess: (data: any) => {
            if (!data.error) {
              toast.success(data.message)
              queryClient.invalidateQueries({
                queryKey: ["activity", activityId],
              })
              if (pageType === "setup") {
                queryClient.invalidateQueries({
                  queryKey: ["activity-finished-sections", activityId],
                })
                router.push(
                  `/hosting/listings/activities/setup/${activityId}/summary`
                )
              }
            } else {
              toast.error(String(data.message))
            }
          },
          onError: (err: any) => {
            toast.error(String(err))
          },
        }

        await mutateAsync(pricingData, callBackReq)
      } catch (error) {
        toast.error(
          "Failed to update activity pricing slots. Please try again."
        )
      }
    }
  }

  useEffect(() => {
    if (data) {
      const pricingData = data.item
      const experienceType = pricingData?.experienceType
      if (pricingData?.schedule) {
        delete pricingData.schedule._id
      }
      setMinCapacity(pricingData?.slotCapacity?.minimum)
      setMaxCapacity(pricingData?.slotCapacity?.maximum)
      setSchedule(pricingData?.schedule)
      setPrice(
        experienceType === "Private"
          ? pricingData?.pricePerSlot || 0
          : pricingData?.pricePerPerson || 0
      )
    }
  }, [data])

  const addOneHour = (time: string): string => {
    const parts = time.split(":")
    if (parts.length < 2) {
      console.error(`Invalid time format: ${time}`)
      return time
    }

    const hourStr = parts[0]
    const minuteStr = parts[1]?.trim()
    if (!hourStr || !minuteStr) {
      console.error(`Invalid time format: ${time}`)
      return time
    }

    const [, period] = minuteStr.split(" ")

    let hour = parseInt(hourStr, 10)
    if (period === "PM" && hour !== 12) {
      hour += 12
    }
    if (period === "AM" && hour === 12) {
      hour = 0
    }

    hour = (hour + 1) % 24

    const newPeriod = hour >= 12 ? "PM" : "AM"
    const newHour = hour % 12 === 0 ? 12 : hour % 12

    return `${newHour}:00 ${newPeriod}`
  }

  const addTimeSlot = (day: string) => {
    const existingSlots = schedule[day]?.slots || []
    const highestEndTime = existingSlots.reduce((max, slot) => {
      return slot.endTime > max ? slot.endTime : max
    }, "12:00 AM")

    const newSlot = {
      startTime: highestEndTime,
      endTime: addOneHour(highestEndTime),
    }
    const hasConflict = existingSlots.some(
      (slot) =>
        newSlot.startTime &&
        newSlot.endTime &&
        newSlot.startTime < slot.endTime &&
        newSlot.endTime > slot.startTime
    )

    if (!hasConflict) {
      setSchedule((prev) => ({
        ...prev,
        [day]: { slots: [...existingSlots, newSlot] },
      }))
    } else {
      toast.error(`Time slot conflicts with existing slots on ${day}.`)
    }
  }

  const removeTimeSlot = (day: string, index: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { slots: (prev[day]?.slots || []).filter((_, i) => i !== index) },
    }))
  }

  const timeToMinutes = (time: string) => {
    const [hourStr, period] = time.split(" ")

    if (!hourStr || !period) {
      console.error(`Invalid time format: ${time}`)
      return 0
    }
    const [hourPart, minutePart] = hourStr.split(":")
    const hour = Number(hourPart)
    const minute = Number(minutePart)
    if (isNaN(hour) || isNaN(minute)) {
      console.error(`Invalid time components: hour=${hour}, minute=${minute}`)
      return 0
    }

    let totalHours = hour

    if (period === "PM" && hour !== 12) totalHours += 12
    if (period === "AM" && hour === 12) totalHours = 0

    return totalHours * 60 + minute
  }

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    if (!schedule[day]) {
      toast.error(`No schedule found for ${day}.`)
      return
    }

    const currentSlot = schedule[day].slots[index]

    if (!currentSlot) {
      toast.error(`No time slot found at index ${index} for ${day}.`)
      return
    }

    const updatedSlot = {
      ...currentSlot,
      [field]: value,
    }

    // If the start time is being updated, add one hour to the end time
    if (field === "startTime") {
      const newEndTime = addOneHour(value)
      updatedSlot.endTime = newEndTime
    }

    const startTimeInMinutes = timeToMinutes(updatedSlot.startTime)
    const endTimeInMinutes = timeToMinutes(updatedSlot.endTime)
    const isEndTimeValid = endTimeInMinutes > startTimeInMinutes

    if (!isEndTimeValid) {
      toast.error("End time cannot be less than or equal to start time.")
      return
    }

    const hasConflict = schedule[day].slots.some(
      (slot, i) =>
        i !== index &&
        timeToMinutes(slot.startTime) < endTimeInMinutes &&
        timeToMinutes(slot.endTime) > startTimeInMinutes
    )

    if (!hasConflict) {
      setSchedule((prev) => {
        const existingSlots = prev[day]?.slots || []
        return {
          ...prev,
          [day]: {
            slots: existingSlots.map((slot, i) =>
              i === index ? updatedSlot : slot
            ),
          },
        }
      })
    } else {
      toast.error(`Updated time slot conflicts with existing slots on ${day}.`)
    }
  }

  const copyToRemainingDays = () => {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ]

    const firstDayWithSlots =
      days.find(
        (day) =>
          Array.isArray(schedule[day]?.slots) && schedule[day].slots.length > 0
      ) || "monday"

    const slotsToApply = schedule[firstDayWithSlots]?.slots || []

    setSchedule((prev) => {
      const newSchedule: { [x: string]: { slots: TimeSlot[] } } = { ...prev }

      days.forEach((day) => {
        if (day !== firstDayWithSlots) {
          // Ensure newSchedule[day] exists and has the correct structure
          if (!newSchedule[day]) {
            newSchedule[day] = { slots: [] }
          }
          newSchedule[day].slots = [...slotsToApply]
        }
      })
      return newSchedule
    })
  }

  const priceInputDescMap = {
    Joiner: `This activity was tag as "Joiner" experience type in the Basic Info page and that is the reason why this is priced per person.`,
    Private: `This activity was tag as "Private" experience type in the Basic Info page and that is the reason why this is priced per slot.`,
  }

  return (
    <div className={cn("mt-20 mb-36", isPending && "opacity-70")}>
      <div className="mb-3">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center"
        >
          Pricing
        </Typography>

        <div className="container max-w-3xl mt-4">
          <div className="mb-4">
            <div className="flex gap-6 items-center mb-2">
              <Typography variant="h4" fontWeight="semibold">
                Time Slots
              </Typography>
              <Button
                variant="primary"
                size="sm"
                disabled={isPending}
                onClick={copyToRemainingDays}
              >
                Copy to remaining days
              </Button>
            </div>
            <Typography className="text-xs text-gray-500 italic mb-2">
              This lets you set multiple time slots for an activity by day. Add
              or remove time slots, and use "Copy to remaining days" to quickly
              apply settings across the week.
            </Typography>
            {Object.entries(schedule).map(([day, slots]) => (
              <div key={day} className="mb-4">
                <Typography variant="h4" className="mb-2">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Typography>
                {slots?.slots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Select
                      value={slot.startTime}
                      onChange={(e) =>
                        updateTimeSlot(day, index, "startTime", e.target.value)
                      }
                      label="Start time"
                      disabled={isPending}
                    >
                      {Array.from({ length: 24 * 2 }, (_, i) => {
                        const hour = Math.floor(i / 2)
                        const minutes = i % 2 === 0 ? "00" : "30"
                        return (
                          <Option
                            key={i}
                            value={`${hour % 12 === 0 ? 12 : hour % 12}:${minutes} ${hour < 12 ? "AM" : "PM"}`}
                          >
                            {`${hour % 12 === 0 ? 12 : hour % 12}:${minutes} ${hour < 12 ? "AM" : "PM"}`}
                          </Option>
                        )
                      })}
                    </Select>
                    to
                    <Select
                      value={slot.endTime}
                      onChange={(e) =>
                        updateTimeSlot(day, index, "endTime", e.target.value)
                      }
                      label="End time"
                      disabled={isPending}
                    >
                      {Array.from({ length: 24 * 2 }, (_, i) => {
                        const hour = Math.floor(i / 2)
                        const minutes = i % 2 === 0 ? "00" : "30"
                        return (
                          <Option
                            key={i}
                            value={`${hour % 12 === 0 ? 12 : hour % 12}:${minutes} ${hour < 12 ? "AM" : "PM"}`}
                          >
                            {`${hour % 12 === 0 ? 12 : hour % 12}:${minutes} ${hour < 12 ? "AM" : "PM"}`}
                          </Option>
                        )
                      })}
                    </Select>
                    <button
                      className="hover:cursor-pointer"
                      onClick={() => removeTimeSlot(day, index)}
                      disabled={isPending}
                      aria-label="Remove Item"
                    >
                      <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="flex hover:cursor-pointer mt-4 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                  onClick={() => addTimeSlot(day)}
                >
                  <LucidePlus color="black" className="rounded-sm w-4 h-4" />
                  <Typography className="text-sm">
                    {" "}
                    Add time slot for {day}
                  </Typography>
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <Typography variant="h4" fontWeight="semibold">
              Slot Capacity
            </Typography>
            <Typography className="text-xs text-gray-500 italic mb-2">
              This corresponds to time slots you put above, this is the minimum
              and maximum person each time slot can accommodate. Example for
              this is "Friday 1:00 PM to 2:00 PM can handle minimum of 5 and
              maximum of 10 people"
            </Typography>
            <div className="flex gap-4">
              <div>
                <Input2
                  id="minCapacity"
                  disabled={isPending}
                  type="number"
                  value={minCapacity}
                  required
                  onChange={(e) => setMinCapacity(Number(e.target.value))}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault()
                    }
                  }}
                  className="lg:max-w-72"
                  onPaste={(e) => {
                    e.preventDefault()
                    const pastedData = e.clipboardData.getData("Text")
                    if (/^[0-9]*$/.test(pastedData)) {
                      setMinCapacity(Number(pastedData))
                    }
                  }}
                  label={"Minimum"}
                />
              </div>
              <div>
                <Input2
                  id="maxCapacity"
                  type="number"
                  disabled={isPending}
                  value={maxCapacity}
                  required
                  onChange={(e) => setMaxCapacity(Number(e.target.value))}
                  label={"Maximum"}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault()
                    }
                  }}
                  className="lg:max-w-72"
                  onPaste={(e) => {
                    e.preventDefault()
                    const pastedData = e.clipboardData.getData("Text")
                    if (/^[0-9]*$/.test(pastedData)) {
                      setMinCapacity(Number(pastedData))
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Input2
              disabled={isPending}
              id="pricePerSlot"
              type="number"
              value={price}
              label="Price per Person"
              description={priceInputDescMap[experienceType]}
              step=".01"
              required
              onChange={(e) => setPrice(Number(e.target.value))}
              defaultValue={data?.item?.requiredDeposit}
              className="lg:max-w-72"
              leftIcon={<span className="text-text-300">₱</span>}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
        <Button
          disabled={isPending}
          size="sm"
          type="button"
          onClick={() => onSubmit()}
          className={cn(
            "disabled:bg-gray-600",
            isLoading || isPending ? "opacity-70 cursor-progress" : ""
          )}
        >
          {pageType === "setup" ? "Save & Next" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

export default ActivityPricing
