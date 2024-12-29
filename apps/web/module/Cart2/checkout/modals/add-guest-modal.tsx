import ModalContainer from "@/common/components/ModalContainer"
import React, { useState, useEffect } from "react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import useUpdateCartItem from "../../hooks/use-update-cart-item"
import { T_Cart_Item } from "@repo/contract-2/cart"
import toast from "react-hot-toast"
import { CartService } from "@repo/contract-2/cart"
import { useQueryClient } from "@tanstack/react-query"

const queryKeys = CartService.getQueryKeys()

type T_Guest = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
}

type T_Add_Guest_Modal = {
  isOpen: boolean
  closeModal: () => void
  cartItem: T_Cart_Item
}

const AddGuestModal = ({ isOpen, closeModal, cartItem }: T_Add_Guest_Modal) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useUpdateCartItem()
  const [formData, setFormData] = useState<T_Guest>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email
    ) {
      toast.error("Please complete all the fields")
    } else {
      const item = {
        guestCount: cartItem.guestCount || 1,
        endDate: cartItem.endDate,
        startDate: cartItem.startDate,
        contacts: [
          // @ts-expect-error
          ...cartItem.contacts,
          formData,
        ],
      }
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(String(data.message))
            queryClient.invalidateQueries({
              queryKey: [queryKeys.getItems],
            })
            closeModal()
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate({ itemId: cartItem._id as string, item }, callBackReq)
    }
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      size="auto"
      title={"Add contact"}
      onClose={closeModal}
    >
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border-gray-300"
              label="First name *"
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border-gray-300"
              label="Last name *"
              disabled={isPending}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border-gray-300"
            label="Phone number *"
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300"
            label="Email * (for updates on your booking)"
            disabled={isPending}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSubmit} disabled={isPending}>
            Save
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default AddGuestModal
