import React from "react"
import { Button } from "@/common/components/ui/Button"
import { LucidePlus } from "lucide-react"

const AddReservation = ({
  setIsAddReservationModalOpen,
}: {
  setIsAddReservationModalOpen: (value: boolean) => void
}) => {
  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      className="rounded-full w-full"
      onClick={() => setIsAddReservationModalOpen(true)}
    >
      <LucidePlus className="w-5" />
    </Button>
  )
}

export default AddReservation
