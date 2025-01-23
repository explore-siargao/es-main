"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import { useSearchParams } from "next/navigation"
import { APP_NAME } from "@repo/constants"
import PropertyMoreInfo from "@/module/cart/checkout/more-info/property"
import PropertyPriceDetailsBox from "@/module/cart/checkout/price-details-box/property"
import ActivityPriceDetailsBox from "@/module/cart/checkout/price-details-box/activity"
import RentalPriceDetailsBox from "@/module/cart/checkout/price-details-box/rental"
import SubTotalBox from "../components/sub-total-box"
import { T_Reservation } from "@repo/contract-2/reservations"
import RentalMoreInfo from "@/module/cart/checkout/more-info/rental"
import ActivityMoreInfo from "@/module/cart/checkout/more-info/activity"
import Link from "next/link"
import ViewPayment from "../components/view-payment"
import { Spinner } from "@/common/components/ui/Spinner"
import useGetReservations, {
  T_Reservation_Status,
} from "../hooks/use-get-reservations"
import { LucideChevronLeft } from "lucide-react"

const SingleBooking = () => {
  const searchParams = useSearchParams()
  const page = 1
  const referenceId = searchParams?.get("referenceId") || ""
  const status = (searchParams?.get("status") as T_Reservation_Status) || ""
  const { data, isPending } = useGetReservations(status, page, referenceId)

  const enhancedItem = {
    ...data?.item,
    status: data?.item?.status || "Active",
    price: data?.item?.price || 0,
    startDate: data?.item?.startDate || "",
    endDate: data?.item?.endDate || "",
    guestComission: data?.item?.guestComission || 0,
    hostComission: data?.item?.hostComission || 0,
  }

  return (
    <WidthWrapper width="medium" className="mt-6 lg:mt-8">
      <div className="flex items-center gap-2">
        <Link
          href={`/bookings/${status === "Done" ? "finished" : status.toLowerCase()}`}
        >
          <LucideChevronLeft className="h-5 w-5 text-text-400 transition hover:text-text-500" />
        </Link>
        <Typography variant={"h1"} fontWeight="semibold">
          {status === "Done" ? "Finished" : status} booking
        </Typography>
      </div>
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8">
          <div className="flex-1 flex flex-col gap-y-4">
            <ViewPayment paymentDetails={data?.item?.paymentDetails} />
            <hr className="my-4" />
            {data?.item && (
              <>
                {data.item.propertyIds && (
                  <PropertyMoreInfo items={[enhancedItem]} isViewOnly={true} />
                )}
                {data.item.rentalIds && (
                  <RentalMoreInfo items={[enhancedItem]} isViewOnly={true} />
                )}
                {data.item.activityIds && (
                  <ActivityMoreInfo items={[enhancedItem]} isViewOnly={true} />
                )}
              </>
            )}
          </div>
          <div className="hidden xl:block flex-1 xl:flex-none xl:w-1/3 md:relative">
            <div className="md:sticky top-10 space-y-4">
              {data?.item && (
                <>
                  {data.item.propertyIds && (
                    <PropertyPriceDetailsBox
                      singleView={true}
                      items={[enhancedItem]}
                    />
                  )}
                  {data.item.activityIds && (
                    <ActivityPriceDetailsBox
                      singleView={true}
                      items={[enhancedItem]}
                    />
                  )}
                  {data.item.rentalIds && (
                    <RentalPriceDetailsBox
                      singleView={true}
                      items={[enhancedItem]}
                    />
                  )}
                </>
              )}
              <div className="my-4">
                <Link
                  className="font-semibold underline"
                  href={`/bookings/group?referenceId=${data?.item?.xendItPaymentReferenceId}`}
                >
                  View group booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </WidthWrapper>
  )
}

export default SingleBooking
