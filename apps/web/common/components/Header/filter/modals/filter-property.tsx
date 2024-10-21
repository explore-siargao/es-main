import ModalContainer from "@/common/components/ModalContainer"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { Button } from "@/common/components/ui/Button";
import Checkbox from "@/common/components/ui/InputCheckbox";
import { Slider } from "@/common/components/ui/slider";
import { Input } from "@/common/components/ui/Input";
import { LucideSparkles, Star } from "lucide-react";
import { PROPERTY_FACILITIES } from "@/module/Hosting/Listings/constants/amenities";
import Facilities from "./show-more-filters/facilities";
import FacilitiesCheckboxes from "./show-more-filters/facilities/FacilitiesCheckboxes";

interface FilterPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
const FilterPropertyModal: React.FC<FilterPropertyModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const form = useForm()
  const [starRating, setStarRating] = useState<number>(0); 
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedAccommodationTypes, setSelectedAccommodationTypes] = useState<string[]>([])
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const propertyTypesList = ['Any Type','Hostel', 'Apartment', 'Homestay', 'Hotel', 'Resort', 'Whole Place'];
  const amenitiesList = ['Outdoor bath', 'Hot tub', 'Indoor fireplace', 'Bath', 'Outdoor fireplace', 'WiFi']
  const [facilitiesModal, setFacilitiesModal] = useState(false);
  const toggleCheckboxAmenity = (amenity: string) => {
    setSelectedAmenities((prevAmenities) => {
      if (prevAmenities.includes(amenity)) {
        return prevAmenities.filter((item) => item !== amenity)
      } else {
        return [...prevAmenities, amenity]
      }
    })
  }

  const toggleCheckboxAccommodationType = (accommodationType: string) => {
    setSelectedAccommodationTypes((prevTypes) => {
      if (prevTypes.includes(accommodationType)) {
        return prevTypes.filter((item) => item !== accommodationType)
      } else {
        return [...prevTypes, accommodationType]
      }
    })
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
  <h3 className="text-lg font-semibold mb-2">Property Type</h3>
  <div className="flex flex-wrap gap-2 mb-4">
    {propertyTypesList.map((type) => (
      <div key={type} className="flex items-center">
        <Input
                type="radio"
                id={type}
                name="propertyType"
                value={type}
                checked={selectedPropertyType === type}
                onChange={() => setSelectedPropertyType(type)}
                className="hidden peer" label={""}        />
        <label
          htmlFor={type}
          className={`cursor-pointer border rounded-md px-3 py-1 
            ${selectedPropertyType === type ? 'bg-primary-500 text-white' : 'border-gray-300'}
            hover:bg-primary-100 hover:text-primary-700`}
        >
          {type}
        </label>
      </div>
    ))}
  </div>
  
</div>
<div>
      <h3 className="text-lg font-semibold mb-2">Price Range</h3>
      <p className="text-sm text-gray-500 mb-4">Nightly prices before fees and taxes</p>
      
      <Slider
        value={priceRange}
        min={0}
        max={1000}
        step={10}
        onValueChange={setPriceRange}
      />
      
      <div className="flex justify-between mt-4">
        <div>
          <Input
                                  id="min-price"
                                  type="number"
                                  value={priceRange[0]}
                                  onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setPriceRange([newValue, priceRange[1] !== undefined ? priceRange[1] : 1000]);
                                  }}
                                  className="mt-1 w-24" label={"Minimum"}          />
        </div>
        <div>
          <Input
                                  id="max-price"
                                  type="number"
                                  value={priceRange[1]}
                                  onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    setPriceRange([newValue, priceRange[0] !== undefined ? priceRange[0] : 0]);
                                  }}
                                  className="mt-1 w-24" label={"Maximum"}          />
        </div>
      </div>
    </div>

    

    <div>
    <h3 className="text-lg font-semibold mb-2">Facilities</h3>
    <div className="flex">
        <FacilitiesCheckboxes
          title="Most Popular"
          icon={<LucideSparkles className="h-4 w-4" />}
        />
        </div>
        <Button variant="link" className="mt-2 p-0 h-auto" onClick={()=> setFacilitiesModal(true)}>Show more facilities</Button>
      </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Room Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
            {amenitiesList.map((amenity, index) => (
              <div key={amenity} className="flex items-center gap-2">
                <Checkbox
                  id={index}
                  colorVariant="primary"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleCheckboxAmenity(amenity)}
                />
                <label htmlFor={`checkbox-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          <Button variant="link" className="mt-2 p-0 h-auto">Show more room amenities</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Rooms and beds</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Bedrooms</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">-</Button>
                <span>Any</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">+</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Beds</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">-</Button>
                <span>Any</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">+</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Bathrooms</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">-</Button>
                <span>Any</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">+</Button>
              </div>
            </div>
          </div>
        </div>

        <div>
  <h3 className="text-lg font-semibold mb-2">Star Rating</h3>
  <div className="flex space-x-2 mb-4">
    {Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        onClick={() => setStarRating(index + 1)}
        className={`flex items-center justify-center cursor-pointer`}
      >
        <Star 
          size={28} 
          className={starRating > index ? 'text-yellow-500' : 'text-gray-300'} 
        />
      </button>
    ))}
  </div>
  <p className="text-sm text-gray-500">
    {starRating > 0 ? `Selected Rating: ${starRating} star${starRating > 1 ? 's' : ''}` : 'Select a rating'}
  </p>
</div>
      </div>

      <div className="px-6 py-4  border-t border-gray-200 flex justify-between items-center">
        <Button variant="link">Clear all</Button>
        <Button>Search</Button>
      </div>
    </div>
    <ModalContainer
      onClose={()=>setFacilitiesModal(false)}
      isOpen={facilitiesModal}
      size="md"
      title="Facilities"
      
    >
      <div className="p-8 flex flex-col max-h-[80vh] overflow-y-auto">
        <Facilities/>
</div>
      </ModalContainer>
    </ModalContainer>
  )
}

export default FilterPropertyModal
