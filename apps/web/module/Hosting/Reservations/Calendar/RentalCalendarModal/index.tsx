import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { format } from "date-fns"
import { SelectedReservation } from "../../types/CalendarTable"
import { useState } from "react"
import { PencilLine } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { useForm } from "react-hook-form"

interface IRentalCalendarModalProps {
  isModalOpen: boolean
  onClose: () => void
  selectedReservation: SelectedReservation
}

const RentalCalendarModal = ({
  isModalOpen,
  onClose,
  selectedReservation,
}: IRentalCalendarModalProps) => {
  const { register, handleSubmit, getValues } = useForm()
  const [selectedStartDate, setSelectedStartDate] = useState("")
  const [selectedEndDate, setSelectedEndDate] = useState("")
  const [isEditDate, setIsEditDate] = useState<boolean>(false)

  const onSubmit = (data: any) => {
    console.log(data)
    setIsEditDate(false)
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
                  Rental Category
                </Typography>
                <Typography variant="h3" className="text-gray-500">
                  {selectedReservation.cars && "Car"}
                  {selectedReservation.motorcycles && "Motorcycle"}
                  {selectedReservation.bicyles && "Bicycle"}
                </Typography>
              </div>
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  Vehicle
                </Typography>
                <Typography variant="h3" className="text-gray-500">
                  {selectedReservation.cars && selectedReservation.cars}
                  {selectedReservation.motorcycles && selectedReservation.motorcycles}
                  {selectedReservation.bicyles && selectedReservation.bicyles}
                </Typography>
              </div>
            </div>
            
            <div className="flex flex-col">
              <Typography variant="h4" className="font-semibold">
                Guest
              </Typography>
              <Typography variant="h3" className="text-gray-500">
                {selectedReservation?.reservation?.name}
              </Typography>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  Start date
                </Typography>
                {isEditDate ? 
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col w-full">
                      <Input
                        type="date"
                        id="startDate"
                        label="Start Date"
                        defaultValue={(selectedReservation?.reservation?.startDate as string).split('T')[0]}
                        {...register("startDate", {
                          required: "This field is required",
                        })}
                        required
                      />
                    </div>
                  </div>
                :
                  <div className="flex gap-4 items-center">
                    <Typography variant="h3" className="text-gray-500">
                      {
                        getValues("startDate") ? 
                        <>
                          {format(
                            getValues("startDate") as string,
                            "PPPP"
                          )}
                        </>
                        :
                        <>
                          {format(
                            selectedReservation?.reservation?.startDate as string,
                            "PPPP"
                          )}
                        </>
                      }
                      
                    </Typography>
                  </div>
                }
              </div>
              <div className="flex flex-col w-full">
                <Typography variant="h4" className="font-semibold">
                  End date
                </Typography>
                {isEditDate ? 
                  <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col w-full">
                      <Input
                        type="date"
                        id="endDate"
                        label="End Date"
                        defaultValue={(selectedReservation?.reservation?.endDate as string).split('T')[0]}
                        {...register("endDate", {
                          required: "This field is required",
                        })}
                        required
                      />
                    </div>
                  </div>
                :
                  <div className="flex gap-4 items-center">
                    <Typography variant="h3" className="text-gray-500">
                      {
                        getValues("endDate") ? 
                        <>
                          {format(
                            getValues("endDate") as string,
                            "PPPP"
                          )}
                        </>
                        :
                        <>
                          {format(
                            selectedReservation?.reservation?.endDate as string,
                            "PPPP"
                          )}
                        </>
                      }
                      
                    </Typography>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div className="flex justify-end gap-2 w-full">
              {isEditDate ?
                <>
                  <Button type="submit" variant="primary">Save</Button>
                </> 
                :
                <>
                  <Button type="button" variant="danger">Request to Cancel</Button>
                  <Button type="button" variant="primary" onClick={() => setIsEditDate(true)}>Edit</Button>
                </>
              }
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  )
}

export default RentalCalendarModal
