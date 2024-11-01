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

export const activityTypes: T_FilterType[] = [
  { value: "any", label: "Any Type" },
  { value: "Island hopping", label: "Island Hopping" },
  { value: "Land tour", label: "Land Tour" },
  { value: "Surfing lessons", label: "Surfing Lessons" },
  { value: "Wakeboarding", label: "Wakeboarding" },
  { value: "Kite surfing", label: "Kite Surfing" },
  { value: "Scuba diving", label: "Scuba Diving" },
  { value: "Freediving", label: "Freediving" },
  { value: "Fishing", label: "Fishing" },
  { value: "ATV tour", label: "ATV Tour" },
]

export const experienceTypes: T_FilterType[] = [
  { value: "any", label: "Any Type" },
  { value: "joiner", label: "Joiner" },
  { value: "private", label: "Private" },
]

export const durationTypes: T_FilterType[] = [
  { value: "any", label: "Any Duration" },
  { value: "1", label: "1 Hour" },
  { value: "2", label: "2 Hours" },
  { value: "3", label: "3 Hours" },
  { value: "4", label: "4 Hours" },
  { value: "5", label: "5 Hours" },
  { value: "6", label: "6 Hours" },
  { value: "7", label: "7 Hours" },
]

export enum EActivityAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE",
  SET_EXPERIENCE_TYPE = "SET_EXPERIENCE_TYPE",
  SET_DURATION = "SET_DURATION",
  RESET_FILTERS = "RESET_FILTERS",
  
}

export type TFilterActivity = {
  starRating: number
  priceRange: number[]
  location: T_FilterType[]
  activityType: T_FilterType[]
  experienceType: T_FilterType[]
  duration: T_FilterType[]
}

type Action =
  | { type: EActivityAction.SET_LOCATION; payload: T_FilterType[] }
  | { type: EActivityAction.SET_STAR_RATING; payload: number }
  | { type: EActivityAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: EActivityAction.SET_ACTIVITY_TYPE; payload: T_FilterType[] }
  | { type: EActivityAction.SET_EXPERIENCE_TYPE; payload: T_FilterType[] }
  | { type: EActivityAction.SET_DURATION; payload: T_FilterType[] }
  | { type: EActivityAction.RESET_FILTERS }

export const activityInitialState: TFilterActivity = {
  starRating: 0,
  priceRange: [0, 1000],
  location: [locations[0]!],
  activityType: [activityTypes[0]!],
  experienceType: [experienceTypes[0]!],
  duration: [durationTypes[0]!],
}

export function activityReducer(
  state: TFilterActivity,
  action: Action
): TFilterActivity {
  switch (action.type) {
    case EActivityAction.SET_STAR_RATING:
      return { ...state, starRating: action.payload }
    case EActivityAction.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload }
    case EActivityAction.SET_ACTIVITY_TYPE:
      return { ...state, activityType: action.payload }
     case EActivityAction.SET_LOCATION:
        return { ...state, location: action.payload }
    case EActivityAction.SET_EXPERIENCE_TYPE:
      return { ...state, experienceType: action.payload }
    case EActivityAction.SET_DURATION:
      return { ...state, duration: action.payload }
    case EActivityAction.RESET_FILTERS:
      return activityInitialState
    default:
      return state
  }
}
