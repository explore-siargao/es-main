import {
  activityTypes,
  durationTypes,
  experienceTypes,
  T_Filter_Type,
} from "../../constants"

export enum EActivityAction {
  SET_LOCATION = "SET_LOCATION",
  SET_STAR_RATING = "SET_STAR_RATING",
  SET_PRICE_RANGE = "SET_PRICE_RANGE",
  SET_SELECTED_PRICE_RANGE = "SET_SELECTED_PRICE_RANGE",
  SET_ACTIVITY_TYPES = "SET_ACTIVITY_TYPES",
  SET_EXPERIENCE_TYPES = "SET_EXPERIENCE_TYPES",
  SET_DURATIONS = "SET_DURATIONS",
  RESET_FILTERS = "RESET_FILTERS",
}

export type T_Filter_Activity = {
  starRating: number | "any"
  priceRange: number[]
  selectedPriceRange: ("any" | number)[]
  location: string
  activityTypes: string[] | "any"
  experienceTypes: string[] | "any"
  durations: string[] | "any"
}

type Action =
  | { type: EActivityAction.SET_LOCATION; payload: string }
  | { type: EActivityAction.SET_STAR_RATING; payload: number }
  | { type: EActivityAction.SET_PRICE_RANGE; payload: number[] }
  | {
      type: EActivityAction.SET_SELECTED_PRICE_RANGE
      payload: number[] | "any"[]
    }
  | { type: EActivityAction.SET_ACTIVITY_TYPES; payload: string[] | "any" }
  | { type: EActivityAction.SET_EXPERIENCE_TYPES; payload: string[] | "any" }
  | { type: EActivityAction.SET_DURATIONS; payload: string[] | "any" }
  | { type: EActivityAction.RESET_FILTERS }

export function activityReducer(
  state: T_Filter_Activity,
  action: Action
): T_Filter_Activity {
  switch (action.type) {
    case EActivityAction.SET_STAR_RATING:
      return { ...state, starRating: action.payload }
    case EActivityAction.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload }
    case EActivityAction.SET_SELECTED_PRICE_RANGE:
      return { ...state, selectedPriceRange: action.payload }
    case EActivityAction.SET_ACTIVITY_TYPES:
      return { ...state, activityTypes: action.payload }
    case EActivityAction.SET_LOCATION:
      return { ...state, location: action.payload }
    case EActivityAction.SET_EXPERIENCE_TYPES:
      return { ...state, experienceTypes: action.payload }
    case EActivityAction.SET_DURATIONS:
      return { ...state, durations: action.payload }
    case EActivityAction.RESET_FILTERS:
      return {
        starRating: "any",
        priceRange: [0, 1000],
        selectedPriceRange: ["any", "any"],
        location: "any",
        activityTypes: "any",
        experienceTypes: "any",
        durations: "any",
      }
    default:
      return state
  }
}
