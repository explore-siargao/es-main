"use client"

import { useRouter } from "next/navigation"
import { useCartStore } from "../stores/use-cart-store"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import OrderSummary from "../order-summary"
import { T_Cart_Item } from "@repo/contract-2/cart"
import { useState } from "react"
import SubTotalBox from "../sub-total-box"
import { Step, Stepper } from "../stepper"

const CheckoutPage = () => {
  const { selectedItems } = useCartStore()
  const router = useRouter()
  const [, setSelectedItems] = useState<T_Cart_Item[]>([])
  const handlePayment = () => {
    router.push("/pay")
  }

  const steps: Step[] = [
    { label: "Choose Listings", status: "completed" },
    { label: "Summary", status: "current" },
    { label: "Pay", status: "upcoming" },
  ]

  if (selectedItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold">No items selected for checkout.</h1>
        <button
          onClick={() => router.push("/cart")}
          className="btn-primary mt-4"
        >
          Back to Cart
        </button>
      </div>
    )
  }

  return (
    <WidthWrapper width="medium" className="mt-4 md:mt-8 lg:mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
        <div className="lg:col-span-3">
          <OrderSummary
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            items={selectedItems as T_Cart_Item[]}
          />
        </div>

        <div className="col-span-1 relative">
          <SubTotalBox
            selectedItemsPrice={selectedItems.map((item) => item.price)}
            buttonText="Pay"
            onButtonClick={handlePayment}
          />
        </div>
      </div>
    </WidthWrapper>
  )
}

export default CheckoutPage
