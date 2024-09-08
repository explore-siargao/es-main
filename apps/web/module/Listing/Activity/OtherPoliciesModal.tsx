import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import IconTitleDescription from "@/module/Listing/Property/components/IconTitleDescription"
import { Scroll } from "lucide-react"
import React from "react"

interface OtherPoliciesModalProps {
  isOpen: boolean
  onClose: () => void
  otherPolicies: string[]
}

const OtherPolicies = ({
  isOpen,
  onClose,
  otherPolicies,
}: OtherPoliciesModalProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
      <div className="py-5 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex">
          Other Policies
        </Typography>
        <div className="flex flex-col my-4 max-h-full overflow-auto">
          {otherPolicies.map((policy) => (
            <div className="border-b py-4">{policy}</div>
          ))}
        </div>
      </div>
    </ModalContainer>
  )
}

export default OtherPolicies
