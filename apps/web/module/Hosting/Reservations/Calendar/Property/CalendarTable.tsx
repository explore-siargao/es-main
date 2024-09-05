import React, { useState, useEffect } from "react"
import {
  format,
  addDays,
  startOfMonth,
  getMonth,
  differenceInDays,
  isAfter,
  isBefore,
} from "date-fns"
import { ChevronDown, ChevronRight, Edit3, Save } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import toast from "react-hot-toast"
import { Button } from "@/common/components/ui/Button"
import Sidebar from "../Sidebar"
import ReservationCalendarModal from "../ReservationCalendarModal"
import RoomQuantityEdit from "../RoomQuantityEdit"
import {
  SelectedReservation,
  SampleData,
  Reservation,
  Room,
  Bed,
  WholePlace,
} from "../../types/CalendarTable"
import AddReservationModal from "../AddReservationModal"
import { Spinner } from "@/common/components/ui/Spinner"
import useGetCalendarProperty from "../hooks/useGetCalendarProperty"

const BedCalendarTable = () => {
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()))
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 11)
  const { data: sampleData, isPending } = useGetCalendarProperty(
    startDate.toLocaleDateString(),
    endDate.toLocaleDateString()
  )

  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({})
  const [selectedReservation, setSelectedReservation] =
    useState<SelectedReservation | null>(null)
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isRoomQuantityEditOpen, setIsRoomQuantityEditOpen] = useState(false)
  const [isAddReservationModalOpen, setIsAddReservationModalOpen] =
    useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  //@ts-ignore
  const [filteredData, setFilteredData] = useState<SampleData>(sampleData)
  const [unitData, setUnitData] = useState<any>()
  const [editingRoom, setEditingRoom] = useState<string | null>(null)
  const [tempRoomAbbr, setTempRoomAbbr] = useState<string>("")
  const [roomQuantity, setRoomQuantity] = useState({
    defaultQuantity: 5,
    customQuantity: [
      {
        date: "2024-06-03",
        quantity: 4,
      },
    ],
  })
  const daysPerPage = 13

  const closeReservationModal = () => setIsReservationModalOpen(false)
  const closeAddReservationModal = () => setIsAddReservationModalOpen(false)
  const closeRoomQuantityEditModal = () => setIsRoomQuantityEditOpen(false)

  const handleOpenRoomQuantityEditModal = (date: string, category: string) => {
    setIsRoomQuantityEditOpen(true)
    setSelectedDate(date)
    setSelectedCategory(category)
  }

  const handleOpenAddReservationModal = () => setIsAddReservationModalOpen(true)

  const handleSaveNewReservation = (newReservation: any, reset: Function) => {
    const updatedData = { ...filteredData }
    const category = updatedData?.items?.filter(
      (category) => category.name === newReservation.category
    )
    //@ts-ignore
    if (category?.length > 0) {
      //@ts-ignore
      const selectedCategory = category[0]
      if (selectedCategory) {
        const bed = selectedCategory?.beds?.find(
          (rm) => rm.abbr === newReservation.bed
        )
        if (bed) {
          bed.reservations.push(newReservation)
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

    const transformUnitType = (unitType: {
      beds: any
      rooms: any
      wholePlaces: any
    }) => {
      const bookableUnits = []

      if (unitType.beds) {
        bookableUnits.push(...transformUnits(unitType.beds))
      }

      if (unitType.rooms) {
        bookableUnits.push(...transformUnits(unitType.rooms))
      }

      if (unitType.wholePlaces) {
        bookableUnits.push(...transformUnits(unitType.wholePlaces))
      }

      return bookableUnits
    }
    
    const transformUnits = (units: any[]) =>
      units.map((unit: { abbr: any; status: any; reservations: any[] }) => ({
        abbr: unit.abbr,
        status: unit.status,
        reservations: unit.reservations.filter(isReservationWithinRange),
      }))

    const filterItems = (items: any[]) =>
      items
        .map((item: { propertyTitle: any; bookableUnitTypes: any[] }) => ({
          name: item.propertyTitle,
          price: 0,
          bookableUnitTypes: item.bookableUnitTypes
            .map(transformUnitType)
            .flat(),
        }))
        .filter(
          (item: { bookableUnitTypes: string | any[] }) =>
            item.bookableUnitTypes.length > 0
        )

    const newFilteredData = {
      items: filterItems(sampleData?.items ?? []),
    }

    setUnitData(newFilteredData)
  }, [startDate, daysPerPage, sampleData?.items, setUnitData])

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }))
  }
  console.log(unitData)
  const generateCalendarHeader = () => {
    const headers = []
    for (let i = 0; i < daysPerPage; i++) {
      const date = addDays(startDate, i)
      headers.push(
        <th
          key={i}
          className={`border p-2 w-24 ${i + 1 === daysPerPage && "border-r-0"}`}
        >
          {format(date, "EEE dd")}
        </th>
      )
    }
    return headers
  }

  const generateCalendarRowBorder = () => {
    const headers = []
    for (let i = 0; i < daysPerPage; i++) {
      headers.push(
        <th
          key={i}
          className={`${i + 1 !== daysPerPage && "border-r"} p-2 w-full max-w-24`}
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
    setStartDate(addDays(startDate, direction))
  }

  const getBookingStyle = (
    startDate: Date,
    daysPerPage: number,
    booking: Reservation
  ) => {
    const bookingStart = new Date(booking.startDate)
    const bookingEnd = new Date(booking.endDate)
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

  const handleEditRoom = (abbr: string) => {
    setEditingRoom(abbr)
    setTempRoomAbbr(abbr)
  }

  const handleSaveRoom = (categoryName: string, bedIndex: number) => {
    const newFilteredData = { ...filteredData }
    const category = newFilteredData?.items?.find(
      (category) => category.name === categoryName
    )
    if (category) {
      //@ts-ignore
      const bed = category?.beds[bedIndex]
      if (bed) {
        bed.abbr = tempRoomAbbr
        setFilteredData(newFilteredData)
        toast.success("Successfully changed room property name")
      } else {
        toast.error("Property room not found in category")
      }
    } else {
      toast.error("Category not found")
    }

    setEditingRoom(null)
  }
  return (
    <div className="w-full mt-4 overflow-hidden rounded-xl border border-b-0">
      {isPending ? (
        <Spinner size="md">Loading...</Spinner>
      ) : (
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
                    />
                  </td>
                  {generateMonthHeader()}
                </tr>
                <tr className="uppercase text-sm leading-normal">
                  {generateCalendarHeader()}
                </tr>
              </thead>
              <tbody>
                {unitData?.items?.map((category: any, index: number) => (
                  <React.Fragment key={category.name}>
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleCollapse(category.name)}
                    >
                      <td
                        className={`border p-4 text-left font-bold border-l-0`}
                      >
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
                        const date = format(addDays(startDate, i), "yyyy-MM-dd")
                        const customQuantity = roomQuantity.customQuantity.find(
                          (item) => item.date === date
                        )
                        return (
                          <td
                            key={i}
                            className={`border gap-1 hover:bg-gray-200 text-sm p-2 h-max text-center text-gray-500 font-semibold max-w-24 ${i + 1 === daysPerPage && "border-r-0"}`}
                          >
                            <div
                              onClick={(e) => {
                                handleOpenRoomQuantityEditModal(
                                  date,
                                  category.name
                                )
                                e.stopPropagation()
                              }}
                              className="flex flex-col"
                            >
                              <div>
                                {customQuantity
                                  ? customQuantity.quantity
                                  : roomQuantity.defaultQuantity}
                              </div>
                              <div>
                                ${parseFloat(category.price).toFixed(2)}
                              </div>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                    {!collapsed[category.name] &&
                      category?.bookableUnitTypes?.map(
                        (bed: Room, bedIndex: number) => (
                          <tr
                            key={bed.abbr}
                            className="hover:bg-gray-100 relative"
                          >
                            <td className="border p-4 text-left border-l-0">
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
                                    onClick={() =>
                                      handleSaveRoom(category.name, bedIndex)
                                    }
                                  >
                                    <Save className="text-gray-500 w-5" />
                                  </Button>
                                ) : (
                                  <Button
                                    size={"icon"}
                                    variant={"link"}
                                    onClick={() => handleEditRoom(bed.abbr)}
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
                              {bed.reservations.map((booking: Reservation) => {
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
                                        beds: bed.abbr,
                                        reservation: booking,
                                      })
                                    }}
                                    className="booking-block hover:cursor-pointer flex z-20 bg-primary-500 hover:bg-primary-700 rounded-xl h-[80%] top-[10%] absolute items-center justify-center"
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
                        )
                      )}
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
          <RoomQuantityEdit
            isModalOpen={isRoomQuantityEditOpen}
            onClose={closeRoomQuantityEditModal}
            selectedDate={selectedDate}
            roomQuantity={roomQuantity}
            setRoomQuantity={setRoomQuantity}
            category={selectedCategory}
          />
          <AddReservationModal
            isModalOpen={isAddReservationModalOpen}
            onClose={closeAddReservationModal}
            onSave={handleSaveNewReservation}
            data={filteredData}
          />
        </div>
      )}
    </div>
  )
}

export default BedCalendarTable
