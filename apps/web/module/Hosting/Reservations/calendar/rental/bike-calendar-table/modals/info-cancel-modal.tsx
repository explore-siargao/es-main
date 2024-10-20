import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Textarea } from "@/common/components/ui/Textarea"
import { useForm } from "react-hook-form"
import { useCalendarStore } from "../../stores/use-bike-store"
import { QK_CALENDAR_BIKE_RENTALS } from "../../constants"
import useCancelRentalReservation from "../../hooks/use-cancel-rental-reservation"
import useUpdateRentalReservation from "../../hooks/use-update-rental-reservation"
import { Input } from "@/common/components/ui/Input"
import { format } from "date-fns"

const InfoCancelModal = () => {
  const queryClient = useQueryClient()
  const {
    selectedReservation,
    isReservationModalOpen,
    isEditReservation,
    isCancelReservation,
    setSelectedLegendType,
    setIsReservationModalOpen,
    setIsEditReservation,
    setIsCancelReservation,
  } = useCalendarStore((state) => state)

  const { register, handleSubmit, getValues, reset } = useForm()
  const { mutate } = useUpdateRentalReservation(String(selectedReservation?.id))

  const { mutate: cancelReservation, isPending: isLoading } =
    useCancelRentalReservation(String(selectedReservation?.id))

  const closeReservationModal = () => {
    setSelectedLegendType("")
    setTimeout(() => {
      setIsReservationModalOpen(false)
      setIsEditReservation(false)
      setIsCancelReservation(false)
      reset()
    }, 200)
  }

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [QK_CALENDAR_BIKE_RENTALS],
          })
          toast.success(data.message)
          closeReservationModal()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (data: any) => {
        toast.error(String(data.message))
      },
    })
  }

  const callBackReq = {
    onSuccess: (data: any) => {
      if (!data.error) {
        queryClient.invalidateQueries({
          queryKey: [QK_CALENDAR_BIKE_RENTALS],
        })
        toast.success(data.message)
        closeReservationModal()
      } else {
        toast.error(String(data.message))
      }
    },
    onError: (err: any) => {
      toast.error(String(err))
    },
  }

  return (
    <ModalContainer
      onClose={closeReservationModal}
      isOpen={isReservationModalOpen}
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
                      Rental Category
                    </Typography>
                    <Typography variant="h3" className="text-gray-500">
                      {selectedReservation?.carName && "Car"}
                      {selectedReservation?.motorcycleName && "Motorcycle"}
                      {selectedReservation?.bicycleName && "Bicycle"}
                    </Typography>
                  </div>
                  <div className="flex flex-col w-full">
                    <Typography variant="h4" className="font-semibold">
                      Vehicle
                    </Typography>
                    <Typography variant="h3" className="text-gray-500">
                      {selectedReservation?.carName &&
                        selectedReservation?.carName}
                      {selectedReservation?.motorcycleName &&
                        selectedReservation?.motorcycleName}
                      {selectedReservation?.bicycleName &&
                        selectedReservation?.bicycleName}
                    </Typography>
                  </div>
                </div>

                {selectedReservation?.status !== "Out-of-Service-Dates" && (
                  <div className="flex gap-4 mt-2">
                    <div className="flex flex-col w-full">
                      <Typography variant="h4" className="font-semibold">
                        Guest
                      </Typography>
                      <Typography variant="h3" className="text-gray-500">
                        {selectedReservation?.name}
                      </Typography>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-2">
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
                              (selectedReservation?.startDate as string).split(
                                "T"
                              )[0]
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
                              {selectedReservation
                                ? format(
                                    selectedReservation?.startDate as string,
                                    "PPPP"
                                  )
                                : ""}
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
                              (selectedReservation?.endDate as string).split(
                                "T"
                              )[0]
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
                              {selectedReservation
                                ? format(
                                    selectedReservation?.endDate as string,
                                    "PPPP"
                                  )
                                : ""}
                            </div>
                          )}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <Typography variant="h4" className="font-semibold">
                    Notes (Optional)
                  </Typography>
                  {isEditReservation ? (
                    <div className="flex flex-col w-full">
                      <Textarea
                        id="notes"
                        className="p-3 h-28"
                        defaultValue={String(selectedReservation?.notes || "")}
                        {...register("notes")}
                      />
                    </div>
                  ) : (
                    <Typography variant="h3" className="text-gray-500">
                      {selectedReservation?.notes ||
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
                  <Button
                    type="button"
                    variant="danger"
                    disabled={isLoading}
                    onClick={() => cancelReservation(null, callBackReq)}
                  >
                    Confirm Cancellation
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsCancelReservation(false)}
                    disabled={isLoading}
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
                    Cancel Reservation
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

export default InfoCancelModal
