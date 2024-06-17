"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import { LucideEye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { T_Activity, T_Activity_Segment, T_Photo } from "@repo/contract"

import toast from "react-hot-toast"
import { Spinner } from "@/common/components/ui/Spinner"
import { E_Activity_Status } from "@repo/contract/build/Activities/enum"
import useUpdateActivityStatus from "../../hooks/useUpdateActivityStatus"
import useGetActivityById from "../../hooks/useGetActivityById"

const ActivitySummary = () => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId as string)
  const { data, isPending } = useGetActivityById(listingId)
  const activity = data?.item
  const { mutate } = useUpdateActivityStatus(listingId as string)

  const handleSubmit = async () => {
    const newStatus = { status: E_Activity_Status.pending }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success("Activity submitted for review")
          router.push(`/hosting/listings/activities/${listingId}/basic-info`)
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

  return (
    <div className="mt-20 mb-28">
      {isPending ? (
        <Spinner>Loading</Spinner>
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
            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Basic Information
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">Title:</span>{" "}
                {data?.item?.title}
              </Typography>
              <Typography variant="h5" className="mt-2">
                {" "}
                <span className="font-semibold">Description:</span>{" "}
                {data?.item?.description}
              </Typography>

              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">Highlights:</span>
                <div className="flex flex-col">
                  {data?.item?.highLights.map((highLights: T_Activity) => (
                    <p className="mt-2" key={highLights.id}>
                      {" "}
                      {highLights as unknown as string}
                    </p>
                  ))}
                </div>
              </Typography>

              <Typography variant="h5" className="mt-2">
                {" "}
                <span className="font-semibold">Activity Duration:</span> <br />
                {data?.item?.durationHour} Hour(s) <br />
                {data?.item?.durationMinute} Minute(s)
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">Languages spoken:</span>
                <div className="flex flex-col">
                  {data?.item?.languages.map((languages: T_Activity) => (
                    <p className="mt-2" key={languages.id}>
                      {" "}
                      {languages as unknown as string}
                    </p>
                  ))}
                </div>
              </Typography>
            </div>
            {/* <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Itinerary
              </Typography>
              <div className="grid grid-cols-4 gap-6 mt-6">
                {data?.item?.segments.map((segment: T_Activity_Segment) => {
                  return (
                    <>
                      <div className="ml-4 w-[2px] h-12 bg-primary-600 mt-2"></div>
                      <div
                        className={`mt-2 shadow-md rounded-lg p-4 border ${segment.transfer ? "border-secondary-200" : "border-primary-500"} `}
                      >
                        <Typography variant="h4">
                          {segment.transfer
                            ? `Transfer via ${segment.transfer} 
                  (${segment.durationHour > 0 ? segment.durationHour + "h" : ""}${segment.durationMinute > 0 ? segment.durationMinute + "m" : ""})`
                            : segment.location}
                        </Typography>
                        <p className="text-text-400 text-sm">
                          {segment.activities?.join(", ")}{" "}
                          {segment.activities
                            ? `(${segment.durationHour > 0 ? segment.durationHour + "h" : ""}${segment.durationMinute > 0 ? " " + segment.durationMinute + "m" : ""})`
                            : ""}
                        </p>
                        <p className="text-text-400 text-sm">
                          {segment.optional && "Optional"}
                          {segment.hasAdditionalFee && ", Extra Fee"}
                        </p>
                      </div>
                    </>
                  )
                })}
              </div>
            </div> */}

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Inclusions
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">
                  Is food included in your activity?:
                </span>
                {data?.item?.isFoodIncluded === true ? (
                  <>
                    <Typography>Yes</Typography>
                    <Typography
                      variant="h5"
                      className="mt-2"
                      fontWeight="semibold"
                    >
                      Selected Food:
                    </Typography>
                    {data?.item?.selectedFoodOptions}
                  </>
                ) : (
                  <Typography>No</Typography>
                )}
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">
                  Are non-alcoholic drinks included in your activity?:
                </span>
                {data?.item?.isNonAlcoholicDrinkIncluded === true ? (
                  <>
                    <Typography>Yes</Typography>
                    <Typography>
                      {data?.item?.selectedAlcoholicDrinkOptions}
                    </Typography>
                  </>
                ) : (
                  <Typography>No</Typography>
                )}
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">
                  Is alcoholic drinks included in your activity (18+)?:
                </span>
                {data?.item?.isAlcoholicDrinkIncluded === true ? (
                  <>
                    <Typography>Yes</Typography>
                    <Typography
                      variant="h5"
                      className="mt-2"
                      fontWeight="semibold"
                    >
                      Selected alcoholic drinks:
                    </Typography>{" "}
                    {data?.item?.selectedAlcoholicDrinkOptions}
                  </>
                ) : (
                  <Typography>No</Typography>
                )}
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">
                  What else is included in your activity?:
                </span>
                <div className="flex flex-col">
                  {data?.item?.otherInclusion.map(
                    (otherInclusion: T_Activity) => (
                      <p className="mt-2" key={otherInclusion.id}>
                        {" "}
                        {otherInclusion as unknown as string}
                      </p>
                    )
                  )}
                </div>
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">
                  {" "}
                  What else is not included?:
                </span>
                <div className="flex flex-col">
                  {data?.item?.notIncluded.map((notIncluded: T_Activity) => (
                    <p className="mt-2" key={notIncluded.id}>
                      {" "}
                      {notIncluded as unknown as string}
                    </p>
                  ))}
                </div>
              </Typography>
            </div>

            <div className="mt-3 border-b border-gray-200 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Additional Info
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">What to bring:</span>
                <div className="flex flex-col">
                  {data?.item?.whatToBring.map((whatToBring: T_Activity) => (
                    <p className="mt-2" key={whatToBring.id}>
                      {" "}
                      {whatToBring as unknown as string}
                    </p>
                  ))}
                </div>
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">Not allowed:</span>
                <div className="flex flex-col">
                  {data?.item?.notAllowed.map((notAllowed: T_Activity) => (
                    <p className="mt-2" key={notAllowed.id}>
                      {" "}
                      {notAllowed as unknown as string}
                    </p>
                  ))}
                </div>
              </Typography>
              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">Activity policies:</span>
                <div className="flex flex-col">
                  {data?.item?.policies.map((policies: T_Activity) => (
                    <p className="mt-2" key={policies.id}>
                      {" "}
                      {policies as unknown as string}
                    </p>
                  ))}
                </div>
              </Typography>

              <Typography variant="h5" className="mt-2">
                <span className="font-semibold">Cancellation policy:</span>{" "}
                {data?.item?.cancellationDays}
              </Typography>
            </div>
            <div className="mt-3 pb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="leading-6"
              >
                Photos
              </Typography>
              <div className="grid grid-cols-4 gap-6 mt-3">
                {data?.item?.photos?.map((photo: T_Photo, index: number) => (
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
                        `relative h-52 w-full bg-primary-50 rounded-lg`,
                        photo.isMain && "border-2 border-secondary-500"
                      )}
                    >
                      <Image
                        src={"/assets/" + photo.key}
                        alt={`preview-` + index}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-lg"
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

export default ActivitySummary
