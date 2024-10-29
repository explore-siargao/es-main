interface IFilterType {
  value: string
  label: string
}

export const PropertyTypes: IFilterType[] = [
  { value: "any", label: "Any Type" },
  { value: "hostel", label: "Hostel" },
  { value: "apartment", label: "Apartment" },
  { value: "homestay", label: "Homestay" },
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "bungalow", label: "Bungalow" },
  { value: "cottage", label: "Cottage" },
]

export enum EPropertyAction {
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
  starRating: number
  priceRange: number[]
  propertyType: IFilterType[]
  bedroomCount: number | null
  bedCount: number | null
  bathroomCount: number | null
  facilitiesModal: boolean
  amenitiesModal: boolean
  facilities: string | null
  amenities: string | null
}

type Action =
  | { type: EPropertyAction.SET_STAR_RATING; payload: number }
  | { type: EPropertyAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: EPropertyAction.SET_PROPERTY_TYPE; payload: IFilterType[] }
  | { type: EPropertyAction.SET_BEDROOM_COUNT; payload: number | null }
  | { type: EPropertyAction.SET_BED_COUNT; payload: number | null }
  | { type: EPropertyAction.SET_BATHROOM_COUNT; payload: number | null }
  | { type: EPropertyAction.TOGGLE_FACILITIES_MODAL; payload: boolean }
  | { type: EPropertyAction.TOGGLE_AMENITIES_MODAL; payload: boolean }
  | { type: EPropertyAction.RESET_FILTERS }

export const propertyInitialState: TFilterProperty = {
  starRating: 0,
  priceRange: [0, 1000],
  propertyType: [PropertyTypes[0]!],
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
