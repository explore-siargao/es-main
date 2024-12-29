import ModalContainer from "@/common/components/ModalContainer"
import { T_Bookable_Unit } from "@repo/contract-2/property"

interface UnitMoreInfoModalProps {
  isOpen: boolean
  onClose: () => void
  unit: T_Bookable_Unit | null
}
const UnitMoreInfoModal = ({
  isOpen,
  onClose,
  unit,
}: UnitMoreInfoModalProps) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={unit?.title}
      size="sm"
    >
      <div className="px-5 py-6">Show more info here</div>
    </ModalContainer>
  )
}

export default UnitMoreInfoModal
