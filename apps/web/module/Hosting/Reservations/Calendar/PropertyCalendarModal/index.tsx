import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import { SelectedReservation } from "../../types/CalendarTable"
import { Input } from "@/common/components/ui/Input"
import useUpdateRentalReservation from "../hooks/useUpdateRentalReservation"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Textarea } from "@/common/components/ui/Textarea"
import { useFormContext } from "react-hook-form"

interface IRentalCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  selectedReservation: SelectedReservation
  isEditReservation: boolean
  setIsEditReservation: (data: boolean) => void
}

const PropertyCalendarModal = ({
  isModalOpen,
  onClose,
  selectedReservation,
  isEditReservation,
  setIsEditReservation,
}: IRentalCalendarModalProps) => {
  const queryClient = useQueryClient()

  const { register, handleSubmit, getValues } = useFormContext()
  const { mutate } = useUpdateRentalReservation(
    String(selectedReservation.reservation?.id)
  )

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-car"],
          })
          toast.success(data.message)
          onClose()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (data: any) => {
        toast.error(String(data.message))
      },
    })
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Reservation"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-4">
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  Property Category
                </Typography>
                <Typography variant="h3" className="text-gray-500">
                  {selectedReservation.beds && "Beds"}
                </Typography>
              </div>
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  Unit
                </Typography>
                <Typography variant="h3" className="text-gray-500">
                  {selectedReservation.beds && selectedReservation.beds}
                </Typography>
              </div>
            </div>
            {selectedReservation?.reservation?.name && (
              <div className="flex flex-col">
                <Typography variant="h4" className="font-semibold">
                  Guest
                </Typography>
                <Typography variant="h3" className="text-gray-500">
                  {selectedReservation?.reservation?.name}
                </Typography>
              </div>
            )}
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  Start date
                </Typography>
                {isEditReservation ? (
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col w-full">
                      <Input
                        type="date"
                        id="startDate"
                        label="Start Date"
                        defaultValue={
                          (
                            selectedReservation?.reservation
                              ?.startDate as string
                          ).split("T")[0]
                        }
                        {...register("startDate", {
                          required: "This field is required",
                        })}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <Typography variant="h3" className="text-gray-500">
                      {getValues("startDate") ? (
                        <>{format(getValues("startDate") as string, "PPPP")}</>
                      ) : (
                        <>
                          {format(
                            selectedReservation?.reservation
                              ?.startDate as string,
                            "PPPP"
                          )}
                        </>
                      )}
                    </Typography>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  End date
                </Typography>
                {isEditReservation ? (
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col w-full">
                      <Input
                        type="date"
                        id="endDate"
                        label="End Date"
                        defaultValue={
                          (
                            selectedReservation?.reservation?.endDate as string
                          ).split("T")[0]
                        }
                        {...register("endDate", {
                          required: "This field is required",
                        })}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <Typography variant="h3" className="text-gray-500">
                      {getValues("endDate") ? (
                        <>{format(getValues("endDate") as string, "PPPP")}</>
                      ) : (
                        <>
                          {format(
                            selectedReservation?.reservation?.endDate as string,
                            "PPPP"
                          )}
                        </>
                      )}
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <Typography variant="h4" className="font-semibold">
                Notes
              </Typography>
              {isEditReservation ? (
                <div className="flex flex-col w-full">
                  <Textarea
                    id="notes"
                    label="Notes"
                    defaultValue={String(
                      selectedReservation?.reservation?.notes
                    )}
                    {...register("notes")}
                    required={false}
                  />
                </div>
              ) : (
                <Typography variant="h3" className="text-gray-500">
                  {selectedReservation?.reservation?.notes
                    ? selectedReservation?.reservation?.notes
                    : "No notes for this reservation"}
                </Typography>
              )}
            </div>
          </div>
          <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div className="flex justify-end gap-2 w-full">
              {isEditReservation ? (
                <>
                  <Button type="submit" variant="primary">
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button type="button" variant="danger">
                    Request to Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setIsEditReservation(true)}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default PropertyCalendarModal
