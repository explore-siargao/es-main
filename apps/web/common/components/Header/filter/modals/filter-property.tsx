import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Slider } from "@/common/components/ui/slider"
import { Input } from "@/common/components/ui/Input"
import { LucideSparkles, Star } from "lucide-react"
import Facilities from "./show-more-filters/facilities"
import Amenities from "./show-more-filters/amenities"
import CountInput from "./components/count-input"
import React, { useEffect, useReducer } from "react"
import {
  propertyReducer,
  EPropertyAction,
  T_Filter_Property,
} from "./reducer/property-reducer"
import { useRouter, useSearchParams } from "next/navigation"
import FacilitiesCheckboxes from "./show-more-filters/facilities/facilities-checkboxes"
import AmenitiesCheckboxes from "./show-more-filters/amenities/amenities-checkboxes"
import useSelectFacilityStore from "../store/use-select-facility-store"
import useSelectAmenityStore from "../store/use-select-amenity-store"
import { Typography } from "@/common/components/ui/Typography"
import { locations, propertyTypes } from "../constants"
import { NEW_FACILITIES } from "@/module/Admin/Listings/ForReview/Property/Facilities/constants"
import { AMENITIES } from "@/module/Hosting/Listings/Properties/Property/Units/constants"
import {
  E_Listing_Category,
  T_Property_Amenity,
  T_Property_Facility,
} from "@repo/contract"
import useGetListingCategoryHighestPrice from "./hooks/useGetListingCategoryHighestPrice"
import CurrencyIcon from "@/common/components/currency/currency-icon"

type T_Props = {
  isOpen: boolean
  onClose: () => void
}

