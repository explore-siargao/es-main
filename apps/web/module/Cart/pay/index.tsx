"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import valid, { number } from "card-validator"
import Link from "next/link"
import React, { useState } from "react"
import PaymentOptions from "./payment-options"
import useCheckInOutDateStore from "@/module/Listing/Property/store/useCheckInOutDateStore"
import useGuestAdd from "@/module/Listing/Property/store/useGuestsStore"
import CheckInOutModal from "@/module/Listing/Property/components/modals/CheckInOutModal"
import GuestAddModal from "@/module/Listing/Property/components/modals/GuestAddModal"
import { format } from "date-fns"
import { APP_NAME } from "@repo/constants"
import ListingPriceDetailsBox from "./ListingPriceDetailsBox"
import usePaymentInfoStore from "./store/usePaymentInfoStore"
import { EncryptionService } from "@repo/services/"
import useGetPaymentMethods from "@/module/AccountSettings/hooks/useGetPaymentMethods"
import toast from "react-hot-toast"
import SubTotalBox from "../components/sub-total-box"
import { useCartStore } from "../stores/cart-stores"
import { T_Add_To_Cart } from "@repo/contract-2/cart"
import useAddGCashPayment from "../hooks/use-add-gcash-payment"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { E_PaymentType } from "@repo/contract"
import GuestSection from "./guest-section"
import useAddManualCardPayment from "../hooks/use-add-manual-card-payment"
import useAddCardPayment from "../hooks/use-add-card-payment"
import { LucideChevronLeft } from "lucide-react"

const encryptionService = new EncryptionService("card")

