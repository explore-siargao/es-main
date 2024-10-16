"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { LucideEye } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import useGetPropertyById from "../../hooks/useGetPropertyById"
import { E_Property_Status } from "@repo/contract/build/Property/enum"
import toast from "react-hot-toast"
import useUpdatePropertyStatusById from "../../hooks/useUpdatePropertyStatusById"
import { Spinner } from "@/common/components/ui/Spinner"
import {
  T_BookableUnitType,
  T_Photo,
  T_Property_Facility,
  T_Property_Policy,
} from "@repo/contract"
import Image from "@/common/components/ui/image"
import { cn } from "@/common/helpers/cn"

const Summary = () => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isPending } = useGetPropertyById(listingId)
  const { mutate } = useUpdatePropertyStatusById(listingId)
  const property = data?.item
  const handleSubmit = async () => {
    const newStatus = { status: E_Property_Status.pending }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success("Property submitted for review")
          router.push(`/hosting/listings/properties/${listingId}/property-type`)
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    await mutate(newStatus, callBackReq)
  }

  const filteredPolicies = data?.item?.policies.filter(
    (policy: T_Property_Policy) =>
      policy.isSelected === true &&
      !(policy.category === "Additional Rules" && !policy.policy)
  )

  return (
    <div className="mt-20 mb-28">
      {isPending ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <>
          <Typography
            variant="h1"
            fontWeight="semibold"
            className="flex justify-between items-center pb-4"
          >
            Summary
          </Typography>
          <div className="mt-4">
            <div className="border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Property Type
              </Typography>
              {data?.item ? (
                <Typography variant="h5" className="mt-2">
                  {data?.item?.type}
                </Typography>
              ) : (
                <Typography variant="h5" className="mt-2">
                  No data available.
                </Typography>
              )}
            </div>
            {data?.item?.type === "WHOLE_PLACE" ? (
              <div className="pt-3 border-b border-gray-200 pb-3">
                <Typography
                  variant="h4"
                  fontWeight="semibold"
                  className="leading-6"
                >
                  Whole Place Type
                </Typography>
                {data?.item ? (
                  <Typography variant="h5" className="mt-2">
                    {data?.item?.wholeplaceType}
                  </Typography>
                ) : (
                  <Typography variant="h5" className="mt-2">
                    No data available.
                  </Typography>
                )}
              </div>
            ) : null}

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Basic info
              </Typography>
              {data?.item ? (
                <>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Title:</span>{" "}
                    {data?.item?.title}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Description:</span>{" "}
                    <div className="flex break-all whitespace-normal  w-1/2">
                      {data?.item?.description}
                    </div>
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" className="mt-2">
                  No data found
                </Typography>
              )}
            </div>

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Location
              </Typography>
              {data?.item?.location ? (
                <>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Street Address:</span>{" "}
                    {data?.item?.location?.streetAddress}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">City / Municipality:</span>{" "}
                    {data?.item?.location?.city}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Barangay / District:</span>{" "}
                    {data?.item?.location?.barangay}
                  </Typography>
                  <div className="w-1/2">
                    <Typography variant="h5" className="mt-2">
                      <span className="font-semibold">How to get there:</span>{" "}
                      <div className="flex break-all whitespace-normal">
                        {data?.item?.location?.howToGetThere}
                      </div>
                    </Typography>
                  </div>
                </>
              ) : (
                <Typography variant="h5" className="mt-2">
                  No data available.
                </Typography>
              )}
            </div>

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Property Facilities
              </Typography>
              {data?.item?.facilities.length > 0 ? (
                <ol className="list-decimal text-sm space-y-2 mt-2 ml-3.5">
                  {data?.item?.facilities
                    .filter(
                      (facility: T_Property_Facility) =>
                        facility.isSelected === true
                    )
                    .map((facility: T_Property_Facility) => (
                      <li key={facility._id}>
                        <Typography variant="h5">
                          <span className="font-semibold">Category:</span>{" "}
                          {facility.category}
                        </Typography>
                        <Typography variant="h5" className="mt-1">
                          <span className="font-semibold">Facility:</span>{" "}
                          {facility.facility}
                        </Typography>
                      </li>
                    ))
                    .sort((a: T_Property_Facility, b: T_Property_Facility) => {
                      if (a.category < b.category) {
                        return -1
                      }
                      if (a.category > b.category) {
                        return 1
                      }
                      return 0
                    })}
                </ol>
              ) : (
                <Typography variant="h5" className="mt-2">
                  No data available.
                </Typography>
              )}
            </div>

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Units
              </Typography>
              {data?.item?.bookableUnits?.length > 0 ? (
                <ol className="list-decimal text-sm space-y-2 mt-2 ml-3.5">
                  {data?.item?.bookableUnits
                    .filter(
                      (unit: T_BookableUnitType) =>
                        unit.title || unit.subtitle !== ""
                    )
                    .sort((a: T_BookableUnitType, b: T_BookableUnitType) => {
                      if (a.category < b.category) {
                        return -1
                      }
                      if (a.category > b.category) {
                        return 1
                      }
                      return 0
                    })
                    .map((unit: T_BookableUnitType) => (
                      <li key={unit?._id}>
                        <Typography variant="h5">
                          {unit.category === "Bed"
                            ? `${unit.subtitle} - ${unit.qty}(qty)`
                            : unit.category === "Room"
                              ? `${unit.title} - ${unit.qty}(qty)`
                              : `${unit.title} - ${unit.totalSize}(sqm)`}
                        </Typography>
                      </li>
                    ))}
                </ol>
              ) : (
                <Typography variant="h5" className="mt-2">
                  No data available.
                </Typography>
              )}
            </div>

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Photos
              </Typography>
              <div className="grid grid-cols-4 gap-6 mt-6">
                {property?.photos.map((photo: T_Photo, index: number) => (
                  <div key={index} className="h-full">
                    {photo.isMain && (
                      <div className="flex justify-center">
                        <span className="absolute mt-[-16px] z-10 rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                          Preferred main photo
                        </span>
                      </div>
                    )}
                    <div
                      className={cn(
                        `relative h-52 w-full bg-primary-50 rounded-xl`,
                        photo.isMain && "border-2 border-secondary-500"
                      )}
                    >
                      <Image
                        src={"/assets/" + photo.key}
                        alt={`preview-` + index}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-xl"
                      />
                    </div>
                    <Typography
                      className={`${photo.description ? "text-gray-900" : "text-gray-500"} text-sm mt-3 truncate`}
                    >
                      {photo.description || "No description"}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="mt-3 border-b border-gray-200 pb-3">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="leading-6"
            >
              Pricing
            </Typography>
            <div className="grid grid-cols-4 gap-6 mt-2">
              {item.pricing.map((pricing, pricingIndex) => (
                <div key={pricingIndex}>
                  <Typography variant="h5">
                    <span className="font-semibold">Unit: </span>
                    {pricing.unit}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Base rate: </span>
                    {pricing.baseRate}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">
                      Base rate maximum capacity:{" "}
                    </span>
                    {pricing.baseRateMaxCapacity}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">Maximum capacity: </span>
                    {pricing.maxAddPerson}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">
                      Price per additional person:{" "}
                    </span>
                    {pricing.priceAddPerson}
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    <span className="font-semibold">
                      Discounts (Weekly Rate):{" "}
                    </span>
                    {pricing.weeklyRateDiscount}
                  </Typography>
                </div>
              ))}
            </div>
          </div> */}

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Property Policies
              </Typography>
              {filteredPolicies.length > 0 ? (
                <ol className="list-decimal text-sm space-y-2 mt-2 ml-3.5">
                  {filteredPolicies
                    .sort((a: T_Property_Policy, b: T_Property_Policy) => {
                      if (a.category < b.category) {
                        return -1
                      }
                      if (a.category > b.category) {
                        return 1
                      }
                      return 0
                    })
                    .map((policy: T_Property_Policy) => (
                      <li key={policy._id}>
                        <Typography variant="h5">
                          <span className="font-semibold">Category:</span>{" "}
                          {policy.category}
                        </Typography>
                        <Typography variant="h5" className="mt-1">
                          <span className="font-semibold">Policy:</span>{" "}
                          {policy.policy}
                        </Typography>
                        <Typography variant="h5" className="mt-1">
                          <span className="font-semibold">Reason:</span>{" "}
                          {policy.reason}
                        </Typography>
                      </li>
                    ))}
                </ol>
              ) : (
                <Typography variant="h5" className="mt-2">
                  No data available.
                </Typography>
              )}
            </div>
          </div>
          <div className="fixed bottom-0 z-10 bg-text-50 w-full p-4 bg-opacity-60">
            <div className="flex gap-2">
              <Button size="sm" type="submit" onClick={handleSubmit}>
                Submit for review
              </Button>
              <Link href="/accommodation/1" target="_blank">
                <Button
                  size="sm"
                  variant="secondary"
                  type="submit"
                  className="flex gap-2"
                >
                  <LucideEye className="h-4 w-4" /> Preview listing
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Summary
