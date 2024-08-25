"use client"
import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { E_Property_Type } from "@repo/contract"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useAddBlankUnitBed from "../hooks/useAddBlankUnitBed"
import useAddBlankUnitRoom from "../hooks/useAddBlankUnitRoom"
import useAddBlankUnitWholePlace from "../hooks/useAddBlankUnitWholePlace"
import { cn } from "@/common/helpers/cn"

type Props = {
  isOpen: boolean
  onClose: () => void
  propertyType: E_Property_Type
  propertyId: string
  pageType: "setup" | "edit"
}

const SelectUnitTypeModal = ({
  isOpen,
  onClose,
  propertyType,
  pageType,
}: Props) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const listingId = params.listingId
  const { mutate: addBlankUnitBed, isPending: isAddBlankUnitBedPending } =
    useAddBlankUnitBed(listingId)
  const { mutate: addBlankUnitRoom, isPending: isAddBlankUnitRoomPending } =
    useAddBlankUnitRoom(listingId)
  const {
    mutate: addBlankUnitWholePlace,
    isPending: isAddBlankUnitWholePlacePending,
  } = useAddBlankUnitWholePlace(listingId)
  const addUnitBed = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/beds/${data.item._id}/edit`
          )
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    addBlankUnitBed(undefined, callBackReq)
  }
  const addUnitRoom = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/rooms/${data.item._id}/edit`
          )
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    addBlankUnitRoom(undefined, callBackReq)
  }
  const addUnitWholePlace = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/whole-places/${data.item._id}/edit`
          )
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    addBlankUnitWholePlace(undefined, callBackReq)
  }
  return (
    <ModalContainer
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      title={`Add new unit for ${propertyType}`}
    >
      <div className="py-5 px-5 max-w-4xl">
        <div className="flex gap-6">
          {propertyType === "Hostel" ||
          propertyType === "Homestay" ||
          propertyType === "Resort" ? (
            <>
              <button
                type="button"
                onClick={
                  isAddBlankUnitBedPending ? () => null : () => addUnitBed()
                }
                className={cn(
                  "text-left flex-1",
                  isAddBlankUnitBedPending ? "cursor-progress opacity-70" : ""
                )}
              >
                <div className="flex-1 border h-52 border-gray-300 hover:border-secondary-600 rounded-xl p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    New shared space
                  </Typography>
                  <Typography variant="h5">
                    A bed in a dorm room or shared accommodation with shared
                    amenities
                  </Typography>
                </div>
              </button>
              <button
                type="button"
                onClick={
                  isAddBlankUnitRoomPending ? () => null : () => addUnitRoom()
                }
                className={cn(
                  "text-left flex-1",
                  isAddBlankUnitRoomPending ? "cursor-progress opacity-70" : ""
                )}
              >
                <div className="flex-1 border h-52 border-gray-300 hover:border-secondary-600 rounded-xl p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    New private room
                  </Typography>
                  <Typography variant="h5">
                    A private room or sleeping space that might have a shared
                    bathroom or kitchen.
                  </Typography>
                </div>
              </button>
            </>
          ) : (
            ""
          )}
          {propertyType === "Hotel" && (
            <>
              <button
                type="button"
                onClick={
                  isAddBlankUnitRoomPending ? () => null : () => addUnitRoom()
                }
                className={cn(
                  "text-left flex-1",
                  isAddBlankUnitRoomPending ? "cursor-progress opacity-70" : ""
                )}
              >
                <div className="flex-1 border h-52 border-gray-300 hover:border-secondary-600 rounded-xl p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    New private room
                  </Typography>
                  <Typography variant="h5">
                    A private room or sleeping space that might have a shared
                    bathroom or kitchen.
                  </Typography>
                </div>
              </button>
            </>
          )}
          {propertyType === "Resort" ||
          propertyType === "Apartment" ||
          propertyType === "Villa" ? (
            <>
              <button
                type="button"
                onClick={
                  isAddBlankUnitWholePlacePending
                    ? () => null
                    : () => addUnitWholePlace()
                }
                className={cn(
                  "text-left flex-1",
                  isAddBlankUnitWholePlacePending
                    ? "cursor-progress opacity-70"
                    : ""
                )}
              >
                <div className="flex-1 border h-52 border-gray-300 hover:border-secondary-600 rounded-xl p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    New whole space
                  </Typography>
                  <Typography variant="h5">
                    A fully self-contained accommodation such as a villa,
                    apartment or bungalow with its own bathroom, kitchen, and
                    living area.
                  </Typography>
                </div>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </ModalContainer>
  )
}

export default SelectUnitTypeModal
