"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Option, Select } from "@/common/components/ui/Select"
import { Input } from "@/common/components/ui/Input"
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

type Prop = {
  pageType: "setup" | "edit"
}

const BasicInfo = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetRentalById(listingId)
  const { mutate, isPending } = useUpdateRentalBasicInfo(
    listingId
  )
  const { register, handleSubmit, watch } = useForm<T_Rental_Basic_Info>({
    values: data?.item as T_Rental_Basic_Info,
  })

  const onSubmit = (formData: T_Rental_Basic_Info) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
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

  return (
    <div className="mt-20">
      <Typography variant="h1" fontWeight="semibold">
        Basic Information
      </Typography>
      <form className="grid grid-cols-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Select
            label="Category"
            id="rental-category"
            required
            disabled={isPending || isLoading}
            {...register("category", { required: true })}
          >
            <Option value="">Select</Option>
            {Object.keys(E_Rental_Category).map((key) => {
              return <Option>{key}</Option>
            })}
          </Select>
          {watch("category") ? (
            <Input
              type="text"
              id="make"
              label="Make"
              required
              disabled={isPending || isLoading}
              {...register("make", { required: true })}
            />
          ) : null}
          {watch("category") &&
          watch("category") !== E_Rental_Category.Bicycle ? (
            <Input
              type="text"
              id="model"
              label="Model / Badge"
              required
              disabled={isPending || isLoading}
              {...register("modelBadge", { required: true })}
            />
          ) : null}
          {watch("category") === E_Rental_Category.Car ? (
            <Select
              label="Body"
              id="body"
              required
              disabled={isPending || isLoading}
              {...register("bodyType", { required: true })}
            >
              <Option value="">Select</Option>
              {Object.keys(E_Rental_Car_Body).map((key) => {
                return <Option>{key}</Option>
              })}
            </Select>
          ) : null}
          {watch("category") &&
          watch("category") !== E_Rental_Category.Bicycle ? (
            <>
              <Select
                label="Fuel Type"
                id="fuel"
                required
                disabled={isPending || isLoading}
                {...register("fuel", { required: true })}
              >
                <Option value="">Select</Option>
                {Object.keys(E_Rental_Vehicle_Fuel).map((key) => {
                  return <Option>{key}</Option>
                })}
              </Select>
              <Select
                label="Transmission"
                id="transmission"
                required
                disabled={isPending || isLoading}
                {...register("transmission", { required: true })}
              >
                <Option value="">Select</Option>
                {Object.keys(E_Rental_Vehicle_Transmission).map((key) => {
                  return <Option>{key}</Option>
                })}
              </Select>
              <Select
                label="Year"
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
              </Select>
            </>
          ) : null}
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
