import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { Scroll } from "lucide-react"
import React from "react"


interface CancellationPolicyProps {
  isOpen: boolean
  onClose: () => void
  cancellationPolicy: string[]
}

const CancellationPolicyModal = ({
  isOpen,
  onClose,
  cancellationPolicy,
}: CancellationPolicyProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
      <div className="pb-0 mb-0 py-4 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex mb-5">
          Cancellation policy
        </Typography>
        <div className="flex flex-col my-4 max-h-full overflow-auto">
          {cancellationPolicy.map((policy) => (
            <div className="border-b py-4">
              {policy}
            </div>
          ))}
        </div>
      </div>
    </ModalContainer>
  )
}

export default CancellationPolicyModal
