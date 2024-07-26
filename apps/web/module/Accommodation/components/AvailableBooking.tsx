"use client"
import { Button } from "@/common/components/ui/Button"
import {
  PropertyType,
  T_AvailableBookingProps,
} from "../types/AvailableBooking"
import { TitleSection } from "./TitleSection"
import { T_BookableUnitType } from "@repo/contract"
import ImageGallery from "./ImageGallery"
import ImageGalleryModal from "./modals/ImageGalleryModal"
import { useState } from "react"

const AvailableBooking = ({
  bookableUnits,
  propertyType,
  onSelectBookableUnit,
  selectedBookableUnit,
}: T_AvailableBookingProps) => {
  const handleSelectUnit = (unit: T_BookableUnitType) => {
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
      {bookableUnits.map((unit: T_BookableUnitType) => (
        <div key={unit.id} className="flex flex-col sm:flex-row w-full mt-10">
          <div className="flex-1 sm:w-96">
            {unit.photos && unit.photos.length > 0 && (
              <>
                <ImageGallery
                  images={unit.photos}
                  openModal={openModal}
                  isViewModal={true}
                  showThreeOnly={true}
                />
                <ImageGalleryModal
                  images={unit.photos}
                  isOpen={galleryModalOpen}
                  onClose={() => setGalleryModalOpen(false)}
                />
              </>
            )}
            <Button
              onClick={() => handleSelectUnit(unit)}
              className="w-full mt-5"
              variant="primary"
            >
              {selectedBookableUnit === unit ? "Selected" : "Select"}
            </Button>
          </div>

          <div className="flex-1 sm:ml-10 mt-4 sm:mt-0">
            <div className="text-md mb-2 font-bold">{unit.category}</div>
            <div className="text-md mb-2">{unit.title}</div>
            {unit.bed && <div className="text-md mb-2"> {unit.bed}</div>}
            {unit.category === "Bed" && (
              <div className="text-md mb-2">{unit.description}</div>
            )}
            {unit.totalSize && (
              <div className="text-md mb-2">{unit.totalSize} Square meters</div>
            )}
            <div className="text-md mb-2">{unit.maxGuests} Guests capacity</div>
            <Button
              variant="link"
              size="link"
              className="text-md mb-2 underline"
            >
              Show all information &gt;
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AvailableBooking
