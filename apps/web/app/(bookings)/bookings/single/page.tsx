import { APP_NAME } from "@repo/constants"
import { BOOKINGS } from "@/common/constants"
import { Metadata } from "next"
import SingleBooking from "@/module/Bookings/single"

export const metadata: Metadata = {
  title: `${BOOKINGS} - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const BookingsPage = () => {
  return <SingleBooking />
}

export default BookingsPage