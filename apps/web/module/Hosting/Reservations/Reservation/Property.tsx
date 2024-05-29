import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/formatCurrency"
import { format } from "date-fns"
import React from "react"

const Property = (props: any) => {
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
          <span className="font-semibold">Guest count:</span>{" "}
          {props?.listing?.guestCount}
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
          {formatCurrency(props?.listing?.transaction?.earnings, "Philippines")}
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
      <div className="mt-3 border-b border-gray-200 pb-3">
        <Typography variant="h4" fontWeight="semibold" className="leading-6">
          Listing info
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Name:</span>{" "}
          {props?.listing?.property.name}
        </Typography>
        <Typography variant="h5" className="mt-2">
          <span className="font-semibold">Description:</span>{" "}
          {props?.listing?.property.description}
        </Typography>
      </div>
      <div className="mt-3">
        <Typography variant="h4" fontWeight="semibold" className="leading-6">
          Property unit/s
        </Typography>
        {props?.listing?.bookedUnits?.map((unit: any) => (
          <div className="flex gap-4">
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Name:</span> {unit.name}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Description:</span>{" "}
              {unit.description}
            </Typography>
            <Typography variant="h5" className="mt-2">
              <span className="font-semibold">Type:</span> {unit.type}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Property
