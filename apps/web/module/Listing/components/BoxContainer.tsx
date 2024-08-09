"use client"
import React, { useEffect, useState } from "react"
import { HeartIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/20/solid"
import { Typography } from "../../../common/components/ui/Typography"
import AddWishlistModal from "@/module/AccountSettings/components/modals/AddWishlistModal"
import useSessionStore from "../../../common/store/useSessionStore"
import Slider from "../../../common/components/Slider"
import toast from "react-hot-toast"
import useRemoveFromWishGroup from "@/module/AccountSettings/hooks/useRemoveFromWishGroup"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"

type BoxContainerProps = {
  listingId: number
  imageKey: {
    fileKey: string
    alt: string
  }[]
  distance: string
  location: string
  date: string
  price: number
  dayTime: string
  ratings: string
  isHearted: boolean
}

const BoxContainer = ({
  listingId,
  date,
  distance,
  location,
  price,
  imageKey,
  dayTime,
  ratings,
  isHearted,
}: BoxContainerProps) => {
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

  return (
    <>
      <li className="relative rounded-lg overflow-hidden h-full list-none">
        <Link href={`/accommodation/${listingId}`} target="_blank">
          <div className="h-48 w-full relative">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleClick()
              }}
              className="absolute top-3 right-3 z-40"
            >
              <HeartIcon
                className={`h-7 w-7 text-text-50 active:scale-90 ${
                  isAdded ? "fill-error-500" : "fill-text-500/50"
                }`}
              />
            </button>
            <Slider images={imageKey} />
          </div>
          <div className="p-4">
            <div className="flex justify-between">
              <Typography
                variant="h3"
                fontWeight="semibold"
                className="text-text-500"
              >
                {location}
              </Typography>
              <div className="flex text-text-500 items-center gap-1">
                <StarIcon className="h-4 w-auto" />
                {ratings}
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
              {price} <span className="font-normal">{dayTime}</span>
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
