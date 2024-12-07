"use client"

import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import CartList from "./components/CartList"
import SubTotalBox from "./components/SubTotalBox"
import useGetCartItems from "@/common/hooks/use-get-cart-items"
import Loading from "@/app/(accommodation)/loading"
import { useRouter } from "next/navigation"
import { useCartStore } from "./stores/cart-stores"

const Cart = () => {
  const { data, isLoading } = useGetCartItems()
  const { selectedItems, setSelectedItems } = useCartStore()
  const router = useRouter()

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select items before proceeding to checkout.")
      return
    }
    router.push("/cart-summary")
  }

  return (
    <WidthWrapper
      width="medium"
      className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-6 md:mt-8 lg:mt-16"
    >
      <div className="lg:col-span-3">
        {isLoading ? (
          <Loading />
        ) : data && data?.items.length > 0 ? (
          <CartList
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            items={data?.items}
          />
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
          selectedItemsPrice={selectedItems.map((item) => item.price)}
          buttonText="Checkout"
          onButtonClick={handleCheckout}
        />
      </div>
    </WidthWrapper>
  )
}

export default Cart
