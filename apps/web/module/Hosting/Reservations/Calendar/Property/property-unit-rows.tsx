import React from "react"
import { LucideEdit3, LucideSave, LucideX } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import {
  Reservation,
  Room,
} from "../../types/CalendarTable"
import { getColorClasses } from "../../helpers/property-legends"
import getBookingStyle from "./helpers/get-booking-style"
import { generateRowBorder } from "./helpers/calendar-table"
import { useCalendarStore } from "./stores/use-calendar-store"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import useUpdateCalendarUnitName from "../hooks/useUpdateCalendarUnitName"

const PropertyUnitRows = ({
  unitType,
  unitIndex,
}: {
  unitType: any,
  unitIndex: number
}) => {
  const queryClient = useQueryClient()
  const { mutate } = useUpdateCalendarUnitName()
  const {
    startDate,
    daysPerPage,
    collapsed,
    editingUnitQtyId,
    tempUnitQtyName,
    setEditingUnitQtyId,
    setTempUnitQtyName,
    setIsReservationModalOpen,
    setSelectedReservation,
  } = useCalendarStore(state => state);
  const handleSaveUnitQtyName = (id: string, name: string) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["calendar-property"],
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
    setEditingUnitQtyId(null)
  }
  const handleEditingUnitQtyName = ({id, name}: { id?: string, name?: string }) => {
    setEditingUnitQtyId(id ?? "")
    setTempUnitQtyName(name ?? "")
  }
  return (
    <>
      {/* Sub Category (Units) */}
      {!collapsed[unitType.unitType] &&
        unitType.units.map(
          (bed: Room) => (
            <tr
              key={bed.name}
              className="hover:bg-gray-100 relative"
            >
              <td className="border py-2 pr-4 pl-12 text-left border-l-0">
                <div className="flex justify-between items-center">
                  {editingUnitQtyId === bed.id ? (
                    <Input
                      type="text"
                      value={tempUnitQtyName}
                      onChange={(e) =>
                        setTempUnitQtyName(e.target.value)
                      }
                      autoFocus
                      className="mr-2"
                      label={""}
                    />
                  ) : (
                    <span>{bed.name}</span>
                  )}
                  {editingUnitQtyId === bed.id ? (
                    <div className="flex">
                      <Button
                        size={"icon"}
                        variant={"link"}
                        className="group"
                        onClick={() =>
                          handleSaveUnitQtyName(
                            editingUnitQtyId,
                            tempUnitQtyName
                          )
                        }
                      >
                        <LucideSave className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"link"}
                        className="group"
                        onClick={() =>
                          handleEditingUnitQtyName({})
                        }
                      >
                        <LucideX className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size={"icon"}
                      variant={"link"}
                      onClick={() =>
                        handleEditingUnitQtyName({ id: bed.id, name: bed.name })
                      }
                    >
                      <LucideEdit3 className="text-gray-500 w-5" />
                    </Button>
                  )}
                </div>
              </td>
              <td
                colSpan={daysPerPage}
                className={`border text-center relative ${unitIndex + 1 !== daysPerPage && "border-r-0"}`}
              >
                {bed.reservations.map(
                  (booking: Reservation) => {
                    const style = getBookingStyle(
                      startDate,
                      daysPerPage,
                      booking
                    )
                    if (!style) return null

                    const { startCol, colSpan } = style
                    const {
                      colorClass,
                      hoverColorClass,
                    } = getColorClasses(booking.status)

                    return (
                      <div
                        key={booking.id}
                        style={{
                          left: `${(startCol * 100) / daysPerPage + 4}%`,
                          width: `${(colSpan * 100) / daysPerPage - 8}%`,
                        }}
                        onClick={() => {
                          setIsReservationModalOpen(
                            true
                          )
                          setSelectedReservation({
                            unit: bed.name,
                            reservation: booking,
                          })
                        }}
                        className={`booking-block hover:cursor-pointer flex z-20 ${colorClass} ${hoverColorClass} rounded-xl h-[80%] top-[10%] absolute items-center justify-center`}
                      >
                        <span className="text-white text-sm truncate px-2">
                          {booking.status ===
                            "Out-of-Service-Dates"
                            ? "Out of service"
                            : booking.name}
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
          )
        )}
    </>
  )
}

export default PropertyUnitRows