import ModalContainer from "@/common/components/ModalContainer";
import { Button } from "@/common/components/ui/Button";
import { Slider } from "@/common/components/ui/slider";
import { Input } from "@/common/components/ui/Input";
import { LucideSparkles, Star } from "lucide-react";
import Facilities from "./show-more-filters/facilities";
import Amenities from "./show-more-filters/amenities";
import CountInput from "./components/count-input";
import React, { useReducer } from "react";
import { propertyInitialState, propertyReducer, EPropertyAction, PropertyTypes } from "./reducer/property-reducer";
import { useRouter } from "next/navigation";
import FacilitiesCheckboxes from "./show-more-filters/facilities/facilities-checkboxes";
import AmenitiesCheckboxes from "./show-more-filters/amenities/amenities-checkboxes";
import useSelectFacilityStore from "../store/use-select-facility-store";
import useSelectAmenityStore from "../store/use-select-amenity-store";

interface FilterPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FilterPropertyModal: React.FC<FilterPropertyModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter()
    const [state, dispatch] = useReducer(propertyReducer, propertyInitialState);
    const facilities = useSelectFacilityStore((state) => state.facilities)
    const amenities = useSelectAmenityStore((state) => state.amenities)
    const resetAmenities = useSelectAmenityStore((state) => state.resetAmenities);
    const resetFacilities = useSelectFacilityStore((state) => state.resetFacilities); 

    const handleSubmit = () => {
        const { propertyType, priceRange, bedroomCount, bedCount, bathroomCount, starRating } = state
        const selectedFacilities = facilities
        .filter(facility => facility.isSelected)
        .map(facility => facility.facility)
        .join(',');
        const selectedAmenities = amenities
        .filter(amenity => amenity.isSelected)
        .map(amenity => amenity.amenity)
        .join(',');

          const queryString = `?propertyType=${propertyType.map(type => type.value).join(',')}`  +
          `&priceFrom=${priceRange ? priceRange[0] : ''}` +
          `&priceTo=${priceRange ? priceRange[1] : ''}` +
          `&bedroomCount=${bedroomCount ?? ''}` +
          `&bedCount=${bedCount ?? ''}` +
          `&bathroomCount=${bathroomCount ?? ''}` +
          `&facilities=${selectedFacilities ?? ''}` +
          `&amenities=${selectedAmenities ?? ''}` +
          `&starRating=${starRating ?? ''}`;

          router.push(queryString)
    };
    return (
        <ModalContainer onClose={onClose} isOpen={isOpen} size="sm" title="Filter Property">
            <div className="bg-white flex flex-col max-h-[80vh]">
                <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Property Type</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                        {PropertyTypes.map((type) => (
  <div key={type.value} className="flex items-center">
    <Input
      type="checkbox"
      id={type.value}
      name="propertyType"
      value={type.value}
      checked={state.propertyType.some(t => t.value === type.value)}
      onChange={() => {
        if (type.value === PropertyTypes[0]?.value) { 
          dispatch({ type: EPropertyAction.SET_PROPERTY_TYPE, payload: [type] });
        } else {
          const newPropertyTypes = state.propertyType.some(t => t.value === type.value)
            ? state.propertyType.filter(t => t.value !== type.value)
            : [...state.propertyType.filter(t => t.value !== PropertyTypes[0]?.value), type];
          dispatch({ type: EPropertyAction.SET_PROPERTY_TYPE, payload: newPropertyTypes });
        }
      }}
      className="hidden peer"
      label={""}
    />
    <label
      htmlFor={type.value}
      className={`cursor-pointer border rounded-md px-3 py-1 ${state.propertyType.some(t => t.value === type.value) ? 'bg-primary-500 text-white' : 'border-gray-300'} hover:bg-primary-100 hover:text-primary-700`}
    >
      {type.label}
    </label>
  </div>
))}
</div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                        <p className="text-sm text-gray-500 mb-4">Nightly prices before fees and taxes</p>
                        <Slider
                            value={state.priceRange}
                            min={0}
                            max={1000}
                            onValueChange={(newRange) => {                         
                                  dispatch({ type: EPropertyAction.SET_PRICE_RANGE, payload: newRange as [number, number] });                              
                          }}
                        />
                        <div className="flex justify-between mt-4">
                            <div>
                                <Input
                                    id="min-price"
                                    type="number"
                                    value={state.priceRange[0]}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value);
                                        if (!isNaN(newValue)) {
                                            dispatch({ type: EPropertyAction.SET_PRICE_RANGE, payload: [newValue, state.priceRange[1] ?? 0] });
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
                                        const newValue = parseInt(e.target.value);
                                        dispatch({ type: EPropertyAction.SET_PRICE_RANGE, payload: [state.priceRange[0] ?? 0, newValue] });
                                    }}
                                    className="mt-1 w-24"
                                    label={"Maximum"}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Facilities</h3>
                        <FacilitiesCheckboxes gridView={true} title="Most Popular" icon={<LucideSparkles className="h-4 w-4" />} />
                        <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => dispatch({ type: EPropertyAction.TOGGLE_FACILITIES_MODAL, payload: true })}>Show more facilities</Button>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Room Amenities</h3>
                        <AmenitiesCheckboxes gridView={true} title="Most Popular" icon={<LucideSparkles className="h-4 w-4" />} />
                        <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => dispatch({ type: EPropertyAction.TOGGLE_AMENITIES_MODAL, payload: true })}>Show more room amenities</Button>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Rooms and beds</h3>
                        <div className="space-y-4">
                            <CountInput label="Bedrooms" count={state.bedroomCount} setCount={(count) => dispatch({ type: EPropertyAction.SET_BEDROOM_COUNT, payload: count })} />
                            <CountInput label="Beds" count={state.bedCount} setCount={(count) => dispatch({ type: EPropertyAction.SET_BED_COUNT, payload: count })} />
                            <CountInput label="Bathrooms" count={state.bathroomCount} setCount={(count) => dispatch({ type: EPropertyAction.SET_BATHROOM_COUNT, payload: count })} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Star Rating</h3>
                        <div className="flex space-x-2 mb-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <button key={index} onClick={() => dispatch({ type: EPropertyAction.SET_STAR_RATING, payload: index + 1 })} className={`flex items-center justify-center cursor-pointer`}>
                                    <Star size={28} className={state.starRating > index ? 'text-yellow-500' : 'text-gray-300'} />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500">
                            {state.starRating > 0 ? `Selected Rating: ${state.starRating} star${state.starRating > 1 ? 's' : ''}` : 'Select a rating'}
                        </p>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
    <Button variant="link" onClick={() => {dispatch({ type: EPropertyAction.RESET_FILTERS }), resetAmenities(), resetFacilities()}}>
        Clear all
    </Button>
     <Button onClick={handleSubmit}>Search</Button>
</div>
            </div>

            <ModalContainer onClose={() => dispatch({ type: EPropertyAction.TOGGLE_FACILITIES_MODAL, payload: false })} isOpen={state.facilitiesModal} size="md" title="Facilities">
                <div className="p-8 max-h-[80vh] w-full overflow-y-auto">
                    <Facilities />
                </div>
            </ModalContainer>
            <ModalContainer onClose={() => dispatch({ type: EPropertyAction.TOGGLE_AMENITIES_MODAL, payload: false })} isOpen={state.amenitiesModal} size="md" title="Amenities">
                <div className="p-8 max-h-[80vh] w-full overflow-y-auto">
                    <Amenities />
                </div>
            </ModalContainer>
        </ModalContainer>
    );
};

export default FilterPropertyModal;
