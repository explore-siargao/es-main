"use client"
import React, { useState } from "react"
import EarningsThisMonth from "./EarningsThisMonth"
import EarningsUpcoming from "./EarningsUpcoming"
import EarningsPaid from "./EarningsPaid"
import { Typography } from "@/common/components/ui/Typography"
import Tabs from "@/common/components/Tabs"
import YearToDateSummary from "./components/YearToDateSummaryBox"
import useGetEarningsReport from "../hooks/useGetEarningsReport"
import insightsTabs from "../Insights/helpers/insightsTabs"
import { Option, Select } from "@/common/components/ui/Select"

const dummyData = [
  {
    month: "January",
    year: "2024",
    completed: 30000,
    upcoming: 10000,
  },
  {
    month: "February",
    year: "2024",
    completed: 35000,
    upcoming: 5000,
  },
  {
    month: "March",
    year: "2024",
    completed: 40000,
    upcoming: 10000,
  },
  {
    month: "April",
    year: "2024",
    completed: 45000,
    upcoming: 20000,
  },
  {
    month: "May",
    year: "2024",
    completed: 50000,
    upcoming: 10000,
  },
  {
    month: "June",
    year: "2024",
    completed: 55000,
    upcoming: 25000,
  },
  {
    month: "July",
    year: "2024",
    completed: 60000,
    upcoming: 30000,
  },
  {
    month: "August",
    year: "2024",
    completed: 40000,
    upcoming: 24000,
  },
  {
    month: "September",
    year: "2024",
    completed: 65000,
    upcoming: 35000,
  },
  {
    month: "October",
    year: "2024",
    completed: 70000,
    upcoming: 20000,
  },
  {
    month: "November",
    year: "2024",
    completed: 37000,
    upcoming: 7300,
  },
  {
    month: "December",
    year: "2024",
    completed: 35000,
    upcoming: 5000,
  },
]

const EarningGraphTab = () => {
  const [category, setCategory] = useState("All")
  const [year, setYear] = useState("2024")
  const [month, setMonth] = useState("All")
  const [propertyType, setPropertyType] = useState("All")

  const { data: EarningsReport } = useGetEarningsReport()

  console.log("Marker: ", EarningsReport)
  return (
    <div className="mt-20 mb-14">
      <Tabs tabs={insightsTabs} />
      <div className="my-4"></div>
      <div className="grid grid-cols-6 gap-4 my-4 border-b pb-4">
        <Select
          label="Year"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <Option value="2024">2024</Option>
          <Option value="2023">2023</Option>
          <Option value="2022">2022</Option>
          <Option value="2021">2021</Option>
        </Select>
        <Select
          label="Month"
          required
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <Option value="all">All</Option>
          <Option value="Jan">January</Option>
          <Option value="Feb">February</Option>
          <Option value="Mar">March</Option>
          <Option value="Apr">April</Option>
          <Option value="May">May</Option>
          <Option value="Jun">June</Option>
          <Option value="Jul">July</Option>
          <Option value="Aug">August</Option>
          <Option value="Sep">September</Option>
          <Option value="Oct">October</Option>
          <Option value="Nov">November</Option>
          <Option value="Dec">December</Option>
        </Select>

        <Select
          label="Category"
          required
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            if (e.target.value !== "Property") {
              setPropertyType("")
            }
          }}
        >
          <Option value="All">All</Option>
          <Option value="Property">Property</Option>
          <Option value="Rental">Rental</Option>
          <Option value="Activity">Activity</Option>
        </Select>

        {category === "Property" && (
          <Select
            label="Units *"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <Option value="Shared space">All</Option>
            <Option value="Shared space">Shared space</Option>
            <Option value="whole space">Whole space</Option>
            <Option value="Private room">Private room</Option>
          </Select>
        )}
      </div>

      <Typography variant="h1" fontWeight="semibold">
        Earning
      </Typography>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-14">
        <div className="lg:col-span-3">
          <div className="mt-3"></div>

          <div className="mt-4">
            <EarningsThisMonth data={dummyData[7]} />
            <EarningsUpcoming data={dummyData} />
            {/* <EarningsPaid /> */}
          </div>
        </div>
        <div className="col-span-1 relative">
          <YearToDateSummary excelData={EarningsReport} />
        </div>
      </div>
    </div>
  )
}

export default EarningGraphTab
