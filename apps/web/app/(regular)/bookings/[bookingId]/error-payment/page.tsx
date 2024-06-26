import ErrorPayment from "@/module/Bookings/ErrorPayment"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Error Payment - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const ErrorPaymentPage = () => {
  return <ErrorPayment />
}

export default ErrorPaymentPage
