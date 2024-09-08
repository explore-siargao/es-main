import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import React from "react"
import { Button } from "@/common/components/ui/Button"
interface ICancellationPolicy {
  id: number
  title: string
  desc: {
    id: number
    cancellationPolicy: string
    otherDescription?: string
  }[]
}

interface CancellationPolicyProps {
  isOpen: boolean
  onClose: () => void
  groupCancellationPolicy: ICancellationPolicy[]
}

const CancellationPolicyModal = ({
  isOpen,
  onClose,
  groupCancellationPolicy,
}: CancellationPolicyProps) => {
  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} size="sm">
      <div className="pb-0 mb-0 py-4 px-8 flex flex-col divide-text-100 overflow-y-auto h-[600px]">
        <Typography variant="h2" fontWeight="semibold" className="flex mb-5">
          Cancellation policy
        </Typography>
        <Typography variant="h5" fontWeight="normal" className="mb-5">
          Before you book, make sure you're comfortable with this Host's
          cancellation policy. Keep in mind that Explore Siargao's{" "}
          <button className="font-semibold underline">
            Extenuating Circumstances policy{" "}
          </button>{" "}
          doesn't cover cancellations due to illness or travel disruptions
          caused by COVID-19.
        </Typography>

        <Typography variant="h4" fontWeight="semibold">
          Cancel by
        </Typography>

        {groupCancellationPolicy.map((gCancellationPolicy) => (
          <div className="mt-5" key={gCancellationPolicy.id}>
            <Typography variant="h4" fontWeight="semibold" className="flex">
              {gCancellationPolicy.title}
            </Typography>

            {gCancellationPolicy.desc.map((item) => (
              <div key={item.id} className="border-b flex justify-between">
                <Typography variant="h5">{item.cancellationPolicy}</Typography>

                {item.otherDescription && (
                  <Typography
                    variant="h5"
                    className="text-right justify-items-start mb-5"
                  >
                    {item.otherDescription}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="flex mt-6 w-full">
          <Button
            className="text-sm font-semibold underline mx-0 px-0"
            variant="ghost"
          >
            Learn more about cancellation policies
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default CancellationPolicyModal
