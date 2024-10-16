import ModalContainer from "@/common/components/ModalContainer"
import { Input } from "@/common/components/ui/Input"
import React from "react"
import amex from "@/common/assets/amex.png"
import discover from "@/common/assets/discover-card.png"
import mastercard from "@/common/assets/mastercard.png"
import visa from "@/common/assets/visa.png"
import Image from "@/common/components/ui/image"
import useAddPaymentMethod from "../../hooks/useAddPaymentMethod"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import valid from "card-validator"
import ErrorMessage from "../../PaymentPayout/ErrorMessage"
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter"
import { Option, Select } from "@/common/components/ui/Select"
import { COUNTRIES } from "@repo/constants"
import { EncryptionService } from "@repo/services"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import { T_CardInfo } from "@repo/contract"

interface CardDetailModal {
  isOpen: boolean
  onClose: () => void
  userId: string
}

const AddCardDetailModal = ({ isOpen, onClose, userId }: CardDetailModal) => {
  const { mutate, isPending } = useAddPaymentMethod(userId)
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<T_CardInfo & { expirationDate: string }>()
  const queryClient = useQueryClient()
  const encryptCard = new EncryptionService("card")
  const onSubmit = (formData: T_CardInfo & { expirationDate: string }) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["payment-method"],
          })
          toast.success(data.message)
          reset()
          onClose()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    const cardValid = valid.number(formData.cardNumber)
    const splitExpiration = formData.expirationDate.split("/")
    mutate(
      {
        cardInfo: encryptCard.encrypt({
          cardNumber: formData.cardNumber?.replace(/\s/g, ""),
          expirationMonth: splitExpiration[0],
          expirationYear: `20${splitExpiration[1]}`,
          cardholderName: formData.cardholderName,
          country: formData.country,
          zipCode: formData.zipCode,
        }),
        cardType: cardValid?.card?.niceType ?? "Visa",
        lastFour: `${formData.cardNumber?.slice(-4)}`,
        userId: Number(userId),
      },
      callBackReq
    )
  }

  const validateCard = () => {
    const validateNumber = valid.number(getValues("cardNumber"))
    if (validateNumber.card) {
      clearErrors("cardNumber")
      if (validateNumber.isValid) {
        clearErrors("cardNumber")
      } else {
        setError("cardNumber", {
          type: "manual",
          message: "Invalid card number",
        })
      }
    } else {
      setError("cardNumber", {
        type: "manual",
        message: "Invalid Card",
      })
    }
  }

  const validateCvv = () => {
    const checkCvv = valid.cvv(getValues("cvv"))
    if (checkCvv.isValid) {
      clearErrors("cvv")
    } else {
      setError("cvv", {
        type: "manual",
        message: "Invalid cvv number",
      })
    }
  }
  const validateExpirationDate = () => {
    const checkExpirationDate = valid.expirationDate(
      getValues("expirationDate")
    )
    if (checkExpirationDate.isValid) {
      clearErrors("expirationDate")
    } else {
      setError("expirationDate", {
        type: "manual",
        message: "Invalid expiration date",
      })
    }
  }

  return (
    <ModalContainer
      title="Add card details"
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 pt-4 pb-6 space-y-2">
          <div className="flex gap-2">
            <Image
              src={mastercard}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="mastercard"
            />
            <Image
              src={visa}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="visa"
            />
            <Image
              src={amex}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="amex"
            />
            <Image
              src={discover}
              width={500}
              height={500}
              className="h-5 w-auto"
              alt="discover"
            />
          </div>
          <div>
            <ErrorMessage
              title="Please check the following errors"
              errors={[
                ...(errors.cardNumber === undefined
                  ? []
                  : [errors.cardNumber.message as string]),
                ...(errors.cvv === undefined
                  ? []
                  : [errors.cvv.message as string]),
                ...(errors.expirationDate === undefined
                  ? []
                  : [errors.expirationDate.message as string]),
              ]}
            />
            <Input
              label="Card Number"
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              type="text"
              className="mb-2"
              disabled={isPending}
              {...register("cardNumber", {
                minLength: 10,
                maxLength: 20,
                required: "This field is required",
                onChange: (e) => {
                  const value = e.target.value
                  const trimmedValue = value.replace(/\s/g, "")
                  const spacedValue = trimmedValue.replace(/(.{4})/g, "$1 ")
                  setValue("cardNumber", String(spacedValue).trim())
                  validateCard()
                },
              })}
              required
            />

            <div className="grid grid-flow-col space-x-2">
              <Input
                label="Expiration date"
                id="expirationDate"
                placeholder="MM/YY"
                type="text"
                disabled={isPending}
                {...register("expirationDate", {
                  minLength: 5,
                  maxLength: 5,
                  required: "This field is required",
                  onChange: (e) => {
                    let value = e.target.value
                    if (e.nativeEvent.inputType === "deleteContentBackward") {
                      value = value.slice(0, -2)
                      setValue("expirationDate", value)
                    } else {
                      value = value.replace(/\//g, "")
                      const slashValue = value.replace(/(.{2})/g, "$1/")
                      const newValue = String(slashValue).trim()
                      if (newValue.length > 5) {
                        setValue("expirationDate", newValue.slice(0, -1))
                        validateExpirationDate()
                      } else {
                        setValue("expirationDate", newValue.trim())
                        validateExpirationDate()
                      }
                    }
                  },
                })}
                required
              />
              <Input
                label="CVV"
                id="cvv"
                type="number"
                placeholder="123"
                disabled={isPending}
                {...register("cvv", {
                  minLength: 3,
                  maxLength: 3,
                  required: "This field is required",
                  onChange: () => validateCvv(),
                })}
                required
              />
            </div>
          </div>
          <Input
            label="Cardholder Name"
            id="cardholderName"
            type="text"
            disabled={isPending}
            {...register("cardholderName", {
              required: "This field is required",
            })}
            required
          />
          <Input
            label="Zip code"
            id="zipCode"
            type="number"
            disabled={isPending}
            {...register("zipCode", {
              minLength: 4,
              required: "This field is required",
            })}
            required
          />
          <div>
            <Select
              {...register("country", {
                required: "This field is required",
              })}
              label="Country"
              required
            >
              <Option value={""}>Select Country</Option>
              {COUNTRIES.map((country) => (
                <Option key={country.code} value={country.code}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography className="text-sm text-text-300">
              Your card information will be encrypted while in transit to our
              server and will be stored securely. If you want to know more about
              how we do it, you can go to this{" "}
              <Link
                href="https://listings.pcisecuritystandards.org/pdfs/pci_fs_data_storage.pdf"
                className="underline text-primary-700 hover:text-text-500"
                target="_blank"
              >
                link
              </Link>
              .
            </Typography>
          </div>
        </div>
        <ModalContainerFooter
          isPending={isPending}
          isSubmit={true}
          positive="Save"
          negative="Cancel"
          onClose={onClose}
          buttonFn={() => null}
        />
      </form>
    </ModalContainer>
  )
}

export default AddCardDetailModal
