import { T_BookableUnitType } from "@repo/contract"

export type T_AvailableBookingProps = {
  bookableUnits: T_BookableUnitType[]
  propertyType: string
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
