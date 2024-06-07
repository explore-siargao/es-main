"use client"
import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import useAddBlankProperty from "../../hooks/useAddBlankProperty"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/common/helpers/cn"
import useAddBlankRental from "../../hooks/useAddBlankRental"
import useAddBlankActivity from "../../hooks/useAddBlankActivity"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const SelectListingTypeModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter()
  const { mutate: addBlankProperty, isPending: isAddBlankPropertyPending } =
    useAddBlankProperty()
  const { mutate: addBlankRental, isPending: isAddBlankRentalPending } =
    useAddBlankRental()
  const { mutate: addBlankActivity, isPending: isAddBlankActivityPending } =
    useAddBlankActivity()
  const addProperty = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/properties/setup/${data.item.id}/property-type`
          )
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    addBlankProperty(undefined, callBackReq)
  }
  const addRental = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/rentals/setup/${data.item._id}/basic-info`
          )
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    addBlankRental(undefined, callBackReq)
  }
  const addActivity = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/activities/setup/${data.item.id}/basic-info`
          )
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    addBlankActivity(undefined, callBackReq)
  }
  const OPTIONS = [
    {
      title: "New Property",
      description:
        "Discover the perfect blend of comfort and charm retreats. Each property offers a relaxation.",
      onClick: () => addProperty(),
    },
    {
      title: "New Rental",
      description:
        "Discover the ease of renting without compromising on luxury or quality.",
      onClick: () => addRental(),
    },
    {
      title: "New Activity",
      description:
        "Experience the thrill of discovery with our activity-focused properties.",
      onClick: () => addActivity(),
    },
  ]
  const isListingAddPending =
    isAddBlankPropertyPending ||
    isAddBlankRentalPending ||
    isAddBlankActivityPending
  return (
    <ModalContainer
      size="auto"
      isOpen={isOpen}
      onClose={isListingAddPending ? () => null : onClose}
      title={`Select listing type`}
    >
      <div className="py-5 px-5 max-w-7xl">
        <div className="flex gap-6">
          {OPTIONS.map((option) => {
            return (
              <button
                key={option.title}
                type="button"
                onClick={isListingAddPending ? () => null : option.onClick}
                className={cn(
                  "text-left flex-1",
                  isListingAddPending ? "cursor-progress opacity-70" : ""
                )}
              >
                <div className="flex-1 border h-52 border-gray-300 hover:border-secondary-600 rounded-lg p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    {option.title}
                  </Typography>
                  <Typography variant="h5">{option.description}</Typography>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </ModalContainer>
  )
}

export default SelectListingTypeModal
