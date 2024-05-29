"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import {
  LucideBan,
  LucideChevronLeft,
  LucideEye,
  LucideMessageCircleMore,
  LucideMessageCircleQuestion,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import useGetReservation from "../hooks/useGetReservation"
import Property from "./Property"
import Rental from "./Rental"
import Activity from "./Activity"

const Reservation = () => {
  const params = useParams()
  const reservationId = params?.reservationId
  const { data } = useGetReservation(reservationId as string)
  return (
    <div className="mt-20 mb-28">
      <Link href={`/hosting/reservations/upcoming`}>
        <LucideChevronLeft className="text-text-300 hover:text-text-500 transition" />
      </Link>
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="flex justify-between items-center pb-4 mt-4"
      >
        Reservation
      </Typography>
      {data?.item?.listingType === "Property" && (
        <Property listing={data.item} />
      )}
      {data?.item?.listingType === "Rental" && <Rental listing={data.item} />}
      {data?.item?.listingType === "Activity" && (
        <Activity listing={data.item} />
      )}
      <div className="fixed bottom-0 z-10 bg-text-50 w-full p-4 bg-opacity-60">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            className="flex gap-2"
          >
            <LucideMessageCircleMore className="h-4 w-4" /> Message Guest
          </Button>
          <Link href="/accommodation/1" target="_blank">
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              className="flex gap-2"
            >
              <LucideEye className="h-4 w-4" /> View listing
            </Button>
          </Link>
          <Button
            size="sm"
            variant="danger"
            type="submit"
            className="flex gap-2"
          >
            <LucideBan className="h-4 w-4" /> Cancel
          </Button>
          <Button
            size="sm"
            variant="danger"
            type="submit"
            className="flex gap-2"
          >
            <LucideMessageCircleQuestion className="h-4 w-4" /> Request for
            Cancellation
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Reservation
