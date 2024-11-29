"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import valid, { number } from "card-validator"
import { ChevronLeft, LucideChevronLeft } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import PaymentOptions from "./PaymentOptions"
import useCheckInOutDateStore from "@/module/Listing/Property/store/useCheckInOutDateStore"
import useGuestAdd from "@/module/Listing/Property/store/useGuestsStore"
import CheckInOutModal from "@/module/Listing/Property/components/modals/CheckInOutModal"
import GuestAddModal from "@/module/Listing/Property/components/modals/GuestAddModal"
import { format } from "date-fns"
import { APP_NAME } from "@repo/constants"
import ListingPriceDetailsBox from "./ListingPriceDetailsBox"
import ConfirmPayModal from "./components/modals/ConfirmPayModal"
import usePaymentInfoStore from "./store/usePaymentInfoStore"
import { EncryptionService } from "@repo/services/"
import useSessionStore from "@/common/store/useSessionStore"
import useGetPaymentMethods from "@/module/AccountSettings/hooks/useGetPaymentMethods"
import toast from "react-hot-toast"
import { Step, Stepper } from "../components/stepper"
import SubTotalBox from "../components/SubTotalBox"
import { useCartStore } from "../stores/cart-stores"
import { T_Add_To_Cart } from "@repo/contract-2/cart"
import useAddGCashPayment from "../hooks/use-add-gcash-payment"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { E_PaymentType } from "@repo/contract"

const encryptionService = new EncryptionService("card")

const Pay = () => {
  const paymentInfo = usePaymentInfoStore((state) => state)
  const session = useSessionStore((state) => state)
  const { data: paymentMethods } = useGetPaymentMethods()
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )
  const [selectedPayment, setSelectedPayment] = useState<E_PaymentType | null>(
    null
  )
  const { selectedItems } = useCartStore()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmPayModalOpen, setIsConfirmPayModalOpen] = useState(false)
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
      activityIds: {
        ...item.activityIds,
        activityId: item.activityIds?.activityId._id,
      },
      rentalIds: {
        ...item.rentalIds,
        guestCount: item.guestCount ?? 0,
        rentalId: item.rentalIds?.rentalId._id,
      },
    }))
  }
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useAddGCashPayment()
  const remappedItems = remapItems(selectedItems)
  const steps: Step[] = [
    { label: "Choose Listings", status: "completed" },
    { label: "Summary", status: "completed" },
    { label: "Pay", status: "current" },
  ]
  const handleProceedToPayment = () => {
    if (selectedPayment == E_PaymentType.GCASH) {
      mutate(remappedItems, {
        onSuccess: (data: any) => {
          if (!data.error) {
            queryClient.invalidateQueries({
              queryKey: ["get-cart-item"],
            })
            router.push(data.item.action.link)
          } else {
            toast.error(String(data.message))
            console.log(data.items)
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      })
    }
  }

  const handleSelectedPayment = (selection: { type: E_PaymentType | null }) => {
    setSelectedPayment(selection.type)
  }

  return (
    <WidthWrapper width="medium" className="mt-4 md:mt-8 lg:mt-10">
      <Stepper steps={steps} />
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 mt-8">
        <div className="block xl:hidden">
          <ListingPriceDetailsBox items={selectedItems} />
        </div>
        <div className="flex-1 flex flex-col gap-y-4">
          {/* <Typography variant={"h2"} fontWeight="semibold">
            Your booking
          </Typography>
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
          <div className="flex w-full flex-col">
            <div className="flex justify-between w-full">
              <div className="font-semibold">Guests</div>
              <button
                type="button"
                className="underline hover:text-text-400 text-sm"
                onClick={() => setIsGuestsModalOpen(true)}
              >
                Edit
              </button>
            </div>
            <Typography className="text-sm">{`${totalGuest} guest${Number(totalGuest) > 1 ? "s" : ""}`}</Typography>
          </div> */}
          {/* <hr className="my-4" /> */}
          <PaymentOptions onSelectionChange={handleSelectedPayment} />
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
              buttonText="Pay Now"
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
      <ConfirmPayModal isOpen={isConfirmPayModalOpen} />
    </WidthWrapper>
  )
}

export default Pay
