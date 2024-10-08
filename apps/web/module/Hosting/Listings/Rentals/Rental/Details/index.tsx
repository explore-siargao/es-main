"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Option } from "@/common/components/ui/Select"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import useGetRentalById from "../../../hooks/useGetRentalById"
import {
  E_Rental_Category,
  E_Rental_Condition,
  T_Rental_Details,
} from "@repo/contract"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import { APP_NAME } from "@repo/constants"
import useUpdateRentalDetails from "../hooks/useUpdateRentalDetails"
import { Input2 } from "@/common/components/ui/Input2"
import { Select2 } from "@/common/components/ui/Select2"

type Prop = {
  pageType: "setup" | "edit"
}

const Details = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetRentalById(listingId)
  const { mutate, isPending } = useUpdateRentalDetails(listingId)
  const { register, handleSubmit, getValues, watch } =
    useForm<T_Rental_Details>({
      values: data?.item?.Details as T_Rental_Details,
    })

  const onSubmit = (formData: T_Rental_Details) => {
    const dbCategory = data?.item?.category
    if (
      (dbCategory !== E_Rental_Category.Bicycle &&
        formData.isRegistered === "Yes" &&
        formData.haveDriverLicense === "Yes") ||
      dbCategory === E_Rental_Category.Bicycle
    ) {
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
              router.push(
                `/hosting/listings/rentals/setup/${listingId}/add-ons`
              )
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
          engineCapacityLiter:
            typeof getValues("engineCapacityLiter") === "undefined" ||
            getValues("engineCapacityLiter") === null
              ? (getValues("engineCapacityCc") as number) / 1000
              : getValues("engineCapacityLiter"),
          engineCapacityCc:
            typeof getValues("engineCapacityCc") === "undefined" ||
            getValues("engineCapacityCc") === null
              ? (getValues("engineCapacityLiter") as number) * 1000
              : getValues("engineCapacityCc"),
        },
        callBackReq
      )
    } else {
      if (formData.haveDriverLicense === "No") {
        toast.error(
          "Sorry! We cannot proceed if you haven't a driver's license"
        )
      } else {
        toast.error("Sorry! We cannot proceed if this is not registered")
      }
    }
  }

  const isRegistered = watch("isRegistered", data?.item?.details?.isRegistered)
  const haveDriverLicense = watch(
    "haveDriverLicense",
    data?.item?.details?.haveDriverLicense || "No"
  )
  const currentCondition = watch("condition", data?.item?.details?.condition)
  return (
    <div className="mt-20 mb-14">
      <Typography variant="h1" fontWeight="semibold">
        Details
      </Typography>
      <form className="grid grid-cols-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {data?.item?.category === E_Rental_Category.Car && (
            <Input2
              type="text"
              id="engineCapacity"
              defaultValue={data.item?.details?.engineCapacityLiter}
              step=".01"
              label="Engine Capacity (L)"
              description="This refers to the total volume of all the engine's cylinders combined, measured in liters (L)"
              placeholder="Example: 2.0"
              disabled={isPending || isLoading}
              {...register("engineCapacityLiter", {
                valueAsNumber: true,
              })}
            />
          )}
          {data?.item?.category === E_Rental_Category.Motorbike && (
            <Input2
              type="number"
              description="This is the motorbike's engine displacement or the total volume of all the cylinders in the engine"
              placeholder="Example: 500"
              id="engineCapacity"
              defaultValue={data.item?.details?.engineCapacityCc}
              step=".01"
              label="Engine Capacity (CC)"
              disabled={isPending || isLoading}
              {...register("engineCapacityCc", {
                valueAsNumber: true,
              })}
            />
          )}
          <Select2
            label="Condition"
            description="This is your vehicle's current condition"
            id="condition"
            required
            disabled={isPending || isLoading}
            {...register("condition", { required: true })}
          >
            <Option value="">Select</Option>
            {Object.keys(E_Rental_Condition).map((key) => {
              return (
                <Option key={key} selected={key === currentCondition}>
                  {key}
                </Option>
              )
            })}
          </Select2>
          <Input2
            type="text"
            description="This refers to the color of the vehicle's outer surface"
            placeholder="Example: Black"
            id="exteriorColor"
            label="Exterior Color"
            disabled={isPending || isLoading}
            defaultValue={data?.item?.details?.exteriorColor}
            {...register("exteriorColor")}
          />
          {data?.item?.category === E_Rental_Category.Car && (
            <Input2
              type="text"
              description="This refers to the color of the vehicle's interior color"
              placeholder="Example: White"
              id="interiorColor"
              label="Interior Color"
              disabled={isPending || isLoading}
              {...register("interiorColor")}
              defaultValue={data?.item?.details?.interiorColor}
            />
          )}
          {data?.item?.category !== E_Rental_Category.Bicycle && (
            <Input2
              type="number"
              id="seatingCapacity"
              label="Seating Capacity"
              description="This is the maximum count of passengers that the vehicle can accomodate."
              placeholder="Example: 2"
              required={data?.item?.category === E_Rental_Category.Car}
              disabled={isPending || isLoading}
              defaultValue={data?.item?.details?.seatingCapacity}
              {...register("seatingCapacity", {
                required: data?.item?.category === E_Rental_Category.Car,
                valueAsNumber: true,
              })}
            />
          )}
          <Input2
            type="number"
            id="weightCapacity"
            label="Weight Capacity (kg)"
            description="This is the total of maximum weight that the vehicle can carry."
            placeholder="Example: 120"
            step=".01"
            disabled={isPending || isLoading}
            defaultValue={data?.item?.details?.weightCapacityKg}
            {...register("weightCapacity", {
              valueAsNumber: true,
            })}
          />
          {data?.item?.category !== E_Rental_Category.Bicycle && (
            <div>
              <label className="block text-xs font-medium text-text-900">
                Have a driver's license?
              </label>
              <div className="flex items-center mt-2">
                <label
                  htmlFor="haveDriverLicense-no"
                  className="mr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  No
                </label>
                <input
                  id="haveDriverLicense-no"
                  type="radio"
                  disabled={isPending || isLoading}
                  {...register("haveDriverLicense", { required: true })}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                  value="No"
                  required
                  checked={haveDriverLicense === "No"}
                />
                <label
                  htmlFor="haveDriverLicense-yes"
                  className="ml-4 mr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Yes
                </label>
                <input
                  id="haveDriverLicense-yes"
                  type="radio"
                  disabled={isPending || isLoading}
                  {...register("haveDriverLicense", { required: true })}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                  value="Yes"
                  required
                  checked={haveDriverLicense === "Yes"}
                />
              </div>
            </div>
          )}
          {data?.item?.category !== E_Rental_Category.Bicycle && (
            <div>
              <label className="block text-xs font-medium text-text-900">
                Is the vehicle registered and lawful?
              </label>
              <div className="flex items-center mt-2">
                <label
                  htmlFor="registered-no"
                  className="mr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  No
                </label>
                <input
                  id="registered-no"
                  type="radio"
                  disabled={isPending || isLoading}
                  {...register("isRegistered", { required: true })}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                  value="No"
                  required
                  checked={isRegistered === "No"}
                />
                <label
                  htmlFor="registered-yes"
                  className="ml-4 mr-2 block text-sm font-medium leading-6 text-gray-900"
                >
                  Yes
                </label>
                <input
                  id="registered-yes"
                  type="radio"
                  disabled={isPending || isLoading}
                  {...register("isRegistered", { required: true })}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                  value="Yes"
                  required
                  checked={isRegistered === "Yes"}
                />
              </div>
              <Typography
                variant="p"
                className="text-xs text-text-300 italic mt-2"
              >
                By selecting "Yes" you are certifying that the vehicle is
                legally registered and that {APP_NAME} is not responsible for
                any legal matter that may occur while being use by the guests.
              </Typography>
            </div>
          )}
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

export default Details
