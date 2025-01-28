import React, { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Separator } from "../../ui/Separator"
import { Input } from "../../ui/Input"
import { useFormContext } from "react-hook-form"
import { Button } from "../../ui/Button"
import { format } from "date-fns"
import { Option, Select } from "@/common/components/ui/Select"
import { locations } from "../../Header/filter/constants"
import { useSearchParams } from "next/navigation"
import { Spinner } from "../../ui/Spinner"
import GuestAddModal from "../guest-add-modal"
import { Typography } from "../../ui/Typography"
import useGuestsStore from "@/module/cart/stores/use-guests-store"

function ActivitiesSearchBar() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const { register, setValue } = useFormContext()
  const dateToday = format(new Date(), "yyyy-MM-dd")
  const { guest } = useGuestsStore()
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

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
    <div className="flex gap-2 w-full justify-between items-center rounded-full pr-3 border bg-white border-gray-300 mb-4">
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
        className="w-[16rem] 4xl:w-[20rem] border-0 bg-inherit focus-within:border-0 hover:bg-gray-200 py-3 px-6 rounded-full transition"
        label={"Date"}
        {...register("activityDate")}
        min={dateToday}
      />
      <Separator orientation="vertical" className="bg-gray-300 h-8" />
      <div
        className="w-[23rem] 4xl:w-[28rem] border-0 bg-inherit focus-within:border-0 hover:bg-gray-200 py-4 px-6 rounded-full transition cursor-pointer"
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

export default ActivitiesSearchBar
