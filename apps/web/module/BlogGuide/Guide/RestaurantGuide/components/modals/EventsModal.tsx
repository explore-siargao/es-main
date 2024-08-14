import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"

type T_EventsModalProps = {
  isOpen: boolean
  onClose: () => void
  events: any
}
const EventsModal = ({ isOpen, onClose, events }: T_EventsModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="sm">
      <div className="px-12 py-6">
        <Typography variant="h2" className="text-center" fontWeight="semibold">
          Specials and Events
        </Typography>
        <div className="mt-6 space-y-6">
          {events ? (
            events.map((item: any, index: number) => (
              <div key={index}>
                <Typography variant="h4" fontWeight="semibold" className="mb-1">
                  {item.eventTitle}
                </Typography>
                <Typography variant="p" className="whitespace-pre-wrap">
                  {item.eventDesc}
                </Typography>
              </div>
            ))
          ) : (
            <Typography>There is no available special or events.</Typography>
          )}
        </div>
      </div>
    </ModalContainer>
  )
}

export default EventsModal
