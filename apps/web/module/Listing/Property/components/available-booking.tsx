"use client"
import { Button } from "@/common/components/ui/Button"
import {
  PropertyType,
  T_AvailableBookableUnitProps,
  T_AvailableBookingProps,
} from "../types/AvailableBooking"
import { TitleSection } from "./TitleSection"
import ImageGallery from "./image-gallery"
import { useEffect, useState } from "react"
import { getCombinedBedDisplay } from "./helpers/get-combined-bed-display"
import { Typography } from "@/common/components/ui/Typography"
import { LucideGrip } from "lucide-react"
import formatCurrency from "@/common/helpers/format-currency"

const AvailableBooking = ({
  bookableUnits,
  propertyType,
  onSelectBookableUnit,
  selectedBookableUnit,
}: T_AvailableBookingProps) => {
  console.log("eqe", bookableUnits)
  const handleSelectUnit = (unit: T_AvailableBookableUnitProps | null) => {
    onSelectBookableUnit(unit)
  }
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)

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
      title = "Available Units"
      break
  }

  useEffect(() => {
    onSelectBookableUnit(bookableUnits[0] || null)
  }, [])

  return (
    <>
      <TitleSection size="lg" title={title} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-6">
        {bookableUnits.map((unit: T_AvailableBookableUnitProps) => {
          const bedDisplay = getCombinedBedDisplay(
            unit.bedRooms,
            unit.livingRooms
          )

          return (
            <button
              type="button"
              key={unit.id}
              className={`w-full rounded-2xl border p-5 cursor-pointer transition text-left ${
                selectedBookableUnit === unit
                  ? "bg-primary-200 border-primary-500"
                  : "bg-white hover:bg-text-50 border-text-100"
              }`}
              onClick={() =>
                handleSelectUnit(selectedBookableUnit === unit ? null : unit)
              }
            >
              <div>
                {unit.photos && unit.photos.length > 0 && (
                  <div className="relative">
                    <ImageGallery
                      images={unit.photos}
                      openModal={() => setGalleryModalOpen(!galleryModalOpen)}
                      isOpen={galleryModalOpen}
                      showTwoOnly={true}
                      isViewModal={false}
                      isImageAllowClickView={true}
                      isRoundedEdge={true}
                    />
                    <Button
                      size="sm"
                      variant="shaded"
                      className="absolute bottom-2 md:bottom-4 right-1 md:right-4 bg-white text-xs"
                      onClick={() => setGalleryModalOpen(true)}
                    >
                      <LucideGrip className="h-3 w-3 mr-2" />
                      Show all photos
                    </Button>
                  </div>
                )}
                <div className="mt-4">
                  <Typography variant="h3" fontWeight="semibold">
                    {unit.title}
                  </Typography>
                  <Typography variant="h5">{bedDisplay}</Typography>
                  {unit.category === "Bed" && (
                    <Typography variant="h5">{unit.subtitle}</Typography>
                  )}
                  {unit.totalSize && (
                    <Typography variant="h5">
                      {unit.totalSize}m² / {Math.round(unit.totalSize * 10.764)}
                      ft² {unit.category} Size
                    </Typography>
                  )}
                  <Typography variant="h5">
                    Can accommodate maximum of {unit.maxGuests} guests
                  </Typography>
                  <Typography variant="h5">
                    {/* @ts-expect-error */}
                    {formatCurrency(unit.unitPrice.baseRate)} night
                  </Typography>
                  <div className="flex gap-2 mt-6">
                    <Button
                      variant={
                        selectedBookableUnit === unit ? "primary" : "default"
                      }
                      size="sm"
                      onClick={() =>
                        handleSelectUnit(
                          selectedBookableUnit === unit ? null : unit
                        )
                      }
                    >
                      {selectedBookableUnit === unit
                        ? "Unselect this unit"
                        : "Select this unit"}
                    </Button>
                    <Button variant="link" size="sm" className="underline">
                      More information
                    </Button>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}

export default AvailableBooking
