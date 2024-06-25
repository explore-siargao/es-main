"use client"
import { Typography } from "@/common/components/ui/Typography"
import {
  LucideArmchair,
  LucideBath,
  LucideChevronLeft,
  LucideCookingPot,
  LucideLayoutList,
  LucidePalmtree,
  LucideSparkles,
  MinusIcon,
  PlusIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
import { useEffect, useState } from "react"
import useSelectAmenityStore from "@/module/Hosting/Listings/Properties/Property/Units/store/useSelectAmenityStore"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "next/navigation"
import { Option, Select } from "@/common/components/ui/Select"
import { Input } from "@/common/components/ui/Input"
import AmenitiesCheckboxes from "../components/AmenitiesCheckboxes"
import usePhotoStore from "@/module/Hosting/Listings/store/usePhotoStore"
import useDeleteUnitPhoto from "../hooks/useDeleteUnitPhoto"
import useAddUnitPhoto from "../hooks/useAddUnitPhoto"
import useUpdateUnitPhoto from "../hooks/useUpdateUnitPhoto"
import { useQueryClient } from "@tanstack/react-query"
import Photos from "./components/Photos"
import useUpdateWholePlaceBasicInfo from "../../../hooks/useUpdateWholePlaceBasicInfo"
import useUpdateAmenities from "../../../hooks/useUpdateAmenities"
import { T_Property_Amenity } from "@repo/contract"
import useGetUnitById from "../hooks/useGetUnitById"

type T_Beds = {
  bedName: string
  bedType: string
}

type T_WholePlaceUnit = {
  title: string
  bedCount: number
  beds: T_Beds[]
  size: number
  bathrooms: number
  typeCount: number
  amenities: T_Property_Amenity[]
}

type Prop = {
  pageType: "setup" | "edit"
}

const WholePlace = ({ pageType }: Prop) => {
  const params = useParams()
  const listingId = String(params.listingId)
  const wholePlaceId = String(params.wholePlaceId)
  const queryClient = useQueryClient()

  const { data, isPending } = useGetUnitById(wholePlaceId)

  const [bedCount, setBedCount] = useState(data?.item?.numBedRooms || 0)
  const [bedInputs, setBedInputs] = useState(data?.item?.bedConfigs || [])
  const [bathroomCount, setBathroomCount] = useState(
    data?.item?.numBathRooms || 0
  )
  const [typeCount, setTypeCount] = useState((data?.item?.qty || 0) as number)
  const { mutateAsync: updateWholePlaceBasicInfo } =
    useUpdateWholePlaceBasicInfo(listingId)
  const { mutateAsync: updateAmenties } = useUpdateAmenities(
    listingId,
    wholePlaceId
  )
  const { mutateAsync } = useUpdateUnitPhoto(listingId)
  const { mutateAsync: addMutateAsync } = useAddUnitPhoto(
    listingId,
    wholePlaceId
  )
  const { mutateAsync: deleteMutateAsync } = useDeleteUnitPhoto(
    listingId as string
  )

  const photos = usePhotoStore((state) => state.photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)
  const setAmenties = useSelectAmenityStore(
    (state) => state.setDefaultAmenities
  )
  const amenities = useSelectAmenityStore((state) => state.amenities)

  const { register, unregister, handleSubmit, setValue } =
    useForm<T_WholePlaceUnit>()

  const updatePhotosInDb = async () => {
    const toAddPhotos =
      photos
        .filter((photo) => !photo._id)
        .map(async (photo) => {
          return await addMutateAsync(photo)
        }) || []
    const toEditPhotos =
      photos
        .filter((photo) => photo._id)
        .map(async (photo) => {
          return await mutateAsync(photo)
        }) || []
    const toDeletePhotos =
      photos
        .filter((photo) => photo.isDeleted)
        .map(async (photo) => {
          return await deleteMutateAsync(photo)
        }) || []
    await Promise.all([...toAddPhotos, ...toEditPhotos, ...toDeletePhotos])
      .then((items) => {
        items.forEach((item) => {
          const message = String(item.message) as string
          toast.success(message, { id: message })
        })
        queryClient.invalidateQueries({
          queryKey: ["property", listingId],
        })
      })
      .catch((err) => {
        toast.error(String(err))
      })
  }

  const handleSavePhotos = async () => {
    updatePhotosInDb()
  }

  const onSubmit = async (formData: T_WholePlaceUnit) => {
    if (bedCount > 0) {
      formData.amenities = amenities
      formData.bedCount = bedCount
    } else {
      toast.error("Must have at least 1 bedroom or sleeping space.")
    }
    const saveBasicInfo = updateWholePlaceBasicInfo({
      _id: wholePlaceId,
      title: formData.title,
      totalSize: Number(formData.size),
      numBedRooms: Number(formData.bedCount),
      numBathRooms: Number(formData.bathrooms),
      qty: formData.typeCount,
    })
    const saveAmenities = updateAmenties({ amenities: formData?.amenities })
    await Promise.all([saveBasicInfo, saveAmenities]).then(() => {
      updatePhotosInDb()
    })
  }

  const addBedInput = () => {
    // @ts-ignore
    setBedInputs((prevBedInput: any) => [...prevBedInput, bedCount])
    setBedCount((prevBedCount: any) => prevBedCount + 1)
  }

  const removeBedInput = () => {
    if (bedInputs.length > 0) {
      // @ts-ignore
      unregister(`beds[${bedInputs.length - 1}]`)

      setBedInputs((prevBedInputs: any) => prevBedInputs.slice(0, -1))
      setBedCount((prevBedCount: any) => prevBedCount - 1)
    }
  }

  useEffect(() => {
    setValue("bedCount", data?.item?.numBedRooms)
    setValue("bathrooms", bathroomCount)
    setValue("typeCount", typeCount)
  }, [bedCount, bathroomCount, typeCount])

  useEffect(() => {
    if (!isPending && data && data.item) {
      setBedCount(data?.item.numBedRooms)
      setBathroomCount(data?.item.numBathRooms)
      setTypeCount(data?.item.qty)
      setPhotos(data?.item?.photos)
      setAmenties(data.item?.amenities)
    }
  }, [data, isPending])

  return (
    <div className="mt-20 mb-28">
      <div className="mb-8">
        <Link
          href={`/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units`}
        >
          <LucideChevronLeft className="text-text-300 hover:text-text-500 transition" />
        </Link>
        <Typography variant="h1" fontWeight="semibold" className="mt-4">
          Units / Edit Whole Place
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-6">
          <div>
            <Select
              disabled={isPending}
              defaultValue={data?.item?.title}
              {...register("title", {
                required: "This field is required",
              })}
              label="Name"
              required
            >
              <>
                <Option value={""}>Select Name</Option>
                <Option selected={data?.item?.title}>Double Room</Option>
              </>
            </Select>
          </div>
          <div>
            <Input
              label="Total Size (sqm)"
              id="size"
              type="number"
              disabled={isPending}
              defaultValue={data?.item?.totalSize}
              {...register("size", {
                required: "This field is required",
              })}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-4 mt-4 gap-x-6">
          <div>
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              Bedrooms / Sleeping Space
            </Typography>
            <div className="flex rounded-md mb-3">
              <button
                className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={removeBedInput}
              >
                <MinusIcon className="h-3 w-3" />
              </button>
              <input
                type="number"
                id="beds"
                {...register("bedCount")}
                className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                value={bedCount}
                min={0}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setBedCount(val)
                }}
              />
              <button
                className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={addBedInput}
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
            {bedInputs.map((bedInput: any, index: number) => (
              <div className="grid grid-cols-2 my-3 gap-x-3" key={index}>
                <Input
                  label="Bed name"
                  type="text"
                  id={`bed-name-${index}`}
                  disabled={false}
                  // @ts-ignore
                  {...register(`beds[${index}].bedName`, { register: true })}
                  defaultValue={bedInput.bedName}
                  required
                />
                <Input
                  label="Bed type"
                  type="text"
                  id={`bed-name-${index}`}
                  disabled={false}
                  // @ts-ignore
                  {...register(`beds[${index}].bedType`, { register: true })}
                  defaultValue={bedInput.bedType}
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              Number of Bathrooms
            </Typography>
            <div className="flex rounded-md">
              <button
                className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={() => {
                  bathroomCount > 0 &&
                    setBathroomCount((bathroomCount: any) => bathroomCount - 1)
                }}
              >
                <MinusIcon className="h-3 w-3" />
              </button>
              <input
                type="number"
                id="bathrooms"
                {...register("bathrooms")}
                className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                value={bathroomCount}
                min={0}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setBathroomCount(val)
                }}
              />
              <button
                className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={() =>
                  setBathroomCount((bathroomCount: any) => bathroomCount + 1)
                }
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div>
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              How many of this type you have?
            </Typography>
            <div className="flex rounded-md">
              <button
                className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={() => {
                  typeCount > 0 &&
                    setTypeCount((typeCount: any) => typeCount - 1)
                }}
              >
                <MinusIcon className="h-3 w-3" />
              </button>
              <input
                type="number"
                id="type-count"
                {...register("typeCount")}
                className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                value={typeCount}
                min={0}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setTypeCount(val)
                }}
              />
              <button
                className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={() => setTypeCount((typeCount: any) => typeCount + 1)}
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-6 mb-4" />
        <Photos />
        <hr className="mt-6 mb-4" />
        <Typography variant="h4" fontWeight="semibold" className="mb-3">
          Amenities and Facilities (for the whole place itself)
        </Typography>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <AmenitiesCheckboxes
            title="Most Popular"
            icon={<LucideSparkles className="h-4 w-4" />}
          />
          <AmenitiesCheckboxes
            title="Bathroom"
            icon={<LucideBath className="h-4 w-4" />}
          />
          <AmenitiesCheckboxes
            title="Living Area"
            icon={<LucideArmchair className="h-4 w-4" />}
          />
          <AmenitiesCheckboxes
            title="Kitchen"
            icon={<LucideCookingPot className="h-4 w-4" />}
          />
          <AmenitiesCheckboxes
            title="General"
            icon={<LucideLayoutList className="h-4 w-4" />}
          />
          <AmenitiesCheckboxes
            title="Outdoors"
            icon={<LucidePalmtree className="h-4 w-4" />}
          />
        </div>
        <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
          <Button size="sm" type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default WholePlace