const Pay = () => {
  const paymentInfo = usePaymentInfoStore((state) => state)

  const { data: paymentMethods } = useGetPaymentMethods()
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )

  const { selectedItems } = useCartStore()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)

  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const totalGuest = adults + children + infants
  const validatePayment = () => {
    let isValid = false
    const {
      expirationDate,
      cardNumber,
      cardholderName,
      cvv,
      country,
      zipCode,
      paymentMethodId,
    } = paymentInfo
    if (paymentInfo.paymentType === "GCASH") {
      isValid = true
    } else if (paymentInfo.paymentType === "CreditDebit") {
      if (
        expirationDate &&
        cardNumber &&
        cardholderName &&
        cvv &&
        country &&
        zipCode
      ) {
        const cardValid = valid.number(cardNumber)
        const splitExpiration = expirationDate.split("/")
        const encryptedCard = encryptionService.encrypt({
          cardNumber: cardNumber?.replace(/\s/g, ""),
          expirationMonth: splitExpiration[0],
          expirationYear: `20${splitExpiration[1]}`,
          cardholderName: cardholderName,
          country: country,
          zipCode: zipCode,
        })
        updatePaymentInfo({ key: "cardInfo", value: encryptedCard })
        updatePaymentInfo({ key: "lastFour", value: cardNumber?.slice(-4) })
        updatePaymentInfo({
          key: "cardType",
          value: cardValid?.card?.niceType ?? "Visa",
        })
        isValid = true
      }
    } else if (paymentInfo.paymentType === "SavedCreditDebit") {
      const selectedPaymentMethod = paymentMethods?.items?.find(
        (item) => item.id === paymentMethodId
      )
      if (selectedPaymentMethod) {
        updatePaymentInfo({
          key: "cardInfo",
          value: selectedPaymentMethod?.cardInfo,
        })
        updatePaymentInfo({
          key: "lastFour",
          value: selectedPaymentMethod?.lastFour,
        })
        updatePaymentInfo({
          key: "cardType",
          value: selectedPaymentMethod?.cardType,
        })
        isValid = true
      }
    }
    return isValid
  }

  const remapItems = (items: T_Add_To_Cart[]) => {
    return items.map((item) => ({
      ...item,
      guestCount: item.guestCount ?? 0,
      activityIds: item.activityIds
        ? {
            ...item.activityIds,
            // @ts-expect-error
            activityId: item.activityIds?.activityId._id ?? null,
          }
        : null,
      rentalIds: item.rentalIds
        ? {
            ...item.rentalIds,
            // @ts-expect-error
            rentalId: item.rentalIds?.rentalId._id ?? null,
          }
        : null,
    }))
  }
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useAddGCashPayment()
  const { mutate: mutateUseAddManualCardPayment } = useAddManualCardPayment()
  const { mutate: mutateUseAddCardPayment } = useAddCardPayment()
  const remappedItems = remapItems(selectedItems as T_Add_To_Cart[])

  const handleProceedToPayment = () => {
    if (paymentInfo.paymentType == E_PaymentType.GCASH) {
      mutate(remappedItems, {
        onSuccess: (data: any) => {
          if (!data.error) {
            queryClient.invalidateQueries({
              queryKey: ["get-cart-item"],
            })
            router.push(data.item.action.link)
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      })
    }
    if (paymentInfo.paymentType == E_PaymentType.CreditDebit) {
      const payload = {
        cardInfo: {
          cardNumber: paymentInfo.cardNumber.replace(/\s+/g, ""),
          expirationMonth: paymentInfo.expirationMonth,
          expirationYear: paymentInfo.expirationYear,
          cardholderName: paymentInfo.cardholderName,
          country: paymentInfo.country,
          cvv: paymentInfo.cvv,
          zipCode: paymentInfo.zipCode,
        },
        cartItems: remappedItems,
      }
      mutateUseAddManualCardPayment(payload, {
        onSuccess: (data: any) => {
          if (!data.error) {
            router.push(data.item.action.link)
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      })
    }
    if (paymentInfo.paymentType == E_PaymentType.SavedCreditDebit) {
      mutateUseAddCardPayment(
        {
          cartItems: remappedItems,
          cardId: paymentInfo.paymentMethodId as string,
          cvv: paymentInfo.cvv as string,
        },
        {
          onSuccess: (data: any) => {
            if (!data.error) {
              router.push(data.item.action.link)
            } else {
              toast.error(String(data.message))
            }
          },
          onError: (err: any) => {
            toast.error(String(err))
          },
        }
      )
    }
  }

  return (
    <WidthWrapper width="medium" className="mt-6 lg:mt-8">
      <div className="flex items-center gap-2">
        <Link href="/cart">
          <LucideChevronLeft className="h-5 w-5 text-text-400 transition hover:text-text-500" />
        </Link>
        <Typography variant={"h1"} fontWeight="semibold">
          Pay
        </Typography>
      </div>
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 mt-8">
        <div className="block xl:hidden">
          <ListingPriceDetailsBox items={selectedItems} />
        </div>
        <div className="flex-1 flex flex-col gap-y-4">
          <div className="flex w-full flex-col">
            <div className="flex justify-between w-full">
              <div className="font-semibold">Dates</div>
              <button
                type="button"
                className="underline hover:text-text-400 text-sm"
                onClick={() => setCheckInOutCalendarModalIsOpen(true)}
              >
                Edit
              </button>
            </div>
            <Typography className="text-sm">
              {dateRange.from
                ? format(new Date(dateRange.from), "LLL dd, y")
                : "Date from"}{" "}
              -{" "}
              {dateRange.to
                ? format(new Date(dateRange.to), "LLL dd, y")
                : "Date to"}
            </Typography>
          </div>
          <GuestSection />
          <hr className="my-4" />
          <PaymentOptions />
          <hr className="my-4" />
          <div className="flex flex-col gap-y-4">
            <Typography variant={"h2"} fontWeight="semibold">
              Cancellation policy
            </Typography>
            <div>
              <span className="font-semibold">
                Free cancellation before 2:00 PM on Feb 13.
              </span>{" "}
              Cancel before check-in on Feb 18 for a partial refund.{" "}
              <Link className="font-semibold underline" href="#">
                Learn more
              </Link>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex flex-col gap-y-4">
            <Typography variant={"h2"} fontWeight="semibold">
              Ground rules
            </Typography>
            <div>
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </div>
            <ul className="list-disc ml-6">
              <li>Follow the house rules</li>
              <li>Treat your Host’s home like your own</li>
            </ul>
          </div>
          <hr className="my-4" />
          <div className="text-xs">
            By selecting the button below, I agree to the{" "}
            <Link className="font-semibold underline" href="#">
              Host's House Rules
            </Link>
            ,{" "}
            <Link className="font-semibold underline" href="#">
              Ground rules for guests
            </Link>
            ,{" "}
            <Link className="font-semibold underline" href="#">
              {APP_NAME}'s Rebooking and Refund Policy
            </Link>
            , and that {APP_NAME} can{" "}
            <Link className="font-semibold underline" href="#">
              charge my payment method
            </Link>{" "}
            if I’m responsible for damage.
          </div>
        </div>
        <div className="hidden xl:block flex-1 xl:flex-none xl:w-1/3 md:relative">
          <div className="md:sticky md:top-0 space-y-4">
            <ListingPriceDetailsBox items={selectedItems} />
            <SubTotalBox
              selectedItemsPrice={selectedItems.map((item) => item.price)}
              buttonText="Pay now"
              onButtonClick={handleProceedToPayment}
            />
          </div>
        </div>
      </div>
      <CheckInOutModal
        isOpen={checkInOutCalendarModalIsOpen}
        onClose={() => setCheckInOutCalendarModalIsOpen(false)}
      />
      <GuestAddModal
        isOpen={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
      />
    </WidthWrapper>
  )
}

export default Pay