const FilterPropertyModal: React.FC<T_Props> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const numberOfGuest = searchParams.get("numberOfGuest")
  const priceFrom = searchParams.get("priceFrom")
  const priceTo = searchParams.get("priceTo")
  const starRating = searchParams.get("starRating")
  const bedroomCount = searchParams.get("bedroomCount")
  const bedCount = searchParams.get("bedCount")
  const bathroomCount = searchParams.get("bathroomCount")
  const facilitiesSearch = searchParams.get("facilities")?.split(",")
  const amenitiesSearch = searchParams.get("amenities")?.split(",")
  const propertyTypesSearch = searchParams.get("propertyType")?.split(",")

  const defaultPropertyTypes = (
    propertyTypesSearch &&
    propertyTypesSearch.length > 0 &&
    propertyTypesSearch[0] !== "any"
      ? propertyTypesSearch?.map(
          (type) => propertyTypes.find(({ value }) => value === type)?.value
        )
      : propertyTypes[0]?.value
  ) as string[] | "any"
  const defaultFacilities =
    facilitiesSearch &&
    facilitiesSearch.length > 0 &&
    facilitiesSearch[0] !== "any"
      ? facilitiesSearch?.map((item) => ({
          ...NEW_FACILITIES.find(({ facility }) => facility === item),
          isSelected: true,
        }))
      : ([] as T_Property_Facility[])
  const defaultAmenities =
    amenitiesSearch &&
    amenitiesSearch.length > 0 &&
    amenitiesSearch[0] !== "any"
      ? amenitiesSearch?.map((item) => ({
          ...AMENITIES.find(({ amenity }) => amenity === item),
          isSelected: true,
        }))
      : ([] as T_Property_Amenity[])
  const defaultSelectedPriceRange = [
    priceFrom && priceFrom !== "any" ? Number(priceFrom) : "any",
    priceTo && priceTo !== "any" ? Number(priceTo) : "any",
  ] as ("any" | number)[]

  const propertyInitialState: T_Filter_Property = {
    location: location ? location : (locations[0]?.value ?? "any"),
    starRating: starRating !== "any" ? Number(starRating) : "any",
    priceRange: [0, 10000],
    selectedPriceRange: defaultSelectedPriceRange,
    propertyTypes: defaultPropertyTypes,
    bedroomCount: bedroomCount !== "any" ? Number(bedroomCount) : "any",
    bedCount: bedCount !== "any" ? Number(bedCount) : "any",
    bathroomCount: bathroomCount !== "any" ? Number(bathroomCount) : "any",
    facilitiesModal: false,
    amenitiesModal: false,
  }

  const [state, dispatch] = useReducer(propertyReducer, propertyInitialState)
  const { data, isLoading } = useGetListingCategoryHighestPrice(
    E_Listing_Category.Property
  )

  useEffect(() => {
    if (!isLoading && !data?.error && data?.item) {
      dispatch({
        type: EPropertyAction.SET_PRICE_RANGE,
        payload: [0, data?.item.amount],
      })
    }
  }, [data])

  const { facilities, setDefaultFacilities } = useSelectFacilityStore(
    (state) => state
  )
  const { amenities, setDefaultAmenities } = useSelectAmenityStore(
    (state) => state
  )
  const resetAmenities = useSelectAmenityStore((state) => state.resetAmenities)
  const resetFacilities = useSelectFacilityStore(
    (state) => state.resetFacilities
  )

  useEffect(() => {
    setDefaultFacilities(defaultFacilities as T_Property_Facility[])
    setDefaultAmenities(defaultAmenities as T_Property_Amenity[])
  }, [])

  const handleSubmit = () => {
    const {
      location,
      propertyTypes,
      selectedPriceRange,
      bedroomCount,
      bedCount,
      bathroomCount,
      starRating,
    } = state
    const selectedFacilities = facilities
      .filter((facility) => facility.isSelected)
      .map((facility) => facility.facility)
      .join(",")
    const selectedAmenities = amenities
      .filter((amenity) => amenity.isSelected)
      .map((amenity) => amenity.amenity)
      .join(",")

    const queryString = [
      `?location=${location ? location : "any"}`,
      `propertyTypes=${propertyTypes && propertyTypes.length ? propertyTypes.toString() : "any"}`,
      `priceFrom=${selectedPriceRange && selectedPriceRange[0] !== "any" ? selectedPriceRange[0] : "any"}`,
      `priceTo=${selectedPriceRange && selectedPriceRange[1] !== "any" ? selectedPriceRange[1] : "any"}`,
      `bedroomCount=${bedroomCount && bedroomCount !== "any" ? bedroomCount : "any"}`,
      `bedCount=${bedCount && bedCount !== "any" ? bedCount : "any"}`,
      `bathroomCount=${bathroomCount && bathroomCount !== "any" ? bathroomCount : "any"}`,
      `facilities=${selectedFacilities && selectedFacilities !== "any" ? selectedFacilities : "any"}`,
      `amenities=${selectedAmenities && selectedAmenities !== "any" ? selectedAmenities : "any"}`,
      `starRating=${starRating && starRating !== "any" ? starRating : "any"}`,
    ]

    // the checkIn, checkOut and numberOfGuest comes from the header search bar
    router.push(
      `${queryString.join("&")}&checkIn=${checkIn ?? "any"}&checkOut=${checkOut ?? "any"}&numberOfGuest=${numberOfGuest ?? "any"}`
    )
    onClose()
  }
  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title="Filter Property"
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
                        type: EPropertyAction.SET_LOCATION,
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
            <h3 className="text-lg font-semibold">Property Type</h3>
            <Typography className="text-gray-500 text-sm italic mb-2">
              Can select multiple property type
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              {propertyTypes.map((type) => (
                <div
                  key={`property-type-${type.value}`}
                  className="flex items-center"
                >
                  <Input
                    type="checkbox"
                    id={`property-type-${type.value}`}
                    name="propertyType"
                    value={type.value}
                    checked={
                      state.propertyTypes !== "any"
                        ? state.propertyTypes.some((t) => t === type.value)
                        : state.propertyTypes === type.value
                    }
                    onChange={() => {
                      if (type.value === propertyTypes[0]?.value) {
                        dispatch({
                          type: EPropertyAction.SET_PROPERTY_TYPES,
                          payload: "any",
                        })
                      } else if (state.propertyTypes === "any") {
                        dispatch({
                          type: EPropertyAction.SET_PROPERTY_TYPES,
                          payload: [type.value],
                        })
                      } else {
                        const newPropertyTypes = state.propertyTypes.some(
                          (t) => t === type.value
                        )
                          ? state.propertyTypes.filter((t) => t !== type.value)
                          : [
                              ...state.propertyTypes.filter(
                                (t) => t !== propertyTypes[0]?.value
                              ),
                              type.value,
                            ]
                        dispatch({
                          type: EPropertyAction.SET_PROPERTY_TYPES,
                          payload: newPropertyTypes,
                        })
                      }
                    }}
                    className="hidden peer"
                    label={""}
                  />
                  <label
                    htmlFor={`property-type-${type.value}`}
                    className={`cursor-pointer border rounded-md px-3 py-1 ${(state.propertyTypes !== "any" && state.propertyTypes.some((t) => t === type.value)) || state.propertyTypes === type.value ? "bg-primary-500 text-white" : "border-gray-300"} hover:bg-primary-100 hover:text-primary-700`}
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
              value={[
                typeof state.selectedPriceRange[0] === "number"
                  ? state.selectedPriceRange[0]
                  : (state.priceRange[0] as number),
                typeof state.selectedPriceRange[1] === "number"
                  ? state.selectedPriceRange[1]
                  : (state.priceRange[1] as number),
              ]}
              min={state.priceRange[0]}
              max={state.priceRange[1]}
              onValueChange={(newRange) => {
                dispatch({
                  type: EPropertyAction.SET_SELECTED_PRICE_RANGE,
                  payload: newRange as [number, number],
                })
              }}
            />
            <div className="flex justify-between mt-4">
              <div>
                <Input
                  id="min-price"
                  type="number"
                  value={
                    state.selectedPriceRange[0] &&
                    typeof state.selectedPriceRange[0] === "number"
                      ? state.selectedPriceRange[0]
                      : (state.priceRange[0] as number)
                  }
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value)
                    if (!isNaN(newValue)) {
                      dispatch({
                        type: EPropertyAction.SET_SELECTED_PRICE_RANGE,
                        payload: [
                          newValue,
                          typeof state.selectedPriceRange[1] === "number"
                            ? state.selectedPriceRange[1]
                            : (state.priceRange[1] as number),
                        ],
                      })
                    }
                  }}
                  className="mt-1 w-24"
                  label={"Minimum"}
                  leftIcon={<CurrencyIcon />}
                />
              </div>
              <div>
                <Input
                  id="max-price"
                  type="number"
                  value={
                    state.selectedPriceRange[1] &&
                    typeof state.selectedPriceRange[1] === "number"
                      ? state.selectedPriceRange[1]
                      : (state.priceRange[1] as number)
                  }
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value)
                    dispatch({
                      type: EPropertyAction.SET_SELECTED_PRICE_RANGE,
                      payload: [
                        typeof state.selectedPriceRange[0] === "number"
                          ? state.selectedPriceRange[0]
                          : (state.priceRange[0] as number),
                        newValue,
                      ],
                    })
                  }}
                  className="mt-1 w-24"
                  label={"Maximum"}
                  leftIcon={<CurrencyIcon />}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Facilities</h3>
            <FacilitiesCheckboxes
              gridView={true}
              title="Most Popular"
              icon={<LucideSparkles className="h-4 w-4" />}
            />
            <Button
              variant="link"
              className="mt-2 p-0 h-auto"
              onClick={() =>
                dispatch({
                  type: EPropertyAction.TOGGLE_FACILITIES_MODAL,
                  payload: true,
                })
              }
            >
              Show more facilities
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Room Amenities</h3>
            <AmenitiesCheckboxes
              gridView={true}
              title="Most Popular"
              icon={<LucideSparkles className="h-4 w-4" />}
            />
            <Button
              variant="link"
              className="mt-2 p-0 h-auto"
              onClick={() =>
                dispatch({
                  type: EPropertyAction.TOGGLE_AMENITIES_MODAL,
                  payload: true,
                })
              }
            >
              Show more room amenities
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Rooms and beds</h3>
            <div className="space-y-4">
              <CountInput
                label="Bedrooms"
                count={
                  typeof state.bedroomCount === "number"
                    ? state.bedroomCount
                    : 0
                }
                setCount={(count) =>
                  dispatch({
                    type: EPropertyAction.SET_BEDROOM_COUNT,
                    payload: count ?? 0,
                  })
                }
              />
              <CountInput
                label="Beds"
                count={typeof state.bedCount === "number" ? state.bedCount : 0}
                setCount={(count) =>
                  dispatch({
                    type: EPropertyAction.SET_BED_COUNT,
                    payload: count ?? 0,
                  })
                }
              />
              <CountInput
                label="Bathrooms"
                count={
                  typeof state.bathroomCount === "number"
                    ? state.bathroomCount
                    : 0
                }
                setCount={(count) =>
                  dispatch({
                    type: EPropertyAction.SET_BATHROOM_COUNT,
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
                    const newRating =
                      state.starRating === index + 1 ? 0 : index + 1
                    dispatch({
                      type: EPropertyAction.SET_STAR_RATING,
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
            onClick={() => {
              dispatch({ type: EPropertyAction.RESET_FILTERS }),
                resetAmenities(),
                resetFacilities()
            }}
          >
            Clear all
          </Button>
          <Button onClick={handleSubmit}>Search</Button>
        </div>
      </div>

      <ModalContainer
        onClose={() =>
          dispatch({
            type: EPropertyAction.TOGGLE_FACILITIES_MODAL,
            payload: false,
          })
        }
        isOpen={state.facilitiesModal}
        size="md"
        title="Property facilities filter"
      >
        <div className="p-8 max-h-[80vh] w-full overflow-y-auto">
          <Facilities />
        </div>
      </ModalContainer>
      <ModalContainer
        onClose={() =>
          dispatch({
            type: EPropertyAction.TOGGLE_AMENITIES_MODAL,
            payload: false,
          })
        }
        isOpen={state.amenitiesModal}
        size="md"
        title="Property amenities filter"
      >
        <div className="p-8 max-h-[80vh] w-full overflow-y-auto">
          <Amenities />
        </div>
      </ModalContainer>
    </ModalContainer>
  )
}

export default FilterPropertyModal
