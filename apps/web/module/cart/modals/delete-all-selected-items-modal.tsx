import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import toast from "react-hot-toast"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { useQueryClient } from "@tanstack/react-query"
import useRemoveMultipleItemsFromCart from "../hooks/use-delete-multiple-items-from-cart"

interface DeleteAllSelectedItemsProps {
  isOpen: boolean
  onClose: () => void
  itemIds: string[]
}

const DeleteAllSelectedItems = ({
  isOpen: openModal,
  onClose: closeModal,
  itemIds,
}: DeleteAllSelectedItemsProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useRemoveMultipleItemsFromCart()

  return (
    <ModalContainer
      title="Remove items from cart"
      onClose={closeModal}
      isOpen={openModal}
      size="auto"
    >
      <div className="p-6">
        <p className="text-text-400 font-light">
          Are you sure you want to remove the selected items from your cart?
        </p>
      </div>
      <ModalContainerFooter
        positive="Delete"
        negative="Cancel"
        isPending={isPending}
        isSubmit={false}
        onClose={closeModal}
        buttonFn={() => {
          mutate(itemIds, {
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

export default DeleteAllSelectedItems