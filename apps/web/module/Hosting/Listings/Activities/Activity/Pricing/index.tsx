"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { Button } from "@/common/components/ui/Button"
import { useParams, useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import useGetActivityById from "../../hooks/useGetActivityById"
import { Input } from "@/common/components/ui/Input"
import { Option, Select } from "@/common/components/ui/Select"
import { Plus, X } from "lucide-react"
import useUpdateActivityPricingSlots from "../../hooks/useUpdateActivityPricingSlots"

type TimeSlot = {
  startTime: string
  endTime: string
}

type DaySchedule = {
  [key: string]: TimeSlot[]
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


  const onSubmit = async () => {
    if (maxCapacity < minCapacity){
      toast.error("Minimum capacity must be less than Max capacity")
      return;
    }
    const pricingData = {
      experienceType: scheduleType.toLowerCase() as "private" | "joiner",
      schedule: {
        monday: schedule.monday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        tuesday: schedule.tuesday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        wednesday: schedule.wednesday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        thursday: schedule.thursday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        friday: schedule.friday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        saturday: schedule.saturday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        sunday: schedule.sunday?.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      },
      slotCapacity: {
        minimum: parseInt(minCapacity), 
        maximum: parseInt(maxCapacity),
      },
      price: parseFloat(price),
    };
    
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

      await mutateAsync(pricingData, callBackReq);
    } catch (error) {
      toast.error("Failed to update activity pricing slots. Please try again.");
    }
  }; 

  
  useEffect(() => {
    if (data) {
      const pricingData = data.item
      const scheduleType = pricingData?.experienceType
      setScheduleType(scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1))
      if (pricingData?.schedule) {
        delete pricingData.schedule._id;
    }
      setMinCapacity(pricingData?.slotCapacity?.minimum)
      setMaxCapacity(pricingData?.slotCapacity?.maximum)
      setSchedule(pricingData?.schedule)
      setPrice(scheduleType === "private"? pricingData?.pricePerSlot || 0 : pricingData?.pricePerPerson || 0 )
    }
  }, [data])



  const [scheduleType, setScheduleType] = useState("Private")
  const [schedule, setSchedule] = useState<DaySchedule>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })
  
  const [minCapacity, setMinCapacity] = useState("1")
  const [maxCapacity, setMaxCapacity] = useState("10")
  const [price, setPrice] = useState("10.00")

  const addOneHour = (time: string): string => {
    const parts = time.split(':');
    if (parts.length < 2) {
        console.error(`Invalid time format: ${time}`);
        return time;
    }

    const hourStr = parts[0];
    const minuteStr = parts[1]?.trim();
    if (!hourStr || !minuteStr) {
        console.error(`Invalid time format: ${time}`);
        return time;
    }

    const [, period] = minuteStr.split(' ');

    let hour = parseInt(hourStr, 10);
    if (period === 'PM' && hour !== 12) {
        hour += 12; 
    }
    if (period === 'AM' && hour === 12) {
        hour = 0;
    }

    hour = (hour + 1) % 24; 

    const newPeriod = hour >= 12 ? 'PM' : 'AM';
    const newHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${newHour}:00 ${newPeriod}`;
};

const addTimeSlot = (day: string) => {
  const existingSlots = schedule[day] || [];
  const highestEndTime = existingSlots.reduce((max, slot) => {
      return (slot.endTime > max) ? slot.endTime : max;
  }, "12:00 AM"); 

  const newSlot = {
      startTime: highestEndTime,
      endTime: addOneHour(highestEndTime),
  };
  const hasConflict = existingSlots.some(slot => 
      newSlot.startTime && newSlot.endTime && 
      (newSlot.startTime < slot.endTime && newSlot.endTime > slot.startTime)
  );

  if (!hasConflict) {
      setSchedule(prev => ({
          ...prev,
          [day]: [
              ...existingSlots,
              newSlot,
          ],
      }));
  } else {
      toast.error(`Time slot conflicts with existing slots on ${day}.`);
  }
};

  const removeTimeSlot = (day: string, index: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((_, i) => i !== index),
    }));
  };

  const timeToMinutes = (time: string) => {
    const [hourStr, period] = time.split(' ');

    if (!hourStr || !period) {
        console.error(`Invalid time format: ${time}`);
        return 0; 
    }
    const [hourPart, minutePart] = hourStr.split(':');
    const hour = Number(hourPart);
    const minute = Number(minutePart);
    if (isNaN(hour) || isNaN(minute)) {
        console.error(`Invalid time components: hour=${hour}, minute=${minute}`);
        return 0; 
    }

    let totalHours = hour;

    if (period === 'PM' && hour !== 12) totalHours += 12;
    if (period === 'AM' && hour === 12) totalHours = 0;

    return totalHours * 60 + minute;
};


const updateTimeSlot = (day: string, index: number, field: "startTime" | "endTime", value: string) => {
  if (!schedule[day]) {
      toast.error(`No schedule found for ${day}.`);
      return;
  }

  const currentSlot = schedule[day][index];

  if (!currentSlot) {
      toast.error(`No time slot found at index ${index} for ${day}.`);
      return;
  }

  const updatedSlot = {
      ...currentSlot,
      [field]: value,
  };

  // If the start time is being updated, add one hour to the end time
  if (field === "startTime") {
      const newEndTime = addOneHour(value);
      updatedSlot.endTime = newEndTime;
  }

  const startTimeInMinutes = timeToMinutes(updatedSlot.startTime);
  const endTimeInMinutes = timeToMinutes(updatedSlot.endTime);
  const isEndTimeValid = endTimeInMinutes > startTimeInMinutes;

  if (!isEndTimeValid) {
      toast.error("End time cannot be less than or equal to start time.");
      return;
  }

  const hasConflict = schedule[day].some((slot, i) =>
      i !== index && (
          timeToMinutes(slot.startTime) < endTimeInMinutes && timeToMinutes(slot.endTime) > startTimeInMinutes
      )
  );

  if (!hasConflict) {
      setSchedule(prev => {
          const existingSlots = prev[day] || [];
          return {
              ...prev,
              [day]: existingSlots.map((slot, i) => (i === index ? updatedSlot : slot)),
          };
      });
  } else {
      toast.error(`Updated time slot conflicts with existing slots on ${day}.`);
  }
};


  
  

  const copyToRemainingDays = () => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const firstDayWithSlots = days.find((day) => Array.isArray(schedule[day]) && schedule[day].length > 0) || "monday";
    const slotsToApply = Array.isArray(schedule[firstDayWithSlots]) ? schedule[firstDayWithSlots] : [];
  
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      days.forEach((day) => {
        if (day !== firstDayWithSlots) {
          newSchedule[day] = [...slotsToApply];
        }
      });
      return newSchedule;
    });
  };
  return (
    <div className={cn("mt-20 mb-14", isPending && "opacity-70")}>
      <div className="mb-3">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center"
        >
          Pricing
        </Typography>

        <div className="container p-4 max-w-3xl my-4">

      <div className="mb-4">
        <Select
          id="scheduleType"
          label="Schedule Type"
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value)}
          disabled={isPending}
        >
          <Option value="Private">Private</Option>
          <Option value="Joiner">Joiner</Option>
        </Select>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Time Slots</h2>
          <Button variant="outline"  disabled={isPending} onClick={copyToRemainingDays}>
            Copy to remaining days
          </Button>
        </div>
        {Object.entries(schedule).map(([day, slots]) => (
          <div key={day} className="mb-4">
            <h3 className="font-semibold mb-2">{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            {slots.map((slot, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
             <Select
    value={slot.startTime}
    onChange={(e) => updateTimeSlot(day, index, "startTime", e.target.value)}
    label="Start time"
    disabled={isPending}
>
    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <Option key={hour} value={`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`}>
            {`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`}
        </Option>
    ))}
</Select>
to
<Select
    value={slot.endTime}
    onChange={(e) => updateTimeSlot(day, index, "endTime", e.target.value)}
    label="End time"
    disabled={isPending}
>
    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <Option key={hour} value={`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`}>
            {`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`}
        </Option>
    ))}
</Select>
                <Button variant="ghost" size="icon" onClick={() => removeTimeSlot(day, index)}  disabled={isPending}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="text-center"onClick={() => addTimeSlot(day)}  disabled={isPending}>
            <Plus className="w-4 h-4 "/> <span className="ml-2">Add time slot</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Capacity</h2>
        <div className="flex gap-4">
          <div className="flex-1">
         
          <Input
  id="minCapacity"
  disabled={isPending}
  type="number"
  value={minCapacity}
  onChange={(e) => setMinCapacity(e.target.value)}
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }}
  onPaste={(e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text');
    if (/^[0-9]*$/.test(pastedData)) {
      setMinCapacity(pastedData);
    }
  }}
  label={"Slot Minimum Capacity"}
/>
          </div>
          <div className="flex-1">
         
            <Input
                  id="maxCapacity"
                  type="number"
                  disabled={isPending}
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)} label={"Slot Maximum Capacity"} 
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedData = e.clipboardData.getData('Text');
                    if (/^[0-9]*$/.test(pastedData)) {
                      setMinCapacity(pastedData);
                    }
                  }} />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Pricing</h2>
    
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₱</span>
          <Input
           disabled={isPending}
                id="pricePerSlot"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-8" label={scheduleType === "Private"? "Price per Slot" : "Price per Person"}   onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedData = e.clipboardData.getData('Text');
                  if (/^[0-9]*$/.test(pastedData)) {
                    setMinCapacity(pastedData);
                  }
                }}       />
        </div>
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
