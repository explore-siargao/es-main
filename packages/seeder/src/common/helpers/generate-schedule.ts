import exp from "constants";

type Slot = {
  startTime: string;
  endTime: string;
  note: string;
  slotIdsId: { name: string }[];
};

type Schedule = {
  [day: string]: {
    slots: Slot[];
  };
};

function generateSchedule(): Schedule {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const startTime = 6; // Starting hour (6:00 AM)
  const slotsPerDay = 5; // Number of slots per day
  const slotDuration = 1; // Duration of each slot in hours

  // Helper function to format time in "HH:MM AM/PM"
  function formatTime(hour: number): string {
    const period = hour < 12 ? "AM" : "PM";
    const adjustedHour = hour % 12 || 12; // Convert to 12-hour format
    return `${adjustedHour}:00 ${period}`;
  }

  // Generate slots for a single day
  function generateSlots(): Slot[] {
    const slots: Slot[] = [];
    for (let i = 0; i < slotsPerDay; i++) {
      const slotStart = startTime + i * slotDuration;
      slots.push({
        startTime: formatTime(slotStart),
        endTime: formatTime(slotStart + slotDuration),
        note: "Hourly slot.",
        slotIdsId: [{ name: `Slot ${i + 1}` }],
      });
    }
    return slots;
  }

  // Initialize the schedule with proper typing
  const schedule: Schedule = {};

  // Generate schedule for each day
  daysOfWeek.forEach((day) => {
    schedule[day] = { slots: generateSlots() };
  });

  return schedule;
}

export default generateSchedule;