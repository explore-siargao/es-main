export const legends = [
  {
    legend: "Confirmed",
    color: "bg-primary-500",
    hoverColor: "bg-primary-700"
  },
  {
    legend: "Checked in",
    color: "bg-green-500",
    hoverColor: "bg-green-700"
  },
  {
    legend: "Checked out",
    color: "bg-gray-300",
    hoverColor: "bg-gray-500"
  },
  {
    legend: "Out of service",
    color: "bg-red-500",
    hoverColor: "bg-red-700"
  },
  {
    legend: "Blocked dates",
    color: "bg-gray-500",
    hoverColor: "bg-gray-700"
  },
]

export const getColorClasses = (status: string): { colorClass: string, hoverColorClass: string } => {
  const legend = legends.find(legend => legend.legend === status);
  if (legend) {
    return {
      colorClass: legend.color,
      hoverColorClass: legend.hoverColor,
    };
  }
  return {
    colorClass: 'bg-primary-500', 
    hoverColorClass: 'bg-primary-700', 
  };
}
