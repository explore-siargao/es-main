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
import { useParams, useRouter } from "next/navigation"
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
import { Spinner } from "@/common/components/ui/Spinner"
import Bedroom from "./components/Bedroom"
import { useBedroomStore, useBedroomStudioStore } from "./store/useBedroomStore"
import { SQM_TO_FT_CONVERSION_FACTOR } from "../constants"
import { IBedroom } from "../types"
import { Option } from "@/common/components/ui/Select"
import { RadioInput } from "@/module/Hosting/Listings/Activities/Activity/Inclusions"
import Livingroom from "./components/Livingroom"
import { useLivingroomStore } from "./store/useLivingroomStore"
import { Select2 } from "@/common/components/ui/Select2"
import { Input2 } from "@/common/components/ui/Input2"
import EditPhotoModal from "@/module/Hosting/Listings/components/modals/EditPhotoModal"
import useWholePlaceStore from "../../WholePlaceType/store/useWholePlaceTypeSelectedStore"

type T_WholePlaceUnit = {
  title: string
  subtitle: string
  bedCount: number
  bedRooms: IBedroom[]
  bedroomStudio: IBedroom[]
  size: number
  squareFoot: number
  bathrooms: number
  typeCount: number
  amenities: T_Property_Amenity[]
  exactUnitCount: number
  livingRoom: IBedroom[]
  description?: string
  tags?: string
  daysCanCancel: number
}

interface IWholePlaceBasicInfo {
  numBathRooms: number
  title: string
  totalSize: number
  qty: number
  bedRooms: IBedroom[]
  bedroomStudio: IBedroom[]
  livingRooms: IBedroom[]
  singleBedRoom: { name: string; qty: number }
  singleLivingRoom: { name: string; qty: number }
}

type Prop = {
  pageType: "setup" | "edit"
}

