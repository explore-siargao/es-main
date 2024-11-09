import {
  locations,
  T_Filter_Type,
  transmissionTypes,
  vehicleTypes,
} from "../../constants"

export enum ERentalAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_SELECTED_PRICE_RANGE = "SET_SELECTED_PRICE_RANGE",
  SET_VEHICLE_TYPES = "SET_VEHICLE_TYPES",
  SET_TRANSMISSION_TYPES = "SET_TRANSMISSION_TYPES",
  SET_SEAT_COUNT = "SET_SEAT_COUNT",
  RESET_FILTERS = "RESET_FILTERS",
}

export type T_Filter_Rental = {
  location: string
  starRating: number | "any"
  priceRange: number[]
  selectedPriceRange: ("any" | number)[]
  vehicleTypes: string[] | "any"
  transmissionTypes: string[] | "any"
  seatCount: number | "any"
}

type Action =
  | { type: ERentalAction.SET_LOCATION; payload: string }
  | { type: ERentalAction.SET_STAR_RATING; payload: number }
  | { type: ERentalAction.SET_PRICE_RANGE; payload: [number, number] }
  | {
      type: ERentalAction.SET_SELECTED_PRICE_RANGE
      payload: number[] | "any"[]
    }
  | { type: ERentalAction.SET_VEHICLE_TYPES; payload: string[] | "any" }
  | { type: ERentalAction.SET_TRANSMISSION_TYPES; payload: string[] | "any" }
  | { type: ERentalAction.SET_SEAT_COUNT; payload: number | "any" }
  | { type: ERentalAction.RESET_FILTERS }

export function rentalReducer(
  state: T_Filter_Rental,
  action: Action
): T_Filter_Rental {
  switch (action.type) {
    case ERentalAction.SET_LOCATION:
      return { ...state, location: action.payload }
    case ERentalAction.SET_STAR_RATING:
      return { ...state, starRating: action.payload }
    case ERentalAction.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload }
    case ERentalAction.SET_SELECTED_PRICE_RANGE:
      return { ...state, selectedPriceRange: action.payload }
    case ERentalAction.SET_VEHICLE_TYPES:
      return { ...state, vehicleTypes: action.payload }
    case ERentalAction.SET_TRANSMISSION_TYPES:
      return { ...state, transmissionTypes: action.payload }
    case ERentalAction.SET_SEAT_COUNT:
      return { ...state, seatCount: action.payload }
    case ERentalAction.RESET_FILTERS:
      return {
        starRating: "any",
        priceRange: [0, 1000],
        selectedPriceRange: ["any", "any"],
        location: "any",
        vehicleTypes: "any",
        transmissionTypes: "any",
        seatCount: "any",
      }
    default:
      return state
  }
}
