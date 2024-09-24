"use client"
import { Typography } from "@/common/components/ui/Typography"
import { LucidePlus } from "lucide-react"
import { Button } from "@/common/components/ui/Button"
import SelectUnitTypeModal from "./modals/SelectUnitTypeModal"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import UnitsTable from "./components/UnitsTable"
import useGetPropertyById from "../../hooks/useGetPropertyById"
import useUpdatePropertyFinishedSection from "../../hooks/useUpdatePropertyFinishedSections"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { E_Property_Category } from "./constants"
import SelectUnitTypeWholePlaceModal from "./modals/SelectUnitTypeWholePlaceModal"
import { E_WholePlace_Property_Type } from "@repo/contract"
import useAddBlankUnitWholePlace from "./hooks/useAddBlankUnitWholePlace"

type Prop = {
  pageType: "setup" | "edit"
}

const Units = ({ pageType }: Prop) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = params.listingId
  const { data, isLoading } = useGetPropertyById(listingId)
  const [isSelectUnitTypeModalOpen, setIsSelectUnitTypeModalOpen] =
    useState(false)
  const [
    isSelectUnitTypeWholePlaceModalOpen,
    setIsSelectUnitTypeWholePlaceModalOpen,
  ] = useState(false)
  const { mutateAsync: updateFinishedSection } =
    useUpdatePropertyFinishedSection(listingId)
  const [selectedUnitType, setSelectedUnitType] =
    useState<E_WholePlace_Property_Type | null>(null)

  const handleSelectUnitType = (unitType: E_WholePlace_Property_Type) => {
    setSelectedUnitType(unitType)
    router.push(
      `/hosting/listings/properties/setup/${listingId}/units/whole-places/${unitType}/edit`
    )
  }

  const {
    mutate: addBlankUnitWholePlace,
    isPending: isAddBlankUnitWholePlacePending,
  } = useAddBlankUnitWholePlace(listingId)

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

  const handleSave = () => {
    if (
      pageType === "setup" &&
      !data?.item?.finishedSections?.includes("units")
    ) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            queryClient.invalidateQueries({
              queryKey: ["property-finished-sections", listingId],
            })
            queryClient.invalidateQueries({
              queryKey: ["property", listingId],
            })
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      updateFinishedSection({ newFinishedSection: "units" }, callBackReq)
    } else {
      queryClient.invalidateQueries({
        queryKey: ["property", listingId],
      })
    }

    router.push(
      `/hosting/listings/properties/setup/${listingId}/pricing?unitType=${selectedUnitType}`
    )
  }

  const propertyType = data?.item?.type

  const handleAddNewClick = () => {
    if (data?.item?.wholeplaceType) {
      addUnitWholePlace()
    } else {
      setIsSelectUnitTypeModalOpen(true)
    }
  }

  return (
    <div className="mt-20 mb-14">
      <Typography
        variant="h1"
        fontWeight="semibold"
        className="flex justify-between items-center mb-5"
      >
        Units
      </Typography>

      <Typography
        variant="h3"
        fontWeight="semibold"
        className="flex items-center"
      >
        <span>
          Manage your{" "}
          <span className="font-bold">
            {propertyType === "WHOLE_PLACE" ? "WHOLE PLACE" : propertyType}
          </span>{" "}
          units
        </span>
        <div className="flex-grow"></div>
        <Button
          variant="primary"
          size="sm"
          onClick={
            isAddBlankUnitWholePlacePending
              ? () => null
              : () => handleAddNewClick()
          }
        >
          <LucidePlus className="mr-2 w-5" />
          <Typography variant="p" fontWeight="semibold" className="text-sm">
            Add new
          </Typography>
        </Button>
      </Typography>
      <UnitsTable
        category={E_Property_Category.WholePlace}
        pageType={pageType}
      />
      {pageType === "setup" && (
        <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
          <Button size="sm" onClick={handleSave}>
            Save & Next
          </Button>
        </div>
      )}
      <SelectUnitTypeModal
        isOpen={isSelectUnitTypeModalOpen}
        onClose={() => setIsSelectUnitTypeModalOpen(!isSelectUnitTypeModalOpen)}
        propertyType={propertyType}
        propertyId={data?.item?._id}
        pageType={pageType}
      />
      <SelectUnitTypeWholePlaceModal
        isOpen={isSelectUnitTypeWholePlaceModalOpen}
        onClose={() =>
          setIsSelectUnitTypeWholePlaceModalOpen(
            !isSelectUnitTypeWholePlaceModalOpen
          )
        }
        onSelect={handleSelectUnitType}
        propertyType={propertyType}
        pageType={pageType}
      />
    </div>
  )
}

export default Units
