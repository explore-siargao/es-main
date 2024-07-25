"use client"
import { Typography } from "@/common/components/ui/Typography"
import {
  LucideArmchair,
  LucideBath,
  LucideChevronLeft,
  LucideCookingPot,
  LucideInfo,
  LucideLayoutList,
  LucidePalmtree,
  LucideSparkles,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
import { useEffect, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
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
import useGetUnitById from "../hooks/useGetUnitById"
import { Input } from "@/common/components/ui/Input"
import { T_Update_Bed_Basic_Info } from "@repo/contract"

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
  const { control, register, handleSubmit, setValue, watch } =
    useForm<T_Update_Bed_Basic_Info>()

  const totalSizeInSqm = useWatch({
    control,
    name: "totalSize",
    defaultValue: data?.item?.totalSize || 0,
  })

  const totalSizeInSqft = (totalSizeInSqm * 10.76).toFixed(2)

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

  const onSubmit = async (formData: T_Update_Bed_Basic_Info) => {
    formData.amenities = amenities
    if (!formData.title) {
      toast.error("Please fill out all required fields")
      return
    }
    if (formData.totalSize <= 0) {
      toast.error("Please fill total size count field")
      return
    }
    try {
      const saveBasicInfo = updateBedBasicInfo({
        _id: bedId,
        title: formData.title,
        isHaveSharedBathRoom: formData.isHaveSharedBathRoom,
        isSmokingAllowed: formData.isSmokingAllowed,
        totalSize: formData.totalSize,
      })

      const saveAmenities = updateAmenities({ amenities: formData?.amenities })
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
      setValue("title", data?.item?.title)
      setValue("isHaveSharedBathRoom", data?.item?.isHaveSharedBathRoom)
      setValue("isSmokingAllowed", data?.item?.isSmokingAllowed)
      setValue("totalSize", data?.item?.totalSize)
      setPhotos(data?.item?.photos)
      setAmenities(data.item?.amenities)
    }
  }, [data, isPending])

  const bedOptions = [
    "Bed in 2 person dorm",
    "Bed in 4 person dorm",
    "Bed in 6 person dorm",
    "Bed in 8 person dorm",
    "Bed in 10 person dorm",
    "Bed in 12 person dorm",
    "Bed in 14 person dorm",
    "Bed in 16 person dorm",
    "Bed in 18 person dorm",
    "Bed in 20 person dorm",
  ]

  const [isOpen, setIsOpen] = useState(false)

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
      <Typography variant="h4" fontWeight="semibold" className="flex mb-2">
        What type of dorm room do you have?
        <div
          className="relative"
          role="button"
          tabIndex={0}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen(!isOpen)
            }
          }}
        >
          <LucideInfo className="cursor-pointer ml-1 w-5 h-5 hover:text-primary-600 transition-all" />
          {isOpen && (
            <div className="justify-items-center absolute z-10 w-64 bg-white p-4 shadow-lg rounded-md border border-primary-600 top-[-70px] left-[30px] transition-all">
              <Typography variant="h5" className="italic">
                Contact us if you can't find your shared space/dorm type
              </Typography>
            </div>
          )}
        </div>
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-6 mb-4">
          <div>
            <Controller
              control={control}
              name="title"
              defaultValue={data?.item?.description || ""}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Name"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  required
                >
                  <Option value={""}>Please select one</Option>
                  {bedOptions.map((option) => (
                    <Option
                      key={option}
                      value={option}
                      selected={data?.item?.title === option}
                    >
                      {option}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex mb-2"
            >
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
          <div className="mt-2">
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="flex mb-2"
            >
              Is smoking allowed in the dorm room?
            </Typography>
            <div className="flex items-center">
              <input
                id="isSmokingAllowed-no"
                type="radio"
                {...register("isSmokingAllowed", { required: true })}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                value="No"
                required
                checked={watch("isSmokingAllowed") === "No"}
              />
              <label
                htmlFor="isSmokingAllowed-no"
                className="ml-2 block text-sm font-medium leading-6 text-gray-900"
              >
                No
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                id="isSmokingAllowed-yes"
                type="radio"
                {...register("isSmokingAllowed", { required: true })}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                value="Yes"
                required
                checked={watch("isSmokingAllowed") === "Yes"}
              />
              <label
                htmlFor="isSmokingAllowed-yes"
                className="ml-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Yes
              </label>
            </div>
          </div>
        </div>
        <Typography variant="h4" fontWeight="semibold" className="flex mb-2">
          How big is this dorm room?
        </Typography>
        <Typography className="text-xs text-gray-500 italic mt-2 mb-2">
          Enter the dorm room size in square meters. We will automatically
          convert to square foot.
        </Typography>
        <div className="grid grid-cols-8 gap-x-6">
          <div>
            <Input
              label="Total Size (sqm)"
              id="totalSize"
              type="number"
              defaultValue={data?.item?.totalSize}
              {...register("totalSize", {
                required: "This field is required",
              })}
              required
            />
          </div>
          <div>
            <Input
              className="bg-gray-100 text-gray-200"
              label="Total Size (sqft)"
              id="totalSizeSqft"
              type="number"
              value={totalSizeInSqft}
              disabled
            />
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
