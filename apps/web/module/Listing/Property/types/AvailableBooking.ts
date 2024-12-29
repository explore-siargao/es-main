import { T_Photo } from "@repo/contract-2/photos"
import { T_Image, T_ImagesProps } from "./SectionInfo"

export type T_Bed = {
  name: string
  qty: number
}

export type T_BedRoom = {
  beds: T_Bed[]
}

export type T_LivingRoom = {
  beds: T_Bed[]
}

export type T_AvailableBookableUnitProps = {
  id: string
  category: string
  title: string
  subtitle?: string
  totalSize?: number
  photos: T_Photo[]
  maxGuests: number
  bedRooms?: T_BedRoom[]
  livingRooms?: T_LivingRoom[]
}

export type T_AvailableBookingProps = {
  imagesAvailable?: T_ImagesProps[]
  bookableUnits: T_AvailableBookableUnitProps[]
  propertyType: string
  selectedBookableUnit: T_AvailableBookableUnitProps
  onSelectBookableUnit: (unit: T_AvailableBookableUnitProps | null) => void
  selectedUnitId: string
  propertyId: string
}

export enum PropertyType {
  HOSTEL = "HOSTEL",
  APARTMENT = "APARTMENT",
  HOMESTAY = "HOMESTAY",
  HOTEL = "HOTEL",
  RESORT = "RESORT",
  VILLA = "VILLA",
}
