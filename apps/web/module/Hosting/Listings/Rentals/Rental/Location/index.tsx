"use client"
import React, { useState, useEffect, ChangeEvent } from "react"
import { Typography } from "@/common/components/ui/Typography"
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
import { T_Listing_Location } from "@repo/contract"
import { cn } from "@/common/helpers/cn"
import useUpdateRentalLocation from "../hooks/useUpdateRentalLocation"
import useUpdateRentalFinishedSections from "../hooks/useUpdateRentalFinishedSections"
import useGetRentalById from "../../../hooks/useGetRentalById"
import { ErrorMessage } from "@hookform/error-message"
import dynamic from "next/dynamic"
import LocationSetterModal from "../../../components/modals/LocationSetterModal"

const DynamicMapWithPin = dynamic(
  () => import("../../../components/MapWithPin"),
  {
    ssr: false,
  }
)

type Prop = {
  pageType: "setup" | "edit"
}

const ListingLocation = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { mutate, isPending } = useUpdateRentalLocation(listingId)
  const { data, isPending: isFetching } = useGetRentalById(listingId)
  const { latitude, longitude, setCoordinates } = useCoordinatesStore()
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const { mutateAsync: updateFinishedSection } =
    useUpdateRentalFinishedSections(listingId)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<T_Listing_Location>({
    defaultValues: data?.item?.location,
    criteriaMode: "all",
  })

  const [markerIsSet, setMarkerIsSet] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialCoords, setInitialCoords] = useState<[number, number]>([
    9.913431, 126.049483,
  ])
  const [currentCoords, setCurrentCoords] =
    useState<[number, number]>(initialCoords)

  const [howToGetThere, setHowToGetThere] = useState<string>("")

  const handleHowToGetThereChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHowToGetThere(e.target.value)
  }

  useEffect(() => {
    if (data && !isFetching) {
      const location = data?.item?.location
        ? data?.item?.location
        : { city: "", street: "" }
      reset(location)
      setSelectedMunicipality(location.city)
      const coords: [number, number] = [
        location.latitude || initialCoords[0],
        location.longitude || initialCoords[1],
      ]
      setCoordinates(...coords)
      setInitialCoords(coords)
      setCurrentCoords(coords)
      setHowToGetThere(location.howToGetThere || "")
    }
  }, [data, isFetching, reset, setCoordinates])

  useEffect(() => {
    setValue("latitude", latitude as number)
    setValue("longitude", longitude as number)
  }, [latitude, longitude, setValue])

  useEffect(() => {
    if (isModalOpen) {
      setCurrentCoords(initialCoords)
      setMarkerIsSet(false)
    }
  }, [isModalOpen, initialCoords])

  const closeModal = () => {
    setCoordinates(...initialCoords)
    setMarkerIsSet(false)
    setIsModalOpen(false)
  }

  const updateBarangayOptions = (e: { target: { value: string } }) => {
    const selectedMunicipality = e.target.value
    setSelectedMunicipality(selectedMunicipality)
  }

  const onSubmit: SubmitHandler<T_Listing_Location> = (formData) => {
    const initialLat = 9.913431
    const initialLng = 126.049483

    const areCoordinatesInitial =
      currentCoords[0] === initialLat && currentCoords[1] === initialLng

    if (areCoordinatesInitial && !markerIsSet) {
      toast.error("Please set the marker on the map before saving.")
      return
    }

    formData.latitude = currentCoords[0]
    formData.longitude = currentCoords[1]

    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          if (
            pageType === "setup" &&
            !data?.item?.finishedSections?.includes("location")
          ) {
            const callBack2 = {
              onSuccess: (data: any) => {
                if (!data.error) {
                  queryClient.invalidateQueries({
                    queryKey: ["property-finished-sections", listingId],
                  })
                } else {
                  toast.error(String(data.message))
                }
              },
              onError: (err: any) => {
                toast.error(String(err))
              },
            }
            updateFinishedSection({ newFinishedSection: "location" }, callBack2)
          } else {
            queryClient.invalidateQueries({
              queryKey: ["property", listingId],
            })
          }
          if (pageType === "setup") {
            router.push(`/hosting/listings/rentals/setup/${listingId}/summary`)
          }
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutate(formData, callBackReq)
  }

  const handleMarkerSetter = (coords: { lat: number; lng: number }) => {
    setMarkerIsSet(true)
    setCoordinates(coords.lat, coords.lng)
    setCurrentCoords([coords.lat, coords.lng])
    setValue("latitude", coords.lat)
    setValue("longitude", coords.lng)
  }

  return (
    <div className="mt-20 mb-14">
      {isPending || isFetching ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="pb-2">
            <Typography
              variant="h1"
              fontWeight="semibold"
              className="flex justify-between items-center"
            >
              Location
            </Typography>
          </div>
          <div className="py-2 w-1/2" onClick={() => setIsModalOpen(true)}>
            <DynamicMapWithPin
              disablePinMovement={true}
              center={initialCoords}
              zoom={11}
            />
            <Typography
              variant="h5"
              fontWeight="normal"
              className="text-gray-500 pt-2 italic"
            >
              To edit the marker's location, click anywhere in the map above and the edit modal will show. This will help your customers to easily find your location.
            </Typography>
          </div>{" "}
          <div className="flex mt-2 gap-12 flex-wrap">
            <div className="flex flex-col w-full md:w-2/3 gap-2 max-w-lg">
              <div className="flex-wrap mb-4">
                <Typography variant="h3" fontWeight="semibold">
                  Open with
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="normal"
                  className="text-gray-500 pt-2 italic"
                >
                  Click the icons below to open the location you set above in
                  your preferred map
                </Typography>
                <div className="flex-none flex place-items-start mt-2 gap-4">
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
              <Typography variant="h3" fontWeight="semibold">
                Address
              </Typography>
              <Input
                type="text"
                id="streetAddress"
                label="Street address"
                required
                {...register("streetAddress", { required: true })}
              />
              <Select
                label="City / Municipality"
                id="municipalitySelect"
                required
                {...register("city", { required: true })}
                onChange={updateBarangayOptions}
              >
                <Option value="">Select municipality</Option>
                {MUNICIPALITIES.map((municipality) => (
                  <Option
                    key={municipality.name}
                    value={municipality.name}
                    selected={municipality.name === selectedMunicipality}
                  >
                    {municipality.name}
                  </Option>
                ))}
              </Select>

              <Select
                label="Barangay / District"
                id="barangaySelect"
                required
                {...register("barangay", { required: true })}
              >
                <Option value="">Select barangay</Option>
                {BARANGAYS.filter(
                  (barangay) =>
                    barangay.municipality === selectedMunicipality ||
                    barangay.municipality === data?.item?.location?.city
                ).map((barangay) => (
                  <Option
                    key={barangay.name}
                    value={barangay.name}
                    selected={barangay.name === data?.item?.location?.barangay}
                  >
                    {barangay.name}
                  </Option>
                ))}
              </Select>

              <ErrorMessage
                errors={errors}
                name="howToGetThere"
                render={({ messages }) => {
                  return messages
                    ? Object.entries(messages).map(([type, message]) =>
                        typeof message === "string" ? (
                          <p className="text-red-600 text-xs " key={type}>
                            {" "}
                            <i>{message}</i>{" "}
                          </p>
                        ) : null
                      )
                    : null
                }}
              />
            </div>
          </div>
          <div className="mt-6">
            <Typography variant="h3" fontWeight="semibold">
              How to get there *
            </Typography>
            <div className="flex flex-col w-full xl:w-1/2 gap-2 mb-24">
              <Textarea
                className="flex mt-1 h-[550px]"
                placeholder="Explain in detail how to get to your location. This will help your customers find you!"
                required
                {...register("howToGetThere", {
                  required: "This input is required.",
                  minLength: {
                    value: 100,
                    message: "This field has minimum of 100 characters",
                  },
                })}
                value={howToGetThere}
                onChange={handleHowToGetThereChange}
              />
            </div>
          </div>
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

      <LocationSetterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentCoords={currentCoords}
        handleMarkerSetter={handleMarkerSetter}
        markerIsSet={markerIsSet}
        setInitialCoords={setInitialCoords}
      />
    </div>
  )
}

export default ListingLocation
