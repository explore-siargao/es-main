import { locations, T_Filter_Type, transmissionTypes, vehicleTypes } from "../../constants"

export enum ERentalAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_VEHICLE_TYPE = "SET_VEHICLE_TYPE",
  SET_TRANSMISSION_TYPE = "SET_TRANSMISSION_TYPE",
  SET_SEAT_COUNT = "SET_SEAT_COUNT",
  RESET_FILTERS = "RESET_FILTERS",
}

export type T_Filter_Rental = {
  location: T_Filter_Type[]
  starRating: number
  priceRange: number[]
  vehicleType: T_Filter_Type[]
  transmissionType: T_Filter_Type[]
  seatCount: number | null
}

type Action =
| { type: ERentalAction.SET_LOCATION; payload: T_Filter_Type[] }
  | { type: ERentalAction.SET_STAR_RATING; payload: number }
  | { type: ERentalAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: ERentalAction.SET_VEHICLE_TYPE; payload: T_Filter_Type[] }
  | { type: ERentalAction.SET_TRANSMISSION_TYPE; payload: T_Filter_Type[] }
  | { type: ERentalAction.SET_SEAT_COUNT; payload: number | null }
  | { type: ERentalAction.RESET_FILTERS }

export const rentalInitialState: T_Filter_Rental = {
  location: [locations[0]!],
  starRating: 0,
  priceRange: [0, 1000],
  vehicleType: [vehicleTypes[0]!],
  transmissionType: [transmissionTypes[0]!],
  seatCount: null,
}

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
    case ERentalAction.SET_VEHICLE_TYPE:
      return { ...state, vehicleType: action.payload }
    case ERentalAction.SET_TRANSMISSION_TYPE:
      return { ...state, transmissionType: action.payload }
    case ERentalAction.SET_SEAT_COUNT:
      return { ...state, seatCount: action.payload }
    case ERentalAction.RESET_FILTERS:
      return rentalInitialState
    default:
      return state
  }
}
