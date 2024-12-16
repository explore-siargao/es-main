import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/format-currency"
import { format } from "date-fns"
import React from "react"
import transmissionAcronym from "../../Listings/helpers/transmissionAcronym"

const Rental = (props: any) => {
  return (
    <div className="mt-4">
      <div className="mt-3 border-b border-gray-200 pb-3">
        <Typography variant="h4" fontWeight="semibold" className="leading-6">
          Basic info
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Reserved by:</span>{" "}
          {props?.listing?.host?.firstName} {props?.listing?.host?.firstName}
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Date Range:</span>{" "}
          {props?.listing?.startDate
            ? format(new Date(props?.listing?.startDate), "MMM dd, yyyy")
            : "---"}{" "}
          -{" "}
          {props?.listing?.endDate
            ? format(new Date(props?.listing?.endDate), "MMM dd, yyyy")
            : "---"}
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Amount Paid:</span>{" "}
          {formatCurrency(props?.listing?.transaction?.earnings)}
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Payment Method:</span>{" "}
          {props?.listing?.paymentType}
        </Typography>
      </div>
      <div className="border-b border-gray-200 pb-3 mt-4">
        <Typography variant="h4" fontWeight="semibold" className="leading-6">
          Listing type
        </Typography>
        <Typography variant="h5" className="mt-2">
          {props?.listing?.listingType}
        </Typography>
      </div>
      <div className="mt-3">
        <Typography variant="h4" fontWeight="semibold" className="leading-6">
          Listing info
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Name:</span>{" "}
          {props?.listing?.rental.year} {props?.listing?.rental.make}{" "}
          {props?.listing?.rental.modelBadge}{" "}
          {props?.listing?.rental.category !== "Bicycle" &&
            `(${transmissionAcronym(props?.listing?.rental.transmission)})`}
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Category:</span>{" "}
          {props?.listing?.rental.category}
        </Typography>
      </div>
    </div>
  )
}

export default Rental
