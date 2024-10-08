"use client"
import PesoSign from "@/common/components/PesoSign"
import { Button } from "@/common/components/ui/Button"
import formatCurrency from "@/common/helpers/formatCurrency"
import { ChangeEvent, useEffect, useState } from "react"
import useCheckInOutDateStore from "@/module/Listing/Property/store/useCheckInOutDateStore"
import Asterisk from "@/common/components/ui/Asterisk"
import { format } from "date-fns"
import { useParams, useRouter } from "next/navigation"
import useGuestAdd from "@/module/Listing/Property/store/useGuestsStore"
import { APP_NAME } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"
import CheckoutBreakdownModal from "@/module/Listing/Property/components/modals/CheckoutBreakdownModal"
import CheckInOutModal from "@/module/Listing/Property/components/modals/CheckInOutModal"
import CheckoutMoreInfoModal from "@/module/Listing/Property/components/modals/CheckoutMoreInfoModal"
import GuestAddModal from "@/module/Listing/Property/components/modals/GuestAddModal"
import { Option, Select } from "@/common/components/ui/Select"
import { RadioInput } from "@/module/Hosting/Listings/Activities/Activity/Inclusions"
import ScheduleDateModal from "./ScheduleDataModal"

interface ICheckout {
  id?: number
  serviceFee: number
  durationCost: number
  descTotalBeforeTaxes: number
  totalBeforeTaxes: number
  titlePrice: number
  pricePerAdditionalPerson: number
}

interface CheckoutProcessProps {
  checkoutDesc: ICheckout
  timeSlot: any
}

