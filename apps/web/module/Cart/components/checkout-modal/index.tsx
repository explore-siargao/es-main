import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import toast from "react-hot-toast"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { useQueryClient } from "@tanstack/react-query"
import useRemoveMultipleItemsFromCart from "../../hooks/use-delete-multiple-items-from-cart"
import PaymentOptions from "@/module/Listing/Property/Checkout/PaymentOptions"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  itemIds: string[]
}

const CheckoutModal = ({
  isOpen: openModal,
  onClose: closeModal,
  itemIds
}: CheckoutModalProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useRemoveMultipleItemsFromCart()

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
        buttonFn={() => console.log('asdasd')}
      />
    </ModalContainer>
  )
}

export default CheckoutModal
