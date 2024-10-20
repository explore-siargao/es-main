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
import {
  T_Calendar_Property,
  T_Calendar_Property_Unit_Group,
  T_Calendar_Property_Date_Price,
  T_Calendar_Property_Reservation,
} from "@repo/contract"

const PropertyRows = () => {
  const {
    startDate,
    daysPerPage,
    collapsed,
    propertyData,
    setCollapsed,
    setIsEditPricePerDatesModalOpen,
    setSelectedDate,
    setSelectedUnitId,
  } = useCalendarStore((state) => state)
  const toggleCollapse = (unitGroupId: string) => {
    setCollapsed({ ...collapsed, [unitGroupId]: !collapsed[unitGroupId] })
  }
  const handleOpenPricePerDatesModal = (date: string, unitGroupId: string) => {
    setIsEditPricePerDatesModalOpen(true)
    setSelectedDate(date)
    setSelectedUnitId(unitGroupId)
  }
  return (
    <>
      {propertyData?.map((property: T_Calendar_Property, index: number) => (
        <React.Fragment key={property.propertyTitle}>
          {property.bookableUnitTypes.map(
            (unitGroup: T_Calendar_Property_Unit_Group) => (
              <React.Fragment key={unitGroup.name}>
                <tr
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleCollapse(unitGroup.id)}
                >
                  <td className={`border p-4 text-left font-bold border-l-0`}>
                    <span className="flex gap-2 items-center">
                      {collapsed[unitGroup.name] ? (
                        <ChevronRight />
                      ) : (
                        <ChevronDown />
                      )}
                      {`${unitGroup.name} (${property.propertyTitle})`}
                    </span>
                  </td>
                  {[...Array(daysPerPage)].map((_, i) => {
                    const today = new Date()
                    const date = format(addDays(startDate, i), "yyyy-MM-dd")
                    const isToday = isSameDay(date, today)
                    const noReservationCount =
                      unitGroup.units?.reduce(
                        (
                          count: number,
                          unit: {
                            reservations: T_Calendar_Property_Reservation[]
                          }
                        ) => {
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
                                date >= reservationStart &&
                                date <= reservationEnd
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
                            handleOpenPricePerDatesModal(date, unitGroup.id)
                            e.stopPropagation()
                          }}
                          className="flex flex-col"
                        >
                          <div>{noReservationCount}</div>
                          <div>
                            &#8369;
                            {unitGroup.pricePerDates?.length === 0
                              ? parseFloat(`${unitGroup.price}`).toFixed(2)
                              : unitGroup.pricePerDates?.find(
                                    (item: T_Calendar_Property_Date_Price) => {
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
                                    }
                                  )?.price
                                ? unitGroup.pricePerDates
                                    ?.find(
                                      (
                                        item: T_Calendar_Property_Date_Price
                                      ) => {
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
                                      }
                                    )
                                    ?.price?.baseRate.toFixed(2)
                                : parseFloat(`${unitGroup.price}`).toFixed(2)}
                          </div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
                {/* Sub Category (Units) */}
                <PropertyUnitRows unitGroup={unitGroup} unitIndex={index} />
              </React.Fragment>
            )
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default PropertyRows