const CheckoutBox = ({ checkoutDesc, timeSlot }: CheckoutProcessProps) => {
  const router = useRouter()
  const params = useParams<{ listingId: string }>()
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [checkInOutCalendarModalIsOpen, setCheckInOutCalendarModalIsOpen] =
    useState(false)
  const dateRange = useCheckInOutDateStore((state) => state.dateRange)
  const [bookType, setBookType] = useState<string>("")
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const [selectedTime, setSelectedTime] = useState<string | number | null>(null)
  const totalGuest = adults + children + infants

  let filteredTimeSlots = []
  if (dateRange.from) {
    if (Array.isArray(timeSlot)) {
      const slot = timeSlot.find((slot: { date: Date }) => {
        const slotDate = new Date(slot.date)
        dateRange?.from?.setHours(0, 0, 0, 0)
        const fromDateStr = dateRange?.from?.toISOString().slice(0, 10)
        const slotDateStr = slotDate.toISOString().slice(0, 10)
        return slotDateStr === fromDateStr
      })

      filteredTimeSlots =
        slot?.slots?.filter(
          (slot: {
            bookType: string
            maxCapacity: number
            availableSlotPerson: number
          }) => {
            if (bookType === "Private") {
              return slot.bookType !== "Private" && slot.bookType !== "Joiner"
            } else if (bookType === "Joiner") {
              return (
                slot.bookType !== "Private" &&
                (slot.availableSlotPerson > 0 || !slot.availableSlotPerson)
              )
            } else {
              return true
            }
          }
        ) || []
    }
  }

  const maximumCapacity = filteredTimeSlots.find(
    (slot: { id: string }) => slot.id === selectedTime
  )?.maxCapacity

  const availableSlotPerson = filteredTimeSlots.find(
    (slot: { id: string }) => slot.id === selectedTime
  )?.availableSlotPerson

  useEffect(() => {
    setSelectedTime(null)
  }, [dateRange])

  return (
    <div className="border rounded-xl shadow-lg px-6 pb-6 pt-5 flex flex-col divide-text-100 overflow-y-auto mb-5">
      <Typography variant="h2" fontWeight="semibold" className="mb-4">
        {formatCurrency(checkoutDesc.titlePrice, "Philippines")}
        <small className="font-light"> person</small>
      </Typography>
      <div className="font-semibold grid grid-cols-1 gap-3 w-full">
        <div className="flex space-x-2 my-2">
          <RadioInput
            id="bookType"
            value="joiners"
            label="Joiner"
            checked={bookType === "Joiner"}
            onChange={() => setBookType("Joiner")}
          />
          <RadioInput
            id="bookType"
            value="private"
            label="Private"
            checked={bookType === "Private"}
            onChange={() => setBookType("Private")}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
            onClick={() =>
              bookType ? setCheckInOutCalendarModalIsOpen(true) : null
            }
          >
            <label
              htmlFor="check-in"
              className="block text-xs font-medium text-text-900 hover:cursor-pointer"
            >
              Date <Asterisk />
            </label>
            <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
              {dateRange.from
                ? format(dateRange.from, "MM/dd/yyyy")
                : "Add date"}
            </span>
          </div>

          <Select
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSelectedTime(event.target.value)
            }
            disabled={!bookType}
            label={`Start time *`}
          >
            {selectedTime ? null : (
              <Option key="__empty__" value="">
                Select start time
              </Option>
            )}

            {filteredTimeSlots.map((timeSlot: any) => (
              <Option key={timeSlot.id} value={timeSlot.id}>
                {timeSlot.time}
              </Option>
            ))}
          </Select>
        </div>
        <div
          className="relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-text-200 focus-within:z-10 focus-within:ring-2 focus-within:ring-text-600 hover:cursor-pointer"
          onClick={() => (selectedTime ? setIsGuestsModalOpen(true) : null)}
        >
          <label
            htmlFor="checkout"
            className="block text-xs font-medium text-text-900 hover:cursor-pointer"
          >
            Guests <Asterisk />
          </label>
          <span className="block w-full border-0 p-0 text-text-900 placeholder:text-text-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent disabled:opacity-50">
            {`${totalGuest} guest${totalGuest > 1 ? "s" : ""}`}
          </span>
        </div>

        <Button
          variant="primary"
          onClick={() =>
            router.push(`/accommodation/${params.listingId}/checkout`)
          }
        >
          Book Now
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <Button
            variant={"ghost"}
            className="underline pl-0"
            onClick={() => setIsMoreInfoModalOpen(true)}
          >
            {APP_NAME} service fee
          </Button>
          <div>{formatCurrency(checkoutDesc.serviceFee, "Philippines")}</div>
        </div>
        {totalGuest > maximumCapacity ? (
          <div className="flex justify-between items-center mt-2">
            <Button
              variant={"ghost"}
              className="underline pl-0"
              onClick={() => setIsMoreInfoModalOpen(true)}
            >
              Exceed guests additional fee
            </Button>
            <div>
              {formatCurrency(
                (totalGuest - maximumCapacity) *
                  checkoutDesc.pricePerAdditionalPerson,
                "Philippines"
              )}
            </div>
          </div>
        ) : null}

        <div className="border-b mt-5 mb-5"></div>
        <div className="flex justify-between font-semibold">
          <div>Total before taxes</div>
          <div>
            {formatCurrency(
              checkoutDesc.titlePrice * totalGuest +
                (totalGuest > maximumCapacity
                  ? (totalGuest - maximumCapacity) *
                    checkoutDesc.pricePerAdditionalPerson
                  : 0) +
                checkoutDesc.serviceFee,
              "Philippines"
            )}
          </div>
        </div>
      </div>
      <CheckoutBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={() => setIsBreakdownModalOpen(false)}
      />
      <CheckoutMoreInfoModal
        isOpen={isMoreInfoModalOpen}
        onClose={() => setIsMoreInfoModalOpen(false)}
      />
      <ScheduleDateModal
        isOpen={checkInOutCalendarModalIsOpen}
        onClose={() => setCheckInOutCalendarModalIsOpen(false)}
      />
      <GuestAddModal
        isOpen={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
        maximumCapacity={
          bookType && availableSlotPerson
            ? availableSlotPerson
            : maximumCapacity
        }
      />
    </div>
  )
}

export default CheckoutBox
