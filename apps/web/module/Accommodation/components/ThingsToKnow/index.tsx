import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import TitleLists from "./TitleLists"
import SafetyPropertyModal from "../modals/ModalSafetyProperty"
import CancellationPolicyModal from "../modals/CancellationPolicyModal"
import HouseRulesModal from "../modals/ModalHouseRules"
import { T_ThingsToKnowProps } from "../../types/ThingsToKnow"

const ThingsToKnow = ({
  houseRules,
  houseRulesModalData,
  safetyProperties,
  safetyModalData,
  cancellationPolicies,
  cancellationModalData,
}: T_ThingsToKnowProps) => {
  const [isHouseRulesModalOpen, setIsHouseRulesModalOpen] = useState(false)
  const [isSafetyPropertyModalOpen, setIsSafetyPropertyModalOpen] =
    useState(false)

  const [isCancellationPolicyModalOpen, setIsCancellationPolicyModalOpen] =
    useState(false)

  const openCancellationPolicyModal = () => {
    setIsCancellationPolicyModalOpen(true)
  }

  const openHouseRulesModal = () => {
    setIsHouseRulesModalOpen(true)
  }

  const openSafetyPropertyModal = () => {
    setIsSafetyPropertyModalOpen(true)
  }

  const closeModal = () => {
    setIsHouseRulesModalOpen(false)
    setIsSafetyPropertyModalOpen(false)
    setIsCancellationPolicyModalOpen(false)
  }

  return (
    <>
      <Typography variant="h2" fontWeight="semibold">
        Things to know
      </Typography>
      <div className="flex w-full mt-4 mb-6">
        <div className="w-full md:w-1/3">
          <TitleLists title="House Rules" rules={houseRules} />
          <Button
            className="underline mt-2"
            variant="link"
            size="link"
            onClick={openHouseRulesModal}
          >
            Show more &gt;
          </Button>
        </div>
        <div className="w-full md:w-1/3">
          <TitleLists title="Safety & Property" rules={safetyProperties} />
          <Button
            className="underline mt-2"
            variant="link"
            size="link"
            onClick={openSafetyPropertyModal}
          >
            Show more &gt;
          </Button>
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
        groupRules={houseRulesModalData}
      />

      <SafetyPropertyModal
        onClose={closeModal}
        isOpen={isSafetyPropertyModalOpen}
        groupSafetyProperty={safetyModalData}
      />

      <CancellationPolicyModal
        onClose={closeModal}
        isOpen={isCancellationPolicyModalOpen}
        groupCancellationPolicy={cancellationModalData}
      />
    </>
  )
}

export default ThingsToKnow
