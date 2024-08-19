import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import toast from "react-hot-toast"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useBedroomStore, useBedroomStudioStore } from "../store/useBedroomStore"
import { defaultBedroom } from "../../constants"
import { IBedroom } from "../../types"

type Props = {
  isOpen: boolean
  onClose: () => void
  mode: "add" | "edit"
  selectedIndex?: number
  unitType: string
}

const AddBedroomModal = ({
  isOpen,
  onClose,
  mode,
  selectedIndex,
  unitType,
}: Props) => {
  const [fields, setFields] = useState<IBedroom>(defaultBedroom)
  const bedrooms = useBedroomStore((state) => state.bedrooms)
  const bedroomsStudio = useBedroomStudioStore((state) => state.bedroomsStudio)
  const updateBedrooms = useBedroomStore((state) => state.updateBedrooms)
  const updateBedroomsStudio = useBedroomStudioStore((state) => state.updateBedroomsStudio)

  const handleBedCountChange = (bedIndex: number, value: string) => {
    const newBeds = [...fields.beds]
    const bed = newBeds[bedIndex]
    if (bed) {
      bed.qty = parseInt(value, 10) || 0
      setFields({ ...fields, beds: newBeds })
    }
  }

  const resetBedQuantities = () => {
    setFields((prev) => ({
      ...prev,
      beds: prev.beds.map((bed) => ({ ...bed, qty: 0 })),
    }))
  }
  useEffect(() => {
    resetBedQuantities()
  }, [])
  const onSubmit = () => {
    let updatedBedrooms = [...bedrooms];
    if (mode === "edit" && selectedIndex !== undefined) {
      updatedBedrooms[selectedIndex] = deepCopyBedroom(fields);
    } else if (mode === "add") {
      updatedBedrooms.push(deepCopyBedroom(fields));
    }
  
    // Log the current state of fields and updatedBedroomsStudio before updating the store
    if (unitType === "Studio") {
      let updatedBedroomsStudio = [...bedroomsStudio];
      if (mode === "edit" && selectedIndex !== undefined) {
        updatedBedroomsStudio[selectedIndex] = deepCopyBedroomStudio(fields);
      } else if (mode === "add") {
        updatedBedroomsStudio.push(deepCopyBedroomStudio(fields));
      }
  
      console.log("Fields being sent to bedroomsStudio:", fields);
      console.log("Updated bedroomsStudio array:", updatedBedroomsStudio);
  
      updateBedroomsStudio(updatedBedroomsStudio);
    }
  
    resetBedQuantities();
    updateBedrooms(updatedBedrooms);
  
    toast.success(
      mode === "edit"
        ? "Bedroom updated successfully"
        : "Bedroom added successfully"
    );
    onClose();
  };
  

  useEffect(() => {
    if (mode === "edit" && selectedIndex !== undefined) {
      const bedroomToEdit = bedrooms[selectedIndex]
      if (bedroomToEdit) {
        setFields(deepCopyBedroom(bedroomToEdit))
      }
    } else {
      resetBedQuantities()
    }
  }, [isOpen, mode, selectedIndex, bedrooms])
  function deepCopyBedroom(bedroom: IBedroom): IBedroom {
    return {
      roomName: bedroom.roomName,
      beds: bedroom.beds.map((bed) => ({ ...bed })),
    }
  }

  
  useEffect(() => {
    if (mode === "edit" && selectedIndex !== undefined) {
      const bedroomStudioToEdit = bedroomsStudio[selectedIndex];
      if (bedroomStudioToEdit) {
        console.log("Editing bedroomStudio:", bedroomStudioToEdit);
        setFields(deepCopyBedroomStudio(bedroomStudioToEdit));
      }
    } else {
      resetBedQuantities();
    }
  }, [isOpen, mode, selectedIndex, bedroomsStudio]);
  
  function deepCopyBedroomStudio(bedroomStudio: IBedroom): IBedroom {
    return {
      roomName: bedroomStudio.roomName,
      beds: bedroomStudio.beds.map((bed) => ({ ...bed })),
    }
  }

  let unitName

  if (unitType === "Studio") {
    unitName = "Living Room"
  } else {
    unitName = "Bedroom"
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="sm"
      title={mode === "edit" ? `Edit ${unitName}` : `Add ${unitName}`}
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
                    const newBeds = [...fields.beds]
                    const bed = newBeds[index]
                    if (bed && bed.qty > 0) {
                      bed.qty--
                      setFields({ ...fields, beds: newBeds })
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
                    const newBeds = [...fields.beds]
                    const bed = newBeds[index]
                    if (bed) {
                      bed.qty++
                      setFields({ ...fields, beds: newBeds })
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
          <Button onClick={onSubmit}>
            {mode === "edit" ? "Confirm" : "Add Bedroom"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default AddBedroomModal
