import { T_BookableUnitType } from "@repo/contract"
import { T_ImagesProps } from "./SectionInfo"

export type T_AvailableBookingProps = {
  imagesAvailable?: T_ImagesProps[]
  bookableUnits: T_BookableUnitType[]
  propertyType: string
  selectedBookableUnit: string
  onSelectBookableUnit: (unit: T_BookableUnitType) => void
}

export enum PropertyType {
  HOSTEL = "HOSTEL",
  APARTMENT = "APARTMENT",
  HOMESTAY = "HOMESTAY",
  HOTEL = "HOTEL",
  RESORT = "RESORT",
  VILLA = "VILLA",
}
