import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import { ScrollText } from "lucide-react"

interface PoliciesModalProps {
  isOpen: boolean
  onClose: () => void
  policies: string[]
}

const PoliciesModal = ({
  isOpen,
  onClose,
  policies,
}: PoliciesModalProps) => {
  return (
    <ModalContainer size="sm" onClose={onClose} isOpen={isOpen} title="Policies">
      <div className="px-5 pt-4 md:h-[500px] md:overflow-y-auto">
        <div className="py-2 pt-5 flex flex-col">
          {policies.map((policy: any) => (
            <div className="flex gap-2 py-4 border-b">
              <ScrollText className="text-primary-700"/>
              {policy}
            </div>
          ))}
        </div>
      </div>
    </ModalContainer>
  )
}

export default PoliciesModal
