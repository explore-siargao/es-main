import ModalContainer from "@/common/components/ModalContainer";
import { Button } from "@/common/components/ui/Button";
import { Typography } from "@/common/components/ui/Typography";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useBedroomStore } from "../store/useBedroomStore";


type T_BedRooms = {
  bedRoomType: string;
  bedRoomTypeCount: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddBedroomModal = ({ isOpen, onClose }: Props) => {
  const [fields, setFields] = useState<T_BedRooms[]>([
    { bedRoomType: 'Single Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Twin Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Double Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Queen Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Queen XL Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'King Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'King XL Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Sofa Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Bunk Bed', bedRoomTypeCount: 0 },
    { bedRoomType: 'Lot (Baby Bed)', bedRoomTypeCount: 0 },

  ]);

  const handleBedRoomTypeCountChange = (index: number, value: string) => {
    const newFields = [...fields];
    if (newFields[index]) {
      newFields[index].bedRoomTypeCount = parseInt(value, 10) || 0;
      setFields(newFields);
    }
    setFields(newFields);
  };
  const updateBedrooms = useBedroomStore((state) => state.updateBedrooms)
  const onSubmit: SubmitHandler<any> = () => {
    updateBedrooms([fields])
    toast.success('Bedroom added successfully');
    onClose();
    setFields(fields.map(field => ({ ...field, bedRoomTypeCount: 0 })));
  };
  
  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title="Add Bedroom"
    >
      <div className="py-4 px-6 flex flex-col space-x-2 divide-text-100 overflow-y-auto">
        <Typography variant="h4" fontWeight="semibold">
          How many of each bed type are available in this room?
        </Typography>
        <div>
          {fields.map((field: T_BedRooms, index: number) => (
            <div className="grid grid-cols-2 my-3 gap-x-3" key={index}>
              <Typography variant="h4" fontWeight="semibold">
          {field.bedRoomType}
        </Typography>
              <div className="flex rounded-md">
                <button
                  className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    if (field.bedRoomTypeCount > 0) {
                      const newFields = [...fields];
                      if (newFields[index]) {
                        newFields[index].bedRoomTypeCount--;
                        setFields(newFields);
                      }
                  
                      setFields(newFields);
                    }
                  }}
                >
                  <MinusIcon className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  id={`bed-count-${index}`}
                  className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  value={field.bedRoomTypeCount}
                  min={0}
                  onChange={(e) => handleBedRoomTypeCountChange(index, e.target.value)}
                />
                <button
                  className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    const newFields = [...fields];
                    if (newFields[index]) {
                    newFields[index].bedRoomTypeCount++;
                    }
                    setFields(newFields);
                  }}
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
        <Button onClick={onSubmit}>Confirm</Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddBedroomModal;
