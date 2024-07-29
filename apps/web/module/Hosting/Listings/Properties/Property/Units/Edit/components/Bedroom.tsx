import { Typography } from "@/common/components/ui/Typography"
import { LucidePlus } from "lucide-react"
import React, { useState } from "react"
import AddBedroomModal from "./AddBedroomModal"
import { useBedroomStore } from "../store/useBedroomStore"
import { Button } from "@/common/components/ui/Button"

const Bedroom = () => {
  const bedrooms = useBedroomStore((state) => state.bedrooms)
  const deleteBedroom = useBedroomStore((state) => state.deleteBedroom)
  const [isAddBedroomModalOpen, setIsAddBedroomModalOpen] = useState(false)
 
  return (
    <div>
      <div>
        <div className="flex items-center ">
        </div>
       <div className="grid grid-cols-2 gap-x-7 gap-y-2">
       {bedrooms.map((bedroomArray, index) => {
  return (
    <><div key={bedroomArray.bedRoomName} className="mt-2 rounded-lg p-4 border w-full border-text-200">
      <Typography variant="h4">
        Bedroom {index + 1}
      </Typography>
      {bedroomArray.beds
          .filter(bed => bed.qty > 0)
          .map((bed, bedIndex, filteredBeds) => (
            <span key={bed.name} className="text-text-400 text-sm">
              {bed.qty} {bed.name}
              {bedIndex !== filteredBeds.length - 1 ? ', ' : ''}
            </span>
          ))}

    </div>
    <div className="flex items-center"><Button
    variant={"ghost"}
      onClick={() =>  deleteBedroom(index)}
      className="underline text-md" 
    >Remove
      </Button></div></>
  );
})}
</div>
        <button
          type="button"
          onClick={() => setIsAddBedroomModalOpen(true)}
          className="text-text-400 text-sm flex items-center gap-2 p-2 mt-2 hover:font-semibold transition"
        >
          <LucidePlus className="h-4 w-4" /> Add Bedroom
        </button>
      </div>
      <AddBedroomModal
        isOpen={isAddBedroomModalOpen}
        onClose={()=>setIsAddBedroomModalOpen(false)}
        mode="add"

      />
    </div>
  )
}

export default Bedroom
