import React from "react"
import { Typography } from "@/common/components/ui/Typography"
import ModalContainer from "@/common/components/ModalContainer"

interface PoliciesModalProps {
  onClose: () => void
  isOpen: boolean
  category: string
  items: { id: number; text: string }[]
}

const PoliciesModal: React.FC<PoliciesModalProps> = ({
  onClose,
  isOpen,
  category,
  items,
}) => {
  return (
    <ModalContainer
      size="sm"
      title="Policies"
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="p-8">
        <Typography variant="h4" fontWeight="semibold">
          {category}
        </Typography>
        <div className="mt-4">
          <ul className="flex flex-col space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <Typography>{item.text}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalContainer>
  )
}

export default PoliciesModal
