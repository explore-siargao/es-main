import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import Checkout from "@/module/Cart/checkout"

export const metadata: Metadata = {
  title: `Checkout - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const CheckoutPage = () => {
  return <Checkout />
}

export default CheckoutPage
