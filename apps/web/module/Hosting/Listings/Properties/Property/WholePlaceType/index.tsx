"use client"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useQueryClient } from "@tanstack/react-query"
import {
  Building,
  Home,
  BrickWall,
  Hotel,
  Waves,
  Building2,
  Store,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import useGetPropertyById from "../../hooks/useGetPropertyById"
import useUpdateWholePlaceType from "../../hooks/useUpdateWholePlaceType"
import { WholePlaceTypes } from "./constants"
import useWholePlaceTypeSelectedStore from "./store/useWholePlaceTypeSelectedStore"

type Prop = {
  pageType: "setup" | "edit"
}

const WholePlaceType = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { mutate, isPending } = useUpdateWholePlaceType(listingId)
  const { data, isPending: typeIsPending } = useGetPropertyById(listingId)
  const [selectedWholePlace, setSelectedWholePlace] = useState("")
  const { selectedWholePlaceType, setSelectedWholePlaceType } = useWholePlaceTypeSelectedStore()
  useEffect(() => {
    if (!typeIsPending && data?.item?.wholeplaceType) {
      setSelectedWholePlace(data.item.wholeplaceType)
    }
  }, [typeIsPending, data])

  const handleSave = () => {
    if (selectedWholePlace) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            toast.success(data.message)
            queryClient.invalidateQueries({
              queryKey: ["property-finished-sections", listingId],
            })
            if (pageType === "setup") {
              router.push(
                `/hosting/listings/properties/setup/${listingId}/basic-info`
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
      mutate({ type: selectedWholePlace }, callBackReq)
    } else {
      toast.error("Please select Property Type first")
    }
  }

  const WHOLE_PLACE_TYPES = [
    {
      type: "Villa",
      value: WholePlaceTypes.Villa,
      description:
        "A spacious and stylish retreat with shared living spaces, ideal for group gatherings.",
      icon: <Building2 className="h-4 w-4" strokeWidth={1.3} />,
      isSelected: data?.item?.type === WholePlaceTypes.Villa,
    },
    {
      type: "House",
      value: WholePlaceTypes.House,
      description:
        "A cozy and private residence perfect for families or extended stays.",
      icon: <Home className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === WholePlaceTypes.House,
    },
    {
      type: "Bungalow",
      value: WholePlaceTypes.Bungalow,
      description:
        "A charming spot with private rooms and shared amenities, fostering a community vibe.",
      icon: <Home className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === WholePlaceTypes.Bungalow,
    },
    {
      type: "Cottage",
      value: WholePlaceTypes.Cottage,
      description:
        "A quaint getaway that combines comfort and convenience for short-term visitors.",
      icon: <Store className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === WholePlaceTypes.Cottage,
    },
  ]

  console.log("this is my store: ", selectedWholePlaceType)
  return (
    <div className="mt-20 mb-14">
      <div className="mb-8">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center"
        >
          Whole Place Type
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {WHOLE_PLACE_TYPES.map((property) => (
          <div
            key={property.description}
            className={`${(property.isSelected && selectedWholePlaceType === "") || selectedWholePlaceType === property.value ? "border-2 border-secondary-500" : "border border-gray-300"} rounded-xl p-4 ${pageType === "setup" ? "hover:cursor-pointer hover:bg-gray-50" : "cursor-not-allowed"} select-none`} // Updated className to disable selection if pageType is 'edit'
            onClick={() =>
              pageType === "setup" && setSelectedWholePlaceType(property.value)
            }
          >
            {(property.isSelected && selectedWholePlaceType === "") ||
            selectedWholePlaceType === property.value ? (
              <div className="flex justify-center">
                <span className="absolute mt-[-32px] rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                  Selected
                </span>
              </div>
            ) : null}
            <div className="flex justify-between items-center mb-3">
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="uppercase"
              >
                {property.type}
              </Typography>
              {property.icon}
            </div>
            <Typography variant="h5">{property.description}</Typography>
          </div>
        ))}
      </div>
      {pageType === "setup" && (
        <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
          <Button
            size="sm"
            className={cn(
              "disabled:bg-gray-600",
              isPending ? "opacity-70 cursor-progress" : ""
            )}
            onClick={isPending ? () => null : handleSave}
          >
            {pageType === "setup" ? "Save & Next" : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default WholePlaceType
