"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
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
import useUpdateRentalLocation from "../hooks/useUpdateRentalLocation"
import { T_Listing_Location } from "@repo/contract"
import useGetRentalById from "../../../hooks/useGetRentalById"
import { ErrorMessage } from "@hookform/error-message"
import ConfirmationMapLocationModal from "../modal/ConfirmationMapLocationModal"

type Prop = {
  pageType: "setup" | "edit"
}

const ListingLocation = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { mutate, isPending } = useUpdateRentalLocation(listingId)
  const { data } = useGetRentalById(listingId)
  const { latitude, longitude } = useCoordinatesStore()
  const [selectedMunicipality, setSelectedMunicipality] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<T_Listing_Location>({
    defaultValues: data?.item?.location,
    criteriaMode: "all",
  })

  const [streetAddress, setStreet] = useState<string>()
  const [markerIsSet, setMarkerIsSet] = useState(false)
  const [howToGetThere, setHowToGetThere] = useState<string>("")
  const [handleOverlayClick, setHandleOverlayClick] = useState(false)

  const handleHowToGetThereChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHowToGetThere(e.target.value)
  }
  const [markerCoordinates, setMarkerCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    if (data?.item?.location?.howToGetThere) {
      setHowToGetThere(data.item.location.howToGetThere)
    }
  }, [data])

  useEffect(() => {
    if (isConfirmed) {
      setHandleOverlayClick(false)
      toast.success("Location saved")
    }
  }, [isConfirmed])

  useEffect(() => {
    setStreet(data?.item?.location?.streetAddress)
    setHowToGetThere(data?.item?.location?.howToGetThere)
  }, [data])

  const updateBarangayOptions = (e: { target: { value: string } }) => {
    const selectedMunicipality = e.target.value
    setSelectedMunicipality(selectedMunicipality)
  }

  const onSubmit: SubmitHandler<T_Listing_Location> = (
    formData: T_Listing_Location
  ) => {
    const location = data?.item?.location
    if (!location?.latitude || !location?.longitude) {
      if (!markerIsSet) {
        toast.error("Please set the marker on the map before saving!")
        return
      }
    }

    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["rental", listingId],
          })
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["rental-finished-sections", listingId],
            })
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
    mutate(
      {
        ...formData,
        latitude: latitude as number,
        longitude: longitude as number,
      },
      callBackReq
    )
  }
  const handleOverlayClickToggle = () => {
    setHandleOverlayClick(true)
  }

  const handleMarkerSetter = (coords: { lat: number; lng: number }) => {
    setMarkerIsSet(true)
    setMarkerCoordinates(coords)
    setIsModalOpen(true)
  }
  const handleConfirmModal = () => {
    setIsModalOpen(false)
    setIsConfirmed(true)
    setTimeout(() => {
      setHandleOverlayClick(false)
    }, 0)
  }
  const currentCoords = (
    data?.item?.location?.latitude
      ? [data?.item?.location?.latitude, data?.item?.location?.longitude]
      : [9.913431, 126.049483]
  ) as [number, number]

  useEffect(() => {
    if (!isPending && data?.item) {
      const { streetAddress, city, barangay, howToGetThere } =
        data.item.location
      setValue("streetAddress", streetAddress)
      setValue("city", city)
      setValue("barangay", barangay)
      setValue("howToGetThere", howToGetThere)
    }
  }, [data, isPending, setValue])

  return (
    <div className="mt-20 mb-14">
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
              Location
            </Typography>
          </div>
          <div className="flex flex-col justify-center relative">
            {!handleOverlayClick && (
              <div
                className={`absolute top-0 left-0 w-full h-[450px] bg-black bg-opacity-10 rounded-xl z-10 transition-opacity duration-600 hover:bg-opacity-20 ${
                  handleOverlayClick
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <button
                  onClick={handleOverlayClickToggle}
                  className="w-full h-full flex justify-center items-center text-white text-2xl font-semibold transition-opacity duration-300"
                >
                  <span className="p-4 rounded-lg">
                    Click to enable map editing
                  </span>
                </button>
              </div>
            )}

            <SpecificMap
              center={currentCoords}
              mapHeight="h-[450px]"
              mapWidth="w-full"
              zoom={11}
              onMarkerSet={handleMarkerSetter}
              className="relative z-0"
              scrollWheelZoomEnabled={!handleOverlayClick}
            />
          </div>

          <Typography
            variant="p"
            className="italic text-gray-500 text-xs mt-2"
            fontWeight="bold"
          >
            You can drag and drop the yellow marker above to set your exact
            location on the map
          </Typography>
          <div className="flex mt-8 gap-12 flex-wrap">
            <div className="flex flex-col w-full md:w-2/3 gap-2 max-w-lg mb-24">
              <Typography variant="h3" fontWeight="semibold">
                Address
              </Typography>
              <Input
                type="text"
                id="streetAddress"
                label="Street address"
                {...register("streetAddress", { required: true })}
                required
                onChange={() => setStreet(streetAddress)}
              />
              <Select
                label="City / Municipality"
                id="municipalitySelect"
                defaultValue={data?.item?.location?.city}
                required
                {...register("city", { required: true })}
                onChange={updateBarangayOptions}
              >
                <Option value="">Select municipality</Option>
                {MUNICIPALITIES.map((key) => {
                  return (
                    <Option
                      value={key.name}
                      key={key.name}
                      selected={key.name === data?.item?.location?.city}
                    >
                      {key.name}
                    </Option>
                  )
                })}
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
              <div className="mt-2">
                <Typography variant="h3" fontWeight="semibold">
                  How to get there *
                </Typography>
                <Textarea
                  className="mt-1"
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
      <ConfirmationMapLocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        markerCoordinates={markerCoordinates}
        setOverlay={setHandleOverlayClick}
      />
    </div>
  )
}

export default ListingLocation
