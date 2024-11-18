"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { LucideXCircle } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import useUpdateReservationStatus from "./hooks/update-reservation-status.ts"
import toast from "react-hot-toast"

const ErrorPayment = () => {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { mutate } = useUpdateReservationStatus(params.bookingId)
  useEffect(() => {
    if (params && params.bookingId) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (data.error) {
            router.push(`/bookings/${params.bookingId}`)
            toast.error(data.message)
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      mutate(undefined, callBackReq)
    }
  }, [params])
  return (
    <WidthWrapper width="small" className="mt-32 lg:mt-36">
      <div className="flex flex-col gap-4 justify-center items-center">
        <LucideXCircle className="h-14 w-14 text-error-600" />
        <div className="text-center">
          <Typography variant="h1" fontWeight="semibold">
            Error Payment
          </Typography>
          <Typography>
            We encounter error while processing your payment.
          </Typography>
          <Typography>
            If the problem persist, please contact your bank or our helpline.
          </Typography>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/bookings/${params.bookingId}`)}
        >
          Go to Booking
        </Button>
      </div>
    </WidthWrapper>
  )
}

export default ErrorPayment
