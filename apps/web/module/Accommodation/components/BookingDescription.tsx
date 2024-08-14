import { Button } from "@/common/components/ui/Button"
import ModalAboutTitleDescription from "./modals/ModalAboutTitleDescription"
import { useState } from "react"
import { T_BookingDescriptionProps } from "../types/BookingDescription"

const BookingDescription = ({
  generalDescription,
  aboutSpace,
  aboutGuestAccess,
  otherThingsNote,
}: T_BookingDescriptionProps) => {
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false)
  const maximumLength = 600
  const slicedDescription =
    generalDescription.length > maximumLength
      ? generalDescription.slice(0, maximumLength) + "....."
      : generalDescription
  return (
    <>
      <div className="flex text-md mb-2">{slicedDescription}</div>
      <Button
        onClick={() => setDescriptionModalOpen(!descriptionModalOpen)}
        className="underline"
        variant="link"
        size="link"
      >
        Show more &gt;
      </Button>
      <ModalAboutTitleDescription
        isOpen={descriptionModalOpen}
        onClose={() => setDescriptionModalOpen(false)}
        listingDescription={{
          generalDescription,
          aboutSpace,
          aboutGuestAccess,
          otherThingsNote,
        }}
      />
    </>
  )
}

export default BookingDescription
