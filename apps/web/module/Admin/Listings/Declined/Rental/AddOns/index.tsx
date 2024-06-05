"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Input } from "@/common/components/ui/Input"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import useGetRentalById from "../../../hooks/useGetRentalById"
import { E_Rental_Category, T_Rental_AddOns } from "@repo/contract"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import useUpdateRentalAddOns from "../hooks/useUpdateRentalAddOns"

type Prop = {
  pageType: "setup" | "edit"
}

const AddOns = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetRentalById(listingId)
  const { mutate, isPending } = useUpdateRentalAddOns(
    listingId
  )
  const { register, handleSubmit } = useForm<T_Rental_AddOns>({
    values: data?.item?.AddOns as T_Rental_AddOns,
  })

  const onSubmit = (formData: T_Rental_AddOns) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["rental-finished-sections", listingId],
            })
            router.push(`/hosting/listings/rentals/setup/${listingId}/photos`)
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
        Add-Ons
      </Typography>
      <form className="grid grid-cols-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {data?.item?.category === E_Rental_Category.Car && (
            <>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="roofRack"
                    type="checkbox"
                    {...register("roofRack")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="roofRack">Roof Rack</label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="dashCam"
                    type="checkbox"
                    {...register("dashCam")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="dashCam">Dash Cam</label>
                </div>
              </div>
            </>
          )}
          {data?.item?.category !== E_Rental_Category.Car && (
            <>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="boardRack"
                    type="checkbox"
                    {...register("boardRack")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="boardRack">Board Rack</label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="babySeat"
                    type="checkbox"
                    {...register("babySeat")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="babySeat">Baby Seat</label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="includesHelmet"
                    type="checkbox"
                    {...register("includesHelmet")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="includesHelmet">Includes Helmet</label>
                </div>
              </div>
            </>
          )}
          <Input
            type="text"
            id="other"
            label="Other, please specify"
            {...register("others")}
          />
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

export default AddOns
