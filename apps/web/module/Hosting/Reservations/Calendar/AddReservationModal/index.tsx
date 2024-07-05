import { useState } from "react";
import ModalContainer from "@/common/components/ModalContainer";
import { Button } from "@/common/components/ui/Button";
import { Typography } from "@/common/components/ui/Typography";
import { format } from "date-fns";
import { SelectedReservation } from "../Rental/CalendarTable";
import { Input } from "@/common/components/ui/Input";

interface IReservationCalendarModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSave: (reservation: SelectedReservation) => void;
}

const AddReservationModal = ({
  isModalOpen,
  onClose,
  onSave,
}: IReservationCalendarModalProps) => {
  const [room, setRoom] = useState("");
  const [guestName, setGuestName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const handleSave = () => {
    const newReservation: SelectedReservation = {
      room,
      booking: {
        name: guestName,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        guest_count: Number(guestCount),
      },
    };
    onSave(newReservation);
    onClose();
  };

  const { register, reset, handleSubmit, getValues } = useForm()

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Add Reservation"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col">
            <Input
              id="room"
              label="Room"
              {...register("room", {
                required: "This field is required",
              })}
              required
            />
          </div>
          <div className="flex flex-col">
            <Input
              id="guest"
              label="Number of Guests"
              {...register("guest", {
                required: "This field is required",
              })}
              required
            />
          </div>
          <div className="flex">
            <div className="flex flex-col w-full">
              <Input
                type="start_date"
                id="guest"
                label="Check in Date"
                {...register("start_date", {
                  required: "This field is required",
                })}
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <Input
                type="end_date"
                id="guest"
                label="Check out Date"
                {...register("end_date", {
                  required: "This field is required",
                })}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddReservationModal;
