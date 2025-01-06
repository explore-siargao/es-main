"use client"

import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import CartList from "./lists"
import SubTotalBox from "./sub-total-box"
import useGetCartItems from "./hooks/use-get-cart-items"
import { useRouter } from "next/navigation"
import { useCartStore } from "./stores/use-cart-store"
import { Typography } from "@/common/components/ui/Typography"
import { Spinner } from "@/common/components/ui/Spinner"

const Cart = () => {
  const { data, isLoading } = useGetCartItems()
  const { selectedItems } = useCartStore()
  const router = useRouter()

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select items before proceeding to checkout.")
      return
    }
    router.push(
      `/checkout?cartIds=${selectedItems.map((item) => item._id).join(",")}`
    )
  }

  return (
    <WidthWrapper width="medium" className="mt-6 lg:mt-8">
      <Typography variant="h1" fontWeight="semibold">
        Your cart
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
        <div className="lg:col-span-3">
          {isLoading ? (
            <Spinner />
          ) : data && data?.items.length > 0 ? (
            <CartList items={data?.items} />
          ) : (
            <div className="col-span-3 w-full">
              <h2 className="text-lg mx-auto text-text-300 italic">
                There are no items in your cart
              </h2>
            </div>
          )}
        </div>

        <div className="col-span-1 relative">
          <SubTotalBox
            selectedItemsPrice={selectedItems.map(
              (item) => item.price + item.guestComission
            )}
            buttonText="Proceed to checkout"
            onButtonClick={handleCheckout}
          />
        </div>
      </div>
    </WidthWrapper>
  )
}

export default Cart
