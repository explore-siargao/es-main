import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Slider } from "@/common/components/ui/slider"
import { Input } from "@/common/components/ui/Input"
import { Star } from "lucide-react"
import React, { useReducer } from "react"
import { useRouter } from "next/navigation"
import {
  EActivityAction,
  activityInitialState,
  activityReducer,
  ActivityTypes,
  DurationTypes,
  ExperienceTypes,
} from "./reducer/activity-reducer"

interface FilterActivityModalProps {
  isOpen: boolean
  onClose: () => void
}

const FilterActivityModal: React.FC<FilterActivityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(activityReducer, activityInitialState)

  const handleSubmit = () => {
    const { activityType, experienceType, priceRange, duration, starRating } =
      state
    const queryString =
      `?activityType=${activityType.map((type) => type.value).join(",")}` +
      `&experienceType=${experienceType.map((type) => type.value).join(",")}` +
      `&priceFrom=${priceRange ? priceRange[0] : ""}` +
      `&priceTo=${priceRange ? priceRange[1] : ""}` +
      `&duration=${duration.map((type) => type.value).join(",")}` +
      `&starRating=${starRating ?? ""}`

    router.push(queryString)
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
            <h3 className="text-lg font-semibold mb-2">Activity Type</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {ActivityTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={type.value}
                    name="activityType"
                    value={type.value}
                    checked={state.activityType.some(
                      (t) => t.value === type.value
                    )}
                    onChange={() => {
                      if (type.value === ActivityTypes[0]?.value) {
                        dispatch({
                          type: EActivityAction.SET_ACTIVITY_TYPE,
                          payload: [type],
                        })
                      } else {
                        const newActivityTypes = state.activityType.some(
                          (t) => t.value === type.value
                        )
                          ? state.activityType.filter(
                              (t) => t.value !== type.value
                            )
                          : [
                              ...state.activityType.filter(
                                (t) => t.value !== ActivityTypes[0]?.value
                              ),
                              type,
                            ]
                        dispatch({
                          type: EActivityAction.SET_ACTIVITY_TYPE,
                          payload: newActivityTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={type.value}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${state.activityType.some((t) => t.value === type.value) ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience Type</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {ExperienceTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={type.value}
                    name="experienceType"
                    value={type.value}
                    checked={state.experienceType.some(
                      (t) => t.value === type.value
                    )}
                    onChange={() => {
                      if (type.value === ExperienceTypes[0]?.value) {
                        dispatch({
                          type: EActivityAction.SET_EXPERIENCE_TYPE,
                          payload: [type],
                        })
                      } else {
                        const newExperienceTypes = state.experienceType.some(
                          (t) => t.value === type.value
                        )
                          ? state.experienceType.filter(
                              (t) => t.value !== type.value
                            )
                          : [
                              ...state.experienceType.filter(
                                (t) => t.value !== ExperienceTypes[0]?.value
                              ),
                              type,
                            ]
                        dispatch({
                          type: EActivityAction.SET_EXPERIENCE_TYPE,
                          payload: newExperienceTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={type.value}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${state.experienceType.some((t) => t.value === type.value) ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
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
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Duration</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {DurationTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={type.value}
                    name="duration"
                    value={type.value}
                    checked={state.duration.some((t) => t.value === type.value)}
                    onChange={() => {
                      if (type.value === DurationTypes[0]?.value) {
                        dispatch({
                          type: EActivityAction.SET_DURATION,
                          payload: [type],
                        })
                      } else {
                        const newDurationTypes = state.duration.some(
                          (t) => t.value === type.value
                        )
                          ? state.duration.filter((t) => t.value !== type.value)
                          : [
                              ...state.duration.filter(
                                (t) => t.value !== DurationTypes[0]?.value
                              ),
                              type,
                            ]
                        dispatch({
                          type: EActivityAction.SET_DURATION,
                          payload: newDurationTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={type.value}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${state.duration.some((t) => t.value === type.value) ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Star Rating</h3>
            <div className="flex space-x-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    dispatch({
                      type: EActivityAction.SET_STAR_RATING,
                      payload: index + 1,
                    })
                  }
                  className={`flex items-center justify-center cursor-pointer`}
                >
                  <Star
                    size={28}
                    className={
                      state.starRating > index
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {state.starRating > 0
                ? `Selected Rating: ${state.starRating} star${state.starRating > 1 ? "s" : ""}`
                : "Select a rating"}
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