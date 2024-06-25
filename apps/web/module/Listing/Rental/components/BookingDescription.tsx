import React from 'react';
import { Check } from 'lucide-react';
import { TitleSection } from './TitleSection'; 

type BookingDescriptionProps = {
  aboutData: {
    bodyType: string; 
    fuel: string;   
    transmission: string; 
    engineCapacityLiter: number;
    condition: string;
    exteriorColor: string;
    interiorColor: string;
    seatingCapacity: number;
    isRegistered: string;
    weightCapacityKg: number;
  };
}

const BookingDescription = ({ aboutData }: BookingDescriptionProps) => {
  const properties = [
    { label: aboutData.bodyType, text: '' },
    { label: aboutData.fuel, text: 'Fuel' },
    { label: aboutData.transmission, text: 'Transmission' },
    { label: aboutData.condition, text: 'Condition' },
    { label: `${aboutData.engineCapacityLiter}`, text: 'Liter Engine Capacity' },
    { label: aboutData.interiorColor, text: 'Interior Color' },
    { label: `${aboutData.seatingCapacity}`, text: 'Seating Capacity' },
    { label: aboutData.exteriorColor, text: 'Exterior Color' },
    { label: `${aboutData.weightCapacityKg}`, text: 'Kg Weight Capacity' },
  ];

  return (
    <>
      <TitleSection size="lg" title="About this Rental">
        <div className="grid grid-cols-2">
          {properties.map((property, index) => (
            <div key={index} className="flex my-3">
              <Check className="text-primary-500 mr-4" />
              {property.label} {property.text && `${property.text}`}
            </div>
          ))}
          {aboutData.isRegistered === "Yes" &&
            <div className="flex my-3">
              <Check className="text-primary-500 mr-4" />
              Registered
            </div>
          }
        </div>
      </TitleSection>
    </>
  );
};

export default BookingDescription;
