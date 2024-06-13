"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Input } from "@/common/components/ui/Input"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { E_Rental_Category, T_Rental_AddOns } from "@repo/contract"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import useUpdateRentalAddOns from "../hooks/useUpdateRentalAddOns"
import useGetRentalAddOns from "../hooks/useGetRentalAddOns"
import { useEffect, useState } from "react"

type Prop = {
  pageType: "setup" | "edit"
}

const AddOns = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { data, isLoading } = useGetRentalAddOns(listingId)
  const { mutate, isPending } = useUpdateRentalAddOns(listingId)
  const { register, handleSubmit } = useForm<T_Rental_AddOns>({
    values: data?.item?.AddOns as T_Rental_AddOns,
  })
  const [roofRackChecked, setRoofRackChecked] = useState<boolean>(false)
  const [dashCamChecked, setDashCamChecked] = useState<boolean>(false)
  const [boardRackChecked, setBoardRackChecked] = useState<boolean>(false)
  const [babySeatChecked, setBabySeatChecked] = useState<boolean>(false)
  const [includesHelmetChecked, setIncludesHelmetChecked] =
    useState<boolean>(false)

  const onSubmit = (formData: T_Rental_AddOns) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          if (pageType === "setup") {
            queryClient.invalidateQueries({
              queryKey: ["rental-finished-sections", listingId],
            })
            queryClient.invalidateQueries({
              queryKey: ["rental-addOns", listingId],
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
    mutate(
      {
        ...formData,
        roofRack: roofRackChecked,
        dashCam: dashCamChecked,
        babySeat: babySeatChecked,
        boardRack: boardRackChecked,
      },
      callBackReq
    )
  }

  useEffect(() => {
    setRoofRackChecked(data?.item?.roofRack)
    setDashCamChecked(data?.item?.dashCam)
    setBabySeatChecked(data?.item?.babySeat)
    setBoardRackChecked(data?.item?.boardRack)
    setIncludesHelmetChecked(data?.item?.includesHelmet)
  }, [data])

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
                    onChange={() => setRoofRackChecked(!roofRackChecked)}
                    checked={roofRackChecked}
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
                    onChange={() => setDashCamChecked(!dashCamChecked)}
                    checked={dashCamChecked}
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
                    onChange={() => setBoardRackChecked(!boardRackChecked)}
                    checked={boardRackChecked}
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
                    checked={babySeatChecked}
                    onChange={() => setBabySeatChecked(!babySeatChecked)}
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
                    checked={includesHelmetChecked}
                    onChange={() =>
                      setIncludesHelmetChecked(!includesHelmetChecked)
                    }
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
            defaultValue={data?.item?.others}
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
