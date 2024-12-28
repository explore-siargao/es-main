"use client"
import { Button } from "@/common/components/ui/Button"
import {
  PropertyType,
  T_AvailableBookableUnitProps,
  T_AvailableBookingProps,
} from "./types/AvailableBooking"
import { useState } from "react"
import { getCombinedBedDisplay } from "./helpers/get-combined-bed-display"
import { Typography } from "@/common/components/ui/Typography"
import { LucideGrip } from "lucide-react"
import formatCurrency from "@/common/helpers/format-currency"
import UnitImageGalleryModal from "./modals/unit-image-gallery-modal"
import Image from "@/common/components/ui/image"
import { T_Photo } from "@repo/contract-2/photos"
import UnitMoreInfoModal from "./modals/unit-more-info-modal"
import { useRouter } from "next/navigation"
import { T_Bookable_Unit, T_Property } from "@repo/contract-2/property"

const AvailableUnits = ({
  property,
  selectedUnitId,
}: {
  property: T_Property,
  selectedUnitId: string,
}) => {
  const router = useRouter()
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const [moreInfoModalOpen, setMoreInfoModalOpen] = useState(false)
  const [moreInfoUnit, setMoreInfoUnit] =
    useState<T_Bookable_Unit | null>(null)
  const [showAllUnitPhotos, setShowAllUnitPhotos] = useState<T_Photo[]>([])

  let title = ""
  switch (property.type.toUpperCase()) {
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

  const getImgSrc = (index: number, images: T_Photo[]) => {
    const image = images[index]
    const imgSrc = `/assets/${image?.key ? `${image.key}` : ""}`
    const imgAlt = image?.description || ""
    return { src: imgSrc, alt: imgAlt }
  }

  const renderImage = (index: number, images: T_Photo[]) => (
    <div className={`relative w-full h-full`}>
      <Image
        src={images ? getImgSrc(index, images).src : ""}
        fill
        style={{ objectFit: "cover" }}
        alt={images ? getImgSrc(index, images).alt : ""}
        className={`${index === 0 && "rounded-l-xl"} ${index === 1 && "rounded-r-xl"} cursor-pointer`}
      />
    </div>
  )

  const propertyId = property._id

  return (
    <>
      <Typography variant="h3" fontWeight="semibold">
        {title}
      </Typography>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-6">
        {property?.bookableUnits?.map((unit: T_Bookable_Unit) => {
          const bedDisplay = getCombinedBedDisplay(
            unit.bedRooms || [],
            unit.livingRooms
          )

          return (
            <button
              type="button"
              key={unit._id}
              className={`w-full rounded-2xl border p-5 cursor-pointer transition text-left ${
                selectedUnitId === unit._id
                  ? "bg-primary-200 border-primary-500"
                  : "bg-white hover:bg-text-50 border-text-100"
              }`}
              onClick={() =>
                router.push(`/listings/properties/${propertyId}/${unit._id}`, {
                  scroll: false,
                })
              }
            >
              <div>
                {unit.photos && unit.photos.length > 0 && (
                  <>
                    <div className="relative">
                      <div className="relative h-44">
                        <button
                          className="grid grid-cols-2 h-full gap-2 w-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAllUnitPhotos(unit.photos)
                            setGalleryModalOpen(true)
                          }}
                        >
                          {renderImage(0, unit.photos)}
                          {renderImage(1, unit.photos)}
                        </button>
                      </div>
                      <Button
                        size="sm"
                        variant="shaded"
                        className="absolute bottom-2 md:bottom-4 right-1 md:right-4 bg-white text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowAllUnitPhotos(unit.photos)
                          setGalleryModalOpen(true)
                        }}
                      >
                        <LucideGrip className="h-3 w-3 mr-2" />
                        Show all photos
                      </Button>
                    </div>
                  </>
                )}
                <div className="mt-4">
                  <Typography variant="h3" className="flex justify-between">
                    <span className="font-semibold">{unit.title}</span>
                    <span>{formatCurrency(unit.unitPrice.baseRate)}</span>
                  </Typography>
                  <Typography variant="h5" className="mt-2">
                    {bedDisplay}
                  </Typography>
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
                  <div className="flex gap-2 mt-6">
                    <Button
                      variant={
                        selectedUnitId === unit._id ? "primary" : "default"
                      }
                      size="sm"
                      disabled={selectedUnitId === unit._id}
                      onClick={() =>
                        selectedUnitId !== unit._id
                          ? router.push(
                              `/listings/properties/${propertyId}/${unit._id}`,
                              { scroll: false }
                            )
                          : null
                      }
                    >
                      {selectedUnitId === unit._id
                        ? "Selected"
                        : "Select this unit"}
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="underline"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMoreInfoUnit(unit)
                        setMoreInfoModalOpen(true)
                      }}
                    >
                      More information
                    </Button>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      {/* TODO: Fix the flicker when modal is opened */}
      <UnitImageGalleryModal
        isOpen={galleryModalOpen}
        openModal={() => setGalleryModalOpen(!galleryModalOpen)}
        images={showAllUnitPhotos || []}
      />
      <UnitMoreInfoModal
        isOpen={moreInfoModalOpen}
        onClose={() => setMoreInfoModalOpen(!moreInfoModalOpen)}
        unit={moreInfoUnit}
      />
    </>
  )
}

export default AvailableUnits
