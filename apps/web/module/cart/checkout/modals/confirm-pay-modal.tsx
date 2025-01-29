import ModalContainer from "@/common/components/ModalContainer"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { T_AddBooking } from "@repo/contract"
import { useParams } from "next/navigation"
import { Spinner } from "@/common/components/ui/Spinner"
import useCheckInOutDateStore from "@/module/Listing/property/stores/use-check-in-out-date-store"
import useGuestsStore from "@/module/Listing/property/stores/use-guests-store"
import usePaymentInfoStore from "../stores/use-payment-info-store"
import useAddBooking from "../../hooks/use-add-booking"

interface ConfirmPayModalProps {
  isOpen: boolean
}

const ConfirmPayModal = ({ isOpen }: ConfirmPayModalProps) => {
  const params = useParams<{ listingId: string }>()
  const checkInCheckOut = useCheckInOutDateStore((state) => state)
  const guests = useGuestsStore((state) => state)
  const paymentInfo = usePaymentInfoStore((state) => state)
  const { mutate } = useAddBooking()
  useEffect(() => {
    if (isOpen) {
      const { cardInfo, lastFour, cardType, paymentType, paymentMethodId } =
        paymentInfo
      let payload = null
      const defaultPayload = {
        listingId: Number(params.listingId),
        paymentType: paymentType,
        adultCount: guests.guest.adults,
        childrenCount: guests.guest.children,
        infantCount: guests.guest.infants,
        fromDate: checkInCheckOut.dateRange.from,
        toDate: checkInCheckOut.dateRange.to,
      }
      if (paymentType === "CreditDebit") {
        payload = {
          ...defaultPayload,
          cardInfo,
          lastFour,
          cardType,
        }
      } else if (paymentType === "SavedCreditDebit") {
        payload = {
          ...defaultPayload,
          paymentMethodId,
          cardInfo,
          lastFour,
          cardType,
        }
      } else {
        payload = {
          ...defaultPayload,
        }
      }
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            if (data.action && data.action.link) {
              window.location.replace(data.action.link)
            } else {
              toast.success(data.message)
            }
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate({ ...payload } as T_AddBooking, callBackReq)
    }
  }, [isOpen])
  return (
    <ModalContainer isOpen={isOpen} size="auto" title="Completing Booking...">
      <div
        className={`flex h-full flex-1 flex-col justify-center items-center py-20 px-36`}
      >
        <Spinner variant="primary" />
      </div>
    </ModalContainer>
  )
}

export default ConfirmPayModal
