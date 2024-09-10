"use client"
import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { E_Property_Type, E_WholePlace_Property_Type } from "@repo/contract"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useAddBlankUnitWholePlace from "../hooks/useAddBlankUnitWholePlace"
import { cn } from "@/common/helpers/cn"
import useUnitTypeStore from "../Edit/store/useUnitTypeStore"

type Props = {
  isOpen: boolean
  onClose: () => void
  propertyType: E_Property_Type | undefined
  pageType: "setup" | "edit"
  onSelect: (unitType: E_WholePlace_Property_Type) => void
}

const SelectUnitTypeWholePlaceModal = ({
  isOpen,
  onClose,
  propertyType,
  pageType,
}: Props) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const listingId = params.listingId

  const {
    mutate: addBlankUnitWholePlace,
    isPending: isAddBlankUnitWholePlacePending,
  } = useAddBlankUnitWholePlace(listingId)

  const setSelectedUnitType = useUnitTypeStore(
    (state) => state.setSelectedUnitType
  )

  const handleSelect = (unitType: E_WholePlace_Property_Type) => {
    setSelectedUnitType(unitType)
    onClose()
    addUnitWholePlace()
  }

  const addUnitWholePlace = () => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          router.push(
            `/hosting/listings/properties${pageType === "setup" ? "/setup" : ""}/${listingId}/units/whole-places/${data.item._id}/edit?propertyType=${propertyType}`
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
      size="auto"
      isOpen={isOpen}
      onClose={onClose}
      title={`Add new unit for ${propertyType}`}
    >
      <div className="py-5 px-5 max-w-4xl">
        <div className="flex gap-6">
          <>
            <button
              type="button"
              onClick={
                isAddBlankUnitWholePlacePending
                  ? () => null
                  : () => handleSelect(E_WholePlace_Property_Type.Villa)
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
                  Villa
                </Typography>
                <Typography variant="h5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi. Donec faucibus, ligula et auctor dapibus.
                </Typography>
              </div>
            </button>
            <button
              type="button"
              onClick={
                isAddBlankUnitWholePlacePending
                  ? () => null
                  : () => handleSelect(E_WholePlace_Property_Type.House)
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
                  House
                </Typography>
                <Typography variant="h5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi. Donec faucibus, ligula et auctor dapibus.
                </Typography>
              </div>
            </button>
            <button
              type="button"
              onClick={
                isAddBlankUnitWholePlacePending
                  ? () => null
                  : () => handleSelect(E_WholePlace_Property_Type.Bungalow)
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
                  Bungalow
                </Typography>
                <Typography variant="h5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi. Donec faucibus, ligula et auctor dapibus.
                </Typography>
              </div>
            </button>
            <button
              type="button"
              onClick={
                isAddBlankUnitWholePlacePending
                  ? () => null
                  : () => handleSelect(E_WholePlace_Property_Type.Cottage)
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
                  Cottage
                </Typography>
                <Typography variant="h5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi. Donec faucibus, ligula et auctor dapibus.
                </Typography>
              </div>
            </button>
          </>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SelectUnitTypeWholePlaceModal
