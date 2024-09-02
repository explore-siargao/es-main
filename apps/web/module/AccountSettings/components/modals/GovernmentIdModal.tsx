import ModalContainer from "@/common/components/ModalContainer"
import { governmentIdMap } from "@/common/helpers/governmentIdMap"
import { T_GovernmentId } from "@repo/contract"
import Image from "next/image"
interface GovernmentIdModalProps {
  isOpen: boolean
  onClose: () => void
  governmentId: T_GovernmentId
}

const GovernmentIdModal = ({
  isOpen,
  onClose,
  governmentId,
}: GovernmentIdModalProps) => {
  const title = governmentIdMap[governmentId?.type]
  return (
    <ModalContainer title={title} isOpen={isOpen} onClose={onClose} size="auto">
      <div className="flex justify-center bg-primary-50 border border-primary-200 p-4">
        <div className="relative h-96">
          <Image
            src={`/assets/${governmentId?.fileKey}`}
            alt={governmentId?.type}
            width={300}
            height={300}
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
      </div>
    </ModalContainer>
  )
}

export default GovernmentIdModal
