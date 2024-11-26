import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import toast from "react-hot-toast"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { useQueryClient } from "@tanstack/react-query"
import useRemoveMultipleItemsFromCart from "../../hooks/use-delete-multiple-items-from-cart"
import PaymentOptions from "@/module/Listing/Property/Checkout/PaymentOptions"
import { T_Add_To_Cart, T_Cart_Item } from "@repo/contract-2/cart"
import useAddGCashPayment from "../../hooks/use-add-gcash-payment"
import { useRouter } from "next/navigation"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: T_Add_To_Cart[]
}

const CheckoutModal = ({
  isOpen: openModal,
  onClose: closeModal,
  items
}: CheckoutModalProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useAddGCashPayment()
  const fixedItems = items.map(item => ({
    ...item,
    guestCount: item.guestCount ?? 1
  }));
  const router = useRouter()
  return (
    <ModalContainer
      title="Select payment method"
      onClose={closeModal}
      isOpen={openModal}
      size="sm"
    >
      <div className="p-6">
        <PaymentOptions />
      </div>
      <ModalContainerFooter
        positive="Proceed"
        isPending={isPending}
        isSubmit={false}
        onClose={closeModal}
        buttonFn={() => {
          mutate(fixedItems, {
            onSuccess: (data: any) => {
              if (!data.error) {
                queryClient.invalidateQueries({
                  queryKey: ["get-cart-item"],
                })
                 router.push(data.item.action.link)
                closeModal()
              } else {
                toast.error(String(data.message))
              }
            },
            onError: (err: any) => {
              toast.error(String(err))
            },
          })
        }}
      />
    </ModalContainer>
  )
}

export default CheckoutModal
