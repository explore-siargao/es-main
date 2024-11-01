type T_FilterType = {
  value: string
  label: string
}

export const locations: T_FilterType[] = [
  { value: "any", label: "Any Location" },
  { value: "General Luna", label: "General Luna" },
  { value: "Dapa", label: "Dapa" },
  { value: "Del Carmen", label: "Del Carmen" },
  { value: "San Isidro", label: "San Isidro" },
  { value: "Pilar", label: "Pilar" },
  { value: "San Benito", label: "San Benito" },
  { value: "Burgos", label: "Burgos" },
  { value: "Santa Monica", label: "Santa Monica" },
  { value: "Socorro", label: "Socorro" },
]

export const vehicleTypes: T_FilterType[] = [
  { value: "any", label: "Any Type" },
  { value: "car", label: "Car" },
  { value: "motorbike", label: "Motorbike" },
  { value: "bicycle", label: "Bicycle" },
]

export const transmissionTypes: T_FilterType[] = [
  { value: "any_transmission", label: "Any Type" },
  { value: "Automatic", label: "Automatic" },
  { value: "Semi-Automatic", label: "Semi-Automatic" },
  { value: "Manual", label: "Manual" },
]

export enum ERentalAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_VEHICLE_TYPE = "SET_VEHICLE_TYPE",
  SET_TRANSMISSION_TYPE = "SET_TRANSMISSION_TYPE",
  SET_SEAT_COUNT = "SET_SEAT_COUNT",
  RESET_FILTERS = "RESET_FILTERS",
}

export type TFilterRental = {
  location: T_FilterType[]
  starRating: number
  priceRange: number[]
  vehicleType: T_FilterType[]
  transmissionType: T_FilterType[]
  seatCount: number | null
}

type Action =
| { type: ERentalAction.SET_LOCATION; payload: T_FilterType[] }
  | { type: ERentalAction.SET_STAR_RATING; payload: number }
  | { type: ERentalAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: ERentalAction.SET_VEHICLE_TYPE; payload: T_FilterType[] }
  | { type: ERentalAction.SET_TRANSMISSION_TYPE; payload: T_FilterType[] }
  | { type: ERentalAction.SET_SEAT_COUNT; payload: number | null }
  | { type: ERentalAction.RESET_FILTERS }

export const rentalInitialState: TFilterRental = {
  location: [locations[0]!],
  starRating: 0,
  priceRange: [0, 1000],
  vehicleType: [vehicleTypes[0]!],
  transmissionType: [transmissionTypes[0]!],
  seatCount: null,
}

export function rentalReducer(
  state: TFilterRental,
  action: Action
): TFilterRental {
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
