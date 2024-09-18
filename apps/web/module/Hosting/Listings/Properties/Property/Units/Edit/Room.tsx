"use client"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
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
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useSelectAmenityStore from "@/module/Hosting/Listings/Properties/Property/Units/store/useSelectAmenityStore"
import usePhotoStore from "../../../../store/usePhotoStore"
import toast from "react-hot-toast"
import EditPhotoModal from "../../../../components/modals/EditPhotoModal"
import { useParams, useRouter } from "next/navigation"
import { Option, Select } from "@/common/components/ui/Select"
import { Input } from "@/common/components/ui/Input"
import { useQueryClient } from "@tanstack/react-query"
import useUpdateUnitPhoto from "../hooks/useUpdateUnitPhoto"
import useAddUnitPhoto from "../hooks/useAddUnitPhoto"
import useDeleteUnitPhoto from "../hooks/useDeleteUnitPhoto"
import Photos from "./components/Photos"
import AmenitiesCheckboxes from "../components/AmenitiesCheckboxes"
import { T_Property_Amenity } from "@repo/contract"
import useUpdateRoomBasicInfo from "../../../hooks/useUpdateRoomBasicInfo"
import useUpdateAmenities from "../../../hooks/useUpdateAmenities"
import useGetUnitById from "../hooks/useGetUnitById"
import Bedroom from "./components/Bedroom"
import { SQM_TO_FT_CONVERSION_FACTOR } from "../constants"
import { IBedroom } from "../types"
import { useBedroomStore } from "./store/useBedroomStore"
import { Input2 } from "@/common/components/ui/Input2"

type T_RoomUnit = {
  title: string
  subtitle: string
  description: string
  size: number
  typeCount: number
  amenities: T_Property_Amenity[]
  bedRooms: IBedroom[]
  isHaveSharedBathRoom: "Yes" | "No" | null | undefined
  isHaveSharedAmenities: "Yes" | "No" | null | undefined
}

type Prop = {
  pageType: "setup" | "edit"
}

