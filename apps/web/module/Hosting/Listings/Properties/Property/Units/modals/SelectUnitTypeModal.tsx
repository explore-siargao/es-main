"use client"
import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { E_Property_Type } from "@repo/contract/build/Property/enum"
import Link from "next/link"

type Props = {
  isOpen: boolean
  onClose: () => void
  propertyType: E_Property_Type
  propertyId: string
}

const SelectUnitTypeModal = ({
  isOpen,
  onClose,
  propertyType,
  propertyId,
}: Props) => {
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
              <Link
                href={`/hosting/listings/properties/${propertyId}/units/bed/add`}
                className="flex-1"
              >
                <div className="border h-52 border-gray-300 hover:border-secondary-600 rounded-lg p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    Bed
                  </Typography>
                  <Typography variant="h5">
                    Bed in a room. Sleeping space, bathroom and kitchen are
                    shared.
                  </Typography>
                </div>
              </Link>
              <Link
                href={`/hosting/listings/properties/${propertyId}/units/room/add`}
                className="flex-1"
              >
                <div className="border h-52 border-gray-300 hover:border-secondary-600 rounded-lg p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    Room
                  </Typography>
                  <Typography variant="h5">
                    Room in a place. Sleeping space is private.
                  </Typography>
                </div>
              </Link>
            </>
          ) : (
            ""
          )}
          {propertyType === "Hotel" && (
            <>
              <Link
                href={`/hosting/listings/properties/${propertyId}/units/room/add`}
                className="flex-1"
              >
                <div className="border h-52 border-gray-300 hover:border-secondary-600 rounded-lg p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    Room
                  </Typography>
                  <Typography variant="h5">
                    Room in a place. Sleeping space is private.
                  </Typography>
                </div>
              </Link>
            </>
          )}
          {propertyType === "Resort" ||
          propertyType === "Apartment" ||
          propertyType === "Villa" ? (
            <>
              <Link
                href={`/hosting/listings/properties/${propertyId}/units/whole-place/add`}
                className="flex-1"
              >
                <div className="border h-52 border-gray-300 hover:border-secondary-600 rounded-lg p-4">
                  <Typography
                    variant="h4"
                    fontWeight="semibold"
                    className="uppercase mb-3"
                  >
                    Whole Place
                  </Typography>
                  <Typography variant="h5">
                    Whole place in a Property, everything here is private.
                  </Typography>
                </div>
              </Link>
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
