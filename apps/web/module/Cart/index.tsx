"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import CartList from "./components/CartList"
import SubTotalBox from "./components/SubTotalBox"
import useGetCartItems from "@/common/hooks/use-get-cart-items";
import { T_Cart_Item } from "@repo/contract-2/cart";
import { Spinner } from "@/common/components/ui/Spinner";
import Loading from "@/app/(accommodation)/loading";
import { useState } from "react";
import PaymentOptions from "./components/payment-options";
import CheckoutModal from "./components/checkout-modal";

const Cart = () => {
  const { data, isLoading } = useGetCartItems()
  const [selectedItemsPrice, setSelectedItemsPrice] = useState<number[]>([])
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false)
  return (
    <WidthWrapper
      width="medium"
      className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mt-28 md:mt-36"
    >
      <div className="lg:col-span-3">
        {
          isLoading ? 
          <Loading /> : 
          data && data?.items.length > 0 ?
          <CartList 
            setSelectedItemsPrice={setSelectedItemsPrice} 
            selectedItemsPrice={selectedItemsPrice} 
            items={data?.items as T_Cart_Item[]} 
          /> :
          <div className="col-span-3 w-full">
            <h2 className="text-lg font-bold mx-auto text-text-400">There are no items in your cart</h2>
          </div>
        }
      </div> 
      
      <div className="col-span-1 relative ">
        <SubTotalBox
          selectedItemsPrice={selectedItemsPrice} 
          setIsCheckoutModalOpen={setIsCheckoutModalOpen}
        />
      </div>
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)} 
        itemIds={[]} 
      />
    </WidthWrapper>
  )
}

export default Cart
