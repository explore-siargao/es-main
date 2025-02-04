import React from "react"
import { APP_NAME } from "@repo/constants"
import { Metadata } from "next"
import CartSummary from "@/module/cart/cart-summary"

export const metadata: Metadata = {
  title: `Cart - ${APP_NAME}`,
  description: `Generated by ${APP_NAME}`,
}

const CartPage = () => {
  return <CartSummary />
}

export default CartPage
