"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { T_Rental_Pricing } from "@repo/contract"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import useUpdateRentalPricing from "../hooks/useUpdateRentalPricing"
import useGetRentalPricing from "../hooks/useGetRentalPricing"
import { Input2 } from "@/common/components/ui/Input2"

type Prop = {
  pageType: "setup" | "edit"
}

const Pricing = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetRentalPricing(listingId)
  const { mutate, isPending } = useUpdateRentalPricing(listingId)
  const { register, handleSubmit } = useForm<T_Rental_Pricing>({
    values: data?.item as T_Rental_Pricing,
  })

  const onSubmit = (formData: T_Rental_Pricing) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["rental-pricing", listingId],
          })
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["rental-finished-sections", listingId],
            })
            router.push(`/hosting/listings/rentals/setup/${listingId}/location`)
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
  }

  return (
    <div className="mt-20">
      <Typography variant="h1" fontWeight="semibold">
        Pricing
      </Typography>
      <Typography className="text-xs text-gray-500 italic">
        The amount of this page use{" "}
        <span className="font-semibold">Philippine Peso (₱)</span> as currency.
      </Typography>
      <form className="grid grid-cols-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Input2
            type="number"
            id="dayRate"
            label="Day Rate (24-hour)"
            description="This rental price for a full 24-hour period, starting from the time of pick-up."
            step=".01"
            required
            defaultValue={data?.item?.dayRate}
            {...register("dayRate", { required: true, valueAsNumber: true })}
            leftIcon={<span className="text-text-300">₱</span>}
          />
          <Input2
            type="number"
            id="requiredDeposit"
            label="Required Deposit"
            description="This upfront payment needed to secure the rental?."
            step=".01"
            required
            {...register("requiredDeposit", {
              required: true,
              valueAsNumber: true,
            })}
            defaultValue={data?.item?.requiredDeposit}
            leftIcon={<span className="text-text-300">₱</span>}
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

export default Pricing