const WholePlace = ({ pageType }: Prop) => {
  const router = useRouter()
  const params = useParams()
  const listingId = String(params.listingId)
  const wholePlaceId = String(params.wholePlaceId)
  const [isSavings, setIsSavings] = useState(false)
  const queryClient = useQueryClient()
  const { data, refetch, isFetching, isPending, isLoading } =
    useGetUnitById(wholePlaceId)
  const bedrooms = useBedroomStore((state) => state.bedrooms)
  const bedroomsStudio = useBedroomStudioStore((state) => state.bedroomsStudio)
  const [editPhotoModal, setEditPhotoModal] = useState(false)

  const [bathroomCount, setBathroomCount] = useState<number>(
    Number(data?.item?.numBathRooms) || 0
  )

  const [exactUnitCount, setExactUnitCount] = useState<number>(
    Number(data?.item?.numExactUnit) || 1
  )
  const [cancellationDaysCount, setCancellationDaysCount] = useState<number>(
    Number(1)
  )
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
  console.log(photos)
  const setPhotos = usePhotoStore((state) => state.setPhotos)
  const setAmenties = useSelectAmenityStore(
    (state) => state.setDefaultAmenities
  )
  const selectedUnitType: string | undefined = String(
    useWholePlaceStore((state) => state.selectedWholePlaceType) ?? ""
  )

  const updateBedrooms = useBedroomStore((state) => state.updateBedrooms)
  useEffect(() => {
    if (data?.item?.bedRooms || data?.item?.livingRooms) {
      updateBedrooms(
        data?.item?.title === "Studio" || data?.item?.title === "STUDIO"
          ? data.item.livingRooms
          : data.item.bedRooms
      )
    }
  }, [data, updateBedrooms])

  const amenities = useSelectAmenityStore((state) => state.amenities)
  const { register, handleSubmit, setValue } = useForm<T_WholePlaceUnit>()
  const livingroomData = useLivingroomStore((state) => state.livingroom)

  const setLivingroomData = useLivingroomStore(
    (state) => state.setInitialLivingrooms
  )

  const handleUpdateLivingrooms = (updatedLivingroom: IBedroom[]) => {
    setLivingroomData(updatedLivingroom)
  }

  const updatePhotosInDb = async () => {
    const toAddPhotos =
      photos
        .filter((photo) => !photo._id && !photo.isDeleted)
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
          const message = String("New whole place unit successfully updated")
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

  const onSubmit = async (formData: T_WholePlaceUnit) => {
    formData.amenities = amenities
    const activePhotos = photos.filter((photo) => !photo.isDeleted)
    const missingTags = activePhotos.filter(
      (photo) => !photo.tags || photo.tags.length === 0
    )
    const missingDescription = activePhotos.filter(
      (photo) => !photo.description || photo.description.length === 0
    )

    const filterSelectedAmenities = amenities.filter(
      (amenity) => amenity.isSelected
    )

    if (formData.size <= 0) {
      toast.error("Please fill total size count field")
      return
    }

    if (bedrooms.length <= 0) {
      toast.error("Please fill out bedroom/space count field")
      return
    }

    if (bathroomCount <= 0) {
      toast.error("Please fill out bathroom count field")
      return
    }
    if (activePhotos.length < 3) {
      toast.error("Please add at least 3 photos")
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

    if (filterSelectedAmenities.length <= 0) {
      toast.error("Please select at least one amenity")
      return
    }

    try {
      if (bedrooms.length > 0) {
        setIsSavings(true)
        formData.amenities = amenities
        formData.bedRooms = bedrooms
      } else {
        toast.error("Must have at least 1 bedroom or sleeping space.")
        return
      }

      if (propertyType === "Whole place") {
        formData.subtitle = selectedUnitType ?? ""
      }

      const commonProps = {
        _id: wholePlaceId,
        title: formData.title,
        subtitle: formData.subtitle,
        numBathRooms: bathroomCount,
        totalSize: formData.size,
        qty: Number(exactUnitCount),
        daysCanCancel: Number(cancellationDaysCount),
      }

      if (bedroomsStudio.length > 0) {
        formData.bedroomStudio = bedroomsStudio
      }

      const unitSpecificProps: Omit<IWholePlaceBasicInfo, "_id"> =
        unitType === "STUDIO"
          ? {
              bedRooms: [],
              bedroomStudio: [],
              livingRooms: bedrooms.length > 0 ? [bedrooms[0] as IBedroom] : [],
              singleBedRoom: { name: "", qty: 0 },
              singleLivingRoom: {
                name: singleRoomBed,
                qty: singleRoomBedCount,
              },
              numBathRooms: bathroomCount,
              title: formData.title,
              totalSize: formData.size,
              qty: Number(exactUnitCount),
            }
          : {
              livingRooms: livingroomData,
              bedRooms: bedrooms,
              bedroomStudio: bedroomsStudio,
              singleBedRoom: { name: singleRoomBed, qty: singleRoomBedCount },
              singleLivingRoom: { name: "", qty: 0 },
              numBathRooms: bathroomCount,
              title: formData.title,
              totalSize: formData.size,
              qty: Number(exactUnitCount),
            }

      const saveBasicInfo = await updateWholePlaceBasicInfo({
        ...commonProps,
        ...unitSpecificProps,
      })

      const saveAmenities = updateAmenties({ amenities: formData?.amenities })

      const filterSelectedAmenities = amenities.filter(
        (amenity) => amenity.isSelected
      )

      if (filterSelectedAmenities.length > 0) {
        await updatePhotosInDb()
        setIsSavings(false)
        await Promise.all([saveBasicInfo, saveAmenities])
      } else {
        toast.error("Please select at least one amenity")
      }

      refetch()
    } catch (error) {
      toast.error("An error occurred while saving data")
    }
  }

  useEffect(() => {
    if (!isPending && !isFetching && data?.item) {
      setValue("title", data?.item?.title)
      setValue("subtitle", data?.item?.subtitle)
      setValue("size", data?.item?.totalSize)
      setBathroomCount(Number(data?.item.numBathRooms))
      setExactUnitCount(Number(data?.item.qty))
      setCancellationDaysCount(Number(data?.item.daysCanCancel) || Number(1))
      setPhotos(data?.item?.photos)
      setAmenties(data.item?.amenities)
      handleSqmChange(data.item?.totalSize)
      const livingRooms = data.item?.livingRooms || []
      setLivingroomData(livingRooms)
      setHasSleepingSpaces(livingRooms.length > 0 ? "yes" : "no")
    }
  }, [data, isPending, isFetching])

  const [sizeValues, setSizeValues] = useState({
    sqm: 0,
    squareFoot: 0,
  })

  const handleSqmChange = (value: string) => {
    const newSquareFoot = (Number(value) * SQM_TO_FT_CONVERSION_FACTOR).toFixed(
      2
    )

    setSizeValues({
      sqm: Number(value),
      squareFoot: Number(newSquareFoot),
    })
  }

  const [unitType, setUnitType] = useState(data?.item?.subtitle || "")
  const [singleRoomBed, setSingleRoomBed] = useState("Single Bed")
  const [singleRoomBedCount, setSingleRoomBedCount] = useState(0)
  const [hasSleepingSpaces, setHasSleepingSpaces] = useState("")
  const [propertyType, setPropertyType] = useState<string | null>(null)

  const isLivingRoomVisible =
    unitType === "Studio" || hasSleepingSpaces === "yes"
  useEffect(() => {
    if (data) {
      setUnitType(data?.item?.subtitle || "villa")
      if (
        data?.item?.subtitle === "Studio" ||
        data?.item?.subtitle === "STUDIO"
      ) {
        setSingleRoomBed(data?.item?.singleLivingRoom?.name || "Single Bed")
        setSingleRoomBedCount(data?.item?.singleLivingRoom?.qty || 0)
      } else {
        setSingleRoomBed(data?.item?.singleBedRoom?.name || "Single Bed")
        setSingleRoomBedCount(data?.item?.singleBedRoom?.qty || 0)
      }
    }
  }, [data])

  const { resetBedroom } = useBedroomStore()
  const { resetLivingroom } = useLivingroomStore()

  useEffect(() => {
    if (
      (unitType === "STUDIO" && !data?.item?.singleLivingRoom?.name) ||
      (unitType !== "STUDIO" && !data?.item?.singleBedRoom?.name)
    ) {
      resetBedroom()
      resetLivingroom()
    }

    if (unitType === "STUDIO" && data?.item?.singleLivingRoom?.name) {
      updateBedrooms(data.item.livingRooms)
    }

    if (unitType !== "STUDIO" && data?.item?.singleBedRoom?.name) {
      updateBedrooms(data.item.bedRooms)
    }
  }, [unitType])
  useEffect(() => {
    const storedPropertyType = localStorage.getItem("propertyType")
    setPropertyType(storedPropertyType)
  }, [])

  const renderUnitTypeSelect = () => {
    switch (propertyType) {
      case "HOTEL":
        return (
          <Select2
            label="Unit Type"
            description="Which unit type best represents your space?"
            disabled={isPending || isFetching}
            {...register("subtitle", {
              required: "This field is required",
            })}
            onChange={(e) => setUnitType(e.currentTarget.value)}
          >
            <Option value="VILLA">Villa</Option>
            <Option value="APARTMENT">Apartment</Option>
            <Option value="STUDIO">Studio apartment</Option>
            <Option value="BUNGALOW">Bungalow</Option>
          </Select2>
        )
      case "RESORT":
        return (
          <Select2
            label="Unit Type"
            description="Which unit type best represents your space?"
            disabled={isPending || isFetching}
            {...register("subtitle", {
              required: "This field is required",
            })}
            onChange={(e) => setUnitType(e.currentTarget.value)}
          >
            <Option value="VILLA">Villa</Option>
            <Option value="APARTMENT">Apartment</Option>
            <Option value="STUDIO">Studio Apartment</Option>
            <Option value="HOUSE">House</Option>
            <Option value="BUNGALOW">Bungalow</Option>
          </Select2>
        )
      case "WHOLE_PLACE":
        return pageType === "setup" ? (
          <Select2
            label="Unit Type"
            description="Which unit type best represents your space?"
            disabled={true}
            value={selectedUnitType}
            {...register("subtitle", {})}
            className="bg-gray-100 cursor-not-allowed"
          >
            <Option value="VILLA">Villa</Option>
            <Option value="HOUSE">House</Option>
            <Option value="BUNGALOW">Bungalow</Option>
            <Option value="COTTAGE">Cottage</Option>
          </Select2>
        ) : (
          <Select2
            label="Unit Type"
            description="Which unit type best represents your space?"
            disabled={isPending || isFetching}
            {...register("subtitle", {
              required: "This field is required",
            })}
            className="bg-gray-100 cursor-not-allowed"
          >
            <Option value="VILLA">Villa</Option>
            <Option value="HOUSE">House</Option>
            <Option value="BUNGALOW">Bungalow</Option>
            <Option value="COTTAGE">Cottage</Option>
          </Select2>
        )

      case "APARTMENT":
        return (
          <Select2
            label="Unit Type"
            description="Which unit type best represents your space?"
            disabled={false}
            {...register("subtitle", {
              required: "This field is required",
            })}
            onChange={(e) => setUnitType(e.currentTarget.value)}
          >
            <Option value="APARTMENT">Apartment</Option>
            <Option value="STUDIO">Studio Apartment</Option>
          </Select2>
        )
      default:
        return (
          <Select2
            label="Unit Type"
            description="Which unit type best represents your space?"
            disabled={isPending || isFetching}
            {...register("subtitle", {
              required: "This field is required",
            })}
            onChange={(e) => setUnitType(e.currentTarget.value)}
          >
            <Option value="VILLA">Villa</Option>
            <Option value="APARTMENT">Apartment</Option>
            <Option value="STUDIO">Studio apartment</Option>
            <Option value="HOUSE">House</Option>
            <Option value="CONDOMINIUM">Condominium</Option>
          </Select2>
        )
    }
  }

  const category = data?.item?.category
  console.log("test: ", category)

  return (
    <>
      {isPending || isFetching ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
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
            <div className="grid grid-cols-4 gap-y-2 py-2">
              {renderUnitTypeSelect()}
            </div>

            <div>
              {unitType !== "" && (
                <>
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="mt-4"
                  >
                    Where can guests sleep?
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="normal"
                    className="mb-2 text-xs text-gray-500 italic"
                  >
                    {unitType !== "STUDIO"
                      ? "How many comfortable living spaces does this unit have? Click to add bed type."
                      : `What type does this unit have?`}
                  </Typography>
                  <div className="grid grid-cols-2">
                    {unitType === "STUDIO" ? (
                      <div className="flex items-center space-x-7">
                        <div className="flex rounded-md">
                          <Bedroom unitType={unitType} />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Bedroom unitType={unitType} />
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="grid grid-cols-4 mt-3 mb-5">
                <Input2
                  label="Title"
                  description="What is the name you want to display for your unit? (Optional)"
                  placeholder="Example: Cozy River View Place"
                  id="title"
                  type="text"
                  minLength={5}
                  maxLength={30}
                  disabled={isPending || isFetching}
                  {...register("title")}
                />
              </div>

              {unitType != "" && (
                <div className="mt-4">
                  {unitType !== "STUDIO" && (
                    <div className="flex flex-col space-y-1">
                      <Typography variant="h4" fontWeight="semibold">
                        Do you have any sleeping spaces on your living room? Yes
                        or No
                      </Typography>
                      <div className="flex gap-4">
                        <RadioInput
                          id="hasSleepingSpaces"
                          value="yes"
                          checked={hasSleepingSpaces === "yes"}
                          onChange={() => setHasSleepingSpaces("yes")}
                          label="Yes"
                        />
                        <RadioInput
                          id="hasNoSleepingSpaces"
                          value="no"
                          checked={hasSleepingSpaces === "no"}
                          onChange={() => setHasSleepingSpaces("no")}
                          label="No"
                        />
                      </div>
                    </div>
                  )}

                  {isLivingRoomVisible && (
                    <>
                      {unitType === "STUDIO" ? (
                        <>
                          <Typography variant="h4" fontWeight="semibold">
                            Living room
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight="normal"
                            className="mb-2 text-gray-400"
                          >
                            How many comfortable living spaces does this unit
                            have? Click to add living room.
                          </Typography>
                          <div className="grid grid-cols-2">
                            <div>
                              {/* ito yung sa studio type */}
                              <Bedroom unitType={unitType} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="h4"
                            fontWeight="semibold"
                            className="mt-3"
                          >
                            Living room
                          </Typography>
                          <Typography
                            variant="h5"
                            fontWeight="normal"
                            className="mb-2 text-gray-400"
                          >
                            What type does this unit have?
                          </Typography>
                          <div className="grid grid-cols-2">
                            <div>
                              <Livingroom
                                unitType={unitType}
                                onLivingroomUpdate={handleUpdateLivingrooms}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 mt-4 gap-x-6">
              <div>
                <Typography variant="h4" fontWeight="semibold" className="mb-2">
                  How many bathrooms are in this unit?
                </Typography>
                <div className="flex">
                  <button
                    disabled={isPending || isFetching}
                    className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                    type="button"
                    onClick={() => {
                      bathroomCount > 0 &&
                        setBathroomCount(
                          (bathroomCount: any) => bathroomCount - 1
                        )
                    }}
                  >
                    <MinusIcon className="h-3 w-3" />
                  </button>
                  <input
                    disabled={isPending || isFetching}
                    type="number"
                    id="bathrooms"
                    className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    value={bathroomCount}
                    min={0}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      setBathroomCount(val)
                    }}
                  />
                  <button
                    disabled={isPending || isFetching}
                    className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                    type="button"
                    onClick={() =>
                      setBathroomCount(
                        (bathroomCount: number) => bathroomCount + 1
                      )
                    }
                  >
                    <PlusIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <Typography variant="h4" fontWeight="semibold" className="mt-4">
              How big is this unit?
            </Typography>
            <Typography
              variant="h5"
              fontWeight="normal"
              className="text-xs text-gray-500 italic mb-3"
            >
              Enter the unit size in square meters, we will automatically
              convert to square foot
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
            <div>
              <Typography variant="h4" fontWeight="semibold" className="mt-4">
                How many of this exact unit do you have?
              </Typography>
              <Typography
                variant="h5"
                fontWeight="normal"
                className="text-xs text-gray-500 italic mb-2"
              >
                Identical amenities, bedrooms, bathrooms, etc.
              </Typography>
              <div className="flex">
                <button
                  disabled={isPending || isFetching}
                  className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    exactUnitCount > 1 &&
                      setExactUnitCount(
                        (exactUnitCount: any) => exactUnitCount - 1
                      )
                  }}
                >
                  <MinusIcon className="h-3 w-3" />
                </button>
                <input
                  disabled
                  type="number"
                  id="exactUnit"
                  className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  value={exactUnitCount}
                  min={1}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setExactUnitCount(val)
                  }}
                />
                <button
                  disabled={isPending || isFetching}
                  className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() =>
                    setExactUnitCount(
                      (exactUnitCount: number) => exactUnitCount + 1
                    )
                  }
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div>
              <Typography variant="h4" fontWeight="semibold" className="mt-2">
                How many days before cancellation allowed?
              </Typography>
              <Typography
                variant="h5"
                fontWeight="normal"
                className="text-xs text-gray-500 italic mb-2"
              >
                How far in advance can a guest cancel their reservation?
              </Typography>
              <div className="flex">
                <button
                  disabled={isPending || isFetching}
                  className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    cancellationDaysCount > 1 &&
                      setCancellationDaysCount(
                        (cancellationDaysCount: any) =>
                          cancellationDaysCount - 1
                      )
                  }}
                >
                  <MinusIcon className="h-3 w-3" />
                </button>
                <input
                  // disabled
                  type="number"
                  id="daysCanCancel"
                  className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  value={cancellationDaysCount}
                  min={1}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setCancellationDaysCount(val)
                  }}
                />
                <button
                  disabled={isPending || isFetching}
                  className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() =>
                    setCancellationDaysCount(
                      (cancellationDaysCount: number) =>
                        cancellationDaysCount + 1
                    )
                  }
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
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
              <Button
                size="sm"
                type="submit"
                disabled={isPending || isFetching || isSavings}
              >
                Save changes
              </Button>
            </div>
          </form>
          <EditPhotoModal
            isOpen={editPhotoModal}
            onClose={() => setEditPhotoModal(false)}
            passedCategory={category}
          />
        </div>
      )}
    </>
  )
}

export default WholePlace
