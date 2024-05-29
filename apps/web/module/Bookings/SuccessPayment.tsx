"use client"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { APP_NAME } from "@repo/constants"
import { LucideCheckCircle2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import useUpdateTransaction from "./hooks/useUpdateTransaction"
import toast from "react-hot-toast"

const SuccessPayment = () => {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { mutate } = useUpdateTransaction(params.bookingId)
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
  }, [])

  return (
    <WidthWrapper width="small" className="mt-32 lg:mt-36">
      <div className="flex flex-col gap-4 justify-center items-center">
        <LucideCheckCircle2 className="h-14 w-14 text-success-600" />
        <div className="text-center">
          <Typography variant="h1" fontWeight="semibold">
            Payment Succeed
          </Typography>
          <Typography>Your payment was successfully processed.</Typography>
          <Typography>
            Thank you for choosing {APP_NAME} for your trip.
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

export default SuccessPayment
