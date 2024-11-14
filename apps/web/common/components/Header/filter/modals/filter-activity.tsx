import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Slider } from "@/common/components/ui/slider"
import { Input } from "@/common/components/ui/Input"
import { Star } from "lucide-react"
import React, { useEffect, useReducer } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  EActivityAction,
  T_Filter_Activity,
  activityReducer,
} from "./reducer/activity-reducer"
import { Typography } from "@/common/components/ui/Typography"
import {
  locations,
  activityTypes,
  experienceTypes,
  durationTypes,
  T_Filter_Type,
} from "../constants"
import useGetListingCategoryHighestPrice from "./hooks/use-get-highest-category-price"
import { E_Listing_Category } from "@repo/contract"

// Uncomment the the next 2 line to debug the search query error
// import { Z_Activities_Search } from "@repo/contract-2/search-filters"
// import parseQueryToObject from "@/common/helpers/parseQueryToObject"

type T_Props = {
  isOpen: boolean
  onClose: () => void
}

const FilterActivityModal: React.FC<T_Props> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = searchParams.get("page")
  const location = searchParams.get("location")
  const activityDate = searchParams.get("activityDate")
  const priceFrom = searchParams.get("priceFrom")
  const priceTo = searchParams.get("priceTo")
  const starRating = searchParams.get("starRating")
  const numberOfGuest = searchParams.get("numberOfGuest")
  const activityTypesSearch = searchParams.get("activityTypes")?.split(",")
  const experienceTypesSearch = searchParams.get("experienceTypes")?.split(",")
  const durationsSearch = searchParams.get("durations")?.split(",")

  const defaultActivityTypes = (
    activityTypesSearch &&
    activityTypesSearch.length > 0 &&
    activityTypesSearch[0] !== "any"
      ? activityTypesSearch?.map(
          (type) => activityTypes.find(({ value }) => value === type)?.value
        )
      : activityTypes[0]?.value
  ) as string[] | "any"
  const defaultExperienceTypes = (
    experienceTypesSearch &&
    experienceTypesSearch.length > 0 &&
    experienceTypesSearch[0] !== "any"
      ? experienceTypesSearch?.map(
          (type) => experienceTypes.find(({ value }) => value === type)?.value
        )
      : experienceTypes[0]?.value
  ) as string[] | "any"
  const defaultDurations = (
    durationsSearch &&
    durationsSearch.length > 0 &&
    durationsSearch[0] !== "any"
      ? durationsSearch?.map(
          (type) => durationTypes.find(({ value }) => value === type)?.value
        )
      : durationTypes[0]?.value
  ) as string[] | "any"
  const defaultSelectedPriceRange = [
    priceFrom && priceFrom !== "any" ? Number(priceFrom) : "any",
    priceTo && priceTo !== "any" ? Number(priceTo) : "any",
  ] as ("any" | number)[]

  const activityInitialState: T_Filter_Activity = {
    location: location ? location : (locations[0]?.value ?? "any"),
    starRating: starRating !== "any" ? Number(starRating) : "any",
    priceRange: [0, 10000],
    selectedPriceRange: defaultSelectedPriceRange,
    activityTypes: defaultActivityTypes,
    experienceTypes: defaultExperienceTypes,
    durations: defaultDurations,
  }

  const [state, dispatch] = useReducer(activityReducer, activityInitialState)
  const { data, isLoading } = useGetListingCategoryHighestPrice(
    E_Listing_Category.Activity
  )

  useEffect(() => {
    if (!isLoading && !data?.error && data?.item) {
      dispatch({
        type: EActivityAction.SET_PRICE_RANGE,
        payload: [0, data?.item.amount],
      })
    }
  }, [data])

  const handleSubmit = () => {
    const {
      location,
      activityTypes,
      experienceTypes,
      selectedPriceRange,
      durations,
      starRating,
    } = state

    const queryString = [
      `?page=${page ? page : 1}`,
      `location=${location ? location : "any"}`,
      `activityTypes=${activityTypes && typeof activityTypes !== "string" && activityTypes.length ? activityTypes.toString() : "any"}`,
      `experienceTypes=${experienceTypes && typeof experienceTypes !== "string" && experienceTypes.length ? experienceTypes.toString() : "any"}`,
      `durations=${durations && typeof durations !== "string" && durations.length ? durations.toString() : "any"}`,
      `priceFrom=${selectedPriceRange && selectedPriceRange[0] !== "any" ? selectedPriceRange[0] : "any"}`,
      `priceTo=${selectedPriceRange && selectedPriceRange[1] !== "any" ? selectedPriceRange[1] : "any"}`,
      `starRating=${starRating && starRating !== "any" ? starRating : "any"}`,
    ]

    const completeSearchQuery = `${queryString.join("&")}&activityDate=${activityDate ?? "any"}&numberOfGuest=${numberOfGuest ?? "any"}`

    // Uncomment the the next 2 line to debug the search query error, do not forget to enable the import in the top of this file
    // const validate = Z_Activities_Search.safeParse(parseQueryToObject(completeSearchQuery))
    // console.log(`validate`, validate)

    router.push(completeSearchQuery)
    onClose()
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title="Filter Activity"
    >
      <div className="bg-white flex flex-col max-h-[80vh]">
        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {locations.map((type) => (
                <div
                  key={`location-${type.value}`}
                  className="flex items-center"
                >
                  <Input
                    type="radio"
                    id={`location-${type.value}`}
                    name="location"
                    value={type.value}
                    checked={state.location === type.value}
                    onChange={() => {
                      dispatch({
                        type: EActivityAction.SET_LOCATION,
                        payload: type.value,
                      })
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`location-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${state.location === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Activity Type</h3>
            <Typography className="text-gray-500 text-sm italic mb-2">
              Can select multiple activity type
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              {activityTypes.map((type) => (
                <div
                  key={`activity-type-${type.value}`}
                  className="flex items-center"
                >
                  <Input
                    type="checkbox"
                    id={`activity-type-${type.value}`}
                    name="activityType"
                    value={type.value}
                    checked={
                      state.activityTypes !== "any"
                        ? state.activityTypes.some((t) => t === type.value)
                        : state.activityTypes === type.value
                    }
                    onChange={() => {
                      if (type.value === activityTypes[0]?.value) {
                        dispatch({
                          type: EActivityAction.SET_ACTIVITY_TYPES,
                          payload: "any",
                        })
                      } else if (state.activityTypes === "any") {
                        dispatch({
                          type: EActivityAction.SET_ACTIVITY_TYPES,
                          payload: [type.value],
                        })
                      } else {
                        const newActivityTypes = state.activityTypes.some(
                          (t) => t === type.value
                        )
                          ? state.activityTypes.filter((t) => t !== type.value)
                          : [
                              ...state.activityTypes.filter(
                                (t) => t !== activityTypes[0]?.value
                              ),
                              type.value,
                            ]
                        dispatch({
                          type: EActivityAction.SET_ACTIVITY_TYPES,
                          payload: newActivityTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`activity-type-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${(state.activityTypes !== "any" && state.activityTypes.some((t) => t === type.value)) || state.activityTypes === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Experience Type</h3>
            <Typography className="text-gray-500 text-sm italic mb-2">
              Can select multiple experience type
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              {experienceTypes.map((type) => (
                <div
                  key={`experience-type-${type.value}`}
                  className="flex items-center"
                >
                  <Input
                    type="checkbox"
                    id={`experience-type-${type.value}`}
                    name="experienceType"
                    value={type.value}
                    checked={
                      state.experienceTypes !== "any"
                        ? state.experienceTypes.some((t) => t === type.value)
                        : state.experienceTypes === type.value
                    }
                    onChange={() => {
                      if (type.value === experienceTypes[0]?.value) {
                        dispatch({
                          type: EActivityAction.SET_EXPERIENCE_TYPES,
                          payload: [type.value],
                        })
                      } else if (state.experienceTypes === "any") {
                        dispatch({
                          type: EActivityAction.SET_EXPERIENCE_TYPES,
                          payload: [type.value],
                        })
                      } else if (typeof state.experienceTypes !== "string") {
                        const newExperienceTypes = state.experienceTypes.some(
                          (t) => t === type.value
                        )
                          ? state.experienceTypes.filter(
                              (t) => t !== type.value
                            )
                          : [
                              ...state.experienceTypes.filter(
                                (t) => t !== experienceTypes[0]?.value
                              ),
                              type.value,
                            ]
                        dispatch({
                          type: EActivityAction.SET_EXPERIENCE_TYPES,
                          payload: newExperienceTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`experience-type-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${(state.experienceTypes !== "any" && state.experienceTypes.some((t) => t === type.value)) || state.experienceTypes === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <p className="text-sm text-gray-500 mb-4">
              Nightly prices before fees and taxes
            </p>
            <Slider
              value={state.priceRange}
              min={0}
              max={1000}
              onValueChange={(newRange) => {
                dispatch({
                  type: EActivityAction.SET_PRICE_RANGE,
                  payload: newRange as [number, number],
                })
              }}
            />
            <div className="flex justify-between mt-4">
              <div>
                <Input
                  id="min-price"
                  type="number"
                  value={state.priceRange[0]}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value)
                    if (!isNaN(newValue)) {
                      dispatch({
                        type: EActivityAction.SET_PRICE_RANGE,
                        payload: [newValue, state.priceRange[1] ?? 0],
                      })
                    }
                  }}
                  className="mt-1 w-24"
                  label={"Minimum"}
                  leftIcon={<span className="text-text-400">₱</span>}
                />
              </div>
              <div>
                <Input
                  id="max-price"
                  type="number"
                  value={state.priceRange[1]}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value)
                    dispatch({
                      type: EActivityAction.SET_PRICE_RANGE,
                      payload: [state.priceRange[0] ?? 0, newValue],
                    })
                  }}
                  className="mt-1 w-24"
                  label={"Maximum"}
                  leftIcon={<span className="text-text-400">₱</span>}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Duration</h3>
            <Typography className="text-gray-500 text-sm italic mb-2">
              Can select multiple duration
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              {durationTypes.map((type) => (
                <div
                  key={`duration-${type.value}`}
                  className="flex items-center"
                >
                  <Input
                    type="checkbox"
                    id={`duration-${type.value}`}
                    name="duration"
                    value={type.value}
                    checked={
                      state.durations !== "any"
                        ? state.durations.some((t) => t === type.value)
                        : state.durations === type.value
                    }
                    onChange={() => {
                      if (type.value === durationTypes[0]?.value) {
                        dispatch({
                          type: EActivityAction.SET_DURATIONS,
                          payload: [type.value],
                        })
                      } else if (state.durations === "any") {
                        dispatch({
                          type: EActivityAction.SET_DURATIONS,
                          payload: [type.value],
                        })
                      } else if (typeof state.durations !== "string") {
                        const newDurationTypes = state.durations.some(
                          (t) => t === type.value
                        )
                          ? state.durations.filter((t) => t !== type.value)
                          : [
                              ...state.durations.filter(
                                (t) => t !== durationTypes[0]?.value
                              ),
                              type.value,
                            ]
                        dispatch({
                          type: EActivityAction.SET_DURATIONS,
                          payload: newDurationTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`duration-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${(state.durations !== "any" && state.durations.some((t) => t === type.value)) || state.durations === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Guests star reviews</h3>
            <div className="flex space-x-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newRating =
                      state.starRating === index + 1 ? 0 : index + 1
                    dispatch({
                      type: EActivityAction.SET_STAR_RATING,
                      payload: newRating,
                    })
                  }}
                  className={`flex items-center justify-center cursor-pointer`}
                >
                  <Star
                    size={28}
                    className={
                      typeof state.starRating === "number" &&
                      state.starRating > index
                        ? "text-text-500 fill-text-500"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {typeof state.starRating === "number" && state.starRating > 0
                ? `Selected ${state.starRating} star${state.starRating > 1 ? "s" : ""}`
                : "Any star review count"}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <Button
            variant="link"
            onClick={() => dispatch({ type: EActivityAction.RESET_FILTERS })}
          >
            Clear all
          </Button>
          <Button onClick={handleSubmit}>Search</Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default FilterActivityModal
