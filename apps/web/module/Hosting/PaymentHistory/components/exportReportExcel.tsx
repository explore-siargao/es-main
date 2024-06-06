import { Button } from "@/common/components/ui/Button";
import React from "react";
import * as XLSX from 'xlsx';

interface ExportReportExcelProps {
    reportData?: any[];
}

export function ExportReportExcel(props: ExportReportExcelProps) {
    const xport = React.useCallback(() => {
        if (props.reportData && props.reportData.length > 0) {
            const wb = XLSX.utils.book_new();
            
            props.reportData.forEach((report, index) => {
                const ws = XLSX.utils.json_to_sheet(report.listItems);
                addTotalAmountEarned(ws, report.listItems);
                XLSX.utils.book_append_sheet(wb, ws, `List Items`);

                if (report.serviceFee) {
                    const wsServiceFee = XLSX.utils.json_to_sheet(report.serviceFee);
                    addServiceFeeCalculations(wsServiceFee, report.serviceFee); 
                    XLSX.utils.book_append_sheet(wb, wsServiceFee, `Service Fee`);
                }
            });

            XLSX.writeFile(wb, "ReportData.xlsx");
        } else {
            console.log("No report data found");
        }
    }, [props.reportData]);

    const addTotalAmountEarned = (ws: XLSX.WorkSheet, data: any[]) => {
      let totalAmountEarned = 0;
      data.forEach((item, index) => {
          totalAmountEarned += item.cost;
          if (index === 0) {
              XLSX.utils.sheet_add_aoa(ws, [["Items", "Cost"]]);
          }
          XLSX.utils.sheet_add_aoa(ws, [[item.item, item.cost]]);
      });
      XLSX.utils.sheet_add_aoa(ws, [["Total", "", totalAmountEarned]]);
  };

    
  const addServiceFeeCalculations = (ws: XLSX.WorkSheet, data: any[]) => {
    let totalServiceCost = 0;
    let totalDeductions = 0;
    let totalAfterVatCost = 0;
    let totalPayout = 0;

    // Add headers for the sheet
    XLSX.utils.sheet_add_aoa(ws, [["Service", "Cost", "After VAT(12%)", "Deductions", "Total"]]);

    data.forEach((service, index) => {
        totalServiceCost += service.cost;
        totalAfterVatCost += service.afterVat;
        totalDeductions += service.deductions;

        const totalForService = service.afterVat - service.deductions;
        totalPayout += totalForService;

        XLSX.utils.sheet_add_aoa(ws, [[service.service, service.cost, service.afterVat, service.deductions, totalForService]]);
    });

    XLSX.utils.sheet_add_aoa(ws, [["Total Payout", "", "", "", totalPayout]]);
};

    return (
        <>
            <Button onClick={xport}><b>Export Report</b></Button>
        </>
    );
}
