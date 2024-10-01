import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import { SelectedReservation } from "../../types/CalendarTable"
import { Input } from "@/common/components/ui/Input"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Textarea } from "@/common/components/ui/Textarea"
import { useFormContext } from "react-hook-form"
import useUpdateUnitReservation from "../hooks/useUpdateUnitReservation"

interface IRentalCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  selectedReservation: SelectedReservation
  isEditReservation: boolean
  isCancelReservation: boolean
  setIsEditReservation: (data: boolean) => void
  setIsCancelReservation: (data: boolean) => void
}

const PropertyCalendarModal = ({
  isModalOpen,
  onClose,
  selectedReservation,
  isEditReservation,
  isCancelReservation,
  setIsEditReservation,
  setIsCancelReservation,
}: IRentalCalendarModalProps) => {
  const queryClient = useQueryClient()

  const { register, handleSubmit, getValues } = useFormContext()
  const { mutate } = useUpdateUnitReservation(
    String(selectedReservation.reservation?.id)
  )

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-property"],
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
      title={isCancelReservation ? "Cancel Reservation" : "Reservation"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-4">
            {isCancelReservation ? (
              <div className="flex flex-col gap-4">
                <Typography variant="h3">
                  Are you sure you want to cancel this reservation?
                </Typography>
              </div>
            ) : (
              <div>
                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <Typography variant="h4" className="font-semibold">
                      Property Category
                    </Typography>
                    <Typography variant="h3" className="text-gray-500">
                      {selectedReservation?.reservation?.category &&
                        selectedReservation?.reservation?.category}
                    </Typography>
                  </div>
                  <div className="flex flex-col w-full">
                    <Typography variant="h4" className="font-semibold">
                      Unit
                    </Typography>
                    <Typography variant="h3" className="text-gray-500">
                      {selectedReservation.unit && selectedReservation.unit}
                    </Typography>
                  </div>
                </div>

                {selectedReservation?.reservation?.status !==
                  "Out-of-Service-Dates" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                      <Typography variant="h4" className="font-semibold">
                        Guest
                      </Typography>
                      <Typography variant="h3" className="text-gray-500">
                        {selectedReservation?.reservation?.name}
                      </Typography>
                    </div>
                    <div className="flex flex-col w-full">
                      <Typography variant="h4" className="font-semibold">
                        Guest counts
                      </Typography>
                      <Typography variant="h3" className="text-gray-500">
                        {selectedReservation?.reservation?.guestCount}
                      </Typography>
                    </div>
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
                            <div>
                              {format(getValues("startDate") as string, "PPPP")}
                            </div>
                          ) : (
                            <div>
                              {format(
                                selectedReservation?.reservation
                                  ?.startDate as string,
                                "PPPP"
                              )}
                            </div>
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
                                selectedReservation?.reservation
                                  ?.endDate as string
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
                            <div>
                              {format(getValues("endDate") as string, "PPPP")}
                            </div>
                          ) : (
                            <div>
                              {format(
                                selectedReservation?.reservation
                                  ?.endDate as string,
                                "PPPP"
                              )}
                            </div>
                          )}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <Typography variant="h4" className="font-semibold">
                    Notes (Optional)
                  </Typography>
                  {isEditReservation ? (
                    <div className="flex flex-col w-full">
                      <Textarea
                        id="notes"
                        className="p-3 h-28"
                        defaultValue={String(
                          selectedReservation?.reservation?.notes || ""
                        )}
                        {...register("notes")}
                      />
                    </div>
                  ) : (
                    <Typography variant="h3" className="text-gray-500">
                      {selectedReservation?.reservation?.notes ||
                        "No notes for this reservation"}
                    </Typography>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div className="flex justify-end gap-2 w-full">
              {isCancelReservation ? (
                <div className="flex gap-2">
                  <Button type="button" variant="danger">
                    Confirm Cancellation
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsCancelReservation(false)}
                  >
                    Go Back
                  </Button>
                </div>
              ) : isEditReservation ? (
                <div>
                  <Button type="submit" variant="primary">
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setIsCancelReservation(true)}
                  >
                    Request to Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setIsEditReservation(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default PropertyCalendarModal
