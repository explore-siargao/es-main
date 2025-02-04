import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import BookNow from "@/module/cart/book-now"

export const metadata: Metadata = {
  title: `Checkout - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const CheckoutPage = () => {
  return <BookNow />
}

export default CheckoutPage
