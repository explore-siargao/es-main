import ModalContainer from "@/common/components/ModalContainer"
import React, { useState } from "react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import useUpdateCartItem from "../../hooks/use-update-cart-item"
import { T_Update_Cart, T_Cart_Item } from "@repo/contract-2/cart"
import toast from "react-hot-toast"
import { CartService } from "@repo/contract-2/cart"
import { useQueryClient } from "@tanstack/react-query"
import { PhoneInput } from "../components/phoneInput"

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
    phoneNumber: "+63 ",
    email: "",
  })
  const [countryCode, setCountryCode] = useState("+63")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: prev.phoneNumber.split(" ")[0] + " " + value.trim(),
    }))
  }

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value)
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value + " " + (prev.phoneNumber.split(" ")[1] || ""),
    }))
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
      const item: T_Update_Cart = {
        startDate: cartItem.startDate,
        endDate: cartItem.endDate,
        guestCount: cartItem.guestCount || 0,
        contacts: [...(cartItem.contacts || []), formData],
      }
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(String(data.message))
            queryClient.invalidateQueries({
              queryKey: [queryKeys.getItems],
            })

            closeModal()
            setFormData({
              firstName: "",
              lastName: "",
              phoneNumber: "+63 ",
              email: "",
            })
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
        <div className="space-y-2 ">
          <PhoneInput
            countryCode={countryCode}
            phoneNumber={formData.phoneNumber.replace(/^\+\d+/, "")}
            onCountryCodeChange={handleCountryCodeChange}
            onPhoneNumberChange={handlePhoneChange}
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
