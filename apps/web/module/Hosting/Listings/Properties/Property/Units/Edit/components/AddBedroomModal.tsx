import ModalContainer from "@/common/components/ModalContainer";
import { Button } from "@/common/components/ui/Button";
import { Typography } from "@/common/components/ui/Typography";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useBedroomStore } from "../store/useBedroomStore";
import { defaultBedroom } from "../../constants";

export interface T_Bedroom {
  bedRoomName: string;
  beds: {
    name: string;
    qty: number;
  }[];
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  selectedIndex?: number; 
};

const AddBedroomModal = ({ isOpen, onClose, mode, selectedIndex }: Props) => {
  const [fields, setFields] = useState<T_Bedroom>(defaultBedroom);
  const bedrooms = useBedroomStore((state) => state.bedrooms);
  const updateBedrooms = useBedroomStore((state) => state.updateBedrooms);
  
  const handleBedCountChange = (bedIndex: number, value: string) => {
    const newBeds = [...fields.beds];
    if (newBeds[bedIndex]) {
      newBeds[bedIndex].qty = parseInt(value, 10) || 0;
      setFields({ ...fields, beds: newBeds });
    }
  };
  
  const resetBedQuantities = () => {
    setFields((prev) => ({
      ...prev,
      beds: prev.beds.map((bed) => ({ ...bed, qty: 0 })),
    }));
  };

  const onSubmit = () => {
    let updatedBedrooms = [...bedrooms];
    if (mode === "edit" && selectedIndex !== undefined) {
      updatedBedrooms[selectedIndex] = deepCopyBedroom(fields);
    } else if (mode === "add") {
      updatedBedrooms.push(deepCopyBedroom(fields));
    }
    resetBedQuantities()
    updateBedrooms(updatedBedrooms);
  
  
    toast.success(mode === "edit" ? 'Bedroom updated successfully' : 'Bedroom added successfully');
    onClose();
  };
  
  function deepCopyBedroom(bedroom: T_Bedroom): T_Bedroom {
    return {
      bedRoomName: bedroom.bedRoomName,
      beds: bedroom.beds.map((bed) => ({ ...bed })),
    };
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title={mode === "edit" ? "Edit Bedroom" : "Add Bedroom"}
    >
      <div className="py-4 px-20 flex flex-col divide-text-100 overflow-y-auto">
        <Typography variant="h3" fontWeight="semibold" className="mb-5">
          How many of each bed type are available in this room?
        </Typography>
        <div>
          {fields.beds.map((bed, index) => (
            <div className="grid grid-cols-2 my-3  items-center" key={bed.name}>
              <Typography variant="h4" fontWeight="semibold">
                {bed.name}
              </Typography>
              <div className="flex rounded-md">
                <button
                  className="inline-flex items-center rounded-l-md border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    const newBeds = [...fields.beds];
                    if (newBeds[index] && newBeds[index].qty > 0) {
                      newBeds[index].qty--;
                      setFields({ ...fields, beds: newBeds });
                    }
                  }}
                >
                  <MinusIcon className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  id={`bed-count-${index}`}
                  className="block w-10 min-w-0 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                  value={bed.qty}
                  min={0}
                  onChange={(e) => handleBedCountChange(index, e.target.value)}
                />
            
                <button
                  className="inline-flex items-center rounded-r-md border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
                  type="button"
                  onClick={() => {
                    const newBeds = [...fields.beds];
                    if (newBeds[index]) {
                      newBeds[index].qty++;
                      setFields({ ...fields, beds: newBeds });
                    }
                  }}
                >
                  <PlusIcon className="h-3 w-3" />
                </button>
                </div>
            
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button onClick={onSubmit}>{mode === "edit" ? "Confirm" : "Add Bedroom"}</Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddBedroomModal;
