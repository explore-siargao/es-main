import pluralize from "pluralize"
import { ApiService } from "../common/services/api"
import {
  T_Activities_Search,
  T_Category_Highest_Price,
  T_Properties_Search,
  T_Rentals_Search,
} from "./type"
import { E_Listing_Category } from "@repo/contract"
import {
  Z_Activities_Search,
  Z_Properties_Search,
  Z_Rentals_Search,
} from "./zod"

const propertyQueryParts = [
  `page=1`,
  `location=any`,
  `propertyTypes=any`,
  `priceFrom=any`,
  `priceTo=any`,
  `bedroomCount=any`,
  `bedCount=any`,
  `bathroomCount=any`,
  `facilities=any`,
  `amenities=any`,
  `starRating=any`,
  `checkIn=any`,
  `checkOut=any`,
  `numberOfGuest=any`,
]

const activityQueryParts = [
  `page=1`,
  `location=any`,
  `activityTypes=any`,
  `experienceTypes=any`,
  `priceFrom=any`,
  `priceTo=any`,
  `durations=any`,
  `starRating=any`,
  `activityDate=any`,
  `numberOfGuest=any`,
]

const rentalQueryParts = [
  `page=1`,
  `location=any`,
  `vehicleTypes=any`,
  `transmissionTypes=any`,
  `priceFrom=any`,
  `priceTo=any`,
  `seatCount=any`,
  `starRating=any`,
  `pickUpDate=any`,
  `dropOffDate=any`,
]

export declare enum E_Property_Type {
  HOSTEL = "HOSTEL",
  HOMESTAY = "HOMESTAY",
  HOTEL = "HOTEL",
  RESORT = "RESORT",
  WHOLE_PLACE = "WHOLE_PLACE",
  VILLA = "VILLA",
  HOUSE = "HOUSE",
  BUNGALOW = "BUNGALOW",
  COTTAGE = "COTTAGE",
}
export type T_Property_Card = {
  listingId: string
  title: string | null
  subtitle: string | null
  type: E_Property_Type
  wholePlaceType: E_Property_Type
  photos: {
    key: string
    alt: string
  }[]
  location: {
    city: string
    latitude: number
    longitude: number
  }
  price: number
  average: number
  reviewsCount: number
}
export class FilterService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }

  async getPaginatedListings({
    category,
    searchQueries,
  }: {
    category: E_Listing_Category
    searchQueries: T_Properties_Search | T_Activities_Search | T_Rentals_Search
  }) {
    const stringSearchQueries = Object.fromEntries(
      Object.entries(searchQueries).map(([key, value]) => [key, String(value)])
    )

    let queryString = ""
    let isValid = false

    if (category === E_Listing_Category.Property) {
      isValid = Z_Properties_Search.safeParse(searchQueries).success
      if (isValid) {
        queryString = new URLSearchParams(stringSearchQueries).toString()
      } else {
        queryString = propertyQueryParts.join("&")
      }
    } else if (category === E_Listing_Category.Activity) {
      isValid = Z_Activities_Search.safeParse(searchQueries).success
      if (isValid) {
        queryString = new URLSearchParams(stringSearchQueries).toString()
      } else {
        queryString = activityQueryParts.join("&")
      }
    } else if (category === E_Listing_Category.Rental) {
      isValid = Z_Rentals_Search.safeParse(searchQueries).success
      if (isValid) {
        queryString = new URLSearchParams(stringSearchQueries).toString()
      } else {
        queryString = rentalQueryParts.join("&")
      }
    }

    return this.api.get<{
      items: T_Property_Card[]
    }>(
      `/${pluralize(category).toLocaleLowerCase()}/filtered?${queryString}`
    )
  }

  async getCategoryHighestPrice({
    category,
  }: {
    category: E_Listing_Category
  }) {
    return this.api.get<{ item: T_Category_Highest_Price }>(
      `/${pluralize(category).toLocaleLowerCase()}/highest-price`
    )
  }

  static getQueryKeys() {
    return {
      rentalsHighestPrice: "rentals-highest-price",
      activitiesHighestPrice: "activities-highest-price",
      propertiesHighestPrice: "properties-highest-price",
      filterActivities: "filter-activities",
      filterRentals: "filter-rentals",
      filterProperties: "filter-properties",
    }
  }
}
