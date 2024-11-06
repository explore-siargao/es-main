import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Slider } from "@/common/components/ui/slider"
import { Input } from "@/common/components/ui/Input"
import { Star } from "lucide-react"
import CountInput from "./components/count-input"
import React, { useEffect, useReducer } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ERentalAction,
  rentalReducer,
  T_Filter_Rental,
} from "./reducer/rental-reducer"
import { Typography } from "@/common/components/ui/Typography"
import { locations, vehicleTypes, transmissionTypes } from "../constants"
import useGetListingCategoryHighestPrice from "./hooks/useGetListingCategoryHighestPrice"
import { E_Listing_Category } from "@repo/contract"

interface FilterRentalModalProps {
  isOpen: boolean
  onClose: () => void
}

const FilterRentalModal: React.FC<FilterRentalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pickUpDate = searchParams.get('pickUpDate')
  const dropOffDate = searchParams.get('dropOffDate')
  const location = searchParams.get('location')
  const priceFrom = searchParams.get('priceFrom')
  const priceTo = searchParams.get('priceTo')
  const starRating = searchParams.get('starRating')
  const seatCount = searchParams.get('seatCount')
  const vehicleTypesSearch = searchParams.get('vehicleTypes')?.split(',')
  const transmissionTypesSearch = searchParams.get('transmissionTypes')?.split(',')

  const defaultVehicleTypes = (vehicleTypesSearch && vehicleTypesSearch.length > 0 && vehicleTypesSearch[0] !== "any" ? vehicleTypesSearch
    ?.map(type => vehicleTypes.find(({ value }) => value === type)?.value) : vehicleTypes[0]?.value) as string[] | "any";
  const defaultTransmissionTypes = (transmissionTypesSearch && transmissionTypesSearch.length > 0 && transmissionTypesSearch[0] !== "any" ? transmissionTypesSearch
    ?.map(type => transmissionTypes.find(({ value }) => value === type)?.value) : transmissionTypes[0]?.value) as string[] | "any";
  const defaultSelectedPriceRange = [priceFrom && priceFrom !== "any" ? Number(priceFrom) : "any", priceTo && priceTo !== "any" ? Number(priceTo) : "any"] as ("any" | number)[]

  const rentalInitialState: T_Filter_Rental = {
    location: location ? location : (locations[0]?.value ?? "any"),
    starRating: starRating !== 'any' ? Number(starRating) : "any",
    priceRange: [0, 10000],
    selectedPriceRange: defaultSelectedPriceRange,
    vehicleTypes: defaultVehicleTypes,
    transmissionTypes: defaultTransmissionTypes,
    seatCount: seatCount !== 'any' ? Number(seatCount) : "any",
  }

  const [state, dispatch] = useReducer(rentalReducer, rentalInitialState)
  const { data, isLoading } = useGetListingCategoryHighestPrice(E_Listing_Category.Rental);

  useEffect(() => {
    if(!isLoading && !data?.error && data?.item) {
      dispatch({
        type: ERentalAction.SET_PRICE_RANGE,
        payload: [0, data?.item.amount],
      });
    }
  }, [data])

  const handleSubmit = () => {
    const { location, vehicleTypes, selectedPriceRange, transmissionTypes, seatCount, starRating } =
      state

    const queryString = [
      `?location=${location ? location : "any"}`,
      `vehicleTypes=${vehicleTypes && vehicleTypes.length ? vehicleTypes.toString() : "any"}`,
      `transmissionTypes=${transmissionTypes && transmissionTypes.length ? transmissionTypes.toString() : "any"}`,
      `priceFrom=${selectedPriceRange && selectedPriceRange[0] !== "any" ? selectedPriceRange[0] : "any"}`,
      `priceTo=${selectedPriceRange && selectedPriceRange[1] !== "any" ? selectedPriceRange[1] : "any"}`,
      `seatCount=${seatCount && seatCount !== "any" ? seatCount : "any"}`,
      `starRating=${starRating && starRating !== "any" ? starRating : "any"}`
    ];
      
    // the pickUpDate and dropOffDate comes from the header search bar
    router.push(`${queryString.join("&")}&pickUpDate=${pickUpDate ?? "any"}&dropOffDate=${dropOffDate ?? "any"}`)
    onClose()
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
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {locations.map((type) => (
                <div key={`location-${type.value}`} className="flex items-center">
                  <Input
                    type="radio"
                    id={`location-${type.value}`}
                    name="location"
                    value={type.value}
                    checked={state.location === type.value}
                    onChange={() => {
                      dispatch({
                        type: ERentalAction.SET_LOCATION,
                        payload: type.value,
                      });
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
            <h3 className="text-lg font-semibold">Vehicle Type</h3>
            <Typography className="text-gray-500 text-sm italic mb-2">
              Can select multiple vehicle type
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              {vehicleTypes.map((type) => (
                <div key={`vehicle-type-${type.value}`} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={`vehicle-type-${type.value}`}
                    name="vehicleType"
                    value={type.value}
                    checked={state.vehicleTypes !== "any" ? state.vehicleTypes.some(
                      (t) => t === type.value
                    ) : state.vehicleTypes === type.value}
                    onChange={() => {
                      if (type.value === vehicleTypes[0]?.value) {
                        dispatch({
                          type: ERentalAction.SET_VEHICLE_TYPES,
                          payload: "any",
                        })
                      } else if (state.vehicleTypes === "any") {
                        dispatch({
                          type: ERentalAction.SET_VEHICLE_TYPES,
                          payload: [type.value],
                        })
                      } else {
                        const newTypes = state.vehicleTypes.some(
                          (t) => t === type.value
                        )
                          ? state.vehicleTypes.filter(
                            (t) => t !== type.value
                          )
                          : [
                            ...state.vehicleTypes.filter(
                              (t) => t !== vehicleTypes[0]?.value
                            ),
                            type.value,
                          ]
                        dispatch({
                          type: ERentalAction.SET_VEHICLE_TYPES,
                          payload: newTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`vehicle-type-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${(state.vehicleTypes !== "any" && state.vehicleTypes.some((t) => t === type.value)) || state.vehicleTypes === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Transmission Type</h3>
            <Typography className="text-gray-500 text-sm italic mb-2">
              Can select multiple transmission type
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              {transmissionTypes.map((type) => (
                <div key={`transmission-type-${type.value}`} className="flex items-center">
                  <Input
                    type="checkbox"
                    id={`transmission-type-${type.value}`}
                    name="transmissionType"
                    value={type.value}
                    checked={state.transmissionTypes !== "any" ? state.transmissionTypes.some(
                      (t) => t === type.value
                    ) : state.transmissionTypes === type.value}
                    onChange={() => {
                      if (type.value === transmissionTypes[0]?.value) {
                        dispatch({
                          type: ERentalAction.SET_TRANSMISSION_TYPES,
                          payload: "any",
                        })
                      } else if (state.transmissionTypes === "any") {
                        dispatch({
                          type: ERentalAction.SET_TRANSMISSION_TYPES,
                          payload: [type.value],
                        })
                      } else {
                        const newTypes = state.transmissionTypes.some(
                          (t) => t === type.value
                        )
                          ? state.transmissionTypes.filter(
                            (t) => t !== type.value
                          )
                          : [
                            ...state.transmissionTypes.filter(
                              (t) => t !== transmissionTypes[0]?.value
                            ),
                            type.value,
                          ]
                        dispatch({
                          type: ERentalAction.SET_TRANSMISSION_TYPES,
                          payload: newTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`transmission-type-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${(state.transmissionTypes !== "any" && state.transmissionTypes.some((t) => t === type.value)) || state.transmissionTypes === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
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
              value={[typeof state.selectedPriceRange[0] === 'number' ? state.selectedPriceRange[0] : (state.priceRange[0] as number), typeof state.selectedPriceRange[1] === 'number' ? state.selectedPriceRange[1] : (state.priceRange[1] as number)]}
              min={state.priceRange[0]}
              max={state.priceRange[1]}
              onValueChange={(newRange) => {
                dispatch({
                  type: ERentalAction.SET_SELECTED_PRICE_RANGE,
                  payload: newRange as [number, number],
                })
              }}
            />
            <div className="flex justify-between mt-4">
              <div>
                <Input
                  id="min-price"
                  type="number"
                  value={state.selectedPriceRange[0] && typeof state.selectedPriceRange[0] === 'number' ? state.selectedPriceRange[0] : (state.priceRange[0] as number)}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value)
                    if (!isNaN(newValue)) {
                      dispatch({
                        type: ERentalAction.SET_SELECTED_PRICE_RANGE,
                        payload: [newValue, typeof state.selectedPriceRange[1] === 'number' ? state.selectedPriceRange[1] : (state.priceRange[1] as number)],
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
                  value={state.selectedPriceRange[1] && typeof state.selectedPriceRange[1] === 'number' ? state.selectedPriceRange[1] : (state.priceRange[1] as number)}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value)
                    dispatch({
                      type: ERentalAction.SET_SELECTED_PRICE_RANGE,
                      payload: [typeof state.selectedPriceRange[0] === 'number' ? state.selectedPriceRange[0] : (state.priceRange[0] as number), newValue],
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
            <h3 className="text-lg font-semibold mb-2">Seats</h3>
            <div className="space-y-4">
              <CountInput
                label="Number of seats"
                count={typeof state.seatCount === 'number' ? state.seatCount : 0}
                setCount={(count) =>
                  dispatch({
                    type: ERentalAction.SET_SEAT_COUNT,
                    payload: count ?? 0,
                  })
                }
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Guests star reviews</h3>
            <div className="flex space-x-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newRating = state.starRating === index + 1 ? 0 : index + 1;
                    dispatch({
                      type: ERentalAction.SET_STAR_RATING,
                      payload: newRating,
                    });
                  }}
                  className={`flex items-center justify-center cursor-pointer`}
                >
                  <Star
                    size={28}
                    className={
                      typeof state.starRating === 'number' && state.starRating > index
                        ? "text-text-500 fill-text-500"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {typeof state.starRating === 'number' && state.starRating > 0
                ? `Selected ${state.starRating} star${state.starRating > 1 ? "s" : ""}`
                : "Any star review count"}
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
