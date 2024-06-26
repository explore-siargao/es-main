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
import useUpdateRentalLocation from "../hooks/useUpdateRentalLocation"
import { T_Listing_Location } from "@repo/contract"
import useGetRentalById from "../../../hooks/useGetRentalById"

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
  const { register, handleSubmit } = useForm<T_Listing_Location>({
    values: data?.item?.location,
  })

  const [streetAddress, setStreet] = useState<string>()
  const [howToGetThere, setHowToGetThere] = useState<string>()

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
  const currentCoords = (
    data?.item?.location?.latitude
      ? [data?.item?.location?.latitude, data?.item?.location?.longitude]
      : [9.913431, 126.049483]
  ) as [number, number]

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
            <div className="flex flex-col w-full md:w-2/3 gap-2 max-w-lg mb-24">
              <Typography variant="h3" fontWeight="semibold">
                Address
              </Typography>
              <Input
                type="text"
                id="streetAddress"
                label="Street address"
                required
                {...register("streetAddress", { required: true })}
                defaultValue={data?.item?.location?.streetAddress}
                onChange={() => setStreet(streetAddress)}
              />
              <Select
                label="City / Municipality"
                id="municipalitySelect"
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
                  How to get there
                </Typography>
                <Textarea
                  className="mt-1"
                  required
                  {...register("howToGetThere", { required: true })}
                  defaultValue={data?.item?.location?.howToGetThere}
                  onChange={() => setHowToGetThere(howToGetThere)}
                />
                <Typography className="text-xs text-gray-500 italic mt-2">
                  Accurately explain on how to get in your property addressasd
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

export default ListingLocation
