"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Option } from "@/common/components/ui/Select"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import useGetRentalById from "../../../hooks/useGetRentalById"
import { E_Rental_Category, T_Rental_Basic_Info } from "@repo/contract"
import toast from "react-hot-toast"
import {
  E_Rental_Car_Body,
  E_Rental_Vehicle_Fuel,
  E_Rental_Vehicle_Transmission,
} from "@repo/contract"
import useUpdateRentalBasicInfo from "../../../hooks/useUpdateRentalBasicInfo"
import { cn } from "@/common/helpers/cn"
import { Input2 } from "@/common/components/ui/Input2"
import { Select2 } from "@/common/components/ui/Select2"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"

type Prop = {
  pageType: "setup" | "edit"
}

const BasicInfo = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading, isFetching } = useGetRentalById(listingId)
  const { mutate, isPending } = useUpdateRentalBasicInfo(listingId)
  const { register, handleSubmit, watch } = useForm<T_Rental_Basic_Info>({
    values: data?.item as T_Rental_Basic_Info,
  })
  const [cancellationDaysCount, setCancellationDaysCount] = useState<number>(
    Number(data?.item?.daysCanCancel) || 1
  )

  const onSubmit = (formData: T_Rental_Basic_Info) => {
    console.log("Submitting data:", formData)
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
            router.push(`/hosting/listings/rentals/setup/${listingId}/details`)
          }
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutate(formData, callBackReq)
  }

  const category = watch("category") as E_Rental_Category

  const getDescription = (category: E_Rental_Category) => {
    switch (category) {
      case E_Rental_Category.Motorbike:
        return "This refers to the brand or manufacturer of the motobike."
      case E_Rental_Category.Bicycle:
        return "Specify the model or version of the bicycle."
      case E_Rental_Category.Car:
        return "This refers to the brand or manufacturer of the car."
      default:
        return "Specify the model or version of the vehicle."
    }
  }
  const getModelDescription = (category: E_Rental_Category) => {
    switch (category) {
      case E_Rental_Category.Motorbike:
        return "This refers to the specific version or type of the motorbike produced by a manufacturer."
      case E_Rental_Category.Bicycle:
        return "Specify the model or version of the bicycle."
      case E_Rental_Category.Car:
        return "This refers to the specific version or type of the car produced by a manufacturer."
      default:
        return "Specify the model or version of the vehicle."
    }
  }

  const getPlaceholder = (category: E_Rental_Category) => {
    switch (category) {
      case E_Rental_Category.Motorbike:
        return "Example: Yamaha MT-07"
      case E_Rental_Category.Bicycle:
        return "Example: Mountain Bike Pro"
      case E_Rental_Category.Car:
        return "Example: Honda Civic"
      default:
        return "Example: Vehicle Model"
    }
  }
  const getMakePlaceholder = (category: E_Rental_Category) => {
    switch (category) {
      case E_Rental_Category.Motorbike:
        return "Example: Yamaha"
      case E_Rental_Category.Bicycle:
        return "Example: Giant"
      case E_Rental_Category.Car:
        return "Example: Honda"
      default:
        return "Example: Manufacturer"
    }
  }
  useEffect(() => {
    if (!isPending && !isFetching && data?.item?.daysCanCancel) {
      const daysCanCancel = Number(data?.item?.daysCanCancel)
      setCancellationDaysCount(daysCanCancel)
    }
  }, [data, isPending, isFetching])

  return (
    <div className="mt-20 mb-32">
      <Typography variant="h1" fontWeight="semibold">
        Basic Information
      </Typography>
      <form className="grid grid-cols-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Select2
            label="Category"
            description="Select category for your rental vehicle"
            id="rental-category"
            required
            disabled={isPending || isLoading || pageType === "edit"}
            {...register("category", { required: true })}
          >
            <Option value="">Select</Option>
            {Object.keys(E_Rental_Category).map((key) => {
              return <Option>{key}</Option>
            })}
          </Select2>

          {category && category !== E_Rental_Category.Bicycle ? (
            <Input2
              type="text"
              id="make"
              label="Make"
              description={getDescription(category)}
              placeholder={getMakePlaceholder(category)}
              required
              disabled={isPending || isLoading}
              {...register("make", { required: true })}
            />
          ) : (
            <Input2
              description="This refers to the brand or manufacturer of the bicycle"
              placeholder="Example: Mountain Bike Pro"
              type="text"
              id="make"
              label="Make"
              required
              disabled={isPending || isLoading}
              {...register("make", { required: true })}
            />
          )}

          {category && category !== E_Rental_Category.Bicycle ? (
            <Input2
              type="text"
              id="model"
              label="Model / Badge"
              description={getModelDescription(category)}
              placeholder={getPlaceholder(category)}
              required
              disabled={isPending || isLoading}
              {...register("modelBadge", { required: true })}
            />
          ) : null}

          {watch("category") === E_Rental_Category.Car ? (
            <Select2
              label="Body"
              description="Select the vehicle's body type from the available options."
              id="body"
              required
              disabled={isPending || isLoading}
              {...register("bodyType", { required: true })}
            >
              <Option value="">Select</Option>
              {Object.keys(E_Rental_Car_Body).map((key) => {
                return <Option>{key}</Option>
              })}
            </Select2>
          ) : null}

          {watch("category") &&
          watch("category") !== E_Rental_Category.Bicycle ? (
            <>
              <Select2
                label="Fuel Type"
                description="This is the type of fuel used by your vehicle"
                id="fuel"
                required
                disabled={isPending || isLoading}
                {...register("fuel", { required: true })}
              >
                <Option value="">Select</Option>
                {Object.keys(E_Rental_Vehicle_Fuel).map((key) => {
                  return <Option>{key}</Option>
                })}
              </Select2>
              <Select2
                label="Transmission"
                description="This is the transmission type of your vehicle"
                id="transmission"
                required
                disabled={isPending || isLoading}
                {...register("transmission", { required: true })}
              >
                <Option value="">Select</Option>
                {Object.keys(E_Rental_Vehicle_Transmission).map((key) => {
                  return <Option>{key}</Option>
                })}
              </Select2>
              <Select2
                label="Year"
                description="Select your vehicle's manufacturing year from the dropdown."
                id="year"
                required
                disabled={isPending || isLoading}
                {...register("year", { required: true })}
              >
                {[...Array(2026 - 1950).keys()].map((index) => {
                  const year = 1950 + index
                  return (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  )
                })}
              </Select2>
            </>
          ) : null}

          <Input2
            type="number"
            id="qty"
            label="Quantity"
            description="How many of this do you have?"
            placeholder="Example: 2"
            required
            disabled={isPending || isLoading}
            {...register("qty", { required: true, valueAsNumber: true })}
          />
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
                      (cancellationDaysCount: any) => cancellationDaysCount - 1
                    )
                }}
              >
                <MinusIcon className="h-3 w-3" />
              </button>
              <input
                disabled={isLoading || isPending}
                type="number"
                id="daysCanCel"
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
                    (cancellationDaysCount: number) => cancellationDaysCount + 1
                  )
                }
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
          <Button
            size="sm"
            type="submit"
            className={cn(
              "disabled:bg-gray-600",
              isLoading || isPending ? "opacity-70 cursor-progress" : ""
            )}
          >
            {pageType === "setup" ? "Save & Next" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BasicInfo
