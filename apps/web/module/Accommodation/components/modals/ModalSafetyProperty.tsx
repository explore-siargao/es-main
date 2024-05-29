import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"
import IconTitleDescription from "../IconTitleDescription"

interface ISafetyProperty {
  id: number
  title: string
  iconDesc: {
    id: number
    icon: string
    safetyProperty: string
    otherDescription?: string
  }[]
}

interface SafetyPropertyProps {
  isOpen: boolean
  onClose: () => void
  groupSafetyProperty: ISafetyProperty[]
}

const SafetyPropertyModal = ({
  isOpen,
  onClose,
  groupSafetyProperty,
}: SafetyPropertyProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
      <div className="py-4 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex mb-1">
          Safety & property
        </Typography>
        <Typography variant="h5" className="mb-5">
          Avoid surprises by looking over these important details about your
          Host's property
        </Typography>
        {groupSafetyProperty.map((gSafetyProperty) => (
          <div className="mt-5" key={gSafetyProperty.id}>
            <Typography variant="h4" fontWeight="semibold" className="mb-5">
              {gSafetyProperty.title}
            </Typography>
            {gSafetyProperty.iconDesc.map((item) => (
              <div className="border-b" key={item.id}>
                <IconTitleDescription
                  className="mb-5 mt-5"
                  title={item.safetyProperty}
                  icon={item.icon}
                  description={item.otherDescription}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </ModalContainer>
  )
}

export default SafetyPropertyModal
