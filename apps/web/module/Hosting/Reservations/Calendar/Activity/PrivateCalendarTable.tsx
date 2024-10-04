import React, { useState, useEffect } from "react"
import {
  format,
  addDays,
  startOfMonth,
  getMonth,
  differenceInDays,
  isAfter,
  isBefore,
  parse,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from "date-fns"
import sampleData from "./SampleData.json"
import { ChevronDown, ChevronRight, Edit3, Save } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import toast from "react-hot-toast"
import { Button } from "@/common/components/ui/Button"
import Sidebar from "../Sidebar"
import ReservationCalendarModal from "../ReservationCalendarModal"
import {
  SelectedReservation,
  SampleData,
  Booking,
  Reservation,
} from "../../types/CalendarTable"
import AddActivityReservationModal from "../AddReservationModal/Activity"
import { useQueryClient } from "@tanstack/react-query"
import ActivityEditPricePerDatesModal from "./ActivityEditPricePerDatesModal"
import useGetPrivateActivityCalendar from "../hooks/useGetCalendarPrivateActivities"
import { FormProvider, useForm } from "react-hook-form"
import formatDateTZ from "@/common/helpers/formatDateTZ"
import { Spinner } from "@/common/components/ui/Spinner"
import RentalCalendarModal from "../RentalCalendarModal"
import RentalsEditPricePerDatesModal from "../Rental/RentalsEditPricePerDatesModal"
import AddRentalReservationModal from "../AddReservationModal/Rental"
import { getColorClasses } from "../../helpers/legends"

const PrivateCalendarTable = () => {
  const form = useForm()
  const queryClient = useQueryClient()

  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [filterCalendarDate, setFilterCalendarDate] = useState("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] =
    useState<boolean>(false)
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()))
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 13)

  const {
    data: sampleData,
    isLoading,
    refetch,
  } = useGetPrivateActivityCalendar(
    startDate.toLocaleDateString(),
    endDate.toLocaleDateString()
  )

  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({})
  const [selectedReservation, setSelectedReservation] =
    useState<SelectedReservation | null>(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isAddReservationModalOpen, setIsAddReservationModalOpen] =
    useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedRentalId, setSelectedRentalId] = useState<string>()
  //@ts-ignore
  const [filteredData, setFilteredData] = useState<SampleData>(sampleData)
  const [editingRoom, setEditingRoom] = useState<string | null>(null)
  const [tempRoomAbbr, setTempRoomAbbr] = useState<string>("")
  const daysPerPage = 13

  const closeReservationModal = () => setIsReservationModalOpen(false)
  const closeAddReservationModal = () => setIsAddReservationModalOpen(false)
  const [isEditPricePerDatesModalOpen, setIsEditPricePerDatesModalOpen] =
    useState(false)
  const [tempPrivateAbbr, setTempPrivateAbbr] = useState<string>("")
  const [isEditReservation, setIsEditReservation] = useState<boolean>(false)
  const [isCancelReservation, setIsCancelReservation] = useState<boolean>(false)
  const [searchString, setSearchString] = useState("")

  const handleOpenActivityEditPricePerDatesModal = (
    date: string,
    category: string
  ) => {
    setIsEditPricePerDatesModalOpen(true)
    setSelectedDate(date)
  }

  const handleOpenAddReservationModal = () => setIsAddReservationModalOpen(true)
  
  useEffect(() => {
    const calendarEnd = addDays(startDate, daysPerPage - 1)

    const isReservationWithinRange = (reservation: {
      startDate: string | number | Date
      endDate: string | number | Date
    }) => {
      const bookingStart = new Date(reservation.startDate)
      const bookingEnd = new Date(reservation.endDate)
      return !(
        isAfter(bookingStart, calendarEnd) || isBefore(bookingEnd, startDate)
      )
    }

    const filterReservations = (reservations: any[]) =>
      reservations.filter(isReservationWithinRange)

    const filterPrivateActivities = (activities: any[]) =>
      activities
        .map((privateActivities: { reservations: any; abbr: string }) => ({
          ...privateActivities,
          reservations: filterReservations(privateActivities.reservations),
        }))
        .filter(
          (privateActivity: { abbr: string }) =>
            !searchString ||
            privateActivity.abbr.toLowerCase().includes(searchString.toLowerCase())
        )

    const filterCategories = (categories: any[]) =>
      categories
        .map((category: { privateActivities: any }) => ({
          ...category,
          privateActivities: filterPrivateActivities(category.privateActivities),
        }))
        .filter(
          (category: { privateActivities: string | any[] }) => category.privateActivities.length > 0
        )

    const newFilteredData = {
      items: filterCategories(sampleData?.items ?? []),
    }

    if (newFilteredData.items.length > 0) {
      setFilteredData(newFilteredData as unknown as SampleData)
    } else if (searchString && newFilteredData.items.length == 0) {
      toast.error(`No matched results for "${searchString}"`)
      setSearchString("")
    }
  }, [startDate, daysPerPage, sampleData?.items, searchString, setFilteredData])

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }))
  }
  console.log(filteredData)
  const generateCalendarHeader = () => {
    const headers = []
    const today = new Date() // Get today's date
    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i)
      const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd") // Check if it's today

      headers.push(
        <th
          key={i}
          className={`border p-2 w-24 ${
            i + 1 === daysPerPage && "border-r-0"
          } ${isToday ? "bg-primary-100" : ""}`} // Apply highlight if it's today
        >
          {format(date, "EEE dd")}
        </th>
      )
    }
    return headers
  }

  useEffect(() => {
    if (filterCalendarDate !== "") {
      const parsedDate = parse(filterCalendarDate, "yyyy-MM-dd", new Date())
      setStartDate(addDays(parsedDate, -4))
      queryClient.invalidateQueries({
        queryKey: ["calendar-property"],
      })
    } else {
      setStartDate(addDays(new Date(), -4))
      queryClient.invalidateQueries({
        queryKey: ["calendar-property"],
      })
    }
  }, [filterCalendarDate])

  const generateCalendarRowBorder = () => {
    const headers = []
    const today = new Date()
    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i)
      const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      headers.push(
        <th
          key={i}
          className={`${i + 1 !== daysPerPage && "border-r"} p-2 w-full max-w-24 ${isToday ? "bg-primary-100" : ""}`}
        ></th>
      )
    }
    return headers
  }

  const generateMonthHeader = () => {
    const headers = []
    let currentMonth = getMonth(startDate)
    let colspan = 0

    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i)
      const month = getMonth(date)
      if (month === currentMonth) {
        colspan++
      } else {
        headers.push(
          <td
            key={i}
            colSpan={colspan}
            className="border border-t-0 border-r-0 text-lg py-2 font-bold text-center"
          >
            {format(addDays(startDate, i - colspan), "MMMM yyyy")}
          </td>
        )
        currentMonth = month
        colspan = 1
      }
    }
    headers.push(
      <td
        key="last"
        colSpan={colspan}
        className="border border-t-0 border-r-0 text-lg py-2 font-bold text-center"
      >
        {format(addDays(startDate, daysPerPage - colspan), "MMMM yyyy")}
      </td>
    )

    return headers
  }

  const moveStartDateByOneDay = (direction: number) => {
    setStartDate((prevDate) => addDays(prevDate, direction))
    queryClient.invalidateQueries({
      queryKey: ["calendar-property"],
    })
  }

  const resetToToday = () => {
    if (filterCalendarDate !== "") {
      const parsedDate = parse(filterCalendarDate, "yyyy-MM-dd", new Date())
      setStartDate(addDays(parsedDate, -4))
      queryClient.invalidateQueries({
        queryKey: ["calendar-property"],
      })
    } else {
      setStartDate(addDays(new Date(), -4))
      queryClient.invalidateQueries({
        queryKey: ["calendar-property"],
      })
    }
  }

  const getBookingStyle = (
    startDate: Date,
    daysPerPage: number,
    booking: Reservation
  ) => {
    const bookingStart = new Date(booking.startDate)
    const bookingEnd = new Date(booking.endDate)
    const calendarEnd = addDays(startDate, daysPerPage - 1)

    if (
      isAfter(bookingStart, calendarEnd) ||
      isBefore(bookingEnd, addDays(startDate, -1))
    ) {
      return null
    }

    const startOffset = isBefore(bookingStart, addDays(startDate, -1))
      ? differenceInDays(bookingStart, addDays(startDate, -1)) - 0.5
      : differenceInDays(bookingStart, addDays(startDate, -1))
    const endOffset = differenceInDays(bookingEnd, addDays(startDate, -1))
    const startCol = Math.max(startOffset, -0.5)
    const endCol = Math.min(endOffset, daysPerPage - 0.5)

    const colSpan = endCol - startCol + 1
    return { startCol, colSpan }
  }

  const handleEditRoom = (abbr: string) => {
    setEditingRoom(abbr)
    setTempRoomAbbr(abbr)
  }

  const handleSaveRoom = (categoryName: string, roomIndex: number) => {
    const newFilteredData = { ...filteredData }
    const category = newFilteredData?.categories?.find(
      (category) => category.name === categoryName
    )

    if (category) {
      //@ts-ignore
      const room = category?.rooms[roomIndex]
      if (room) {
        room.abbr = tempRoomAbbr
        setFilteredData(newFilteredData)
        toast.success("Successfully changed activity name")
      } else {
        toast.error("Activity not found in category")
      }
    } else {
      toast.error("Activity not found")
    }

    setEditingRoom(null)
  }

  return (
    <>
    {isLoading ? (
      <div className="flex w-full h-[75vh] overflow-hidden justify-center items-center overflow-y-hidden">
        <Spinner variant={"primary"} />
      </div>
    ) : (
      <div className="w-full mt-4 overflow-hidden rounded-xl border border-b-0">
        <div>
          <div className="overflow-auto">
            <table className="min-w-max w-full rounded-xl">
              <thead className="">
                <tr className="uppercase text-sm leading-normal">
                  <td colSpan={1} rowSpan={2} className="">
                    <Sidebar
                      nextPrevFunction={moveStartDateByOneDay}
                      //@ts-ignore
                      openAddReservationModal={handleOpenAddReservationModal}
                      filterCalendarDate={filterCalendarDate}
                      setFilterCalendarDate={setFilterCalendarDate}
                      resetToToday={resetToToday}
                      searchString={searchString}
                      setSearchString={setSearchString}
                    />
                  </td>
                  {generateMonthHeader()}
                </tr>
                <tr className="uppercase text-sm leading-normal">
                  {generateCalendarHeader()}
                </tr>
              </thead>
              <tbody>
                {filteredData?.items?.map((category, index) => (
                  <React.Fragment key={category.name}>
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleCollapse(category.name)}
                    >
                      <td
                        className={`border p-4 text-left font-bold border-l-0`}
                      >
                        <span className="flex gap-2 items-center">
                          {collapsed[category.name] ? (
                            <ChevronRight />
                          ) : (
                            <ChevronDown />
                          )}
                          {category.name}
                        </span>
                      </td>
                      {[...Array(daysPerPage)].map((_, i) => {
                        const today = new Date()
                        const date = format(
                          addDays(startDate, i),
                          "yyyy-MM-dd"
                        )
                        const isToday =
                          format(date, "yyyy-MM-dd") ===
                          format(today, "yyyy-MM-dd")
                        const noReservationCount = category?.privateActivities?.reduce(
                          (count, privateActivity) => {
                            const hasReservation = privateActivity.reservations.some(
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
                        )
                        return (
                          <td
                            key={i}
                            className={`border gap-1 hover:bg-gray-200 text-sm p-2 h-max text-center text-gray-500 font-semibold max-w-24 ${i + 1 === daysPerPage && "border-r-0"} ${isToday && "bg-primary-100"}`}
                          >
                            <div
                              onClick={(e) => {
                                handleOpenActivityEditPricePerDatesModal(
                                  date,
                                  category.id
                                )
                                e.stopPropagation()
                              }}
                              className="flex flex-col"
                            >
                              <div>{noReservationCount}</div>
                              <div>
                                &#8369;
                                {category.pricePerDates?.length === 0
                                  ? parseFloat(`${category.price}`).toFixed(2)
                                  : category.pricePerDates?.find((item) => {
                                        const itemFromDate = formatDateTZ(
                                          startOfDay(item.fromDate)
                                        )
                                        const itemToDate = formatDateTZ(
                                          endOfDay(item.toDate)
                                        )
                                        const currentDate = formatDateTZ(
                                          startOfDay(date)
                                        )
                                        return isWithinInterval(currentDate, {
                                          start: itemFromDate,
                                          end: itemToDate,
                                        })
                                      })?.price
                                    ? parseFloat(
                                        category.pricePerDates.find(
                                          (item: any) => {
                                            const itemFromDate = formatDateTZ(
                                              startOfDay(item.fromDate)
                                            )
                                            const itemToDate = formatDateTZ(
                                              endOfDay(item.toDate)
                                            )
                                            const currentDate = formatDateTZ(
                                              startOfDay(date)
                                            )
                                            return isWithinInterval(
                                              currentDate,
                                              {
                                                start: itemFromDate,
                                                end: itemToDate,
                                              }
                                            )
                                          }
                                        ).price.dayRate
                                      ).toFixed(2)
                                    : parseFloat(`${category.price}`).toFixed(
                                        2
                                      )}
                              </div>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                    {!collapsed[category.name] &&
                      category?.privateActivities?.map((privateActivity, privateActivityIndex) => (
                        <tr
                          key={privateActivity.abbr}
                          className="hover:bg-gray-100 relative"
                        >
                          <td className="border py-4 pr-4 pl-12 text-left border-l-0">
                            <div className="flex justify-between items-center">
                              {editingRoom === privateActivity.abbr ? (
                                <Input
                                  type="text"
                                  value={tempPrivateAbbr}
                                  onChange={(e) =>
                                    setTempPrivateAbbr(e.target.value)
                                  }
                                  autoFocus
                                  className="mr-2"
                                  label={""}
                                />
                              ) : (
                                <span>{privateActivity.abbr}</span>
                              )}
                              {editingRoom === privateActivity.abbr ? (
                                <Button
                                  size={"icon"}
                                  variant={"link"}
                                  onClick={() =>
                                    handleSaveRoom(category.name, privateActivityIndex)
                                  }
                                >
                                  <Save className="text-gray-500 w-5" />
                                </Button>
                              ) : (
                                <Button
                                  size={"icon"}
                                  variant={"link"}
                                  onClick={() => handleEditRoom(privateActivity.abbr)}
                                >
                                  <Edit3 className="text-gray-500 w-5" />
                                </Button>
                              )}
                            </div>
                          </td>
                          <td
                            colSpan={daysPerPage}
                            className={`border text-center relative ${index + 1 !== daysPerPage && "border-r-0"}`}
                          >
                            {privateActivity.reservations.map((booking: Reservation) => {
                              const style = getBookingStyle(
                                startDate,
                                daysPerPage,
                                booking
                              )
                              if (!style) return null

                              const { startCol, colSpan } = style
                              const { colorClass, hoverColorClass } =
                                getColorClasses(booking.status)

                              return (
                                <div
                                  key={booking.id}
                                  style={{
                                    left: `${(startCol * 100) / daysPerPage + 4}%`,
                                    width: `${(colSpan * 100) / daysPerPage - 8}%`,
                                  }}
                                  onClick={() => {
                                    setIsReservationModalOpen(true)
                                    setSelectedReservation({
                                      activities: privateActivity.abbr,
                                      reservation: booking,
                                    })
                                  }}
                                  className={`booking-block hover:cursor-pointer flex z-20 ${colorClass} ${hoverColorClass} rounded-xl h-[80%] top-[10%] absolute items-center justify-center`}
                                >
                                  <span className="text-white text-sm truncate px-2">
                                    {booking.status === "Out-of-Service-Dates"
                                      ? "Out of service"
                                      : booking.name}
                                  </span>
                                </div>
                              )
                            })}
                            <div className="absolute inset-0 z-10 flex h-full">
                              {generateCalendarRowBorder()}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <FormProvider {...form}>
            <form>
              {selectedReservation && (
                <RentalCalendarModal
                  isModalOpen={isReservationModalOpen}
                  onClose={closeReservationModal}
                  selectedReservation={selectedReservation}
                  isEditReservation={isEditReservation}
                  isCancelReservation={isCancelReservation}
                  setIsCancelReservation={setIsCancelReservation}
                  setIsEditReservation={setIsEditReservation}
                />
              )}
            </form>
          </FormProvider>

          <RentalsEditPricePerDatesModal
            isModalOpen={isEditPricePerDatesModalOpen}
            onClose={() => setIsEditPricePerDatesModalOpen(false)}
            selectedDate={selectedDate}
            rentalId={selectedRentalId}
          />
          <FormProvider {...form}>
            <form>
              <AddRentalReservationModal
                isModalOpen={isAddReservationModalOpen}
                onClose={closeAddReservationModal}
                selectedLegendType={selectedLegendType}
                setSelectedLegendType={setSelectedLegendType}
                setIsLegendTypeSelected={setIsLegendTypeSelected}
                isLegendTypeSelected={isLegendTypeSelected}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    )}
  </>
  )
}

export default PrivateCalendarTable
