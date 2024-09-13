import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"

type T_BusinessHoursModalProps = {
  isOpen: boolean
  onClose: () => void
  businessHours: T_BusinessHours[]
}

type T_BusinessHours = {
  day: string
  open: string
  close: string
}

const BusinessHoursModal = ({
  isOpen,
  onClose,
  businessHours,
}: T_BusinessHoursModalProps) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title="Business Hours"
    >
      <div className="px-12 pb-6">
        <div className="mt-6 space-y-4">
          {businessHours.map((item: any, index: number) => (
            <div className="flex items-center" key={"hours-" + index}>
              <Typography className="w-28">{item.day}:</Typography>
              {item.open && item.closes ? (
                <div className="flex space-x-4">
                  <Typography>{item.open}</Typography>
                  <Typography>-</Typography>
                  <Typography>{item.closes}</Typography>
                </div>
              ) : (
                <Typography className="text-red-400">Closed</Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </ModalContainer>
  )
}

export default BusinessHoursModal
