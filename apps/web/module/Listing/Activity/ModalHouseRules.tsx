import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import IconTitleDescription from "@/module/Accommodation/components/IconTitleDescription"
import React from "react"

interface OtherPoliciesModalProps {
  isOpen: boolean
  onClose: () => void
  otherPolicies: string[]
}

const OtherPolicies = ({
  isOpen,
  onClose,
}: OtherPoliciesModalProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
      <div className="py-5 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex">
          Other Policies
        </Typography>
        <Typography variant="h5" className="mb-5">
          You'll be staying in someone's home so treat it like a home.
        </Typography>
        
      </div>
    </ModalContainer>
  )
}

export default OtherPolicies
