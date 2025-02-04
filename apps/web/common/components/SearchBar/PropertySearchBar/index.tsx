import React, { useEffect, useState } from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { Search } from "lucide-react"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { Separator } from "../../ui/Separator"
import { format, isAfter } from "date-fns"
import { locations } from "../../Header/filter/constants"
import { Spinner } from "../../ui/Spinner"
import { useSearchParams } from "next/navigation"
import useGuestsStore from "@/module/cart/stores/use-guests-store"

import { Typography } from "../../ui/Typography"
import GuestAddModal from "../guest-add-modal"

function PropertySearchBar() {
  const searchParams = useSearchParams()
  const { register, watch, setValue, getValues } = useFormContext()
  const [isLoading, setIsLoading] = useState(false)
  const dateToday = format(new Date(), "yyyy-MM-dd")
  const { guest } = useGuestsStore()
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  useEffect(() => {
    const checkInDate = getValues("checkIn")
    const checkOutDate = getValues("checkOut")
    if (isAfter(new Date(checkInDate), new Date(checkOutDate))) {
      setValue("checkOut", "")
    }
  }, [watch("checkIn")])

  useEffect(() => {
    if (isLoading) setIsLoading(false)
  }, [searchParams])

  const openGuestModal = () => {
    setIsGuestModalOpen(true)
  }

  const closeGuestModal = () => {
    setIsGuestModalOpen(false)
  }

  const totalGuests = guest.adults + guest.children

  useEffect(() => {
    setValue("numberOfGuest", totalGuests)
  }, [totalGuests, setValue])

  return (
    <div className="flex gap-2 w-full justify-between rounded-full items-center pr-3 border bg-white border-gray-300 mb-4">
      <Select
        className="w-64 border-0 bg-inherit focus-within:border-0 hover:bg-gray-200 py-3 px-4 rounded-full transition"
        label={"Location"}
        {...register("location")}
        id="testable"
      >
        <Option value="">Select location</Option>
        {locations.map((loc) => (
          <Option key={loc.value} value={loc.value}>
            {loc.label}
          </Option>
        ))}
      </Select>
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full border-0 bg-inherit focus-within:border-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Check in"}
        {...register("checkIn")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <Input
        type="date"
        className="w-full border-0 bg-inherit focus-within:border-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Check out"}
        {...register("checkOut")}
        disabled={!watch("checkIn")}
        min={watch("checkIn")}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <div
        className="border-0 bg-inherit focus-within:border-0 hover:bg-gray-200 py-4 px-6 rounded-full transition cursor-pointer w-[16rem] 4xl:w-[20rem]"
        onClick={openGuestModal}
      >
        <Typography variant="h6" fontWeight="semibold">
          Number of guest/s
        </Typography>
        <Typography variant="h6">
          {totalGuests > 0 ? `${totalGuests}` : "Add guests"}
        </Typography>
      </div>
      <Button
        variant={"primary"}
        className="h-full px-4 py-3 justify-center items-center rounded-full gap-x-2"
        onClick={() => setIsLoading(true)}
      >
        {!isLoading ? (
          <Search className="text-white h-5 w-5" />
        ) : (
          <Spinner variant="primary" size="xs" />
        )}
        {!isLoading ? "Search" : "Searching"}
      </Button>
      <GuestAddModal isOpen={isGuestModalOpen} onClose={closeGuestModal} />
    </div>
  )
}

export default PropertySearchBar
