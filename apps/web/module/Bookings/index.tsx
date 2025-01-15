"use client"
import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import Table from "../../common/components/Table"
import Image from "@/common/components/ui/image"
import { Typography } from "@/common/components/ui/Typography"
import { PaymentStatus } from "./SingleView/components/PaymentStatus"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
import { Spinner } from "@/common/components/ui/Spinner"
import { createColumnHelper } from "@tanstack/react-table"
import Tabs from "@/common/components/Tabs"
import bookingTabs from "./components/booking-tabs"
import useGetReservations, { T_Reservation_Status } from "./hooks/use-get-reservations"
import { T_Photo } from "@repo/contract"
import { isArray } from "lodash"
import { useRouter, useSearchParams } from "next/navigation"

interface BookingsProps {
  status: T_Reservation_Status;
}

const Bookings = ({ status }: BookingsProps) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const { data, isPending } = useGetReservations(status, page)
  const router = useRouter()
  const params = new URLSearchParams(searchParams.toString());  

  const nextPage = () => {
    params.set("page", String(page + 1));
    router.push(`?${params.toString()}`);
  };

  const previousPage = () => {
    params.set("page", String(page - 1 > 0 ? page - 1 : 1));
    router.push(`?${params.toString()}`);
  };
  

  const columnHelper = createColumnHelper<any>()
  const columns = [
    columnHelper.accessor("", {
      header: "Listing",
      cell: (listing) => {
        const listingRow = listing.row.original
        const listingData = listingRow.propertyIds
        ? listingRow.propertyIds?.unitId : listingRow.rentalIds 
        ? listingRow.rentalIds?.rentalId : listingRow.activityIds ? listingRow.activityIds?.activityId : null

        const photo =
        listing && isArray(listingData?.photos)
                    ? listingData?.photos.find((photo: T_Photo) => photo.isMain)
                    : ""


        return (
        // <Link href="/profile">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-16 rounded-xl overflow-hidden">
              <Image
                src={`/assets/${photo.key}`}
                alt="Image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <span>
              <Typography variant="p">
                {listingData?.title ? listingData?.title : listingData?.year + " " + listingData?.make + " " + listingData?.modelBadge} 
              </Typography>
            </span>
          </div>
        // </Link>
      )},
    }),
    columnHelper.accessor("guestCount", {
      header: "Guest Count",
      cell: (guestCount) => (
        <Typography variant="p">{guestCount.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("startDate", {
      header: "Date",
      cell: (dateRange) => {
        const fromDate = new Date(dateRange.getValue()).toLocaleDateString(
          "en-US",
          { month: "long", day: "2-digit" }
        )
        const toDate = new Date(
          dateRange.row.original.endDate
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
        return <Typography variant="p">{fromDate + " - " + toDate}</Typography>
      },
    }),
    columnHelper.accessor("", {
      header: "Location",
      cell: (location) => 
       { const locationRow = location.row.original
        const locationData = locationRow.propertyIds 
        ? locationRow.propertyIds?.propertyId?.location : locationRow.rentalIds 
        ? locationRow.rentalIds?.rentalId?.location : locationRow.activityIds ? locationRow.activityIds?.activityId?.meetingPoint : null

        const formattedAddress = [
          locationData?.streetAddress,
          locationData?.barangay,
          locationData?.city
        ]
          .filter(Boolean)
          .join(", ");

        return(
        <Typography variant="p">{formattedAddress}</Typography>
      )},
    }),
    columnHelper.accessor("price", {
      header: "Total Cost",
      cell: (totalCost) => (
        <Typography variant="p">{totalCost.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Payment Status",
      cell: (paymentStatus) => (
        <Link href="/payment-status">
          <div className="flex items-center">
            <span>
              <PaymentStatus />
            </span>
            <Typography variant="p">{paymentStatus.getValue()}</Typography>
          </div>
        </Link>
      ),
    }),
  ]



  return (
    <WidthWrapper width="medium" className="mt-10 w-full">
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : data?.items?.length !== 0 ? (
        <div>
          <div className="mb-12">
            <Typography
              variant="h1"
              fontWeight="semibold"
              className="flex justify-between items-center"
            >
              Your bookings
            </Typography>
          </div>
          <div className="mb-12">
          <Tabs tabs={bookingTabs} />
          </div>
          <Table data={data?.items || []} columns={columns} 
              pageIndex={page -1}
              pageCount={Math.ceil((data?.allItemCount || 0) / 15) }
              canPreviousPage={page - 1 > 0}
              canNextPage={
                page < Math.ceil((data?.allItemCount || 0) / 15)
              }
              previousPage={previousPage}
              nextPage={nextPage}
              pageSize={15} />
        </div>
      ) : (
        <div className="px-12">
          <Typography variant="h1" fontWeight="semibold">
            Trips
          </Typography>
          <hr className="mt-5 mb-5"></hr>
          <Typography variant="h1" fontWeight="semibold">
            No trips booked...yet!
          </Typography>
          <Typography
            variant="h4"
            fontWeight="semibold"
            className="text-gray-600"
          >
            Time to dust off your bags and start planning your next adventure
          </Typography>
          <Button variant="outline" size="lg" className="mt-3 font-semibold">
            Start searching
          </Button>
          <hr className="mt-12 mb-5"></hr>
          <Typography
            variant="h4"
            fontWeight="semibold"
            className="text-gray-600"
          >
            Can't find your reservation here?{" "}
            <button className="font-semibold underline text-gray-800">
              Visit the help center
            </button>
          </Typography>
        </div>
      )}
    </WidthWrapper>
  )
}

export default Bookings
