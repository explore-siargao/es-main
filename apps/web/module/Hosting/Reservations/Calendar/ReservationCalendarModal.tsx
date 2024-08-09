import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import { SelectedReservation } from "../types/CalendarTable"

interface IReservationCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  selectedReservation: SelectedReservation
}

const ReservationCalendarModal = ({
  isModalOpen,
  onClose,
  selectedReservation,
}: IReservationCalendarModalProps) => {
  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Reservation"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col">
            <Typography variant="h4" className="font-semibold">
              Room
            </Typography>
            <Typography variant="h3" className="text-gray-500">
              {selectedReservation.motorcycles}
            </Typography>
          </div>
          <div className="flex flex-col">
            <Typography variant="h4" className="font-semibold">
              Guest
            </Typography>
            <Typography variant="h3" className="text-gray-500">
              {selectedReservation?.reservation?.name}
            </Typography>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full">
              <Typography variant="h4" className="font-semibold">
                Start date
              </Typography>
              <Typography variant="h3" className="text-gray-500">
                {format(selectedReservation?.reservation?.startDate as string, "PPPP")}
              </Typography>
            </div>
            <div className="flex flex-col w-full">
              <Typography variant="h4" className="font-semibold">
                End date
              </Typography>
              <Typography variant="h3" className="text-gray-500">
                {format(selectedReservation?.reservation?.endDate as string, "PPPP")}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col">
            <Typography variant="h4" className="font-semibold">
              Guest count
            </Typography>
            <Typography variant="h3" className="text-gray-500">
              {selectedReservation?.reservation?.guestCount}
            </Typography>
          </div>
        </div>
        <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="danger">Request to Cancel</Button>
            <Button variant="primary">Change Date</Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default ReservationCalendarModal
