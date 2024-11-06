import React, { useEffect, useState } from "react"
import { Typography } from "../../../common/components/ui/Typography"
import AddWishlistModal from "@/module/AccountSettings/components/modals/AddWishlistModal"
import useSessionStore from "../../../common/store/useSessionStore"
import toast from "react-hot-toast"
import useRemoveFromWishGroup from "@/module/AccountSettings/hooks/useRemoveFromWishGroup"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import CustomSquareSlider from "@/common/components/custom-square-slider"
import { LucideHeart, LucideStar } from "lucide-react"
import { BookingProps } from "@/module/Listings/components/ListingItems"
import { E_Listing_Category } from "@repo/contract"
import formatCurrency from "@/common/helpers/formatCurrency"

const BoxContainer = ({
  listingId,
  date,
  distance,
  location,
  price,
  photos,
  dayTime,
  ratings,
  isHearted,
  category
}: BookingProps) => {
  const [addWIshlistModal, setAddWIshlistModal] = useState(false)
  const userId = useSessionStore((state) => state).id
  const [isAdded, setIsAdded] = useState(false)

  const { mutate } = useRemoveFromWishGroup()
  const queryClient = useQueryClient()

  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        setIsAdded(false)
        queryClient.invalidateQueries({
          queryKey: ["wish-group"],
        })
        queryClient.invalidateQueries({
          queryKey: ["wish-group-count"],
        })
        toast.success("Wishlist successfully removed from the group")
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }

  const handleClick = () => {
    if (userId) {
      if (isAdded) {
        mutate({ id: listingId }, callBackReq)
      } else {
        setAddWIshlistModal(true)
      }
    } else {
      toast.error("You need to log in to add it to wishlist")
    }
  }

  useEffect(() => {
    if (isHearted) {
      setIsAdded(true)
    }
  }, [])

  const categoryPlural = {
    [E_Listing_Category.Activity]: "activity",
    [E_Listing_Category.Property]: "property",
    [E_Listing_Category.Rental]: "rental",
  }

  return (
    <>
      <li className="relative rounded-xl overflow-hidden h-full list-none">
        <Link href={`/listing/${categoryPlural[category]}/${listingId}`} target="_blank">
          <div className="h-auto w-full relative">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleClick()
              }}
              className="absolute top-3 right-3 z-40"
            >
              <LucideHeart
                className={`h-7 w-7 text-text-50 active:scale-90 ${
                  isAdded ? "fill-error-500" : "fill-text-500/50"
                }`}
              />
            </button>
            <CustomSquareSlider images={photos} />
          </div>
          <div className="pt-4">
            <div className="flex justify-between">
              <Typography
                variant="h3"
                fontWeight="semibold"
                className="text-text-500"
              >
                {location.city ? location.city : "Unknown"}
              </Typography>
              <div className="flex text-text-500 items-center gap-1">
                <LucideStar className="h-4 w-auto text-text-500 fill-text-500" />
                {ratings} (0)
              </div>
            </div>
            <div className="text-text-300 text-sm">
              <Typography>{distance}</Typography>
              <Typography>{date}</Typography>
            </div>
            <Typography
              fontWeight="semibold"
              className="text-text-700 underline"
            >
              {formatCurrency(price)} <span className="font-normal">{dayTime}</span>
            </Typography>
          </div>
        </Link>
      </li>
      <AddWishlistModal
        listingId={listingId}
        isOpen={addWIshlistModal}
        handleAdded={() => setIsAdded(true)}
        onClose={() => setAddWIshlistModal(false)}
      />
    </>
  )
}

export default BoxContainer
