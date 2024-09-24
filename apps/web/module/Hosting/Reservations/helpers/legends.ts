export const legends = [
  {
    legend: "Confirmed",
    color: "bg-primary-500",
    hoverColor: "hover:bg-primary-700",
  },
  {
    legend: "Checked-In",
    color: "bg-secondary-500",
    hoverColor: "hover:bg-secondary-700",
  },
  {
    legend: "Checked-Out",
    color: "bg-secondary-200",
    hoverColor: "hover:bg-secondary-300",
  },
  {
    legend: "Out-of-Service-Dates",
    color: "bg-error-500",
    hoverColor: "hover:bg-error-700",
  },
  {
    legend: "Blocked-Dates",
    color: "bg-text-500",
    hoverColor: "hover:bg-text-700",
  },
]

export const getColorClasses = (
  status: string
): { colorClass: string; hoverColorClass: string } => {
  const legend = legends.find((legend) => legend.legend === status)
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
