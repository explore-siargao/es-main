"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import { Typography } from "@/common/components/ui/Typography"
import useGetGroupedReservations from "../hooks/use-get-group-reservations"
import { useSearchParams } from "next/navigation"
import { LucideChevronLeft } from "lucide-react"
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


const GroupBookings = () => {
  const searchParams = useSearchParams();
  const page = 1;
  const referenceId = searchParams?.get("referenceId") || "";
  const { data, isPending } = useGetGroupedReservations(page, referenceId)
  console.log(data)

  return (
    <WidthWrapper width="medium" className="mt-6 lg:mt-8">
      <div className="flex items-center gap-2">
        <Link href="/cart">
          <LucideChevronLeft className="h-5 w-5 text-text-400 transition hover:text-text-500" />
        </Link>
        <Typography variant={"h1"} fontWeight="semibold">
          Group Bookings
        </Typography>
      </div>
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      )  :
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8">
        <div className="flex-1 flex flex-col gap-y-4">
          <ViewPayment />
          <hr className="my-4" />
          {data?.item?.reservations?.some((reservation: T_Reservation) => reservation.propertyIds) && (
           <PropertyMoreInfo items={data.item.reservations} isViewOnly={true} />
          )}
           {data?.item?.reservations?.some((reservation: T_Reservation) => reservation.rentalIds) && (
           <RentalMoreInfo items={data.item.reservations} isViewOnly={true} />
          )}
           {data?.item?.reservations?.some((reservation: T_Reservation) => reservation.activityIds) && (
           <ActivityMoreInfo items={data.item.reservations} isViewOnly={true} />
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
          {data?.item?.reservations?.some((reservation: T_Reservation) => reservation.propertyIds) && (
          <PropertyPriceDetailsBox items={data?.item?.reservations} />
          )}
            {data?.item?.reservations?.some((reservation: T_Reservation) => reservation.activityIds) && (
              <ActivityPriceDetailsBox items={data?.item?.reservations} />
            )}
           {data?.item?.reservations?.some((reservation: T_Reservation) => reservation.rentalIds) && (
              <RentalPriceDetailsBox items={data?.item?.reservations} />
            )}
            <SubTotalBox
              selectedItemsPrice={data?.item?.totalPrice + data?.item?.totalGuestComission}
            />
          </div>
        </div>
      </div>
}
    </WidthWrapper>
  )
}

export default GroupBookings
