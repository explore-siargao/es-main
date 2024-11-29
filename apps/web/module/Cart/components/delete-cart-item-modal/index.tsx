import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import toast from "react-hot-toast"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import useRemoveItemFromCart from "../../hooks/use-remove-item-from-cart"
import { useQueryClient } from "@tanstack/react-query"

interface DeleteCartItemModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string
}

const DeleteCartItemModal = ({
  isOpen: openModal,
  onClose: closeModal,
  itemId
}: DeleteCartItemModalProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useRemoveItemFromCart()

  return (
    <ModalContainer
      title="Remove item from cart"
      onClose={closeModal}
      isOpen={openModal}
      size="auto"
    >
      <div className="p-6">
        <p className="text-text-400 font-light">
          Are you sure you want to remove this item from your cart?
        </p>
      </div>
      <ModalContainerFooter
        positive="Delete"
        negative="Cancel"
        isPending={isPending}
        isSubmit={false}
        onClose={closeModal}
        buttonFn={() => {
          mutate(itemId, {
            onSuccess: (data: any) => {
              if (!data.error) {
                queryClient.invalidateQueries({
                  queryKey: ["get-cart-item"],
                })
                toast.success(String(data.message))
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

export default DeleteCartItemModal
