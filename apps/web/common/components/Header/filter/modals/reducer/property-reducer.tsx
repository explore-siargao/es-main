import { locations, propertyTypes, T_Filter_Type } from "../../constants"

export enum EPropertyAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_SELECTED_PRICE_RANGE = "SET_SELECTED_PRICE_RANGE",
  SET_PROPERTY_TYPES = "SET_PROPERTY_TYPES",
  SET_BEDROOM_COUNT = "SET_BEDROOM_COUNT",
  SET_BED_COUNT = "SET_BED_COUNT",
  SET_BATHROOM_COUNT = "SET_BATHROOM_COUNT",
  TOGGLE_FACILITIES_MODAL = "TOGGLE_FACILITIES_MODAL",
  TOGGLE_AMENITIES_MODAL = "TOGGLE_AMENITIES_MODAL",
  RESET_FILTERS = "RESET_FILTERS",
}

export type T_Filter_Property = {
  location: string
  starRating: number | "any"
  priceRange: number[]
  selectedPriceRange: ("any" | number)[]
  propertyTypes: string[] | "any"
  bedroomCount: number | "any"
  bedCount: number | "any"
  bathroomCount: number | "any"
  facilitiesModal: boolean
  amenitiesModal: boolean
}

type Action =
  | { type: EPropertyAction.SET_LOCATION; payload: string }
  | { type: EPropertyAction.SET_STAR_RATING; payload: number | "any" }
  | { type: EPropertyAction.SET_PRICE_RANGE; payload: number[] }
  | {
      type: EPropertyAction.SET_SELECTED_PRICE_RANGE
      payload: number[] | "any"[]
    }
  | { type: EPropertyAction.SET_PROPERTY_TYPES; payload: string[] | "any" }
  | { type: EPropertyAction.SET_BEDROOM_COUNT; payload: number | "any" }
  | { type: EPropertyAction.SET_BED_COUNT; payload: number | "any" }
  | { type: EPropertyAction.SET_BATHROOM_COUNT; payload: number | "any" }
  | { type: EPropertyAction.TOGGLE_FACILITIES_MODAL; payload: boolean }
  | { type: EPropertyAction.TOGGLE_AMENITIES_MODAL; payload: boolean }
  | { type: EPropertyAction.RESET_FILTERS }

export function propertyReducer(
  state: T_Filter_Property,
  action: Action
): T_Filter_Property {
  switch (action.type) {
    case EPropertyAction.SET_LOCATION:
      return { ...state, location: action.payload }
    case EPropertyAction.SET_STAR_RATING:
      return { ...state, starRating: action.payload }
    case EPropertyAction.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload }
    case EPropertyAction.SET_SELECTED_PRICE_RANGE:
      return { ...state, selectedPriceRange: action.payload }
    case EPropertyAction.SET_PROPERTY_TYPES:
      return { ...state, propertyTypes: action.payload }
    case EPropertyAction.SET_BEDROOM_COUNT:
      return { ...state, bedroomCount: action.payload }
    case EPropertyAction.SET_BED_COUNT:
      return { ...state, bedCount: action.payload }
    case EPropertyAction.SET_BATHROOM_COUNT:
      return { ...state, bathroomCount: action.payload }
    case EPropertyAction.TOGGLE_FACILITIES_MODAL:
      return { ...state, facilitiesModal: action.payload }
    case EPropertyAction.TOGGLE_AMENITIES_MODAL:
      return { ...state, amenitiesModal: action.payload }
    case EPropertyAction.RESET_FILTERS:
      return {
        location: "any",
        starRating: "any",
        priceRange: [0, 1000],
        selectedPriceRange: ["any", "any"],
        propertyTypes: "any",
        bedroomCount: "any",
        bedCount: "any",
        bathroomCount: "any",
        facilitiesModal: false,
        amenitiesModal: false,
      }
    default:
      return state
  }
}
