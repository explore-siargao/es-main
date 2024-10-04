import React from "react"
import { Edit3, Save } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import {
  Reservation,
  Room,
} from "../../types/CalendarTable"
import { getColorClasses } from "../../helpers/legends"
import getBookingStyle from "./helpers/getBookingStyle"
import { generateRowBorder } from "./helpers/calendarTable"
import { useCalendarStore } from "./store/useCalendarStore"
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
    editingRoom,
    tempRoomAbbr,
    setEditingRoom,
    setTempRoomAbbr,
    setIsReservationModalOpen,
    setSelectedReservation,
  } = useCalendarStore(state => state);
  const handleSaveUnitName = (id: string, name: string) => {
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
    setEditingRoom(null)
  }
  const handleEditRoom = (abbr: string) => {
    setEditingRoom(abbr)
    setTempRoomAbbr(abbr)
  }
  return (
    <>
      {/* Sub Category (Units) */}
      {!collapsed[unitType.unitType] &&
        unitType.units.map(
          (bed: Room, bedIndex: number) => (
            <tr
              key={bed.abbr}
              className="hover:bg-gray-100 relative"
            >
              <td className="border py-4 pr-4 pl-12 text-left border-l-0">
                <div className="flex justify-between items-center">
                  {editingRoom === bed.abbr ? (
                    <Input
                      type="text"
                      value={tempRoomAbbr}
                      onChange={(e) =>
                        setTempRoomAbbr(e.target.value)
                      }
                      autoFocus
                      className="mr-2"
                      label={""}
                    />
                  ) : (
                    <span>{bed.abbr}</span>
                  )}
                  {editingRoom === bed.abbr ? (
                    <Button
                      size={"icon"}
                      variant={"link"}
                      onClick={(e) =>
                        handleSaveUnitName(
                          bed.id,
                          tempRoomAbbr
                        )
                      }
                    >
                      <Save className="text-gray-500 w-5" />
                    </Button>
                  ) : (
                    <Button
                      size={"icon"}
                      variant={"link"}
                      onClick={() =>
                        handleEditRoom(bed.abbr)
                      }
                    >
                      <Edit3 className="text-gray-500 w-5" />
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
                            unit: bed.abbr,
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