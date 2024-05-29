import ModalContainer from "@/common/components/ModalContainer"
import { useQueryClient } from "@tanstack/react-query"
import React from "react"
import toast from "react-hot-toast"
import useRemovePaymentMethod from "../../hooks/useRemovePaymentMethod"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"

interface PaymentModalProps {
  id: number
  userId: number
  isOpen: boolean
  onClose: () => void
}

const RemovePaymentModal = ({
  id,
  userId,
  isOpen: openModal,
  onClose: closeModal,
}: PaymentModalProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useRemovePaymentMethod(userId, id)
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: ["payment-method"],
        })
        toast.success(data.message)
        closeModal()
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }
  return (
    <ModalContainer
      title="Remove payment method"
      size="auto"
      isOpen={openModal}
      onClose={closeModal}
    >
      <div className="p-6">
        <p className="text-text-400 font-light">
          Are you sure you want to remove this payment method?
        </p>
      </div>
      <ModalContainerFooter
        positive="Remove"
        negative="Cancel"
        isPending={isPending}
        isSubmit={false}
        onClose={closeModal}
        buttonFn={() => {
          mutate({ id: id, userId: userId }, callBackReq)
        }}
      />
    </ModalContainer>
  )
}

export default RemovePaymentModal
