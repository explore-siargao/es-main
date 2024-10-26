import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Slider } from "@/common/components/ui/slider"
import { Input } from "@/common/components/ui/Input"
import { Star } from "lucide-react"
import CountInput from "./components/count-input"
import React, { useReducer } from "react"
import { useRouter } from "next/navigation"
import {
  ERentalAction,
  rentalInitialState,
  rentalReducer,
  TransmissionTypes,
  VehicleTypes,
} from "./reducer/rental-reducer"
import { Typography } from "@/common/components/ui/Typography"

interface FilterRentalModalProps {
  isOpen: boolean
  onClose: () => void
}

const FilterRentalModal: React.FC<FilterRentalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(rentalReducer, rentalInitialState)

  const handleSubmit = () => {
    const { vehicleType, transmissionType, priceRange, seatCount, starRating } =
      state
    const queryString =
      `?vehicleType=${vehicleType}` +
      `&transmissionType=${transmissionType}` +
      `&priceFrom=${priceRange ? priceRange[0] : ""}` +
      `&priceTo=${priceRange ? priceRange[1] : ""}` +
      `&seatCount=${seatCount ?? ""}` +
      `&starRating=${starRating ?? ""}`
    router.push(queryString)
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title="Filter Rental"
    >
      <div className="bg-white flex flex-col max-h-[80vh]">
        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">Vehicle Type</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {VehicleTypes.map((type) => (
                <div key={type.value} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={type.value}
                    name="propertyType"
                    value={type.value}
                    checked={state.vehicleType.some(
                      (t) => t.value === type.value
                    )}
                    onChange={() => {
                      if (type.value === VehicleTypes[0]?.value) {
                        dispatch({
                          type: ERentalAction.SET_VEHICLE_TYPE,
                          payload: [type],
                        })
                      } else {
                        const newVehicleTypes = state.vehicleType.some(
                          (t) => t.value === type.value
                        )
                          ? state.vehicleType.filter(
                              (t) => t.value !== type.value
                            )
                          : [
                              ...state.vehicleType.filter(
                                (t) => t.value !== VehicleTypes[0]?.value
                              ),
                              type,
                            ]
                        dispatch({
                          type: ERentalAction.SET_VEHICLE_TYPE,
                          payload: newVehicleTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={type.value}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${state.vehicleType.some((t) => t.value === type.value) ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Transmission Type</h3>
            <div className="flex flex-wrap gap-2 mb-4"></div>
            <div className="flex flex-wrap gap-2 mb-4">
              {state.vehicleType.length === 1 &&
              state.vehicleType[0]?.value === "bicycle" ? (
                <Typography className="my-1 text-gray-500">
                  Not available
                </Typography>
              ) : (
                TransmissionTypes.map((type) => {
                  const isBicycleOnly =
                    state.transmissionType.length === 1 &&
                    state.transmissionType[0]?.value === "bicycle"

                  return (
                    <div key={type.value} className="flex items-center">
                      <Input
                        type="checkbox"
                        id={type.value}
                        name="propertyType"
                        value={type.value}
                        checked={state.transmissionType.some(
                          (t) => t.value === type.value
                        )}
                        onChange={() => {
                          if (type.value === TransmissionTypes[0]?.value) {
                            dispatch({
                              type: ERentalAction.SET_TRANSMISSION_TYPE,
                              payload: [type],
                            })
                          } else {
                            const newTransmissionTypes =
                              state.transmissionType.some(
                                (t) => t.value === type.value
                              )
                                ? state.transmissionType.filter(
                                    (t) => t.value !== type.value
                                  )
                                : [
                                    ...state.transmissionType.filter(
                                      (t) =>
                                        t.value !== TransmissionTypes[0]?.value
                                    ),
                                    type,
                                  ]

                            dispatch({
                              type: ERentalAction.SET_TRANSMISSION_TYPE,
                              payload: newTransmissionTypes,
                            })
                          }
                        }}
                        className="hidden peer"
                        label={""}
                      />
                      <label
                        htmlFor={type.value}
                        className={`cursor-pointer border rounded-md px-3 py-1 ${state.transmissionType.some((t) => t.value === type.value) ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                      >
                        {type.label}
                      </label>
                    </div>
                  )
                })
              )}
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
                  type: ERentalAction.SET_PRICE_RANGE,
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
                        type: ERentalAction.SET_PRICE_RANGE,
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
                      type: ERentalAction.SET_PRICE_RANGE,
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
            <h3 className="text-lg font-semibold mb-2">Seats</h3>
            <div className="space-y-4">
              <CountInput
                label="Number of seats"
                count={state.seatCount}
                setCount={(count) =>
                  dispatch({
                    type: ERentalAction.SET_SEAT_COUNT,
                    payload: count,
                  })
                }
              />
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
                      type: ERentalAction.SET_STAR_RATING,
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
            onClick={() => dispatch({ type: ERentalAction.RESET_FILTERS })}
          >
            Clear all
          </Button>
          <Button onClick={handleSubmit}>Search</Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default FilterRentalModal
