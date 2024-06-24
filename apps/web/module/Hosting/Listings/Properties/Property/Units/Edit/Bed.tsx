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
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import EditPhotoModal from "../../../../components/modals/EditPhotoModal"
import usePhotoStore from "../../../../store/usePhotoStore"
import { useParams } from "next/navigation"
import useSelectAmenityStore from "../store/useSelectAmenityStore"
import AmenitiesCheckboxes from "../components/AmenitiesCheckboxes"
import { useQueryClient } from "@tanstack/react-query"
import useUpdateUnitPhoto from "../hooks/useUpdateUnitPhoto"
import useAddUnitPhoto from "../hooks/useAddUnitPhoto"
import useDeleteUnitPhoto from "../hooks/useDeleteUnitPhoto"
import Photos from "./components/Photos"
import { Option, Select } from "@/common/components/ui/Select"

type T_BedUnit = {
  name: string
  bed: string
  typeCount: number
  photos: {}[]
  amenities: {}[]
}

const Bed = () => {
  const params = useParams()
  const listingId = params.listingId
  const unitId = params.unitId
  const queryClient = useQueryClient()

  const data: any = {} // change this to useGetPropertyUnitById

  const [typeCount, setTypeCount] = useState((data?.qty || 0) as number)
  const [editPhotoModal, setEditPhotoModal] = useState(false)

  const { mutateAsync } = useUpdateUnitPhoto(listingId as string)
  const { mutateAsync: addMutateAsync } = useAddUnitPhoto(
    listingId as string,
    unitId as string
  )
  const { mutateAsync: deleteMutateAsync } = useDeleteUnitPhoto(
    listingId as string
  )

  const photos = usePhotoStore((state) => state.photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)

  const amenities = useSelectAmenityStore((state) => state.amenities)

  const { register, handleSubmit, setValue } = useForm<T_BedUnit>()

  const isPending = false

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
    if (
      photos?.length > 4 ||
      (data?.item?.photos && data?.item?.photos.length > 4)
    ) {
      updatePhotosInDb()
    } else if (
      photos?.length < 5 ||
      (data?.item?.Photos && data?.item?.Photos.length < 5)
    ) {
      toast.error("Please add at least 5 photos")
    }
  }

  const onSubmit = (formData: T_BedUnit) => {
    formData.amenities = amenities
    formData.photos = photos
    console.log(formData)
  }

  useEffect(() => {
    setValue("typeCount", typeCount)
  }, [typeCount])

  useEffect(() => {
    if (!isPending && data && data.item) {
      setPhotos(data?.item?.photos)
    }
  }, [data, isPending])

  return (
    <div className="mt-20 mb-28">
      <div className="mb-8">
        <Link href={`/hosting/listings/properties/${listingId}/units`}>
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
              {...register("name", {
                required: "This field is required",
              })}
              label="Name"
              required
            >
              <>
                <Option value={""}>Select Name</Option>
                <Option>Bed in 8-Bed Mixed Dorm</Option>
              </>
            </Select>
          </div>
          <div>
            <Select
              {...register("bed", {
                required: "This field is required",
              })}
              label="Bed"
              required
            >
              <>
                <Option value={""}>Select Bed</Option>
                <Option>Single Bunk Bed</Option>
              </>
            </Select>
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
