"use client"
import React, { useEffect, useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import SpecificMap from "@/common/components/SpecificMap"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import { Spinner } from "@/common/components/ui/Spinner"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Textarea } from "@/common/components/ui/Textarea"
import GoogleMapIcon from "@/common/assets/googleMapIcon.png"
import AppleMapIcon from "@/common/assets/appleMapIcon.png"
import Image from "next/image"
import Link from "next/link"
import { Option, Select } from "@/common/components/ui/Select"
import { MUNICIPALITIES, BARANGAYS } from "@repo/constants"
import { useCoordinatesStore } from "@/common/store/useCoordinateStore"
import { useParams, useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/common/helpers/cn"
import { T_Activity_Segment, T_Location } from "@repo/contract"
import Builder from "./Builder"
import ToggleSwitch from "@/common/components/ui/Toggle"
import { useSegmentsStore } from "./store/useSegmentsStore"
import useUpdateActivityItinerary from "../../hooks/useUpdateActivityItinerary"
import useGetActivitiesById from "@/module/Admin/Activity/hooks/useGetActivitiesById"

type Prop = {
  pageType: "setup" | "edit"
}

type T_Activity_Itinerary = {
  meetingPoint: T_Location
  isSegmentBuilderEnabled: boolean
  segments: T_Activity_Segment[]
}

const Itinerary = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { mutate, isPending } = useUpdateActivityItinerary(listingId)



  const { data, isPending: activityIsLoading } = useGetActivitiesById(listingId) // update this for activity
  const { latitude, longitude } = useCoordinatesStore()
  const updateSegment = useSegmentsStore((state) => state.updateSegments)
  const updateBarangayOptions = (e: { target: { value: string } }) => {
    const selectedMunicipality = e.target.value
    setSelectedMunicipality(selectedMunicipality)
  }
  const { register, handleSubmit, watch } = useForm<T_Activity_Itinerary>({
    defaultValues: {
      meetingPoint: data?.item?.meetingPoint,
      isSegmentBuilderEnabled: data?.item?.isSegmentBuilderEnabled ?? false,
      segments: data?.item?.segments ?? [],
    },

  const [isToggled, setIsToggled] = useState(
    data?.item?.isSegmentBuilderEnabled ?? false
  )


  const onSubmit: SubmitHandler<T_Activity_Itinerary> = (
    formData: T_Activity_Itinerary
  ) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["property-finished-sections", listingId],
          })
          if (pageType === "setup") {
            router.push(
              `/hosting/listings/activities/setup/${listingId}/inclusions`
            )
          }
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }

    const updatedMeetingPoint: T_Location = {
      ...formData.meetingPoint,
      latitude: latitude ?? 9.913431,
      longitude: longitude ?? 126.049483,
    }

    mutate(
      {
        ...formData,
        meetingPoint: updatedMeetingPoint,
        isSegmentBuilderEnabled: isToggled,
        segments: segments,
      },
      callBackReq
    )
  }

  const currentCoords = (
    data?.item?.meetingPoint?.latitude
      ? [
          data?.item?.meetingPoint?.longitude,
          data?.item?.meetingPoint?.latitude,
        ]
      : [9.913431, 126.049483]
  ) as [number, number]

  const street = watch("meetingPoint.street", data?.item?.meetingPoint?.street)
  const segments = watch("segments", data?.item?.segments)
  const city = watch("meetingPoint.city", data?.item?.meetingPoint?.city)
  const brgy = watch(
    "meetingPoint.barangay",
    data?.item?.meetingPoint?.barangay
  )
  const howToGetThere = watch(
    "meetingPoint.barangay",
    data?.item?.meetingPoint?.howToGetThere
  )
  const toggled = watch(
    "isSegmentBuilderEnabled",
    data?.item?.isSegmentBuilderEnabled
  )
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    activityIsLoading || !city ? "" : city
  )
  const [isToggled, setIsToggled] = useState(
    activityIsLoading ? false : toggled
  )

  useEffect(() => {
    if (!activityIsLoading) {
      setIsToggled(toggled)
      segments.forEach((segment) => {
        updateSegment(segment)
      })
    }
  }, [activityIsLoading, toggled])

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div className="mt-20 mb-36">
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <Typography
              variant="h1"
              fontWeight="semibold"
              className="flex justify-between items-center"
            >
              Itinerary
            </Typography>
          </div>
          <Typography variant="h3" fontWeight="semibold" className="mb-2">
            Meeting Point
          </Typography>
          <div className="flex flex-col justify-center">
            <SpecificMap
              center={currentCoords}
              mapHeight={"h-[450px]"}
              mapWidth={"w-full"}
              zoom={11}
            />
          </div>
          <Typography variant="p" className="italic text-gray-500 text-xs mt-2">
            You can drag and drop the yellow marker above to set your exact
            location on the map
          </Typography>
          <div className="flex mt-8 gap-12 flex-wrap">
            <div className="flex flex-col w-full md:w-2/3 gap-2 max-w-lg">
              <Typography variant="h3" fontWeight="semibold">
                Address
              </Typography>
              <Input
                type="text"
                id="street"
                label="Street address"
                required
                defaultValue={street}
                disabled={activityIsLoading}
                {...register("meetingPoint.street", { required: true })}
              />
              <Select
                label="City / Municipality"
                id="municipalitySelect"
                defaultValue={selectedMunicipality}
                required
                {...register("meetingPoint.city", { required: true })}
                onChange={updateBarangayOptions}
              >
                <Option value="">Select municipality</Option>
                {MUNICIPALITIES.map((municipality) => (
                  <Option
                    key={municipality.name}
                    value={municipality.name}
                    selected={municipality.name === city}
                  >
                    {municipality.name}
                  </Option>
                ))}
              </Select>
              <Select
                label="Barangay / District"
                id="barangaySelect"
                required
                {...register("meetingPoint.barangay", { required: true })}
              >
                <Option value="">Select barangay</Option>
                {BARANGAYS.filter(
                  (barangay) =>
                    barangay.municipality === selectedMunicipality ||
                    barangay.municipality === city
                ).map((barangay) => (
                  <Option
                    key={barangay.name}
                    value={barangay.name}
                    selected={brgy === barangay.name}
                  >
                    {barangay.name}
                  </Option>
                ))}
              </Select>
              <div className="mt-2">
                <Typography variant="h3" fontWeight="semibold">
                  How to get there
                </Typography>
                <Textarea
                  className="mt-1"
                  required
                  defaultValue={howToGetThere}
                  disabled={activityIsLoading}
                  {...register("meetingPoint.howToGetThere", {
                    required: true,
                  })}
                />
                <Typography className="text-xs text-gray-500 italic mt-2">
                  Accurately explain on how to get in your meeting point address
                </Typography>
              </div>
            </div>

            <div className="flex-wrap">
              <Typography variant="h3" fontWeight="semibold" className="ml-2">
                Open with
              </Typography>
              <div className="flex-none flex place-items-start mt-8 gap-4">
                <Link
                  href={`https://maps.google.com/?q=${currentCoords[0]},${currentCoords[1]}`}
                  target="_blank"
                >
                  <Image
                    src={GoogleMapIcon}
                    width={100}
                    height={100}
                    alt="google map icon"
                    className="object-cover w-16 h-16"
                  />
                </Link>
                <Link
                  href={`https://maps.apple.com/?q=${currentCoords[0]},${currentCoords[1]}`}
                  target="_blank"
                >
                  <Image
                    src={AppleMapIcon}
                    width={100}
                    height={100}
                    alt="apple map icon"
                    className="mx-2 object-cover w-16 h-16"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <ToggleSwitch
              checked={isToggled}
              onChange={handleToggle}
              disabled={isPending || activityIsLoading}
            />
            <Typography>Enable itinerary builder</Typography>
          </div>
          {isToggled && <Builder />}

          <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
            <Button
              size="sm"
              type="submit"
              className={cn(
                "disabled:bg-gray-600",
                isPending ? "opacity-70 cursor-progress" : ""
              )}
            >
              {pageType === "setup" ? "Save & Next" : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Itinerary
