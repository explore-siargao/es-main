export const activitylegends = [
  {
    legend: "Confirmed",
    color: "bg-primary-500",
    hoverColor: "hover:bg-primary-700",
  },
  {
    legend: "Arrived",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-700",
  },
  {
    legend: "Completed",
    color: "bg-gray-300",
    hoverColor: "hover:bg-gray-500",
  },
  {
    legend: "Out-of-Service-Dates",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-700",
  },
  {
    legend: "Blocked-Dates",
    color: "bg-gray-500",
    hoverColor: "hover:bg-gray-700",
  },
]

export const getColorClasses = (
  status: string
): { colorClass: string; hoverColorClass: string } => {
  const legend = activitylegends.find((legend) => legend.legend === status)
  if (legend) {
    return {
      colorClass: legend.color,
      hoverColorClass: legend.hoverColor,
    }
  }
  return {
    colorClass: "bg-primary-500",
    hoverColorClass: "hover:bg-primary-700",
  }
}