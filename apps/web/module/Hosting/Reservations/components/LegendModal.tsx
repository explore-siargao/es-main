import ModalContainer from "@/common/components/ModalContainer"
import { Separator } from "@/common/components/ui/Separator"
import { Typography } from "@/common/components/ui/Typography"
import { legends } from "../helpers/legends"

type T_Props = {
  isOpen: boolean
  onClose: () => void
}

const LegendModal = ({ isOpen, onClose }: T_Props) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm" title="Legend">
      <div className="p-5 grid grid grid-cols-3 gap-y-3">
        {legends.map((item) => (
          <div className="flex items-center space-x-1.5" key={item.legend}>
            <div className={`${item.color} h-4 w-4`}></div>
            <Typography>{item.legend}</Typography>
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" className="bg-gray-200" />
      <div className="p-5 flex justify-center">
        <div className="text-center max-w-sm">
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
