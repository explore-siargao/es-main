"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import React, { useState } from "react"
import CheckInOutModal from "@/module/Listing/property/modals/check-in-out-modal"
import GuestAddModal from "@/module/Listing/property/modals/guest-add-modal"
import PropertyPriceDetailsBox from "./price-details-box/property"
import RentalPriceDetailsBox from "./price-details-box/rental"
import usePaymentInfoStore from "./stores/use-payment-info-store"
import toast from "react-hot-toast"
import SubTotalBox from "../sub-total-box"
import { T_Add_To_Cart, T_Cart_Item } from "@repo/contract-2/cart"
import { useRouter, useSearchParams } from "next/navigation"
import { E_PaymentType } from "@repo/contract"
import { LucideChevronLeft } from "lucide-react"
import ActivityPriceDetailsBox from "./price-details-box/activity"
import ActivityMoreInfo from "./more-info/activity"
import PropertyMoreInfo from "./more-info/property"
import RentalMoreInfo from "./more-info/rental"
import { APP_NAME } from "@repo/constants"
import { EncryptionService, HMACService } from "@repo/services"
import { add } from "date-fns"
import SelectPayment from "./select-payment"
import useGetForPayment from "../hooks/use-get-for-payment"
import useAddCardForPayment from "../hooks/use-add-card-for-payment"
import useAddGCashForPayment from "../hooks/use-add-gcash-for-payment"
import useAddManualCardForPayment from "../hooks/use-add-manual-card-for-payment"
import { T_Add_For_Payment } from "@repo/contract-2/for-payment-listings"

const BookNow = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const { mutate } = useAddGCashForPayment()
  const { mutate: mutateUseAddManualCardPayment } = useAddManualCardForPayment()
  const { mutate: mutateUseAddCardPayment } = useAddCardForPayment()
  const paymentInfo = usePaymentInfoStore((state) => state)
  const forPaymentId = searchParams.get(`listingId`)
  const { data } = useGetForPayment(forPaymentId ?? "")
  const hmacService = new HMACService()
  const encryptionService = new EncryptionService("card")
  const allItems = data?.item ? [data.item as T_Cart_Item] : []
  const allSelectedItems = allItems.filter((item) => item._id && item.rentalIds)
  const rentalItems = allItems.filter((item) => item._id && item.rentalIds)
  const propertyItems = allItems.filter((item) => item._id && item.propertyIds)
  const activityItems = allItems.filter((item) => item._id && item.activityIds)

  const remapItem = (item: T_Cart_Item) => {
    return {
      startDate: item.startDate,
      endDate: item.endDate,
      guestCount: item.guestCount ?? 0,
      propertyIds: item.propertyIds
        ? {
            propertyId: item.propertyIds.propertyId?._id ?? undefined,
            unitId:
              Array.isArray(item.propertyIds.unitId?.qtyIds) &&
              item.propertyIds.unitId?.qtyIds?.[0]
                ? (item.propertyIds.unitId.qtyIds[0]._id ?? undefined)
                : undefined,
          }
        : null,
      activityIds: item.activityIds
        ? {
            ...item.activityIds,
            activityId: item.activityIds.activityId?._id ?? undefined,
          }
        : null,
      rentalIds: item.rentalIds
        ? {
            rentalId: item.rentalIds.rentalId?._id ?? undefined,
            qtyIdsId: item.rentalIds.qtyIdsId ?? undefined,
          }
        : undefined,
      id: item._id,
    }
  }

  const handleProceedToPayment = () => {
    const remappedItem = remapItem(data?.item as T_Cart_Item)

    if (paymentInfo.paymentType == E_PaymentType.GCASH) {
      mutate(remappedItem as T_Add_For_Payment, {
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
    if (paymentInfo.paymentType == E_PaymentType.CreditDebit) {
      if (
        paymentInfo.cardNumber &&
        paymentInfo.expirationMonth &&
        paymentInfo.expirationYear &&
        paymentInfo.cardholderName &&
        paymentInfo.country &&
        paymentInfo.cvv &&
        paymentInfo.zipCode
      ) {
        const cardInfo = {
          cardNumber: paymentInfo.cardNumber.replace(/\s+/g, ""),
          expirationMonth: paymentInfo.expirationMonth,
          expirationYear: paymentInfo.expirationYear,
          cardholderName: paymentInfo.cardholderName,
          country: paymentInfo.country,
          cvv: paymentInfo.cvv,
          zipCode: paymentInfo.zipCode,
        }
        const encryptCardInfo = encryptionService.encrypt(cardInfo)
        const cardInfoHMAC = hmacService.generateHMAC(cardInfo)
        const payload = {
          ...remappedItem,
          cardInfo: encryptCardInfo,
          hmac: cardInfoHMAC,
          expirationDate: add(new Date(), { seconds: 30 }),
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
      } else {
        toast.error("Please fill up the payment fields")
      }
    }
    if (paymentInfo.paymentType == E_PaymentType.SavedCreditDebit) {
      if (paymentInfo.paymentMethodId && paymentInfo.cvv) {
        const cvv = paymentInfo.cvv
        const cvvHMAC = hmacService.generateHMAC({ cvv })

        mutateUseAddCardPayment(
          {
            ...remappedItem,
            paymentMethodId: paymentInfo.paymentMethodId as string,
            cvv: paymentInfo.cvv as string,
            hmac: cvvHMAC,
            expirationDate: add(new Date(), { seconds: 30 }),
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
      } else {
        toast.error("Please fill up the cvv of your card")
      }
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
          {activityItems.length > 0 && (
            <ActivityMoreInfo items={activityItems} />
          )}
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
              selectedItemsPrice={allSelectedItems.map(
                (item) => item.price + item.guestComission
              )}
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

export default BookNow
