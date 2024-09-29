"use client"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { LINK_ACCOUNT_WISHLIST } from "../../../common/constants/links"
import useGetWishGroupByUserAndTitle from "@/module/AccountSettings/hooks/useGetWishGroupByUserAndTitle"
import useSessionStore from "../../../common/store/useSessionStore"
import { Spinner } from "../../../common/components/ui/Spinner"
import AddNoteModal from "@/module/AccountSettings/components/modals/AddNoteModal"
import MenuModal from "@/module/AccountSettings/components/modals/MenuModal"
import { Typography } from "../../../common/components/ui/Typography"
import { ComponentProps, DetailsType } from "../../../common/types/global"
import {
  Copy,
  LucideArrowLeft,
  LucideCheckCircle,
  LucideHeart,
  MoreHorizontal,
} from "lucide-react"
import useRemoveFromWishGroup from "@/module/AccountSettings/hooks/useRemoveFromWishGroup"
import { useQueryClient } from "@tanstack/react-query"
import SavedWishlists from "./SavedWishlists"

type ItemData = {
  id: number
  photo: string
  location: string
  distance: string
  date: string
  price: string
  dayTime: string
  ratings: string
  reviews: number
  wishlistName: string
}

const HeartButton = ({
  isClicked,
  onClick,
  id,
}: {
  isClicked: boolean
  onClick: () => void
  id: number
}) => (
  <LucideHeart
    id={"heart" + id}
    className="absolute top-3 right-3 h-7 w-7 text-text-50 active:scale-90 fill-error-500"
    onClick={onClick}
  />
)

const ActionButton = ({ onClick, text }: ComponentProps) => (
  <button
    className="h-10 w-10 cursor-pointer hover:bg-gray-50 p-2 text-xs"
    onClick={onClick}
  >
    <MoreHorizontal className="h-5 w-5" />
    {text && <span>{text}</span>}
  </button>
)

const WishlistsItemContainer = () => {
  const [details, setDetails] = useState<DetailsType>({
    id: 0,
    listingId: 0,
    link: "",
    img: "",
    title: "",
    address: "",
    description: "",
    price: "",
    isNight: false,
    note: "",
    priceProps: {
      fee: 0,
      cleaningFee: 0,
      serviceFee: 0,
      isNight: false,
    },
  })

  const [addNote, setAddNote] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const showAddNoteModal = (item: any) => {
    setDetailsForItem(item)
    setAddNote(true)
  }

  const closeAddNoteModal = () => {
    setAddNote(false)
  }

  const setDetailsForItem = (item: any) => {
    setDetails({
      id: item?.id,
      listingId: item?.listingId,
      link: item?.link,
      img: item?.listing?.images[0].fileKey,
      title: item?.listing?.title,
      address: item?.listing?.address,
      description: item?.listing?.description,
      price:
        item?.listing?.price?.fee +
        item?.listing?.price.cleaningFee +
        item?.listing?.price.serviceFee,
      isNight: item?.listing?.price.isNight,
      note: item?.note,
      priceProps: {
        fee: item?.listing?.price?.fee,
        cleaningFee: item?.listing?.price?.cleaningFee,
        serviceFee: item?.listing?.price?.serviceFee,
        isNight: item?.listing?.price.isNight,
      },
    })
  }

  const queryClient = useQueryClient()
  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const session = useSessionStore((state) => state)
  const { mutate } = useRemoveFromWishGroup()
  const params = useParams()
  const { data, isLoading } = useGetWishGroupByUserAndTitle(
    session.id as number,
    params?._id as string
  )
  const [isClickedArray, setIsClickedArray] = useState<boolean[]>(() => {
    return (data?.items || []).map(() => false)
  })

  return (
    <>
      {isLoading ? (
        <div className="p-6">
          <Spinner variant="primary" size="sm">
            Loading...
          </Spinner>
        </div>
      ) : (
        <div className="w-full">
          {/* ... (other components remain unchanged) */}
          <div className="sticky w-full top-0 bg-white flex border-b-gray-100 border-b py-4 px-6 items-center mt-1">
            <Link href={LINK_ACCOUNT_WISHLIST}>
              <LucideArrowLeft className="h-10 w-10 cursor-pointer rounded-full hover:bg-gray-50 p-2 -ml-3" />
            </Link>
            <Typography
              variant={"h4"}
              className="w-full text-left place-self-center font-semibold ml-4"
            >
              {decodeURIComponent(params?._id as string)}
            </Typography>
            <div className="flex items-center gap-3">
              <Copy
                strokeWidth={1.5}
                onClick={() => {
                  toast("Link copied!", {
                    icon: (
                      <LucideCheckCircle className="h-5 w-5 text-success-500" />
                    ),
                  })
                  copyToClipboard()
                }}
                className="h-9 w-9 cursor-pointer hover:bg-gray-50 p-2"
              />
              <ActionButton onClick={() => setOpenMenu(true)} />
            </div>
          </div>
          {/* ... (other components remain unchanged) */}
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full justify-center pt-4 pb-6 px-4">
            {data?.items?.length !== 0 ? (
              data?.items?.map((item, index) => (
                <SavedWishlists
                  key={item.id}
                  itemId={item.id}
                  listingId={item.listingId}
                  location={item.listing.address}
                  date={item.listing.description}
                  distance={"100 kilometers away"}
                  price={
                    item.listing.price.fee +
                    item.listing.price.serviceFee +
                    item.listing.price.cleaningFee
                  }
                  imageKey={item.listing.images}
                  isNight={item?.price?.isNight}
                  ratings={"0.0"}
                  note={item.note}
                  showAddNote={() => showAddNoteModal(item)}
                />
              ))
            ) : (
              <Typography>No data found</Typography>
            )}
          </ul>
          <AddNoteModal
            isOpen={addNote}
            img={details?.img}
            title={details?.title}
            address={details?.address}
            description={details?.description}
            price={details?.priceProps}
            note={details?.note}
            onClose={closeAddNoteModal}
            id={details?.id as number}
          />
          <MenuModal
            isOpen={openMenu}
            onClose={() => setOpenMenu(false)}
            title={decodeURIComponent(params?._id as string)}
          />
        </div>
      )}
    </>
  )
}

export default WishlistsItemContainer
