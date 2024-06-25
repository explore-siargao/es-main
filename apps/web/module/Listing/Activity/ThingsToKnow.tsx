import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import TitleLists from "@/module/Accommodation/components/ThingsToKnow/TitleLists"
import { useState } from "react"
import { T_ThingsToKnowProps } from "../types/ThingsToKnow"
import HouseRulesModal from "./ModalHouseRules"
import CancellationPolicyModal from "./CancellationPolicyModal"

const ThingsToKnow = ({
  otherPolicies,
  otherPoliciesModalData,
  cancellationPolicies,
  cancellationModalData,
}: T_ThingsToKnowProps) => {
  const [isHouseRulesModalOpen, setIsHouseRulesModalOpen] = useState(false)
  const [isCancellationPolicyModalOpen, setIsCancellationPolicyModalOpen] = useState(false)

  const openCancellationPolicyModal = () => {
    setIsCancellationPolicyModalOpen(true)
  }

  const openHouseRulesModal = () => {
    setIsHouseRulesModalOpen(true)
  }

  const closeModal = () => {
    setIsHouseRulesModalOpen(false)
    setIsCancellationPolicyModalOpen(false)
  }

  return (
    <>
      <Typography variant="h2" fontWeight="semibold">
        Things to know
      </Typography>
      <div className="flex w-full mt-4 mb-6">
        <div className="w-full md:w-1/3">
          <TitleLists title="Other Policies" rules={otherPolicies} />
          { otherPolicies.length > 2 && <Button
            className="underline mt-2"
            variant="link"
            size="link"
            onClick={openHouseRulesModal}
          >
            Show more &gt;
          </Button> }
          
        </div>
        <div className="w-full md:w-1/3">
          <TitleLists
            title="Cancellation policy"
            rules={cancellationPolicies}
          />
          <Button
            className="underline mt-2"
            variant="link"
            size="link"
            onClick={openCancellationPolicyModal}
          >
            Show more &gt;
          </Button>
        </div>
      </div>
      <HouseRulesModal
        onClose={closeModal}
        isOpen={isHouseRulesModalOpen}
        otherPolicies={otherPoliciesModalData}
      />

      <CancellationPolicyModal
        onClose={closeModal}
        isOpen={isCancellationPolicyModalOpen}
        cancellationPolicy={cancellationModalData}
      />
    </>
  )
}

export default ThingsToKnow
