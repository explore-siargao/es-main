import { Button } from "@/common/components/ui/Button"
import React from "react"
import * as XLSX from "xlsx"
import { Import } from "lucide-react"
interface ExportReportExcelProps {
  reportData?: any[]
}

export function ExportReportExcel(props: ExportReportExcelProps) {
  const xport = React.useCallback(() => {
    if (props.reportData && props.reportData.length > 0) {
      const wb = XLSX.utils.book_new()
      props.reportData.forEach((report, index) => {
        console.log(report.serviceFee)
        if (report.serviceFee) {
          const wsServiceFee = XLSX.utils.json_to_sheet(report.serviceFee)
          addServiceFeeCalculations(wsServiceFee, report.serviceFee)
          XLSX.utils.book_append_sheet(wb, wsServiceFee, `Sheet 1`)
        }
      })

      XLSX.writeFile(wb, "ReportData.xlsx")
    } else {
      console.log("No report data found")
    }
  }, [props.reportData])

  const addServiceFeeCalculations = (ws: XLSX.WorkSheet, data: any[]) => {
    let totalServiceCost = 0
    let totalDeductions = 0
    let totalAfterVatCost = 0
    let totalPayout = 0
    let totalReservationCost = 0

    const header = [
      "Reservation",
      "Cost",
      "Service Cost",
      "VAT",
      "Deductions",
      "Total",
    ]
    const boldStyle = { font: { bold: true } }

    const colWidths = header.map((text) => ({ width: text.length * 1.5 }))
    ws["!cols"] = colWidths

    data.forEach((service, index) => {
      totalServiceCost += service.cost
      totalReservationCost += service.service
      totalAfterVatCost += service.afterVat
      totalDeductions += service.deductions
      const totalForService =
        service.cost + service.afterVat - service.deductions
      totalPayout += totalForService

      XLSX.utils.sheet_add_aoa(ws, [
        [
          service.reservation,
          service.cost,
          service.service,
          service.afterVat,
          service.deductions,
          totalForService,
        ],
      ])
    })

    XLSX.utils.sheet_add_aoa(ws, [
      header.map((text) => ({ ...boldStyle, t: "s", v: text })),
    ])
    data.forEach((service, index) => {
      const totalForService =
        service.cost + service.afterVat - service.deductions
      const payoutCell = XLSX.utils.encode_cell({ r: index + 1, c: 5 })
      XLSX.utils.sheet_add_aoa(ws, [[totalForService]], { origin: payoutCell })
    })

    const lastRowIndex = data.length + 1
    const totalAmountEarnedRowIndex = lastRowIndex + 1
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "Total",
          totalServiceCost,
          totalReservationCost,
          totalAfterVatCost,
          totalDeductions,
          totalPayout,
        ],
      ],
      { origin: { r: totalAmountEarnedRowIndex, c: 0 } }
    )
  }

  return (
    <div className="flex items-center">
      <Button variant={"primary"} onClick={xport}>
        <Import className="mr-2" />
        <b>Export Report</b>
      </Button>
    </div>
  )
}
