import { locations, propertyTypes, T_Filter_Type } from "../../constants"

export enum EPropertyAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_PROPERTY_TYPE = "SET_PROPERTY_TYPE",
  SET_BEDROOM_COUNT = "SET_BEDROOM_COUNT",
  SET_BED_COUNT = "SET_BED_COUNT",
  SET_BATHROOM_COUNT = "SET_BATHROOM_COUNT",
  TOGGLE_FACILITIES_MODAL = "TOGGLE_FACILITIES_MODAL",
  TOGGLE_AMENITIES_MODAL = "TOGGLE_AMENITIES_MODAL",
  RESET_FILTERS = "RESET_FILTERS",
}

export type TFilterProperty = {
  location: T_Filter_Type[]
  starRating: number
  priceRange: number[]
  propertyType: T_Filter_Type[]
  bedroomCount: number | null
  bedCount: number | null
  bathroomCount: number | null
  facilitiesModal: boolean
  amenitiesModal: boolean
  facilities: string | null
  amenities: string | null
}

type Action =
| { type: EPropertyAction.SET_LOCATION; payload: T_Filter_Type[] }
  | { type: EPropertyAction.SET_STAR_RATING; payload: number }
  | { type: EPropertyAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: EPropertyAction.SET_PROPERTY_TYPE; payload: T_Filter_Type[] }
  | { type: EPropertyAction.SET_BEDROOM_COUNT; payload: number | null }
  | { type: EPropertyAction.SET_BED_COUNT; payload: number | null }
  | { type: EPropertyAction.SET_BATHROOM_COUNT; payload: number | null }
  | { type: EPropertyAction.TOGGLE_FACILITIES_MODAL; payload: boolean }
  | { type: EPropertyAction.TOGGLE_AMENITIES_MODAL; payload: boolean }
  | { type: EPropertyAction.RESET_FILTERS }

export const propertyInitialState: TFilterProperty = {
  location: [locations[0]!],
  starRating: 0,
  priceRange: [0, 1000],
  propertyType: [propertyTypes[0]!],
  bedroomCount: null,
  bedCount: null,
  bathroomCount: null,
  facilitiesModal: false,
  amenitiesModal: false,
  facilities: null,
  amenities: null,
}

export function propertyReducer(
  state: TFilterProperty,
  action: Action
): TFilterProperty {
  switch (action.type) {
    case EPropertyAction.SET_LOCATION:
      return { ...state, location: action.payload }
    case EPropertyAction.SET_STAR_RATING:
      return { ...state, starRating: action.payload }
    case EPropertyAction.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload }
    case EPropertyAction.SET_PROPERTY_TYPE:
      return { ...state, propertyType: action.payload }
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
      return propertyInitialState
    default:
      return state
  }
}
