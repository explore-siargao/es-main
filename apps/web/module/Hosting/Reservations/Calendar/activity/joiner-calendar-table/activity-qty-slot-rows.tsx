import React from "react"
import { LucideEdit3, LucideSave, LucideX } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import { getColorClasses } from "../../../helpers/activity-legends"
import getBookingStyle from "../helpers/get-booking-style"
import { generateRowBorder } from "../helpers/calendar-table"
import { useCalendarStore } from "../stores/use-joiner-store"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  T_Activity,
  T_BackendResponse,
  T_Calendar_Reservation,
  T_Joiner_Activity,
} from "@repo/contract"
import useUpdateActivitySlotNote from "../hooks/use-update-activity-slot-note"
import { QK_CALENDAR_JOINER_ACTIVITIES } from "../constants"

const ActivityQtySlotRows = ({
  activity,
  joinerActivity,
  activityIndex,
}: {
  activity: any
  joinerActivity: T_Joiner_Activity
  activityIndex: number
}) => {
  const queryClient = useQueryClient()
  const { mutate } = useUpdateActivitySlotNote()
  const {
    startDate,
    daysPerPage,
    collapsed,
    editingSlotNoteId,
    tempActivitySlotNote,
    setSelectedReservation,
    setEditingSlotNoteId,
    setTempActivitySlotNote,
    setIsReservationModalOpen,
  } = useCalendarStore((state) => state)
  const handleSaveSlotNoteName = (id: string, note: string) => {
    const callBackReq = {
      onSuccess: (data: T_BackendResponse) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [QK_CALENDAR_JOINER_ACTIVITIES],
          })
          toast.success(data.message as string)
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutate({ id, note }, callBackReq)
    setEditingSlotNoteId(null)
  }
  const handleEditingSlotNote = ({
    id,
    note,
  }: {
    id?: string
    note?: string
  }) => {
    setEditingSlotNoteId(id ?? "")
    setTempActivitySlotNote(note ?? "")
  }
  return (
    <>
      {/* Sub Category (Units) */}
      {!collapsed[joinerActivity.name] &&
        joinerActivity.slots.map((slot) => (
          <tr key={slot.name} className="hover:bg-gray-100 relative">
            <td className="border py-2 pr-4 pl-20 text-left border-l-0">
              <div className="flex justify-between items-center">
                {editingSlotNoteId === slot.id ? (
                  <Input
                    type="text"
                    value={tempActivitySlotNote}
                    onChange={(e) => setTempActivitySlotNote(e.target.value)}
                    autoFocus
                    className="mx-1"
                    label={""}
                  />
                ) : (
                  <span>{slot.name}</span>
                )}
                {editingSlotNoteId === slot.id ? (
                  <div className="flex">
                    <Button
                      size={"icon"}
                      variant={"link"}
                      className="group"
                      onClick={() =>
                        handleSaveSlotNoteName(slot.id, tempActivitySlotNote)
                      }
                    >
                      <LucideSave className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"link"}
                      className="group"
                      onClick={() => handleEditingSlotNote({})}
                    >
                      <LucideX className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size={"icon"}
                    variant={"link"}
                    onClick={() =>
                      handleEditingSlotNote({ note: slot.name, id: slot.id })
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
              {slot.reservations.map((reservation: T_Calendar_Reservation) => {
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
                      left: `${(startCol * 100) / daysPerPage + 0.5}%`,
                      width: `${(colSpan * 100) / daysPerPage - 1}%`,
                    }}
                    onClick={() => {
                      setIsReservationModalOpen(true)
                      setSelectedReservation({
                        ...reservation,
                        activityName: activity.name,
                        slotName: `${joinerActivity.name} - ${slot.name}`,
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
              })}
              <div className="absolute inset-0 z-10 flex h-full">
                {generateRowBorder({ daysPerPage, startDate })}
              </div>
            </td>
          </tr>
        ))}
    </>
  )
}

export default ActivityQtySlotRows
