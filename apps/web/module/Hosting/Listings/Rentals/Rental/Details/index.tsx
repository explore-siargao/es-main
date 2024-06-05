"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Option, Select } from "@/common/components/ui/Select"
import { Input } from "@/common/components/ui/Input"
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

type Prop = {
  pageType: "setup" | "edit"
}

const Details = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetRentalById(listingId)
  const { mutate, isPending } = useUpdateRentalDetails(
    listingId as unknown as number
  )
  const { register, handleSubmit } = useForm<T_Rental_Details>({
    values: data?.item?.Details as T_Rental_Details,
  })

  const onSubmit = (formData: T_Rental_Details) => {
    const dbCategory = data?.item?.category
    if (
      (dbCategory !== E_Rental_Category.Bicycle &&
        formData.isRegistered === "Yes") ||
      dbCategory === E_Rental_Category.Bicycle
    ) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(data.message)
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
      mutate({ ...formData }, callBackReq)
    } else {
      toast.error("Sorry! We cannot proceed if this is not registered")
    }
  }
  return (
    <div className="mt-20 mb-14">
      <Typography variant="h1" fontWeight="semibold">
        Details
      </Typography>
      <form className="grid grid-cols-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {data?.item?.category === E_Rental_Category.Car && (
            <Input
              type="text"
              id="engineCapacity"
              step=".01"
              label="Engine Capacity (L)"
              disabled={isPending || isLoading}
              {...register("engineCapacityLiter", {
                valueAsNumber: true,
              })}
            />
          )}
          {data?.item?.category === E_Rental_Category.Motorbike && (
            <Input
              type="text"
              id="engineCapacity"
              step=".01"
              label="Engine Capacity (CC)"
              disabled={isPending || isLoading}
              {...register("engineCapacityCc", {
                valueAsNumber: true,
              })}
            />
          )}
          <Select
            label="Condition"
            id="condition"
            required
            disabled={isPending || isLoading}
            {...register("condition", { required: true })}
          >
            <Option value="">Select</Option>
            {Object.keys(E_Rental_Condition).map((key) => {
              return <Option>{key}</Option>
            })}
          </Select>
          <Input
            type="text"
            id="exteriorColor"
            label="Exterior Color"
            disabled={isPending || isLoading}
            {...register("exteriorColor")}
          />
          {data?.item?.category === E_Rental_Category.Car && (
            <Input
              type="text"
              id="interiorColor"
              label="Interior Color"
              disabled={isPending || isLoading}
              {...register("interiorColor")}
            />
          )}
          {data?.item?.category !== E_Rental_Category.Bicycle && (
            <Input
              type="number"
              id="seatingCapacity"
              label="Seating Capacity"
              required={data?.item?.category === E_Rental_Category.Car}
              disabled={isPending || isLoading}
              {...register("seatingCapacity", {
                required: data?.item?.category === E_Rental_Category.Car,
                valueAsNumber: true,
              })}
            />
          )}
          <Input
            type="number"
            id="weightCapacity"
            label="Weight Capacity (kg)"
            step=".01"
            disabled={isPending || isLoading}
            {...register("weightCapacity", {
              valueAsNumber: true,
            })}
          />
          <Input
            type="number"
            id="minAgeReq"
            disabled={isPending || isLoading}
            label="Minimum Age Requirement"
            required
            {...register("minAgeReq", { required: true, valueAsNumber: true })}
          />
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
