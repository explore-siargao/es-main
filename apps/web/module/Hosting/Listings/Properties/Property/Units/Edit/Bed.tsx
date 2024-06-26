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
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import EditPhotoModal from "../../../../components/modals/EditPhotoModal"
import usePhotoStore from "../../../../store/usePhotoStore"
import { useParams, useRouter } from "next/navigation"
import useSelectAmenityStore from "../store/useSelectAmenityStore"
import AmenitiesCheckboxes from "../components/AmenitiesCheckboxes"
import { useQueryClient } from "@tanstack/react-query"
import useUpdateUnitPhoto from "../hooks/useUpdateUnitPhoto"
import useAddUnitPhoto from "../hooks/useAddUnitPhoto"
import useDeleteUnitPhoto from "../hooks/useDeleteUnitPhoto"
import Photos from "./components/Photos"
import { Option, Select } from "@/common/components/ui/Select"
import useUpdateBedBasicInfo from "../../../hooks/useUpdateBedBasicInfo"
import useUpdateAmenities from "../../../hooks/useUpdateAmenities"
import { T_Property_Amenity } from "@repo/contract"
import useGetUnitById from "../hooks/useGetUnitById"

type T_BedUnit = {
  title: string
  description: string
  qty: number
  amenities: T_Property_Amenity[]
}

type Prop = {
  pageType: "setup" | "edit"
}

const Bed = ({ pageType }: Prop) => {
  const params = useParams()
  const listingId = String(params.listingId)
  const bedId = String(params.bedId)
  const queryClient = useQueryClient()

  const { data, isPending } = useGetUnitById(bedId)
  const { mutateAsync: updateBedBasicInfo } = useUpdateBedBasicInfo(listingId)
  const { mutateAsync: updateAmenities } = useUpdateAmenities(listingId, bedId)
  const router = useRouter()
  const [typeCount, setTypeCount] = useState((data?.item?.qty || 0) as number)
  const [editPhotoModal, setEditPhotoModal] = useState(false)

  const { mutateAsync } = useUpdateUnitPhoto(listingId as string)
  const { mutateAsync: addMutateAsync } = useAddUnitPhoto(
    listingId as string,
    bedId
  )
  const setAmenities = useSelectAmenityStore(
    (state) => state.setDefaultAmenities
  )
  const { mutateAsync: deleteMutateAsync } = useDeleteUnitPhoto(
    listingId as string
  )
  const photos = usePhotoStore((state) => state.photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)
  const amenities = useSelectAmenityStore((state) => state.amenities)
  const { control, register, handleSubmit, setValue } = useForm<T_BedUnit>()
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
          const message = String("New bed unit successfully added")
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

  const onSubmit = async (formData: T_BedUnit) => {
    formData.amenities = amenities

    if (!formData.title || !formData.description) {
      toast.error("Please fill out all required fields")
      return
    }
    if (typeCount <= 0) {
      toast.error("Please fill out quantity")
      return
    }
    try {
      const saveBasicInfo = updateBedBasicInfo({
        _id: bedId,
        title: formData.title,
        description: formData.description,
        qty: Number(typeCount),
      })
      const saveAmenities = updateAmenities({ amenities: formData.amenities })
      await Promise.all([saveBasicInfo, saveAmenities])
      await handleSavePhotos()
    } catch (error) {
      toast.error("An error occurred while saving data")
    }
  }

  useEffect(() => {
    if (!isPending && data && data.item) {
      setValue("title", data?.item?.title)
      setValue("description", data?.item?.description)
      setTypeCount(data?.item?.qty)
      setPhotos(data?.item?.photos)
      setAmenities(data.item?.amenities)
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
          Units / Edit Bed
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-6">
          <div>
            <Select
              {...register("title", {
                required: "This field is required",
              })}
              label="Name"
              required
            >
              <>
                <Option value={""}>Select Name</Option>
                <Option selected={data?.item?.title}>
                  Bed in 8-Bed Mixed Dorm
                </Option>
              </>
            </Select>
          </div>
          <div>
            <Controller
              control={control}
              name="description"
              defaultValue={data?.item?.description || ""}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Bed"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  required
                >
                  <Option value={""}>Select Bed</Option>
                  <Option
                    value="Single Bunk Bed"
                    selected={data?.item?.description}
                  >
                    Single Bunk Bed
                  </Option>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 mt-4">
          <div>
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              How many of this type you have?
            </Typography>
            <div className="flex rounded-md">
              <button
                className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
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
                required
                {...register("qty")}
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
                onClick={() => setTypeCount((typeCount) => typeCount + 1)}
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
          Amenities and Facilities (for the bed itself) asd
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
      />
    </div>
  )
}

export default Bed
