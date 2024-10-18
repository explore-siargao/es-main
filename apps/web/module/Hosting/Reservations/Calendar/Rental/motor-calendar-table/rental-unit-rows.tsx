import React from "react"
import { LucideEdit3, LucideSave, LucideX } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import { getColorClasses } from "../../../helpers/activity-legends"
import getBookingStyle from "../helpers/get-booking-style"
import { generateRowBorder } from "../helpers/calendar-table"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  T_Calendar_Motor_Rental,
  T_Calendar_Rental_Reservation,
} from "@repo/contract"

import { QK_CALENDAR_MOTOR_RENTALS } from "../constants"
import { useCalendarStore } from "../stores/use-motor-store"
import useUpdateVehicleName from "../hooks/use-update-vehicle-name"

const VehicleUnitRows = ({
  rental,
  activityIndex,
}: {
  rental: T_Calendar_Motor_Rental
  activityIndex: number
}) => {
  const queryClient = useQueryClient()
  const { mutate } = useUpdateVehicleName()
  const {
    startDate,
    daysPerPage,
    collapsed,
    editingRentalQtyId,
    tempRentalQtyName,
    setEditingRentalQtyId,
    setTempRentalQtyName,
    setIsReservationModalOpen,
    setSelectedReservation,
  } = useCalendarStore((state) => state)

  const handleSaveRentalQtyName = (id: string, name: string) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [QK_CALENDAR_MOTOR_RENTALS],
          })
          toast.success(data.message)
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutate({ id: id, name: name }, callBackReq)
    setEditingRentalQtyId(null)
  }
  const handleEditingRentalQtyName = ({
    id,
    name,
  }: {
    id?: string
    name?: string
  }) => {
    setEditingRentalQtyId(id ?? "")
    setTempRentalQtyName(name ?? "")
  }

  return (
    <>
      {/* Sub Category (Rentals) */}
      {!collapsed[rental.name] &&
        rental.motorcycles.map((motorcycle) => (
          <tr key={motorcycle.name} className="hover:bg-gray-100 relative">
            <td className="border py-2 pr-4 pl-12 text-left border-l-0">
              <div className="flex justify-between items-center">
                {editingRentalQtyId === motorcycle.id ? (
                  <Input
                    type="text"
                    value={tempRentalQtyName}
                    onChange={(e) => setTempRentalQtyName(e.target.value)}
                    autoFocus
                    className="mr-2"
                    label={""}
                  />
                ) : (
                  <span>{motorcycle.name}</span>
                )}
                {editingRentalQtyId === motorcycle.id ? (
                  <div className="flex">
                    <Button
                      size={"icon"}
                      variant={"link"}
                      className="group"
                      onClick={() =>
                        handleSaveRentalQtyName(
                          editingRentalQtyId,
                          tempRentalQtyName
                        )
                      }
                    >
                      <LucideSave className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"link"}
                      className="group"
                      onClick={() => handleEditingRentalQtyName({})}
                    >
                      <LucideX className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size={"icon"}
                    variant={"link"}
                    onClick={() =>
                      handleEditingRentalQtyName({
                        id: motorcycle.id,
                        name: motorcycle.name,
                      })
                    }
                  >
                    <LucideEdit3 className="text-gray-500 w-5" />
                  </Button>
                )}
              </div>
            </td>
            <td
              colSpan={daysPerPage}
              className={`border text-center relative ${activityIndex + 1 !== daysPerPage && "border-r-0"}`}
            >
              {motorcycle.reservations.map(
                (reservation: T_Calendar_Rental_Reservation) => {
                  const style = getBookingStyle(
                    startDate,
                    daysPerPage,
                    reservation
                  )

                  if (!style) return null

                  const { startCol, colSpan } = style
                  const { colorClass, hoverColorClass } = getColorClasses(
                    reservation.status
                  )

                  return (
                    <div
                      key={reservation.id}
                      style={{
                        left: `${(startCol * 100) / daysPerPage + 4}%`,
                        width: `${(colSpan * 100) / daysPerPage - 8}%`,
                      }}
                      onClick={() => {
                        setIsReservationModalOpen(true)
                        setSelectedReservation({
                          ...reservation,
                          carName: motorcycle.name,
                        })
                      }}
                      className={`booking-block hover:cursor-pointer flex z-20 ${colorClass} ${hoverColorClass} rounded-xl h-[80%] top-[10%] absolute items-center justify-center`}
                    >
                      <span className="text-white text-sm truncate px-2">
                        {reservation.status === "Out-of-Service-Dates"
                          ? "Out of service"
                          : reservation.name}
                      </span>
                    </div>
                  )
                }
              )}
              <div className="absolute inset-0 z-10 flex h-full">
                {generateRowBorder({ daysPerPage, startDate })}
              </div>
            </td>
          </tr>
        ))}
    </>
  )
}

export default VehicleUnitRows
