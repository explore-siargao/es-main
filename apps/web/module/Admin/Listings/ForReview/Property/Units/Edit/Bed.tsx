"use client"
import { Typography } from "@/common/components/ui/Typography"
import { LucideChevronLeft, MinusIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
import AmenitiesCheckbox from "../AmenitiesCheckbox"
import { useEffect, useState } from "react"
import useAmenitySelectStore from "@/common/store/useAmenitySelectStore"
import { useForm } from "react-hook-form"
import { FileWithPath, useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import Image from "next/image"
import EditPhotoModal from "../../../../components/modals/EditPhotoModal"
import usePhotoStore from "../../../../store/usePhotoStore"
import { useParams } from "next/navigation"

type T_BedUnit = {
  name: string
  bed: string
  typeCount: number
  photos: {}[]
  amenities: {}[]
}

const dummy = [
  {
    id: 1,
    imageKey: "1.jpg",
    name: "1-person bed",
    type: "Bed",
    description: "1x1 bed with spacious alley",
    qty: 1,
    amenities: [
      {
        category: "Bathroom",
        amenity: "Bidet",
      },
      {
        category: "Most popular",
        amenity: "Kitchen",
      },
    ],
    photos: [
      {
        id: 1,
        description: "Outdoor view",
        key: "1.jpg",
        tag: "#outdoor",
        thumbKey: "1.jpg",
      },
      {
        id: 2,
        description: "Inside view",
        key: "2.jpg",
        tag: "#inside",
        thumbKey: "2.jpg",
      },
    ],
  },
  {
    id: 2,
    imageKey: "3.jpg",
    name: "2-person bed",
    type: "Bed",
    description: "2x2 bed with spacious alley",
    qty: 2,
    amenities: [
      {
        category: "Most popular",
        amenity: "Free WiFi",
      },
      {
        category: "Living area",
        amenity: "iPod dock",
      },
      {
        category: "Most popular",
        amenity: "Ocean view",
      },
    ],
    photos: [
      {
        id: 1,
        description: "Ocean view",
        key: "5.jpg",
        tag: "#ocean",
        thumbKey: "5.jpg",
      },
      {
        id: 2,
        description: "High view",
        key: "3.jpg",
        tag: "#high",
        thumbKey: "3.jpg",
      },
    ],
  },
  {
    id: 3,
    imageKey: "4.jpg",
    name: "3-person bed",
    type: "Bed",
    description: "3x3 bed with spacious alley",
    qty: 1,
    amenities: [
      {
        category: "Most popular",
        amenity: "Non-smoking",
      },
      {
        category: "Bathroom",
        amenity: "Towels",
      },
    ],
    photos: [
      {
        id: 1,
        description: "Nice view",
        key: "2.jpg",
        tag: "#nice",
        thumbKey: "2.jpg",
      },
      {
        id: 2,
        description: "Good view",
        key: "1.jpg",
        tag: "#good",
        thumbKey: "1.jpg",
      },
      {
        id: 3,
        description: "Great view",
        key: "4.jpg",
        tag: "#great",
        thumbKey: "4.jpg",
      },
    ],
  },
]

const Bed = () => {
  const params = useParams()
  const listingId = Number(params.listingId)
  const { bedId } = params
  // @ts-ignore
  const data = dummy.find((x) => x.id === parseInt(bedId))

  const [typeCount, setTypeCount] = useState(data?.qty || 0)
  const [editPhotoModal, setEditPhotoModal] = useState(false)

  const photos = usePhotoStore((state) => state.photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)
  const setToEditPhotoIndex = usePhotoStore(
    (state) => state.setToEditPhotoIndex
  )

  const selectedAmenities = useAmenitySelectStore((state) => state.amenities)
  const setCurrentAmenities = useAmenitySelectStore(
    (state) => state.setCurrentAmenities
  )

  const { register, handleSubmit, setValue } = useForm<T_BedUnit>()

  const onSubmit = (formData: T_BedUnit) => {
    formData.amenities = selectedAmenities
    formData.photos = photos
    console.log(formData)
  }

  const isPending = false

  const { getRootProps, getInputProps, isFocused } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedPhotos: FileWithPath[]) => {
      const updatedPhotos = acceptedPhotos.map((file) => ({
        file: {
          ...file,
          preview: URL.createObjectURL(file),
        },
        description: "",
        tags: "",
        isMain: false,
      }))
      setPhotos([...photos, ...updatedPhotos])
    },
    onDropRejected: () => {
      toast.error("Only images are allowed")
    },
    disabled: isPending,
  })

  useEffect(() => {
    setValue("typeCount", typeCount)
  }, [typeCount])

  useEffect(() => {
    const updatedPhotos = data?.photos?.map((item) => ({
      file: { preview: "/assets/" + item.key },
      description: item.description,
      tags: item.tag,
      isMain: item.key === data.imageKey,
    }))
    // @ts-ignore
    setPhotos(updatedPhotos)

    data?.amenities?.forEach((amenity) => setCurrentAmenities(amenity))
  }, [])

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
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              Name
            </Typography>
            <select
              id="name"
              {...register("name")}
              className="block w-60 rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
            >
              <option>{data?.name}</option>
              <option>Bed in 8-Bed Mixed Dorm</option>
            </select>
          </div>
          <div>
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              Bed
            </Typography>
            <select
              id="bed"
              {...register("bed")}
              className="block w-60 rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm"
            >
              <option>{data?.description}</option>
              <option>Single Bunk Bed</option>
            </select>
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
        <Typography variant="h4" fontWeight="semibold" className="mb-3">
          Photos
        </Typography>
        <Typography
          variant="h6"
          fontWeight="semibold"
          className="text-gray-500 mb-0.5 italic"
        >
          Please upload atleast 5 photos
        </Typography>
        <Typography
          variant="h6"
          fontWeight="semibold"
          className="text-gray-500 mb-0.5 italic"
        >
          Minimum dimension is 800x600
        </Typography>
        <Typography
          variant="h6"
          fontWeight="semibold"
          className="text-gray-500 mb-4 italic"
        >
          Maximum file size is 10mb
        </Typography>
        <div className="grid grid-cols-4 gap-6">
          <div className="relative h-52 w-full overflow-hidden bg-primary-100 hover:bg-primary-200 flex justify-center items-center rounded-lg hover:cursor-pointer">
            <label
              {...getRootProps()}
              htmlFor="dropzone-file"
              className={cn(
                isPending && "opacity-50",
                isFocused && "opacity-80",
                "flex flex-col items-center justify-center w-full h-52 border-2 border-primary-300 border-dashed rounded-lg cursor-pointer bg-primary-50 hover:bg-primary-100"
              )}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-primary-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <Typography className="mb-2 text-text-500 px-2 text-center">
                  <span className="font-semibold">Drop photos here</span> or
                  click this
                </Typography>
                <Typography className="text-xs text-text-500">
                  PNG, JPG or GIF
                </Typography>
              </div>
              <input {...getInputProps()} />
            </label>
          </div>
          {photos?.map((photo, index) => (
            <div key={index} className="h-full">
              {photo.isMain && (
                <div className="flex justify-center">
                  <span className="absolute mt-[-16px] z-10 rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                    Preferred main photo
                  </span>
                </div>
              )}
              <button
                className={cn(
                  `relative h-52 w-full bg-primary-50 rounded-lg`,
                  photo.isMain && "border-2 border-secondary-500"
                )}
                type="button"
                onClick={() => {
                  setToEditPhotoIndex(index)
                  setEditPhotoModal(true)
                }}
              >
                <Image
                  src={photo?.file?.preview ?? "/assets/1.jpg"}
                  alt={`preview-` + index}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
              </button>
              <Typography
                className={`${photo.description ? "text-gray-900" : "text-gray-500"} text-sm mt-3 truncate`}
              >
                {photo.description || "No description"}
              </Typography>
            </div>
          ))}
        </div>
        <hr className="mt-6 mb-4" />
        <Typography variant="h4" fontWeight="semibold" className="mb-3">
          Amenities and Facilities (for the bed itself)
        </Typography>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <AmenitiesCheckbox category="Most popular" level="unit" />
          <AmenitiesCheckbox category="Bathroom" level="unit" />
          <AmenitiesCheckbox category="Living area" level="unit" />
          <AmenitiesCheckbox category="Kitchen" level="unit" />
          <AmenitiesCheckbox category="General" level="unit" />
          <AmenitiesCheckbox category="Outdoors" level="unit" />
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
