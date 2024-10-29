interface IFilterType {
  value: string
  label: string
}

export const VehicleTypes: IFilterType[] = [
  { value: "any", label: "Any Type" },
  { value: "car", label: "Car" },
  { value: "motorbike", label: "Motorbike" },
  { value: "bicycle", label: "Bicycle" },
]

export const TransmissionTypes: IFilterType[] = [
  { value: "any", label: "Any Type" },
  { value: "Automatic", label: "Automatic" },
  { value: "Semi-Automatic", label: "Semi-Automatic" },
  { value: "Manual", label: "Manual" },
]

export enum ERentalAction {
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_VEHICLE_TYPE = "SET_VEHICLE_TYPE",
  SET_TRANSMISSION_TYPE = "SET_TRANSMISSION_TYPE",
  SET_SEAT_COUNT = "SET_SEAT_COUNT",
  RESET_FILTERS = "RESET_FILTERS",
}

export type TFilterRental = {
  starRating: number
  priceRange: number[]
  vehicleType: IFilterType[]
  transmissionType: IFilterType[]
  seatCount: number | null
}

type Action =
  | { type: ERentalAction.SET_STAR_RATING; payload: number }
  | { type: ERentalAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: ERentalAction.SET_VEHICLE_TYPE; payload: IFilterType[] }
  | { type: ERentalAction.SET_TRANSMISSION_TYPE; payload: IFilterType[] }
  | { type: ERentalAction.SET_SEAT_COUNT; payload: number | null }
  | { type: ERentalAction.RESET_FILTERS }

export const rentalInitialState: TFilterRental = {
  starRating: 0,
  priceRange: [0, 1000],
  vehicleType: [VehicleTypes[0]!],
  transmissionType: [TransmissionTypes[0]!],
  seatCount: null,
}

export function rentalReducer(
  state: TFilterRental,
  action: Action
): TFilterRental {
  switch (action.type) {
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
