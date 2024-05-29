import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"
import IconTitleDescription from "../IconTitleDescription"

interface IHouseRules {
  id: number
  title: string
  iconDesc: {
    id: number
    icon: string
    rule: string
    otherDescription?: string
  }[]
}

interface HouseRulesModalProps {
  isOpen: boolean
  onClose: () => void
  groupRules: IHouseRules[]
}

const HouseRulesModal = ({
  isOpen,
  onClose,
  groupRules,
}: HouseRulesModalProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
      <div className="py-5 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex">
          House rules
        </Typography>
        <Typography variant="h5" className="mb-5">
          You'll be staying in someone's home so treat it like a home.
        </Typography>
        {groupRules.map((gRule) => (
          <div key={gRule.id}>
            <Typography
              variant="h4"
              fontWeight="semibold"
              className="mb-5 mt-5"
            >
              {gRule.title}
            </Typography>
            {gRule.iconDesc.map((item) => (
              <div key={item.id}>
                <div className="border-b mb-5 mt-5"></div>
                <IconTitleDescription
                  title={item.rule}
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

export default HouseRulesModal
