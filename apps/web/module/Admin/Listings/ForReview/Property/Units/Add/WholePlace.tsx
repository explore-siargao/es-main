"use client"
import { Typography } from "@/common/components/ui/Typography"
import { LucideChevronLeft, MinusIcon, Plus, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/common/components/ui/Button"
import AmenitiesCheckbox from "../AmenitiesCheckbox"
import { useEffect, useState } from "react"
import useAmenitySelectStore from "@/common/store/useAmenitySelectStore"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "next/navigation"

type T_Beds = {
  bedName: string
  bedType: string
}

type T_WholePlaceUnit = {
  name: string
  bedCount: number
  beds: T_Beds[]
  size: number
  bathrooms: number
  typeCount: number
  amenities: {}[]
}

const WholePlace = () => {
  const params = useParams()
  const listingId = Number(params.listingId)
  const [bedCount, setBedCount] = useState(0)
  const [bedInputs, setBedInputs] = useState([])
  const [bathroomCount, setBathroomCount] = useState(0)
  const [typeCount, setTypeCount] = useState(0)

  const selectedAmenities = useAmenitySelectStore((state) => state.amenities)

  const { register, unregister, handleSubmit, setValue } =
    useForm<T_WholePlaceUnit>()

  const onSubmit = (formData: T_WholePlaceUnit) => {
    if (bedCount > 0) {
      formData.amenities = selectedAmenities
      formData.bedCount = bedCount
      console.log(formData)
    } else {
      toast.error("Must have at least 1 bedroom or sleeping space.")
    }
  }

  const addBedInput = () => {
    // @ts-ignore
    setBedInputs((prevBedInput) => [...prevBedInput, bedCount])
    setBedCount((prevBedCount) => prevBedCount + 1)
  }

  const removeBedInput = () => {
    if (bedInputs.length > 0) {
      // @ts-ignore
      unregister(`beds[${bedInputs.length - 1}]`)

      setBedInputs((prevBedInputs) => prevBedInputs.slice(0, -1))
      setBedCount((prevBedCount) => prevBedCount - 1)
    }
  }

  useEffect(() => {
    setValue("bedCount", bedCount)
    setValue("bathrooms", bathroomCount)
    setValue("typeCount", typeCount)
  }, [bedCount, bathroomCount, typeCount])

  return (
    <div className="mt-20 mb-28">
      <div className="mb-16">
        <Link href={`/hosting/listings/properties/${listingId}/units`}>
          <LucideChevronLeft className="text-text-300 hover:text-text-500 transition" />
        </Link>
        <Typography variant="h1" fontWeight="semibold" className="mt-4">
          Units / Add Whole Place
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
              <option>Double Room</option>
            </select>
          </div>
          <div>
            <Typography variant="h4" fontWeight="semibold" className="mb-2">
              Total Size (sqm)
            </Typography>
            <input
              type="number"
              id="size"
              {...register("size", { required: true })}
              className="block w-60 rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="0"
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
            {bedInputs.map((bedInput, index) => (
              <div className="grid grid-cols-2 my-3 gap-x-3" key={index}>
                <input
                  type="text"
                  id={`bed-name-${index}`}
                  // @ts-ignore
                  {...register(`beds[${index}].bedName`, { register: true })}
                  className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder={`Enter bed name here`}
                  required
                />
                <input
                  type="text"
                  id={`bed-type-${index}`}
                  // @ts-ignore
                  {...register(`beds[${index}].bedType`, { register: true })}
                  className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder={`Enter bed type here`}
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
                    setBathroomCount((bathroomCount) => bathroomCount - 1)
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
                  setBathroomCount((bathroomCount) => bathroomCount + 1)
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
        <hr className="mb-4" />
        <Typography variant="h4" fontWeight="semibold" className="mb-3">
          Amenities and Facilities (for the whole place itself)
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
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default WholePlace
