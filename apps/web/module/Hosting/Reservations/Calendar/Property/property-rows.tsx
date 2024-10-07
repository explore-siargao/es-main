import React from "react"
import {
  format,
  addDays,
  isWithinInterval,
  startOfDay,
  endOfDay,
  isSameDay,
} from "date-fns"
import { ChevronDown, ChevronRight } from "lucide-react"
import { TZDate } from "@date-fns/tz"
import PropertyUnitRows from "./property-unit-rows"
import { useCalendarStore } from "./stores/use-calendar-store"

const PropertyRows = () => {
  const {
    startDate,
    daysPerPage,
    collapsed,
    unitData,
    setCollapsed,
    setIsEditPricePerDatesModalOpen,
    setSelectedDate,
    setSelectedUnitId,
  } = useCalendarStore((state) => state)
  const toggleCollapse = (category: string) => {
    setCollapsed({ ...collapsed, [category]: !collapsed[category] })
  }
  const handleOpenPricePerDatesModal = (date: string, category: string) => {
    setIsEditPricePerDatesModalOpen(true)
    setSelectedDate(date)
    setSelectedUnitId(category)
  }
  return (
    <>
      {unitData?.items?.map((category: any, index: number) => (
        <React.Fragment key={category.name}>
          {category.bookableUnitTypes.map((unitType: any) => (
            <React.Fragment key={unitType.unitType}>
              <tr
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleCollapse(unitType.unitType)}
              >
                <td className={`border p-4 text-left font-bold border-l-0`}>
                  <span className="flex gap-2 items-center">
                    {collapsed[unitType.unitType] ? (
                      <ChevronRight />
                    ) : (
                      <ChevronDown />
                    )}
                    {`${unitType.unitType} (${category.name})`}
                  </span>
                </td>
                {[...Array(daysPerPage)].map((_, i) => {
                  const today = new Date()
                  const date = format(addDays(startDate, i), "yyyy-MM-dd")
                  const isToday = isSameDay(date, today)
                  const noReservationCount =
                    unitType?.units?.reduce(
                      (count: number, unit: { reservations: any[] }) => {
                        const hasReservation = unit.reservations.some(
                          (reservation) => {
                            const reservationStart = format(
                              new Date(reservation.startDate),
                              "yyyy-MM-dd"
                            )
                            const reservationEnd = format(
                              new Date(reservation.endDate),
                              "yyyy-MM-dd"
                            )
                            return (
                              date >= reservationStart && date <= reservationEnd
                            )
                          }
                        )
                        return count + (hasReservation ? 0 : 1)
                      },
                      0
                    ) || 0

                  return (
                    <td
                      key={i}
                      className={`border gap-1 hover:bg-gray-200 text-sm p-2 h-max text-center text-gray-500 font-semibold max-w-24 ${i + 1 === daysPerPage && "border-r-0"} ${isToday && "bg-primary-100"}`}
                    >
                      <div
                        onClick={(e) => {
                          handleOpenPricePerDatesModal(date, unitType.id)
                          console.log(category.bookableUnitTypes)
                          e.stopPropagation()
                        }}
                        className="flex flex-col"
                      >
                        <div>{noReservationCount}</div>
                        <div>
                          &#8369;
                          {unitType.pricePerDates?.length === 0
                            ? parseFloat(`${unitType.price}`).toFixed(2)
                            : unitType.pricePerDates?.find((item: any) => {
                                  const itemFromDate = new TZDate(
                                    startOfDay(item.fromDate),
                                    "Asia/Manila"
                                  )
                                  const itemToDate = new TZDate(
                                    endOfDay(item.toDate),
                                    "Asia/Manila"
                                  )
                                  const currentDate = new TZDate(
                                    startOfDay(date),
                                    "Asia/Manila"
                                  )
                                  return isWithinInterval(currentDate, {
                                    start: itemFromDate,
                                    end: itemToDate,
                                  })
                                })?.price
                              ? parseFloat(
                                  unitType.pricePerDates.find((item: any) => {
                                    const itemFromDate = new TZDate(
                                      startOfDay(item.fromDate),
                                      "Asia/Manila"
                                    )
                                    const itemToDate = new TZDate(
                                      endOfDay(item.toDate),
                                      "Asia/Manila"
                                    )
                                    const currentDate = new TZDate(
                                      startOfDay(date),
                                      "Asia/Manila"
                                    )
                                    return isWithinInterval(currentDate, {
                                      start: itemFromDate,
                                      end: itemToDate,
                                    })
                                  }).price.baseRate
                                ).toFixed(2)
                              : parseFloat(`${unitType.price}`).toFixed(2)}
                        </div>
                      </div>
                    </td>
                  )
                })}
              </tr>
              {/* Sub Category (Units) */}
              <PropertyUnitRows unitType={unitType} unitIndex={index} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </>
  )
}

export default PropertyRows
