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
import useGetActivityById from "../../hooks/useGetActivityById"
import ModalContainer from "@/common/components/ModalContainer"
import { ErrorMessage } from "@hookform/error-message"

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
  const { data, isPending: activityIsLoading } = useGetActivityById(listingId)
  const { latitude, longitude, setCoordinates } = useCoordinatesStore()
  const initialSegment = useSegmentsStore((state) => state.initialSegments)
  const getSegments = useSegmentsStore((state) => state.segments)
  const updateBarangayOptions = (e: { target: { value: string } }) => {
    const selectedMunicipality = e.target.value
    setSelectedMunicipality(selectedMunicipality)
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<T_Activity_Itinerary>({
    criteriaMode: "all",
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCoords, setCurrentCoords] = useState<[number, number]>([
    9.913431, 126.049483,
  ])
  const [initialCoords, setInitialCoords] = useState<[number, number]>([
    9.913431, 126.049483,
  ])

  useEffect(() => {
    if (!activityIsLoading && data && data.item) {
      const newCoords: [number, number] = [
        data.item.meetingPoint.latitude || 9.913431,
        data.item.meetingPoint.longitude || 126.049483,
      ]
      setInitialCoords(newCoords)
      setCurrentCoords(newCoords)
      initialSegment(data.item.segments)

      reset({
        meetingPoint: {
          ...data.item.meetingPoint,
        },
        isSegmentBuilderEnabled: data.item.isSegmentBuilderEnabled,
        segments: data.item.segments,
      })
    }
  }, [data, activityIsLoading, reset, initialSegment])

  const onSubmit: SubmitHandler<T_Activity_Itinerary> = (
    formData: T_Activity_Itinerary
  ) => {
    const initialLat = 9.913431
    const initialLng = 126.049483

    const areCoordinatesInitial =
      currentCoords[0] === initialLat && currentCoords[1] === initialLng

    if (areCoordinatesInitial && !markerIsSet) {
      toast.error("Please set the marker on the map before saving.")
      return
    }
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["activity", listingId],
          })
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["activity-finished-sections", listingId],
            })
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
      latitude: initialCoords[0],
      longitude: initialCoords[1],
    }

    mutate(
      {
        meetingPoint: updatedMeetingPoint,
        isSegmentBuilderEnabled: isToggled,
        segments: getSegments,
      },
      callBackReq
    )
  }

  const [markerIsSet, setMarkerIsSet] = useState(false)

  const street = watch("meetingPoint.streetAddress")
  const city = watch("meetingPoint.city")
  const brgy = watch("meetingPoint.barangay")
  const howToGetThere = watch("meetingPoint.howToGetThere")
  const toggled = watch("isSegmentBuilderEnabled")
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    activityIsLoading || !city ? "" : city
  )
  const [isToggled, setIsToggled] = useState(
    activityIsLoading ? false : toggled
  )

  const handleMarkerSetter = (coords: { lat: number; lng: number }) => {
    setCurrentCoords([coords.lat, coords.lng])
    setMarkerIsSet(true)
  }

  const handleSaveLocation = () => {
    setInitialCoords(currentCoords)
    setMarkerIsSet(false)
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setCoordinates(...initialCoords)
    setMarkerIsSet(false)
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isModalOpen) {
      setCurrentCoords(initialCoords)
    }
  }, [isModalOpen, initialCoords])

  useEffect(() => {
    if (!activityIsLoading && data && data.item) {
      setIsToggled(data?.item?.isSegmentBuilderEnabled)
      initialSegment(data?.item?.segments)
    }
  }, [data, activityIsLoading])

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
          <Button
            variant="primary"
            type="button"
            className="focus:outline-none focus:ring-0"
            onClick={() => setIsModalOpen(true)}
          >
            Show Map
          </Button>{" "}
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
                {...register("meetingPoint.streetAddress", { required: true })}
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
                  How to get there *
                </Typography>
                <Textarea
                  className="mt-1"
                  placeholder="Explain in detail how to get to your location. This will help your customers find you!"
                  required
                  {...register("meetingPoint.howToGetThere", {
                    required: "This input is required.",
                    minLength: {
                      value: 100,
                      message: "This field has minimum of 100 characters",
                    },
                  })}
                  value={howToGetThere}
                />
              </div>
              <ErrorMessage
                errors={errors}
                name="meetingPoint.howToGetThere"
                render={({ message }) => (
                  <p className="text-red-500 text-xs italic">{message}</p>
                )}
              />
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

      <ModalContainer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Location"
        size="sm"
      >
        <div className="pt-4 pl-4 pr-4">
          <SpecificMap
            center={currentCoords}
            mapHeight="h-[450px]"
            mapWidth="w-full"
            zoom={11}
            onMarkerSet={handleMarkerSetter}
            className="relative z-0"
            scrollWheelZoomEnabled
          />
        </div>
        <div className="pl-4">
          <Typography className="text-xs text-gray-500 italic mt-2">
            Where will you meet your customers to begin the activity? Our
            website doesn't support pickup location yet.
          </Typography>
          <Typography variant="p" className="italic text-gray-500 text-xs mt-2">
            You can drag and drop the yellow marker above to set your exact
            location on the map
          </Typography>
        </div>
        <div className="p-4 flex justify-end">
          <Button
            variant="primary"
            onClick={handleSaveLocation}
            disabled={!markerIsSet}
            className="focus:outline-none focus:ring-0"
          >
            Save Location
          </Button>
        </div>
      </ModalContainer>
    </div>
  )
}

export default Itinerary
