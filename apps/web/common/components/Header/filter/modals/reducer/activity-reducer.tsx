interface IFilterType {
  value: string
  label: string
}

export const ActivityTypes: IFilterType[] = [
  { value: "any_activity", label: "Any Type" },
  { value: "island_hopping", label: "Island Hopping" },
  { value: "land_tour", label: "Land Tour" },
  { value: "surfing_lessons", label: "Surfing Lessons" },
  { value: "wake_boarding", label: "Wakeboarding" },
  { value: "kite_surfing", label: "Kite Surfing" },
  { value: "scuba_diving", label: "Scuba Diving" },
  { value: "free_diving", label: "Freediving" },
  { value: "fishing", label: "Fishing" },
  { value: "atv_tour", label: "ATV Tour" },
]

export const ExperienceTypes: IFilterType[] = [
  { value: "any_experience", label: "Any Type" },
  { value: "joiner", label: "Joiner" },
  { value: "private", label: "Private" },
]

export const DurationTypes: IFilterType[] = [
  { value: "any_duration", label: "Any Duration" },
  { value: "one_hour", label: "1 Hour" },
  { value: "two_hours", label: "2 Hours" },
  { value: "three_hours", label: "3 Hours" },
  { value: "four_hours", label: "4 Hours" },
  { value: "five_hours", label: "5 Hours" },
  { value: "six_hours", label: "6 Hours" },
  { value: "seven_hours", label: "7 Hours" },
]

export enum EActivityAction {
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
  activityType: IFilterType[]
  experienceType: IFilterType[]
  duration: IFilterType[]
}

type Action =
  | { type: EActivityAction.SET_STAR_RATING; payload: number }
  | { type: EActivityAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: EActivityAction.SET_ACTIVITY_TYPE; payload: IFilterType[] }
  | { type: EActivityAction.SET_EXPERIENCE_TYPE; payload: IFilterType[] }
  | { type: EActivityAction.SET_DURATION; payload: IFilterType[] }
  | { type: EActivityAction.RESET_FILTERS }

export const activityInitialState: TFilterActivity = {
  starRating: 0,
  priceRange: [0, 1000],
  activityType: [ActivityTypes[0]!],
  experienceType: [ExperienceTypes[0]!],
  duration: [DurationTypes[0]!],
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
