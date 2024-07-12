import { Button } from "@/common/components/ui/Button";
import { useState } from "react";
import { PropertyType, T_AvailableBookingProps } from "../types/AvailableBooking";
import { TitleSection } from "./TitleSection";
import Image from "next/image";
import { T_BookableUnitType } from "@repo/contract";

const AvailableBooking = ({
  bookableUnits,
  propertyType,
  onSelectBookableUnit,
}: T_AvailableBookingProps) => {
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const handleSelectUnit = (unit: T_BookableUnitType) => {
    onSelectBookableUnit(unit);
  };

  let title = "";
  switch (propertyType.toUpperCase()) {
    case PropertyType.HOTEL:
      title = "Available Rooms";
      break;
    case PropertyType.HOSTEL:
    case PropertyType.HOMESTAY:
      title = "Available Bed and Rooms";
      break;
    case PropertyType.RESORT:
      title = "Available Bed, Rooms and Whole Places";
      break;
    case PropertyType.APARTMENT:
    case PropertyType.VILLA:
      title = "Available Whole Places";
      break;
    default:
      title = "Available Booking";
      break;
  }

  return (
    <>
      <TitleSection size="lg" title={title} />
      {bookableUnits.map((unit: T_BookableUnitType) => (
        <div key={unit.id} className="flex mt-10">
          <div className="flex-col w-72">
            {unit.photos && unit.photos.length > 0 && (
              <Image
                className="rounded-xl relative"
                src={`/assets/${unit.photos[0]?.key || 'default-image-key'}`}
                width={600}
                height={300}
                alt={"Test"}
              />
            )}
            <Button
              onClick={() => handleSelectUnit(unit)}
              className="w-full mt-5"
              variant="primary"
            >
              Select
            </Button>
          </div>
          <div className="w-auto mx-10">
            <div className="flex text-md mb-2 font-bold">{unit.category}</div>
            <div className="flex text-md mb-2">{unit.title}</div>
            {unit.bed && (
              <div className="flex text-md mb-2"> {unit.bed}</div>
            )}
            {unit.category === "Bed" && (
              <div className="flex text-md mb-2">{unit.description}</div>
            )}
            {unit.totalSize && (
              <div className="flex text-md mb-2">
                {unit.totalSize} Square meters
              </div>
            )}
            <div className="flex text-md mb-2">
              {unit.maxGuests} Guests capacity
            </div>
            <Button
              variant="link"
              size="link"
              className="flex text-md mb-2 underline"
            >
              Show all information &gt;
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AvailableBooking;
