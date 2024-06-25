import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import { T_ThingsToKnowProps } from "../types/ThingsToKnow"
import HouseRulesModal from "./OtherPoliciesModal"
import CancellationPolicyModal from "./CancellationPolicyModal"
import TitleLists from "./ThingsToKnow/TitleLists"

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
        <div className="w-full flex flex-col items-start">
          <TitleLists title="Other Policies" rules={otherPolicies} />
          { otherPolicies.length > 3 && (
            <Button
              className="underline mt-2"
              variant="link"
              size="link"
              onClick={openHouseRulesModal}
            >
              Show more &gt;
            </Button>
          )}
        </div>

        <div className="w-full flex flex-col items-start">
          <TitleLists
            title="Cancellation policy"
            rules={cancellationPolicies}
          />
          { cancellationPolicies.length > 3 && (
            <Button
              className="underline mt-2"
              variant="link"
              size="link"
              onClick={openCancellationPolicyModal}
            >
              Show more &gt;
            </Button>
          )}
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
