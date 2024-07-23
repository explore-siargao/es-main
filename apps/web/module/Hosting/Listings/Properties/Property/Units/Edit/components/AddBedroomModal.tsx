import ModalContainer from "@/common/components/ModalContainer";
import { Button } from "@/common/components/ui/Button";
import { Typography } from "@/common/components/ui/Typography";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Option, Select } from "@/common/components/ui/Select"


type Field = {
  bedRoomName: string;
  bedRoomType: string;
  bedRoomTypeCount: number; // Individual count for each bed type
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddBedroomModal = ({ isOpen, onClose }: Props) => {
  const [fields, setFields] = useState<Field[]>([
    { bedRoomName: '', bedRoomType: '', bedRoomTypeCount: 0 },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      { bedRoomName: '', bedRoomType: '', bedRoomTypeCount: 0 }
    ]);
  };

  const handleBedRoomNameChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].bedRoomName = value;
    setFields(newFields);
  };

  const handleBedRoomTypeCountChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].bedRoomTypeCount = parseInt(value, 10) || 0; // Ensure it's a number
    setFields(newFields);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    toast.success('Bedroom added successfully');
    onClose();
  };

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title="Add Bedroom"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <Typography variant="h4" fontWeight="semibold">
          How many of each bed type are available in this room?
        </Typography>
        <div>
          {fields.map((field: Field, index: number) => (
            <div className="grid grid-cols-2 my-3 gap-x-3" key={index}>
             <Select
        label="Bedroom Type"
        id="bedroom-type-select"
        onChange={(e) => console.log("Selected value:", e.target.value)}
        required
      >
        <Option value="single">Single Bed</Option>
        <Option value="double">Twin Bed</Option>
        <Option value="queen">Double Bed</Option>
        <Option value="king">Queen Bed</Option>
        <Option value="king">Queen XL Bed</Option>
        <Option value="king">King Bed</Option>
        <Option value="king">King XL Bed</Option>
        <Option value="king">Sofa Bed</Option>
        <Option value="king">Queen Bed</Option>
        <Option value="queen">Bunk Bed</Option>
        <Option value="king">Lot (Baby Bed)</Option>
      </Select>
              <div className="flex rounded-md">
                <button
                  className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    if (field.bedRoomTypeCount > 0) {
                      const newFields = [...fields];
                      newFields[index].bedRoomTypeCount--;
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
                    newFields[index].bedRoomTypeCount++;
                    setFields(newFields);
                  }}
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <Button variant={"ghost"} className="my-2 flex underline " onClick={addField}>
            <PlusIcon /> Add bed type
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddBedroomModal;
