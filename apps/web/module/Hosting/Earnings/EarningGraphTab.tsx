"use client"
import React, { useEffect, useState } from "react"
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
    paid: 30000,
    upcoming: 10000,
  },
  {
    month: "February",
    year: "2024",
    paid: 35000,
    upcoming: 5000,
  },
  {
    month: "March",
    year: "2024",
    paid: 40000,
    upcoming: 10000,
  },
  {
    month: "April",
    year: "2024",
    paid: 45000,
    upcoming: 20000,
  },
  {
    month: "May",
    year: "2024",
    paid: 50000,
    upcoming: 10000,
  },
  {
    month: "June",
    year: "2024",
    paid: 55000,
    upcoming: 25000,
  },
  {
    month: "July",
    year: "2024",
    paid: 60000,
    upcoming: 30000,
  },
  {
    month: "August",
    year: "2024",
    paid: 40000,
    upcoming: 24000,
  },
  {
    month: "September",
    year: "2024",
    paid: 65000,
    upcoming: 35000,
  },
  {
    month: "October",
    year: "2024",
    paid: 70000,
    upcoming: 20000,
  },
  {
    month: "November",
    year: "2024",
    paid: 37000,
    upcoming: 7300,
  },
  {
    month: "December",
    year: "2024",
    paid: 35000,
    upcoming: 5000,
  },
]

const EarningGraphTab = () => {
  const [category, setCategory] = useState("All")
  const [year, setYear] = useState("2024")
  const [month, setMonth] = useState("all")
  const [propertyType, setPropertyType] = useState("All")

  const { data: EarningsReport } = useGetEarningsReport()

  console.log("Marker: ", EarningsReport)

  const [upcomingEarnings, setUpcomingEarnings] = useState<any>([])

  useEffect(() => {
    let filteredEarnings

    if (month === "all") {
      filteredEarnings = dummyData.filter((earning) => earning.year === year)
    } else {
      filteredEarnings = dummyData.filter(
        (earning) => earning.year === year && earning.month === month
      )
    }

    setUpcomingEarnings(filteredEarnings)
  }, [year, month])

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
          <Option value="January">January</Option>
          <Option value="February">February</Option>
          <Option value="March">March</Option>
          <Option value="April">April</Option>
          <Option value="May">May</Option>
          <Option value="June">June</Option>
          <Option value="July">July</Option>
          <Option value="August">August</Option>
          <Option value="September">September</Option>
          <Option value="October">October</Option>
          <Option value="November">November</Option>
          <Option value="December">December</Option>
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
            <EarningsUpcoming data={upcomingEarnings} />
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
