"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import React, { useState } from "react"
import useCheckInOutDateStore from "@/module/Listing/Property/store/useCheckInOutDateStore"
import CheckInOutModal from "@/module/Listing/Property/components/modals/CheckInOutModal"
import GuestAddModal from "@/module/Listing/Property/components/modals/GuestAddModal"
import PropertyPriceDetailsBox from "./property-price-details-box"
import RentalPriceDetailsBox from "./rental-price-details-box"
import usePaymentInfoStore from "./store/usePaymentInfoStore"
import toast from "react-hot-toast"
import SubTotalBox from "../components/sub-total-box"
import { useCartStore } from "../stores/cart-stores"
import { T_Add_To_Cart } from "@repo/contract-2/cart"
import useAddGCashPayment from "../hooks/use-add-gcash-payment"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { E_PaymentType } from "@repo/contract"
import useAddManualCardPayment from "../hooks/use-add-manual-card-payment"
import useAddCardPayment from "../hooks/use-add-card-payment"
import { LucideChevronLeft } from "lucide-react"
import useGetCartItems from "../hooks/use-get-cart-items"
import ActivityPriceDetailsBox from "./activity-price-details-box"
import SelectPayment from "./select-payment"
import PropertyMoreInfo from "./property-more-info"
import RentalMoreInfo from "./rental-more-info"
import { APP_NAME } from "@repo/constants"

const Checkout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const { data, isLoading } = useGetCartItems()
  const { selectedItems } = useCartStore()
  const { mutate, isPending } = useAddGCashPayment()
  const { mutate: mutateUseAddManualCardPayment } = useAddManualCardPayment()
  const { mutate: mutateUseAddCardPayment } = useAddCardPayment()
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const paymentInfo = usePaymentInfoStore((state) => state)
  const cartIdsSearch = searchParams.get(`cartIds`)
  const cartIds = cartIdsSearch ? cartIdsSearch.split(",") : []

  const allItems = data?.items || []
  const allSelectedItems =
    allItems.filter((item) => item._id && cartIds.includes(item._id)) || []
  const rentalItems =
    allItems.filter(
      (item) => item._id && cartIds.includes(item._id) && item.rentalIds
    ) || []
  const propertyItems =
    allItems.filter(
      (item) => item._id && cartIds.includes(item._id) && item.propertyIds
    ) || []
  const activityItems =
    allItems.filter(
      (item) => item._id && cartIds.includes(item._id) && item.activityIds
    ) || []

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

  const remappedItems = remapItems(allSelectedItems as T_Add_To_Cart[])

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
          Checkout
        </Typography>
      </div>
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8">
        <div className="flex-1 flex flex-col gap-y-4">
          <SelectPayment />
          <hr className="my-4" />
          {propertyItems.length > 0 && (
            <PropertyMoreInfo items={propertyItems} />
          )}
          {rentalItems.length > 0 && <RentalMoreInfo items={rentalItems} />}
          <hr className="my-4" />
          <Typography variant="h6" className="text-text-500">
            By selecting the Pay now button on this page, I agree to the{" "}
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
          </Typography>
        </div>
        <div className="hidden xl:block flex-1 xl:flex-none xl:w-1/3 md:relative">
          <div className="md:sticky top-10 space-y-4">
            {propertyItems.length > 0 && (
              <PropertyPriceDetailsBox items={propertyItems} />
            )}
            {activityItems.length > 0 && (
              <ActivityPriceDetailsBox items={activityItems} />
            )}
            {rentalItems.length > 0 && (
              <RentalPriceDetailsBox items={rentalItems} />
            )}
            <SubTotalBox
              selectedItemsPrice={allSelectedItems.map((item) => item.price)}
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

export default Checkout
