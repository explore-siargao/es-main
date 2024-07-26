import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import { TitleSection } from "../../../Accommodation/components/TitleSection"
import IconDescription from "../../../Accommodation/components/IconDescription"
import { Typography } from "@/common/components/ui/Typography"

interface IconDescription {
  id: number
  desc: string
  icon: React.ElementType
}
interface HouseRule {
  id: number
  title: string
  rules: IconDescription[]
}
interface HouseRuleModalProps {
  isOpen: boolean
  onClose: () => void
  houseRules: HouseRule[]
}

const HouseRuleModal = ({
  isOpen,
  onClose,
  houseRules,
}: HouseRuleModalProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen}>
      <div className="px-5 pt-4  md:h-[500px] md:overflow-y-auto">
        <div className="font-semibold text-2xl pt-7">
          <Typography>House Rules</Typography>
        </div>
        <div className="text-lg font-normal py-4">
          <h2>
            You'll be staying in someone's home, so please treat it with care
            and respect.
          </h2>
        </div>

        {houseRules.map((data) => (
          //@ts-ignore
          <div className="py-2 pt-5" key={data.id}>
            <TitleSection
              //@ts-ignore
              title={data.title}
            >
              {data.rules.map((rule: any) => (
                //@ts-ignore
                <div
                  className="py-4 border-b"
                  //@ts-ignore
                  key={rule.id}
                >
                  <IconDescription
                    // @ts-ignore
                    icon={rule.icon}
                    // @ts-ignore
                    desc={rule.desc}
                  />
                </div>
              ))}
            </TitleSection>
          </div>
        ))}
      </div>
    </ModalContainer>
  )
}

export default HouseRuleModal
