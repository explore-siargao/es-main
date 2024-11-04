import { activityTypes, durationTypes, experienceTypes, locations, T_Filter_Type } from "../../constants"

export enum EActivityAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE",
  SET_EXPERIENCE_TYPE = "SET_EXPERIENCE_TYPE",
  SET_DURATION = "SET_DURATION",
  RESET_FILTERS = "RESET_FILTERS",
  
}

export type T_Filter_Activity = {
  starRating: number
  priceRange: number[]
  location: T_Filter_Type[]
  activityType: T_Filter_Type[]
  experienceType: T_Filter_Type[]
  duration: T_Filter_Type[]
}

type Action =
  | { type: EActivityAction.SET_LOCATION; payload: T_Filter_Type[] }
  | { type: EActivityAction.SET_STAR_RATING; payload: number }
  | { type: EActivityAction.SET_PRICE_RANGE; payload: [number, number] }
  | { type: EActivityAction.SET_ACTIVITY_TYPE; payload: T_Filter_Type[] }
  | { type: EActivityAction.SET_EXPERIENCE_TYPE; payload: T_Filter_Type[] }
  | { type: EActivityAction.SET_DURATION; payload: T_Filter_Type[] }
  | { type: EActivityAction.RESET_FILTERS }

export const activityInitialState: T_Filter_Activity = {
  starRating: 0,
  priceRange: [0, 1000],
  location: [locations[0]!],
  activityType: [activityTypes[0]!],
  experienceType: [experienceTypes[0]!],
  duration: [durationTypes[0]!],
}

export function activityReducer(
  state: T_Filter_Activity,
  action: Action
): T_Filter_Activity {
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
