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
} from "../../types/CalendarTable"
import AddActivityReservationModal from "../AddReservationModal/Activity"
import { useQueryClient } from "@tanstack/react-query"
import ActivityEditPricePerDatesModal from "./ActivityEditPricePerDatesModal"

const ActivitiesCalendarTable = () => {
  const queryClient = useQueryClient()
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()))
  const [filterCalendarDate, setFilterCalendarDate] = useState("")
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({})
  const [selectedReservation, setSelectedReservation] =
    useState<SelectedReservation | null>(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isAddReservationModalOpen, setIsAddReservationModalOpen] =
    useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  //@ts-ignore
  const [filteredData, setFilteredData] = useState<SampleData>(sampleData)
  const [editingRoom, setEditingRoom] = useState<string | null>(null)
  const [tempRoomAbbr, setTempRoomAbbr] = useState<string>("")
  const daysPerPage = 13

  const closeReservationModal = () => setIsReservationModalOpen(false)
  const closeAddReservationModal = () => setIsAddReservationModalOpen(false)
  const [isEditPricePerDatesModalOpen, setIsEditPricePerDatesModalOpen] =
    useState(false)

  const handleOpenActivityEditPricePerDatesModal = (
    date: string,
    category: string
  ) => {
    setIsEditPricePerDatesModalOpen(true)
    setSelectedDate(date)
  }

  const handleOpenAddReservationModal = () => setIsAddReservationModalOpen(true)

  const handleSaveNewReservation = (newReservation: any, reset: Function) => {
    const updatedData = { ...filteredData }
    const category = updatedData?.categories?.filter(
      (category) => category.name === newReservation.category
    )

    //@ts-ignore
    if (category.length > 0) {
      //@ts-ignore
      const selectedCategory = category[0]
      if (selectedCategory) {
        const room = selectedCategory?.rooms?.find(
          (rm) => rm.name === newReservation.room
        )
        if (room) {
          room?.bookings?.push(newReservation)
          setFilteredData(updatedData)
          toast.success("Reservation added successfully")
          reset()
        } else {
          toast.error("Room not found")
        }
      }
    }
    closeAddReservationModal()
  }

  useEffect(() => {
    const filterDataByDate = () => {
      const calendarEnd = addDays(startDate, daysPerPage - 1)
      const newFilteredData = {
        categories: sampleData.categories.map((category) => ({
          ...category,
          rooms: category.rooms.map((room) => ({
            ...room,
            bookings: room.bookings.filter((booking) => {
              const bookingStart = new Date(booking.start_date)
              const bookingEnd = new Date(booking.end_date)
              return !(
                isAfter(bookingStart, calendarEnd) ||
                isBefore(bookingEnd, startDate)
              )
            }),
          })),
        })),
      }
      //@ts-ignore
      setFilteredData(newFilteredData)
    }

    filterDataByDate()
  }, [startDate])

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }))
  }

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
    booking: Booking
  ) => {
    const bookingStart = new Date(booking.start_date)
    const bookingEnd = new Date(booking.end_date)
    const calendarEnd = addDays(startDate, daysPerPage - 1)

    if (isAfter(bookingStart, calendarEnd) || isBefore(bookingEnd, startDate)) {
      return null
    }

    const startOffset = differenceInDays(bookingStart, startDate)
    const endOffset = differenceInDays(bookingEnd, startDate)

    const startCol = Math.max(startOffset, 0)
    const endCol = Math.min(endOffset, daysPerPage - 1)

    const colSpan = endCol - startCol + 1
    return { startCol, colSpan }
  }

  const handleEditRoom = (name: string) => {
    setEditingRoom(name)
    setTempRoomAbbr(name)
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
        room.name = tempRoomAbbr
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
    <div className="w-full mt-4 overflow-hidden rounded-xl border border-b-0">
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
                />
              </td>
              {generateMonthHeader()}
            </tr>
            <tr className="uppercase text-sm leading-normal">
              {generateCalendarHeader()}
            </tr>
          </thead>
          <tbody>
            {filteredData?.categories?.map((category, index) => (
              <React.Fragment key={category.name}>
                <tr
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleCollapse(category.name)}
                >
                  <td className={`border p-4 text-left font-bold border-l-0`}>
                    <span className="flex gap-2 items-center">
                      {!collapsed[category.name] ? (
                        <ChevronRight />
                      ) : (
                        <ChevronDown />
                      )}
                      {category.name}
                    </span>
                  </td>
                  {[...Array(daysPerPage)].map((_, i) => {
                    const today = new Date()
                    const date = format(addDays(startDate, i), "yyyy-MM-dd")

                    const isToday =
                      format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
                    return (
                      <td
                        key={i}
                        className={`border gap-1 hover:bg-gray-200 text-sm p-2 h-max text-center text-gray-500 font-semibold max-w-24 ${i + 1 === daysPerPage && "border-r-0"} ${isToday ? "bg-primary-100" : ""}`}
                      >
                        <div
                          onClick={(e) => {
                            handleOpenActivityEditPricePerDatesModal(
                              date,
                              category.name
                            )
                            e.stopPropagation()
                          }}
                          className="flex flex-col"
                        >
                          <div>${parseFloat(category.price).toFixed(2)}</div>
                        </div>
                      </td>
                    )
                  })}
                </tr>
                {!collapsed[category.name] &&
                  category?.rooms?.map((room, roomIndex) => (
                    <tr key={room.name} className="hover:bg-gray-100 relative">
                      <td className="border p-4 text-left border-l-0">
                        <div className="flex justify-between items-center">
                          {editingRoom === room.name ? (
                            <Input
                              type="text"
                              value={tempRoomAbbr}
                              onChange={(e) => setTempRoomAbbr(e.target.value)}
                              autoFocus
                              className="mr-2"
                              label={""}
                            />
                          ) : (
                            <span>{room.name}</span>
                          )}
                          {editingRoom === room.name ? (
                            <Button
                              size={"icon"}
                              variant={"link"}
                              onClick={() =>
                                handleSaveRoom(category.name, roomIndex)
                              }
                            >
                              <Save className="text-gray-500 w-5" />
                            </Button>
                          ) : (
                            <Button
                              size={"icon"}
                              variant={"link"}
                              onClick={() => handleEditRoom(room.name)}
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
                        {room?.bookings?.map((booking: Booking) => {
                          const style = getBookingStyle(
                            startDate,
                            daysPerPage,
                            booking
                          )
                          if (!style) return null

                          const { startCol, colSpan } = style

                          return (
                            <div
                              key={booking.name}
                              style={{
                                left: `${(startCol * 100) / daysPerPage + 4}%`,
                                width: `${(colSpan * 100) / daysPerPage - 8}%`,
                              }}
                              onClick={() => {
                                setIsReservationModalOpen(true)
                                setSelectedReservation({
                                  room: room.name,
                                  booking: booking,
                                })
                              }}
                              className={`booking-block hover:cursor-pointer flex z-20 ${booking.status === "confirmed" ? "bg-primary-500 hover:bg-primary-700" : booking.status === "out-of-service" ? "bg-red-500 hover:bg-red-600" : booking.status === "checked-in" ? "bg-green-500 hover:bg-green-600" : booking.status === "checked-out" ? "bg-gray-300 hover:bg-gray-400" : booking.status === "blocked-date" ? "bg-gray-500 hover:bg-gray-600" : ""} rounded-xl h-[80%] top-[10%] absolute items-center justify-center`}
                            >
                              <span className="text-white text-sm truncate px-2">
                                {booking.name}
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
      {selectedReservation && (
        <ReservationCalendarModal
          isModalOpen={isReservationModalOpen}
          onClose={closeReservationModal}
          selectedReservation={selectedReservation}
        />
      )}
      <ActivityEditPricePerDatesModal
        isModalOpen={isEditPricePerDatesModalOpen}
        onClose={() => setIsEditPricePerDatesModalOpen(false)}
        selectedDate={selectedDate}
        activityId={"666baa94934b8c2077902404"}
      />
      <AddActivityReservationModal
        isModalOpen={isAddReservationModalOpen}
        onClose={closeAddReservationModal}
      />
    </div>
  )
}

export default ActivitiesCalendarTable
