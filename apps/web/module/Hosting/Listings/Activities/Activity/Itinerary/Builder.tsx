import { Typography } from "@/common/components/ui/Typography"
import { LucideMapPin, LucidePlus } from "lucide-react"
import React, { useState } from "react"
import BuilderModals from "./modals/BuilderModal"
import { useSegmentsStore } from "./store/useSegmentsStore"
import TransferModal from "./modals/TransferModal"

const Builder = () => {
  const segments = useSegmentsStore((state) => state.segments)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalTransferOpen, setIsModalTransferOpen] = useState(false)
  return (
    <div className="mt-8 w-1/3">
      <Typography variant="h3" fontWeight="semibold" className="mb-2">
        Itinerary Builder
      </Typography>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary-100 text-primary-600 flex items-center justify-center rounded-full">
            <LucideMapPin className="h-5 w-5" />
          </div>
          <Typography fontWeight="semibold" className="text-text-400">
            Meeting Point (Address above)
          </Typography>
        </div>
        {segments.map((segment) => {
          return (
            <>
              <div className="ml-4 w-[2px] h-12 bg-primary-600 mt-2"></div>
              <div className="mt-2 shadow-md rounded-lg p-4 border border-primary-500">
                <Typography variant="h4">{segment.location}</Typography>
                <p className="text-text-400 text-sm">
                  {segment.activities?.join(", ")}{" "}
                  {segment.transfer && `Transfer via ${segment.transfer}`} (
                  {segment.durationHour > 0 && `${segment.durationHour}h`}
                  {segment.durationMinute > 0 && ` ${segment.durationMinute}m`})
                </p>
                <p className="text-text-400 text-sm">
                  {segment.optional && "Optional"}
                  {segment.fee && ", Extra Fee"}
                </p>
              </div>
            </>
          )
        })}
        <div className="ml-4 w-[2px] h-12 bg-primary-600 mt-2"></div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-text-400 text-sm flex items-center gap-2 p-2 mt-2 hover:font-semibold transition"
        >
          <LucidePlus className="h-4 w-4" /> Add new segment
        </button>
        <button
          type="button"
          onClick={() => setIsModalTransferOpen(true)}
          className="text-text-400 text-sm flex items-center gap-2 p-2 mt-2 hover:font-semibold transition"
        >
          <LucidePlus className="h-4 w-4" /> Add new transfer
        </button>
      </div>
      <BuilderModals isModalOpen={isModalOpen} onClose={setIsModalOpen} />
      <TransferModal
        isModalOpen={isModalTransferOpen}
        onClose={setIsModalTransferOpen}
      />
    </div>
  )
}

export default Builder
