import ModalContainer from "@/common/components/ModalContainer"
import { Separator } from "@/common/components/ui/Separator"
import { Typography } from "@/common/components/ui/Typography"
import formatCurrency from "@/common/helpers/formatCurrency"

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

type T_Props = {
  isOpen: boolean
  onClose: () => void
  date: Date
}

const LegendModal = ({ isOpen, onClose, date }: T_Props) => {
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.toLocaleString("default", { year: "numeric" })

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size="auto"
      title="Legend"
    >
      <div className="p-5 grid grid-cols-3 gap-y-3">
        {legends.map((item) => (
          <div className="flex items-center space-x-1.5" key={item.legend}>
            <div className={`${item.color} h-4 w-4`}></div>
            <Typography>{item.legend}</Typography>
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" className="bg-gray-200" />
      <div className="p-5 flex justify-between w-[1050px]">
        <div className="flex">
          <div className="border border-gray-300">
            <Typography className="px-3 py-1 bg-gray-100 border-b border-gray-300">
              {month + " " + year}
            </Typography>
            <div className="px-3 py-1 flex items-center flex-col">
              <span className="text-center bg-stone-500 w-11 rounded-full text-white font-bold mb-1.5">
                6/20
              </span>
              <span className="text-center bg-blue-500 w-11 rounded-full text-white font-bold mb-2">
                2
              </span>
              <Typography
                className="leading-none text-stone-500"
                fontWeight="bold"
              >
                WED 23
              </Typography>
              <Typography className="text-stone-500 mb-2" fontWeight="bold">
                15%
              </Typography>
              <Typography className="leading-none">20</Typography>
              <Typography>{formatCurrency(100000)}</Typography>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1 ml-1 mt-0.5">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography>Month and Year</Typography>
            </div>
            <div className="flex items-center space-x-1 ml-1 mt-3">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography>Group Allotment</Typography>
            </div>
            <div className="flex items-center space-x-1 ml-1 mt-1.5">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography>
                Unassigned Accommodations (Click to Assign)
              </Typography>
            </div>
            <div className="flex items-center space-x-1 ml-1 mt-0.5">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography>Date</Typography>
            </div>
            <div className="flex items-center space-x-1 ml-1 mt-0.5">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography className="leading-none">Occupancy</Typography>
            </div>
            <div className="flex items-center space-x-1 ml-1 mt-1.5">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography>Inventory</Typography>
            </div>
            <div className="flex items-center space-x-1 ml-1 mt-0.5">
              <span className="h-[1px] w-10 bg-gray-800"></span>
              <Typography className="leading-none">
                Rate (Click to Change)
              </Typography>
            </div>
          </div>
        </div>
        <div className="max-w-sm">
          <Typography fontWeight="bold">Scrolling the Calendar</Typography>
          <Typography variant="p">
            You can scroll the calendar horizontally by clicking and dragging in
            the desired direction.
          </Typography>
          <br />
          <Typography variant="p">
            You can also use the up, down, left, and right arrows on your
            keyboard.
          </Typography>
        </div>
      </div>
    </ModalContainer>
  )
}

export default LegendModal
