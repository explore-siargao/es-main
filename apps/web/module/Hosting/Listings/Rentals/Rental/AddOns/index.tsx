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
import { LucidePlus, LucideX } from "lucide-react"

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
  const [otherAddOns, setOtherAddOns] = useState<string[]>([])
  const [newAddOn, setNewAddOn] = useState<string>("")

  const onSubmit = (formData: T_Rental_AddOns) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["rental-addOns", listingId],
          })
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
    mutate(
      {
        ...formData,
        roofRack: roofRackChecked,
        dashCam: dashCamChecked,
        babySeat: babySeatChecked,
        boardRack: boardRackChecked,
        others: otherAddOns,
      },
      callBackReq
    )
  }

  useEffect(() => {
    setRoofRackChecked(data?.item?.roofRack || false)
    setDashCamChecked(data?.item?.dashCam || false)
    setBabySeatChecked(data?.item?.babySeat || false)
    setBoardRackChecked(data?.item?.boardRack || false)
    setIncludesHelmetChecked(data?.item?.includesHelmet || false)
    setOtherAddOns(
      (data?.item?.others || []).filter((addOn: any) => addOn.trim() !== "")
    )
  }, [data])

  const addNewAddOn = () => {
    if (newAddOn.trim() !== "") {
      setOtherAddOns((prev) => [...prev, newAddOn.trim()])
      setNewAddOn("")
    } else {
      toast.error("Other add-on cannot be empty")
    }
  }

  const removeAddOn = (index: number) => {
    setOtherAddOns((prev) => prev.filter((_, i) => i !== index))
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
          <div className="mt-4">
            <Typography variant="h4" fontWeight="semibold" className="mb-4">
              Additional Add-Ons
            </Typography>
            {otherAddOns.length > 0 && (
              <ul>
                {otherAddOns.map((addOn, index) => (
                  <li
                    key={addOn}
                    className="mt-2 p-2 border border-gray-100 rounded-md flex justify-between items-center"
                  >
                    <p className="text-sm">{addOn}</p>
                    <button
                      type="button"
                      className="hover:cursor-pointer"
                      onClick={() => removeAddOn(index)}
                      aria-label="Remove Add-On"
                    >
                      <LucideX className="w-5 h-5 hover:text-error-500 transition" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2">
              <Input
                className="p-2"
                type="text"
                label="Add-On"
                value={newAddOn}
                onChange={(e) => setNewAddOn(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex hover:cursor-pointer mt-2 gap-1 items-center bg-gray-50 hover:bg-gray-200 rounded-md pl-1 pr-2 transition"
                  onClick={addNewAddOn}
                >
                  <LucidePlus color="black" className="rounded-sm w-4 h-4" />
                  <Typography className="text-sm">
                    {" "}
                    Add other add-ons
                  </Typography>
                </button>
              </div>
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

export default AddOns
