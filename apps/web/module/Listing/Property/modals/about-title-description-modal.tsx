import ModalContainer from "@/common/components/ModalContainer"
import { T_BookingDescriptionModalProps } from "../types/BookingDescription"
import { Typography } from "@/common/components/ui/Typography"

const AboutTitleDescriptionModal = ({
  isOpen,
  onClose,
  listingDescription,
}: T_BookingDescriptionModalProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="md">
      <div className="py-4 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex mb-5">
          About this place
        </Typography>
        <div>
          <Typography className="whitespace-pre-wrap">
            {listingDescription.generalDescription}
          </Typography>
          {listingDescription.aboutSpace && (
            <div>
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="flex mb-5 my-4"
              >
                About space
              </Typography>
              <Typography className="whitespace-pre-wrap">
                {listingDescription.aboutSpace}
              </Typography>
            </div>
          )}
          {listingDescription.aboutGuestAccess && (
            <div>
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="flex mb-5 my-4"
              >
                About guest access
              </Typography>
              <Typography className="whitespace-pre-wrap">
                {listingDescription.aboutGuestAccess}
              </Typography>
            </div>
          )}
          {listingDescription.otherThingsNote && (
            <div>
              <Typography
                variant="h4"
                fontWeight="semibold"
                className="flex mb-5 my-4"
              >
                Other things to note
              </Typography>
              <Typography className="whitespace-pre-wrap">
                {listingDescription.otherThingsNote}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </ModalContainer>
  )
}

export default AboutTitleDescriptionModal
