import ModalContainer from "@/common/components/ModalContainer"
import React from "react"
import { Button } from "@/common/components/ui/Button"
import { useModalStore } from "@/common/store/use-modal-store"
import { Typography } from "@/common/components/ui/Typography"


export const modalKey = `terms-and-conditions-listing`

const TermsAndConditionsModal = ({ onAgree }: { onAgree: () => void }) => {
  const { modal, setModal } = useModalStore((state) => state)
  const handleSubmit = () => {
    onAgree();
    setModal(null);
  };

  return (
    <>
      <ModalContainer
        isOpen={modalKey === modal}
        size="sm"
        title={"Exploresiargao host agreement"}
        onClose={() => setModal(null)}
      >
        <div className="space-y-4 p-5">
        <Typography className="text-sm text-gray-600">
          Because we want to be fully transparent with you, before you can start listing your property on
          ExploreSiargao, you'll need to review and agree to our Host Terms and Conditions. This includes acknowledging
          that:
        </Typography>
        <div className="space-y-4">
          <CommissionItem
            text="1. ExploreSiargao charges a host commission of 12% on all property bookings."
          />
          <CommissionItem
            text="2. ExploreSiargao charges a host commission of 17% on all rental and activity bookings."
          />
          <CommissionItem
            text="3. This commission may be subject to applicable VAT, as required by Philippine regulations."
          />
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 flex items-start">
            By agreeing to these terms, you help ensure a seamless and professional experience for both hosts and
            travelers.
          </p>
        </div>
          <div className="flex justify-end gap-4">
          <Button
              variant="secondary"
              onClick={() => setModal(null)}
            >
             Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
            >
             Agree and continue
            </Button>
          </div>
        </div>
      </ModalContainer>

    </>
  )
}

export default TermsAndConditionsModal


function CommissionItem({ text }: { text: string }) {
  return (
    <div className="flex items-start space-x-3">
      <Typography className="text-sm text-gray-700">{text}</Typography>
    </div>
  )
}