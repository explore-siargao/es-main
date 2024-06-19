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
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import useGetPropertyById from "../../hooks/useGetPropertyById"
import toast from "react-hot-toast"
import { cn } from "@/common/helpers/cn"
import useUpdatePropertyType from "../hooks/useUpdatePropertyType"

type Prop = {
  pageType: "setup" | "edit"
}

const PropertyType = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = String(params.listingId)
  const { mutate, isPending } = useUpdatePropertyType(listingId)
  const { data } = useGetPropertyById(listingId as unknown as number)
  const [selectedProperty, setSelectedProperty] = useState("")

  const handleSave = () => {
    if (selectedProperty) {
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
      mutate({ type: selectedProperty }, callBackReq)
    } else {
      toast.error("Please select Property Type first")
    }
  }

  const PROPERTY_TYPES = [
    {
      type: "Hostel",
      description:
        "A high-density property accommodating people in shared dorms and common areas.",
      icon: <BrickWall className="h-4 w-4" strokeWidth={1.3} />,
      isSelected: data?.item?.type === "Hostel",
    },
    {
      type: "Apartment",
      description:
        "A self-contained residence with private entrance, suitable for longer stays often, in a complex with other apartments.",
      icon: <Building className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === "Apartment",
    },
    {
      type: "Homestay",
      description:
        "A communal living environment in which guests have private rooms but share bathrooms and kitchen facilities.",
      icon: <Home className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === "Homestay",
    },
    {
      type: "Hotel",
      description:
        "A commercial establishment offering short-term lodging and variety of services and amenities.",
      icon: <Hotel className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === "Hotel",
    },
    {
      type: "Resort",
      description:
        "A place designed to provide recreation, entertainment, and accommodation especially to vacationers.",
      icon: <Waves className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === "Resort",
    },
    {
      type: "Villa",
      description:
        "A standalone, self-contained residence with multiple common areas, bedrooms and bathrooms.",
      icon: <Building2 className="h-4 w-4" strokeWidth={1.7} />,
      isSelected: data?.item?.type === "Villa",
    },
  ]

  return (
    <div className="mt-20 mb-14">
      <div className="mb-8">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center"
        >
          Property Type
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {PROPERTY_TYPES.map((property) => (
          <div
            key={property.description}
            className={`${(property.isSelected && selectedProperty === "") || selectedProperty === property.type ? "border-2 border-secondary-500" : "border border-gray-300"} rounded-lg p-4 hover:cursor-pointer hover:bg-gray-50 select-none`}
            onClick={() => setSelectedProperty(property.type)}
          >
            {(property.isSelected && selectedProperty === "") ||
            selectedProperty === property.type ? (
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
    </div>
  )
}

export default PropertyType
