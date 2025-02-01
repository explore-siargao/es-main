import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"

type T_EventsModalProps = {
  isOpen: boolean
  onClose: () => void
  events: any
}
const EventsModal = ({ isOpen, onClose, events }: T_EventsModalProps) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title="Specials and Events"
    >
      <div className="px-12 pb-6">
        <div className="mt-6 space-y-6">
          {events ? (
            events.map((item: any, index: number) => (
              <div key={"events-" + index}>
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
