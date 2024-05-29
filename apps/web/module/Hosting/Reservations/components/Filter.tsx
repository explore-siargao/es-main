import { Option, Select } from "@/common/components/ui/Select"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

const Filter = ({ status }: { status: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const filterOnChange = (
    value: string,
    type: "year" | "category" | "month"
  ) => {
    const baseUrl = `/hosting/reservations/${status}`
    if (type === "category") {
      router.push(
        `${baseUrl}?category=${value}&year=${year ? year : "2024"}&month=${month ? month : "All"}`
      )
    } else if (type === "year") {
      router.push(
        `${baseUrl}?category=${category ? category : "Property"}&year=${value}&month=${month ? month : "All"}`
      )
    } else if (type === "month") {
      router.push(
        `${baseUrl}?category=${category ? category : "Property"}&year=${year ? year : "2024"}&month=${value}`
      )
    }
  }
  return (
    <>
      <Select
        defaultValue={category || ""}
        label="Category"
        onChange={(e) => filterOnChange(e.target.value, "category")}
      >
        <Option>Property</Option>
        <Option>Rental</Option>
        <Option>Activity</Option>
      </Select>
      <Select
        defaultValue={year || ""}
        label="Year"
        onChange={(e) => filterOnChange(e.target.value, "year")}
      >
        <Option>2024</Option>
      </Select>
      <Select
        defaultValue={month || ""}
        label="Month"
        onChange={(e) => filterOnChange(e.target.value, "month")}
      >
        <Option>All</Option>
        <Option>January</Option>
        <Option>February</Option>
        <Option>March</Option>
        <Option>April</Option>
        <Option>May</Option>
        <Option>June</Option>
        <Option>July</Option>
        <Option>August</Option>
        <Option>September</Option>
        <Option>October</Option>
        <Option>November</Option>
        <Option>December</Option>
      </Select>
    </>
  )
}

export default Filter
