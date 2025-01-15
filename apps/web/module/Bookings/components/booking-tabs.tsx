import { Group, LucideCalendarCheck, LucideCheckCircle, LucideXCircle } from "lucide-react";

const bookingTabs = [
  {
    name: "Active Bookings",
    icon: <LucideCalendarCheck className="w-5" />, 
    link: "/bookings/active",
  },
  {
    name: "Finished Bookings",
    icon: <LucideCheckCircle className="w-5" />,
    link: "/bookings/finished",
  },
  {
    name: "Cancelled Bookings",
    icon: <LucideXCircle className="w-5" />, 
    link: "/bookings/cancelled",
  }
];

export default bookingTabs;
