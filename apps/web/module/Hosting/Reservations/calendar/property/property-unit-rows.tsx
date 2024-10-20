import React from "react"
import { LucideEdit3, LucideSave, LucideX } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import { Button } from "@/common/components/ui/Button"
import { getColorClasses } from "../../helpers/property-legends"
import getBookingStyle from "./helpers/get-booking-style"
import { useCalendarStore } from "./stores/use-calendar-store"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import useUpdateCalendarUnitName from "../hooks/useUpdateCalendarUnitName"
import { generateRowBorder } from "./helpers/calendar-table"
import {
  T_Calendar_Property_Unit_Group,
  T_Calendar_Property_Unit,
  T_Calendar_Property_Reservation,
} from "@repo/contract"
import { QK_CALENDAR_PROPERTIES } from "./constants"

const PropertyUnitRows = ({
  unitGroup,
  unitIndex,
}: {
  unitGroup: T_Calendar_Property_Unit_Group
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
  } = useCalendarStore((state) => state)
  const handleSaveUnitQtyName = (id: string, name: string) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: [QK_CALENDAR_PROPERTIES],
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
  const handleEditingUnitQtyName = ({
    id,
    name,
  }: {
    id?: string
    name?: string
  }) => {
    setEditingUnitQtyId(id ?? "")
    setTempUnitQtyName(name ?? "")
  }
  return (
    <>
      {/* Sub Category (Units) */}
      {!collapsed[unitGroup.id] &&
        unitGroup.units?.map((unit: T_Calendar_Property_Unit) => (
          <tr key={unit.name} className="hover:bg-gray-100 relative">
            <td className="border py-2 pr-4 pl-12 text-left border-l-0">
              <div className="flex justify-between items-center">
                {editingUnitQtyId === unit.id ? (
                  <Input
                    type="text"
                    value={tempUnitQtyName}
                    onChange={(e) => setTempUnitQtyName(e.target.value)}
                    autoFocus
                    className="mr-2"
                    label={""}
                  />
                ) : (
                  <span>{unit.name}</span>
                )}
                {editingUnitQtyId === unit.id ? (
                  <div className="flex">
                    <Button
                      size={"icon"}
                      variant={"link"}
                      className="group"
                      onClick={() =>
                        handleSaveUnitQtyName(editingUnitQtyId, tempUnitQtyName)
                      }
                    >
                      <LucideSave className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"link"}
                      className="group"
                      onClick={() => handleEditingUnitQtyName({})}
                    >
                      <LucideX className="text-gray-500 w-5 group-hover:text-gray-700 transition" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size={"icon"}
                    variant={"link"}
                    onClick={() =>
                      handleEditingUnitQtyName({ id: unit.id, name: unit.name })
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
              {unit.reservations.map(
                (reservation: T_Calendar_Property_Reservation) => {
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
                          unit: unit.name,
                          reservation: reservation,
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

export default PropertyUnitRows
