"use client"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import { Option, Select } from "@/common/components/ui/Select"
import { LucideBadgeInfo, LucideInfo } from "lucide-react"
import useGetInsights from "./hooks/useGetInsights"
import Chart, { ChartType } from "./components/Chart"
import Tabs from "@/common/components/Tabs"
import insightsTabs from "./helpers/insightsTabs"
import GraphTab from "../PaymentHistory/GraphTab"



const Insights = () => {
  const [category, setCategory] = useState("Property")
  const [listing, setListing] = useState("Mountain top house")
  const [year, setYear] = useState("2024")
  const [month, setMonth] = useState("All")

  const { data: filteredInsights, isPending: filteredInsightsIsPending } =
    useGetInsights(category, listing, year, month)
  console.log(filteredInsights)
  return (
    <div className="mt-20">
      <Tabs tabs={insightsTabs} />
      <div className="my-4">
        <Typography
          variant="h1"
          fontWeight="semibold"
          className="flex justify-between items-center mb-2"
        >
          Insights
        </Typography>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-4 border-b pb-4">
      <Select
          label="Category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <Option value={"Property"}>Property</Option>
          <Option value={"Rental"}>Rental</Option>
          <Option value={"Activity"}>Activity</Option>
        </Select>
        <Select
          label="Listing"
          required
          value={listing}
          onChange={(e) => setListing(e.target.value)}
        >
          <Option value={"Mountain top house"}>Mountain top house</Option>
          <Option value={"Word of Life"}>Word of Life</Option>
          <Option value={"Bianca Hotel"}>Bianca Hotel</Option>
        </Select>
        <Select
          label="Year"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <Option value={"2024"}>2024</Option>
          <Option value={"2023"}>2023</Option>
          <Option value={"2022"}>2022</Option>
          <Option value={"2021"}>2021</Option>
        </Select>
        <Select
          label="Month"
          required
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <Option value={"all"}>All</Option>
          <Option value={"Jan"}>January</Option>
          <Option value={"Feb"}>February</Option>
          <Option value={"Mar"}>March</Option>
          <Option value={"Apr"}>April</Option>
          <Option value={"May"}>May</Option>
          <Option value={"Jun"}>June</Option>
          <Option value={"Jul"}>July</Option>
          <Option value={"Aug"}>August</Option>
          <Option value={"Sep"}>September</Option>
          <Option value={"OCt"}>October</Option>
          <Option value={"Nov"}>November</Option>
          <Option value={"Dec"}>December</Option>
        </Select>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="p-6 border border-primary-500 rounded-lg w-1/6">
          <Typography className="font-bold text-4xl text-text-500">
            {filteredInsights ? filteredInsights[0]?.views : 0}
          </Typography>
          <Typography className="text-text-500">Views</Typography>
        </div>
        <div className="p-6 border border-primary-500 rounded-lg w-1/6">
          <Typography className="font-bold text-4xl text-text-500">
            0
          </Typography>
          <Typography className="text-text-500">New bookings</Typography>
        </div>
        <div className="p-6 border border-primary-500 rounded-lg w-1/6">
          <Typography className="font-bold text-4xl text-text-500">
            {filteredInsights ? filteredInsights[0]?.bookingRate : 0}%
          </Typography>
          <div className="flex gap-2 items-center">
            <Typography className="text-text-500">Booking rate</Typography>
            <LucideInfo className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div>
        {filteredInsights &&
        filteredInsights.length > 0 &&
        filteredInsights[0]?.viewsData ? (
          <>
            <Chart
              data={
                month === "All"
                  ? filteredInsights[0].viewsData
                  : filteredInsights[0].specificMonth.data
              }
              isPending={filteredInsightsIsPending}
              width="100%"
              height={400}
              type={ChartType["this-month"]}
              earningType={month === "All" ? "monthly" : "daily"}
            />
          </>
        ) : (
          <>
            <Typography fontWeight="semibold" variant="h2" className="pb-4">
              This Month
            </Typography>
            <Typography fontWeight="semibold" variant="p">
              No this month views at the moment.
            </Typography>
          </>
        )}
       
      </div>
      <GraphTab category={category} listing={listing} year={year} month={month}/>
    </div>
  )
}

export default Insights