const Room = ({ pageType }: Prop) => {
  const params = useParams()
  const listingId = String(params.listingId)
  const unitId = String(params.roomId)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data, isPending, isFetching } = useGetUnitById(unitId)
  const [isSavings, setIsSavings] = useState(false)
  const [typeCount, setTypeCount] = useState((data?.item?.qty || 0) as number)
  const [editPhotoModal, setEditPhotoModal] = useState(false)
  const [customTitle, setCustomTitle] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const { mutateAsync: updateRoomBasicInfo } = useUpdateRoomBasicInfo(listingId)
  const { mutateAsync } = useUpdateUnitPhoto(listingId as string)
  const { mutateAsync: addMutateAsync } = useAddUnitPhoto(
    listingId as string,
    unitId as string
  )
  const { mutateAsync: updateAmenties } = useUpdateAmenities(listingId, unitId)
  const { mutateAsync: deleteMutateAsync } = useDeleteUnitPhoto(
    listingId as string
  )
  const bedRooms = useBedroomStore((state) => state.bedrooms)
  const [unitType, setUnitType] = useState(data?.item?.subtitle || "")
  const photos = usePhotoStore((state) => state.photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)
  const setAmenties = useSelectAmenityStore(
    (state) => state.setDefaultAmenities
  )
  const amenities = useSelectAmenityStore((state) => state.amenities)

  const { register, handleSubmit, setValue, watch } = useForm<T_RoomUnit>()
  const [sizeValues, setSizeValues] = useState({
    sqm: 0,
    squareFoot: 0,
  })

  const updateBedrooms = useBedroomStore((state) => state.updateBedrooms)
  useEffect(() => {
    if (data?.item?.bedRooms || data?.item?.livingRooms) {
      updateBedrooms(data.item.bedRooms)
    }
  }, [data, updateBedrooms])

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
          const message = String("New Room unit successfully added")
          toast.success(message, { id: message })
        })
        queryClient.invalidateQueries({
          queryKey: ["property", listingId],
        })
        router.push(
          `/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units`
        )
        amenities.forEach((amenity) => {
          amenity.isSelected = false
        })
      })
      .catch((err) => {
        toast.error(String(err))
      })
  }
  const handleSavePhotos = async () => {
    const activePhotos = photos.filter((photo) => !photo.isDeleted)
    if (activePhotos.length >= 3) {
      await updatePhotosInDb()
    } else {
      toast.error("Please add at least 3 photos")
    }
  }

  const handleSqmChange = (value: string) => {
    const newSquareFoot = (Number(value) * SQM_TO_FT_CONVERSION_FACTOR).toFixed(
      2
    )

    setSizeValues({
      sqm: Number(value),
      squareFoot: Number(newSquareFoot),
    })
  }

  const onSubmit = async (formData: T_RoomUnit) => {
    formData.amenities = amenities
    console.log("test: ", formData)
    const missingTags = photos.filter(
      (photo) => !photo.tags || photo.tags.length === 0
    )
    const missingDescription = photos.filter(
      (photo) => !photo.description || photo.description.length === 0
    )

    if (!formData.size) {
      toast.error("Please fill out size field")
      return
    }
    if (typeCount <= 0) {
      toast.error("Please fill out quantity field")
      return
    }
    if (missingDescription.length > 0) {
      toast.error("Please add descriptions to all photos")
      return
    }
    if (missingTags.length > 0) {
      toast.error("Please add tags to all photos")
      return
    }

    try {
      if (bedRooms.length > 0) {
        setIsSavings(true)
        formData.bedRooms = bedRooms
      } else {
        toast.error("Must have at least 1 bed or sleeping space.")
        return
      }
      const saveBasicInfo = updateRoomBasicInfo({
        _id: unitId,
        title: formData.title,
        subtitle: "",
        totalSize: Number(formData.size),
        description: "",
        qty: Number(typeCount),
        bedRooms: bedRooms,
        isHaveSharedBathRoom: formData.isHaveSharedBathRoom,
        isHaveSharedAmenities: formData.isHaveSharedAmenities,
      })
      const saveAmenities = updateAmenties({ amenities: formData?.amenities })
      const filterSelectedAmenities = amenities.filter(
        (amenity) => amenity.isSelected
      )
      if (filterSelectedAmenities.length > 0) {
        await Promise.all([saveBasicInfo, saveAmenities]).then(() => {
          handleSavePhotos()
        })
      } else {
        toast.error("Please select at least one amenity")
      }
    } catch (error) {
      toast.error("An error occurred while saving data")
    }
  }

  useEffect(() => {
    if (!isPending && data && data.item) {
      setValue("title", data?.item?.title || "")
      setValue("subtitle", data?.item?.subtitle || "")
      setValue("description", data?.item?.description)
      setTypeCount(data?.item?.qty)
      setPhotos(data?.item?.photos)
      setAmenties(data?.item?.amenities)
      setValue("size", data?.item?.totalSize)
      setValue("isHaveSharedBathRoom", data?.item?.isHaveSharedBathRoom || "No")
      setValue(
        "isHaveSharedAmenities",
        data?.item?.isHaveSharedAmenities || "No"
      )
      handleSqmChange(data.item?.totalSize)
      if (data?.item?.subtitle?.startsWith("Custom: ", "")) {
        setCustomTitle(data?.item?.subtitle.replace("Custom: ", ""))
      }
      if (data?.item?.description?.startsWith("Custom: ")) {
        setCustomDescription(data?.item?.description.replace("Custom: ", ""))
      }
    }
  }, [data, isPending])

  const category = data?.item?.category

  return (
    <div className="mt-20 mb-28">
      <div className="mb-8">
        <Link
          href={`/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units`}
        >
          <LucideChevronLeft className="text-text-300 hover:text-text-500 transition" />
        </Link>
        <Typography variant="h1" fontWeight="semibold" className="mt-4">
          Units / Edit Room
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-6">
          <Input2
            label="Title"
            description=" What is the name you want to display for your unit? (Optional)"
            placeholder="Example: Queen room with site view"
            id="title"
            type="text"
            minLength={5}
            maxLength={30}
            disabled={isPending}
            {...register("title")}
          />
        </div>
        <div className="flex flex-col">
          <Typography variant="h4" fontWeight="semibold" className="mt-4">
            Where can guests sleep?
          </Typography>
          <Typography
            variant="h5"
            fontWeight="normal"
            className="text-xs text-gray-500 italic mb-2"
          >
            How many comfortable living spaces does this unit have? Click to add
            bed type
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-x-6 pr-12">
          <Bedroom unitType={unitType} category={category} />
        </div>
        <Typography variant="h4" fontWeight="semibold" className="mt-4">
          How big is this unit?
        </Typography>
        <Typography
          variant="h5"
          fontWeight="normal"
          className="text-xs text-gray-500 italic mb-2"
        >
          Enter the unit size in square meters, we will automatically convert to
          square foot
        </Typography>
        <div className="grid grid-cols-4 gap-x-6">
          <div>
            <Input
              label="Sqm"
              id="size"
              type="number"
              disabled={isPending || isFetching}
              {...register("size", {
                required: "This field is required",
              })}
              onChange={(event) => handleSqmChange(event.target.value)}
              required
            />
          </div>
          <div>
            <Input
              label="Ft"
              id="squareFoot"
              type="number"
              value={sizeValues.squareFoot}
              disabled
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-4 mt-4">
          <div>
            <Typography variant="h4" fontWeight="semibold">
              How many of this type you have?
            </Typography>
            <Typography
              variant="h5"
              fontWeight="normal"
              className="text-xs text-gray-500 italic mb-2"
            >
              Identical units that will have the same price per night.
            </Typography>
            <div className="flex">
              <button
                className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={() => {
                  typeCount > 0 && setTypeCount((typeCount) => typeCount - 1)
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
                required
              />
              <button
                className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                type="button"
                onClick={() => setTypeCount((typeCount) => typeCount + 1)}
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <Typography variant="h4" fontWeight="semibold" className="flex mb-2">
            Does this room have a shared bathroom?
          </Typography>
          <div className="flex items-center">
            <input
              id="isHaveSharedBathRoom-no"
              type="radio"
              {...register("isHaveSharedBathRoom", { required: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              value="No"
              required
              checked={watch("isHaveSharedBathRoom") === "No"}
            />
            <label
              htmlFor="isHaveSharedBathRoom-no"
              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
            >
              No
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="isHaveSharedBathRoom-yes"
              type="radio"
              {...register("isHaveSharedBathRoom", { required: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              value="Yes"
              required
              checked={watch("isHaveSharedBathRoom") === "Yes"}
            />
            <label
              htmlFor="isHaveSharedBathRoom-yes"
              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Yes
            </label>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <Typography variant="h4" fontWeight="semibold" className="flex mb-2">
            Does this room have a shared amenities?
          </Typography>
          <div className="flex items-center">
            <input
              id="isHaveSharedAmenities-no"
              type="radio"
              {...register("isHaveSharedAmenities", { required: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              value="No"
              required
              checked={watch("isHaveSharedAmenities") === "No"}
            />
            <label
              htmlFor="isHaveSharedAmenities-no"
              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
            >
              No
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="isHaveSharedAmenities-yes"
              type="radio"
              {...register("isHaveSharedAmenities", { required: true })}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
              value="Yes"
              required
              checked={watch("isHaveSharedAmenities") === "Yes"}
            />
            <label
              htmlFor="isHaveSharedAmenities-yes"
              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Yes
            </label>
          </div>
        </div>
        <hr className="mt-6 mb-4" />
        <Photos />
        <hr className="mt-6 mb-4" />
        <Typography variant="h4" fontWeight="semibold" className="mb-3">
          Amenities and Facilities (for the room itself)
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
      <EditPhotoModal
        isOpen={editPhotoModal}
        onClose={() => setEditPhotoModal(false)}
        category="Room"
      />
    </div>
  )
}

export default Room
