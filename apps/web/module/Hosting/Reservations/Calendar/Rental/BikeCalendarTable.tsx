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
import { ChevronDown, ChevronRight, Edit3, Save } from "lucide-react"
import { Input } from "@/common/components/ui/Input"
import toast from "react-hot-toast"
import { Button } from "@/common/components/ui/Button"
import Sidebar from "../Sidebar"
import RoomQuantityEdit from "../RoomQuantityEdit"
import {
  SelectedReservation,
  SampleData,
  Reservation,
} from "../../types/CalendarTable"
import { Spinner } from "@/common/components/ui/Spinner"
import useGetCalendarBike from "../hooks/useGetCalendarBike"
import useUpdateVehicleName from "../hooks/useUpdateVehicleName"
import { getColorClasses } from "../../helpers/legends"
import { useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm } from "react-hook-form"
import AddRentalReservationModal from "../AddReservationModal/Rental"
import RentalCalendarModal from "../RentalCalendarModal"

const BikeCalendarTable = () => {
  const form = useForm()
  const [selectedLegendType, setSelectedLegendType] = useState<string>("")
  const [isLegendTypeSelected, setIsLegendTypeSelected] =
    useState<boolean>(false)
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()))
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 13)
  const { data: sampleData, isLoading } = useGetCalendarBike(
    startDate.toLocaleDateString(),
    endDate.toLocaleDateString()
  )
  const { mutate } = useUpdateVehicleName()
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
  const [editingRoom, setEditingRoom] = useState<string | null>(null)
  const [tempBikeAbbr, setTempBikeAbbr] = useState<string>("")
  const [roomQuantity, setRoomQuantity] = useState({
    defaultQuantity: 5,
    customQuantity: [
      {
        date: "2024-06-03",
        quantity: 4,
      },
    ],
  })

  const [isEditReservation, setIsEditReservation] = useState<boolean>(false)
  const daysPerPage = 13
  const queryClient = useQueryClient()
  const closeReservationModal = () => setIsReservationModalOpen(false)
  const closeRoomQuantityEditModal = () => setIsRoomQuantityEditOpen(false)

  const handleOpenRoomQuantityEditModal = (date: string, category: string) => {
    setIsRoomQuantityEditOpen(true)
    setSelectedDate(date)
    setSelectedCategory(category)
  }

  const handleOpenAddReservationModal = () => setIsAddReservationModalOpen(true)
  const closeAddReservationModal = () => {
    setIsAddReservationModalOpen(false)
    setTimeout(() => {
      form.setValue("status", "")
      setSelectedLegendType("")
      setIsLegendTypeSelected(false)
      form.reset()
    }, 200)
  }
  const [filterCalendarDate, setFilterCalendarDate] = useState("")

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

    const filterBicycles = (bicycles: any[]) =>
      bicycles.map((bicycles: { reservations: any }) => ({
        ...bicycles,
        reservations: filterReservations(bicycles.reservations),
      }))

    const filterCategories = (categories: any[]) =>
      categories
        .map((category: { bicycles: any }) => ({
          ...category,
          bicycles: filterBicycles(category.bicycles),
        }))
        .filter(
          (category: { bicycles: string | any[] }) =>
            category.bicycles.length > 0
        )

    const newFilteredData = {
      items: filterCategories(sampleData?.items ?? []),
    }
    //@ts-ignore
    setFilteredData(newFilteredData)
  }, [startDate, daysPerPage, sampleData?.items, setFilteredData])

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }))
  }

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
    queryClient.invalidateQueries({
      queryKey: ["calendar-bike"],
    })
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
    setTempBikeAbbr(abbr)
  }

  const handleSaveRoom = (categoryName: string, bikeIndex: number) => {
    const newFilteredData = { ...filteredData }
    const category = newFilteredData?.items?.find(
      (category) => category.name === categoryName
    )

    if (category) {
      //@ts-ignore
      const bicycle = category?.bicycles[bikeIndex]
      if (bicycle) {
        bicycle.abbr = tempBikeAbbr
        setFilteredData(newFilteredData)
        toast.success("Successfully changed rental vehicle name")
      } else {
        toast.error("Rental vehicle not found in category")
      }
    } else {
      toast.error("Category not found")
    }

    setEditingRoom(null)
  }

  const handleSaveVehicle = (categoryName: string, bikeIndex: number) => {
    const newFilteredData = { ...filteredData }
    const category = newFilteredData?.items?.find(
      (category) => category.name === categoryName
    )
    console.log(category)
    if (category) {
      //@ts-ignore
      const bicycle = category?.bicycles[bikeIndex]
      console.log(bicycle)
      if (bicycle) {
        mutate({ id: bicycle.id, name: tempBikeAbbr })
        bicycle.abbr = tempBikeAbbr
        setFilteredData(newFilteredData)
        toast.success("Successfully changed rental vehicle name")
      } else {
        toast.error("Rental vehicle not found in category")
      }
    } else {
      toast.error("Category not found")
    }

    setEditingRoom(null)
  }
  useEffect(() => {
    if (filterCalendarDate !== "") {
      queryClient.invalidateQueries({
        queryKey: ["calendar-bike"],
      })
      const parsedDate = parse(filterCalendarDate, "yyyy-MM-dd", new Date())
      setStartDate(addDays(parsedDate, -4))
    } else {
      queryClient.invalidateQueries({
        queryKey: ["calendar-bike"],
      })
      setStartDate(addDays(new Date(), -4))
    }
  }, [filterCalendarDate])

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
                          const date = format(
                            addDays(startDate, i),
                            "yyyy-MM-dd"
                          )
                          const noReservationCount = category?.bicycles?.reduce(
                            (count, bicycle) => {
                              const hasReservation = bicycle.reservations.some(
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
                                <div>{noReservationCount}</div>
                                <div>
                                  ${parseFloat(category.price).toFixed(2)}
                                </div>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                      {!collapsed[category.name] &&
                        category?.bicycles?.map((bicycle, bikeIndex) => (
                          <tr
                            key={bicycle.abbr}
                            className="hover:bg-gray-100 relative"
                          >
                            <td className="border py-4 pr-4 pl-12 text-left border-l-0">
                              <div className="flex justify-between items-center">
                                {editingRoom === bicycle.abbr ? (
                                  <Input
                                    type="text"
                                    value={tempBikeAbbr}
                                    onChange={(e) =>
                                      setTempBikeAbbr(e.target.value)
                                    }
                                    autoFocus
                                    className="mr-2"
                                    label={""}
                                  />
                                ) : (
                                  <span>{bicycle.abbr}</span>
                                )}
                                {editingRoom === bicycle.abbr ? (
                                  <Button
                                    size={"icon"}
                                    variant={"link"}
                                    onClick={() =>
                                      //@ts-ignore
                                      handleSaveVehicle(
                                        category.name,
                                        bikeIndex,
                                        // @ts-ignore
                                        category?.bicycles[bikeIndex]?.id
                                      )
                                    }
                                  >
                                    <Save className="text-gray-500 w-5" />
                                  </Button>
                                ) : (
                                  <Button
                                    size={"icon"}
                                    variant={"link"}
                                    onClick={() => handleEditRoom(bicycle.abbr)}
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
                              {bicycle.reservations.map(
                                (booking: Reservation) => {
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
                                      key={booking.name}
                                      style={{
                                        left: `${(startCol * 100) / daysPerPage + 4}%`,
                                        width: `${(colSpan * 100) / daysPerPage - 8}%`,
                                      }}
                                      onClick={() => {
                                        setIsReservationModalOpen(true)
                                        setSelectedReservation({
                                          bicyles: bicycle.abbr,
                                          reservation: booking,
                                        })
                                      }}
                                      className={`booking-block hover:cursor-pointer flex z-20 ${colorClass} ${hoverColorClass} rounded-xl h-[80%] top-[10%] absolute items-center justify-center`}
                                    >
                                      <span className="text-white text-sm truncate px-2">
                                        {booking.name}
                                      </span>
                                    </div>
                                  )
                                }
                              )}
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
                    setIsEditReservation={setIsEditReservation}
                  />
                )}
              </form>
            </FormProvider>
            <RoomQuantityEdit
              isModalOpen={isRoomQuantityEditOpen}
              onClose={closeRoomQuantityEditModal}
              selectedDate={selectedDate}
              roomQuantity={roomQuantity}
              setRoomQuantity={setRoomQuantity}
              category={selectedCategory}
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

export default BikeCalendarTable
