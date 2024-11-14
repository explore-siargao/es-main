"use client"
import { Button } from "@/common/components/ui/Button"
import {
  PropertyType,
  T_AvailableBookableUnitProps,
  T_AvailableBookingProps,
} from "../types/AvailableBooking"
import { TitleSection } from "./TitleSection"
import ImageGallery from "./ImageGallery"
import ImageGalleryModal from "./modals/ImageGalleryModal"
import { useState } from "react"
import { getCombinedBedDisplay } from "./helpers/get-combined-bed-display"

const AvailableBooking = ({
  bookableUnits,
  propertyType,
  onSelectBookableUnit,
  selectedBookableUnit,
}: T_AvailableBookingProps) => {
  const handleSelectUnit = (unit: T_AvailableBookableUnitProps) => {
    onSelectBookableUnit(unit)
  }
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const openModal = () => {
    setGalleryModalOpen(true)
  }

  let title = ""
  switch (propertyType.toUpperCase()) {
    case PropertyType.HOTEL:
      title = "Available Rooms"
      break
    case PropertyType.HOSTEL:
    case PropertyType.HOMESTAY:
      title = "Available Bed and Rooms"
      break
    case PropertyType.RESORT:
      title = "Available Bed, Rooms and Whole Places"
      break
    case PropertyType.APARTMENT:
    case PropertyType.VILLA:
      title = "Available Whole Places"
      break
    default:
      title = "Available Booking"
      break
  }

  return (
    <>
      <TitleSection size="lg" title={title} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {bookableUnits.map((unit: T_AvailableBookableUnitProps) => {
          const bedDisplay = getCombinedBedDisplay(unit.bedRooms, unit.livingRooms);

          return (
            <div
              key={unit.id}
              className={`w-full rounded-xl border-2 p-5 cursor-pointer  ${
                selectedBookableUnit === unit ? "bg-primary-200 border-primary-500" : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleSelectUnit(unit)}
            >
              <div>
                {unit.photos && unit.photos.length > 0 && (
                  <>
                    <ImageGallery
                      images={unit.photos}
                      openModal={openModal}
                      showTwoOnly={true}
                      isViewModal={false}
                      isImageAllowClickView={true}
                      isRoundedEdge={true}
                    />
                    <ImageGalleryModal
                      images={unit.photos}
                      isOpen={galleryModalOpen}
                      onClose={() => setGalleryModalOpen(false)}
                    />
                  </>
                )}
                <div className="p-2 mt-4">
                  <div className="text-md mb-2 font-bold">{unit.title}</div>
                  <div className="text-md mb-2">{bedDisplay}</div>
                  {unit.category === "Bed" && (
                    <div className="text-md mb-2 font-bold">{unit.subtitle}</div>
                  )}
                  {unit.totalSize && (
                    <div className="text-md mb-2">
                      {unit.totalSize}m² / {Math.round(unit.totalSize * 10.764)}ft² {unit.category} Size
                    </div>
                  )}
                  <div className="text-md mb-2">Can accommodate maximum of {unit.maxGuests} guests</div>
                  <Button
                    variant="link"
                    size="link"
                    className="text-md mb-2 underline"
                  >
                    Show all information &gt;
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AvailableBooking
