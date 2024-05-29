"use client"
import { Typography } from "@/common/components/ui/Typography"
import UnitsTable from "./UnitsTable"
import { LucidePlus } from "lucide-react"
import { Button } from "@/common/components/ui/Button"
import SelectUnitTypeModal from "./modals/SelectUnitTypeModal"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import useGetPropertyById from "../../../hooks/useGetPropertyById"

type Prop = {
  pageType: "setup" | "edit"
}

const Units = ({ pageType }: Prop) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const listingId = Number(params.listingId)
  const { data, isLoading } = useGetPropertyById(listingId)
  const [isSelectUnitTypeModalOpen, setIsSelectUnitTypeModalOpen] =
    useState(false)

  const handleSave = () => {
    router.push("/hosting/listings/setup/1/photos")
  }
  const propertyType = data?.item?.type
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
          Manage your <span className="font-bold">{propertyType}</span> units
        </span>
        <div className="flex-grow"></div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsSelectUnitTypeModalOpen(true)}
        >
          <LucidePlus className="mr-2 w-5" />
          <Typography variant="p" fontWeight="semibold" className="text-sm">
            Add new
          </Typography>
        </Button>
      </Typography>
      <UnitsTable />
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
        propertyId={data?.item?.id}
      />
    </div>
  )
}

export default Units
